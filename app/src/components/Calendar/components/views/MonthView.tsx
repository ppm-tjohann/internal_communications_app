import { Box, Chip, Grid, Paper, Stack, Typography, useTheme } from '@mui/material'
import { Day, getCalendarDates, getMonthDates } from '../../../../lib/calendarHelper'
import { useAppSelector } from '../../../../Store'
import WeekDaysGrid from '../WeekDaysGrid'
import moment from 'moment'



interface DayProps {
    date: Day
}

export const DayTile = ( { date }: DayProps ) => {
    const { events } = useAppSelector( state => state.calendar )
    const dayEvents = events.filter( event => moment( date.date ).isSame( event.start, 'day' ) )
    if ( dayEvents.length > 0 ) {
        console.log( 'Day Events : ', dayEvents )
    }
    const theme = useTheme()
    return ( <Grid item xs={1}>
          <Box sx={{ py: 2, px: 3, border: `1px solid ${theme.palette.grey['900']}`, height: 150 }}>
              <Chip label={date.date}/>
              <Stack direction={'column'}>
                  {
                      dayEvents.map( event => <Paper sx={{ p: .05 }}><Typography variant={'body2'}>{event.name.substring( 0, 10 )}</Typography></Paper> )
                  }
              </Stack>
          </Box>
      </Grid>
    )
}

const MonthView = () => {
    const { viewingDate, currentDate } = useAppSelector( state => state.calendar )
    const daysArray = getCalendarDates( viewingDate )
    return (
      <Grid container columns={7} spacing={0}>
          <WeekDaysGrid/>
          {daysArray.map( ( day, index ) => <DayTile key={index} date={day}/> )}
      </Grid>
    )

}
export default MonthView