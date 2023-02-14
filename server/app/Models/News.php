<?php

namespace App\Models;

use App\Models\Scopes\OrderScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    use HasFactory;

    protected $fillable = ['headline', 'image', 'teaser', 'text'];

    protected static function boot()
    {
        parent::boot();
        self::addGlobalScope(new OrderScope('created_at', 'DESC'));
    }

}
