<?php

namespace App\Observers;

use App\Events\BadgeCreatedOrUpdated;
use App\Models\Badge;

class BadgeObserver
{
    /**
     * Handle the Badge "created" event.
     *
     * @param  \App\Models\Badge  $badge
     * @return void
     */
    public function created(Badge $badge)
    {
        BadgeCreatedOrUpdated::dispatch($badge);
    }

    /**
     * Handle the Badge "updated" event.
     *
     * @param  \App\Models\Badge  $badge
     * @return void
     */
    public function updated(Badge $badge)
    {
    }

    /**
     * Handle the Badge "deleted" event.
     *
     * @param  \App\Models\Badge  $badge
     * @return void
     */
    public function deleted(Badge $badge)
    {
        //
    }

    /**
     * Handle the Badge "restored" event.
     *
     * @param  \App\Models\Badge  $badge
     * @return void
     */
    public function restored(Badge $badge)
    {
        //
    }

    /**
     * Handle the Badge "force deleted" event.
     *
     * @param  \App\Models\Badge  $badge
     * @return void
     */
    public function forceDeleted(Badge $badge)
    {
        //
    }
}
