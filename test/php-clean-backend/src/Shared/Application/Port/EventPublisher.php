<?php

declare(strict_types=1);

namespace AegisCodex\Shared\Application\Port;

use AegisCodex\Shared\Domain\Event\DomainEvent;

interface EventPublisher
{
    public function publish(DomainEvent $event): void;
}

