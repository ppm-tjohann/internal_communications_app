<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Event;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $count = 10;
        $users = User::all()->random($count);

        foreach ($users as $user) {
            $participants_count = rand(0, 5);
            $participants = User::all()->random($participants_count);

            $event = Event::factory()
                ->for($user)
                ->create();

            foreach ($participants as $user) {
                $user->events()->attach($event);
            }
        }
    }
}
