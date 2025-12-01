<?php

declare(strict_types=1);

namespace AegisCodex\IdentityContext\Domain\ValueObject;

use InvalidArgumentException;

final class UserEmail
{
    private function __construct(
        private readonly string $value
    ) {
        if (!self::isValid($value)) {
            throw new InvalidArgumentException("Invalid email: {$value}");
        }
    }

    public static function fromString(string $value): self
    {
        return new self($value);
    }

    public function toString(): string
    {
        return $this->value;
    }

    public function equals(self $other): bool
    {
        return $this->value === $other->value;
    }

    private static function isValid(string $value): bool
    {
        return filter_var($value, FILTER_VALIDATE_EMAIL) !== false;
    }
}

