<?php

declare(strict_types=1);

namespace ProductsContext\Interface\Http;

use ProductsContext\Application\UseCases\ListProducts;

final class ListProductsController
{
    public function __construct(
        private readonly ListProducts $listProducts
    ) {
    }

    public function handle(): array
    {
        try {
            $products = $this->listProducts->execute();

            return [
                'status' => 200,
                'body' => ['products' => $products]
            ];
        } catch (\Exception $e) {
            error_log('ListProducts error: ' . $e->getMessage());
            return [
                'status' => 500,
                'body' => ['error' => 'Internal server error']
            ];
        }
    }
}

