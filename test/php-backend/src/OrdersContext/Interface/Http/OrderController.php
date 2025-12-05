<?php

declare(strict_types=1);

namespace OrdersContext\Interface\Http;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use OrdersContext\Application\Commands\PlaceOrderCommand;
use OrdersContext\Application\UseCases\PlaceOrder;

final class OrderController
{
    public function __construct(
        private readonly PlaceOrder $placeOrder
    ) {
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'userId' => 'required|string',
            'amount' => 'required|numeric|min:0.01',
        ]);

        try {
            $command = new PlaceOrderCommand(
                $validated['userId'],
                (float) $validated['amount']
            );
            $orderId = $this->placeOrder->execute($command);

            return response()->json(['orderId' => $orderId], 201);
        } catch (\RuntimeException $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}

