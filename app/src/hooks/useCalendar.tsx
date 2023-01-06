import { RootState, useAppDispatch, useAppSelector } from '../Store'
import { CalendarViewTypes } from '../reducers/CalendarReducer'
import {
    CalendarAddEvent, CalendarDeleteEvent,
    CalendarHandleEventPopup,
    CalendarHandlePopupClose,
    CalendarViewChange,
    CalendarViewingDate,
} from '../actions/calendar/CalendarActions'
import moment, { Moment } from 'moment'
import { BaseEvent, DATE_TIME_FORMAT } from '../interfaces/event'
import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react'
import { User } from '../interfaces/user'



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
    const closePopup = () => dispatch( CalendarHandlePopupClose() )
    const handlePopup = ( id: number ) => dispatch( CalendarHandleEventPopup( id ) )

    const handleSubmit = ( values: BaseEvent ) => {
        dispatch( CalendarAddEvent( values, options?.onSuccess ) )

    }

    return {
        closePopup, handlePopup, handleEventDelete,
        handleView, handleDate, handleSubmit,
        ...calendar,
    }
}
export default useCalendar