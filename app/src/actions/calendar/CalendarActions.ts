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
import api from '../../lib/api'
import { AddEventRequest, BaseEvent } from '../../interfaces/event'
import { AxiosError } from 'axios'



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
        const { apiToken } = getState().auth
        const { data: events } = await api.get( 'events', {
            headers: { 'Authorization': `Bearer ${apiToken}` },
        } )
        dispatch( { type: CALENDAR_SET_EVENTS, payload: { events } } )
    }
    catch ( e ) {
        dispatch( { type: CALENDAR_SET_ERROR } )
    }
    dispatch( { type: CALENDAR_SET_LOADING } )
}

export const CalendarAddEvent = ( values: BaseEvent ) => async ( dispatch: Dispatch<CalendarDispatchTypes>, getState: () => RootState ) => {
    console.log( 'Adding Event' )
    dispatch( { type: CALENDAR_ADD_EVENT_LOADING } )
    try {
        AddEventRequest.parse( values )
        console.log( 'Client Side Validation fine' )
        const { apiToken } = getState().auth
        const res = await api.post( '/events', values, {
            headers: {
                'Authorization': `Bearer ${apiToken}`,
            },
        } )
        dispatch( {
            type: CALENDAR_ADD_EVENT,
            payload: { event: res.data },
        } )
    }
    catch ( e ) {
        console.log( 'ERROR : ', e )
        if ( e instanceof AxiosError )
            if ( e.response && e.response.status === 422 ) {
                console.log( 'Validation Error' )
                // TODO set validation Errors
                dispatch( {
                    type: CALENDAR_SET_ERROR,
                    payload: { errors: e.response.data.errors },
                } )

            }
    }
    dispatch( { type: CALENDAR_ADD_EVENT_LOADING } )
}
