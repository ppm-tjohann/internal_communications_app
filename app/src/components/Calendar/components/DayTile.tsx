import { Day } from '../../../lib/calendarHelper'
import { useAppSelector } from '../../../Store'
import { useContext } from 'react'
import { AddEventPopupContext } from '../../Events/components/AddEventsPopup'
import moment from 'moment'
import { Box, Chip, Grid, Stack, Typography, useTheme } from '@mui/material'
import { DEFAULT_FORMAT } from '../../../reducers/CalendarReducer'
import { DATE_TIME_FORMAT } from '../../../interfaces/event'
import EventList from '../../Events/components/EventList'
import useCalendar from '../../../hooks/useCalendar'



interface DayProps {
    date: Day
    format?: string,
    monthFormat?: string,
    highlightCurrentDay?: boolean
}

/**
 * Add EventList
 * default format
 * open popup with date value
 * */

const DayTile = ( { date, format = 'DD', monthFormat = 'DD. MMM', highlightCurrentDay = true }: DayProps ) => {
    const { toggleEventPopup, setInitialDate } = useContext( AddEventPopupContext )
    const { viewingDate } = useCalendar()
    const theme = useTheme()
    const isCurrentMonth = moment( viewingDate ).isSame( date.date, 'month' )
    const isCurrentDay = moment().isSame( moment( date.date ), 'day' )

    const handleClick = () => {
        setInitialDate( moment( date.date ).format( DATE_TIME_FORMAT ) )
        toggleEventPopup()
    }

    let formattedDate = moment( date.date ).format( format )
    if ( formattedDate === '01' ) {
        formattedDate = moment( date.date ).format( monthFormat )
    }

    return ( <Grid item xs={1}>
          <Box onDoubleClick={handleClick}
               sx={{
                   opacity: isCurrentMonth ? 1 : .3,
                   py: 1, px: 2, border: `1px solid ${theme.palette.grey['900']}`, height: '100%', backgroundColor: isCurrentDay ? 'primary.dark' : 'default',
               }}>
              <Typography variant={'overline'} color={isCurrentDay ? 'primary' : 'default'}>{formattedDate}</Typography>


              {/*EventsList*/}
              <EventList date={date.date}/>
          </Box>
      </Grid>
    )
}
export default DayTile