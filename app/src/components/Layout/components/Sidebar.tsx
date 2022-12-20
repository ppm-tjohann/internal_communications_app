import { Box, IconButton, Paper, Stack } from '@mui/material'
import { Logout } from '@mui/icons-material'
import { useAppDispatch } from '../../../Store'
import { AuthLogout } from '../../../actions/auth/AuthActions'



const Sidebar = () => {
    const dispatch = useAppDispatch()

    const handleLogout = () => {
        dispatch( AuthLogout() )
    }

    return (
      <Paper sx={{ height: '100vh' }}>
          <Stack>
              <Box>Hallo</Box>
              <Box>Hallo</Box>
              <Box>Hallo</Box>
              <Box>Hallo</Box>
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