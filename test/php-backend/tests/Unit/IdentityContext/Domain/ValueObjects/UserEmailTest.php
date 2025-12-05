<?php

declare(strict_types=1);

namespace Tests\Unit\IdentityContext\Domain\ValueObjects;

use IdentityContext\Domain\ValueObjects\UserEmail;
use PHPUnit\Framework\TestCase;

final class UserEmailTest extends TestCase
{
    public function testValidEmail(): void
    {
        $email = new UserEmail('test@example.com');
        $this->assertEquals('test@example.com', $email->value());
    }

    public function testInvalidEmailThrowsException(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        new UserEmail('invalid-email');
    }

    public function testEquals(): void
    {
        $email1 = new UserEmail('test@example.com');
        $email2 = new UserEmail('test@example.com');
        $email3 = new UserEmail('other@example.com');

        $this->assertTrue($email1->equals($email2));
        $this->assertFalse($email1->equals($email3));
    }
}

