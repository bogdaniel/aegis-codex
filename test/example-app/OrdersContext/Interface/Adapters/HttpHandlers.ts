/**
 * HttpHandlers - Inbound Adapter (Interface Layer)
 * Translates HTTP requests into Application use cases.
 */

import { PlaceOrder } from '@orders/app/UseCases/PlaceOrder.js';
import { CancelOrder } from '@orders/app/UseCases/CancelOrder.js';
import { GetOrderSummary } from '@orders/app/UseCases/GetOrderSummary.js';
import { PlaceOrderCommand } from '@orders/app/Commands/PlaceOrderCommand.js';
import { CancelOrderCommand } from '@orders/app/Commands/CancelOrderCommand.js';
import { GetOrderSummaryQuery } from '@orders/app/Queries/GetOrderSummaryQuery.js';
import { OrderId } from '@orders/domain/ValueObjects/OrderId.js';

export interface HttpRequest {
  body: Record<string, unknown>;
  headers: Record<string, string>;
  params: Record<string, string>;
  query?: Record<string, unknown>;
}

export interface HttpResponse {
  statusCode: number;
  body: unknown;
}

export class OrdersHttpHandlers {
  constructor(
    private readonly placeOrder: PlaceOrder,
    private readonly cancelOrder: CancelOrder,
    private readonly getOrderSummary: GetOrderSummary
  ) {}

  async handlePlaceOrder(req: HttpRequest): Promise<HttpResponse> {
    try {
      const command: PlaceOrderCommand = {
        userId: String(req.body.userId || ''),
        items: (req.body.items as Array<{
          productId: string;
          quantity: number;
          unitPrice: number;
        }>) || [],
      };

      const orderId = await this.placeOrder.execute(command);

      return {
        statusCode: 201,
        body: {
          orderId: orderId.toString(),
          message: 'Order placed successfully',
        },
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return {
        statusCode: 400,
        body: { error: message },
      };
    }
  }

  async handleCancelOrder(req: HttpRequest): Promise<HttpResponse> {
    try {
      const orderId = OrderId.create(req.params.orderId || '');
      const command: CancelOrderCommand = {
        orderId,
        userId: String(req.body.userId || ''),
      };

      await this.cancelOrder.execute(command);

      return {
        statusCode: 200,
        body: { message: 'Order cancelled successfully' },
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return {
        statusCode: error instanceof Error && message.includes('Unauthorized') ? 403 : 400,
        body: { error: message },
      };
    }
  }

  async handleGetOrderSummary(req: HttpRequest): Promise<HttpResponse> {
    try {
      const orderId = OrderId.create(req.params.orderId || '');
      // userId can come from body (POST) or query params (GET)
      const userId = String(req.body?.userId || req.query?.userId || '');
      const query: GetOrderSummaryQuery = {
        orderId,
        userId,
      };

      const summary = await this.getOrderSummary.execute(query);

      return {
        statusCode: 200,
        body: summary,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return {
        statusCode: error instanceof Error && message.includes('Unauthorized') ? 403 : 404,
        body: { error: message },
      };
    }
  }
}

