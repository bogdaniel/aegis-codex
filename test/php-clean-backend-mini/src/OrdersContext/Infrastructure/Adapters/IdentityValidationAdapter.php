<?php

declare(strict_types=1);

namespace OrdersContext\Infrastructure\Adapters;

use IdentityContext\Application\UseCases\RegisterUser\RegisterUser;
use IdentityContext\Domain\Ports\UserRepository as IdentityUserRepository;
use OrdersContext\Application\Ports\IdentityValidationPort;

/**
 * ACL adapter translating OrdersContext's IdentityValidationPort
 * to IdentityContext's UserRepository.
 * 
 * This adapter shields OrdersContext from IdentityContext's exact semantics.
 */
final class IdentityValidationAdapter implements IdentityValidationPort
{
    public function __construct(
        private readonly IdentityUserRepository $identityUserRepository
    ) {
    }

    public function userExists(string $userId): bool
    {
        return $this->identityUserRepository->findById($userId) !== null;
    }
}

