import Score from '../../interfaces/score'
import { Grid, Stack, Typography } from '@mui/material'
import UserAvatar from '../Users/UserAvatar'



const ScoreListItem = ( { id, count, user }: Score ) => {
    return (
      <Grid item xs={12} sm={4} key={id}>
          <Stack direction={'column'} alignItems={'center'}>
              <Typography variant={'h2'} component={'p'} textAlign={'center'}>{count}</Typography>
              {user && <UserAvatar user={user}/>}
          </Stack>
      </Grid>
    )
}
export default ScoreListItem