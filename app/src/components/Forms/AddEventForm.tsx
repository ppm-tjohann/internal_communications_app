import { Autocomplete, Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import { Add } from '@mui/icons-material'
import { DatePicker, DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'

import { ChangeEvent, SyntheticEvent, useState } from 'react'
import moment from 'moment'
import { BaseEvent, Event } from '../../interfaces/event'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { RootState, useAppSelector } from '../../Store'



const getTimeValues = ( format: string ) => {
    let times = []
    for ( let i = 0; i < ( 4 * 24 ); i++ ) {
        times.push( moment().startOf( 'days' ).add( i * 15, 'minute' ).format( format ) )
    }
    return times
}

const AddEventForm = () => {

    const TIME_FORMAT = 'HH:mm'

    const defaultState: BaseEvent = {
        name: '',
        start: moment().format( TIME_FORMAT ),
        end: moment().add( 30, 'minutes' ).format( TIME_FORMAT ),
        participants: [],
    }

    const [ values, setValues ] = useState( defaultState )
    const { usersData } = useAppSelector( ( state: RootState ) => state.users )
    console.log( 'USERS : ', usersData )

    const handleChange = ( label: keyof BaseEvent ) =>
      ( event: ChangeEvent<HTMLInputElement> ) => {
          setValues( {
              ...values,
              [label]: event.target.value,
          } )
      }

    const handleParticipants = ( event: SyntheticEvent, newValue: any ) => {
        console.log( 'Event Participants: ', newValue )

        setValues( {
            ...values,
            //participants: newValue,
        } )
    }

    return (
      <LocalizationProvider dateAdapter={AdapterMoment}>
          <Paper sx={{ p: 3, mb: 3 }} component={'form'}>
              <Grid container spacing={3}>
                  <Grid item xs={12}>
                      <Typography variant={'h2'}>Add Event</Typography>
                  </Grid>
                  <Grid item xs={12} md={12}> <TextField fullWidth label={'name'} onChange={handleChange( 'name' )}/></Grid>

                  <Grid item xs={12} md={6} container spacing={1}>
                      <Grid item xs={12}>
                          <Typography variant={'body2'}>from</Typography>
                      </Grid>
                      <Grid item xs={6}>
                          <TextField type={'date'} fullWidth value={Date.now()}/>
                      </Grid>
                      <Grid item xs={6}>
                          <Autocomplete
                            renderInput={( params ) => <TextField{...params} label={'Event-Start'}/>}
                            options={getTimeValues( TIME_FORMAT )}/>
                      </Grid>
                  </Grid>
                  <Grid item xs={12} md={6} container spacing={1}>
                      <Grid item xs={12}>
                          <Typography variant={'body2'}>to</Typography>
                      </Grid>
                      <Grid item xs={6}>
                          <TextField type={'date'} fullWidth value={Date.now()}/>
                      </Grid>
                      <Grid item xs={6}>
                          <Autocomplete
                            renderInput={( params ) => <TextField{...params} label={'Event-End'}/>}
                            options={getTimeValues( TIME_FORMAT )}/>
                      </Grid>
                  </Grid>

                  <Grid item xs={12}> <TextField fullWidth label={'description'} onChange={handleChange( 'description' )} multiline rows={3}/></Grid>
                  <Grid item xs={12}>
                      <Autocomplete limitTags={3}
                                    multiple onChange={handleParticipants}
                                    renderInput={( params => <TextField {...params} label={'participants'}/> )}
                                    options={usersData.map( user => user.username )}/>
                  </Grid>
                  <Grid item xs={12} md={6}> <Button variant={'contained'} startIcon={<Add/>}>Add Event</Button></Grid>

              </Grid>
          </Paper>
      </LocalizationProvider>
    )

}
export default AddEventForm