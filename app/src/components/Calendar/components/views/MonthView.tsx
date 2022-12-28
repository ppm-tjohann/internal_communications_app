import { Box, Chip, Grid, useTheme } from '@mui/material'
import { Day, getCalendarDates, getMonthDates } from '../../../../lib/calendarHelper'
import { useAppSelector } from '../../../../Store'
import WeekDaysGrid from '../WeekDaysGrid'
import moment from 'moment'



interface DayProps {
    date: Day
}

export const DayTile = ( { date }: DayProps ) => {
    const { currentDate } = useAppSelector( state => state.calendar )
    const theme = useTheme()
    return ( <Grid item xs={1}>
          <Box sx={{ py: 2, px: 3, border: `1px solid ${theme.palette.grey['900']}`, height: 150 }}>
              <Chip label={date.date}/>
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