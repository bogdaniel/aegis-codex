<?php

declare(strict_types=1);

namespace Tests\OrdersContext\Application\UseCases\PlaceOrder;

use OrdersContext\Application\Ports\EventPublisher;
use OrdersContext\Application\Ports\IdentityValidationPort;
use OrdersContext\Application\UseCases\PlaceOrder\PlaceOrder;
use OrdersContext\Application\UseCases\PlaceOrder\PlaceOrderCommand;
use OrdersContext\Domain\Entities\Order;
use OrdersContext\Domain\Events\OrderPlaced;
use OrdersContext\Domain\Ports\OrderRepository;
use PHPUnit\Framework\TestCase;
use PHPUnit\Framework\MockObject\MockObject;

final class PlaceOrderTest extends TestCase
{
    private OrderRepository&MockObject $orderRepository;
    private IdentityValidationPort&MockObject $identityValidation;
    private EventPublisher&MockObject $eventPublisher;
    private PlaceOrder $placeOrder;

    protected function setUp(): void
    {
        $this->orderRepository = $this->createMock(OrderRepository::class);
        $this->identityValidation = $this->createMock(IdentityValidationPort::class);
        $this->eventPublisher = $this->createMock(EventPublisher::class);
        $this->placeOrder = new PlaceOrder(
            $this->orderRepository,
            $this->identityValidation,
            $this->eventPublisher
        );
    }

    public function testPlacesOrderSuccessfully(): void
    {
        $command = new PlaceOrderCommand('user-123', 99.99);
        
        $this->identityValidation
            ->expects($this->once())
            ->method('userExists')
            ->with('user-123')
            ->willReturn(true);
        
        $this->orderRepository
            ->expects($this->once())
            ->method('save')
            ->with($this->callback(function (Order $order) {
                return $order->userId() === 'user-123'
                    && $order->amount()->amountInCents() === 9999;
            }));
        
        $this->eventPublisher
            ->expects($this->once())
            ->method('publish')
            ->with($this->isInstanceOf(OrderPlaced::class));
        
        $this->placeOrder->execute($command);
    }

    public function testThrowsExceptionWhenUserDoesNotExist(): void
    {
        $command = new PlaceOrderCommand('non-existent-user', 99.99);
        
        $this->identityValidation
            ->expects($this->once())
            ->method('userExists')
            ->with('non-existent-user')
            ->willReturn(false);
        
        $this->orderRepository
            ->expects($this->never())
            ->method('save');
        
        $this->eventPublisher
            ->expects($this->never())
            ->method('publish');
        
        $this->expectException(\DomainException::class);
        $this->expectExceptionMessage('User does not exist');
        
        $this->placeOrder->execute($command);
    }

    public function testThrowsExceptionWhenAmountIsNegative(): void
    {
        $command = new PlaceOrderCommand('user-123', -10.00);
        
        $this->identityValidation
            ->method('userExists')
            ->willReturn(true);
        
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('Money amount cannot be negative');
        
        $this->placeOrder->execute($command);
    }

    public function testPublishesOrderPlacedEventWithCorrectData(): void
    {
        $command = new PlaceOrderCommand('user-123', 99.99);
        
        $this->identityValidation
            ->method('userExists')
            ->willReturn(true);
        
        $this->eventPublisher
            ->expects($this->once())
            ->method('publish')
            ->with($this->callback(function (OrderPlaced $event) {
                return $event->userId === 'user-123'
                    && $event->amountInCents === 9999
                    && !empty($event->orderId)
                    && !empty($event->occurredAt);
            }));
        
        $this->placeOrder->execute($command);
    }
}

