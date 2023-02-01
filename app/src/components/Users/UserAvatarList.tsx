import { User } from '../../interfaces/user'
import { Stack } from '@mui/material'
import UserAvatar from './UserAvatar'



const UserAvatarList = ( { users }: { users: User[] } ) => {
    return (
      <Stack spacing={-1} flexShrink={0}>
          {users.map( user => <UserAvatar key={user.id} user={user} size={'medium'}/> )}
      </Stack>
    )
}
export default UserAvatarList