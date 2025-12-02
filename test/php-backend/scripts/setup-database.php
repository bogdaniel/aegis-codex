<?php

declare(strict_types=1);

require_once __DIR__ . '/../vendor/autoload.php';

// Ensure data directory exists
$dataDir = __DIR__ . '/../data';
if (!is_dir($dataDir)) {
    mkdir($dataDir, 0755, true);
}

$dbConfig = require __DIR__ . '/../config/database.php';
$pdo = new PDO($dbConfig['dsn'], null, null, $dbConfig['options']);

$schema = file_get_contents(__DIR__ . '/../config/schema.sql');
$pdo->exec($schema);

echo "Database initialized successfully.\n";

