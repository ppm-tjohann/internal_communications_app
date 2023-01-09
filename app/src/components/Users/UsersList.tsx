import { Avatar, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch, useAppSelector } from '../../Store'
import { useEffect } from 'react'
import { SetUsers } from '../../actions/user/UserActions'
import MuiList from '@mui/material/List'
import BoardCard from '../utils/BoardCard'
import UserAvatar from './UserAvatar'



const List = () => {
    const { usersData } = useSelector( ( state: RootState ) => state.users )

    return (
      <MuiList sx={{ maxHeight: 400, overflowY: 'scroll' }}>
          {usersData.map( user => (
            <ListItem key={user.id}>
                <ListItemIcon>
                    <UserAvatar user={user} size={'large'}/>
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