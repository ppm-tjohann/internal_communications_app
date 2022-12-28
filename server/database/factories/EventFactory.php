<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $startingDate = fake()->dateTimeThisYear('+1 month');
        $endingDate = date('Y-m-d H:i:s', strtotime('+1 hour', $startingDate->getTimestamp()));

        $user = User::all()->random(1);


        return [
            'name' => fake()->words(4, true),
            'description' => fake()->sentence(10),
            'start' => $startingDate,
            'end' => $endingDate,
            'user_id' => $user[0]->id
        ];
    }
}
