import useSocket from '../../hooks/useSocket'
import { useEffect, useMemo, useState } from 'react'
import Score from '../../interfaces/score'
import BoardCard from '../utils/BoardCard'
import * as score from '../../lib/api/score'
import { Box, Grid, IconButton, Paper, Stack, Tooltip, Typography, useTheme } from '@mui/material'
import UserAvatar from '../Users/UserAvatar'
import { Info } from '@mui/icons-material'
import FlexBox from '../utils/FlexBox'
import SquareBox from '../utils/SquareBox'
// import ScoreListItem from './ScoreListItem'

const ScoreListItem = ( { id, count, user }: Score, index: number ) => {

    const theme = useTheme()

    const {
        REACT_APP_SRC_BASE = 'http://localhost:8000',
    } = process.env

    return (
      <Paper elevation={2} sx={{ borderRadius: theme.spacing( 3 ), height: '100%', width: '100%', flexGrow: 1, flexShrink: 1, p: 0, overflow: 'hidden' }}
             key={id}>

          <Stack justifyContent={'space-between'} alignItems={'center'} height={'100%'} direction={{ xs: 'row', sm: 'column-reverse', lg: 'row' }}>
              <FlexBox sx={{ p: { xs: 2, xl: 2 }, flexGrow: 1, flexShrink: 2, width: '100%', height: '100%' }}>
                  <SquareBox>
                      <Paper elevation={3}
                             sx={{
                                 width: '100%', height: '100%',
                                 backgroundColor: 'primary.main',
                                 p: 0,
                                 borderRadius: '50%',
                             }}>
                          <FlexBox
                            sx={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, flexDirection: 'column', flexGrow: 0, flexShrink: 0 }}>
                              <Typography color={theme.palette.background.default} variant={'caption'} component={'p'} textAlign={'center'}>Score</Typography>
                              <Typography color={theme.palette.background.default} variant={'h5'} component={'p'} textAlign={'center'}>{count}</Typography>
                          </FlexBox>
                      </Paper>
                  </SquareBox>
              </FlexBox>

              {user && <Tooltip title={user.username}>
                <Stack alignItems={'flex-end'} position={'relative'} height={'100%'} width={'100%'} flexGrow={1}
                       mt={{ sm: -4, lg: 0 }}>
                  <Box sx={{ position: 'absolute', height: '100%', width: '100%' }}>
                    <Box sx={{
                        background: {
                            xs: `linear-gradient(90deg,#484f63,#4a526400)`,
                            sm: `linear-gradient(#484f63,#4a526400)`,
                            lg: `linear-gradient(90deg,#484f63,#4a526400)`,
                        },
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

const ScoreList = () => {

    const [ loading, setLoading ] = useState( true )
    const [ scores, setScores ] = useState<Score[]>( [] )

    useMemo( () => {
        setLoading( true )
        score.bestOf().then( res => {
            setScores( res.data.slice( 0, 3 ) )
            setLoading( false )
        } ).catch( e => {
            console.error( 'Fetching Scoreboard failed: ', e )
            setLoading( false )
        } )
    }, [] )

    if ( !loading ) {
        console.log( 'Scores :', scores )
    }

    return (

      <Stack direction={'column'} height={'100%'} width={'100%'} sx={{ flexGrow: 1, flexShrink: 1 }}>
          <Box flexGrow={0} flexShrink={0}><Typography variant={'h5'}>Scoreboard</Typography></Box>
          <Stack flexGrow={1} flexShrink={1} direction={{ xs: 'column', sm: 'row', lg: 'column', xl: 'column' }} sx={{ height: '100%', width: '100%' }}
                 alignItems={'stretch'}>
              {scores.map( ScoreListItem )}
          </Stack>
      </Stack>

    )

}
export default ScoreList