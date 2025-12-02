<?php

declare(strict_types=1);

require_once __DIR__ . '/../vendor/autoload.php';

$dbConfig = require __DIR__ . '/../config/database.php';
$pdo = new \PDO($dbConfig['dsn'], null, null, $dbConfig['options']);

// Sample products
$products = [
    [
        'uuid' => '550e8400-e29b-41d4-a716-446655440001',
        'name' => 'Laptop Pro 15"',
        'description' => 'High-performance laptop with 16GB RAM, 512GB SSD, and Intel i7 processor. Perfect for developers and professionals.',
        'price' => 1299.99
    ],
    [
        'uuid' => '550e8400-e29b-41d4-a716-446655440002',
        'name' => 'Wireless Mouse',
        'description' => 'Ergonomic wireless mouse with precision tracking and long battery life. Compatible with all operating systems.',
        'price' => 29.99
    ],
    [
        'uuid' => '550e8400-e29b-41d4-a716-446655440003',
        'name' => 'Mechanical Keyboard',
        'description' => 'RGB backlit mechanical keyboard with Cherry MX switches. Perfect for gaming and typing.',
        'price' => 149.99
    ],
    [
        'uuid' => '550e8400-e29b-41d4-a716-446655440004',
        'name' => 'USB-C Hub',
        'description' => 'Multi-port USB-C hub with HDMI, USB 3.0, and SD card reader. Compact and portable design.',
        'price' => 49.99
    ],
    [
        'uuid' => '550e8400-e29b-41d4-a716-446655440005',
        'name' => 'Monitor Stand',
        'description' => 'Adjustable monitor stand with cable management. Supports monitors up to 32 inches.',
        'price' => 79.99
    ]
];

$stmt = $pdo->prepare('
    INSERT INTO products (uuid, name, description, price, created_at)
    VALUES (?, ?, ?, ?, ?)
');

$createdAt = (new \DateTimeImmutable())->format('Y-m-d H:i:s');

foreach ($products as $product) {
    try {
        $stmt->execute([
            $product['uuid'],
            $product['name'],
            $product['description'],
            $product['price'],
            $createdAt
        ]);
        echo "Inserted product: {$product['name']}\n";
    } catch (\PDOException $e) {
        if ($e->getCode() === '23000') { // SQLite unique constraint violation
            echo "Product {$product['name']} already exists, skipping...\n";
        } else {
            echo "Error inserting {$product['name']}: {$e->getMessage()}\n";
        }
    }
}

echo "Product seeding completed.\n";

