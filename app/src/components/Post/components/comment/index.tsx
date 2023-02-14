import { Box, IconButton, Paper, Skeleton, Stack, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../../Store'
import { FavoriteBorderOutlined, CommentOutlined, Favorite } from '@mui/icons-material'
import CommentHeader from './CommentHeader'
import { Comment } from '../../../../interfaces/post'
import { useEffect, useMemo, useState } from 'react'
import * as likes from '../../../../lib/api/likes'
import ToggleButton from '../../../utils/ToggleButton'



interface CommentProps {
    comment?: Comment | null
    loading: boolean
}

const CommentView = ( { comment, loading }: CommentProps ) => {

    const { user } = useAppSelector( state => state.auth )

    // TODO change to dbs
    const [ liked, setLiked ] = useState( false )
    const [ likeCount, setLikeCount ] = useState( comment?.likes_count ?? 0 )

    useMemo( () => {
        if ( comment ) {
            setLikeCount( comment.likes_count )
            if ( comment.likes === undefined ) {
                setLiked( false )
            }
            else {
                const likedByUser = comment.likes.filter( like => like.user_id === user?.id )
                setLiked( likedByUser.length > 0 ?? false )
            }
        }
    }, [ comment ] )

    const handleLike = () => {
        if ( !comment )
            return

        likes.comment( comment?.id ).then( res => {
            if ( res.status === 200 ) {
                setLiked( false )
                setLikeCount( likes => likes - 1 )
            }
            else if ( res.status === 201 ) {
                setLiked( true )
                setLikeCount( likes => likes + 1 )
            }
        } ).catch( e => {
            console.error( 'Handle Comment Like Error : ', e )
        } )
    }

    return (
      <Paper sx={{ py: 1 }} elevation={2}>
          <Box>
              <CommentHeader user={comment?.user} loading={loading} created={comment?.created_at}/>
              <Stack alignItems={'center'} justifyContent={'space-between'}>
                  {loading ? <Skeleton variant={'text'} sx={{ width: '80%' }}/> : <Box>{comment?.text ?? null}</Box>}
                  {/*<IconButton size={'small'}><FavoriteBorderOutlined/></IconButton>*/}
              </Stack>
          </Box>
          <Stack justifyContent={'space-between'} alignItems={'center'}>
              <Stack>
                  {loading ? <Skeleton sx={{ width: 50 }}/> : <Typography variant={'body2'} sx={{ opacity: .6 }}>{comment?.likes_count} like(s)</Typography>}
                  {loading ? <Skeleton sx={{ width: 50 }}/> : <Typography variant={'body2'} sx={{ opacity: .6 }}>comment</Typography>}
              </Stack>
              <Stack>
                  {loading ?
                    <Skeleton variant={'circular'} sx={{ width: 18, height: 18 }}/> :
                    <ToggleButton sx={{ opacity: .6 }} size={'small'} handleClick={handleLike} toggle={liked}>
                        <Favorite sx={{ width: 18, height: 18 }}/>
                        <FavoriteBorderOutlined sx={{ width: 18, height: 18 }}/>
                    </ToggleButton>}
                  {loading ?
                    <Skeleton variant={'circular'} sx={{ width: 18, height: 18 }}/> :
                    <IconButton sx={{ opacity: .6 }} size={'small'}><CommentOutlined sx={{ width: 18, height: 18 }}/></IconButton>}
              </Stack>
          </Stack>
      </Paper>
    )
}
export default CommentView