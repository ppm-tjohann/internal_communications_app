import { Box, Button, Checkbox, CircularProgress, Container, FormControlLabel, IconButton, Paper, Stack, TextField, Typography } from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootStore, useAppDispatch } from '../../../../Store'
import FlexBox from '../../../utils/FlexBox'
import { AuthLogin, AuthLogout, AuthRememberToggle } from '../../../../actions/auth/AuthActions'
import { credentials } from '../../../../actions/auth/AuthActions'
import { log } from 'util'
import { Check, Logout } from '@mui/icons-material'
import { SetUsers } from '../../../../actions/user/UserActions'
import { Redirect } from 'react-router'



const LoginForm = () => {

    const [ credentials, setCredentials ] = useState<credentials>( { email: '', password: '' } )
    const dispatch = useAppDispatch()
    const { loading, loginError, loggedIn } = useSelector( ( state: RootStore ) => state.auth )

    const handleChange = ( label: keyof credentials ) => ( event: ChangeEvent<HTMLInputElement> ) => {
        setCredentials( {
            ...credentials,
            [label]: event.target.value,
        } )
    }
    const handleRemember = () => {
        dispatch( AuthRememberToggle() )
    }

    const handleSubmit = () => {
        try {
            dispatch( AuthLogin( credentials ) )
            setCredentials( {
                ...credentials,
                password: '',
            } )
        }
        catch ( e ) {

        }
    }

    if ( loading ) {
        return <FlexBox sx={{ width: '100%', height: '100%' }}>
            <CircularProgress/>
        </FlexBox>
    }

    if ( loggedIn ) {
        return <Redirect to={'/'}/>
    }

    return (
      <Box sx={{ width: '100%' }}>
          <Container>

              <Stack spacing={3} direction={'column'} component={'form'}>
                  <Typography sx={{ mb: 3 }} variant={'h1'}>Login</Typography>
                  {
                      loginError && <Paper>
                        <Typography variant={'body2'} color={'error'}>Login failed, please try again</Typography>
                      </Paper>
                  }
                  <TextField error={loginError} fullWidth value={credentials.email} onChange={handleChange( 'email' )} label={'Email'} type={'email'} required/>
                  <TextField error={loginError} fullWidth value={credentials.password} onChange={handleChange( 'password' )} label={'Password'}
                             type={'password'} required/>
                  <FormControlLabel control={<Checkbox/>} label={'Remember me'} onClick={handleRemember}/>
                  <Stack>
                      <Button>Ask for Registration</Button>
                      <Button sx={{ flexGrow: 1 }} variant={'contained'} onClick={handleSubmit}>Login</Button>
                  </Stack>
              </Stack>
          </Container>

      </Box>
    )
}
export default LoginForm