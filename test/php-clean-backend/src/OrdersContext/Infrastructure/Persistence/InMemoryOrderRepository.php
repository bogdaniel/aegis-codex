<?php

declare(strict_types=1);

namespace AegisCodex\OrdersContext\Infrastructure\Persistence;

use AegisCodex\OrdersContext\Domain\Entity\Order;
use AegisCodex\OrdersContext\Domain\Port\OrderRepository;
use AegisCodex\OrdersContext\Domain\ValueObject\OrderId;

final class InMemoryOrderRepository implements OrderRepository
{
    /** @var array<string, Order> */
    private array $orders = [];

    public function save(Order $order): void
    {
        $this->orders[$order->id()->toString()] = $order;
    }

    public function findById(OrderId $id): ?Order
    {
        return $this->orders[$id->toString()] ?? null;
    }
}

