import { ReactNode } from 'react'
import { Grid, Container, Box, useMediaQuery, useTheme, AppBar, Toolbar } from '@mui/material'
import Sidebar from './components/Sidebar'



interface LayoutProps {
    children: ReactNode
}

const Layout = ( { children }: LayoutProps ) => {
    const theme = useTheme()
    const mdBreakpoint = useMediaQuery( theme.breakpoints.up( 'md' ) )

    return (
      <>

          <Box sx={{ display: 'flex' }}>
              {mdBreakpoint && <Sidebar/>}
              <Box sx={{
                  flexGrow: 1, py: 3, px: 2, height: { md: '100vh' },
                  //overflow: { md: 'hidden' },
                  pb: { xs: 9, md: 2 },
              }}>
                  {children}
              </Box>
          </Box>
          {!mdBreakpoint && <AppBar position={'fixed'} sx={{ top: 'auto', bottom: 0, '&.MuiPaper-root': { p: 0 } }}>
            <Toolbar>
              Hallo
            </Toolbar>
          </AppBar>}
      </>
    )
}
export default Layout