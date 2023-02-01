import { useAppDispatch, useAppSelector } from '../../Store'
import Loader from '../utils/Loader'
import { useEffect, useMemo, useRef } from 'react'
import { setActiveChat } from '../../actions/chat/ChatActions'
import { Box, Collapse, Container, Paper, Slide, Stack } from '@mui/material'
import ChatMessage from './ChatMessage'
import SendMessage from './SendMessage'
import { TransitionGroup } from 'react-transition-group'
import { useParams } from 'react-router'



const ChatList = () => {
    const dispatch = useAppDispatch()
    const { chat: chatSelector, auth } = useAppSelector( state => state )
    const { activeChat: chat, loadingGetActiveChat: loading, sendLoading } = chatSelector
    const ref = useRef()
    const { userId } = useParams<{ userId?: string | undefined }>()

    useEffect( () => {
        // setTimeout( handleScroll, 250 )
    }, [ ref, ref.current, chat ] )

    const handleScroll = () => {
        console.log( 'Scrolling' )
        //@ts-ignore
        ref.current?.scrollIntoView( { behavior: 'smooth' } )
    }

    useMemo( () => {
        if ( !chat && userId !== undefined ) {
            dispatch( setActiveChat( parseInt( userId ) ) )
        }
    }, [ userId ] )

    if ( loading || !chat ) {
        return <Loader/>
    }

    return (

      <Container maxWidth={'md'}>
          <h1>Chat</h1>

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