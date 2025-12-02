<?php

declare(strict_types=1);

namespace Tests\ProductsContext\Domain;

use ProductsContext\Domain\Entities\Product;
use PHPUnit\Framework\TestCase;

final class ProductTest extends TestCase
{
    public function testCreatesProductWithValidData(): void
    {
        $uuid = 'product-uuid-123';
        $name = 'Test Product';
        $description = 'A test product description';
        $price = 29.99;

        $product = Product::create($uuid, $name, $description, $price);

        $this->assertEquals($uuid, $product->uuid());
        $this->assertEquals($name, $product->name());
        $this->assertEquals($description, $product->description());
        $this->assertEquals($price, $product->price());
    }

    public function testRejectsEmptyName(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('Product name cannot be empty');
        Product::create('uuid', '', 'description', 10.00);
    }

    public function testRejectsZeroPrice(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('Product price must be greater than zero');
        Product::create('uuid', 'Name', 'description', 0);
    }

    public function testRejectsNegativePrice(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('Product price must be greater than zero');
        Product::create('uuid', 'Name', 'description', -10.00);
    }

    public function testReconstitutesProduct(): void
    {
        $id = '1';
        $uuid = 'product-uuid-123';
        $name = 'Test Product';
        $description = 'A test product description';
        $price = 29.99;
        $createdAt = new \DateTimeImmutable('2024-01-01 12:00:00');

        $product = Product::reconstitute($id, $uuid, $name, $description, $price, $createdAt);

        $this->assertEquals($id, $product->id());
        $this->assertEquals($uuid, $product->uuid());
        $this->assertEquals($name, $product->name());
        $this->assertEquals($description, $product->description());
        $this->assertEquals($price, $product->price());
        $this->assertEquals($createdAt, $product->createdAt());
    }
}

