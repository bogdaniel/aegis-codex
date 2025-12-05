<?php

declare(strict_types=1);

namespace IdentityContext\Interface\Http;

use IdentityContext\Application\Commands\RegisterUserCommand;
use IdentityContext\Application\UseCases\RegisterUser;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

final class IdentityController
{
    public function __construct(
        private readonly RegisterUser $registerUser
    ) {
    }

    public function register(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:8',
        ]);

        try {
            $command = new RegisterUserCommand(
                $validated['email'],
                $validated['password']
            );
            $userId = $this->registerUser->execute($command);

            return response()->json(['userId' => $userId], 201);
        } catch (\RuntimeException $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}

