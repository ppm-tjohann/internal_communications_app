import { Autocomplete, Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import { Add } from '@mui/icons-material'
import { DatePicker, DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import 'moment/locale/de'

import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react'
import moment, { Moment } from 'moment'
import { BaseEvent, DATE_TIME_FORMAT, TIME_FORMAT, DATE_FORMAT, AddEventRequest } from '../../interfaces/event'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { RootState, useAppDispatch, useAppSelector } from '../../Store'
import { User } from '../../interfaces/user'
import { ZodError } from 'zod'
import api from '../../lib/api'
import { EVENT_ADD_EVENT, EVENT_LOADING } from '../../actions/events/EventActionTypes'
import Loader from '../utils/Loader'
import { CalendarAddEvent } from '../../actions/calendar/CalendarActions'



const getTimeValues = ( format: string, limitValue: string = '0:00' ) => {
    // TODO integrate limitValue
    let times = []
    for ( let i = 0; i < ( 4 * 24 ); i++ ) {
        times.push( moment().startOf( 'days' ).add( i * 15, 'minute' ).format( format ) )
    }
    return times
}

const defaultState: BaseEvent = {
    name: '',
    start: moment().minutes( Math.ceil( moment().minute() / 15 ) * 15 ).format( DATE_TIME_FORMAT ),
    end: moment().minutes( Math.ceil( moment().minute() / 15 ) * 15 ).add( 30, 'minutes' ).format( DATE_TIME_FORMAT ),
    participants: [],
}

const AddEventForm = () => {

    const dispatch = useAppDispatch()
    const { addEventLoading: loading } = useAppSelector( state => state.calendar )
    const [ values, setValues ] = useState( defaultState )
    const { usersData } = useAppSelector( ( state: RootState ) => state.users )

    useEffect( () => {
        // If start is after end, set end to start
        if ( moment( values.start ).isAfter( moment( values.end ) ) ) {
            setValues( v => ( { ...v, end: moment( v.start ).add( 30, 'minutes' ).format( DATE_TIME_FORMAT ) } ) )
        }

    }, [ values.start, values.end ] )

    const handleSubmit = () => {
        dispatch( CalendarAddEvent( values ) )
    }

    const handleChange = ( label: keyof BaseEvent ) =>
      ( event: ChangeEvent<HTMLInputElement> ) => {
          setValues( { ...values, [label]: event.target.value } )
      }

    const handleParticipants = ( event: SyntheticEvent, newValue: User[] ) => {
        setValues( { ...values, participants: newValue.map( user => user.id ) } )
    }

    const handleDate = ( label: 'start' | 'end' ) => ( newValue: string | null ) => {
        if ( !newValue ) return

        const valueDate = moment( values[label] )
        //@ts-ignore
        const myDate: Moment = newValue.clone()

        valueDate.date( myDate.date() )
        valueDate.month( myDate.month() )
        valueDate.year( myDate.year() )

        setValues( { ...values, [label]: valueDate.format( DATE_TIME_FORMAT ) } )
    }
    const handleTime = ( label: 'start' | 'end' ) => ( event: any, newValue: string | null ) => {
        if ( !newValue ) return
        const newValues = newValue.split( ':' )
        console.log( 'New Time: ', newValue, newValue.split( ':' ) )
        const selectedTime = moment( newValue )
        const valueTime = moment( values[label] )

        valueTime.hour( parseInt( newValues[0] ) )
        valueTime.minute( parseInt( newValues[1] ) )

        setValues( { ...values, [label]: valueTime.format( DATE_TIME_FORMAT ) } )
    }

    return (
      <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={'de'}>
          <Box sx={{ p: 3, mb: 3 }} component={'form'}>
              {loading ?
                <Loader/> : <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                        <TextField fullWidth label={'name'} onChange={handleChange( 'name' )}/>
                    </Grid>

                    <Grid item xs={12} md={6} container spacing={1}>
                        <Grid item xs={12}>
                            <Typography variant={'body2'}>from</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <DatePicker
                              label="Date"
                              value={moment( values.start ).format( DATE_FORMAT )}
                              onChange={handleDate( 'start' )}
                              renderInput={( params ) => <TextField {...params} />}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Autocomplete
                              onChange={handleTime( 'start' )}
                              value={moment( values.start ).format( TIME_FORMAT )}
                              renderInput={( params ) => <TextField{...params} label={'Event-Start'}/>}
                              options={getTimeValues( TIME_FORMAT )}/>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6} container spacing={1}>
                        <Grid item xs={12}>
                            <Typography variant={'body2'}>to</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <DatePicker
                              label="Date"
                              value={moment( values.end ).format( DATE_FORMAT )}
                              onChange={handleDate( 'end' )}
                              renderInput={( params ) => <TextField {...params} />}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Autocomplete
                              onChange={handleTime( 'end' )}
                              value={moment( values.end ).format( TIME_FORMAT )}
                              renderInput={( params ) => <TextField{...params} label={'Event-End'}/>}
                              options={getTimeValues( TIME_FORMAT )}/>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}> <TextField fullWidth label={'description'} onChange={handleChange( 'description' )} multiline rows={3}/></Grid>
                    <Grid item xs={12}>
                        <Autocomplete limitTags={3}
                                      multiple onChange={handleParticipants}
                                      renderInput={( params => <TextField {...params} label={'participants'}/> )}
                                      options={usersData} getOptionLabel={( options: User ) => options.username}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}> <Button onClick={handleSubmit} variant={'contained'} startIcon={<Add/>}>Add Event</Button></Grid>
                </Grid>}
          </Box>
      </LocalizationProvider>
    )

}
export default AddEventForm