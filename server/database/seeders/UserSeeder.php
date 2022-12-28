<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::factory()->count(50)->create();

        // Dev Normal User
        User::create([
            'username' => 'user',
            'email' => 'user@root.de',
            'password' => Hash::make('root')
        ]);

        // Dev Admin User
        User::create([
            'username' => 'admin',
            'role' => 'ADMIN',
            'email' => 'admin@root.de',
            'password' => Hash::make('root')
        ]);
    }
}
