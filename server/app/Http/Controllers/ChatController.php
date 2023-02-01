<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ChatController extends Controller
{


    protected function getChat()
    {
    }

    public function get(User $user, Request $request): Response
    {
        $messages = Message::where('sender_id', '=', $request->user->id)
            ->orWhere('recipient_id', '=', $user->id)
            ->with(['recipient', 'sender'])
            ->get();

        return response($messages);
    }

    public function store(User $user, Request $request): Response
    {
        $message = new Message([
            'sender_id' => $request->user()->id,
            'recipient_id' => $user->id,
            'text' => $request->text
        ]);
        $message->save();
        $message->load(['sender', 'recipient']);
        return response($message, 201);
    }

    public function read(Message $message): Response
    {
        $message->update([
            'read' => '1'
        ]);
        return response($message, 201);
    }


}
