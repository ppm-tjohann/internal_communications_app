import { ReactNode } from 'react'
import { Box, Container, IconButton, Modal, Paper, Stack, Typography } from '@mui/material'
import { Close } from '@mui/icons-material'



interface CenteredModalProps {
    children: ReactNode
    open: boolean
    onClose: () => any,
    title?: string

    [x: string]: any
}

const CenteredModal = ( { open, children, onClose, title, ...props }: CenteredModalProps ) => {
    return (
      <Modal open={open} {...props}>
          <Container sx={{
              position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)',
          }}>
              <Paper>
                  <Container>
                      <Stack justifyContent={'space-between'}>
                          <Box><Typography variant={'h3'}>{title}</Typography></Box>
                          <IconButton onClick={onClose}><Close/></IconButton>
                      </Stack>
                      {children}
                  </Container>
              </Paper>
          </Container>
      </Modal>
    )
}
export default CenteredModal
