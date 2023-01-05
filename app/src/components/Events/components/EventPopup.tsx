import useCalendar from '../../../hooks/useCalendar'
import { Box, Container, IconButton, Modal, Paper, Stack, TextField, Typography } from '@mui/material'
import CenteredModal from '../../utils/CenteredModal'
import Loader from '../../utils/Loader'
import { MouseEventHandler, ReactComponentElement, ReactElement, ReactNode, useState } from 'react'
import { Check, Delete, Edit } from '@mui/icons-material'
import { any } from 'zod'



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

    const [ edited, setEdited ] = useState( false )

    const { popup: open, popupEvent: event, popupEventLoading: loading, closePopup } = useCalendar()

    return (
      <CenteredModal open={open} onClose={closePopup}>

          {loading || !event ?
            <Loader/> :
            <Stack direction={'column'} spacing={3}>
                <EditRow label={'name'} variant={'text'}>
                    {event.name}
                </EditRow>
            </Stack>
          }
      </CenteredModal>
    )
}
export default EventPopup
