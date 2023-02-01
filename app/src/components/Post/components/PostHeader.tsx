import { Avatar, Box, Container, IconButton, Stack, Typography } from '@mui/material'
import { MoreVert } from '@mui/icons-material'
import { User } from '../../../interfaces/user'
import UserAvatar from '../../Users/UserAvatar'
import { useContext } from 'react'
import { PostContext } from '../PostProvider'



const PostHeader = () => {

    const { post } = useContext( PostContext )
    
    return ( <Container sx={{ my: 1 }}>
        <Stack justifyContent={'space-between'}>
            <UserAvatar user={post.user} showName/>
            <Box>
                <IconButton>
                    <MoreVert/>
                </IconButton>
            </Box>
        </Stack>
    </Container> )

}
export default PostHeader