<?php

declare(strict_types=1);

namespace IdentityContext\Interface\Adapters\Http;

use IdentityContext\Application\UseCases\RegisterUser\RegisterUser;
use IdentityContext\Application\UseCases\RegisterUser\RegisterUserCommand;

/**
 * Thin HTTP controller - delegates to Application use case.
 * No business logic here.
 */
final class RegisterUserController
{
    public function __construct(
        private readonly RegisterUser $registerUser
    ) {
    }

    public function handle(array $request): array
    {
        try {
            $command = new RegisterUserCommand(
                email: $request['email'] ?? '',
                password: $request['password'] ?? ''
            );

            $this->registerUser->execute($command);

            return [
                'status' => 'success',
                'message' => 'User registered successfully'
            ];
        } catch (\DomainException $e) {
            return [
                'status' => 'error',
                'message' => $e->getMessage()
            ];
        } catch (\Exception $e) {
            return [
                'status' => 'error',
                'message' => 'Internal server error'
            ];
        }
    }
}

