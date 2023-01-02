import { Box, List, ListItem, ListItemText, Stack, Tooltip, Typography } from '@mui/material'
import { useAppSelector } from '../../../Store'
import moment from 'moment'



interface EventListProps {
    date: string
}

const EventList = ( { date }: EventListProps ) => {

    const { events } = useAppSelector( state => state.calendar )

    let displayEvents = events
    if ( date !== undefined ) {
        displayEvents = events.filter( event => moment( date ).isSame( moment( event.start ), 'day' ) )
    }

    const isCurrentDay = moment( date ).isSame( moment(), 'day' )

    return (
      <Box sx={{ maxHeight: '80%', overflowY: 'scroll' }}>
          <Stack spacing={1} direction={'column'}>
              {displayEvents.map( event => (
                <Box>
                    <Tooltip title={event.name} key={event.id}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{
                                mr: 1,
                                width: 5,
                                height: 5,
                                backgroundColor: 'primary.dark',
                                mixBlendMode: isCurrentDay ? 'multiply' : 'normal',
                                borderRadius: '50%',
                            }}/>
                            <Typography variant={'body2'}>
                                {event.name.substring( 0, 15 )}{event.name.length > 15 && '…'}
                            </Typography>
                        </Box>
                    </Tooltip>
                </Box>
              ) )}
          </Stack>
      </Box>
    )

}
export default EventList