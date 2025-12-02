<?php

declare(strict_types=1);

return [
    'dsn' => 'sqlite:' . __DIR__ . '/../data/database.sqlite',
    'options' => [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]
];
