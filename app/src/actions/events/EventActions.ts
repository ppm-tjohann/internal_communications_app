import { Dispatch } from 'redux'
import {
    EVENT_ADD_EVENT,
    EVENT_ERROR_EVENT,
    EVENT_LOADING,
    EVENT_REMOVE_EVENT,
    EVENT_SET_EVENTS,
    EVENT_UPDATE_EVENT,
    EventDispatchTypes,
} from './EventActionTypes'
import { AddEventRequest } from '../../interfaces/event'
import { RootState } from '../../Store'
import * as event from '../../lib/api/events'



export const EventSetEvents = () => async ( dispatch: Dispatch<EventDispatchTypes>, getState: () => RootState ) => {
    dispatch( { type: EVENT_LOADING } )
    try {
        const { data: events } = await event.get()
        dispatch( { type: EVENT_SET_EVENTS, payload: { events: events.data } } )
    }
    catch ( e ) {
        dispatch( { type: EVENT_ERROR_EVENT } )
    }
    dispatch( { type: EVENT_LOADING } )
}
export const EventRemoveEvent = ( id: number ) => async ( dispatch: Dispatch<EventDispatchTypes>, getState: () => RootState ) => {
    dispatch( { type: EVENT_LOADING } )
    try {
        await event.destroy( id )
        dispatch( { type: EVENT_REMOVE_EVENT, payload: { event: id } } )

    }
    catch ( e ) {
        dispatch( { type: EVENT_ERROR_EVENT } )
    }
    dispatch( { type: EVENT_LOADING } )
}
export const EventAddEvent = ( data: AddEventRequest ) => async ( dispatch: Dispatch<EventDispatchTypes> ) => {
    dispatch( { type: EVENT_LOADING } )
    try {
        AddEventRequest.parse( data )
        const { data: eventRes } = await event.store( data )
        dispatch( { type: EVENT_ADD_EVENT, payload: { event: eventRes } } )
    }
    catch ( e ) {

        // TODO add ErrorMessages
        dispatch( {
            type: EVENT_ERROR_EVENT,
        } )
    }
    dispatch( { type: EVENT_LOADING } )
}
export const EventUpdateEvent = ( id: number, data: AddEventRequest ) => async ( dispatch: Dispatch<EventDispatchTypes>, getState: () => RootState ) => {
    dispatch( { type: EVENT_LOADING } )
    try {
        AddEventRequest.parse( data )
        const { data: eventRes } = await event.update( id, data )
        dispatch( { type: EVENT_UPDATE_EVENT, payload: { event: id, data: eventRes } } )
    }
    catch ( e ) {
        // TODO add ErrorMessages
        dispatch( {
            type: EVENT_ERROR_EVENT,
        } )
    }
    dispatch( { type: EVENT_LOADING } )
}

