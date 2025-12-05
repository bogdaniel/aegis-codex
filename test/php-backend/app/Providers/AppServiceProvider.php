<?php

declare(strict_types=1);

namespace App\Providers;

use IdentityContext\Application\UseCases\RegisterUser;
use IdentityContext\Domain\Ports\PasswordHasher;
use IdentityContext\Domain\Ports\UserRepository;
use IdentityContext\Infrastructure\Persistence\EloquentUserRepository;
use IdentityContext\Infrastructure\Services\BcryptPasswordHasher;
use Illuminate\Support\ServiceProvider;
use OrdersContext\Application\UseCases\PlaceOrder;
use OrdersContext\Domain\Ports\IdentityValidationPort;
use OrdersContext\Domain\Ports\OrderRepository;
use OrdersContext\Infrastructure\Adapters\IdentityValidationAdapter;
use OrdersContext\Infrastructure\Persistence\EloquentOrderRepository;

final class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        // Identity Context
        $this->app->singleton(UserRepository::class, EloquentUserRepository::class);
        $this->app->singleton(PasswordHasher::class, BcryptPasswordHasher::class);
        $this->app->singleton(RegisterUser::class, function ($app) {
            return new RegisterUser(
                $app->make(UserRepository::class),
                $app->make(PasswordHasher::class)
            );
        });

        // Orders Context
        $this->app->singleton(OrderRepository::class, EloquentOrderRepository::class);
        $this->app->singleton(IdentityValidationPort::class, IdentityValidationAdapter::class);
        $this->app->singleton(PlaceOrder::class, function ($app) {
            return new PlaceOrder(
                $app->make(OrderRepository::class),
                $app->make(IdentityValidationPort::class)
            );
        });
    }

    public function boot(): void
    {
        //
    }
}

