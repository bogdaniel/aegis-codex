<?php

declare(strict_types=1);

namespace OrdersContext\Interface\Http;

use OrdersContext\Application\Commands\PlaceOrderCommand;
use OrdersContext\Application\UseCases\PlaceOrder;

final class PlaceOrderController
{
    public function __construct(
        private readonly PlaceOrder $placeOrder
    ) {
    }

    public function handle(array $request): array
    {
        $userId = $request['userId'] ?? '';
        $amount = $request['amount'] ?? null;

        if (empty($userId) || $amount === null) {
            return [
                'status' => 400,
                'body' => ['error' => 'userId and amount are required']
            ];
        }

        $amount = (float) $amount;

        try {
            $command = new PlaceOrderCommand($userId, $amount);
            $uuid = $this->placeOrder->execute($command);

            return [
                'status' => 201,
                'body' => ['uuid' => $uuid, 'message' => 'Order placed successfully']
            ];
        } catch (\InvalidArgumentException $e) {
            return [
                'status' => 400,
                'body' => ['error' => $e->getMessage()]
            ];
        } catch (\DomainException $e) {
            return [
                'status' => 404,
                'body' => ['error' => $e->getMessage()]
            ];
        } catch (\RuntimeException $e) {
            return [
                'status' => 500,
                'body' => ['error' => 'Internal server error']
            ];
        } catch (\Exception $e) {
            // Log error but don't expose details to client
            error_log('PlaceOrder error: ' . $e->getMessage());
            return [
                'status' => 500,
                'body' => ['error' => 'Internal server error']
            ];
        }
    }
}

