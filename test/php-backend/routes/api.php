<?php

declare(strict_types=1);

use IdentityContext\Interface\Http\IdentityController;
use Illuminate\Support\Facades\Route;
use OrdersContext\Interface\Http\OrderController;

Route::post('/identity/register', [IdentityController::class, 'register']);
Route::post('/orders', [OrderController::class, 'store']);

