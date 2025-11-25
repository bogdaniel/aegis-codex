/**
 * IdentityValidationPort - ACL Interface (Anti-Corruption Layer)
 * OrdersContext defines this ACL interface to shield itself from IdentityContext's exact semantics.
 * The canonical IdentityPort is owned by IdentityContext.
 * This ACL interface is implemented by IdentityPortAdapter in Infrastructure layer.
 */
export interface IdentityValidationPort {
  validateToken(token: string): Promise<{ userId: string } | null>;
}

