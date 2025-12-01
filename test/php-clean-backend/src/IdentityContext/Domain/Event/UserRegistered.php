<?php

declare(strict_types=1);

namespace AegisCodex\IdentityContext\Domain\Event;

use AegisCodex\Shared\Domain\Event\DomainEvent;
use AegisCodex\IdentityContext\Domain\ValueObject\UserId;
use AegisCodex\IdentityContext\Domain\ValueObject\UserEmail;

final class UserRegistered extends DomainEvent
{
    public function __construct(
        private readonly UserId $userId,
        private readonly UserEmail $email
    ) {
        parent::__construct();
    }

    public function userId(): UserId
    {
        return $this->userId;
    }

    public function email(): UserEmail
    {
        return $this->email;
    }

    public function eventName(): string
    {
        return 'identity.user.registered';
    }
}

