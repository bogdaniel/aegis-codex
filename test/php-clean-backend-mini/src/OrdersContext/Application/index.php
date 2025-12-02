<?php

declare(strict_types=1);

namespace OrdersContext\Application;

/**
 * Public API module for OrdersContext Application layer.
 * 
 * This is the only approved entry point for cross-context imports.
 * 
 * Exports:
 * - Use cases: PlaceOrder
 * - Ports: EventPublisher (for cross-context event publishing)
 * 
 * Stability: Stable (Tier M)
 * Breaking changes: Require deprecation period and ADR
 */

use OrdersContext\Application\Ports\EventPublisher;
use OrdersContext\Application\UseCases\PlaceOrder\PlaceOrder;
use OrdersContext\Application\UseCases\PlaceOrder\PlaceOrderCommand;

// Export use cases
// PlaceOrder is exported via class reference

// Export ports
// EventPublisher is exported via interface reference

