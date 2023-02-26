import { ReactNode } from 'react'
import {
    Grid,
    Container,
    Box,
    useMediaQuery,
    useTheme,
    AppBar,
    Toolbar,
    Stack,
    Paper,
    IconButton,
    Collapse,
    BottomNavigation,
    BottomNavigationAction,
} from '@mui/material'
import Sidebar from './components/Sidebar'
import { ArrowBack, CalendarMonth, Chat, Dashboard, Newspaper, Share } from '@mui/icons-material'
import { useHistory, useLocation } from 'react-router'
import UserAvatar from '../Users/UserAvatar'
import { useAppSelector } from '../../Store'
import News from '../../pages/News'



interface LayoutProps {
    children: ReactNode
}

const Layout = ( { children }: LayoutProps ) => {
    const theme = useTheme()
    const mdBreakpoint = useMediaQuery( theme.breakpoints.up( 'md' ) )
    const history = useHistory()
    const { pathname: currentLocation } = useLocation()

    const handleAppClickBack = () => {
        history.goBack()
    }
    const { user } = useAppSelector( state => state.auth )

    return (
      <>

          <Box sx={{ display: 'flex' }}>
              {mdBreakpoint && <Sidebar/>}

              <Stack height={'100%'} direction={'column'} sx={{
                  flexGrow: 1, height: { md: '100vh' },
              }}>

                  {currentLocation !== '/' &&
                  < AppBar position={!mdBreakpoint ? 'fixed' : 'static'} sx={{ p: 0, '.MuiPaper-root': { padding: '0 !important' } }}>
                    <Toolbar>
                      <Stack justifyContent={'space-between'} width={'100%'}>
                        <Box>
                          <IconButton onClick={handleAppClickBack}>
                            <ArrowBack/>
                          </IconButton>
                        </Box>
                          {user && <UserAvatar user={user}/>}
                      </Stack>
                    </Toolbar>
                  </AppBar>}

                  <Box flexGrow={1} flexShrink={1} maxHeight={'100%'} height={'100%'} sx={{
                      p: 2, overflowY: 'scroll',
                      py: { xs: 9, md: 2 },
                  }}>
                      {children}
                  </Box>

              </Stack>
          </Box>
          {
              !mdBreakpoint && <AppBar position={'fixed'} sx={{ top: 'auto', bottom: 0, '&.MuiPaper-root': { p: 0 } }}>
                <Paper sx={{ p: 0 }}>
                  <BottomNavigation>
                    <BottomNavigationAction label={'Dashboard'} icon={<Dashboard/>}/>
                    <BottomNavigationAction label={'Calendar'} icon={<CalendarMonth/>}/>
                    <BottomNavigationAction label={'Social'} icon={<Share/>}/>
                    <BottomNavigationAction label={'Chat'} icon={<Chat/>}/>
                    <BottomNavigationAction label={'News'} icon={<Newspaper/>}/>

                  </BottomNavigation>
                </Paper>
              </AppBar>
          }
      </>
    )
}
export default Layout