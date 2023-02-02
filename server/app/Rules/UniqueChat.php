<?php

namespace App\Rules;

use Illuminate\Support\Facades\Auth;
use Illuminate\Contracts\Validation\DataAwareRule;
use Illuminate\Contracts\Validation\InvokableRule;

class UniqueChat implements InvokableRule
{


    /**
     * Run the validation rule.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     * @return void
     */
    public function __invoke($attribute, $value, $fail)
    {
        $auth_user = Auth::user();
        $user_chats = $auth_user->load('chats')->chats;

        foreach ($user_chats as $chat) {
            $chat_user_ids = [];
            foreach ($chat->users as $user) {
                if ($user->id === $auth_user->id) {
                    continue;
                }
                $chat_user_ids[] = $user->id.'';
            }
            if (count(array_diff($value, $chat_user_ids)) === 0) {
                $fail('Chat Already Exists');
            }
        }
    }
}
