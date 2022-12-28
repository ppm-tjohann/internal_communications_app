import { Dispatch } from 'redux'
import {
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