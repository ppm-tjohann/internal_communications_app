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

class HandleLikeBadge implements ShouldQueue
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
        error_log('Checking Like Badge');
        $this->user = $user;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $lc = $this->user->loadCount('likes')->likes_count;
        if ($lc < Badge::$LIKE_BADGE[0]) {
            error_log('Not Enough Likes for Batch');
            return;
        }

        for ($i = 1; $i < count(Badge::$LIKE_BADGE); $i++) {
            if ($lc < Badge::$LIKE_BADGE[$i]) {
                Badge::updateOrCreate($this->user, Badge::$LIKE_BADGE_NAME, $i);
                return;
            }
        }
    }
}
