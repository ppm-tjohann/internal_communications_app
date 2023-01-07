<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    use HasFactory;

    public function posts()
    {
        return $this->morphedByMany(Post::class, 'likeable', 'likeable');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
