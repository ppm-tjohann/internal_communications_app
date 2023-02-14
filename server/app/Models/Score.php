<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Score extends Model
{
    use HasFactory;

    protected $fillable = ['count'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * GetLike: 1 (?)
     * Liking : 2
     * Comment : 5
     * GettingComment : 2 (?)
     * Post : 20
     */


    /**
     * @param  string  $key
     * @return int
     */

    public static function scoreFor(string $key): int
    {
        $scores = [
            'like' => 2,
            'comment' => 5,
            'post' => 20
        ];
        return $scores[$key];
    }

}
