import { Avatar, Stack } from '@mui/material'
import { User } from '../../../interfaces/user'
import UserAvatar from '../../Users/UserAvatar'



interface ParticipantsProps {
    users: User[]
}

const Participants = ( { users }: ParticipantsProps ) => {
    return (
      <Stack spacing={-1} flexShrink={0}>
          {users.map( user => <UserAvatar key={user.id} user={user} size={'medium'}/> )}
      </Stack>
    )
}
export default Participants
