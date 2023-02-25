<?php

namespace App\Events;

use App\Models\Badge;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class BadgeCreatedOrUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public
    Badge $badge;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Badge $badge)
    {
        $this->badge = $badge;
        $this->badge->load('user');
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('badge.'.$this->badge->user->id);
    }

    public function broadcastAs()
    {
        return 'badge.update';
    }

    public function badge()
    {
        Badge::create([
            'user_id' => 7,
            'for' => 'TESTING',
            'variant' => 2
        ]);
    }

}



