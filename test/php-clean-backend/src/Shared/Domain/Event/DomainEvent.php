<?php

declare(strict_types=1);

namespace AegisCodex\Shared\Domain\Event;

use AegisCodex\Shared\Domain\ValueObject\Uuid;

abstract class DomainEvent
{
    private readonly string $eventId;
    private readonly \DateTimeImmutable $occurredOn;

    public function __construct()
    {
        $this->eventId = Uuid::generate()->toString();
        $this->occurredOn = new \DateTimeImmutable();
    }

    public function eventId(): string
    {
        return $this->eventId;
    }

    public function occurredOn(): \DateTimeImmutable
    {
        return $this->occurredOn;
    }

    abstract public function eventName(): string;
}

