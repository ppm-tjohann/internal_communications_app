import { RootState, useAppDispatch, useAppSelector } from '../Store'
import { CalendarViewTypes } from '../reducers/CalendarReducer'
import {
    CalendarAddEvent,
    CalendarHandleEventPopup,
    CalendarHandlePopupClose,
    CalendarViewChange,
    CalendarViewingDate,
} from '../actions/calendar/CalendarActions'
import moment, { Moment } from 'moment'
import { BaseEvent, DATE_TIME_FORMAT } from '../interfaces/event'
import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react'
import { User } from '../interfaces/user'
import { Box, Button, Paper, Stack, Typography } from '@mui/material'



interface useCalendarProps {
    initialDate?: string
    onSuccess?: () => any
}

const useCalendar = ( options?: useCalendarProps ) => {

    const initialDate = options?.initialDate ?? moment().format( DATE_TIME_FORMAT )

    const defaultStart = moment( initialDate ).minutes( Math.ceil( moment().minute() / 15 ) * 15 ).format( DATE_TIME_FORMAT )
    const defaultEnd = moment( defaultStart ).add( 30, 'minutes' ).format( DATE_TIME_FORMAT )

    const defaultState: BaseEvent = {
        name: '',
        start: defaultStart,
        end: defaultEnd,
        participants: [],
    }

    const dispatch = useAppDispatch()
    const calendar = useAppSelector( state => state.calendar )

    const [ values, setValues ] = useState( defaultState )

    const handleView = ( view: CalendarViewTypes ) => dispatch( CalendarViewChange( view ) )
    const handleDate = ( date: Moment ) => dispatch( CalendarViewingDate( date ) )
    const closePopup = () => dispatch( CalendarHandlePopupClose() )
    const handlePopup = ( id: number ) => dispatch( CalendarHandleEventPopup( id ) )

    useEffect( () => {
        // If start is after end, set end to start
        if ( moment( values.start ).isAfter( moment( values.end ) ) ) {
            setValues( v => ( { ...v, end: moment( v.start ).add( 30, 'minutes' ).format( DATE_TIME_FORMAT ) } ) )
        }

    }, [ values.start, values.end ] )

    const handleSubmit = () => {
        dispatch( CalendarAddEvent( values, options?.onSuccess ) )
        setValues( v => defaultState )
    }

    const handleChange = ( label: keyof BaseEvent ) => ( event: ChangeEvent<HTMLInputElement> ) => {
        setValues( { ...values, [label]: event.target.value } )
    }
    const handleParticipants = ( event: SyntheticEvent, newValue: User[] ) => {
        setValues( { ...values, participants: newValue.map( user => user.id ) } )
    }
    const handleDateChange = ( label: 'start' | 'end' ) => ( newValue: string | null ) => {
        if ( !newValue ) return

        const valueDate = moment( values[label] )
        //@ts-ignore
        const myDate: Moment = newValue.clone()

        valueDate.date( myDate.date() )
        valueDate.month( myDate.month() )
        valueDate.year( myDate.year() )

        setValues( { ...values, [label]: valueDate.format( DATE_TIME_FORMAT ) } )
    }
    const handleTimeChange = ( label: 'start' | 'end' ) => ( event: any, newValue: string | null ) => {
        if ( !newValue ) return
        const newValues = newValue.split( ':' )
        const valueTime = moment( values[label] )

        valueTime.hour( parseInt( newValues[0] ) )
        valueTime.minute( parseInt( newValues[1] ) )

        setValues( { ...values, [label]: valueTime.format( DATE_TIME_FORMAT ) } )
    }

    return {
        values, closePopup, handlePopup,
        handleView, handleDate, handleChange, handleParticipants, handleDateChange, handleTimeChange, handleSubmit,
        ...calendar,
    }
}
export default useCalendar