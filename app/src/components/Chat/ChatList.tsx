import { useAppSelector } from '../../Store'
import Loader from '../utils/Loader'
import { useEffect, useRef } from 'react'
import { Box, Collapse, Container, Paper, Stack } from '@mui/material'
import ChatMessage from './ChatMessage'
import SendMessage from './SendMessage'
import { TransitionGroup } from 'react-transition-group'
import FlexBox from '../utils/FlexBox'



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

    const getContent = () => {
        if ( loading ) {
            return ( <FlexBox sx={{ height: '100%', width: '100%' }}>
                <Loader/>
            </FlexBox> )
        }
        if ( chat === null || chat === undefined || !chat.messages ) {
            return null
        }
        return ( <TransitionGroup>
            <Stack direction={'column-reverse'}>
                <Box ref={ref}/>
                {chat.messages.map( message => <Collapse key={message.id} sx={{ width: '100%' }} in={true}>
                    <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
                        <ChatMessage {...message}/>
                    </Box>
                </Collapse> )}
            </Stack>
        </TransitionGroup> )
    }

    return (

      <Container maxWidth={'md'} sx={{ maxHeight: '100%', height: '100%' }}>
          <Stack direction={'column'} height={'100%'}>
              <Paper sx={{ height: '100%', flexGrow: 3, flexShrink: 1, overflowY: 'scroll' }}>
                  {getContent()}
              </Paper>
              <Box sx={{ flexGrow: 0, flexShrink: 0 }}>
                  <Collapse in={!( loading || chat === null || chat === undefined )}>
                      <SendMessage/>
                  </Collapse>
              </Box>
          </Stack>
      </Container>
    )

}

export default ChatList