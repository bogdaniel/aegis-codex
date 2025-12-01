<?php

declare(strict_types=1);

namespace AegisCodex\OrdersContext\Application\UseCase\PlaceOrder;

use AegisCodex\OrdersContext\Domain\Entity\Order;
use AegisCodex\OrdersContext\Domain\Port\IdentityPort;
use AegisCodex\OrdersContext\Domain\Port\OrderRepository;
use AegisCodex\OrdersContext\Domain\ValueObject\Money;
use AegisCodex\OrdersContext\Domain\ValueObject\OrderId;
use DomainException;

final class PlaceOrderHandler
{
    public function __construct(
        private readonly OrderRepository $orderRepository,
        private readonly IdentityPort $identityPort
    ) {
    }

    public function handle(PlaceOrderCommand $command): OrderId
    {
        if (!$this->identityPort->userExists($command->userId)) {
            throw new DomainException("User does not exist");
        }

        $orderId = OrderId::generate();
        $total = Money::fromCents($command->amountInCents, $command->currency);

        $order = Order::create($orderId, $command->userId, $total);
        $this->orderRepository->save($order);

        return $orderId;
    }
}

