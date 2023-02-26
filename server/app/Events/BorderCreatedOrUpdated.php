<?php

namespace App\Events;

use App\Models\Border;
use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class BorderCreatedOrUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public Border $border;
    private User $user;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Border $border)
    {
        $this->border = $border;
        $this->user = $border->user;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('border.'.$this->user->id);
    }

    public function broadcastAs()
    {
        return 'border.update';
    }
}
