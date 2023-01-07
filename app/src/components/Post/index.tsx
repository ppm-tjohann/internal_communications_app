import { Box, Container, Paper, Skeleton, Typography } from '@mui/material'
import PostWrapper from './components/PostWrapper'
import PostImage from './components/PostImage'
import PostHeader from './components/PostHeader'
import PostActions from './components/PostActions'
import { Post } from '../../interfaces/post'



const PostView = ( { id, text, image }: Post ) => {

    return (
      <PostWrapper>
          <PostHeader/>
          <PostImage src={image}/>
          <PostActions id={id}/>
          <Container>
              <Typography variant={'h2'}>
                  {text}
              </Typography>
          </Container>
      </PostWrapper>
    )
}
export default PostView