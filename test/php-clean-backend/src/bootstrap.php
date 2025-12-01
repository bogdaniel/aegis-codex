<?php

declare(strict_types=1);

namespace AegisCodex;

require_once __DIR__ . '/../vendor/autoload.php';

use AegisCodex\IdentityContext\Application\UseCase\AuthenticateUser\AuthenticateUserHandler;
use AegisCodex\IdentityContext\Application\UseCase\RegisterUser\RegisterUserHandler;
use AegisCodex\IdentityContext\Domain\Port\PasswordHasher;
use AegisCodex\IdentityContext\Domain\Port\UserRepository;
use AegisCodex\IdentityContext\Infrastructure\Persistence\InMemoryUserRepository;
use AegisCodex\IdentityContext\Infrastructure\Security\NativePasswordHasher;
use AegisCodex\IdentityContext\Interface\Cli\AuthenticateUserCommandCli;
use AegisCodex\IdentityContext\Interface\Cli\RegisterUserCommandCli;
use AegisCodex\OrdersContext\Application\UseCase\PlaceOrder\PlaceOrderHandler;
use AegisCodex\OrdersContext\Domain\Port\IdentityPort;
use AegisCodex\OrdersContext\Domain\Port\OrderRepository;
use AegisCodex\OrdersContext\Infrastructure\Integration\IdentityPortInMemoryAdapter;
use AegisCodex\OrdersContext\Infrastructure\Persistence\InMemoryOrderRepository;
use AegisCodex\OrdersContext\Interface\Cli\PlaceOrderCommandCli;
use AegisCodex\Shared\Application\Port\EventPublisher;
use AegisCodex\Shared\Infrastructure\Event\InMemoryEventPublisher;

/**
 * Simple dependency injection container / wiring.
 * In a real application, this would use a DI container (e.g., PHP-DI, Symfony DI).
 */
final class Bootstrap
{
    private UserRepository $userRepository;
    private PasswordHasher $passwordHasher;
    private EventPublisher $eventPublisher;
    private OrderRepository $orderRepository;
    private IdentityPort $identityPort;

    public function __construct()
    {
        $this->userRepository = new InMemoryUserRepository();
        $this->passwordHasher = new NativePasswordHasher();
        $this->eventPublisher = new InMemoryEventPublisher();
        $this->orderRepository = new InMemoryOrderRepository();
        $this->identityPort = new IdentityPortInMemoryAdapter($this->userRepository);
    }

    public function registerUserCli(): RegisterUserCommandCli
    {
        $handler = new RegisterUserHandler(
            $this->userRepository,
            $this->passwordHasher,
            $this->eventPublisher
        );

        return new RegisterUserCommandCli($handler);
    }

    public function authenticateUserCli(): AuthenticateUserCommandCli
    {
        $handler = new AuthenticateUserHandler(
            $this->userRepository,
            $this->passwordHasher
        );

        return new AuthenticateUserCommandCli($handler);
    }

    public function placeOrderCli(): PlaceOrderCommandCli
    {
        $handler = new PlaceOrderHandler(
            $this->orderRepository,
            $this->identityPort
        );

        return new PlaceOrderCommandCli($handler);
    }
}

