<?php

declare(strict_types=1);

namespace OrdersContext\Application\UseCases\PlaceOrder;

final class PlaceOrderCommand
{
    public function __construct(
        public readonly string $userId,
        public readonly float $amount
    ) {
    }
}

