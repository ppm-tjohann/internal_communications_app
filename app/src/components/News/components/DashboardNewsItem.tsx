import { News } from '../../../interfaces/news'
import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, IconButton, Paper, Stack, Typography, useTheme } from '@mui/material'
import Image from '../../utils/Image'
import { ArrowCircleRight, ArrowRight } from '@mui/icons-material'
import { useHistory } from 'react-router'
import FlexBox from '../../utils/FlexBox'



const DashboardNewsItem = ( { teaser, image, headline, id }: News ) => {

    const history = useHistory()
    const theme = useTheme()
    const handleClick = () => {
        history.push( `news/${id}` )
    }

    return (
      <Card sx={{ borderRadius: theme.spacing( 3 ), p: 1 }}>
          <CardMedia
            sx={{ height: 140, flexGrow: 1, m: -1, mb: 1 }}
            image={'https://images.unsplash.com/photo-1670349148055-e11a0b3be242?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'}
          />
          <CardContent>
              <Typography variant={'h5'} component={'div'}>Test-Nachricht</Typography>
              <Typography variant={'body2'} color={'text.secondary'} component={'div'}>Lorem ipsum
                  dolor sit amet,
                  consetetur
                  sadipscing elitr, sed diam nonumy
                  eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</Typography>
          </CardContent>
          <CardActions>
              <Button size={'small'}>Read more</Button>
          </CardActions>
      </Card>
    )

    // return (
    //   <Paper sx={{ height: '100%', minHeight: 200, p: 0, overflow: 'hidden', borderRadius: theme.spacing( 3 ) }}>
    //       <Stack direction={{ xs: 'column', sm: 'row', md: 'column', lg: 'row', xl: 'column' }} spacing={0} sx={{ maxHeight: '100%', height: '100%' }}>
    //           <Box sx={{ flexGrow: 1, flexShrink: 2 }}>
    //               <Box sx={{ position: 'relative', width: '100%', height: '100%', pb: '40%', overflow: 'hidden' }}>
    //                   <Box sx={{ position: 'absolute', width: '100%', height: '100%' }}>
    //                       <Image
    //                         src={'https://images.unsplash.com/photo-1670349148055-e11a0b3be242?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'}/>
    // </Box> </Box> </Box> <Box sx={{ flexShrink: 1, p: { xs: 1, xl: 3 }, display: 'flex' }}> <Box sx={{ flexGrow: 1, flexShrink: 1 }}> <Typography mb={1}
    // variant={'h6'} lineHeight={1} component={'h3'}>Test-Nachricht</Typography> <Typography variant={'caption'} lineHeight={.8}>Shor teaser for News maybe a
    // little bit longer</Typography> </Box> <Box> <IconButton onClick={handleClick}> <ArrowRight/> </IconButton> </Box>  </Box> </Stack> </Paper> )

}
export default DashboardNewsItem