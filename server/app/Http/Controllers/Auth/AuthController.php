<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $credentials = $request->only(['email', 'password']);
        if (!Auth::attempt($credentials)) {
            return response(['message' => 'Login failed', 'credentials' => $credentials], 422);
        }
        $token = $request->user()->createToken($request->email);

        return response([
            'user' => $request->user(),
            'token' => $token
        ]);

    }

    public function logout(Request $request)
    {
        $user = $request->user()->tokens()->delete();
        return response(['message' => 'User logged out']);
    }

    public function getUser(Request $request)
    {
        return response($request->user());
    }


}
