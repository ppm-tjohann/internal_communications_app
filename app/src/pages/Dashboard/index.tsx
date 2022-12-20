import { Grid, Typography } from '@mui/material'
import UsersList from '../../components/Users/UsersList'



const Dashboard = () => {

    return (
      <Grid container>
          <Grid item xs={12} md={6}>
              <UsersList/>
          </Grid>
      </Grid>
    )
}
export default Dashboard