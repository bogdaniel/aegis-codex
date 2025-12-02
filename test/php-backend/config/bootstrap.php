<?php

declare(strict_types=1);

use IdentityContext\Application\UseCases\ListUsers;
use IdentityContext\Application\UseCases\RegisterUser;
use IdentityContext\Infrastructure\Persistence\PdoUserRepository;
use IdentityContext\Interface\Http\ListUsersController;
use IdentityContext\Interface\Http\RegisterUserController;
use OrdersContext\Application\UseCases\ListOrders;
use OrdersContext\Application\UseCases\PlaceOrder;
use OrdersContext\Infrastructure\Persistence\IdentityUserValidator;
use OrdersContext\Infrastructure\Persistence\PdoOrderRepository;
use OrdersContext\Interface\Http\ListOrdersController;
use OrdersContext\Interface\Http\PlaceOrderController;
use ProductsContext\Application\UseCases\GetProductDetail;
use ProductsContext\Application\UseCases\ListProducts;
use ProductsContext\Infrastructure\Persistence\PdoProductRepository;
use ProductsContext\Interface\Http\GetProductDetailController;
use ProductsContext\Interface\Http\ListProductsController;

require_once __DIR__ . '/../vendor/autoload.php';

$dbConfig = require __DIR__ . '/database.php';
$pdo = new \PDO($dbConfig['dsn'], null, null, $dbConfig['options']);

// IdentityContext wiring
$userRepository = new PdoUserRepository($pdo);
$registerUser = new RegisterUser($userRepository);
$registerUserController = new RegisterUserController($registerUser);
$listUsers = new ListUsers($userRepository);
$listUsersController = new ListUsersController($listUsers);

// OrdersContext wiring
$orderRepository = new PdoOrderRepository($pdo);
$userValidator = new IdentityUserValidator($pdo);
$placeOrder = new PlaceOrder($orderRepository, $userValidator);
$placeOrderController = new PlaceOrderController($placeOrder);
$listOrders = new ListOrders($orderRepository);
$listOrdersController = new ListOrdersController($listOrders);

// ProductsContext wiring
$productRepository = new PdoProductRepository($pdo);
$listProducts = new ListProducts($productRepository);
$listProductsController = new ListProductsController($listProducts);
$getProductDetail = new GetProductDetail($productRepository);
$getProductDetailController = new GetProductDetailController($getProductDetail);

return [
    'registerUserController' => $registerUserController,
    'listUsersController' => $listUsersController,
    'placeOrderController' => $placeOrderController,
    'listOrdersController' => $listOrdersController,
    'listProductsController' => $listProductsController,
    'getProductDetailController' => $getProductDetailController,
    'pdo' => $pdo
];

