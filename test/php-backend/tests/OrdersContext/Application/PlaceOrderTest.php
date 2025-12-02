<?php

declare(strict_types=1);

namespace Tests\OrdersContext\Application;

use OrdersContext\Application\Commands\PlaceOrderCommand;
use OrdersContext\Application\UseCases\PlaceOrder;
use OrdersContext\Domain\Entities\Order;
use OrdersContext\Domain\Ports\OrderRepository;
use OrdersContext\Domain\Ports\UserValidator;
use PHPUnit\Framework\TestCase;

final class PlaceOrderTest extends TestCase
{
    private OrderRepository $orderRepository;
    private UserValidator $userValidator;
    private PlaceOrder $placeOrder;

    protected function setUp(): void
    {
        $this->orderRepository = $this->createMock(OrderRepository::class);
        $this->userValidator = $this->createMock(UserValidator::class);
        $this->placeOrder = new PlaceOrder($this->orderRepository, $this->userValidator);
    }

    public function testPlacesOrderForValidUser(): void
    {
        $command = new PlaceOrderCommand('user-uuid-123', 99.99);

        $this->userValidator
            ->expects($this->once())
            ->method('userExists')
            ->with('user-uuid-123')
            ->willReturn(true);

        $this->orderRepository
            ->expects($this->once())
            ->method('save')
            ->with($this->callback(function (Order $order) {
                return $order->userId() === 'user-uuid-123' && $order->amount() === 99.99;
            }));

        $uuid = $this->placeOrder->execute($command);
        $this->assertNotEmpty($uuid);
    }

    public function testThrowsExceptionWhenUserDoesNotExist(): void
    {
        $command = new PlaceOrderCommand('non-existent-user', 99.99);

        $this->userValidator
            ->expects($this->once())
            ->method('userExists')
            ->willReturn(false);

        $this->orderRepository
            ->expects($this->never())
            ->method('save');

        $this->expectException(\DomainException::class);
        $this->expectExceptionMessage('User does not exist');
        $this->placeOrder->execute($command);
    }

    public function testThrowsExceptionForZeroAmount(): void
    {
        $command = new PlaceOrderCommand('user-uuid-123', 0);

        $this->userValidator
            ->expects($this->once())
            ->method('userExists')
            ->willReturn(true);

        $this->orderRepository
            ->expects($this->never())
            ->method('save');

        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('Order amount must be greater than zero');
        $this->placeOrder->execute($command);
    }

    public function testThrowsExceptionForNegativeAmount(): void
    {
        $command = new PlaceOrderCommand('user-uuid-123', -10);

        $this->userValidator
            ->expects($this->once())
            ->method('userExists')
            ->willReturn(true);

        $this->orderRepository
            ->expects($this->never())
            ->method('save');

        $this->expectException(\InvalidArgumentException::class);
        $this->placeOrder->execute($command);
    }
}

