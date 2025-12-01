<?php

declare(strict_types=1);

namespace AegisCodex\OrdersContext\Domain\Entity;

use AegisCodex\OrdersContext\Domain\ValueObject\Money;
use AegisCodex\OrdersContext\Domain\ValueObject\OrderId;
use AegisCodex\OrdersContext\Domain\ValueObject\OrderStatus;
use AegisCodex\IdentityContext\Domain\ValueObject\UserId;

final class Order
{
    private function __construct(
        private readonly OrderId $id,
        private readonly UserId $userId,
        private readonly Money $total,
        private OrderStatus $status
    ) {
    }

    public static function create(
        OrderId $id,
        UserId $userId,
        Money $total
    ): self {
        return new self($id, $userId, $total, OrderStatus::PENDING);
    }

    public function id(): OrderId
    {
        return $this->id;
    }

    public function userId(): UserId
    {
        return $this->userId;
    }

    public function total(): Money
    {
        return $this->total;
    }

    public function status(): OrderStatus
    {
        return $this->status;
    }

    public function confirm(): void
    {
        if ($this->status !== OrderStatus::PENDING) {
            throw new \DomainException("Only pending orders can be confirmed");
        }

        $this->status = OrderStatus::CONFIRMED;
    }

    public function cancel(): void
    {
        if ($this->status === OrderStatus::COMPLETED) {
            throw new \DomainException("Completed orders cannot be cancelled");
        }

        $this->status = OrderStatus::CANCELLED;
    }
}

