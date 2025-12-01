<?php

declare(strict_types=1);

namespace AegisCodex\IdentityContext\Application\UseCase\RegisterUser;

final class RegisterUserCommand
{
    public function __construct(
        public readonly string $email,
        public readonly string $password
    ) {
    }
}

