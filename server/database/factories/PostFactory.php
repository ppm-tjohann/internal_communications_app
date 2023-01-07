<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {

        $randomNumber = rand(0, 200);

        return [
            'text' => fake()->sentence(1),
            'image' => 'https://picsum.photos/800/800?random='.$randomNumber,
        ];
    }
}
