import { Avatar, Stack } from '@mui/material'
import { User } from '../../../interfaces/user'



interface ParticipantsProps {
    users: User[]
}

const Participants = ( { users }: ParticipantsProps ) => {
    return (
      <Stack spacing={-1} flexShrink={0}>
          {users.map( user => <Avatar key={user.id} src={user.avatar ?? ''}>{user.username}</Avatar> )}
      </Stack>
    )
}
export default Participants
