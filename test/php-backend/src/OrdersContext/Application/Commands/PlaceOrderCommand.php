<?php

declare(strict_types=1);

namespace OrdersContext\Application\Commands;

final class PlaceOrderCommand
{
    public function __construct(
        public readonly string $userId,
        public readonly float $amount
    ) {
    }
}

