<?php

namespace App\Models;

use App\Events\BadgeCreatedOrUpdated;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Badge extends Model
{
    use HasFactory;

    protected $fillable = ['for', 'variant', 'user_id'];


    public static $COMMENT_BADGE = [5, 10, 15, 25, 40];
    public static $POST_BADGE = [3, 5, 10, 25];
    public static $LIKE_BADGE = [3, 5, 10, 25];

    public static $COMMENT_BADGE_NAME = 'COMMENT_BADGE';
    public static $LIKE_BADGE_NAME = 'LIKE_BADGE';
    public static $POST_BADGE_NAME = 'POST_BADGE';

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public static function updateOrCreate(User $user, $for, $badge_variant)
    {
        $badge = $user->badges->wherE('for', '=', $for)->first();
        $prev_badge_variant = 0;

        if ($badge !== null) {
            $prev_badge_variant = $badge->variant;
            $badge->update(['variant' => $badge_variant]);
            if ($badge_variant > $prev_badge_variant) {
                BadgeCreatedOrUpdated::dispatch($badge);
            }
        } else {
            $user->badges()->create([
                'variant' => $badge_variant, 'for' => $for
            ]);
        }
    }


}
