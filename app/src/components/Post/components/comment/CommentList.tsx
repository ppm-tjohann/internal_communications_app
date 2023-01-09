import CommentView from './index'
import { Button, Collapse, Stack, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import AddComment from './AddComment'
import { ExpandMore } from '@mui/icons-material'
import FlexBox from '../../../utils/FlexBox'
import * as commentsApi from '../../../../lib/api/comments'
import { Comment } from '../../../../interfaces/comment'



interface CommentListProps {
    id: number
    comments_count: number
}

const CommentList = ( { id, comments_count }: CommentListProps ) => {

    const getInitial = () => {
        let comments = []
        let i = 0
        while ( i < comments_count ) {
            comments.push( null )
            i++
        }
        return comments
    }

    const [ expanded, setExpanded ] = useState( false )
    const [ comments, setComments ] = useState<Comment[] | null[]>( getInitial() )
    const [ loading, setLoading ] = useState( true )
    const [ size, setSize ] = useState( 3 )
    const theme = useTheme()

    const handleClick = () => {
        setExpanded( e => !e )
    }

    useEffect( () => {
        // TODO do it with redux
        if ( expanded && !( comments[0] !== null ) ) {
            commentsApi.getForPost( id ).then( res => {
                setComments( res.data )
                setLoading( false )
                console.log( 'Comments :', res.data )
            } ).catch( e => {
                console.error( 'Fetching Comments failed :', e )
            } )
        }
    }, [ expanded ] )

    return (
      <>
          <Collapse in={expanded}>
              <>
                  <Stack direction={'column'} maxHeight={250} sx={{ overflowY: 'scroll' }}>
                      {comments.map( ( comment, index ) => <CommentView key={index} comment={comment} loading={loading}/> )}
                  </Stack>
                  <AddComment id={id}/>
              </>
          </Collapse>
          <FlexBox sx={{ width: '100%' }}>
              <Button endIcon={<ExpandMore sx={{
                  transition: `all ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
                  transform: `rotate(${expanded ? '-180deg' : '0'})`,
              }}/>}
                      onClick={handleClick} color={'inherit'} size={'small'} sx={{ opacity: .6 }}>{comments_count} comment(s)</Button>
          </FlexBox>

      </>
    )
}
export default CommentList