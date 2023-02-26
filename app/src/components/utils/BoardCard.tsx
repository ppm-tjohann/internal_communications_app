import { ReactNode } from 'react'
import { Box, CircularProgress, Collapse, Paper, Stack, Typography, useTheme, Zoom } from '@mui/material'
import Loader from './Loader'



interface BoardCardProps {
    children: ReactNode
    title?: string
    loading?: boolean
}

const BoardCard = ( { children, title, loading = false }: BoardCardProps ) => {

    const theme = useTheme()

    return (
      <Paper
        sx={{
            height: '100%', maxHeight: '100%', width: '100%', flexGrow: 1, flexShrink: 1, overflow: 'hidden',
            borderRadius: theme.spacing( 3 ),
        }}>
          <Stack direction={'column'} height={'100%'} maxHeight={'100%'}>
              <Stack justifyContent={'space-between'} sx={{ flexShrink: 0, flexGrow: 0 }}>
                  <Typography variant={'h5'}>{title}</Typography>
                  {loading && <CircularProgress/>}
              </Stack>
              <Collapse in={!loading} sx={{ flexGrow: 1, flexShrink: 1, overflowY: 'scroll' }}>
                  <Box>
                      {children}
                  </Box>
              </Collapse>
          </Stack>
      </Paper>
    )
}
export default BoardCard