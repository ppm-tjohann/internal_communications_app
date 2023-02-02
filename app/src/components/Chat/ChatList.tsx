import { useAppSelector } from '../../Store'
import Loader from '../utils/Loader'
import { useEffect, useRef } from 'react'
import { Box, Collapse, Container, Paper, Stack } from '@mui/material'
import ChatMessage from './ChatMessage'
import SendMessage from './SendMessage'
import { TransitionGroup } from 'react-transition-group'



const ChatList = () => {
    const { activeChat: chat, loadingGetActiveChat: loading } = useAppSelector( state => state.chat )
    const ref = useRef()

    useEffect( () => {
        setTimeout( handleScroll, 250 )
    }, [ ref, ref.current, chat ] )

    const handleScroll = () => {
        //@ts-ignore
        ref.current?.scrollIntoView( { behavior: 'smooth' } )
    }

    if ( loading || !chat ) {
        return <Loader/>
    }

    return (

      <Container maxWidth={'md'}>
          <Paper sx={{ height: '80vh', overflowY: 'scroll' }}>
              <TransitionGroup>
                  <Stack direction={'column'}>
                      {chat.messages.map( message => <Collapse key={message.id} sx={{ width: '100%' }} in={true}>
                          <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
                              <ChatMessage {...message}/>
                          </Box>
                      </Collapse> )}
                      <Box ref={ref}/>
                  </Stack>
              </TransitionGroup>
          </Paper>
          <Box>
              <SendMessage/>
          </Box>
      </Container>
    )

}

export default ChatList