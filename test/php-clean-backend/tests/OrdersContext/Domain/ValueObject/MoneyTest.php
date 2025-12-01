<?php

declare(strict_types=1);

namespace AegisCodex\Tests\OrdersContext\Domain\ValueObject;

use AegisCodex\OrdersContext\Domain\ValueObject\Money;
use InvalidArgumentException;
use PHPUnit\Framework\TestCase;

final class MoneyTest extends TestCase
{
    public function testCreateFromCents(): void
    {
        $money = Money::fromCents(5000, 'USD');

        $this->assertEquals(5000, $money->amountInCents());
        $this->assertEquals('USD', $money->currency());
    }

    public function testCreateFromDollars(): void
    {
        $money = Money::fromDollars(50.00, 'USD');

        $this->assertEquals(5000, $money->amountInCents());
        $this->assertEquals('USD', $money->currency());
    }

    public function testCreateWithNegativeAmountThrowsException(): void
    {
        $this->expectException(InvalidArgumentException::class);
        $this->expectExceptionMessage('Amount cannot be negative');

        Money::fromCents(-100, 'USD');
    }

    public function testCreateWithInvalidCurrencyThrowsException(): void
    {
        $this->expectException(InvalidArgumentException::class);
        $this->expectExceptionMessage('Currency must be 3 characters');

        Money::fromCents(5000, 'US');
    }

    public function testEqualsWithSameAmountAndCurrency(): void
    {
        $money1 = Money::fromCents(5000, 'USD');
        $money2 = Money::fromCents(5000, 'USD');

        $this->assertTrue($money1->equals($money2));
    }

    public function testEqualsWithDifferentAmount(): void
    {
        $money1 = Money::fromCents(5000, 'USD');
        $money2 = Money::fromCents(6000, 'USD');

        $this->assertFalse($money1->equals($money2));
    }

    public function testEqualsWithDifferentCurrency(): void
    {
        $money1 = Money::fromCents(5000, 'USD');
        $money2 = Money::fromCents(5000, 'EUR');

        $this->assertFalse($money1->equals($money2));
    }
}

