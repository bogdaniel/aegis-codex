<?php

declare(strict_types=1);

namespace Tests\IdentityContext\Domain;

use IdentityContext\Domain\ValueObjects\Email;
use PHPUnit\Framework\TestCase;

final class EmailTest extends TestCase
{
    public function testCreatesValidEmail(): void
    {
        $email = Email::create('test@example.com');
        $this->assertEquals('test@example.com', $email->value());
    }

    public function testRejectsInvalidEmail(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        Email::create('invalid-email');
    }

    public function testEqualsReturnsTrueForSameEmail(): void
    {
        $email1 = Email::create('test@example.com');
        $email2 = Email::create('test@example.com');
        $this->assertTrue($email1->equals($email2));
    }

    public function testEqualsReturnsFalseForDifferentEmails(): void
    {
        $email1 = Email::create('test1@example.com');
        $email2 = Email::create('test2@example.com');
        $this->assertFalse($email1->equals($email2));
    }
}

