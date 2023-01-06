import useCalendar from '../../../hooks/useCalendar'
import { Box, Collapse, IconButton, Paper, Stack, TextField, Typography } from '@mui/material'
import CenteredModal from '../../utils/CenteredModal'
import Loader from '../../utils/Loader'
import { useState } from 'react'
import { Check, Delete, Edit } from '@mui/icons-material'

import EventDate from './EventDate'
import Participants from './Participants'
import UpdateEventForm from '../forms/UpdateEventForm'



interface ComponentProps {
    [x: string]: any
}

interface EditRowProps {
    variant: 'text' | 'richtext' | 'date'
    children: string
    onSave?: () => any
    label?: string
}

const EditRow = ( { children, onSave, label }: EditRowProps ) => {

    const [ edit, setEdit ] = useState( false )

    const editButtons = () => {
        return (
          <>
              <IconButton onClick={acceptEdit}><Check/></IconButton>
              <IconButton onClick={discardEdit}><Delete/></IconButton>
          </>
        )
    }

    const acceptEdit = () => {
        if ( onSave ) onSave()
        setEdit( false )
    }

    const discardEdit = () => {
        setEdit( false )
    }

    const handleEdit = () => {
        setEdit( true )
    }

    return (
      <>
          {label && <Typography variant={'overline'}>{label}</Typography>}
          <Stack justifyContent={'space-between'} alignItems={'center'}>
              <Box sx={{ flexShrink: 0 }}>
                  {edit ?
                    <TextField value={children} fullWidth/> :
                    <Typography variant={'body1'}>{children}</Typography>
                  }
              </Box>
              <Box sx={{ flexShrink: 1 }}>
                  {edit ?
                    editButtons()
                    :
                    <IconButton onClick={handleEdit}>
                        <Edit/>
                    </IconButton>
                  }
              </Box>
          </Stack>
      </>
    )
}

const EventPopup = () => {

    const [ edit, setEdit ] = useState( false )

    const { popup: open, popupEvent: event, popupEventLoading: loading, closePopup } = useCalendar()

    const handleEdit = () => {
        setEdit( e => !e )
    }
    const handleClose = () => {
        closePopup()
        handleEdit()
    }

    return (
      <CenteredModal open={open} onClose={handleClose} onBack={handleEdit} displayBack={edit} title={event?.name}>
          {loading || !event ?
            <Loader/> :
            <>
                <Collapse in={edit}>
                    <UpdateEventForm initialValues={event}/>
                </Collapse>
                <Collapse in={!edit}>
                    <Stack direction={'column'} spacing={3}>
                        <Box>
                            <Stack alignItems={'center'}>
                                <Box><IconButton onClick={handleEdit}><Edit/></IconButton></Box>
                                <Typography variant={'h5'}>{event.name}</Typography>
                            </Stack>
                        </Box>
                        {event.description && <Paper elevation={2}><Typography variant={'body1'}>{event.description}</Typography></Paper>}
                        <Box><EventDate {...event}/></Box>
                        <Box><Participants users={event.participants}/></Box>
                    </Stack>
                </Collapse>
            </>

          }
      </CenteredModal>
    )
}
export default EventPopup
