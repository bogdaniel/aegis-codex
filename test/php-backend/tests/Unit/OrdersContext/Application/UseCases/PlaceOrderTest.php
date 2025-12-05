<?php

declare(strict_types=1);

namespace Tests\Unit\OrdersContext\Application\UseCases;

use OrdersContext\Application\Commands\PlaceOrderCommand;
use OrdersContext\Application\UseCases\PlaceOrder;
use OrdersContext\Domain\Entities\Order;
use OrdersContext\Domain\Ports\IdentityValidationPort;
use OrdersContext\Domain\Ports\OrderRepository;
use PHPUnit\Framework\TestCase;
use PHPUnit\Framework\MockObject\MockObject;

final class PlaceOrderTest extends TestCase
{
    private OrderRepository&MockObject $orderRepository;
    private IdentityValidationPort&MockObject $identityValidation;
    private PlaceOrder $placeOrder;

    protected function setUp(): void
    {
        $this->orderRepository = $this->createMock(OrderRepository::class);
        $this->identityValidation = $this->createMock(IdentityValidationPort::class);
        $this->placeOrder = new PlaceOrder($this->orderRepository, $this->identityValidation);
    }

    public function testPlaceOrderForExistingUser(): void
    {
        $command = new PlaceOrderCommand('user_123', 99.99);

        $this->identityValidation
            ->expects($this->once())
            ->method('userExists')
            ->with('user_123')
            ->willReturn(true);

        $this->orderRepository
            ->expects($this->once())
            ->method('save')
            ->with($this->callback(function (Order $order) {
                return $order->userId() === 'user_123'
                    && $order->amount() === 99.99;
            }));

        $orderId = $this->placeOrder->execute($command);
        $this->assertStringStartsWith('order_', $orderId);
    }

    public function testPlaceOrderForNonExistentUserThrowsException(): void
    {
        $command = new PlaceOrderCommand('non_existent_user', 99.99);

        $this->identityValidation
            ->expects($this->once())
            ->method('userExists')
            ->with('non_existent_user')
            ->willReturn(false);

        $this->expectException(\RuntimeException::class);
        $this->expectExceptionMessage('User not found');

        $this->placeOrder->execute($command);
    }
}

