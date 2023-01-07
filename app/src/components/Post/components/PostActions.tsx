import { Box, Collapse, Container, IconButton, Slide, Stack } from '@mui/material'
import { Bookmark, BookmarkBorder, BookmarkOutlined, Comment, CommentOutlined, Favorite, FavoriteBorder, HeartBroken, Save, Share } from '@mui/icons-material'
import { useState } from 'react'
import ToggleButton from '../../utils/ToggleButton'
import { useAppDispatch } from '../../../Store'



const PostActions = ( { id }: { id: number } ) => {

    const dispatch = useAppDispatch()

    const [ like, setLike ] = useState( false )
    const [ comment, setComment ] = useState( false )
    const [ bookmark, setBookmark ] = useState( false )

    const handleLike = () => {
        setLike( l => !l )
        dispatch()
    }
    const handleBookmark = () => {
        setBookmark( b => !b )
        dispatch()
    }
    const handleComment = () => {
        setComment( c => !c )
        dispatch()
    }

    return (
      <Container sx={{ my: 1 }}>
          <Stack justifyContent={'space-between'}>
              <Stack spacing={1}>
                  <ToggleButton toggle={like} handleClick={handleLike}>
                      <Favorite/>
                      <FavoriteBorder/>
                  </ToggleButton>
                  <ToggleButton toggle={comment} handleClick={handleComment}>
                      <Comment/>
                      <CommentOutlined/>
                  </ToggleButton>
              </Stack>
              <Stack spacing={1}>
                  <IconButton onClick={handleBookmark}>
                      {bookmark ?
                        <Bookmark/> : <BookmarkBorder/>
                      }
                  </IconButton>
              </Stack>
          </Stack>
      </Container>
    )
}
export default PostActions