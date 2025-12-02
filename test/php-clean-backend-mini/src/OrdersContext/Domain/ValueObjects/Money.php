<?php

declare(strict_types=1);

namespace OrdersContext\Domain\ValueObjects;

final class Money
{
    private function __construct(
        private readonly int $amountInCents
    ) {
        if ($amountInCents < 0) {
            throw new \InvalidArgumentException('Money amount cannot be negative');
        }
    }

    public static function fromCents(int $cents): self
    {
        return new self($cents);
    }

    public static function fromDollars(float $dollars): self
    {
        return new self((int) round($dollars * 100));
    }

    public function amountInCents(): int
    {
        return $this->amountInCents;
    }

    public function equals(self $other): bool
    {
        return $this->amountInCents === $other->amountInCents;
    }
}

