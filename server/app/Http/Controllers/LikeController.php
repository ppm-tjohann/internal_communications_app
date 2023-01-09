<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class LikeController extends Controller
{


    public function find(Post $post): Response
    {
        $post->load('likes', 'likes.user');
        $likes = $post->likes;
        return response($likes);
    }

    public function likePost(Post $post, Request $request): Response
    {
        $post->load('likes');
        foreach ($post->likes as $like) {
            if ($like->user_id === $request->user()->id) {
                $like->delete();
                return response([
                    'post' => $post,
                    'message' => 'Like has been removed'
                ]);
            }
        }

        $like = $request->user()->likes()->create();

        $like->save();
        $post->likes()->attach($like);
        $post = $post->with('likes')->first();

        return response([
            'post' => $post,
            'message' => 'Like has been created'
        ], 201);

    }

    public function likeComment(Comment $comment, Request $request): Response
    {
        $comment->load('likes');
        foreach ($comment->likes as $like) {
            if ($like->user_id === $request->user()->id) {
                $like->delete();
                return response([
                    'comment' => $comment,
                    'message' => 'Like has been removed'
                ]);
            }
        }

        $like = $request->user()->likes()->create();
        $comment->likes()->attach($like);
        return response([
            'comment' => $comment, 'message' => 'Like has been created'
        ], 201);


        return response();
    }


}
