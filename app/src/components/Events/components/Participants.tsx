import { Avatar, Stack } from '@mui/material'
import { User } from '../../../interfaces/user'
import UserAvatar from '../../Users/UserAvatar'
import UserAvatarList from '../../Users/UserAvatarList'



interface ParticipantsProps {
    users: User[]
}

const Participants = ( { users }: ParticipantsProps ) => {
    return ( <UserAvatarList users={users}/> )
}
export default Participants
