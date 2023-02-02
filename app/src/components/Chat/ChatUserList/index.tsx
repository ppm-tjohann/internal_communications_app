import { Box, Typography, Button, List, Divider } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../Store'
import { useMemo } from 'react'
import { setChats } from '../../../actions/chat/ChatActions'
import Loader from '../../utils/Loader'
import ChatUserListItem from './ChatUserListItem'
import AddNewChat from '../AddNewChat'
import FlexBox from '../../utils/FlexBox'



const ChatUserList = () => {

    const { chats, loadingGetChats } = useAppSelector( state => state.chat )
    const dispatch = useAppDispatch()

    useMemo( () => {
        if ( chats.length === 0 ) {
            dispatch( setChats() )
        }
    }, [] )

    const getContent = () => {
        if ( loadingGetChats ) {
            return <Loader/>
        }
        if ( chats.length === 0 ) {
            return (
              <FlexBox sx={{ height: '100%' }}>
                  <Typography variant={'h5'} textAlign={'center'} mb={3}>No Chats yet</Typography>
              </FlexBox>
            )
        }
        return <List>{chats.map( chat => <ChatUserListItem {...chat} key={chat.id}/> )}</List>
    }

    return (
      <Box>
          <Typography textAlign={'center'} mt={6} variant={'h4'}>Chats</Typography>
          <Box>
              <AddNewChat/>
              <Divider/>
          </Box>
          <Box sx={{ height: '80vh', position: 'relative', overflowY: 'scroll' }}>
              {getContent()}
          </Box>
      </Box>
    )
}
export default ChatUserList