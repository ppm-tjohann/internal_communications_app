<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = ['text', 'user_id'];


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

    public function comments()
    {
        return $this->morphMany(Comment::class, 'commentable');
    }

}
