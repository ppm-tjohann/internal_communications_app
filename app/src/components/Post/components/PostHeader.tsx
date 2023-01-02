import { Avatar, Box, Container, IconButton, Stack } from '@mui/material'
import { MoreVert } from '@mui/icons-material'



const PostHeader = () => {

    return ( <Container sx={{ my: 1 }}>
        <Stack justifyContent={'space-between'}>
            <Avatar src={'https://api.lorem.space/image/face?w=150&h=150'}>username</Avatar>
            <Box>
                <IconButton>
                    <MoreVert/>
                </IconButton>
            </Box>
        </Stack>
    </Container> )

}
export default PostHeader