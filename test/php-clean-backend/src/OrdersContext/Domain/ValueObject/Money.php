<?php

declare(strict_types=1);

namespace AegisCodex\OrdersContext\Domain\ValueObject;

use InvalidArgumentException;

final class Money
{
    private function __construct(
        private readonly int $amountInCents,
        private readonly string $currency
    ) {
        if ($amountInCents < 0) {
            throw new InvalidArgumentException("Amount cannot be negative");
        }

        if (strlen($currency) !== 3) {
            throw new InvalidArgumentException("Currency must be 3 characters");
        }
    }

    public static function fromCents(int $amountInCents, string $currency = 'USD'): self
    {
        return new self($amountInCents, $currency);
    }

    public static function fromDollars(float $amount, string $currency = 'USD'): self
    {
        return new self((int) round($amount * 100), $currency);
    }

    public function amountInCents(): int
    {
        return $this->amountInCents;
    }

    public function currency(): string
    {
        return $this->currency;
    }

    public function equals(self $other): bool
    {
        return $this->amountInCents === $other->amountInCents
            && $this->currency === $other->currency;
    }
}

