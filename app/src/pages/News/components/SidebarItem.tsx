import { Box, IconButton, Paper, Stack, Typography } from '@mui/material'
import { ArrowRight } from '@mui/icons-material'
import Image from '../../../components/utils/Image'
import { NewsTeaser } from '../../../interfaces/news'
import { useHistory } from 'react-router'



const SidebarItem = ( { headline, teaser, image, id }: NewsTeaser ) => {

    const history = useHistory()

    const handleClick = () => {
        history.push( `news/${id}` )
    }

    return (
      <Paper sx={{ p: 0, overflow: 'hidden', mb: 3 }}>
          <Box sx={{ height: 200, overflow: 'hidden' }}>
              <Image src={`${process.env.REACT_APP_SRC_BASE}${image}`}/>
          </Box>
          <Stack alignItems={'flex-end'} p={3} justifyContent={'space-between'}>
              <Box>
                  <Typography variant={'h6'}>{headline}</Typography>
                  <Typography variant={'body2'} sx={{ opacity: .7 }}>{teaser}
                  </Typography>
              </Box>
              <Box>
                  <IconButton onClick={handleClick}><ArrowRight/></IconButton>
              </Box>
          </Stack>
      </Paper>
    )
}
export default SidebarItem