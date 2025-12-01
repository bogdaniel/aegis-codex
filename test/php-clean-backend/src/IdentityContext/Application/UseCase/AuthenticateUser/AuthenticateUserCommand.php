<?php

declare(strict_types=1);

namespace AegisCodex\IdentityContext\Application\UseCase\AuthenticateUser;

final class AuthenticateUserCommand
{
    public function __construct(
        public readonly string $email,
        public readonly string $password
    ) {
    }
}

