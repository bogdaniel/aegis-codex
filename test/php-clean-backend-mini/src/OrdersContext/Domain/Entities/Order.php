<?php

declare(strict_types=1);

namespace OrdersContext\Domain\Entities;

use OrdersContext\Domain\ValueObjects\Money;

final class Order
{
    private function __construct(
        private readonly string $id,
        private readonly string $userId,
        private readonly Money $amount
    ) {
    }

    public static function create(
        string $id,
        string $userId,
        Money $amount
    ): self {
        return new self($id, $userId, $amount);
    }

    public function id(): string
    {
        return $this->id;
    }

    public function userId(): string
    {
        return $this->userId;
    }

    public function amount(): Money
    {
        return $this->amount;
    }
}

