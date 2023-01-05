<?php

namespace App\Http\Controllers;

use App\Http\Requests\Post\AddPostRequest;
use App\Models\Post;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index(): Response
    {
        $posts = Post::all();
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
}
