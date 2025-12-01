<?php

declare(strict_types=1);

namespace AegisCodex\IdentityContext\Domain\Entity;

use AegisCodex\IdentityContext\Domain\ValueObject\UserId;
use AegisCodex\IdentityContext\Domain\ValueObject\UserEmail;

final class User
{
    private function __construct(
        private readonly UserId $id,
        private readonly UserEmail $email,
        private readonly string $passwordHash
    ) {
    }

    public static function create(
        UserId $id,
        UserEmail $email,
        string $passwordHash
    ): self {
        return new self($id, $email, $passwordHash);
    }

    public function id(): UserId
    {
        return $this->id;
    }

    public function email(): UserEmail
    {
        return $this->email;
    }

    public function passwordHash(): string
    {
        return $this->passwordHash;
    }
}

