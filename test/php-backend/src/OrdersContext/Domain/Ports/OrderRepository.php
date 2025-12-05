<?php

declare(strict_types=1);

namespace OrdersContext\Domain\Ports;

use OrdersContext\Domain\Entities\Order;

interface OrderRepository
{
    public function save(Order $order): void;

    public function findById(string $id): ?Order;
}

