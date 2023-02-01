<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = ['text', 'user_id'];


    protected static function booted()
    {
        static::addGlobalScope('withCounts', function (Builder $builder) {
            $builder->withCount(['likes'])
                ->with(['likes']);
        });
    }


    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function likes()
    {
        return $this->morphToMany(Like::class, 'likeable', 'likeable');
    }

    public function post()
    {
        return $this->morphTo(Post::class);
    }
}
