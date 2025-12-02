<?php

declare(strict_types=1);

namespace ProductsContext\Domain\Ports;

use ProductsContext\Domain\Entities\Product;

interface ProductRepository
{
    /**
     * @return array<Product>
     */
    public function findAll(): array;

    public function findByUuid(string $uuid): ?Product;
}

