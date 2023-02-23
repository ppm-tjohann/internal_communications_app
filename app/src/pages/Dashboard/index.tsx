import { Grid, Typography } from '@mui/material'
import UsersList from '../../components/Users/UsersList'
import TodayEventsList from '../../components/Events/components/TodayEventsList'

import ScoreList from '../../components/ScoreList'
import DashboardNews from '../../components/News/components/DashboardNews'



const Dashboard = () => {

    return (
      <Grid container alignItems={'stretch'}>
          <Grid item xs={12} md={6}>
              <UsersList/>
          </Grid>
          <Grid item xs={12} md={6}>
              <TodayEventsList/>
          </Grid>
          <Grid item xs={12} md={12}>
              <ScoreList/>
          </Grid>
          <Grid item xs={12} md={12}>
              <DashboardNews/>
          </Grid>
      </Grid>
    )
}
export default Dashboard