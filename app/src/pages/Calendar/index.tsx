import { Grid } from '@mui/material'
import AddEventForm from '../../components/Forms/AddEventForm'
import CalendarView from '../../components/Calendar'
import AddEvent from './AddEvent'
import AddEventsPopup from '../../components/Events/components/AddEventsPopup'



const Calendar = () => {
    return (
      <AddEventsPopup>
          <Grid container spacing={3} alignItems={'stretch'}>
              <Grid item xs={12}>
                  <AddEvent/>
              </Grid>
              <Grid item xs={12}>
                  <CalendarView/>
              </Grid>
          </Grid>
      </AddEventsPopup>
    )
}
export default Calendar