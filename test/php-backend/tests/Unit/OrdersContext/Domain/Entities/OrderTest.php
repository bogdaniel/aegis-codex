<?php

declare(strict_types=1);

namespace Tests\Unit\OrdersContext\Domain\Entities;

use OrdersContext\Domain\Entities\Order;
use PHPUnit\Framework\TestCase;

final class OrderTest extends TestCase
{
    public function testCreateOrder(): void
    {
        $order = new Order('order_123', 'user_456', 99.99);
        $this->assertEquals('order_123', $order->id());
        $this->assertEquals('user_456', $order->userId());
        $this->assertEquals(99.99, $order->amount());
    }

    public function testNegativeAmountThrowsException(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('Order amount must be positive');
        new Order('order_123', 'user_456', -10.0);
    }

    public function testZeroAmountThrowsException(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('Order amount must be positive');
        new Order('order_123', 'user_456', 0.0);
    }
}

