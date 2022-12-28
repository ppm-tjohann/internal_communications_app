import { Box, Grid, Typography } from '@mui/material'
import WeekDaysGrid from '../WeekDaysGrid'
import { useAppSelector } from '../../../../Store'
import { Day, getWeekDates } from '../../../../lib/calendarHelper'
import { DayTile } from './MonthView'
import moment from 'moment'



const WeekView = () => {

    const { viewingDate } = useAppSelector( state => state.calendar )

    const datesInWeek: Day[] = getWeekDates( viewingDate )

    return (
      <Grid container spacing={0} columns={7}>
          <WeekDaysGrid/>
          {datesInWeek.map( day => ( <DayTile date={day}/> ) )}
      </Grid>
    )
}
export default WeekView


