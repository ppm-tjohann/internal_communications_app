import { Grid } from '@mui/material'
import AddEventForm from '../../components/Forms/AddEventForm'
import CalendarView from '../../components/Calendar'



const Calendar = () => {
    return (
      <Grid container>
          <Grid item xs={12}>
              <AddEventForm/>
          </Grid>
          <Grid item xs={12}>
              <CalendarView/>
          </Grid>
      </Grid>
    )
}
export default Calendar