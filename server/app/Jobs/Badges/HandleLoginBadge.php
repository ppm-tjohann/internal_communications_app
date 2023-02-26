<?php

namespace App\Jobs\Badges;

use App\Events\BorderCreatedOrUpdated;
use App\Models\Border;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class HandleLoginBadge implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected User $user;
    protected Border|null $border;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(User $user)
    {
        $this->user = $user;
        $this->border = $user->border;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        if ($this->border === null) {
            $this->checkIronBorder();
            return;
        }

        if ($this->border->value === Border::$TYPES['DIAMAND']) {
            return;
        }


        switch ($this->border->value) {
            case Border::$TYPES['IRON']:
                $this->checkSilverBorder();
                break;
            case Border::$TYPES['SILVER']:
                $this->checkGoldBorder();
                break;
            case Border::$TYPES['GOLD']:
                $this->checkDiamandBorder();
        }
    }


    protected
    function checkIronBorder()
    {
        $findDate = Carbon::now()->subDays(5);
        $loginCount = $this->getRecordsCount($findDate);
        $this->checkBorder('IRON', $loginCount);
    }

    protected
    function checkSilverBorder()
    {
        $findDate = Carbon::now()->startOfMonth();
        $loginCount = $this->getRecordsCount($findDate);
        $this->checkBorder('SILVER', $loginCount);
    }

    protected
    function checkGoldBorder()
    {
        $findDate = Carbon::now()->subMonths(2)->startOfMonth();
        $loginCount = $this->getRecordsCount($findDate);
        $this->checkBorder('GOLD', $loginCount);
    }

    protected
    function checkDiamandBorder()
    {
        $findDate = Carbon::now()->subMonths(3)->startOfMonth();
        $loginCount = $this->getRecordsCount($findDate);
        $this->checkBorder('DIAMAND', $loginCount);
    }


// HELPER
    protected
    function checkBorder(
        $label,
        $logins
    ) {
        error_log('Checking Login Border : '.$label);

        if ($logins >= Border::$LOGIN_COUNT[$label]) {
            error_log('Creating Login Border : '.$label);
            $border = $this->user->border()->updateOrCreate([
                'value' => Border::$TYPES[$label]
            ]);
            BorderCreatedOrUpdated::dispatch($border);
        }
    }

    protected
    function getRecordsCount(
        $date
    ) {
        return $this->user->logins()->where('created_at', '>=', $date)->count();
    }


}
