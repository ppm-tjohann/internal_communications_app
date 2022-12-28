import { Avatar, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../Store'
import Loader from '../utils/Loader'
import { useEffect } from 'react'
import { SetUsers } from '../../actions/user/UserActions'
import MuiList from '@mui/material/List'



const List = () => {
    const { usersData } = useSelector( ( state: RootState ) => state.users )

    return (
      <MuiList sx={{ maxHeight: 400, overflowY: 'scroll' }}>
          {usersData.map( user => (
            <ListItem key={user.id}>
                <ListItemIcon>
                    {user.avatar && <Avatar src={user.avatar}/>}
                </ListItemIcon>
                <ListItemButton>
                    <ListItemText primary={user.username} secondary={user.email}/>
                </ListItemButton>
            </ListItem>
          ) )}
      </MuiList>
    )

}

const UsersList = () => {
    const dispatch = useAppDispatch()
    const { loading } = useSelector( ( state: RootState ) => state.users )

    useEffect( () => {
        dispatch( SetUsers() )
    }, [] )

    return (
      <Paper>
          <Typography variant={'h2'}>Users</Typography>
          {loading ? <Loader/> : <List/>}
      </Paper>
    )
}
export default UsersList