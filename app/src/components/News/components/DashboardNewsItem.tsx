import { News } from '../../../interfaces/news'
import { Box, Grid, IconButton, Paper, Stack, Typography, useTheme } from '@mui/material'
import Image from '../../utils/Image'
import { ArrowCircleRight, ArrowRight } from '@mui/icons-material'
import { useHistory } from 'react-router'



const DashboardNewsItem = ( { teaser, image, headline, id }: News ) => {

    const history = useHistory()
    const theme = useTheme()
    const handleClick = () => {
        history.push( `news/${id}` )
    }

    return (
      <Paper sx={{ height: '100%', p: 0, overflow: 'hidden', borderRadius: theme.spacing( 3 ) }}>
          <Grid container justifyContent={'space-between'} alignItems={'stretch'} sx={{ m: -3, height: '100%' }}>
              <Grid item xs={6} xl={12}>
                  <Box sx={{ position: 'relative', width: '100%', height: '100%', pb: '40%', overflow: 'hidden' }}>
                      <Box sx={{ position: 'absolute', width: '100%', height: '100%' }}>
                          <Image
                            src={'https://images.unsplash.com/photo-1670349148055-e11a0b3be242?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'}/>
                      </Box>
                  </Box>
              </Grid>
              <Grid item xs={6} xl={12}>
                  <Box p={3}>
                      <Grid container>
                          <Grid item xs={12} xl={10}>
                              <Typography mb={1} variant={'h6'} component={'h3'}>Test-Nachricht</Typography>
                              <Typography variant={'body1'}>Shor teaser for News maybe a little bit longer</Typography>
                          </Grid>
                          <Grid item xs={12} xl={2}>
                              <IconButton onClick={handleClick}>
                                  <ArrowRight/>
                              </IconButton>
                          </Grid>
                      </Grid>
                  </Box>
              </Grid>
          </Grid>
      </Paper>
    )

}
export default DashboardNewsItem