<?php

namespace Database\Seeders;

use App\Models\Message;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class MessageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user_1 = User::where('username', '=', 'uroot')->first();
        $user_2 = User::where('username', '=', 'aroot')->first();

        $message_count = 20;
        $counter = 0;

        while ($counter <= $message_count) {
            $sendMessage = rand(1, 2);
            $replyMessage = rand(1, 2);
            for ($i = 0; $i < $sendMessage; $i++) {
                Message::create([
                    'text' => fake()->sentence(10, 3),
                    'sender_id' => $user_1->id,
                    'recipient_id' => $user_2->id,
                ]);
            }
            for ($i = 0; $i < $replyMessage; $i++) {
                Message::create([
                    'text' => fake()->sentence(10, 3),
                    'sender_id' => $user_2->id,
                    'recipient_id' => $user_1->id,
                ]);
            }

            $counter++;
        }
    }
}
