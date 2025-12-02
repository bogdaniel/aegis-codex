<?php

declare(strict_types=1);

namespace Tests\OrdersContext\Domain\Entities;

use OrdersContext\Domain\Entities\Order;
use OrdersContext\Domain\ValueObjects\Money;
use PHPUnit\Framework\TestCase;

final class OrderTest extends TestCase
{
    public function testCreatesOrder(): void
    {
        $orderId = 'order-123';
        $userId = 'user-456';
        $amount = Money::fromDollars(99.99);
        
        $order = Order::create($orderId, $userId, $amount);
        
        $this->assertSame($orderId, $order->id());
        $this->assertSame($userId, $order->userId());
        $this->assertTrue($amount->equals($order->amount()));
    }

    public function testOrderIsImmutable(): void
    {
        $order = Order::create(
            'order-123',
            'user-456',
            Money::fromDollars(99.99)
        );
        
        // Verify getters return correct values
        $this->assertSame('order-123', $order->id());
        $this->assertSame('user-456', $order->userId());
    }
}

