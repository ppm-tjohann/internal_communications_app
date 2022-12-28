import { Autocomplete, Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material'
import { Add } from '@mui/icons-material'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'

import { useState } from 'react'
import moment, { Moment } from 'moment'
import { DEFAULT_FORMAT } from '../../reducers/CalendarReducer'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { RootState, useAppSelector } from '../../Store'



const AddEventForm = () => {

    const [ values, setValues ] = useState<Moment | null>( moment() )
    const { usersData } = useAppSelector( ( state: RootState ) => state.users )
    console.log( 'USERS : ', usersData )

    const getTimeValues = () => {
        let times = []
        for ( let i = 0; i < ( 4 * 24 ); i++ ) {
            times.push( moment().startOf( 'days' ).add( i * 15, 'minute' ).format( 'HH:mm' ) )
        }
        return times
    }
    const handleChange = () => {
    }

    return (
      <LocalizationProvider dateAdapter={AdapterMoment}>
          <Paper sx={{ p: 3, mb: 3 }} component={'form'}>
              <Grid container spacing={3}>
                  <Grid item xs={12} md={6}> <TextField fullWidth label={'name'}/></Grid>

                  <Grid item xs={12} md={3}>
                      <Autocomplete renderInput={( params => <TextField{...params} label={'Event-Start'}/> )} options={getTimeValues()}/>
                  </Grid>
                  <Grid item xs={12} md={3}>
                      <Autocomplete renderInput={( params ) => <TextField{...params} label={'Event-End'}/>}
                                    options={getTimeValues()}/>
                  </Grid>
                  <Grid item xs={12}> <TextField fullWidth label={'description'} multiline rows={3}/></Grid>
                  <Grid item xs={12} md={6}> <Button startIcon={<Add/>}>Add Event</Button></Grid>
              </Grid>
          </Paper>
      </LocalizationProvider>
    )

}
export default AddEventForm