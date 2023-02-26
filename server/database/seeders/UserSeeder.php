<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
//        User::factory()
//            ->count(10)
//            ->create();
        $i = 1;
        while ($i <= 25) {
            User::create([
                'firstname' => fake()->firstName('female'),
                'lastname' => fake()->lastName(),
                'email' => fake()->unique()->safeEmail(),
                'username' => fake()->unique()->userName(),
                'number' => fake()->unique()->phoneNumber(),
                'avatar' => 'storage/users/female/avatar-'.$i.'.jpg',
                'password' => Hash::make('password')
            ]);
            User::create([
                'firstname' => fake()->firstName('male'),
                'lastname' => fake()->lastName(),
                'email' => fake()->unique()->safeEmail(),
                'username' => fake()->unique()->userName(),
                'number' => fake()->unique()->phoneNumber(),
                'avatar' => 'storage/users/male/avatar-'.$i.'.jpg',
                'password' => Hash::make('password')
            ]);

            $i++;
        }

        // Dev Normal User
        {
            User::firstOrcreate([
                'firstname' => 'User',
                'lastname' => 'Root',
                'username' => 'uroot',
                'email' => 'user@root.de',
                'password' => Hash::make('root')
            ]);
        }

        // Dev Admin User
        $admin = User::firstOrcreate([
            'firstname' => 'Admin',
            'lastname' => 'Root',
            'username' => 'aroot',
            'role' => 'ADMIN',
            'email' => 'admin@root.de',
            'password' => Hash::make('root')
        ]);

        $admin->logins()->create();
        $admin->logins()->create();
        $admin->logins()->create();
        $admin->logins()->create();
        $admin->logins()->create();

    }
}
