import { Event } from '../interfaces/event'
import { EventDispatchTypes } from '../actions/events/EventActionTypes'



interface DefaultState {
    events: Event[],
    loading: boolean
    error: boolean
}

const defaultState: DefaultState = {
    events: [],
    loading: false,
    error: false,
}

const EventReducer = ( state: DefaultState = defaultState, action: EventDispatchTypes ) => {
    switch ( action.type ) {
        case 'EVENT_LOADING':
            return {
                ...state,
                error: false,
                loading: !state.loading,
            }
        case 'EVENT_ERROR_EVENT':
            return {
                ...state,
                error: true,
            }
        case 'EVENT_ADD_EVENT':
            return {
                ...state,
                events: [
                    ...state.events,
                    action.payload,
                ],
            }
        case 'EVENT_REMOVE_EVENT':
            return {
                ...state,
                events: state.events.filter( event => event.id !== action.payload.event ),
            }
        case 'EVENT_SET_EVENTS':
            return {
                ...state,
                events: action.payload.events,
            }
        case 'EVENT_UPDATE_EVENT':
            return {
                ...state,
                events: [
                    ...state.events.filter( event => event.id !== action.payload.event ),
                    action.payload.data,
                ],
            }
        default:
            return defaultState
    }
}

export default EventReducer


