import { Autocomplete, Grid, TextField, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import moment, { Moment } from 'moment'
import { DATE_FORMAT, DATE_TIME_FORMAT, TIME_FORMAT } from '../../interfaces/event'
import { useEffect, useState } from 'react'
import { getTimeValues } from '../../lib/calendarHelper'



interface DateTimeProps {
    label?: string
    value: string
    onChange: ( newValue: string ) => any
}

const DateTime = ( { value, label, onChange }: DateTimeProps ) => {

    const handleDate = ( newValue: string | null ) => {
        if ( !newValue ) return
        const valueDate = moment( value )
        const myDate = moment( newValue ).clone()
        valueDate.date( myDate.date() )
        valueDate.month( myDate.month() )
        valueDate.year( myDate.year() )
        onChange( valueDate.format( DATE_TIME_FORMAT ) )
    }
    const handleTime = ( event: any, newValue: string | null ) => {
        if ( !newValue ) return
        const newValues = newValue.split( ':' )
        const valueTime = moment( value )

        valueTime.hour( parseInt( newValues[0] ) )
        valueTime.minute( parseInt( newValues[1] ) )
        onChange( moment( valueTime ).format( DATE_TIME_FORMAT ) )
    }

    return (
      <Grid container spacing={1}>
          {label && <Grid item xs={12}><Typography variant={'overline'}>{label}</Typography></Grid>}
          <Grid item xs={12} md={6}>
              <DatePicker
                label={'Date'}
                onChange={handleDate}
                value={moment( value ).format( DATE_FORMAT )}
                renderInput={( params ) => <TextField{...params}/>}/>
          </Grid>
          <Grid item xs={12} md={6}>
              <Autocomplete
                onChange={handleTime}
                value={moment( value ).format( TIME_FORMAT )}
                renderInput={( params ) => <TextField{...params} label={'Time'}/>}
                options={getTimeValues( TIME_FORMAT )}/>
          </Grid>
      </Grid>
    )
}
export default DateTime