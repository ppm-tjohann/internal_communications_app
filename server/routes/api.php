<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\EventController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::group(['prefix' => 'v1'], function () {
    Route::group(['prefix' => 'auth'], function () {
        Route::post('login', [AuthController::class, 'login']);
        Route::get('logout', [AuthController::class, 'logout']);
    });

    Route::group(
        [
            'middleware' => 'auth:sanctum'
        ],
        function () {

            Route::get('logout', [AuthController::class, 'logout']);
            Route::get('users', [UserController::class, 'index']);
            Route::resource('events', EventController::class);
        });

});

