import { Event } from '../../interfaces/event'



export const EVENT_LOADING = 'EVENT_LOADING'
export const EVENT_SET_EVENTS = 'EVENT_SET_EVENTS'
export const EVENT_ADD_EVENT = 'EVENT_ADD_EVENT'
export const EVENT_REMOVE_EVENT = 'EVENT_REMOVE_EVENT'
export const EVENT_UPDATE_EVENT = 'EVENT_UPDATE_EVENT'
export const EVENT_ERROR_EVENT = 'EVENT_ERROR_EVENT'

export interface EventError {
    type: typeof EVENT_ERROR_EVENT
}

export interface EventLoading {
    type: typeof EVENT_LOADING
}

export interface EventSetEvents {
    type: typeof EVENT_SET_EVENTS
    payload: { events: Event[] }
}

export interface EventAddEvent {
    type: typeof EVENT_ADD_EVENT
    payload: { event: Event }
}

export interface EventRemoveEvent {
    type: typeof EVENT_REMOVE_EVENT
    payload: { event: number }
}

export interface EventUpdateEvent {
    type: typeof EVENT_UPDATE_EVENT
    payload: { event: number, data: Event }
}

export type EventDispatchTypes =
  | EventLoading
  | EventError
  | EventSetEvents
  | EventAddEvent
  | EventRemoveEvent
  | EventUpdateEvent

