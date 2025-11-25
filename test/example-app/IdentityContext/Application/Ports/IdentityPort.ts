/**
 * IdentityPort - Port for cross-context identity validation
 * Exposed to other contexts (e.g., OrdersContext) to validate tokens.
 * Defined in Application layer; implemented in Infrastructure.
 */
export interface IdentityPort {
  validateToken(token: string): Promise<{ userId: string } | null>;
}

