import { Box, Paper, Stack, Typography } from '@mui/material'
import UserAvatar from '../Users/UserAvatar'
import { User } from '../../interfaces/user'
import { useAppSelector } from '../../Store'
import moment from 'moment'
import { Message } from '../../interfaces/chat'



const ChatMessage = ( { text, user: sender, created_at }: Message ) => {

    const { user } = useAppSelector( state => state.auth )

    const userIsSender = user?.id === sender?.id

    return (
      <Paper sx={{ width: '90%', alignSelf: userIsSender ? 'flex-end' : 'flex-start' }}
             elevation={2}>

          <Stack alignItems={'center'} direction={userIsSender ? 'row-reverse' : 'row'}>
              {sender && <UserAvatar user={sender}/>}
              <Box>
                  <Typography textAlign={userIsSender ? 'right' : 'left'} variant={'body2'} sx={{ opacity: .7, mb: 1 }}>{moment( created_at ).
                    fromNow()}</Typography>
                  <Typography textAlign={userIsSender ? 'right' : 'left'} variant={'body1'}>{text}</Typography>
              </Box>
          </Stack>
      </Paper>
    )

}
export default ChatMessage