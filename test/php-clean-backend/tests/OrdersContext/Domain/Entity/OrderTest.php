<?php

declare(strict_types=1);

namespace AegisCodex\Tests\OrdersContext\Domain\Entity;

use AegisCodex\IdentityContext\Domain\ValueObject\UserId;
use AegisCodex\OrdersContext\Domain\Entity\Order;
use AegisCodex\OrdersContext\Domain\ValueObject\Money;
use AegisCodex\OrdersContext\Domain\ValueObject\OrderId;
use AegisCodex\OrdersContext\Domain\ValueObject\OrderStatus;
use DomainException;
use PHPUnit\Framework\TestCase;

final class OrderTest extends TestCase
{
    public function testCreateOrder(): void
    {
        $orderId = OrderId::generate();
        $userId = UserId::generate();
        $total = Money::fromCents(5000, 'USD');

        $order = Order::create($orderId, $userId, $total);

        $this->assertTrue($order->id()->equals($orderId));
        $this->assertTrue($order->userId()->equals($userId));
        $this->assertTrue($order->total()->equals($total));
        $this->assertEquals(OrderStatus::PENDING, $order->status());
    }

    public function testConfirmPendingOrder(): void
    {
        $order = $this->createPendingOrder();

        $order->confirm();

        $this->assertEquals(OrderStatus::CONFIRMED, $order->status());
    }

    public function testConfirmNonPendingOrderThrowsException(): void
    {
        $order = $this->createPendingOrder();
        $order->confirm();

        $this->expectException(DomainException::class);
        $this->expectExceptionMessage('Only pending orders can be confirmed');

        $order->confirm();
    }

    public function testCancelPendingOrder(): void
    {
        $order = $this->createPendingOrder();

        $order->cancel();

        $this->assertEquals(OrderStatus::CANCELLED, $order->status());
    }

    public function testCancelConfirmedOrder(): void
    {
        $order = $this->createPendingOrder();
        $order->confirm();

        $order->cancel();

        $this->assertEquals(OrderStatus::CANCELLED, $order->status());
    }

    public function testCancelConfirmedOrderIsAllowed(): void
    {
        $order = $this->createPendingOrder();
        $order->confirm();

        $order->cancel();

        $this->assertEquals(OrderStatus::CANCELLED, $order->status());
    }

    private function createPendingOrder(): Order
    {
        return Order::create(
            OrderId::generate(),
            UserId::generate(),
            Money::fromCents(5000, 'USD')
        );
    }
}

