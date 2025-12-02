<?php

declare(strict_types=1);

namespace IdentityContext\Interface\Http;

use IdentityContext\Application\Commands\RegisterUserCommand;
use IdentityContext\Application\UseCases\RegisterUser;

final class RegisterUserController
{
    public function __construct(
        private readonly RegisterUser $registerUser
    ) {
    }

    public function handle(array $request): array
    {
        $email = $request['email'] ?? '';
        $password = $request['password'] ?? '';

        if (empty($email) || empty($password)) {
            return [
                'status' => 400,
                'body' => ['error' => 'Email and password are required']
            ];
        }

        try {
            $command = new RegisterUserCommand($email, $password);
            $uuid = $this->registerUser->execute($command);

            return [
                'status' => 201,
                'body' => ['uuid' => $uuid, 'message' => 'User registered successfully']
            ];
        } catch (\InvalidArgumentException $e) {
            return [
                'status' => 400,
                'body' => ['error' => $e->getMessage()]
            ];
        } catch (\DomainException $e) {
            return [
                'status' => 409,
                'body' => ['error' => $e->getMessage()]
            ];
        } catch (\RuntimeException $e) {
            return [
                'status' => 500,
                'body' => ['error' => 'Internal server error']
            ];
        } catch (\Exception $e) {
            // Log error but don't expose details to client
            error_log('RegisterUser error: ' . $e->getMessage());
            return [
                'status' => 500,
                'body' => ['error' => 'Internal server error']
            ];
        }
    }
}

