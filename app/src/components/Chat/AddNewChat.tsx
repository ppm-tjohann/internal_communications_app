import { useAppDispatch, useAppSelector } from '../../Store'
import { Autocomplete, Box, Collapse, IconButton, Stack, TextField } from '@mui/material'
import { Add } from '@mui/icons-material'
import { User } from '../../interfaces/user'
import { ChangeEvent, SyntheticEvent, useState } from 'react'
import { StoreChat } from '../../interfaces/chat'
import { addChat } from '../../actions/chat/ChatActions'



const AddNewChat = () => {

    const { usersData } = useAppSelector( state => state.users )
    const dispatch = useAppDispatch()
    const initialValues: StoreChat = { name: null, users: [] }

    const [ values, setValues ] = useState<StoreChat>( initialValues )

    const handleUsers = ( event: SyntheticEvent, newValue: User[] ) => {
        setValues( { ...values, users: newValue.map( user => user.id ) } )
    }

    const handleChange = ( label: keyof StoreChat ) => ( event: ChangeEvent<HTMLInputElement> ) => {
        setValues( { ...values, [label]: event.target.value } )
    }

    const handleSubmit = () => {
        if ( values.users.length > 0 ) {
            dispatch( addChat( values ) )
            setValues( initialValues )
        }

        // TODO add message when no user selected
    }

    return (
      <Box my={1}>
          <Stack alignItems={'center'} spacing={1} justifyContent={'space-between'}>
              <Autocomplete limitTags={3} sx={{ width: '100%' }}
                            multiple onChange={handleUsers} value={usersData.filter( user => values.users.includes( user.id ) )}
                            renderInput={( params => <TextField {...params} label={'participants'} fullWidth sx={{ flexShrink: 0 }}/> )}
                            options={usersData} getOptionLabel={( options: User ) => options.username}
              />
              <Collapse in={values.users.length > 1} unmountOnExit mountOnEnter>
                  <TextField value={values.name} label={'chatname'} onChange={handleChange( 'name' )}/>
              </Collapse>

              <Box>
                  <IconButton onClick={handleSubmit}>
                      <Add/>
                  </IconButton>
              </Box>
          </Stack>
      </Box>
    )

}
export default AddNewChat