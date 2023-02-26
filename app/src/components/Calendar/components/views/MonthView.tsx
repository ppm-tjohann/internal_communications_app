import { Box, Chip, Grid, Paper, Stack, Typography, useTheme } from '@mui/material'
import { Day, getCalendarDates, getMonthDates } from '../../../../lib/calendarHelper'
import { useAppSelector } from '../../../../Store'
import WeekDaysGrid from '../WeekDaysGrid'
import moment from 'moment'
import { DEFAULT_FORMAT } from '../../../../reducers/CalendarReducer'
import { useContext } from 'react'
import { AddEventPopupContext } from '../../../Events/components/AddEventsPopup'
import DayTile from '../DayTile'



const MonthView = () => {
    const { viewingDate, currentDate } = useAppSelector( state => state.calendar )
    const daysArray = getCalendarDates( viewingDate )

    const height = daysArray.length / 7 === 4 ? '25%' : '20%'

    return (
      <>
          <WeekDaysGrid/>
          <Grid container columns={7} spacing={0} sx={{ flexGrow: 1 }}>
              {daysArray.map( ( day, index ) => <DayTile key={index} date={day} height={height}/> )}
          </Grid>
      </>
    )

}
export default MonthView