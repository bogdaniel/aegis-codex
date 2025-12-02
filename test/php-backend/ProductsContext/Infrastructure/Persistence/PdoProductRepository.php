<?php

declare(strict_types=1);

namespace ProductsContext\Infrastructure\Persistence;

use ProductsContext\Domain\Entities\Product;
use ProductsContext\Domain\Ports\ProductRepository;

final class PdoProductRepository implements ProductRepository
{
    public function __construct(
        private readonly \PDO $pdo
    ) {
    }

    /**
     * @return array<Product>
     */
    public function findAll(): array
    {
        $stmt = $this->pdo->query('SELECT * FROM products ORDER BY created_at DESC');
        $rows = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        return array_map(fn($row) => $this->mapToProduct($row), $rows);
    }

    public function findByUuid(string $uuid): ?Product
    {
        $stmt = $this->pdo->prepare('SELECT * FROM products WHERE uuid = ?');
        $stmt->execute([$uuid]);
        $row = $stmt->fetch(\PDO::FETCH_ASSOC);

        if ($row === false) {
            return null;
        }

        return $this->mapToProduct($row);
    }

    private function mapToProduct(array $row): Product
    {
        return Product::reconstitute(
            id: (string) $row['id'],
            uuid: $row['uuid'],
            name: $row['name'],
            description: $row['description'],
            price: (float) $row['price'],
            createdAt: new \DateTimeImmutable($row['created_at'])
        );
    }
}

