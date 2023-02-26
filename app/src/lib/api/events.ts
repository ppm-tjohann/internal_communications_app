import api from './index'
import { AddEventRequest, Event } from '../../interfaces/event'
import { ApiResponse, ApiResponsePaginated } from '../../interfaces/apiResponse'
import moment from 'moment'



const LARAVEL_DATEFORMAT = ''

export const get = (): ApiResponse<Event[]> => api.get(
  `/events/${moment().subtract( 1, 'month' ).format( 'MM' )}/${moment().add( 1, 'month' ).format( 'MM' )}` )
export const add = ( { start, end }: { start: number, end: number } ): ApiResponse<Event[]> => api.get( `/events/${start}/${end}` )
export const update = ( id: number, data: AddEventRequest ): ApiResponse<Event> => api.put( `/events/${id}`, data )
export const destroy = async ( id: number ) => await api.delete( `/events/${id}` )
export const store = ( event: AddEventRequest ): ApiResponse<Event> => api.post( '/events', event )
export const find = ( id: number ): ApiResponse<Event> => api.get( `/events/${id}?include=participants,user` )