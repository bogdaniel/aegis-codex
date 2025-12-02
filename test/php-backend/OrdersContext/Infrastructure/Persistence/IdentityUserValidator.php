<?php

declare(strict_types=1);

namespace OrdersContext\Infrastructure\Persistence;

use IdentityContext\Domain\Ports\UserRepository;
use OrdersContext\Domain\Ports\UserValidator;
use PDO;

final class IdentityUserValidator implements UserValidator
{
    public function __construct(
        private readonly PDO $pdo
    ) {
    }

    public function userExists(string $userId): bool
    {
        $stmt = $this->pdo->prepare('SELECT COUNT(*) FROM users WHERE uuid = :uuid');
        $stmt->execute([':uuid' => $userId]);
        $count = $stmt->fetchColumn();
        
        return $count > 0;
    }
}

