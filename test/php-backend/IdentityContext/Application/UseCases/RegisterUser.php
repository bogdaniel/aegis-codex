<?php

declare(strict_types=1);

namespace IdentityContext\Application\UseCases;

use IdentityContext\Application\Commands\RegisterUserCommand;
use IdentityContext\Domain\Entities\User;
use IdentityContext\Domain\Ports\UserRepository;
use IdentityContext\Domain\ValueObjects\Email;
use IdentityContext\Domain\ValueObjects\HashedPassword;

final class RegisterUser
{
    public function __construct(
        private readonly UserRepository $userRepository
    ) {
    }

    public function execute(RegisterUserCommand $command): string
    {
        $email = Email::create($command->email);
        
        $existingUser = $this->userRepository->findByEmail($email);
        if ($existingUser !== null) {
            throw new \DomainException('User with this email already exists');
        }

        $password = HashedPassword::fromPlainText($command->password);
        $uuid = $this->generateUuid();
        
        $user = User::create($uuid, $email, $password);
        $this->userRepository->save($user);

        return $user->uuid();
    }

    private function generateUuid(): string
    {
        return sprintf(
            '%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
            mt_rand(0, 0xffff),
            mt_rand(0, 0xffff),
            mt_rand(0, 0xffff),
            mt_rand(0, 0x0fff) | 0x4000,
            mt_rand(0, 0x3fff) | 0x8000,
            mt_rand(0, 0xffff),
            mt_rand(0, 0xffff),
            mt_rand(0, 0xffff)
        );
    }
}

