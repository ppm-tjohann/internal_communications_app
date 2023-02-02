<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    use HasFactory;

    protected $fillable = ['name'];
    protected $with = ['users', 'messages'];


    public static function boot()
    {
        parent::boot();

        static::addGlobalScope('order', function (Builder $builder) {
            $builder->orderBy('updated_at', 'DESC');
        });

    }


    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function lastMessage()
    {
        return $this->hasMany(Message::class)->first();
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'chat_user', 'user_id',
            'chat_id');
    }


}
