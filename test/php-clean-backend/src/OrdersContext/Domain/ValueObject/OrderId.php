<?php

declare(strict_types=1);

namespace AegisCodex\OrdersContext\Domain\ValueObject;

use AegisCodex\Shared\Domain\ValueObject\Uuid;

final class OrderId
{
    private function __construct(
        private readonly Uuid $value
    ) {
    }

    public static function fromString(string $value): self
    {
        return new self(Uuid::fromString($value));
    }

    public static function generate(): self
    {
        return new self(Uuid::generate());
    }

    public function toString(): string
    {
        return $this->value->toString();
    }

    public function equals(self $other): bool
    {
        return $this->value->equals($other->value);
    }
}

