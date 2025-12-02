<?php

declare(strict_types=1);

namespace OrdersContext\Infrastructure\Persistence;

use OrdersContext\Domain\Entities\Order;
use OrdersContext\Domain\Ports\OrderRepository;
use PDO;

final class PdoOrderRepository implements OrderRepository
{
    public function __construct(
        private readonly PDO $pdo
    ) {
    }

    public function save(Order $order): void
    {
        $stmt = $this->pdo->prepare(
            'INSERT INTO orders (uuid, user_id, amount, created_at) 
             VALUES (:uuid, :user_id, :amount, :created_at)'
        );

        $stmt->execute([
            ':uuid' => $order->uuid(),
            ':user_id' => $order->userId(),
            ':amount' => $order->amount(),
            ':created_at' => $order->createdAt()->format('Y-m-d H:i:s')
        ]);
    }

    public function findByUuid(string $uuid): ?Order
    {
        $stmt = $this->pdo->prepare('SELECT * FROM orders WHERE uuid = :uuid');
        $stmt->execute([':uuid' => $uuid]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($row === false) {
            return null;
        }

        return $this->mapToOrder($row);
    }

    public function findAll(): array
    {
        $stmt = $this->pdo->query('SELECT * FROM orders ORDER BY created_at DESC');
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return array_map(fn(array $row) => $this->mapToOrder($row), $rows);
    }

    private function mapToOrder(array $row): Order
    {
        return Order::reconstitute(
            id: (string) $row['id'],
            uuid: $row['uuid'],
            userId: $row['user_id'],
            amount: (float) $row['amount'],
            createdAt: \DateTimeImmutable::createFromFormat('Y-m-d H:i:s', $row['created_at'])
        );
    }
}

