import { Container, Divider, Stack, Typography } from '@mui/material'
import UserAvatar from '../../Users/UserAvatar'
import { useContext } from 'react'
import { PostContext } from './PostWrapper'



const PostInfo = () => {

    const { post } = useContext( PostContext )

    return (
      <Container sx={{ mb: 1 }}>
          <Stack spacing={1} alignItems={'center'}>
              <UserAvatar userId={post.user_id} size={'small'} showName/>
              <Divider orientation={'vertical'} flexItem/>
              <Typography variant={'body1'}>
                  {post.text}
              </Typography>
          </Stack>
      </Container>
    )

}
export default PostInfo