<?php

namespace App\Jobs;

use App\Events\UserScoreUpdated;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class AdjustUserScore implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public User $user;
    public int $score_change;


    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(User $user, int $score_change)
    {
        $this->user = $user;
        $this->score_change = $score_change;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        error_log('Adjusting User Score: '.$this->score_change);
        error_log('New Score: '.$this->user->score->count + $this->score_change);
        $this->user->score()
            ->update([
                'count' => $this->user->score->count +
                    $this->score_change
            ]);
        UserScoreUpdated::dispatch($this->user);
    }
}
