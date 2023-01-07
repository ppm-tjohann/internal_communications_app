import { Box, Collapse, Container, Paper, Stack } from '@mui/material'
import Post from './index'
import AddPostForm from '../Forms/AddPostForm'
import { useAppSelector } from '../../Store'
import Loader from '../utils/Loader'



const PostList = () => {
    const DUMMY_POST = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 19 ]

    const { posts, loading } = useAppSelector( state => state.posts )

    return ( <Box>
        <Container maxWidth={'sm'} sx={{ mb: 3 }}>
            <Paper>
                <AddPostForm/>
            </Paper>
        </Container>
        <Container maxWidth={'sm'}>
            {
                loading ? <Loader/> :

                  <Stack direction={'column'}>
                      {posts.map( post => <Post key={post.id} {...post}/> )}
                  </Stack>
                 
            }
        </Container>
    </Box> )
}
export default PostList