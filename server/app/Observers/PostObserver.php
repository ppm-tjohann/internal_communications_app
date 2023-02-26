<?php

namespace App\Observers;

use App\Events\PostCreated;
use App\Jobs\AdjustUserScore;
use App\Jobs\Badges\HandlePostBadge;
use App\Models\Post;
use App\Models\Score;

class PostObserver
{
    /**
     * Handle the Post "created" event.
     *
     * @param  \App\Models\Post  $post
     * @return void
     */
    public function created(Post $post)
    {
        AdjustUserScore::dispatch($post->user, Score::scoreFor('post'));
        HandlePostBadge::dispatch($post->user);
        PostCreated::dispatch($post);
    }

    /**
     * Handle the Post "updated" event.
     *
     * @param  \App\Models\Post  $post
     * @return void
     */
    public function updated(Post $post)
    {
        //
    }

    /**
     * Handle the Post "deleted" event.
     *
     * @param  \App\Models\Post  $post
     * @return void
     */
    public function deleted(Post $post)
    {
        AdjustUserScore::dispatch($post->user, -Score::scoreFor('post'));
        HandlePostBadge::dispatch($post->user);
    }

    /**
     * Handle the Post "restored" event.
     *
     * @param  \App\Models\Post  $post
     * @return void
     */
    public function restored(Post $post)
    {
        //
    }

    /**
     * Handle the Post "force deleted" event.
     *
     * @param  \App\Models\Post  $post
     * @return void
     */
    public function forceDeleted(Post $post)
    {
        //
    }
}
