<?php

declare(strict_types=1);

namespace Tests\IdentityContext\Domain\ValueObjects;

use IdentityContext\Domain\ValueObjects\UserEmail;
use PHPUnit\Framework\TestCase;

final class UserEmailTest extends TestCase
{
    public function testCreatesValidEmail(): void
    {
        $email = UserEmail::create('user@example.com');
        
        $this->assertSame('user@example.com', $email->value());
    }

    public function testRejectsInvalidEmail(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('Invalid email format');
        
        UserEmail::create('invalid-email');
    }

    public function testEqualsReturnsTrueForSameEmail(): void
    {
        $email1 = UserEmail::create('user@example.com');
        $email2 = UserEmail::create('user@example.com');
        
        $this->assertTrue($email1->equals($email2));
    }

    public function testEqualsReturnsFalseForDifferentEmails(): void
    {
        $email1 = UserEmail::create('user1@example.com');
        $email2 = UserEmail::create('user2@example.com');
        
        $this->assertFalse($email1->equals($email2));
    }
}

