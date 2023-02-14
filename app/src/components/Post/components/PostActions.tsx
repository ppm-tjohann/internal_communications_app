import { Container, Stack } from '@mui/material'
import PostLikes from './PostLikes'



const PostActions = () => {
    return (
      <Container sx={{ my: 1 }}>
          <Stack justifyContent={'space-between'} height={40} mx={-1}>
              <PostLikes/>
          </Stack>
      </Container>
    )
}
export default PostActions