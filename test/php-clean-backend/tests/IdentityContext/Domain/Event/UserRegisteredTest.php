<?php

declare(strict_types=1);

namespace AegisCodex\Tests\IdentityContext\Domain\Event;

use AegisCodex\IdentityContext\Domain\Event\UserRegistered;
use AegisCodex\IdentityContext\Domain\ValueObject\UserEmail;
use AegisCodex\IdentityContext\Domain\ValueObject\UserId;
use PHPUnit\Framework\TestCase;

final class UserRegisteredTest extends TestCase
{
    public function testUserRegisteredEvent(): void
    {
        $userId = UserId::generate();
        $email = UserEmail::fromString('test@example.com');

        $event = new UserRegistered($userId, $email);

        $this->assertTrue($event->userId()->equals($userId));
        $this->assertTrue($event->email()->equals($email));
        $this->assertEquals('identity.user.registered', $event->eventName());
        $this->assertNotEmpty($event->eventId());
        $this->assertInstanceOf(\DateTimeImmutable::class, $event->occurredOn());
    }
}

