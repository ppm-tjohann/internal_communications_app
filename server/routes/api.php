<?php

use App\Http\Controllers\NewsController;
use App\Http\Controllers\ScoreController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ChatController;

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
        Route::get('logout',
            [AuthController::class, 'logout'])->middleware('auth:sanctum');
        Route::get('user',
            [AuthController::class, 'getUser'])->middleware('auth:sanctum');
    });


    Route::group(
        ['middleware' => 'auth:sanctum'],
        function () {
            Route::get('logout', [AuthController::class, 'logout']);
            Route::get('users', [UserController::class, 'index']);

            Route::resource('posts', PostController::class);
            Route::group(['prefix' => 'likes'], function () {
                Route::get('{post}', [LikeController::class, 'find']);
                Route::get('/post/{post}', [LikeController::class, 'likePost']);
                Route::get('/comment/{comment}',
                    [LikeController::class, 'likeComment']);
            });
            Route::group(['prefix' => 'comments'], function () {
                Route::get('{post}', [CommentController::class, 'index']);
                Route::post('post/{post}',
                    [CommentController::class, 'storePostComment']);
                Route::post('comment/{comment}',
                    [CommentController::class, 'storeCommentComment']);
                Route::get('{comment}', [CommentController::class, 'show']);
                Route::put('{comment}', [CommentController::class, 'update']);
                Route::delete('{comment}',
                    [CommentController::class, 'destroy']);
            });


            Route::group(['prefix' => 'chat'], function () {
                Route::get('', [ChatController::class, 'index']);
                Route::get('{chat}', [ChatController::class, 'find']);
                Route::post('', [ChatController::class, 'store']);
                Route::post('{chat}/send', [ChatController::class, 'send']);
            });

            Route::get('news/latest', [NewsController::class, 'latest']);
            Route::apiResource('news', NewsController::class);

            Route::group(['prefix' => 'score'], function () {
                Route::get('', [ScoreController::class, 'index']);
                Route::get('{user}', [ScoreController::class, 'show']);
            });

            Route::resource('events', EventController::class);
            Route::get('events/{startMonth}/{endMonth}',
                [EventController::class, 'dates']);
        });

});

