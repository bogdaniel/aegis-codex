<?php

declare(strict_types=1);

require_once __DIR__ . '/../vendor/autoload.php';

$dbConfig = require __DIR__ . '/../config/database.php';
$pdo = new \PDO($dbConfig['dsn'], null, null, $dbConfig['options']);

// Check if products table exists
$stmt = $pdo->query("SELECT name FROM sqlite_master WHERE type='table' AND name='products'");
$exists = $stmt->fetch() !== false;

if ($exists) {
    echo "Products table already exists.\n";
    exit(0);
}

// Create products table
$pdo->exec('
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    uuid TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    created_at TEXT NOT NULL
);
');

echo "Products table created successfully.\n";

