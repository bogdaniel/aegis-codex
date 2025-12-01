<?php

declare(strict_types=1);

namespace AegisCodex\Shared\Infrastructure\Event;

use AegisCodex\Shared\Application\Port\EventPublisher;
use AegisCodex\Shared\Domain\Event\DomainEvent;

final class InMemoryEventPublisher implements EventPublisher
{
    /** @var DomainEvent[] */
    private array $publishedEvents = [];

    public function publish(DomainEvent $event): void
    {
        $this->publishedEvents[] = $event;
    }

    /**
     * @return DomainEvent[]
     */
    public function getPublishedEvents(): array
    {
        return $this->publishedEvents;
    }

    public function clear(): void
    {
        $this->publishedEvents = [];
    }
}

