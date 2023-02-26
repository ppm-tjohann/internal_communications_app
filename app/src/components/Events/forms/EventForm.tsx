import { LocalizationProvider } from '@mui/x-date-pickers'
import 'moment/locale/de'
import { AddEventRequest, BaseEvent, Event, DATE_TIME_FORMAT } from '../../../interfaces/event'
import { ValidationError } from '../../../interfaces/validationError'
import { Autocomplete, Button, Grid, Stack, TextField } from '@mui/material'
import DateTime from '../../utils/DateTime'
import moment from 'moment'
import { User } from '../../../interfaces/user'
import { Add, Delete, Update } from '@mui/icons-material'
import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react'
import { useAppSelector } from '../../../Store'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import useCalendar from '../../../hooks/useCalendar'



interface initialValues {
    start?: string
    end?: string
    name?: string
    description?: string
}

export const getAddEventDefaultState = ( initialValues?: initialValues ) => {
    const initialDate = moment().format( DATE_TIME_FORMAT )
    const start = moment( initialDate ).minutes( Math.ceil( moment().minute() / 15 ) * 15 ).format( DATE_TIME_FORMAT )
    const end = moment( start ).add( 30, 'minutes' ).format( DATE_TIME_FORMAT )
    return { name: '', description: '', participants: [], start, end, ...initialValues }
}

interface EventFormProps {
    context: 'UPDATE' | 'CREATE'
    onSubmit: ( values: AddEventRequest ) => any
    errors: ValidationError<BaseEvent>
    initialValues?: BaseEvent | Event | null
}

const EventForm = ( { context, onSubmit, errors, initialValues }: EventFormProps ) => {

    const [ values, setValues ] = useState( initialValues ?? getAddEventDefaultState() )
    const [ edited, setEdited ] = useState( false )
    const { usersData } = useAppSelector( state => state.users )
    const { handleEventDelete, closePopup } = useCalendar()

    useEffect( () => {
        setEdited( initialValues !== values )
    }, [ values ] )

    useEffect( () => {
        // If start is after end, set end to start
        if ( moment( values.start ).isAfter( moment( values.end ) ) ) {
            setValues( v => ( { ...v, end: moment( v.start ).add( 30, 'minutes' ).format( DATE_TIME_FORMAT ) } ) )
        }

    }, [ values.start, values.end ] )

    const handleDateTime = ( label: keyof BaseEvent ) => ( newValue: string ) => {
        setValues( { ...values, [label]: newValue } )
    }

    const handleChange = ( label: keyof BaseEvent ) => ( event: ChangeEvent<HTMLInputElement> ) => {
        setValues( { ...values, [label]: event.target.value } )
    }
    const handleParticipants = ( event: SyntheticEvent, newValue: User[] ) => {
        setValues( { ...values, participants: newValue.map( user => user.id ) } )
    }

    const handleSubmit = () => {
        onSubmit( values )
    }

    return (
      <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={'de'}>
          <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                  <TextField fullWidth label={'name'} helperText={errors.name} error={errors.name !== undefined ?? true} value={values.name}
                             onChange={handleChange( 'name' )}/>
              </Grid>

              <Grid item xs={12} md={6}>
                  <DateTime label={'from'} value={moment( values.start ).format( DATE_TIME_FORMAT )} onChange={handleDateTime( 'start' )}/>
              </Grid>
              <Grid item xs={12} md={6} spacing={1}>
                  <DateTime value={moment( values.end ).format( DATE_TIME_FORMAT )} onChange={handleDateTime( 'end' )} label={'to'}/>
              </Grid>

              <Grid item xs={12}>
                  <TextField fullWidth label={'description'} onChange={handleChange( 'description' )} multiline value={values.description} rows={3}/></Grid>
              <Grid item xs={12}>
                  <Autocomplete limitTags={3}
                                multiple onChange={handleParticipants} value={usersData.filter( user => values.participants?.includes( user.id ) )}
                                renderInput={( params => <TextField {...params} label={'participants'}/> )}
                                options={usersData} getOptionLabel={( options: User ) => options.username}
                  />
              </Grid>
              <Grid item xs={12} md={6}>
                  {context === 'UPDATE' ?
                    <Stack>
                        <Button color={'error'} startIcon={<Delete/>} onClick={() => {
                            //@ts-ignore
                            handleEventDelete( values.id )
                            closePopup()
                        }
                        }>Delete Event</Button>
                        <Button onClick={handleSubmit} variant={'contained'} startIcon={<Update/>} disabled={!edited}>Update Event</Button>
                    </Stack>
                    : <Button onClick={handleSubmit} variant={'contained'} startIcon={<Add/>}>Add Event</Button>}
              </Grid>
          </Grid>
      </LocalizationProvider>
    )
}
export default EventForm