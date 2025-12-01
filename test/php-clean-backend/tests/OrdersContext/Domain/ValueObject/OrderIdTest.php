<?php

declare(strict_types=1);

namespace AegisCodex\Tests\OrdersContext\Domain\ValueObject;

use AegisCodex\OrdersContext\Domain\ValueObject\OrderId;
use PHPUnit\Framework\TestCase;

final class OrderIdTest extends TestCase
{
    public function testGenerateCreatesValidUuid(): void
    {
        $orderId = OrderId::generate();

        $this->assertNotEmpty($orderId->toString());
        $this->assertMatchesRegularExpression(
            '/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i',
            $orderId->toString()
        );
    }

    public function testFromStringCreatesOrderId(): void
    {
        $uuid = '550e8400-e29b-41d4-a716-446655440000';
        $orderId = OrderId::fromString($uuid);

        $this->assertEquals($uuid, $orderId->toString());
    }

    public function testEqualsWithSameId(): void
    {
        $uuid = '550e8400-e29b-41d4-a716-446655440000';
        $orderId1 = OrderId::fromString($uuid);
        $orderId2 = OrderId::fromString($uuid);

        $this->assertTrue($orderId1->equals($orderId2));
    }
}

