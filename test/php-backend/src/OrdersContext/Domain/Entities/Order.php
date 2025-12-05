<?php

declare(strict_types=1);

namespace OrdersContext\Domain\Entities;

final class Order
{
    public function __construct(
        private readonly string $id,
        private readonly string $userId,
        private readonly float $amount
    ) {
        if ($amount <= 0) {
            throw new \InvalidArgumentException('Order amount must be positive');
        }
    }

    public function id(): string
    {
        return $this->id;
    }

    public function userId(): string
    {
        return $this->userId;
    }

    public function amount(): float
    {
        return $this->amount;
    }
}

