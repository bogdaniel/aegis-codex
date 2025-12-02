<?php

declare(strict_types=1);

namespace IdentityContext\Infrastructure\Adapters;

use IdentityContext\Application\Ports\EventPublisher;

final class InMemoryEventPublisher implements EventPublisher
{
    /** @var array<object> */
    private array $publishedEvents = [];

    public function publish(object $event): void
    {
        $this->publishedEvents[] = $event;
    }

    /** @return array<object> */
    public function getPublishedEvents(): array
    {
        return $this->publishedEvents;
    }

    public function clear(): void
    {
        $this->publishedEvents = [];
    }
}

