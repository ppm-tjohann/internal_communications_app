import { Divider, Box, Stack, Typography } from '@mui/material'
import { useAppSelector } from '../../Store'
import UserAvatar from '../Users/UserAvatar'



const ChatUserList = () => {
    const { usersData } = useAppSelector( state => state.users )
    return (
      <Box>
          <Typography variant={'h2'}>Users</Typography>
          <Box sx={{ height: '100vh', overflowY: 'scroll' }}>
              <Stack direction={'column'} divider={<Divider flexItem/>}>
                  {usersData.map( user => (
                    <Box sx={{ cursor: 'pointer' }}>
                        <Stack><UserAvatar user={user}/>
                            <Box>
                                <Stack justifyContent={'space-between'} alignItems={'center'}><Typography mb={0} variant={'body1'}>{user.username}</Typography>
                                    <Typography variant={'caption'} sx={{ opacity: .7 }}>5 Minutes ago</Typography>
                                </Stack>
                                <Typography variant={'body2'} sx={{ opacity: .7 }}>Lorem ipsum sit dolirs, letze Nachricht</Typography>
                            </Box>
                        </Stack>
                    </Box>
                  ) )}
              </Stack>
          </Box>
      </Box>
    )
}
export default ChatUserList