<?php

namespace App\Http\Controllers;

use App\Models\Score;
use App\Models\User;
use Illuminate\Http\Client\Response;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;

class ScoreController extends Controller
{
    public function index()
    {
        $scores = QueryBuilder::for(Score::class)
            ->allowedIncludes('user')
            ->allowedSorts('count')
            ->get();

        return response($scores);
    }

    public function show(User $user)
    {
        $score = $user->score();
        return response($score);
    }


}
