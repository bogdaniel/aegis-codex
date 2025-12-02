<?php

declare(strict_types=1);

namespace OrdersContext\Domain\Entities;

final class Order
{
    private function __construct(
        private readonly string $id,
        private readonly string $uuid,
        private readonly string $userId,
        private readonly float $amount,
        private readonly \DateTimeImmutable $createdAt
    ) {
        if ($amount <= 0) {
            throw new \InvalidArgumentException('Order amount must be greater than zero');
        }
    }

    public static function create(
        string $uuid,
        string $userId,
        float $amount
    ): self {
        return new self(
            id: '',
            uuid: $uuid,
            userId: $userId,
            amount: $amount,
            createdAt: new \DateTimeImmutable()
        );
    }

    public static function reconstitute(
        string $id,
        string $uuid,
        string $userId,
        float $amount,
        \DateTimeImmutable $createdAt
    ): self {
        return new self(
            id: $id,
            uuid: $uuid,
            userId: $userId,
            amount: $amount,
            createdAt: $createdAt
        );
    }

    public function id(): string
    {
        return $this->id;
    }

    public function uuid(): string
    {
        return $this->uuid;
    }

    public function userId(): string
    {
        return $this->userId;
    }

    public function amount(): float
    {
        return $this->amount;
    }

    public function createdAt(): \DateTimeImmutable
    {
        return $this->createdAt;
    }
}

