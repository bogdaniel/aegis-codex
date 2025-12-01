<?php

declare(strict_types=1);

namespace AegisCodex\OrdersContext\Interface\Cli;

use AegisCodex\IdentityContext\Domain\ValueObject\UserId;
use AegisCodex\OrdersContext\Application\UseCase\PlaceOrder\PlaceOrderCommand;
use AegisCodex\OrdersContext\Application\UseCase\PlaceOrder\PlaceOrderHandler;

final class PlaceOrderCommandCli
{
    public function __construct(
        private readonly PlaceOrderHandler $handler
    ) {
    }

    public function execute(string $userId, int $amountInCents, string $currency = 'USD'): void
    {
        $command = new PlaceOrderCommand(
            UserId::fromString($userId),
            $amountInCents,
            $currency
        );

        $orderId = $this->handler->handle($command);

        echo "Order placed with ID: {$orderId->toString()}\n";
    }
}

