import useSocket from '../../hooks/useSocket'
import { useEffect, useMemo, useState } from 'react'
import Score from '../../interfaces/score'
import BoardCard from '../utils/BoardCard'
import * as score from '../../lib/api/score'
import { Grid, Paper, Stack, Typography, useTheme } from '@mui/material'
import UserAvatar from '../Users/UserAvatar'



const ScoreListItem = ( { id, count, user }: Score, index: number ) => {

    const theme = useTheme()

    return (
      <Grid item xs={12} sm={4} key={id} mt={2}>
          <Paper elevation={2} sx={{ borderRadius: theme.spacing( 2 ) }}>
              <Typography variant={'body2'}>Platz {index + 1}</Typography>
              <Stack direction={'column'} alignItems={'center'}>
                  <Typography variant={'h4'} component={'p'} textAlign={'center'}>{count}</Typography>
                  {user && <><UserAvatar user={user} size={'large'}/>
                    <Typography variant={'body1'} component={'p'} textAlign={'center'}>{user.username}</Typography>
                  </>
                  }
              </Stack>
          </Paper>
      </Grid>
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
      <BoardCard loading={loading} title={'Scoreboard'}>
          <Grid container>
              {scores.map( ScoreListItem )}
          </Grid>
      </BoardCard>
    )

}
export default ScoreList