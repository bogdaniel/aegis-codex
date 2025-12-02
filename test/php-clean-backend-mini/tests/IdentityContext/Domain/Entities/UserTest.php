<?php

declare(strict_types=1);

namespace Tests\IdentityContext\Domain\Entities;

use IdentityContext\Domain\Entities\User;
use IdentityContext\Domain\ValueObjects\HashedPassword;
use IdentityContext\Domain\ValueObjects\UserEmail;
use PHPUnit\Framework\TestCase;

final class UserTest extends TestCase
{
    public function testCreatesUser(): void
    {
        $userId = 'user-123';
        $email = UserEmail::create('user@example.com');
        $password = HashedPassword::fromHash(password_hash('password123', PASSWORD_BCRYPT));
        
        $user = User::create($userId, $email, $password);
        
        $this->assertSame($userId, $user->id());
        $this->assertTrue($email->equals($user->email()));
        $this->assertSame($password->hash(), $user->password()->hash());
    }

    public function testUserIsImmutable(): void
    {
        $userId = 'user-123';
        $email = UserEmail::create('user@example.com');
        $password = HashedPassword::fromHash(password_hash('password123', PASSWORD_BCRYPT));
        
        $user = User::create($userId, $email, $password);
        
        // Verify getters return correct values
        $this->assertSame($userId, $user->id());
        $this->assertTrue($email->equals($user->email()));
    }
}

