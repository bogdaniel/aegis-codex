<?php

declare(strict_types=1);

namespace OrdersContext\Infrastructure\Adapters;

use IdentityContext\Domain\Ports\UserRepository as IdentityUserRepository;
use OrdersContext\Domain\Ports\IdentityValidationPort;

final class IdentityValidationAdapter implements IdentityValidationPort
{
    public function __construct(
        private readonly IdentityUserRepository $userRepository
    ) {
    }

    public function userExists(string $userId): bool
    {
        return $this->userRepository->findById($userId) !== null;
    }
}

