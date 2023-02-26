import { Box, Container, Divider, Paper, Skeleton, Stack, Typography } from '@mui/material'
import PostWrapper from './components/PostWrapper'
import PostImage from './components/PostImage'
import PostHeader from './components/PostHeader'
import PostActions from './components/PostActions'
import { Post } from '../../interfaces/post'
import PostInfo from './components/PostInfo'
import PostComments from './components/PostComments'



const PostView = ( post: Post ) => {

    return (
      <PostWrapper post={post}>
          <PostHeader/>
          <PostImage src={post.image}/>
          <PostActions/>
          <PostInfo/>
          <PostComments/>
      </PostWrapper>
    )
}
export default PostView