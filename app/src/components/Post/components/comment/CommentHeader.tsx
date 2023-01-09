import { User } from '../../../../interfaces/user'
import { Skeleton, Stack, Typography } from '@mui/material'
import UserAvatar from '../../../Users/UserAvatar'
import moment from 'moment'



interface CommentHeaderProps {
    user: User | null | undefined
    created: string | undefined
    loading: boolean
}

const CommentHeader = ( { user, created, loading }: CommentHeaderProps ) => {

    if ( loading ) {
        return ( <Stack sx={{ mb: 1 }} alignItems={'center'} justifyContent={'space-between'}>
            <Stack spacing={1}>
                <Skeleton variant={'circular'} sx={{ width: 24, height: 24 }}/>
                <Skeleton variant={'text'} sx={{ width: 50 }}/>
            </Stack>
            <Skeleton sx={{ width: 50 }} variant={'text'}/>
        </Stack> )
    }

    if ( !user ) {
        return null
    }

    return ( <Stack sx={{ mb: 1 }} alignItems={'center'} justifyContent={'space-between'}>
          <UserAvatar user={user} size={'small'} showName/>
          {created && <Typography variant={'body2'} sx={{ opacity: .6 }}>{moment( created ).fromNow()}</Typography>}
      </Stack>
    )
}
export default CommentHeader