<?php

declare(strict_types=1);

namespace IdentityContext\Infrastructure\Persistence;

use IdentityContext\Domain\Entities\User;
use IdentityContext\Domain\Ports\UserRepository;
use IdentityContext\Domain\ValueObjects\Email;
use IdentityContext\Domain\ValueObjects\HashedPassword;
use PDO;

final class PdoUserRepository implements UserRepository
{
    public function __construct(
        private readonly PDO $pdo
    ) {
    }

    public function save(User $user): void
    {
        $stmt = $this->pdo->prepare(
            'INSERT INTO users (uuid, email, password_hash, created_at) 
             VALUES (:uuid, :email, :password_hash, :created_at)'
        );

        $stmt->execute([
            ':uuid' => $user->uuid(),
            ':email' => $user->email()->value(),
            ':password_hash' => $user->password()->hash(),
            ':created_at' => $user->createdAt()->format('Y-m-d H:i:s')
        ]);
    }

    public function findByEmail(Email $email): ?User
    {
        $stmt = $this->pdo->prepare('SELECT * FROM users WHERE email = :email');
        $stmt->execute([':email' => $email->value()]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($row === false) {
            return null;
        }

        return $this->mapToUser($row);
    }

    public function findByUuid(string $uuid): ?User
    {
        $stmt = $this->pdo->prepare('SELECT * FROM users WHERE uuid = :uuid');
        $stmt->execute([':uuid' => $uuid]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($row === false) {
            return null;
        }

        return $this->mapToUser($row);
    }

    public function findAll(): array
    {
        $stmt = $this->pdo->query('SELECT * FROM users ORDER BY created_at DESC');
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return array_map(fn(array $row) => $this->mapToUser($row), $rows);
    }

    private function mapToUser(array $row): User
    {
        return User::reconstitute(
            id: (string) $row['id'],
            uuid: $row['uuid'],
            email: Email::create($row['email']),
            password: HashedPassword::fromHash($row['password_hash']),
            createdAt: \DateTimeImmutable::createFromFormat('Y-m-d H:i:s', $row['created_at'])
        );
    }
}

