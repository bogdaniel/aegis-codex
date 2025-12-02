<?php

declare(strict_types=1);

namespace OrdersContext\Interface\Adapters\Http;

use OrdersContext\Application\UseCases\PlaceOrder\PlaceOrder;
use OrdersContext\Application\UseCases\PlaceOrder\PlaceOrderCommand;

/**
 * Thin HTTP controller - delegates to Application use case.
 * No business logic here.
 */
final class PlaceOrderController
{
    public function __construct(
        private readonly PlaceOrder $placeOrder
    ) {
    }

    public function handle(array $request): array
    {
        try {
            $command = new PlaceOrderCommand(
                userId: $request['userId'] ?? '',
                amount: (float) ($request['amount'] ?? 0.0)
            );

            $this->placeOrder->execute($command);

            return [
                'status' => 'success',
                'message' => 'Order placed successfully'
            ];
        } catch (\DomainException $e) {
            return [
                'status' => 'error',
                'message' => $e->getMessage()
            ];
        } catch (\Exception $e) {
            return [
                'status' => 'error',
                'message' => 'Internal server error'
            ];
        }
    }
}

