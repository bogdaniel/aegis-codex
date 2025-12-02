<?php

declare(strict_types=1);

namespace Tests\IdentityContext\Domain\ValueObjects;

use IdentityContext\Domain\ValueObjects\HashedPassword;
use PHPUnit\Framework\TestCase;

final class HashedPasswordTest extends TestCase
{
    public function testCreatesFromHash(): void
    {
        $hash = password_hash('password123', PASSWORD_BCRYPT);
        $hashedPassword = HashedPassword::fromHash($hash);
        
        $this->assertSame($hash, $hashedPassword->hash());
    }

    public function testRejectsEmptyHash(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('Password hash cannot be empty');
        
        HashedPassword::fromHash('');
    }

    public function testVerifiesCorrectPassword(): void
    {
        $plainPassword = 'password123';
        $hash = password_hash($plainPassword, PASSWORD_BCRYPT);
        $hashedPassword = HashedPassword::fromHash($hash);
        
        $this->assertTrue($hashedPassword->verify($plainPassword));
    }

    public function testRejectsIncorrectPassword(): void
    {
        $hash = password_hash('password123', PASSWORD_BCRYPT);
        $hashedPassword = HashedPassword::fromHash($hash);
        
        $this->assertFalse($hashedPassword->verify('wrong-password'));
    }
}

