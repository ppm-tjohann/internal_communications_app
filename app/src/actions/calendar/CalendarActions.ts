import { Dispatch } from 'redux'
import {
    CALENDAR_ADD_EVENT,
    CALENDAR_ADD_EVENT_LOADING,
    CALENDAR_CLOSE_EVENT_POPUP,
    CALENDAR_DELETE_EVENT,
    CALENDAR_HANDLE_EVENT_POPUP,
    CALENDAR_SET_ERROR,
    CALENDAR_SET_EVENTS,
    CALENDAR_SET_LOADING,
    CALENDAR_SET_POPUP_EVENT_LOADING,
    CALENDAR_SET_VIEW,
    CALENDAR_SET_VIEWING_DATE,
    CALENDAR_UPDATE_EVENT,
    CalendarDispatchTypes,
} from './CalendarActionTypes'
import { CalendarViewTypes, DEFAULT_FORMAT } from '../../reducers/CalendarReducer'
import { Moment } from 'moment'
import { AddEventRequest, BaseEvent, Event } from '../../interfaces/event'
import * as event from '../../lib/api/events'
import validationErrors from '../../lib/validationErrors'



export const CalendarUpdateEvent = ( id: number, event: Event ) => ( dispatch: Dispatch<CalendarDispatchTypes> ) => {
    dispatch( { type: CALENDAR_UPDATE_EVENT, payload: { event, eventId: id } } )
}

export const CalendarViewingDate = ( date: Moment ) => ( dispatch: Dispatch<CalendarDispatchTypes> ) => {
    dispatch( { type: CALENDAR_SET_VIEWING_DATE, payload: { date: date.format( DEFAULT_FORMAT ) } } )
}
export const CalendarViewChange = ( view: CalendarViewTypes ) => ( dispatch: Dispatch<CalendarDispatchTypes> ) => {
    dispatch( { type: CALENDAR_SET_VIEW, payload: { view } } )
}
export const CalendarSetEvents = () => async ( dispatch: Dispatch<CalendarDispatchTypes> ) => {
    dispatch( { type: CALENDAR_SET_LOADING } )
    try {
        const { data: pagEvents } = await event.get()
        dispatch( { type: CALENDAR_SET_EVENTS, payload: { events: pagEvents.data } } )
    }
    catch ( e ) {
        console.error( 'Setting Events ERRORED' )
    }
    dispatch( { type: CALENDAR_SET_LOADING } )
}
export const CalendarEventAddedByUser = ( event: Event ) => ( dispatch: Dispatch<CalendarDispatchTypes> ) => {
    console.log( 'Adding Event :', event )
    dispatch( { type: CALENDAR_ADD_EVENT, payload: { event } } )
}

export const CalendarAddEvent = ( values: BaseEvent, successCb?: () => any ) => async ( dispatch: Dispatch<CalendarDispatchTypes> ) => {
    dispatch( { type: CALENDAR_ADD_EVENT_LOADING } )
    try {
        AddEventRequest.parse( values )
        const res = await event.store( values )
        dispatch( { type: CALENDAR_ADD_EVENT, payload: { event: res.data } } )

        if ( successCb ) {
            successCb()
        }
        dispatch( { type: CALENDAR_SET_ERROR, payload: { errors: {} } } )

    }
    catch ( e ) {
        console.log( 'CATCH at CalendarAddEvent' )
        let errors = validationErrors( e )

        errors !== undefined ?
          dispatch( { type: CALENDAR_SET_ERROR, payload: { errors } } ) :
          console.error( 'Unknown Error : ', e )

    }
    dispatch( { type: CALENDAR_ADD_EVENT_LOADING } )
}
export const CalendarDeleteEvent = ( id: number ) => async ( dispatch: Dispatch<CalendarDispatchTypes> ) => {
    await event.destroy( id )
    dispatch( { type: CALENDAR_DELETE_EVENT, payload: { eventId: id } } )
}
export const CalendarHandleEventPopup = ( id: number ) => async ( dispatch: Dispatch<CalendarDispatchTypes> ) => {
    dispatch( { type: CALENDAR_SET_POPUP_EVENT_LOADING } )
    const { data: eventRes } = await event.find( id )
    dispatch( { type: CALENDAR_HANDLE_EVENT_POPUP, payload: { event: eventRes } } )
    dispatch( { type: CALENDAR_SET_POPUP_EVENT_LOADING } )
}
export const CalendarHandlePopupClose = () => ( dispatch: Dispatch<CalendarDispatchTypes> ) => {
    dispatch( { type: CALENDAR_CLOSE_EVENT_POPUP } )
}

