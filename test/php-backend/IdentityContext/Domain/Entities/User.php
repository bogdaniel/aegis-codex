<?php

declare(strict_types=1);

namespace IdentityContext\Domain\Entities;

use IdentityContext\Domain\ValueObjects\Email;
use IdentityContext\Domain\ValueObjects\HashedPassword;

final class User
{
    private function __construct(
        private readonly string $id,
        private readonly string $uuid,
        private Email $email,
        private HashedPassword $password,
        private readonly \DateTimeImmutable $createdAt
    ) {
    }

    public static function create(
        string $uuid,
        Email $email,
        HashedPassword $password
    ): self {
        return new self(
            id: '',
            uuid: $uuid,
            email: $email,
            password: $password,
            createdAt: new \DateTimeImmutable()
        );
    }

    public static function reconstitute(
        string $id,
        string $uuid,
        Email $email,
        HashedPassword $password,
        \DateTimeImmutable $createdAt
    ): self {
        return new self(
            id: $id,
            uuid: $uuid,
            email: $email,
            password: $password,
            createdAt: $createdAt
        );
    }

    public function id(): string
    {
        return $this->id;
    }

    public function uuid(): string
    {
        return $this->uuid;
    }

    public function email(): Email
    {
        return $this->email;
    }

    public function password(): HashedPassword
    {
        return $this->password;
    }

    public function createdAt(): \DateTimeImmutable
    {
        return $this->createdAt;
    }
}

