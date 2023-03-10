import CommentView from './index'
import { Button, Collapse, Stack, useTheme } from '@mui/material'
import { useContext } from 'react'
import AddComment from './AddComment'
import { ExpandMore } from '@mui/icons-material'
import FlexBox from '../../../utils/FlexBox'
import { CommentsContext } from './CommentProvider'
import { PostContext } from '../PostWrapper'



const CommentList = () => {

    const { expanded, comments, loading, handleExpansion } = useContext( CommentsContext )
    const { post } = useContext( PostContext )

    const theme = useTheme()

    return (
      <>
          <Collapse in={expanded}>
              <>
                  <Stack direction={'column'} maxHeight={250} sx={{ overflowY: 'scroll' }} my={comments.length > 0 ? 2 : 0}>
                      {comments.map( ( comment, index ) => <CommentView key={index} comment={comment} loading={loading}/> )}
                  </Stack>
                  <AddComment/>
              </>
          </Collapse>
          <FlexBox sx={{ width: '100%' }}>
              <Button endIcon={<ExpandMore sx={{
                  transition: `all ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
                  transform: `rotate(${expanded ? '-180deg' : '0'})`,
              }}/>}
                      onClick={handleExpansion} color={'inherit'} size={'small'} sx={{ opacity: .6 }}>{post.comments_count} comment(s)</Button>
          </FlexBox>

      </>
    )
}
export default CommentList