<?php

declare(strict_types=1);

namespace AegisCodex\IdentityContext\Interface\Cli;

use AegisCodex\IdentityContext\Application\UseCase\RegisterUser\RegisterUserCommand;
use AegisCodex\IdentityContext\Application\UseCase\RegisterUser\RegisterUserHandler;

final class RegisterUserCommandCli
{
    public function __construct(
        private readonly RegisterUserHandler $handler
    ) {
    }

    public function execute(string $email, string $password): void
    {
        $command = new RegisterUserCommand($email, $password);
        $userId = $this->handler->handle($command);

        echo "User registered with ID: {$userId->toString()}\n";
    }
}

