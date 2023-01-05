import { Autocomplete, Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material'
import { Add } from '@mui/icons-material'
import { DatePicker, DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import 'moment/locale/de'

import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react'
import moment, { Moment } from 'moment'
import { BaseEvent, DATE_TIME_FORMAT, TIME_FORMAT, DATE_FORMAT } from '../../interfaces/event'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { RootState, useAppDispatch, useAppSelector } from '../../Store'
import { User } from '../../interfaces/user'
import Loader from '../utils/Loader'
import { CalendarAddEvent } from '../../actions/calendar/CalendarActions'
import useCalendar from '../../hooks/useCalendar'



const getTimeValues = ( format: string, limitValue: string = '0:00' ) => {
    let times = []
    for ( let i = 0; i < ( 4 * 24 ); i++ ) {
        times.push( moment().startOf( 'days' ).add( i * 15, 'minute' ).format( format ) )
    }
    return times
}

interface AddEventProps {
    onSuccess?: () => any
    displaySuccess?: boolean
    initialDate?: string
}

const AddEventForm = ( { displaySuccess = true, initialDate = moment().format( DATE_TIME_FORMAT ), onSuccess }: AddEventProps ) => {

    const calendar = useCalendar( { initialDate, onSuccess } )
    const { usersData } = useAppSelector( state => state.users )
    const { addEventLoading: loading, handleSubmit, handleChange, handleDateChange, handleTimeChange, handleParticipants, errors, values } = calendar

    return (
      <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={'de'}>
          <Box sx={{ p: 3, mb: 3 }} component={'form'}>
              {loading ?
                <Loader/> : <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                        <TextField fullWidth label={'name'} helperText={errors.name} error={errors.name !== undefined ?? true} value={values.name}
                                   onChange={handleChange( 'name' )}/>
                    </Grid>

                    <Grid item xs={12} md={6} container spacing={1}>
                        <Grid item xs={12}>
                            <Typography variant={'body2'}>from</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <DatePicker
                              label="Date"
                              value={moment( values.start ).format( DATE_FORMAT )}
                              onChange={handleDateChange( 'start' )}
                              renderInput={( params ) => <TextField {...params} />}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Autocomplete
                              onChange={handleTimeChange( 'start' )}
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
                              onChange={handleDateChange( 'end' )}
                              renderInput={( params ) => <TextField {...params} />}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Autocomplete
                              onChange={handleTimeChange( 'end' )}
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