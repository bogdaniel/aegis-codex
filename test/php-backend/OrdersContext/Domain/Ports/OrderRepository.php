<?php

declare(strict_types=1);

namespace OrdersContext\Domain\Ports;

use OrdersContext\Domain\Entities\Order;

interface OrderRepository
{
    public function save(Order $order): void;

    public function findByUuid(string $uuid): ?Order;

    /**
     * @return array<Order>
     */
    public function findAll(): array;
}

