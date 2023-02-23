<?php

namespace App\Jobs\Badges;

use App\Models\Badge;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class HandlePostBadge implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public User $user;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $pc = $this->user->loadCount('posts')->posts_count;
        $badge_variant = 0;
        error_log('POST COUNT : '.$pc);
        if ($pc < Badge::$POST_BADGE[0]) {
            error_log('Not Enough Posts for Batch');
            return;
        }

        for ($i = 1; $i < count(Badge::$POST_BADGE); $i++) {
            if ($pc < Badge::$POST_BADGE[$i]) {
                error_log('Creating Badge: '.$i);
                $this->updateOrCreateBadge($i);
                error_log('Badge Variant: '.$badge_variant);
                return;
            }
        }
        error_log('FAIL');
    }

    protected function updateOrCreateBadge($badge_variant)
    {
        $badge = $this->user->badges->where('for', '=',
            Badge::$POST_BADGE_NAME)->first();
        error_log('BADGE: '.$badge);
        if ($badge !== null) {
            error_log('Updating Badge');
            $badge->update(['variant' => $badge_variant]);
        } else {
            error_log('Creating Badge');
            $this->user->badges()->create([
                'variant' => $badge_variant,
                'for' => Badge::$POST_BADGE_NAME
            ]);
        }
    }
}
