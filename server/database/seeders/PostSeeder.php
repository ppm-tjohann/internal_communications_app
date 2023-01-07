<?php

namespace Database\Seeders;

use App\Models\Like;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users_count = rand(10, 20);

        $users = User::all()->random($users_count);


        foreach ($users as $user) {
            $posts_count = rand(0, 3);
            $likes_count = rand(0, 5);
            $like_users = User::all()->random($likes_count);

            $post = Post::factory()
                ->count($posts_count)
                ->for($user)
                ->create();


            foreach ($like_users as $like_user) {
                $like_user->likes()->create()->posts()->attach($post);
            }

        }

    }

    protected function createLikes($post)
    {


        $likes_count = rand(0, 5);
        $like_users = User::all()->random($likes_count);

        foreach ($like_users as $user) {
            Like::factory()
                ->for($user)
                ->for($post);
        }
    }

}
