<?php

declare(strict_types=1);

namespace ProductsContext\Interface\Http;

use ProductsContext\Application\UseCases\GetProductDetail;

final class GetProductDetailController
{
    public function __construct(
        private readonly GetProductDetail $getProductDetail
    ) {
    }

    public function handle(string $uuid): array
    {
        try {
            $product = $this->getProductDetail->execute($uuid);

            if ($product === null) {
                return [
                    'status' => 404,
                    'body' => ['error' => 'Product not found']
                ];
            }

            return [
                'status' => 200,
                'body' => ['product' => $product]
            ];
        } catch (\Exception $e) {
            error_log('GetProductDetail error: ' . $e->getMessage());
            return [
                'status' => 500,
                'body' => ['error' => 'Internal server error']
            ];
        }
    }
}

