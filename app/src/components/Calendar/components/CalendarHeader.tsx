import { Box, Paper, Stack, Typography } from '@mui/material'
import { useAppSelector } from '../../../Store'
import moment from 'moment'
import CalendarViewToggle from './actions/CalendarViewToggle'
import CalendarNavigation from './actions/CalendarNavigation'



const CalendarHeader = () => {

    const { viewingDate, view } = useAppSelector( state => state.calendar )

    return (
      <Paper sx={{ py: 1 }}>
          <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
              <Box>
                  <Typography variant={'h4'}>
                      {moment( viewingDate ).format( 'MMMM' )}
                  </Typography>
              </Box>
              <CalendarViewToggle/>
              {view === 'List' ? <Box/> : <CalendarNavigation/>}
          </Stack>
      </Paper>
    )
}
export default CalendarHeader
