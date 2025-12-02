<?php

declare(strict_types=1);

namespace IdentityContext\Interface\Http;

use IdentityContext\Application\UseCases\ListUsers;

final class ListUsersController
{
    public function __construct(
        private readonly ListUsers $listUsers
    ) {
    }

    public function handle(): array
    {
        try {
            $users = $this->listUsers->execute();

            return [
                'status' => 200,
                'body' => ['users' => $users]
            ];
        } catch (\Exception $e) {
            error_log('ListUsers error: ' . $e->getMessage());
            return [
                'status' => 500,
                'body' => ['error' => 'Internal server error']
            ];
        }
    }
}

