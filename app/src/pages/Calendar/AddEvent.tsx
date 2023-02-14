import { Collapse, IconButton, Paper, Stack, Typography, useTheme } from '@mui/material'
import AddEventForm from '../../components/Events/forms/AddEventForm'
import { useState } from 'react'
import { CheckCircle, ExpandMore } from '@mui/icons-material'



const AddEvent = () => {
    const [ expanded, setExpanded ] = useState( false )
    const [ success, setSuccess ] = useState( false )

    const handleClick = () => {
        setExpanded( e => !e )
        setSuccess( false )
    }

    const handleSuccess = () => {
        setExpanded( false )
        setSuccess( true )
    }

    const theme = useTheme()

    return (
      <Paper>
          <Stack justifyContent={'space-between'}>
              <Stack>
                  {success && <IconButton color={'success'}><CheckCircle/></IconButton>}
                  <Typography variant={'h4'}>Add Event</Typography>
              </Stack>
              <IconButton onClick={handleClick}
                          sx={{
                              transform: `rotate(${expanded ? 180 : 0}deg)`,
                              transition: `transform ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,

                          }}

              ><ExpandMore/></IconButton>
          </Stack>
          <Collapse in={expanded}>
              <AddEventForm onSuccess={handleSuccess} displaySuccess={false}/>
          </Collapse>
      </Paper>
    )
}
export default AddEvent