import { Avatar, Box, Container, IconButton, Stack, Typography } from '@mui/material'
import { MoreVert } from '@mui/icons-material'
import { User } from '../../../interfaces/user'
import UserAvatar from '../../Users/UserAvatar'



const PostHeader = ( { user }: { user: User } ) => {

    return ( <Container sx={{ my: 1 }}>
        <Stack justifyContent={'space-between'}>
            <UserAvatar user={user} showName/>
            <Box>
                <IconButton>
                    <MoreVert/>
                </IconButton>
            </Box>
        </Stack>
    </Container> )

}
export default PostHeader