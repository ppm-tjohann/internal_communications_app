import { Box, IconButton, Paper, Skeleton, Stack, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../../Store'
import { FavoriteBorderOutlined, CommentOutlined } from '@mui/icons-material'
import CommentHeader from './CommentHeader'
import { Comment } from '../../../../interfaces/post'



interface CommentProps {
    comment?: Comment | null | undefined
    loading: boolean
}

const CommentView = ( { comment, loading }: CommentProps ) => {

    const { user } = useAppSelector( state => state.auth )
    console.log( 'Comment : ', comment )

    return (
      <Paper sx={{ py: 1 }} elevation={2}>
          <Box>
              <CommentHeader user={user} loading={loading} created={comment?.created_at}/>
              <Stack alignItems={'center'} justifyContent={'space-between'}>
                  {loading ? <Skeleton variant={'text'} sx={{ width: '80%' }}/> : <Box>{comment?.text ?? null}</Box>}
                  {/*<IconButton size={'small'}><FavoriteBorderOutlined/></IconButton>*/}
              </Stack>
          </Box>
          <Stack justifyContent={'space-between'} alignItems={'center'}>
              <Stack>
                  {loading ? <Skeleton sx={{ width: 50 }}/> : <Typography variant={'body2'} sx={{ opacity: .6 }}>12 likes</Typography>}
                  {loading ? <Skeleton sx={{ width: 50 }}/> : <Typography variant={'body2'} sx={{ opacity: .6 }}>comment</Typography>}
              </Stack>
              <Stack>
                  {loading ?
                    <Skeleton variant={'circular'} sx={{ width: 18, height: 18 }}/> :
                    <IconButton sx={{ opacity: .6 }} size={'small'}><FavoriteBorderOutlined sx={{ width: 18, height: 18 }}/></IconButton>}
                  {loading ?
                    <Skeleton variant={'circular'} sx={{ width: 18, height: 18 }}/> :
                    <IconButton sx={{ opacity: .6 }} size={'small'}><CommentOutlined sx={{ width: 18, height: 18 }}/></IconButton>}
              </Stack>
          </Stack>
      </Paper>
    )
}
export default CommentView