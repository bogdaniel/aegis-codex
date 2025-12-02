<?php

declare(strict_types=1);

namespace OrdersContext\Application\Ports;

interface EventPublisher
{
    public function publish(object $event): void;
}

