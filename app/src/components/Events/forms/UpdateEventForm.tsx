import { AddEventRequest, BaseEvent, Event } from '../../../interfaces/event'
import EventForm from './EventForm'
import { useState } from 'react'
import { ValidationError } from '../../../interfaces/validationError'
import validationErrors from '../../../lib/validationErrors'
import * as events from '../../../lib/api/events'
import Loader from '../../utils/Loader'
import useCalendar from '../../../hooks/useCalendar'



interface UpdateEventFormProps {
    initialValues: Event
}

const UpdateEventForm = ( { initialValues }: UpdateEventFormProps ) => {

    const [ errors, setErrors ] = useState<ValidationError<BaseEvent>>( {} )
    const [ loading, setLoading ] = useState( false )
    const { handleEventUpdate } = useCalendar()
    const handleSubmit = async ( values: AddEventRequest ) => {
        setLoading( true )
        try {
            const res = await events.update( initialValues.id, values )
            console.log( 'RES: ', res )
            handleEventUpdate( initialValues.id, res.data )
        }
        catch ( e ) {
            const errors = validationErrors( e )
            if ( errors !== undefined ) {
                setErrors( errors )
            }
            else {
                console.error( 'UnknownError', e )
            }
        }
        setLoading( false )
    }

    if ( loading ) {
        return <Loader/>
    }

    return (
      <EventForm context={'UPDATE'} onSubmit={handleSubmit} errors={errors} initialValues={initialValues}/>
    )
}
export default UpdateEventForm