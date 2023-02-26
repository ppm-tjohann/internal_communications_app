<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Border extends Model
{
    use HasFactory;

    public static $VALUES = ['IRON', 'BRONZE', 'SILVER', 'GOLD', 'DIAMOND'];
    protected $fillable = ['user_id', 'value'];

    public static $LOGIN_COUNT = [
        'IRON' => 5,
        'BRONZE' => 10,
        'SILVER' => 18,
        'GOLD' => 40,
        'DIAMAND' => 70,
    ];

    public static $TYPES = [
        'IRON' => 0,
        'BRONZE' => 1,
        'SILVER' => 2,
        'GOLD' => 3,
        'DIAMAND' => 4
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }


}
