import { Box, IconButton, Paper, Stack } from '@mui/material'
import { Logout } from '@mui/icons-material'
import { useAppDispatch } from '../../../Store'
import { AuthLogout } from '../../../actions/auth/AuthActions'
import { Redirect } from 'react-router'



const Sidebar = () => {
    const dispatch = useAppDispatch()

    const handleLogout = () => {
        dispatch( AuthLogout() )
        return <Redirect to={'/login'}/>
    }

    return (
      <Paper sx={{ height: '100vh' }}>
          <Stack>

          </Stack>
          <Stack alignItems={'center'} justifyContent={'center'}>
              <Box>
                  <IconButton onClick={handleLogout}><Logout/></IconButton>
              </Box>
          </Stack>
      </Paper>
    )
}
export default Sidebar