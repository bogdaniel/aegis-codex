<?php

declare(strict_types=1);

namespace IdentityContext\Domain\Events;

final class UserRegistered
{
    public function __construct(
        public readonly string $userId,
        public readonly string $email,
        public readonly string $occurredAt
    ) {
    }
}

