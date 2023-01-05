import { CalendarDispatchTypes } from '../actions/calendar/CalendarActionTypes'
import moment from 'moment'
import { Event } from '../interfaces/event'
import { ValidationError } from '../interfaces/validationError'



export type CalendarViewTypes = 'Day' | 'Week' | 'Month' | 'List'
export const DEFAULT_FORMAT = 'YYYY-MM-DD'

interface DefaultState {
    loading: boolean
    addEventLoading: boolean
    popupEventLoading: boolean
    currentDate: string
    viewingDate: string
    view: CalendarViewTypes
    errors: ValidationError<Event>
    events: Event[]
    popup: boolean
    popupEvent: Event | null
}

const defaultState: DefaultState = {
    loading: false,
    addEventLoading: false,
    currentDate: moment().format( DEFAULT_FORMAT ),
    viewingDate: moment().format( DEFAULT_FORMAT ),
    view: 'Month',
    errors: {},
    events: [],
    popup: false,
    popupEvent: null,
    popupEventLoading: false,
}

const CalendarReducer = ( state = defaultState, action: CalendarDispatchTypes ) => {
    switch ( action.type ) {
        case 'CALENDAR_SET_POPUP_EVENT_LOADING':
            return { ...state, popupEventLoading: !state.popupEventLoading }
        case 'CALENDAR_HANDLE_EVENT_POPUP':
            return { ...state, popup: true, popupEvent: action.payload.event }
        case 'CALENDAR_CLOSE_EVENT_POPUP':
            return { ...state, popup: false, popupEvent: null }
        case 'CALENDAR_SET_VIEW':
            return { ...state, view: action.payload.view }
        case 'CALENDAR_SET_LOADING':
            return { ...state, loading: !state.loading }
        case 'CALENDAR_SET_VIEWING_DATE':
            return { ...state, viewingDate: action.payload.date }
        case 'CALENDAR_SET_ERROR':
            return { ...state, errors: action.payload.errors }
        case 'CALENDAR_SET_EVENTS':
            return { ...state, events: action.payload.events }
        case 'CALENDAR_ADD_EVENT':
            return { ...state, events: [ ...state.events, action.payload.event ].sort( ( a, b ) => ( Date.parse( a.start ) - Date.parse( b.start ) ) ) }
        default:
            return state
    }
}

export default CalendarReducer

/*
*



*
* */

