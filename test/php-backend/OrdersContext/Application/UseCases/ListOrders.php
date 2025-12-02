<?php

declare(strict_types=1);

namespace OrdersContext\Application\UseCases;

use OrdersContext\Domain\Ports\OrderRepository;

final class ListOrders
{
    public function __construct(
        private readonly OrderRepository $orderRepository
    ) {
    }

    /**
     * @return array<array{uuid: string, userId: string, amount: float, createdAt: string}>
     */
    public function execute(): array
    {
        $orders = $this->orderRepository->findAll();

        return array_map(
            fn($order) => [
                'uuid' => $order->uuid(),
                'userId' => $order->userId(),
                'amount' => $order->amount(),
                'createdAt' => $order->createdAt()->format('Y-m-d H:i:s')
            ],
            $orders
        );
    }
}

