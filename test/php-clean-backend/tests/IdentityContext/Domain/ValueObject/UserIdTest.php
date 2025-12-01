<?php

declare(strict_types=1);

namespace AegisCodex\Tests\IdentityContext\Domain\ValueObject;

use AegisCodex\IdentityContext\Domain\ValueObject\UserId;
use PHPUnit\Framework\TestCase;

final class UserIdTest extends TestCase
{
    public function testGenerateCreatesValidUuid(): void
    {
        $userId = UserId::generate();

        $this->assertNotEmpty($userId->toString());
        $this->assertMatchesRegularExpression(
            '/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i',
            $userId->toString()
        );
    }

    public function testFromStringCreatesUserId(): void
    {
        $uuid = '550e8400-e29b-41d4-a716-446655440000';
        $userId = UserId::fromString($uuid);

        $this->assertEquals($uuid, $userId->toString());
    }

    public function testEqualsWithSameId(): void
    {
        $uuid = '550e8400-e29b-41d4-a716-446655440000';
        $userId1 = UserId::fromString($uuid);
        $userId2 = UserId::fromString($uuid);

        $this->assertTrue($userId1->equals($userId2));
    }

    public function testEqualsWithDifferentId(): void
    {
        $userId1 = UserId::generate();
        $userId2 = UserId::generate();

        $this->assertFalse($userId1->equals($userId2));
    }
}

