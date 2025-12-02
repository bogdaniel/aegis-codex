<?php

declare(strict_types=1);

namespace Tests\IdentityContext\Domain;

use IdentityContext\Domain\ValueObjects\HashedPassword;
use PHPUnit\Framework\TestCase;

final class HashedPasswordTest extends TestCase
{
    public function testCreatesHashFromPlainText(): void
    {
        $hashed = HashedPassword::fromPlainText('password123');
        $this->assertNotEmpty($hashed->hash());
        $this->assertNotEquals('password123', $hashed->hash());
    }

    public function testVerifiesCorrectPassword(): void
    {
        $hashed = HashedPassword::fromPlainText('password123');
        $this->assertTrue($hashed->verify('password123'));
    }

    public function testRejectsIncorrectPassword(): void
    {
        $hashed = HashedPassword::fromPlainText('password123');
        $this->assertFalse($hashed->verify('wrongpassword'));
    }

    public function testReconstitutesFromHash(): void
    {
        $original = HashedPassword::fromPlainText('password123');
        $reconstituted = HashedPassword::fromHash($original->hash());
        $this->assertTrue($reconstituted->verify('password123'));
    }

    public function testRejectsShortPassword(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('Password must be at least 8 characters long');
        HashedPassword::fromPlainText('short');
    }
}

