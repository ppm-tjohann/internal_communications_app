import { Box, List, ListItem, ListItemText, Skeleton, Stack, Tooltip, Typography, useTheme } from '@mui/material'
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
        return <Skeleton/>
    }
    let displayEvents = events
    if ( date !== undefined ) {
        displayEvents = events.filter( event => moment( date ).isSame( moment( event.start ), 'day' ) )
    }

    return (
      <Box sx={{ maxHeight: '100%', overflowY: 'scroll', flexGrow: 3, flexShrink: 1 }}>
          <Stack spacing={.5} direction={'column'} sx={{
              overflowY: 'scroll', maxHeight: '100%',
          }}>
              {displayEvents.map( event => (
                <EventListItem date={date} event={event} key={event.id}/>
              ) )}
          </Stack>
      </Box>
    )

}
export default EventList