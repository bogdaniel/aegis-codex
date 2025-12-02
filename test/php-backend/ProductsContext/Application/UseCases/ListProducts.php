<?php

declare(strict_types=1);

namespace ProductsContext\Application\UseCases;

use ProductsContext\Domain\Ports\ProductRepository;

final class ListProducts
{
    public function __construct(
        private readonly ProductRepository $productRepository
    ) {
    }

    /**
     * @return array<array{uuid: string, name: string, description: string, price: float, createdAt: string}>
     */
    public function execute(): array
    {
        $products = $this->productRepository->findAll();

        return array_map(
            fn($product) => [
                'uuid' => $product->uuid(),
                'name' => $product->name(),
                'description' => $product->description(),
                'price' => $product->price(),
                'createdAt' => $product->createdAt()->format('Y-m-d H:i:s')
            ],
            $products
        );
    }
}

