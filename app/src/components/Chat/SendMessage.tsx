import { KeyboardEvent, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../Store'
import { Box, CircularProgress, IconButton, InputBase, Paper, Stack } from '@mui/material'
import { Send } from '@mui/icons-material'
import { ChangeEvent, KeyboardEventHandler, useState } from 'react'
import { sendMessage } from '../../actions/chat/ChatActions'
import ToggleButton from '../utils/ToggleButton'



const SendMessage = () => {

    const dispatch = useAppDispatch()

    const { sendLoading, recipientId } = useAppSelector( state => state.chat )
    const { user } = useAppSelector( state => state.auth )
    const [ value, setValue ] = useState( '' )

    const handleChange = ( event: ChangeEvent<HTMLInputElement> ) => {
        setValue( event.target.value )
    }

    const handleSubmit = () => {
        if ( value.length > 0 ) {
            dispatch( sendMessage( recipientId, value ) )
            setValue( '' )
        }
    }
    const handleKeyDown = ( event: KeyboardEvent<HTMLInputElement> ) => {
        if ( event.key === 'Enter' )
            handleSubmit()
    }

    return (
      <Paper sx={{ mt: 3 }}>
          <Stack justifyContent={'space-between'}>
              <InputBase
                sx={{ width: '100%' }}
                onKeyDown={handleKeyDown}
                value={value} onChange={handleChange}
                placeholder={'message…'}
              />
              <ToggleButton handleClick={handleSubmit} toggle={sendLoading}>
                  <CircularProgress size={24}/>
                  <Send/>
              </ToggleButton>
          </Stack>
      </Paper>
    )
}
export default SendMessage