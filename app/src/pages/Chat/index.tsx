import { Grid, Container, Paper, Typography, Box } from '@mui/material'
import ChatList from '../../components/Chat/ChatList'
import ChatUserList from '../../components/Chat/ChatUserList'



const Chat = () => {

    /**
     * TODO:
     *  Mark active Chat
     *
     * */

    return (
      <Container>
          <Grid container>
              <Grid item xs={12} md={4}>
                  <ChatUserList/>
              </Grid>
              <Grid item xs={12} md={8}>
                  <ChatList/>
              </Grid>
          </Grid>
      </Container>
    )
}
export default Chat