<?php

declare(strict_types=1);

namespace IdentityContext\Domain\Entities;

use IdentityContext\Domain\ValueObjects\HashedPassword;
use IdentityContext\Domain\ValueObjects\UserEmail;

final class User
{
    private function __construct(
        private readonly string $id,
        private readonly UserEmail $email,
        private readonly HashedPassword $password
    ) {
    }

    public static function create(
        string $id,
        UserEmail $email,
        HashedPassword $password
    ): self {
        return new self($id, $email, $password);
    }

    public function id(): string
    {
        return $this->id;
    }

    public function email(): UserEmail
    {
        return $this->email;
    }

    public function password(): HashedPassword
    {
        return $this->password;
    }
}

