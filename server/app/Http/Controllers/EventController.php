<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddEventRequest;
use App\Models\Event;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Spatie\QueryBuilder\QueryBuilder;

class EventController extends Controller
{

    public function __construct()
    {
        // registering policy
        //   $this->authorizeResource(Event::class, 'events');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {

        $events = QueryBuilder::for(Event::class)
            ->allowedIncludes(['user', 'participants'])
            ->get();

        return response($events);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(AddEventRequest $request): Response
    {
        $user = $request->user();
        $event = new Event($request->all());
        $user->eventsHost()->save($event);


        foreach ($request->participants as $participant) {
            $event->participants()->attach($participant);
        }


        return response($event, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Event $event): Response
    {
        $event = QueryBuilder::for($event)
            ->allowedIncludes(['user', 'participants'])
            ->first();
        return response($event);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Event $event): Response
    {
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
