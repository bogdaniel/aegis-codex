<?php

declare(strict_types=1);

namespace AegisCodex\OrdersContext\Domain\ValueObject;

enum OrderStatus: string
{
    case PENDING = 'pending';
    case CONFIRMED = 'confirmed';
    case CANCELLED = 'cancelled';
    case COMPLETED = 'completed';
}

