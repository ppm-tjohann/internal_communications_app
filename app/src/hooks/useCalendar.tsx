import { useAppDispatch, useAppSelector } from '../Store'
import { CalendarViewTypes } from '../reducers/CalendarReducer'
import {
    CalendarAddEvent, CalendarDeleteEvent,
    CalendarHandleEventPopup,
    CalendarHandlePopupClose, CalendarUpdateEvent,
    CalendarViewChange,
    CalendarViewingDate,
} from '../actions/calendar/CalendarActions'
import { Moment } from 'moment'
import { BaseEvent, Event } from '../interfaces/event'



interface useCalendarProps {
    initialDate?: string
    onSuccess?: () => any
}

const useCalendar = ( options?: useCalendarProps ) => {

    const dispatch = useAppDispatch()
    const calendar = useAppSelector( state => state.calendar )

    const handleView = ( view: CalendarViewTypes ) => dispatch( CalendarViewChange( view ) )
    const handleDate = ( date: Moment ) => dispatch( CalendarViewingDate( date ) )
    const handleEventDelete = ( id: number ) => dispatch( CalendarDeleteEvent( id ) )
    const handleEventUpdate = ( id: number, event: Event ) => {
        dispatch( CalendarUpdateEvent( id, event ) )
        closePopup()
    }
    const closePopup = () => dispatch( CalendarHandlePopupClose() )
    const handlePopup = ( id: number ) => dispatch( CalendarHandleEventPopup( id ) )

    const handleSubmit = ( values: BaseEvent ) => {
        dispatch( CalendarAddEvent( values, options?.onSuccess ) )
    }

    return {
        handleEventUpdate,
        closePopup, handlePopup, handleEventDelete,
        handleView, handleDate, handleSubmit,
        ...calendar,
    }
}
export default useCalendar