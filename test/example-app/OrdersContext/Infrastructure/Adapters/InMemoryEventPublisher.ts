import { EventPublisher } from '@orders/domain/Ports/EventPublisher.js';

/**
 * InMemoryEventPublisher - Outbound Adapter (Infrastructure)
 * Implements EventPublisher port using in-memory storage.
 * In a real system, this would publish to a message bus (RabbitMQ, Kafka, etc.).
 */
export class InMemoryEventPublisher implements EventPublisher {
  private readonly publishedEvents: unknown[] = [];

  async publish(event: unknown): Promise<void> {
    this.publishedEvents.push(event);
    // In a real system: await messageBus.publish(event);
  }

  getPublishedEvents(): unknown[] {
    return [...this.publishedEvents];
  }

  clear(): void {
    this.publishedEvents.length = 0;
  }
}

