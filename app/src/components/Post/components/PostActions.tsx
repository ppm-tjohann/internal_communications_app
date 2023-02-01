import { Box, Collapse, Container, IconButton, Slide, Stack } from '@mui/material'
import { Bookmark, BookmarkBorder, BookmarkOutlined, Comment, CommentOutlined, Favorite, FavoriteBorder, HeartBroken, Save, Share } from '@mui/icons-material'
import { useState } from 'react'
import ToggleButton from '../../utils/ToggleButton'
import { useAppDispatch } from '../../../Store'
import { handlePostLike } from '../../../actions/posts/PostActions'
import PostLikes from './PostLikes'



const PostActions = () => {

    const [ comment, setComment ] = useState( false )

    const handleComment = () => {
        setComment( c => !c )
        //dispatch()
    }

    return (
      <Container sx={{ my: 1 }}>
          <Stack justifyContent={'space-between'} height={40} mx={-1}>

              <PostLikes/>
              <Stack spacing={1}>
                  <ToggleButton toggle={comment} handleClick={handleComment}>
                      <Comment/>
                      <CommentOutlined/>
                  </ToggleButton>
              </Stack>
          </Stack>
      </Container>
    )
}
export default PostActions