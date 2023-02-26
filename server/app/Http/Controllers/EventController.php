<?php

namespace App\Http\Controllers;

use App\Events\NewEventCreated;
use App\Http\Requests\EventRequest;
use App\Models\Event;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Spatie\QueryBuilder\QueryBuilder;

class EventController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {

        $events = QueryBuilder::for(Event::class)
            ->allowedIncludes(['user', 'participants'])
            ->paginate(50)
            ->appends(request()->query());

        return response($events);

    }

    public function dates($startMonth, $endMonth): Response
    {
        $events = Event::whereMonth('start', '>=', $startMonth)
            ->whereMonth('end', '<=', $endMonth)
            ->orderBy('start', 'ASC')
            ->with([
                'participants' => function ($query) {
                    $query->setEagerLoads([])->select(['id']);
                }
            ])
            ->get(['id', 'name', 'description', 'end', 'start', 'user_id']);

        return response($events);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(EventRequest $request): Response
    {
        $user = $request->user();
        $event = new Event($request->all());
        $user->eventsHost()->save($event);


        foreach ($request->participants as $participant) {
            $event->participants()->attach($participant);
        }

        $event->load(['user', 'participants']);

        error_log($event->participants()->get());
        foreach ($event->participants()->get() as $user) {

            NewEventCreated::dispatch($event, $user);
        }

        return response($event, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Event $event): Response
    {
        $event = QueryBuilder::for(Event::class)
            ->where('id', '=', $event->id)
            ->allowedIncludes(['user', 'participants'])
            ->first();
        return response($event);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EventRequest $request, Event $event): Response
    {
        return response($request);
        // TODO update Request
        $event->update($request->all());
        return response($event);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event): Response
    {
        $event->delete();
        return response(['message' => 'Event deleted'], 200);
    }
}
