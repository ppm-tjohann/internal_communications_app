import {
    Avatar,
    Paper,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    IconButton,
    Box,
    TextField,
    InputBase,
    Collapse,
    Typography,
} from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch, useAppSelector } from '../../Store'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { SetUsers } from '../../actions/user/UserActions'
import MuiList from '@mui/material/List'
import BoardCard from '../utils/BoardCard'
import UserAvatar from './UserAvatar'
import BadgeHandler from '../Badges/BadgeHandler'
import { Clear, Mail, Phone, Search } from '@mui/icons-material'
import { User } from '../../interfaces/user'
import { TransitionGroup } from 'react-transition-group'



const List = ( { users, filter = false }: { filter?: boolean, users?: ( User | undefined )[] } ) => {
    const { usersData } = useSelector( ( state: RootState ) => state.users )

    const [ search, setSearch ] = useState( '' )

    const handleChange = ( event: ChangeEvent<HTMLInputElement> ) => {
        setSearch( event.target.value )
    }
    const handleReset = () => {
        setSearch( '' )
    }

    if ( !users ) {
        users = usersData
    }

    if ( search.length > 0 ) {
        users = users.filter( user => {
            if ( user === undefined ) {
                return false
            }
            if (
              user.firstname.includes( search ) ||
              user.username.includes( search ) ||
              user.lastname.includes( search ) ||
              user.email.includes( search )
            )
                return true
        } )
    }

    return (
      <Stack direction={'column'} height={'100%'} maxHeight={'100%'}>
          <Paper elevation={2} sx={{ py: 1, mt: 2, flexShrink: 0 }}>
              <Stack alignItems={'center'} justifyContent={'space-between'}>
                  <Search/>
                  <InputBase value={search} onChange={handleChange} sx={{ width: '100%', flexGrow: 1, flexShrink: 1 }}/>
                  <Collapse in={search.length > 0} unmountOnExit={false} mountOnEnter={false}>
                      <IconButton size={'small'} onClick={handleReset}>
                          <Clear/>
                      </IconButton>
                  </Collapse>
              </Stack>
          </Paper>

          <Collapse in={search.length > 0 && users.length === 0} unmountOnExit mountOnEnter>
              <Paper sx={{ backgroundColor: 'info.main', mt: 4 }} elevation={2}>
                  <Typography textAlign={'center'} variant={'body1'}>No Results</Typography>
              </Paper>
          </Collapse>

          <MuiList sx={{ flexShrink: 1, flexGrow: 1, height: '100%' }}>
              <TransitionGroup sx={{ maxHeight: '100%', overflowY: 'scroll' }}>
                  {users.map( user => {
                      if ( user === undefined ) {
                          return null
                      }
                      return ( <Collapse key={user.id}>
                          <ListItemButton>
                              <ListItemIcon>
                                  <UserAvatar userId={user.id} size={'medium'} withBorder={true}/>
                              </ListItemIcon>

                              <ListItemText primary={user.username} secondary={user.email}/>
                              {user.badges && <BadgeHandler badges={user.badges}/>}
                              <Box>
                                  <Stack spacing={1}>
                                      <IconButton><Phone/></IconButton>
                                      <IconButton><Mail/></IconButton>
                                  </Stack>
                              </Box>
                          </ListItemButton>
                      </Collapse> )
                  } )}
              </TransitionGroup>
          </MuiList>
      </Stack>
    )

}

const UsersList = ( { users, title = 'Users' }: { title?: string, users?: ( User | undefined )[] } ) => {
    const dispatch = useAppDispatch()
    const { loading } = useAppSelector( state => state.users )

    useEffect( () => {
        dispatch( SetUsers() )
    }, [] )

    return (
      <BoardCard loading={loading} title={title}>
          <List users={users}/>
      </BoardCard>
    )
}
export default UsersList