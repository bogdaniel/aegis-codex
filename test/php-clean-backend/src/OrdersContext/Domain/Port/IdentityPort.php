<?php

declare(strict_types=1);

namespace AegisCodex\OrdersContext\Domain\Port;

use AegisCodex\IdentityContext\Domain\ValueObject\UserId;

/**
 * ACL-style port for IdentityContext.
 * This is OrdersContext's interface to IdentityContext, not IdentityContext's canonical port.
 */
interface IdentityPort
{
    public function userExists(UserId $userId): bool;
}

