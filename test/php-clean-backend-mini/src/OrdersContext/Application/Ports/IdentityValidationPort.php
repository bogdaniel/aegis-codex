<?php

declare(strict_types=1);

namespace OrdersContext\Application\Ports;

/**
 * ACL interface for IdentityContext validation.
 * 
 * This is OrdersContext's view of identity validation, not IdentityContext's canonical port.
 * The ACL adapter in Infrastructure translates between this and IdentityContext's public API.
 */
interface IdentityValidationPort
{
    public function userExists(string $userId): bool;
}

