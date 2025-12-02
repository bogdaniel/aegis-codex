<?php

declare(strict_types=1);

namespace Tests\OrdersContext\Domain\ValueObjects;

use OrdersContext\Domain\ValueObjects\Money;
use PHPUnit\Framework\TestCase;

final class MoneyTest extends TestCase
{
    public function testCreatesFromCents(): void
    {
        $money = Money::fromCents(1000);
        
        $this->assertSame(1000, $money->amountInCents());
    }

    public function testCreatesFromDollars(): void
    {
        $money = Money::fromDollars(10.50);
        
        $this->assertSame(1050, $money->amountInCents());
    }

    public function testRejectsNegativeAmount(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('Money amount cannot be negative');
        
        Money::fromCents(-100);
    }

    public function testRejectsNegativeDollars(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('Money amount cannot be negative');
        
        Money::fromDollars(-10.50);
    }

    public function testEqualsReturnsTrueForSameAmount(): void
    {
        $money1 = Money::fromCents(1000);
        $money2 = Money::fromCents(1000);
        
        $this->assertTrue($money1->equals($money2));
    }

    public function testEqualsReturnsFalseForDifferentAmounts(): void
    {
        $money1 = Money::fromCents(1000);
        $money2 = Money::fromCents(2000);
        
        $this->assertFalse($money1->equals($money2));
    }

    public function testHandlesZeroAmount(): void
    {
        $money = Money::fromCents(0);
        
        $this->assertSame(0, $money->amountInCents());
    }
}

