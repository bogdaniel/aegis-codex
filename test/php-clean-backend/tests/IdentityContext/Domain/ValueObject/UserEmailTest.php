<?php

declare(strict_types=1);

namespace AegisCodex\Tests\IdentityContext\Domain\ValueObject;

use AegisCodex\IdentityContext\Domain\ValueObject\UserEmail;
use InvalidArgumentException;
use PHPUnit\Framework\TestCase;

final class UserEmailTest extends TestCase
{
    public function testCreateValidEmail(): void
    {
        $email = UserEmail::fromString('test@example.com');

        $this->assertEquals('test@example.com', $email->toString());
    }

    public function testCreateInvalidEmailThrowsException(): void
    {
        $this->expectException(InvalidArgumentException::class);
        $this->expectExceptionMessage('Invalid email');

        UserEmail::fromString('invalid-email');
    }

    public function testEqualsWithSameEmail(): void
    {
        $email1 = UserEmail::fromString('test@example.com');
        $email2 = UserEmail::fromString('test@example.com');

        $this->assertTrue($email1->equals($email2));
    }

    public function testEqualsWithDifferentEmail(): void
    {
        $email1 = UserEmail::fromString('test@example.com');
        $email2 = UserEmail::fromString('other@example.com');

        $this->assertFalse($email1->equals($email2));
    }
}

