import { Box, List, ListItem, ListItemText, Stack, Tooltip, Typography, useTheme } from '@mui/material'
import { useAppSelector } from '../../../Store'
import moment from 'moment'
import useCalendar from '../../../hooks/useCalendar'
import Loader from '../../utils/Loader'
import EventDate from './EventDate'
import EventListItem from './EventListItem'



interface EventListProps {
    date: string
}

const EventList = ( { date }: EventListProps ) => {

    const { events, loading } = useCalendar()

    if ( loading ) {
        return <Loader/>
    }
    let displayEvents = events
    if ( date !== undefined ) {
        displayEvents = events.filter( event => moment( date ).isSame( moment( event.start ), 'day' ) )
    }

    return (
      <Box sx={{ maxHeight: '80%', overflowY: 'scroll' }}>
          <Stack spacing={.5} direction={'column'}>
              {displayEvents.map( event => (
                <EventListItem date={date} event={event} key={event.id}/>
              ) )}
          </Stack>
      </Box>
    )

}
export default EventList