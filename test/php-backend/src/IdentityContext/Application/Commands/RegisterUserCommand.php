<?php

declare(strict_types=1);

namespace IdentityContext\Application\Commands;

final class RegisterUserCommand
{
    public function __construct(
        public readonly string $email,
        public readonly string $password
    ) {
    }
}

