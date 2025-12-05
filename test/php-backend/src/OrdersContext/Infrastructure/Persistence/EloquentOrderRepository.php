<?php

declare(strict_types=1);

namespace OrdersContext\Infrastructure\Persistence;

use OrdersContext\Domain\Entities\Order;
use OrdersContext\Domain\Ports\OrderRepository as OrderRepositoryInterface;

final class EloquentOrderRepository implements OrderRepositoryInterface
{
    public function save(Order $order): void
    {
        EloquentOrder::updateOrCreate(
            ['id' => $order->id()],
            [
                'user_id' => $order->userId(),
                'amount' => $order->amount(),
            ]
        );
    }

    public function findById(string $id): ?Order
    {
        $eloquentOrder = EloquentOrder::find($id);
        if ($eloquentOrder === null) {
            return null;
        }

        return new Order(
            $eloquentOrder->id,
            $eloquentOrder->user_id,
            (float) $eloquentOrder->amount
        );
    }
}

