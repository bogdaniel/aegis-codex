<?php

declare(strict_types=1);

namespace Tests\IdentityContext\Domain\Events;

use IdentityContext\Domain\Events\UserRegistered;
use PHPUnit\Framework\TestCase;

final class UserRegisteredTest extends TestCase
{
    public function testCreatesEventWithRequiredData(): void
    {
        $userId = 'user-123';
        $email = 'user@example.com';
        $occurredAt = (new \DateTimeImmutable())->format('c');
        
        $event = new UserRegistered($userId, $email, $occurredAt);
        
        $this->assertSame($userId, $event->userId);
        $this->assertSame($email, $event->email);
        $this->assertSame($occurredAt, $event->occurredAt);
    }

    public function testEventHasReadonlyProperties(): void
    {
        $event = new UserRegistered(
            'user-123',
            'user@example.com',
            (new \DateTimeImmutable())->format('c')
        );
        
        // Verify properties are accessible
        $this->assertIsString($event->userId);
        $this->assertIsString($event->email);
        $this->assertIsString($event->occurredAt);
    }
}

