import { CalendarViewTypes } from '../../reducers/CalendarReducer'
import { Event } from '../../interfaces/event'



export const CALENDAR_SET_VIEW = 'CALENDAR_SET_VIEW'
export const CALENDAR_SET_VIEWING_DATE = 'CALENDAR_SET_VIEWING_DATE'
export const CALENDAR_SET_LOADING = 'CALENDAR_SET_LOADING'
export const CALENDAR_SET_EVENTS = 'CALENDAR_SET_EVENTS'
export const CALENDAR_SET_ERROR = 'CALENDAR_SET_ERROR'

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
}

export type CalendarDispatchTypes =
  | CalendarView
  | CalendarViewingDate
  | CalendarLoading
  | CalendarError
  | CalendarSetEvents





