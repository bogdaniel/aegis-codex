/**
 * OrdersContext Application Layer - Public API
 * 
 * This is the only approved entry point for cross-context imports.
 * 
 * **Stability:** Stable API - breaking changes require deprecation period and new major version.
 * **Breaking Changes:** Breaking changes to exports require:
 *   - Deprecation period (minimum 1 release cycle)
 *   - New major version
 *   - Migration guide
 * 
 * **Exports:**
 * - **Use Cases:**
 *   - `PlaceOrder` - Create a new order
 *   - `CancelOrder` - Cancel an existing order
 *   - `GetOrderSummary` - Retrieve order summary with authorization
 * - **Ports:**
 *   - `IdentityValidationPort` - ACL interface for validating user identity (adapts to IdentityContext.IdentityPort)
 * - **Types (type-only exports):**
 *   - `PlaceOrderCommand` - Command DTO for placing an order
 *   - `CancelOrderCommand` - Command DTO for canceling an order
 *   - `GetOrderSummaryQuery` - Query DTO for retrieving order summary
 */

// Use Cases
export { PlaceOrder } from './UseCases/PlaceOrder.js';
export { CancelOrder } from './UseCases/CancelOrder.js';
export { GetOrderSummary } from './UseCases/GetOrderSummary.js';

// Ports (ACL interfaces for cross-context use)
export { IdentityValidationPort } from './Ports/IdentityValidationPort.js';

// Commands (exported for type usage, not direct instantiation)
export type { PlaceOrderCommand } from './Commands/PlaceOrderCommand.js';
export type { CancelOrderCommand } from './Commands/CancelOrderCommand.js';
export type { GetOrderSummaryQuery } from './Queries/GetOrderSummaryQuery.js';

