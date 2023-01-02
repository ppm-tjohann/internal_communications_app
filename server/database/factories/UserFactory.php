<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {

        $firstname = fake()->firstName();
        $lastname = fake()->lastName();
        $email = fake()->unique()->safeEmail();
        $avatar = 'https://www.gravatar.com/avatar/'.md5(strtolower(trim($email))).'?d=identicon';

        return [
            'username' => fake()->userName(),
            'firstname' => $firstname,
            'lastname' => $lastname,
            'email' => $email,
            'avatar' => $avatar,
            'password' => Hash::make('password'),
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return static
     */
    public function unverified()
    {
        return $this->state(fn(array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
