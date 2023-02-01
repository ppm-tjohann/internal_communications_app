import { Box, Container, Divider, Paper, Skeleton, Stack, Typography } from '@mui/material'
import PostWrapper from './components/PostWrapper'
import PostImage from './components/PostImage'
import PostHeader from './components/PostHeader'
import PostActions from './components/PostActions'
import { Post } from '../../interfaces/post'
import PostLikes from './components/PostLikes'
import UserAvatar from '../Users/UserAvatar'
import CommentList from './components/comment/CommentList'
import PostProvider from './PostProvider'
import CommentsProvider from './components/comment/CommentProvider'



const PostView = ( post: Post ) => {

    console.log( 'Post .', post )

    return (

      <PostProvider post={post}>
          <PostWrapper>
              <PostHeader/>
              <PostImage/>
              <PostActions/>
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
              <CommentsProvider post={post}>
                  <CommentList/>
              </CommentsProvider>
          </PostWrapper>
      </PostProvider>
    )
}
export default PostView