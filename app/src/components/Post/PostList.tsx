import { Box, Container, Paper, Stack } from '@mui/material'
import Post from './index'
import AddPostForm from '../Forms/AddPostForm'
import BoardCard from '../utils/BoardCard'



const PostList = () => {
    const DUMMY_POST = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 19 ]
    return ( <Box>
        <Container maxWidth={'sm'} sx={{ mb: 3 }}>
            <Paper>
                <AddPostForm/>
            </Paper>
        </Container>
        <Container maxWidth={'sm'}>
            <Stack direction={'column'}>
                {DUMMY_POST.map( post => <Post rd={post}/> )}
            </Stack>
        </Container>
    </Box> )
}
export default PostList