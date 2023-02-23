import { News } from '../../../interfaces/news'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import Image from '../../utils/Image'
import { ArrowCircleRight, ArrowRight } from '@mui/icons-material'
import { useHistory } from 'react-router'



const DashboardNewsItem = ( { teaser, image, headline, id }: News ) => {

    const history = useHistory()

    const handleClick = () => {
        history.push( `news/${id}` )
    }

    return (
      <Stack direction={'column'} justifyContent={'space-between'} sx={{ m: -3, height: '100%' }}>
          <Box sx={{ position: 'relative', width: '100%', pb: '40%', overflow: 'hidden' }}>
              <Box sx={{ position: 'absolute', width: '100%', height: '100%' }}>
                  <Image src={process.env.REACT_APP_SRC_BASE + image}/>
              </Box>
          </Box>
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} p={3}>
              <Box>
                  <Typography mb={1} variant={'h4'}>{headline}</Typography>
                  <Typography variant={'body1'}>{teaser}</Typography>
              </Box>
              <Box>
                  <IconButton onClick={handleClick}>
                      <ArrowRight/>
                  </IconButton>
              </Box>
          </Stack>
      </Stack>
    )

}
export default DashboardNewsItem