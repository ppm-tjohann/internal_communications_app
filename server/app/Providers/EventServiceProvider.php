<?php

namespace App\Providers;

use App\Models\Badge;
use App\Models\Chat;
use App\Models\Comment;
use App\Models\Like;
use App\Models\Post;
use App\Models\User;
use App\Observers\BadgeObserver;
use App\Observers\ChatObserver;
use App\Observers\CommentObserver;
use App\Observers\LikeObserver;
use App\Observers\PostObserver;
use App\Observers\UserObserver;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event to listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        Chat::observe(ChatObserver::class);
        User::observe(UserObserver::class);
        Like::observe(LikeObserver::class);
        Comment::observe(CommentObserver::class);
        Post::observe(PostObserver::class);
        Badge::observe(BadgeObserver::class);
    }

    /**
     * Determine if events and listeners should be automatically discovered.
     *
     * @return bool
     */
    public function shouldDiscoverEvents()
    {
        return false;
    }
}
