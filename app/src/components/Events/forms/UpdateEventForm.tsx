import { AddEventRequest, Event } from '../../../interfaces/event'
import EventForm from './EventForm'



interface UpdateEventFormProps {
    initialValues: Event
}

const UpdateEventForm = ( { initialValues }: UpdateEventFormProps ) => {

    const handleSubmit = ( values: AddEventRequest ) => {
    }

    return (
      <EventForm context={'UPDATE'} onSubmit={handleSubmit} errors={{}} initialValues={initialValues}/>
    )
}
export default UpdateEventForm