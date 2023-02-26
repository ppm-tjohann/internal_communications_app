import 'moment/locale/de'
import moment from 'moment'
import { DATE_TIME_FORMAT } from '../../../interfaces/event'
import useCalendar from '../../../hooks/useCalendar'
import AddEventFormWrapper from './AddEventFormWrapper'
import EventForm, { getAddEventDefaultState } from './EventForm'



interface AddEventProps {
    onSuccess?: () => any
    displaySuccess?: boolean
    initialDate?: string
}

const AddEventForm = ( { displaySuccess = true, onSuccess, initialDate }: AddEventProps ) => {

    const { handleSubmit, errors } = useCalendar( { onSuccess } )
    let initialValues = null
    if ( initialDate ) {
        initialValues = getAddEventDefaultState( { start: initialDate } )
    }

    return (
      <AddEventFormWrapper>
          <EventForm errors={errors} onSubmit={handleSubmit} context={'CREATE'} initialValues={initialValues}/>
      </AddEventFormWrapper>
    )

}
export default AddEventForm