<?php

declare(strict_types=1);

namespace OrdersContext\Infrastructure\Adapters;

use OrdersContext\Domain\Entities\Order;
use OrdersContext\Domain\Ports\OrderRepository;

final class InMemoryOrderRepository implements OrderRepository
{
    /** @var array<string, Order> */
    private array $orders = [];

    public function save(Order $order): void
    {
        $this->orders[$order->id()] = $order;
    }

    public function findById(string $id): ?Order
    {
        return $this->orders[$id] ?? null;
    }
}

