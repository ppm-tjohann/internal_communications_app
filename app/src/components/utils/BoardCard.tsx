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
            height: '100%',
            borderRadius: theme.spacing( 3 ),
        }}>
          <Stack justifyContent={'space-between'}>
              <Typography variant={'h5'}>{title}</Typography>
              {loading && <CircularProgress/>}
          </Stack>
          <Collapse in={!loading}>
              <Box>
                  {children}
              </Box>
          </Collapse>
      </Paper>
    )
}
export default BoardCard