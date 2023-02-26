import { Box, Tooltip, Typography, useTheme } from '@mui/material'
import EventDate from './EventDate'
import moment from 'moment'
import { Event } from '../../../interfaces/event'
import useCalendar from '../../../hooks/useCalendar'
import { useAppSelector } from '../../../Store'



interface EventListItemProps {
    event: Event
    date: string
}

const EventListItem = ( { event, date }: EventListItemProps ) => {
    const { user } = useAppSelector( state => state.auth )
    const theme = useTheme()
    const { handlePopup } = useCalendar()
    const isCurrentDay = moment( date ).isSame( moment(), 'day' )
    const dateOptions = {
        dFormat: ' ', displayEnd: false, hFormat: 'HH:mm',
    }

    console.log( 'USER: ', user )

    const handleClick = () => {
        handlePopup( event.id )
    }

    const getCircleColor = () => {
        if ( !user || user === undefined ) {
            return 'primary.dark'
        }
        if ( event.user_id === user.id ) {
            return 'secondary.dark'
        }
        return 'primary.dark'
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
                      backgroundColor: getCircleColor(),
                      mixBlendMode: isCurrentDay ? 'multiply' : 'normal',
                      borderRadius: '50%',
                  }}/>
                  <Typography variant={'body2'} sx={{ fontSize: '.6rem' }}>
                      <EventDate start={event.start} {...dateOptions}
                                 end={event.end}/> {event.name.substring( 0, 15 )}{event.name.length > 15 && '…'}
                  </Typography>
              </Box>
          </Tooltip>
      </Box>
    )
}
export default EventListItem