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
import { ValidationError } from '../../interfaces/validationError'
import { ZodError } from 'zod'



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

    }
    dispatch( { type: CALENDAR_SET_LOADING } )
}

export const CalendarAddEvent = ( values: BaseEvent ) => async ( dispatch: Dispatch<CalendarDispatchTypes>, getState: () => RootState ) => {
    dispatch( { type: CALENDAR_ADD_EVENT_LOADING } )
    try {
        //  AddEventRequest.parse( values )
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
        let errors: ValidationError<BaseEvent> = {}
        if ( e instanceof ZodError ) {

            let errors: ValidationError<BaseEvent> = {}
            e.errors.forEach( zodError => {
                errors[zodError.path[0] as keyof BaseEvent] = zodError.message
            } )
        }
        else if ( e instanceof AxiosError )
            if ( e.response && e.response.status === 422 ) {
                const axiosErrors = e.response.data.errors

                Object.keys( axiosErrors ).forEach( errorKey => {
                    errors[errorKey as keyof BaseEvent] = axiosErrors[errorKey]
                } )
            }
            else {
                console.error( 'Unknown Error : ', 500 )
            }
        dispatch( { type: CALENDAR_SET_ERROR, payload: { errors } } )
        throw new Error( 'Adding Event failed' )
    }
    dispatch( { type: CALENDAR_ADD_EVENT_LOADING } )
}
