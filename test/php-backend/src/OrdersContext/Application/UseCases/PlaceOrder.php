<?php

declare(strict_types=1);

namespace OrdersContext\Application\UseCases;

use OrdersContext\Application\Commands\PlaceOrderCommand;
use OrdersContext\Domain\Entities\Order;
use OrdersContext\Domain\Ports\IdentityValidationPort;
use OrdersContext\Domain\Ports\OrderRepository;

final class PlaceOrder
{
    public function __construct(
        private readonly OrderRepository $orderRepository,
        private readonly IdentityValidationPort $identityValidation
    ) {
    }

    public function execute(PlaceOrderCommand $command): string
    {
        if (!$this->identityValidation->userExists($command->userId)) {
            throw new \RuntimeException('User not found');
        }

        $orderId = uniqid('order_', true);
        $order = new Order($orderId, $command->userId, $command->amount);
        $this->orderRepository->save($order);

        return $orderId;
    }
}

