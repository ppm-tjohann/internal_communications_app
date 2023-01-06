import { ReactNode } from 'react'
import { Box, Container, IconButton, Modal, Paper, Stack, Typography } from '@mui/material'
import { ArrowBack, Close } from '@mui/icons-material'



interface CenteredModalProps {
    children: ReactNode
    open: boolean
    onClose: () => any
    onBack?: () => any
    displayBack?: boolean
    title?: string

    [x: string]: any
}

const CenteredModal = ( { open, children, onClose, title, onBack, displayBack, ...props }: CenteredModalProps ) => {
    return (
      <Modal open={open} {...props}>
          <Container sx={{
              position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)',
          }}>
              <Paper>
                  <Container>
                      <Stack justifyContent={'space-between'} mb={3}>
                          {displayBack && onBack && <Box><IconButton onClick={onBack}><ArrowBack/></IconButton></Box>}
                          <Box><Typography variant={'h3'}>{title}</Typography></Box>
                          <Box><IconButton onClick={onClose}><Close/></IconButton></Box>
                      </Stack>
                      {children}
                  </Container>
              </Paper>
          </Container>
      </Modal>
    )
}
export default CenteredModal
