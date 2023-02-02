import { Grid } from '@mui/material'
import ChatList from '../../components/Chat/ChatList'
import ChatUserList from '../../components/Chat/ChatUserList'
import { useAppDispatch } from '../../Store'
import { useEffect } from 'react'
import { registerChatSockets } from '../../actions/chat/ChatActions'



const Chat = () => {
    const dispatch = useAppDispatch()
    useEffect( () => {
        dispatch( registerChatSockets() )
    }, [] )

    return (
      <Grid container>
          <Grid item xs={12} md={5} xl={4}>
              <ChatUserList/>
          </Grid>
          <Grid item xs={12} md={7} xl={8}>
              <ChatList/>
          </Grid>
      </Grid>
    )
}
export default Chat