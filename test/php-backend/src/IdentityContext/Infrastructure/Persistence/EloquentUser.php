<?php

declare(strict_types=1);

namespace IdentityContext\Infrastructure\Persistence;

use Illuminate\Database\Eloquent\Model;

final class EloquentUser extends Model
{
    protected $table = 'users';

    protected $fillable = ['id', 'email', 'password_hash'];

    public $timestamps = false;

    public $incrementing = false;

    protected $keyType = 'string';
}

