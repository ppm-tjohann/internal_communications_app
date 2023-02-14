import CommentsProvider from './comment/CommentProvider'
import CommentList from './comment/CommentList'
import { useContext } from 'react'
import { PostContext } from './PostWrapper'



const PostComments = () => {

    const { post } = useContext( PostContext )

    return (
      <CommentsProvider post={post}>
          <CommentList/>
      </CommentsProvider>
    )
}
export default PostComments