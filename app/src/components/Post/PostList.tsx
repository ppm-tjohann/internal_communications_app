import { Box, Container, Stack } from '@mui/material'
import Post from './index'



const PostList = () => {
    const DUMMY_POST = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 19 ]
    return ( <Box>
        <Container maxWidth={'sm'}>
            <Stack direction={'column'}>
                {DUMMY_POST.map( post => <Post rd={post}/> )}
            </Stack>
        </Container>
    </Box> )
}
export default PostList