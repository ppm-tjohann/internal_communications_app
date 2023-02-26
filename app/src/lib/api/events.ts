import api from './index'
import { AddEventRequest, Event } from '../../interfaces/event'
import { ApiResponse, ApiResponsePaginated } from '../../interfaces/apiResponse'



const LARAVEL_DATEFORMAT = ''

export const get = (): ApiResponsePaginated<Event[]> => api.get( '/events?include=participants,user' )
export const update = ( id: number, data: AddEventRequest ): ApiResponse<Event> => api.put( `/events/${id}`, data )
export const destroy = async ( id: number ) => await api.delete( `/events/${id}` )
export const store = ( event: AddEventRequest ): ApiResponse<Event> => api.post( '/events', event )
export const find = ( id: number ): ApiResponse<Event> => api.get( `/events/${id}?include=participants,user` )