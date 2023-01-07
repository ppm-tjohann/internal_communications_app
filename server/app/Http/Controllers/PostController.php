<?php

namespace App\Http\Controllers;

use App\Http\Requests\Post\AddPostRequest;
use App\Models\Like;
use App\Models\Post;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Spatie\QueryBuilder\QueryBuilder;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index(): Response
    {
        $posts = QueryBuilder::for(Post::class)
            ->allowedIncludes(['user', 'likes'])
            ->paginate(50)
            ->appends(request()->query());

        $posts->loadCount('likes');

        return response($posts);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  AddPostRequest  $request
     * @return Response
     */
    public function store(AddPostRequest $request): Response
    {
        $file = $request->file('image')->store('public/uploaded_som_images');
        $file_url = Storage::url($file);

        $user = $request->user();


        $post = new Post([
            'text' => $request->text,
            'image' => $file_url,
        ]);

        $user->posts()->save($post);
        return response($post, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  Post  $post
     * @return Response
     */
    public function show(Post $post): Response
    {
        $post->load('likes');
        $post->loadCount('likes');
        return response($post);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  Post  $post
     * @return Response
     */
    public function update(Request $request, Post $post): Response
    {
        $post->update($request->all());
        return response($post);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Post  $post
     * @return Response
     */
    public function destroy(Post $post): Response
    {
        $post->delete();
        return response(['message' => 'Event deleted'], 200);
    }

    /**
     * Toggle likes from Post
     *
     * @param  Post  $post
     * @return Response
     */
    public function like(Post $post, Request $request): Response
    {

        $post->load('likes');
        foreach ($post->likes as $like) {
            if ($like->user_id === $request->user()->id) {
                $like->delete();
                return response([
                    'post' => $post, 'message' => 'Like has been removed'
                ], 200);
            }
        }

        $like = $request->user()->likes()->create();

        $like->save();
        $post->likes()->attach($like);
        $post = $post->with('likes')->first();

        return response(['post' => $post, 'message' => 'Like has been created'],
            201);

    }

    public function comment(Post $post, Request $request): Response
    {
        $likes = $post->likes();
        return response($likes);
    }
}
