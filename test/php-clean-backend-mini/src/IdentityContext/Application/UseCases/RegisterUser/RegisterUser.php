<?php

declare(strict_types=1);

namespace IdentityContext\Application\UseCases\RegisterUser;

use IdentityContext\Application\Ports\EventPublisher;
use IdentityContext\Domain\Entities\User;
use IdentityContext\Domain\Events\UserRegistered;
use IdentityContext\Domain\Ports\UserRepository;
use IdentityContext\Domain\ValueObjects\HashedPassword;
use IdentityContext\Domain\ValueObjects\UserEmail;

final class RegisterUser
{
    public function __construct(
        private readonly UserRepository $userRepository,
        private readonly EventPublisher $eventPublisher
    ) {
    }

    public function execute(RegisterUserCommand $command): void
    {
        $email = UserEmail::create($command->email);
        
        // Enforce invariant: no duplicate email
        $existing = $this->userRepository->findByEmail($email);
        if ($existing !== null) {
            throw new \DomainException('User with this email already exists');
        }

        $userId = $this->generateUserId();
        $hashedPassword = HashedPassword::fromHash(
            password_hash($command->password, PASSWORD_BCRYPT, ['cost' => 12])
        );

        $user = User::create($userId, $email, $hashedPassword);
        $this->userRepository->save($user);

        $this->eventPublisher->publish(
            new UserRegistered(
                userId: $userId,
                email: $email->value(),
                occurredAt: (new \DateTimeImmutable())->format('c')
            )
        );
    }

    private function generateUserId(): string
    {
        return bin2hex(random_bytes(16));
    }
}

