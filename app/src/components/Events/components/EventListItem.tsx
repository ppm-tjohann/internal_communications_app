import { Box, Tooltip, Typography, useTheme } from '@mui/material'
import EventDate from './EventDate'
import moment from 'moment'
import { Event } from '../../../interfaces/event'
import useCalendar from '../../../hooks/useCalendar'



interface EventListItemProps {
    event: Event
    date: string
}

const EventListItem = ( { event, date }: EventListItemProps ) => {

    const theme = useTheme()
    const { handlePopup } = useCalendar()
    const isCurrentDay = moment( date ).isSame( moment(), 'day' )
    const dateOptions = {
        dFormat: ' ', displayEnd: false, hFormat: 'HH:mm',
    }

    const handleClick = () => {
        handlePopup( event.id )
    }

    return (
      <Box
        onClick={handleClick}
        sx={{
            transform: `background-color ${theme.transitions.duration.standard} ${theme.transitions.easing.easeInOut}`,
            ':hover': {
                cursor: 'pointer',
                backgroundColor: theme.palette.grey['900'],
            },
        }}>
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
                  <Typography variant={'body2'} sx={{ fontSize: '.6rem' }}>
                      <EventDate start={event.start} {...dateOptions}
                                 end={event.end}/> {event.name.substring( 0,
                    10 )}{event.name.length > 15 && '…'}
                  </Typography>
              </Box>
          </Tooltip>
      </Box>
    )
}
export default EventListItem