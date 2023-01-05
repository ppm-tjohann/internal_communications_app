import { Dispatch } from 'redux'
import {
    CALENDAR_ADD_EVENT,
    CALENDAR_ADD_EVENT_LOADING,
    CALENDAR_SET_ERROR,
    CALENDAR_SET_EVENTS,
    CALENDAR_SET_LOADING,
    CALENDAR_SET_VIEW,
    CALENDAR_SET_VIEWING_DATE,
    CalendarDispatchTypes,
} from './CalendarActionTypes'
import { CalendarViewTypes, DEFAULT_FORMAT } from '../../reducers/CalendarReducer'
import { Moment } from 'moment'
import { RootState } from '../../Store'
import { AddEventRequest, BaseEvent } from '../../interfaces/event'
import * as event from '../../lib/api/events'
import validationErrors from '../../lib/validationErrors'



export const CalendarViewingDate = ( date: Moment ) => ( dispatch: Dispatch<CalendarDispatchTypes> ) => {
    console.log( 'Changing Viewing Date :', date.format( DEFAULT_FORMAT ) )
    dispatch( {
        type: CALENDAR_SET_VIEWING_DATE,
        payload: { date: date.format( DEFAULT_FORMAT ) },
    } )
}
export const CalendarViewChange = ( view: CalendarViewTypes ) => ( dispatch: Dispatch<CalendarDispatchTypes> ) => {
    dispatch( {
        type: CALENDAR_SET_VIEW,
        payload: { view },
    } )
}

export const CalendarSetEvents = () => async ( dispatch: Dispatch<CalendarDispatchTypes>, getState: () => RootState ) => {
    dispatch( { type: CALENDAR_SET_LOADING } )
    try {
        const { data: events } = await event.get()
        dispatch( { type: CALENDAR_SET_EVENTS, payload: { events } } )
    }
    catch ( e ) {

    }
    dispatch( { type: CALENDAR_SET_LOADING } )
}

export const CalendarAddEvent = ( values: BaseEvent ) => async ( dispatch: Dispatch<CalendarDispatchTypes>, getState: () => RootState ) => {
    dispatch( { type: CALENDAR_ADD_EVENT_LOADING } )
    try {
        //  AddEventRequest.parse( values )
        console.log( 'Client Side Validation fine' )

        const res = await event.store( values )
        dispatch( {
            type: CALENDAR_ADD_EVENT,
            payload: { event: res.data },
        } )
    }
    catch ( e ) {
        let errors = validationErrors( e )
        if ( errors !== undefined ) {
            dispatch( { type: CALENDAR_SET_ERROR, payload: { errors } } )
        }
        else {
            console.error( 'Unknown Error : ', e )
        }
        throw new Error( 'Adding Event failed' )
    }
    dispatch( { type: CALENDAR_ADD_EVENT_LOADING } )
}
