<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $posts = Post::all();

        foreach ($posts as $post) {
            $users_count = rand(0, 5);
            $users = User::all()->random($users_count);
            foreach ($users as $user) {
                Comment::factory()
                    ->for($user)
                    ->for($post, 'commentable')
                    ->create();
            }
        }
    }
}
