<?php

declare(strict_types=1);

namespace IdentityContext\Infrastructure\Persistence;

use IdentityContext\Domain\Entities\User;
use IdentityContext\Domain\Ports\UserRepository as UserRepositoryInterface;

final class EloquentUserRepository implements UserRepositoryInterface
{
    public function save(User $user): void
    {
        EloquentUser::updateOrCreate(
            ['id' => $user->id()],
            [
                'email' => $user->email(),
                'password_hash' => $user->passwordHash(),
            ]
        );
    }

    public function findByEmail(string $email): ?User
    {
        $eloquentUser = EloquentUser::where('email', $email)->first();
        if ($eloquentUser === null) {
            return null;
        }

        return new User(
            $eloquentUser->id,
            $eloquentUser->email,
            $eloquentUser->password_hash
        );
    }

    public function findById(string $id): ?User
    {
        $eloquentUser = EloquentUser::find($id);
        if ($eloquentUser === null) {
            return null;
        }

        return new User(
            $eloquentUser->id,
            $eloquentUser->email,
            $eloquentUser->password_hash
        );
    }
}

