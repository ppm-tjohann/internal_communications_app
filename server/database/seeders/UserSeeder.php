<?php

namespace Database\Seeders;

use App\Models\Post;
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
        User::factory()
            ->count(50)
            ->create();

        // Dev Normal User
        User::create([
            'firstname' => 'User',
            'lastname' => 'Root',
            'username' => 'uroot',
            'email' => 'user@root.de',
            'password' => Hash::make('root')
        ]);

        // Dev Admin User
        User::create([
            'firstname' => 'Admin',
            'lastname' => 'Root',
            'username' => 'aroot',
            'role' => 'ADMIN',
            'email' => 'admin@root.de',
            'password' => Hash::make('root')
        ]);
    }
}
