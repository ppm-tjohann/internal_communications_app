import { Avatar, Paper, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, IconButton, Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch, useAppSelector } from '../../Store'
import React, { useEffect } from 'react'
import { SetUsers } from '../../actions/user/UserActions'
import MuiList from '@mui/material/List'
import BoardCard from '../utils/BoardCard'
import UserAvatar from './UserAvatar'
import BadgeHandler from '../Badges/BadgeHandler'
import { Mail, Phone } from '@mui/icons-material'



const List = () => {
    const { usersData } = useSelector( ( state: RootState ) => state.users )

    return (
      <MuiList sx={{ maxHeight: '100%', overflowY: 'scroll' }}>
          {usersData.map( user => (
            <ListItemButton key={user.id}>
                <ListItemIcon>
                    <UserAvatar user={user} size={'medium'} withBorder={true}/>
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
          ) )}
      </MuiList>
    )

}

const UsersList = () => {
    const dispatch = useAppDispatch()
    const { loading } = useAppSelector( state => state.users )

    useEffect( () => {
        dispatch( SetUsers() )
    }, [] )

    return (
      <BoardCard loading={loading} title={'Users'}>
          <List/>
      </BoardCard>
    )
}
export default UsersList