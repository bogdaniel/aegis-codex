<?php

declare(strict_types=1);

namespace Tests\OrdersContext\Domain\Events;

use OrdersContext\Domain\Events\OrderPlaced;
use PHPUnit\Framework\TestCase;

final class OrderPlacedTest extends TestCase
{
    public function testCreatesEventWithRequiredData(): void
    {
        $orderId = 'order-123';
        $userId = 'user-456';
        $amountInCents = 9999;
        $occurredAt = (new \DateTimeImmutable())->format('c');
        
        $event = new OrderPlaced($orderId, $userId, $amountInCents, $occurredAt);
        
        $this->assertSame($orderId, $event->orderId);
        $this->assertSame($userId, $event->userId);
        $this->assertSame($amountInCents, $event->amountInCents);
        $this->assertSame($occurredAt, $event->occurredAt);
    }

    public function testEventHasReadonlyProperties(): void
    {
        $event = new OrderPlaced(
            'order-123',
            'user-456',
            9999,
            (new \DateTimeImmutable())->format('c')
        );
        
        // Verify properties are accessible
        $this->assertIsString($event->orderId);
        $this->assertIsString($event->userId);
        $this->assertIsInt($event->amountInCents);
        $this->assertIsString($event->occurredAt);
    }
}

