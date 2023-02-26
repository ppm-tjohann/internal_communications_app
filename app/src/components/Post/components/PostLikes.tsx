import { Box, Container, Modal, Paper, Skeleton, Stack, Typography } from '@mui/material'
import ToggleButton from '../../utils/ToggleButton'
import { Favorite, FavoriteBorder } from '@mui/icons-material'
import { useContext, useEffect, useMemo, useState } from 'react'
import { handlePostLike } from '../../../actions/posts/PostActions'
import { useAppDispatch, useAppSelector } from '../../../Store'
import * as likesApi from '../../../lib/api/likes'
import useIntersecting from '../../../hooks/useIntersecting'
import FlexBox from '../../utils/FlexBox'
import { PostContext } from './PostWrapper'
import UsersList from '../../Users/UsersList'
import { Like } from '../../../interfaces/likes'



interface PostLikesProps {
    id: number
    likes_count: number
}

const PostLikes = () => {

    const { post } = useContext( PostContext )
    const { id, likes_count } = post
    const [ like, setLike ] = useState( false )
    const [ loading, setLoading ] = useState( true )
    const [ open, setOpen ] = useState( false )
    const [ likes, setLikes ] = useState<Like[]>( [] )

    const { ref, visible } = useIntersecting()
    const { user } = useAppSelector( state => state.auth )
    const dispatch = useAppDispatch()

    useMemo( () => {
        if ( visible ) {
            likesApi.find( id ).then( res => {
                const { data } = res
                setLikes( data )
                const likeIds = data.map( like => like.user_id )
                if ( user ) {
                    setLike( likeIds.includes( user.id ) )
                    setLoading( false )
                }
            } ).catch( e => {
                console.error( e )
            } )

        }
    }, [ visible ] )

    const toggleModal = () => {
        setOpen( !open )
    }

    const handleLike = () => {
        setLoading( true )
        dispatch( handlePostLike( id ) )
        setLike( l => !l )
        setLoading( false )
    }
    const users = likes.filter( like => like.user !== undefined ).map( l => l.user )
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
    }

    const LikeText = () => {

        if ( loading ) return <Skeleton variant={'text'} width={20} height={'1rem'}/>
        if ( likes_count === 0 ) return <Typography variant={'body2'} sx={{ opacity: .5, cursor: 'normal' }}>no likes</Typography>
        if ( likes_count === 1 ) return <Typography variant={'body2'}>{likes_count} like</Typography>
        if ( likes_count > 1 ) return <Typography variant={'body2'}>{likes_count} likes</Typography>

    }

    return (
      <>
          <Stack sx={{ flexShrink: 0, opacity: loading ? .5 : 1 }} spacing={1} ref={ref}>
              {
                  <ToggleButton toggle={like} handleClick={handleLike} loading={loading}>
                      <Favorite/>
                      <FavoriteBorder/>
                  </ToggleButton>
              }
              <FlexBox sx={{ cursor: loading ? 'wait' : 'pointer' }} onClick={( !loading && likes.length > 0 ) && toggleModal}>
                  {LikeText()}
              </FlexBox>
          </Stack>
          <Modal open={open} onClose={toggleModal}>

              <Box sx={style}>
                  <Container maxWidth={'md'}>
                      <UsersList users={users} title={'Users liking this Post'}/>
                  </Container>
              </Box>

          </Modal>
      </>
    )
}
export default PostLikes