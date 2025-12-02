<?php

declare(strict_types=1);

namespace OrdersContext\Interface\Http;

use OrdersContext\Application\UseCases\ListOrders;

final class ListOrdersController
{
    public function __construct(
        private readonly ListOrders $listOrders
    ) {
    }

    public function handle(): array
    {
        try {
            $orders = $this->listOrders->execute();

            return [
                'status' => 200,
                'body' => ['orders' => $orders]
            ];
        } catch (\Exception $e) {
            error_log('ListOrders error: ' . $e->getMessage());
            return [
                'status' => 500,
                'body' => ['error' => 'Internal server error']
            ];
        }
    }
}

