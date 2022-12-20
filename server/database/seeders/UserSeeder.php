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
        User::create([
            'username' => 'admin',
            'role' => 'ADMIN',
            'email' => 'admin@root.de',
            'password' => Hash::make('root')
        ]);
    }
}
