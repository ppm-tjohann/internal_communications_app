import { Box, Skeleton, Stack, Typography } from '@mui/material'
import ToggleButton from '../../utils/ToggleButton'
import { Favorite, FavoriteBorder } from '@mui/icons-material'
import { useContext, useEffect, useMemo, useState } from 'react'
import { handlePostLike } from '../../../actions/posts/PostActions'
import { useAppDispatch, useAppSelector } from '../../../Store'
import * as likes from '../../../lib/api/likes'
import useIntersecting from '../../../hooks/useIntersecting'
import FlexBox from '../../utils/FlexBox'
import { PostContext } from '../PostProvider'



interface PostLikesProps {
    id: number
    likes_count: number
}

const PostLikes = () => {

    const { post } = useContext( PostContext )
    const { id, likes_count } = post
    const [ like, setLike ] = useState( false )
    const [ loading, setLoading ] = useState( true )
    const { ref, visible } = useIntersecting()
    const { user } = useAppSelector( state => state.auth )
    const dispatch = useAppDispatch()

    useEffect( () => {
        if ( visible ) console.log( 'Visible' )
    }, [ visible ] )

    useMemo( () => {
        if ( visible ) {
            likes.find( id ).then( res => {
                const { data } = res
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

    const handleLike = () => {
        setLoading( true )
        dispatch( handlePostLike( id ) )
        setLike( l => !l )
        setLoading( false )
    }

    return (
      <Stack sx={{ flexShrink: 0 }} spacing={1} ref={ref}>
          {
              <ToggleButton toggle={like} handleClick={handleLike} loading={loading}>
                  <Favorite/>
                  <FavoriteBorder/>
              </ToggleButton>
          }
          <FlexBox>
              {likes_count === 0 && <Typography variant={'body2'}>no likes</Typography>}
              {likes_count === 1 && <Typography variant={'body2'}>{likes_count} like</Typography>}
              {likes_count > 1 && <Typography variant={'body2'}>{likes_count} likes</Typography>}
          </FlexBox>
      </Stack>
    )
}
export default PostLikes