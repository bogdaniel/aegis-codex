/**
 * IdentityContext Application Layer - Public API
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
 *   - `RegisterUser` - Register a new user account
 *   - `AuthenticateUser` - Authenticate user credentials and issue token
 *   - `ValidateToken` - Validate authentication token
 * - **Ports:**
 *   - `IdentityPort` - Cross-context port for token validation (used by other contexts)
 * - **Types (type-only exports):**
 *   - `RegisterUserCommand` - Command DTO for user registration
 *   - `AuthenticateUserCommand` - Command DTO for authentication
 *   - `ValidateTokenQuery` - Query DTO for token validation
 */

// Use Cases
export { RegisterUser } from './UseCases/RegisterUser.js';
export { AuthenticateUser } from './UseCases/AuthenticateUser.js';
export { ValidateToken } from './UseCases/ValidateToken.js';

// Ports (for cross-context use)
export { IdentityPort } from './Ports/IdentityPort.js';

// Commands (exported for type usage, not direct instantiation)
export type { RegisterUserCommand } from './Commands/RegisterUserCommand.js';
export type { AuthenticateUserCommand } from './Commands/AuthenticateUserCommand.js';
export type { ValidateTokenQuery } from './Queries/ValidateTokenQuery.js';

