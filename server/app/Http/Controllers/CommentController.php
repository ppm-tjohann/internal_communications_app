<?php

namespace App\Http\Controllers;

use App\Http\Requests\Comment\CommentRequest;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Post $post): Response
    {
        $post->load(['comments', 'comments.user']);
        $comments = $post->comments;

        return response($comments);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function storePostComment(
        Post $post,
        CommentRequest $request
    ): Response {

        $comment = $post->comments()->create([
            'text' => $request->text,
            'user_id' => $request->user()->id
        ]);
        return response($comment, 201);
    }

    public function storeCommentComment(
        Comment $comment,
        CommentRequest $request
    ): Response {
        $new_comment = $comment->comments()->create([
            'text' => $request->text,
            'user_id' => $request->user()->id
        ]);

        return response($new_comment, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Comment $comment): Response
    {
        $comment->load('user');
        return response($comment);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CommentRequest $request, Comment $comment): Response
    {
        $comment = $comment->update($request->all());
        return response($comment);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment): Response
    {
        $comment->delete();
        return response(['message' => 'Comment has been deleted.']);
    }
}
