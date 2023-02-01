import { useAppDispatch, useAppSelector } from '../../Store'
import Loader from '../utils/Loader'
import { useEffect, useRef } from 'react'
import { getChat } from '../../actions/chat/ChatActions'
import { Box, Collapse, Container, Paper, Slide, Stack } from '@mui/material'
import ChatMessage from './ChatMessage'
import SendMessage from './SendMessage'
import { TransitionGroup } from 'react-transition-group'



const ChatList = ( { userId = 51 }: ChatListProps ) => {
    const dispatch = useAppDispatch()
    const { chat: chatSelector, auth } = useAppSelector( state => state )
    const { chat, recipientId, loading, sendLoading } = chatSelector
    const ref = useRef()

    useEffect( () => {
        setTimeout( handleScroll, 250 )
    }, [ ref, ref.current, chat ] )

    const handleScroll = () => {
        console.log( 'Scrolling' )
        //@ts-ignore
        ref.current?.scrollIntoView( { behavior: 'smooth' } )
    }

    useEffect( () => {
        if ( chat.length === 0 ) {
            dispatch( getChat( userId ) )
        }
    }, [ recipientId ] )

    if ( loading ) {
        return <Loader/>
    }

    return (

      <Container maxWidth={'md'}>
          <h1>Chat</h1>

          <Paper sx={{ height: '80vh', overflowY: 'scroll' }}>
              <TransitionGroup>
                  <Stack direction={'column'}>
                      {chat.map( message => <Collapse key={message.id} sx={{ width: '100%' }} in={true}>
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

interface ChatListProps {
    userId?: number
}

export default ChatList