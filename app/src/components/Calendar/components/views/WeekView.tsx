import { Box, Grid, Typography } from '@mui/material'
import WeekDaysGrid from '../WeekDaysGrid'
import { useAppSelector } from '../../../../Store'
import { Day, getWeekDates } from '../../../../lib/calendarHelper'

import DayTile from '../DayTile'



const WeekView = () => {

    const { viewingDate } = useAppSelector( state => state.calendar )

    const datesInWeek: Day[] = getWeekDates( viewingDate )

    return (
      <>
          <WeekDaysGrid/>
          <Grid container spacing={0} columns={7} alignItems={'stretch'} sx={{ flexGrow: 1 }}>
              {datesInWeek.map( day => ( <DayTile date={day}/> ) )}
          </Grid>
      </>
    )
}
export default WeekView


