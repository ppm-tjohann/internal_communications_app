<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Badge extends Model
{
    use HasFactory;

    protected $fillable = ['for', 'variant'];


    public static $COMMENT_BADGE = [5, 10, 15, 25, 40];
    public static $POST_BADGE = [3, 5, 10, 25];
    public static $COMMENT_BADGE_NAME = 'COMMENT_BADGE';
    public static $POST_BADGE_NAME = 'POST_BADGE';

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
