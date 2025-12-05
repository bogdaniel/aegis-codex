<?php

declare(strict_types=1);

namespace OrdersContext\Domain\Ports;

interface IdentityValidationPort
{
    public function userExists(string $userId): bool;
}

