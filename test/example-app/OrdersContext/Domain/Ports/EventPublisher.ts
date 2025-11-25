/**
 * EventPublisher - Port (Interface)
 * Defined in Domain layer; implemented in Infrastructure.
 * Used to publish domain events (e.g., OrderPlaced).
 */
export interface EventPublisher {
  publish(event: unknown): Promise<void>;
}

