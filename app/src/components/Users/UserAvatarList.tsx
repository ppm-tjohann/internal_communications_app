import { User } from '../../interfaces/user'
import { Stack } from '@mui/material'
import UserAvatar from './UserAvatar'
import { useAppSelector } from '../../Store'



interface options {
    showSelf?: boolean
    spacing?: number
}

interface UserAvatarListProps {
    users: User[]
    options?: options
}

const UserAvatarList = ( { users, options: inputOptions }: UserAvatarListProps ) => {

    const { user: auth } = useAppSelector( state => state.auth )

    const options: options = {
        showSelf: true,
        spacing: -1,
        ...inputOptions,
    }

    if ( !options.showSelf && auth !== undefined && auth !== null ) {
        users = users.filter( user => user.id !== auth.id )
    }

    return (
      <Stack spacing={options.spacing} flexShrink={0}>
          {users.map( user => <UserAvatar key={user.id} userId={user.id} size={'medium'}/> )}
      </Stack>
    )
}
export default UserAvatarList