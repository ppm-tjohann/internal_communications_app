import { Box, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
import { useAppSelector } from '../../../../Store'
import EventDate from '../../../Events/components/EventDate'
import { groupEventsByDate } from '../../../../lib/calendarHelper'



const ListView = () => {

    const { events } = useAppSelector( state => state.calendar )

    const sortedEvents = groupEventsByDate( events, 'start' )

    console.log( 'Sorted Events :', sortedEvents )

    return ( <Box>
          <List>
              {events.map( event => (
                <ListItem key={event.id}>

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