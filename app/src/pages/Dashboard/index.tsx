import { Box, Grid, Paper, Stack, Typography } from '@mui/material'
import UsersList from '../../components/Users/UsersList'
import TodayEventsList from '../../components/Events/components/TodayEventsList'

import ScoreList from '../../components/ScoreList'
import DashboardNews from '../../components/News/components/DashboardNews'



const Dashboard = () => {

    //XL
    return (
      <Grid container alignItems={'stretch'} sx={{ height: '100%' }}>
          <Grid item xs={12} xl={8}>
              <Stack direction={'column'} height={'100%'} width={'100%'} alignItems={'stretch'}>
                  <Box sx={{ flexGrow: 1, flexShrink: 1, width: '100%' }}>
                      <DashboardNews/>
                  </Box>
                  <Box sx={{ flexGrow: 1, flexShrink: 1, width: '100%' }}>
                      <Stack sx={{ height: '100%', width: '100%' }} width={'100%'} direction={{ xs: 'column', md: 'row' }}>
                          <Box sx={{ height: '100%', width: '100%', flexGrow: 1, flexShrink: 2 }}><ScoreList/></Box>
                          <Box sx={{ height: '100%', width: '100%', flexGrow: 2, flexShrink: 1 }}><TodayEventsList/></Box>
                      </Stack>
                  </Box>
              </Stack>
          </Grid>
          <Grid item xs={12} xl={4}> <UsersList/></Grid>
      </Grid>
    )
}
export default Dashboard