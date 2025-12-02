<?php

declare(strict_types=1);

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);

// Serve static files (HTML, CSS, JS)
if ($path === '/' || $path === '/index.html') {
    readfile(__DIR__ . '/index.html');
    exit;
}

if ($path === '/product-detail.html') {
    readfile(__DIR__ . '/product-detail.html');
    exit;
}

if (preg_match('/\.(css|js|html)$/', $path)) {
    $filePath = __DIR__ . $path;
    if (file_exists($filePath)) {
        $mimeTypes = [
            'css' => 'text/css',
            'js' => 'application/javascript',
            'html' => 'text/html'
        ];
        $ext = pathinfo($filePath, PATHINFO_EXTENSION);
        header('Content-Type: ' . ($mimeTypes[$ext] ?? 'text/plain'));
        readfile($filePath);
        exit;
    }
}

// Handle API requests
if ($path === '/register' || $path === '/orders' || $path === '/users' || $path === '/orders/list' || 
    $path === '/products' || preg_match('#^/products/([^/]+)$#', $path, $matches)) {
    header('Content-Type: application/json');
    
    $services = require __DIR__ . '/../config/bootstrap.php';
    
    $request = [];
    if ($method === 'POST') {
        $input = file_get_contents('php://input');
        $request = json_decode($input, true) ?? [];
    }
    
    $response = ['status' => 404, 'body' => ['error' => 'Not found']];
    
    if ($method === 'POST' && $path === '/register') {
        $response = $services['registerUserController']->handle($request);
    } elseif ($method === 'GET' && $path === '/users') {
        $response = $services['listUsersController']->handle();
    } elseif ($method === 'POST' && $path === '/orders') {
        $response = $services['placeOrderController']->handle($request);
    } elseif ($method === 'GET' && $path === '/orders/list') {
        $response = $services['listOrdersController']->handle();
    } elseif ($method === 'GET' && $path === '/products') {
        $response = $services['listProductsController']->handle();
    } elseif ($method === 'GET' && preg_match('#^/products/([^/]+)$#', $path, $matches)) {
        $productUuid = $matches[1];
        $response = $services['getProductDetailController']->handle($productUuid);
    }
    
    http_response_code($response['status']);
    echo json_encode($response['body'], JSON_PRETTY_PRINT);
    exit;
}

// 404 for everything else
http_response_code(404);
header('Content-Type: application/json');
echo json_encode(['error' => 'Not found']);
