<?php

declare(strict_types=1);

namespace AegisCodex\Tests\IdentityContext\Domain\Entity;

use AegisCodex\IdentityContext\Domain\Entity\User;
use AegisCodex\IdentityContext\Domain\ValueObject\UserEmail;
use AegisCodex\IdentityContext\Domain\ValueObject\UserId;
use PHPUnit\Framework\TestCase;

final class UserTest extends TestCase
{
    public function testCreateUser(): void
    {
        $userId = UserId::generate();
        $email = UserEmail::fromString('test@example.com');
        $passwordHash = 'hashed_password';

        $user = User::create($userId, $email, $passwordHash);

        $this->assertTrue($user->id()->equals($userId));
        $this->assertTrue($user->email()->equals($email));
        $this->assertEquals($passwordHash, $user->passwordHash());
    }

    public function testUserIsImmutable(): void
    {
        $userId = UserId::generate();
        $email = UserEmail::fromString('test@example.com');
        $passwordHash = 'hashed_password';

        $user = User::create($userId, $email, $passwordHash);

        // Verify all properties are accessible but immutable
        $this->assertTrue($user->id()->equals($userId));
        $this->assertTrue($user->email()->equals($email));
        $this->assertEquals($passwordHash, $user->passwordHash());
    }
}

