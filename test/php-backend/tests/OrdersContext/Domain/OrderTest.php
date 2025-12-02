<?php

declare(strict_types=1);

namespace Tests\OrdersContext\Domain;

use OrdersContext\Domain\Entities\Order;
use PHPUnit\Framework\TestCase;

final class OrderTest extends TestCase
{
    public function testCreatesOrderWithValidAmount(): void
    {
        $uuid = 'order-uuid-123';
        $userId = 'user-uuid-456';
        $amount = 99.99;

        $order = Order::create($uuid, $userId, $amount);

        $this->assertEquals($uuid, $order->uuid());
        $this->assertEquals($userId, $order->userId());
        $this->assertEquals($amount, $order->amount());
    }

    public function testRejectsZeroAmount(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        Order::create('uuid', 'userId', 0);
    }

    public function testRejectsNegativeAmount(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        Order::create('uuid', 'userId', -10);
    }

    public function testReconstitutesOrder(): void
    {
        $id = '1';
        $uuid = 'order-uuid-123';
        $userId = 'user-uuid-456';
        $amount = 99.99;
        $createdAt = new \DateTimeImmutable('2024-01-01 12:00:00');

        $order = Order::reconstitute($id, $uuid, $userId, $amount, $createdAt);

        $this->assertEquals($id, $order->id());
        $this->assertEquals($uuid, $order->uuid());
        $this->assertEquals($amount, $order->amount());
    }
}

