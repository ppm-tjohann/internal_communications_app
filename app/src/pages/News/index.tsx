import { Box, Container, Grid, Paper, Typography } from '@mui/material'
import Sidebar from './Sidebar'
import Image from '../../components/utils/Image'
import { useAppSelector } from '../../Store'
import AddNewsBar from '../../components/News/AddNewsBar'
import NewsView from '../../components/News/NewsView'



const News = () => {

    const { user } = useAppSelector( state => state.auth )
    
    return (
      <Box>
          {user && user.role === 'ADMIN' && <AddNewsBar/>}
          <Paper sx={{ padding: 0, height: 'max(350px,25vw)', overflow: 'hidden', mb: 6 }}>
              <Image src={'https://images.pexels.com/photos/4322027/pexels-photo-4322027.jpeg?auto=compress&cs=tinysrgb&w=1600'}/>
          </Paper>
          <Grid container>
              <Grid item xs={12} md={9}>
                  <NewsView/>
              </Grid>
              <Grid item xs={12} md={3} sx={{ height: '100%' }}>
                  <Sidebar/>
              </Grid>
          </Grid>
      </Box>
    )

}
export default News