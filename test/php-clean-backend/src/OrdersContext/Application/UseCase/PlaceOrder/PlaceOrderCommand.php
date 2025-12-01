<?php

declare(strict_types=1);

namespace AegisCodex\OrdersContext\Application\UseCase\PlaceOrder;

use AegisCodex\IdentityContext\Domain\ValueObject\UserId;

final class PlaceOrderCommand
{
    public function __construct(
        public readonly UserId $userId,
        public readonly int $amountInCents,
        public readonly string $currency = 'USD'
    ) {
    }
}

