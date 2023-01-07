import { ReactNode } from 'react'
import { Grid, Container, Box } from '@mui/material'
import Sidebar from './components/Sidebar'



interface LayoutProps {
    children: ReactNode
}

const Layout = ( { children }: LayoutProps ) => {
    return (
      <Box sx={{ display: 'flex' }}>
          <Sidebar/>
          <Box sx={{ flexGrow: 1, p: 3 }}>
              {children}
          </Box>
      </Box>
    )
}
export default Layout