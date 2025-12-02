<?php

declare(strict_types=1);

namespace ProductsContext\Domain\Entities;

final class Product
{
    private function __construct(
        private readonly string $id,
        private readonly string $uuid,
        private readonly string $name,
        private readonly string $description,
        private readonly float $price,
        private readonly \DateTimeImmutable $createdAt
    ) {
        if (trim($name) === '') {
            throw new \InvalidArgumentException('Product name cannot be empty');
        }
        if ($price <= 0) {
            throw new \InvalidArgumentException('Product price must be greater than zero');
        }
    }

    public static function create(
        string $uuid,
        string $name,
        string $description,
        float $price
    ): self {
        return new self(
            id: '',
            uuid: $uuid,
            name: $name,
            description: $description,
            price: $price,
            createdAt: new \DateTimeImmutable()
        );
    }

    public static function reconstitute(
        string $id,
        string $uuid,
        string $name,
        string $description,
        float $price,
        \DateTimeImmutable $createdAt
    ): self {
        return new self(
            id: $id,
            uuid: $uuid,
            name: $name,
            description: $description,
            price: $price,
            createdAt: $createdAt
        );
    }

    public function id(): string
    {
        return $this->id;
    }

    public function uuid(): string
    {
        return $this->uuid;
    }

    public function name(): string
    {
        return $this->name;
    }

    public function description(): string
    {
        return $this->description;
    }

    public function price(): float
    {
        return $this->price;
    }

    public function createdAt(): \DateTimeImmutable
    {
        return $this->createdAt;
    }
}

