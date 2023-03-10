import { Chat } from '../../../interfaces/chat'
import { Badge, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../Store'
import { setActiveChat } from '../../../actions/chat/ChatActions'
import moment from 'moment'
import UserAvatarList from '../../Users/UserAvatarList'
import { ArrowRight } from '@mui/icons-material'



const ChatUserListItem = ( { users, updated_at, created_at, messages, name, id }: Chat ) => {
    console.log( 'CHAT List Item' )
    const { activeChat } = useAppSelector( state => state.chat )
    const { user } = useAppSelector( state => state.auth )
    const dispatch = useAppDispatch()

    const getMessage = () => {
        if ( messages === undefined || messages.length === 0 )
            return 'No Messages yet'
        return `${messages[0].user?.username}: ${messages[0].text}`
    }

    const getChatName = () => {
        if ( name ) {
            return name
        }
        if ( users.length === 2 ) {
            if ( !user ) {
                return users[1].username
            }
            return users[0].id === user.id ? users[1].username : users[0].username
        }
        else {
            return `Chat from ${moment( created_at ).format( 'DD.MM.YYYY' )}`
        }
    }

    const handleClick = () => {
        dispatch( setActiveChat( id ) )
    }

    return ( <ListItemButton selected={activeChat !== null && activeChat.id === id} key={id} onClick={handleClick}>
          <ListItemAvatar>
              <Badge badgeContent={1} color={'secondary'} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                  <UserAvatarList users={users} options={{ showSelf: false, spacing: -2 }}/>
              </Badge>
          </ListItemAvatar>
          <ListItemText primary={getChatName()}
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