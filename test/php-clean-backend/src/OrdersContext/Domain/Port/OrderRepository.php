<?php

declare(strict_types=1);

namespace AegisCodex\OrdersContext\Domain\Port;

use AegisCodex\OrdersContext\Domain\Entity\Order;
use AegisCodex\OrdersContext\Domain\ValueObject\OrderId;

interface OrderRepository
{
    public function save(Order $order): void;

    public function findById(OrderId $id): ?Order;
}

