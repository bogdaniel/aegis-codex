<?php

declare(strict_types=1);

namespace Tests\ProductsContext\Application;

use ProductsContext\Application\UseCases\ListProducts;
use ProductsContext\Domain\Entities\Product;
use ProductsContext\Domain\Ports\ProductRepository;
use PHPUnit\Framework\TestCase;

final class ListProductsTest extends TestCase
{
    private ProductRepository $productRepository;
    private ListProducts $listProducts;

    protected function setUp(): void
    {
        $this->productRepository = $this->createMock(ProductRepository::class);
        $this->listProducts = new ListProducts($this->productRepository);
    }

    public function testReturnsEmptyArrayWhenNoProducts(): void
    {
        $this->productRepository
            ->expects($this->once())
            ->method('findAll')
            ->willReturn([]);

        $result = $this->listProducts->execute();

        $this->assertIsArray($result);
        $this->assertEmpty($result);
    }

    public function testReturnsListOfProducts(): void
    {
        $product1 = Product::create('uuid-1', 'Product 1', 'Description 1', 10.00);
        $product2 = Product::create('uuid-2', 'Product 2', 'Description 2', 20.00);

        $this->productRepository
            ->expects($this->once())
            ->method('findAll')
            ->willReturn([$product1, $product2]);

        $result = $this->listProducts->execute();

        $this->assertCount(2, $result);
        $this->assertEquals('uuid-1', $result[0]['uuid']);
        $this->assertEquals('Product 1', $result[0]['name']);
        $this->assertEquals(10.00, $result[0]['price']);
    }
}

