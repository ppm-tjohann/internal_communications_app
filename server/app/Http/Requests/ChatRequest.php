<?php

namespace App\Http\Requests;

use App\Rules\UniqueChat;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ChatRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     * @return array<string, mixed>
     */
    public function rules()
    {

        return [
            'name' => ['string', 'nullable'],
            'users' => ['required', 'array', 'min:1', new UniqueChat],
            'users.*' => 'exists:users,id',
        ];
    }
}
