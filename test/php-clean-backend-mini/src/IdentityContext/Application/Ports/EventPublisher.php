<?php

declare(strict_types=1);

namespace IdentityContext\Application\Ports;

interface EventPublisher
{
    public function publish(object $event): void;
}

