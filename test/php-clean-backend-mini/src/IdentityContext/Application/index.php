<?php

declare(strict_types=1);

namespace IdentityContext\Application;

/**
 * Public API module for IdentityContext Application layer.
 * 
 * This is the only approved entry point for cross-context imports.
 * 
 * Exports:
 * - Use cases: RegisterUser
 * - Ports: EventPublisher (for cross-context event publishing)
 * 
 * Stability: Stable (Tier H)
 * Breaking changes: Require deprecation period and ADR
 */

use IdentityContext\Application\Ports\EventPublisher;
use IdentityContext\Application\UseCases\RegisterUser\RegisterUser;
use IdentityContext\Application\UseCases\RegisterUser\RegisterUserCommand;

// Export use cases
// RegisterUser is exported via class reference

// Export ports
// EventPublisher is exported via interface reference

