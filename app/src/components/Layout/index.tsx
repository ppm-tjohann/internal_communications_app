import { ReactNode } from 'react'
import { Grid, Container, Box } from '@mui/material'
import Sidebar from './components/Sidebar'



interface LayoutProps {
    children: ReactNode
}

const Layout = ( { children }: LayoutProps ) => {
    return (
      <Grid container>
          <Grid item xs={0} md={3} lg={2}>
              <Sidebar/>
          </Grid>
          <Grid item xs={12} md>
              <Container sx={{ my: 3, maxHeight: '100vh', overflow: 'scroll' }}>
                  {children}
              </Container>
          </Grid>
      </Grid>
    )
}
export default Layout