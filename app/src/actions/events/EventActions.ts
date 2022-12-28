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
import api from '../../lib/api'



export const EventSetEvents = () => async ( dispatch: Dispatch<EventDispatchTypes>, getState: () => RootState ) => {
    dispatch( { type: EVENT_LOADING } )
    try {

        const { apiToken } = getState().auth
        const { data: events } = await api.get( 'events', {
            headers: { 'Authorization': `Bearer ${apiToken}` },
        } )
        dispatch( { type: EVENT_SET_EVENTS, payload: { events } } )

    }
    catch ( e ) {
        dispatch( { type: EVENT_ERROR_EVENT } )
    }
    dispatch( { type: EVENT_LOADING } )
}
export const EventRemoveEvent = ( id: number ) => async ( dispatch: Dispatch<EventDispatchTypes>, getState: () => RootState ) => {
    dispatch( { type: EVENT_LOADING } )
    try {
        const { apiToken } = getState().auth
        await api.delete( `events/${id}`, {
            headers: { 'Authorization': `Bearer ${apiToken}` },
        } )
        dispatch( { type: EVENT_REMOVE_EVENT, payload: { event: id } } )

    }
    catch ( e ) {
        dispatch( { type: EVENT_ERROR_EVENT } )
    }
    dispatch( { type: EVENT_LOADING } )
}
export const EventAddEvent = ( data: AddEventRequest ) => async ( dispatch: Dispatch<EventDispatchTypes>, getState: () => RootState ) => {
    dispatch( { type: EVENT_LOADING } )
    try {
        AddEventRequest.parse( data )
        const { apiToken } = getState().auth
        const { data: event } = await api.post( 'events', data, {
            headers: { 'Authorization': `Bearer ${apiToken}` },
        } )
        dispatch( { type: EVENT_ADD_EVENT, payload: { event } } )
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
        const { apiToken } = getState().auth
        const { data: event } = await api.put( `events/${id}`, data, {
            headers: { 'Authorization': `Bearer ${apiToken}` },
        } )
        dispatch( { type: EVENT_UPDATE_EVENT, payload: { event: id, data: event } } )
    }
    catch ( e ) {
        // TODO add ErrorMessages
        dispatch( {
            type: EVENT_ERROR_EVENT,
        } )
    }
    dispatch( { type: EVENT_LOADING } )
}

