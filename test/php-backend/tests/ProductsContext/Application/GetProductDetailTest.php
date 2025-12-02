<?php

declare(strict_types=1);

namespace Tests\ProductsContext\Application;

use ProductsContext\Application\UseCases\GetProductDetail;
use ProductsContext\Domain\Entities\Product;
use ProductsContext\Domain\Ports\ProductRepository;
use PHPUnit\Framework\TestCase;

final class GetProductDetailTest extends TestCase
{
    private ProductRepository $productRepository;
    private GetProductDetail $getProductDetail;

    protected function setUp(): void
    {
        $this->productRepository = $this->createMock(ProductRepository::class);
        $this->getProductDetail = new GetProductDetail($this->productRepository);
    }

    public function testReturnsProductWhenFound(): void
    {
        $product = Product::create('product-uuid-123', 'Test Product', 'Description', 29.99);

        $this->productRepository
            ->expects($this->once())
            ->method('findByUuid')
            ->with('product-uuid-123')
            ->willReturn($product);

        $result = $this->getProductDetail->execute('product-uuid-123');

        $this->assertIsArray($result);
        $this->assertEquals('product-uuid-123', $result['uuid']);
        $this->assertEquals('Test Product', $result['name']);
        $this->assertEquals('Description', $result['description']);
        $this->assertEquals(29.99, $result['price']);
    }

    public function testReturnsNullWhenProductNotFound(): void
    {
        $this->productRepository
            ->expects($this->once())
            ->method('findByUuid')
            ->with('non-existent-uuid')
            ->willReturn(null);

        $result = $this->getProductDetail->execute('non-existent-uuid');

        $this->assertNull($result);
    }
}

