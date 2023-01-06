import 'moment/locale/de'
import moment from 'moment'
import { DATE_TIME_FORMAT } from '../../../interfaces/event'
import useCalendar from '../../../hooks/useCalendar'
import AddEventFormWrapper from './AddEventFormWrapper'
import EventForm from './EventForm'



interface AddEventProps {
    onSuccess?: () => any
    displaySuccess?: boolean
    initialDate?: string
}

const AddEventForm = ( { displaySuccess = true, initialDate = moment().format( DATE_TIME_FORMAT ), onSuccess }: AddEventProps ) => {

    const calendar = useCalendar( { initialDate, onSuccess } )
    const { handleSubmit, errors } = calendar

    return (
      <AddEventFormWrapper>
          <EventForm errors={errors} onSubmit={handleSubmit} context={'CREATE'}/>
      </AddEventFormWrapper>
    )

}
export default AddEventForm