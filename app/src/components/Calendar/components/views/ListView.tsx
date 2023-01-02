import { Box, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
import { useAppSelector } from '../../../../Store'
import EventDate from '../../../Events/components/EventDate'
import { groupEventsByDate } from '../../../../lib/calendarHelper'
import moment from 'moment'



const ListView = () => {

    const { events } = useAppSelector( state => state.calendar )

    //const sortedEvents = events.sort( ( a, b ) => ( Date.parse( b.start ) - Date.parse( a.start ) ) )
    //groupEventsByDate( events, 'start' )
    //console.log( 'Sorted Events :', sortedEvents )

    return ( <Box>
          <List>
              {events.map( event => (
                <ListItem key={event.id} sx={{
                    opacity: moment().isAfter( moment( event.end ) ) ? .4 : 1,
                }}>

                    <ListItemButton>
                        <ListItemText
                          primary={event.name}
                          secondary={<EventDate end={event.end} start={event.start}/>}
                        />
                    </ListItemButton>
                </ListItem>
              ) )}
          </List>
      </Box>
    )
}
export default ListView