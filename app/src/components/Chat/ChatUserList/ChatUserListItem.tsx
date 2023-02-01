import { Chat } from '../../../interfaces/chat'
import { ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../Store'
import { setActiveChat } from '../../../actions/chat/ChatActions'
import moment from 'moment'
import UserAvatarList from '../../Users/UserAvatarList'
import { ArrowRight } from '@mui/icons-material'



const ChatUserListItem = ( { users, updated_at, created_at, messages, name, id }: Chat ) => {
    console.log( 'CHAT List Item' )
    const { activeChat } = useAppSelector( state => state.chat )
    const dispatch = useAppDispatch()

    const getMessage = () => {
        if ( messages.length === 0 )
            return 'No Messages yet'
        return `${messages[0].user?.username}: ${messages[0].text}`
    }

    const handleClick = () => {
        dispatch( setActiveChat( id ) )
    }

    return ( <ListItemButton selected={activeChat !== null && activeChat.id === id} key={id} onClick={handleClick}>
          <ListItemAvatar>
              <UserAvatarList users={users}/>
          </ListItemAvatar>
          <ListItemText primary={name ?? `Chat from ${moment( created_at ).format( 'DD.MM.YYYY' )}`}
                        secondary={getMessage()}/>
          <ListItemIcon>
              <Stack spacing={0} direction={'column'} alignItems={'flex-end'}>
                  <Typography variant={'caption'}>{moment( updated_at ).fromNow()}</Typography>
                  <ArrowRight/>
              </Stack>
          </ListItemIcon>
      </ListItemButton>
    )
}
export default ChatUserListItem