<?php

declare(strict_types=1);

namespace AegisCodex\Tests\OrdersContext\Application\UseCase;

use AegisCodex\IdentityContext\Application\UseCase\RegisterUser\RegisterUserCommand;
use AegisCodex\IdentityContext\Application\UseCase\RegisterUser\RegisterUserHandler;
use AegisCodex\IdentityContext\Domain\Port\PasswordHasher;
use AegisCodex\IdentityContext\Domain\Port\UserRepository;
use AegisCodex\IdentityContext\Domain\ValueObject\UserId;
use AegisCodex\IdentityContext\Infrastructure\Persistence\InMemoryUserRepository;
use AegisCodex\IdentityContext\Infrastructure\Security\NativePasswordHasher;
use AegisCodex\OrdersContext\Application\UseCase\PlaceOrder\PlaceOrderCommand;
use AegisCodex\OrdersContext\Application\UseCase\PlaceOrder\PlaceOrderHandler;
use AegisCodex\OrdersContext\Domain\Port\IdentityPort;
use AegisCodex\OrdersContext\Domain\Port\OrderRepository;
use AegisCodex\OrdersContext\Infrastructure\Integration\IdentityPortInMemoryAdapter;
use AegisCodex\OrdersContext\Infrastructure\Persistence\InMemoryOrderRepository;
use AegisCodex\Shared\Application\Port\EventPublisher;
use AegisCodex\Shared\Infrastructure\Event\InMemoryEventPublisher;
use DomainException;
use PHPUnit\Framework\TestCase;

final class PlaceOrderHandlerTest extends TestCase
{
    private UserRepository $userRepository;
    private PasswordHasher $passwordHasher;
    private EventPublisher $eventPublisher;
    private OrderRepository $orderRepository;
    private IdentityPort $identityPort;
    private RegisterUserHandler $registerHandler;
    private PlaceOrderHandler $placeOrderHandler;

    protected function setUp(): void
    {
        $this->userRepository = new InMemoryUserRepository();
        $this->passwordHasher = new NativePasswordHasher();
        $this->eventPublisher = new InMemoryEventPublisher();
        $this->orderRepository = new InMemoryOrderRepository();
        $this->identityPort = new IdentityPortInMemoryAdapter($this->userRepository);

        $this->registerHandler = new RegisterUserHandler(
            $this->userRepository,
            $this->passwordHasher,
            $this->eventPublisher
        );

        $this->placeOrderHandler = new PlaceOrderHandler(
            $this->orderRepository,
            $this->identityPort
        );
    }

    public function testPlaceOrderSuccessfully(): void
    {
        $registerCommand = new RegisterUserCommand('test@example.com', 'password123');
        $userId = $this->registerHandler->handle($registerCommand);

        $placeOrderCommand = new PlaceOrderCommand($userId, 5000, 'USD');
        $orderId = $this->placeOrderHandler->handle($placeOrderCommand);

        $this->assertNotNull($orderId);
        $this->assertNotEmpty($orderId->toString());

        $order = $this->orderRepository->findById($orderId);
        $this->assertNotNull($order);
        $this->assertTrue($order->id()->equals($orderId));
        $this->assertTrue($order->userId()->equals($userId));
        $this->assertEquals(5000, $order->total()->amountInCents());
    }

    public function testPlaceOrderWithNonExistentUserThrowsException(): void
    {
        $nonExistentUserId = UserId::generate();
        $command = new PlaceOrderCommand($nonExistentUserId, 5000, 'USD');

        $this->expectException(DomainException::class);
        $this->expectExceptionMessage('User does not exist');

        $this->placeOrderHandler->handle($command);
    }
}

