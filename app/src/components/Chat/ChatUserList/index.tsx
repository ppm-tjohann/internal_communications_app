import { Box, Stack, Typography, Button, List, ListItemButton, ListItemText, ListItemIcon, IconButton, ListItemAvatar } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../Store'
import { useMemo } from 'react'
import { setActiveChat, setChats } from '../../../actions/chat/ChatActions'
import Loader from '../../utils/Loader'
import { Chat } from '../../../interfaces/chat'
import moment from 'moment'
import UserAvatarList from '../../Users/UserAvatarList'
import { ArrowRight } from '@mui/icons-material'
import ChatUserListItem from './ChatUserListItem'



const ChatUserList = () => {

    const { chats, loadingGetChats } = useAppSelector( state => state.chat )
    const dispatch = useAppDispatch()

    useMemo( () => {
        if ( chats.length === 0 ) {
            dispatch( setChats() )
        }
    }, [] )

    if ( chats.length === 0 && !loadingGetChats ) {
        return (
          <Box>
              <Typography variant={'h3'} mb={3}>No Chats yet</Typography>
              <Button>Start Chatting</Button>
          </Box>
        )
    }

    return (
      <Box>
          <Typography textAlign={'center'} mt={6} variant={'h4'}>Chats</Typography>
          <Box>
              {loadingGetChats ?
                <Loader/> :
                <List>{chats.map( chat => <ChatUserListItem {...chat} key={chat.id}/> )}</List>
              }
          </Box>
      </Box>
    )
}
export default ChatUserList