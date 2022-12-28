import { CalendarDispatchTypes } from '../actions/calendar/CalendarActionTypes'
import moment from 'moment'
import { Event } from '../interfaces/event'



export type CalendarViewTypes = 'Day' | 'Week' | 'Month' | 'List'
export const DEFAULT_FORMAT = 'YYYY-MM-DD'

interface DefaultState {
    loading: boolean
    currentDate: string
    viewingDate: string
    view: CalendarViewTypes
    error: boolean
    events: Event[]
}

const defaultState: DefaultState = {
    loading: false,
    currentDate: moment().format( DEFAULT_FORMAT ),
    viewingDate: moment().format( DEFAULT_FORMAT ),
    view: 'Month',
    error: false,
    events: [],
}

const CalendarReducer = ( state = defaultState, action: CalendarDispatchTypes ) => {
    switch ( action.type ) {
        case 'CALENDAR_SET_VIEW':
            return { ...state, view: action.payload.view }
        case 'CALENDAR_SET_LOADING':
            return { ...state, loading: !state.loading }
        case 'CALENDAR_SET_VIEWING_DATE':
            return { ...state, viewingDate: action.payload.date }
        case 'CALENDAR_SET_ERROR':
            return { ...state, error: !state.error }
        case 'CALENDAR_SET_EVENTS':
            return { ...state, events: action.payload.events }
        default:
            return state
    }
}

export default CalendarReducer

/*
*



*
* */

