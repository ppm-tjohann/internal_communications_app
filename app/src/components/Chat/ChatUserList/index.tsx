import { Box, Typography, Button, List, Divider } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../Store'
import { useMemo } from 'react'
import { setChats } from '../../../actions/chat/ChatActions'
import Loader from '../../utils/Loader'
import ChatUserListItem from './ChatUserListItem'
import AddNewChat from '../AddNewChat'



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
              <AddNewChat/>
              <Divider/>
          </Box>
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