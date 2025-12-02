<?php

declare(strict_types=1);

namespace Tests\IdentityContext\Domain;

use IdentityContext\Domain\Entities\User;
use IdentityContext\Domain\ValueObjects\Email;
use IdentityContext\Domain\ValueObjects\HashedPassword;
use PHPUnit\Framework\TestCase;

final class UserTest extends TestCase
{
    public function testCreatesUserWithUuid(): void
    {
        $email = Email::create('test@example.com');
        $password = HashedPassword::fromPlainText('password123');
        $uuid = 'test-uuid-123';

        $user = User::create($uuid, $email, $password);

        $this->assertEquals($uuid, $user->uuid());
        $this->assertEquals($email, $user->email());
        $this->assertEquals($password, $user->password());
    }

    public function testReconstitutesUser(): void
    {
        $id = '1';
        $uuid = 'test-uuid-123';
        $email = Email::create('test@example.com');
        $password = HashedPassword::fromPlainText('password123');
        $createdAt = new \DateTimeImmutable('2024-01-01 12:00:00');

        $user = User::reconstitute($id, $uuid, $email, $password, $createdAt);

        $this->assertEquals($id, $user->id());
        $this->assertEquals($uuid, $user->uuid());
        $this->assertEquals($createdAt, $user->createdAt());
    }
}

