import { Box, Grid, useTheme } from '@mui/material'
import AddEventForm from '../../components/Events/forms/AddEventForm'
import CalendarView from '../../components/Calendar'
import AddEvent from './AddEvent'
import AddEventsPopup from '../../components/Events/components/AddEventsPopup'



const Calendar = () => {
    const theme = useTheme()
    return (
      <AddEventsPopup>
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: theme.spacing( 3 ) }}>
              <Box>
                  <AddEvent/>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, flexShrink: 1 }}>
                  <CalendarView/>
              </Box>
          </Box>
      </AddEventsPopup>
    )
}
export default Calendar