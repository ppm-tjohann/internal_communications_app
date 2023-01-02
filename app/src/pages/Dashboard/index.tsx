import { Grid, Typography } from '@mui/material'
import UsersList from '../../components/Users/UsersList'
import TodayEventsList from '../../components/Events/components/TodayEventsList'



const Dashboard = () => {

    return (
      <Grid container>
          <Grid item xs={12} md={6}>
              <UsersList/>
          </Grid>
          <Grid item xs={12} md={6}>
              <TodayEventsList/>
          </Grid>
      </Grid>
    )
}
export default Dashboard