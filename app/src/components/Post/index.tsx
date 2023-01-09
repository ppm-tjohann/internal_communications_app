import { Box, Container, Divider, Paper, Skeleton, Stack, Typography } from '@mui/material'
import PostWrapper from './components/PostWrapper'
import PostImage from './components/PostImage'
import PostHeader from './components/PostHeader'
import PostActions from './components/PostActions'
import { Post } from '../../interfaces/post'
import PostLikes from './components/PostLikes'
import UserAvatar from '../Users/UserAvatar'
import CommentList from './components/comment/CommentList'



const PostView = ( post: Post ) => {

    console.log( 'Post .', post )

    return (
      <PostWrapper>
          <PostHeader user={post.user}/>
          <PostImage src={post.image}/>
          <PostActions id={post.id} likes_count={post.likes_count}/>
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
          <Container>
              <CommentList id={post.id} comments_count={post.comments_count}/>
          </Container>
      </PostWrapper>
    )
}
export default PostView