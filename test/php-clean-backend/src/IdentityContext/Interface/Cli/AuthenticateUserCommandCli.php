<?php

declare(strict_types=1);

namespace AegisCodex\IdentityContext\Interface\Cli;

use AegisCodex\IdentityContext\Application\UseCase\AuthenticateUser\AuthenticateUserCommand;
use AegisCodex\IdentityContext\Application\UseCase\AuthenticateUser\AuthenticateUserHandler;

final class AuthenticateUserCommandCli
{
    public function __construct(
        private readonly AuthenticateUserHandler $handler
    ) {
    }

    public function execute(string $email, string $password): void
    {
        $command = new AuthenticateUserCommand($email, $password);
        $userId = $this->handler->handle($command);

        echo "User authenticated with ID: {$userId->toString()}\n";
    }
}

