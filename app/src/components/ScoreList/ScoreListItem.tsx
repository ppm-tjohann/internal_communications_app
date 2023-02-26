import Score from '../../interfaces/score'
import { Box, Grid, Paper, Stack, Tooltip, Typography, useTheme } from '@mui/material'
import UserAvatar from '../Users/UserAvatar'
import FlexBox from '../utils/FlexBox'



const ScoreListItem = ( { id, count, user }: Score, index: number ) => {

    const theme = useTheme()
    const {
        REACT_APP_SRC_BASE = 'http://localhost:8000',
    } = process.env

    return (
      <Paper elevation={2} sx={{ borderRadius: theme.spacing( 3 ), height: '100%', width: '100%', flexGrow: 1, flexShrink: 1, p: 0, overflow: 'hidden' }}
             key={id}>

          <Stack justifyContent={'space-between'} alignItems={'center'} height={'100%'}>
              <Paper elevation={3}
                     sx={{
                         m: 2,
                         flexGrow: 0,
                         backgroundColor: 'primary.main',
                         p: 0,
                         borderRadius: '50%',
                         width: '25%',
                         pb: '25%',
                         position: 'relative',
                     }}>
                  <FlexBox sx={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, flexDirection: 'column' }}>
                      <Typography color={theme.palette.background.default} variant={'caption'} component={'p'} textAlign={'center'}>Score</Typography>
                      <Typography color={theme.palette.background.default} variant={'h4'} component={'p'} textAlign={'center'}>{count}</Typography>
                  </FlexBox>
              </Paper>

              {user && <Tooltip title={user.username}>
                <Stack alignItems={'flex-end'} position={'relative'} height={'100%'} flexGrow={1}>
                  <Box sx={{ position: 'absolute', height: '100%', width: '100%' }}>
                    <Box sx={{
                        background: `linear-gradient(90deg,#484f63,#4a526400)`,
                        position: 'absolute',
                        width: '100%',
                        height: '100%', zIndex: 1,
                    }}/>
                    <Box sx={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%', zIndex: 0,
                    }}>
                        {user.avatar && <img src={`${REACT_APP_SRC_BASE}/${user.avatar}`}/>}
                    </Box>
                  </Box>
                  <Box position={'relative'} zIndex={2} sx={{ flexShrink: 0 }} pb={2}>
                    <Typography variant={'body1'} component={'p'} textAlign={'center'}>{user.username}</Typography>
                  </Box>
                </Stack>
              </Tooltip>
              }
          </Stack>
      </Paper>
    )
}
export default ScoreListItem