<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChatRequest;
use App\Models\Chat;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ChatController extends Controller
{


    public function __construct()
    {
        $this->authorizeResource(Chat::class, 'chat');
    }


    public function index(Request $request): Response
    {
        $chats = $request->user()->load('chats')->chats;
        $chats->loadMissing('messages');

        return response($chats);
    }

    public function store(ChatRequest $request): Response
    {
        $chat = Chat::create($request->all());
        $request->user()->chats()->attach($chat->id);
        $users = [];
        foreach ($request->users as $user_id) {
            $user = User::find($user_id);
            $users[] = $user;
            $user->chats()->attach($chat->id);
        }
        $chat->load('users');

        return response([
            'users' => $users, 'chat' => $chat,
            'request' => $request->all()
        ], 201);
    }

    public function find(Chat $chat): Response
    {
        $chat->load(['messages']);
        return response($chat);
    }


    public function send(Chat $chat, ChatRequest $request): Response
    {

        $chat->messages()->create([
            'user_id' => $request->user()->id,
            'text' => $request->text,
        ]);
        $chat->load('messages');
        return response($chat, 201);
    }


    public function read(Message $message): Response
    {
        $message->update([
            'read' => '1'
        ]);
        return response($message, 201);
    }


}
