import { ReactNode, useState, createContext } from 'react'
import { Box, Container, IconButton, Modal, Paper, Stack, Typography } from '@mui/material'
import AddEventForm from '../../Forms/AddEventForm'
import { Close } from '@mui/icons-material'
import { DEFAULT_FORMAT } from '../../../reducers/CalendarReducer'
import moment from 'moment'
import { DATE_TIME_FORMAT } from '../../../interfaces/event'



interface AddEventsPopupProps {
    children: ReactNode
}

interface AddEventPopupContextProps {
    toggleEventPopup: () => void
    setInitialDate: ( date: string ) => void
    open: boolean

}

export const AddEventPopupContext = createContext( {} as AddEventPopupContextProps )

const AddEventsPopup = ( { children }: AddEventsPopupProps ) => {
    const [ open, setOpen ] = useState( false )
    const [ initDate, setInitDate ] = useState( moment().format( DEFAULT_FORMAT ) )

    const toggleEventPopup = () => {
        setOpen( o => !o )
    }
    const handleClose = () => {
        setOpen( false )
    }
    const setInitialDate = ( date: string ) => {
        const newDate = moment( date )
        newDate.hour( 13 )
        newDate.minute( 0 )
        setInitDate( newDate.format( DATE_TIME_FORMAT ) )
    }

    return (
      <AddEventPopupContext.Provider value={{
          toggleEventPopup, setInitialDate, open,
      }}>1
          <Modal open={open} onClose={handleClose}>
              <Container sx={{
                  position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)',
              }}>
                  <Paper>
                      <Container>
                          <Stack justifyContent={'space-between'}>
                              <Typography variant={'h3'}>Add Event</Typography>
                              <Box>
                                  <IconButton onClick={handleClose}><Close/></IconButton>
                              </Box>
                          </Stack>
                      </Container>
                      <AddEventForm initialDate={initDate}/>
                  </Paper>
              </Container>
          </Modal>
          {children}
      </AddEventPopupContext.Provider>
    )

}
export default AddEventsPopup