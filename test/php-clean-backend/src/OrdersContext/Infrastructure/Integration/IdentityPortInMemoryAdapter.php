<?php

declare(strict_types=1);

namespace AegisCodex\OrdersContext\Infrastructure\Integration;

use AegisCodex\IdentityContext\Application\UseCase\RegisterUser\RegisterUserHandler;
use AegisCodex\IdentityContext\Domain\Port\UserRepository;
use AegisCodex\IdentityContext\Domain\ValueObject\UserId;
use AegisCodex\OrdersContext\Domain\Port\IdentityPort;

/**
 * ACL adapter that translates OrdersContext's IdentityPort to IdentityContext's UserRepository.
 * This adapter lives in Infrastructure and bridges the two contexts.
 */
final class IdentityPortInMemoryAdapter implements IdentityPort
{
    public function __construct(
        private readonly UserRepository $identityUserRepository
    ) {
    }

    public function userExists(UserId $userId): bool
    {
        return $this->identityUserRepository->findById($userId) !== null;
    }
}

