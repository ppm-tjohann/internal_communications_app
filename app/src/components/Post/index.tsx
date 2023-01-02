import { Box, Container, Paper, Skeleton, Typography } from '@mui/material'
import PostWrapper from './components/PostWrapper'
import PostImage from './components/PostImage'
import PostHeader from './components/PostHeader'
import PostActions from './components/PostActions'



const Post = ( { rd }: { rd?: number } ) => {

    return (
      <PostWrapper>
          <PostHeader/>
          <PostImage src={`https://picsum.photos/800/800?random=${rd}`}/>
          <PostActions/>
          <Container>
              <Typography variant={'h2'}>
                  Im a Post
              </Typography>
          </Container>
      </PostWrapper>
    )
}
export default Post