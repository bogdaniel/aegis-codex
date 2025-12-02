<?php

declare(strict_types=1);

namespace ProductsContext\Application\UseCases;

use ProductsContext\Domain\Ports\ProductRepository;

final class GetProductDetail
{
    public function __construct(
        private readonly ProductRepository $productRepository
    ) {
    }

    /**
     * @return array{uuid: string, name: string, description: string, price: float, createdAt: string}|null
     */
    public function execute(string $uuid): ?array
    {
        $product = $this->productRepository->findByUuid($uuid);

        if ($product === null) {
            return null;
        }

        return [
            'uuid' => $product->uuid(),
            'name' => $product->name(),
            'description' => $product->description(),
            'price' => $product->price(),
            'createdAt' => $product->createdAt()->format('Y-m-d H:i:s')
        ];
    }
}

