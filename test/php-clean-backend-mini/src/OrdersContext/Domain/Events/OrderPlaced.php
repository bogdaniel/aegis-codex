<?php

declare(strict_types=1);

namespace OrdersContext\Domain\Events;

final class OrderPlaced
{
    public function __construct(
        public readonly string $orderId,
        public readonly string $userId,
        public readonly int $amountInCents,
        public readonly string $occurredAt
    ) {
    }
}

