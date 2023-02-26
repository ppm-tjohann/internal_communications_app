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
        $users = User::all();

        foreach ($users as $user) {
            $events_count = rand(0, 10);
            for ($i = 0; $i < $events_count; $i++) {
                $participants_count = rand(0, 10);

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
}
