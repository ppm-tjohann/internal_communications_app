import { CalendarViewTypes } from '../../reducers/CalendarReducer'
import { BaseEvent, Event } from '../../interfaces/event'
import { ValidationError } from '../../interfaces/validationError'



export const CALENDAR_SET_VIEW = 'CALENDAR_SET_VIEW'
export const CALENDAR_SET_VIEWING_DATE = 'CALENDAR_SET_VIEWING_DATE'
export const CALENDAR_SET_LOADING = 'CALENDAR_SET_LOADING'
export const CALENDAR_SET_EVENTS = 'CALENDAR_SET_EVENTS'
export const CALENDAR_ADD_EVENT = 'CALENDAR_ADD_EVENT'
export const CALENDAR_SET_ERROR = 'CALENDAR_SET_ERROR'
export const CALENDAR_ADD_EVENT_LOADING = 'CALENDAR_ADD_EVENT_LOADING'
export const CALENDAR_HANDLE_EVENT_POPUP = 'CALENDAR_HANDLE_EVENT_POPUP'
export const CALENDAR_CLOSE_EVENT_POPUP = 'CALENDAR_CLOSE_EVENT_POPUP'
export const CALENDAR_SET_POPUP_EVENT_LOADING = 'CALENDAR_SET_POPUP_EVENT_LOADING'

export interface CalendarPopUpLoading {
    type: typeof CALENDAR_SET_POPUP_EVENT_LOADING
}

export interface CalendarCloseEventPopUp {
    type: typeof CALENDAR_CLOSE_EVENT_POPUP
}

export interface CalendarEventPopUp {
    type: typeof CALENDAR_HANDLE_EVENT_POPUP,
    payload: { event: Event }
}

export interface CalendarAddEventLoading {
    type: typeof CALENDAR_ADD_EVENT_LOADING
}

export interface CalendarAddEvent {
    type: typeof CALENDAR_ADD_EVENT
    payload: { event: Event }
}

export interface CalendarView {
    type: typeof CALENDAR_SET_VIEW,
    payload: { view: CalendarViewTypes },
}

export interface CalendarViewingDate {
    type: typeof CALENDAR_SET_VIEWING_DATE,
    payload: { date: string }
}

export interface CalendarLoading {
    type: typeof CALENDAR_SET_LOADING
}

export interface CalendarSetEvents {
    type: typeof CALENDAR_SET_EVENTS
    payload: { events: Event[] }
}

export interface CalendarError {
    type: typeof CALENDAR_SET_ERROR
    payload: { errors: ValidationError<Event> }
}

export type CalendarDispatchTypes =
  | CalendarView
  | CalendarViewingDate
  | CalendarLoading
  | CalendarError
  | CalendarSetEvents
  | CalendarAddEvent
  | CalendarAddEventLoading
  | CalendarCloseEventPopUp
  | CalendarEventPopUp
  | CalendarPopUpLoading





