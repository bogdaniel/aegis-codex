<?php

declare(strict_types=1);

namespace OrdersContext\Infrastructure\Persistence;

use Illuminate\Database\Eloquent\Model;

final class EloquentOrder extends Model
{
    protected $table = 'orders';

    protected $fillable = ['id', 'user_id', 'amount'];

    public $timestamps = false;

    public $incrementing = false;

    protected $keyType = 'string';
}

