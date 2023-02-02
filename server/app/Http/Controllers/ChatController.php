<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Events\NewChatCreated;
use App\Http\Requests\ChatRequest;
use App\Http\Requests\MessageRequest;
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
//        $chat = new Chat($request->all());
        $request->user()->chats()->attach($chat->id);
        foreach ($request->users as $user_id) {
            $user = User::find($user_id);
            $users[] = $user;
            $user->chats()->attach($chat->id);
        }
        $chat->load(['users', 'messages']);
        NewChatCreated::dispatch($chat);

        return response($chat, 201);
    }

    public function find(Chat $chat): Response
    {
        $chat->load(['messages']);
        return response($chat);
    }


    public function send(Chat $chat, MessageRequest $request): Response
    {
        $message = Message::create([
            'user_id' => $request->user()->id,
            'chat_id' => $chat->id,
            'text' => $request->text,
        ]);
        $message->load('user');
        MessageSent::dispatch($message);
        return response($message, 201);
    }

}
