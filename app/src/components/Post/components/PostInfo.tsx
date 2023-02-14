import { Container, Divider, Stack, Typography } from '@mui/material'
import UserAvatar from '../../Users/UserAvatar'
import { useContext } from 'react'
import { PostContext } from './PostWrapper'



const PostInfo = () => {

    const { post } = useContext( PostContext )

    return (
      <Container sx={{ mb: 1 }}>
          <Stack spacing={1} alignItems={'center'}>
              <UserAvatar user={post.user} size={'small'}/>
              <Typography variant={'subtitle1'}>{post.user.username}</Typography>
              <Divider orientation={'vertical'} flexItem/>
              <Typography variant={'body1'}>
                  {post.text}
              </Typography>
          </Stack>
      </Container>
    )

}
export default PostInfo