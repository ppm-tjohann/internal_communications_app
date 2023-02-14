import { Avatar, Box, Container, IconButton, Stack, Typography } from '@mui/material'
import { MoreVert } from '@mui/icons-material'
import { User } from '../../../interfaces/user'
import UserAvatar from '../../Users/UserAvatar'
import { useContext } from 'react'
import { PostContext } from './PostWrapper'
import moment from 'moment'



const PostHeader = () => {

    const { post } = useContext( PostContext )

    return ( <Container sx={{ my: 1 }}>
        <Stack justifyContent={'space-between'} alignItems={'center'}>
            <UserAvatar user={post.user} showName/>
            <Typography mb={0} sx={{ opacity: .8 }} variant={'body2'}>{moment( post.updated_at ).fromNow()}</Typography>
        </Stack>
    </Container> )

}
export default PostHeader