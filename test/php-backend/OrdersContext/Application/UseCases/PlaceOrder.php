<?php

declare(strict_types=1);

namespace OrdersContext\Application\UseCases;

use OrdersContext\Application\Commands\PlaceOrderCommand;
use OrdersContext\Domain\Entities\Order;
use OrdersContext\Domain\Ports\OrderRepository;
use OrdersContext\Domain\Ports\UserValidator;

final class PlaceOrder
{
    public function __construct(
        private readonly OrderRepository $orderRepository,
        private readonly UserValidator $userValidator
    ) {
    }

    public function execute(PlaceOrderCommand $command): string
    {
        if (!$this->userValidator->userExists($command->userId)) {
            throw new \DomainException('User does not exist');
        }

        if ($command->amount <= 0) {
            throw new \InvalidArgumentException('Order amount must be greater than zero');
        }

        $uuid = $this->generateUuid();
        $order = Order::create($uuid, $command->userId, $command->amount);
        $this->orderRepository->save($order);

        return $order->uuid();
    }

    private function generateUuid(): string
    {
        return sprintf(
            '%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
            mt_rand(0, 0xffff),
            mt_rand(0, 0xffff),
            mt_rand(0, 0xffff),
            mt_rand(0, 0x0fff) | 0x4000,
            mt_rand(0, 0x3fff) | 0x8000,
            mt_rand(0, 0xffff),
            mt_rand(0, 0xffff),
            mt_rand(0, 0xffff)
        );
    }
}

