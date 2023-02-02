import { User } from '../../interfaces/user'
import { Stack } from '@mui/material'
import UserAvatar from './UserAvatar'
import { useAppSelector } from '../../Store'



interface options {
    showSelf?: boolean
}

interface UserAvatarListProps {
    users: User[]
    options?: options
}

const UserAvatarList = ( { users, options: inputOptions }: UserAvatarListProps ) => {

    const { user: auth } = useAppSelector( state => state.auth )

    const options: options = {
        showSelf: true,
        ...inputOptions,
    }

    if ( !options.showSelf && auth !== undefined && auth !== null ) {
        users = users.filter( user => user.id !== auth.id )
    }

    return (
      <Stack spacing={-1} flexShrink={0}>
          {users.map( user => <UserAvatar key={user.id} user={user} size={'medium'}/> )}
      </Stack>
    )
}
export default UserAvatarList