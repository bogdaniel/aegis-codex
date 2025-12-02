<?php

declare(strict_types=1);

namespace IdentityContext\Application\UseCases;

use IdentityContext\Domain\Ports\UserRepository;

final class ListUsers
{
    public function __construct(
        private readonly UserRepository $userRepository
    ) {
    }

    /**
     * @return array<array{uuid: string, email: string, createdAt: string}>
     */
    public function execute(): array
    {
        $users = $this->userRepository->findAll();

        return array_map(
            fn($user) => [
                'uuid' => $user->uuid(),
                'email' => $user->email()->value(),
                'createdAt' => $user->createdAt()->format('Y-m-d H:i:s')
            ],
            $users
        );
    }
}

