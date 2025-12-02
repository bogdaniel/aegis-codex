<?php

declare(strict_types=1);

namespace OrdersContext\Application\UseCases\PlaceOrder;

use OrdersContext\Application\Ports\EventPublisher;
use OrdersContext\Application\Ports\IdentityValidationPort;
use OrdersContext\Domain\Entities\Order;
use OrdersContext\Domain\Events\OrderPlaced;
use OrdersContext\Domain\Ports\OrderRepository;
use OrdersContext\Domain\ValueObjects\Money;

final class PlaceOrder
{
    public function __construct(
        private readonly OrderRepository $orderRepository,
        private readonly IdentityValidationPort $identityValidation,
        private readonly EventPublisher $eventPublisher
    ) {
    }

    public function execute(PlaceOrderCommand $command): void
    {
        // Enforce invariant: user must exist
        if (!$this->identityValidation->userExists($command->userId)) {
            throw new \DomainException('User does not exist');
        }

        $amount = Money::fromDollars($command->amount);
        $orderId = $this->generateOrderId();

        $order = Order::create($orderId, $command->userId, $amount);
        $this->orderRepository->save($order);

        $this->eventPublisher->publish(
            new OrderPlaced(
                orderId: $orderId,
                userId: $command->userId,
                amountInCents: $amount->amountInCents(),
                occurredAt: (new \DateTimeImmutable())->format('c')
            )
        );
    }

    private function generateOrderId(): string
    {
        return bin2hex(random_bytes(16));
    }
}

