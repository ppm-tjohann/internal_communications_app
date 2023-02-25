import { Dispatch } from 'redux'
import { USER_ADD_BADGE, USER_LOADING, USER_SET_USERS, UserDispatchTypes } from './UserActionTypes'
import * as users from '../../lib/api/user'
import { RootState } from '../../Store'
import { Badge } from '../../interfaces/user'



export const SetUsers = () =>
  async ( dispatch: Dispatch<UserDispatchTypes>, getState: () => RootState ) => {
      if ( getState().users.usersData.length > 0 )
          return
      dispatch( { type: USER_LOADING } )
      try {
          const { data: usersRes } = await users.get()
          console.log( 'Setting UserS :', usersRes )
          dispatch( { type: USER_SET_USERS, payload: { usersData: usersRes } } )
      }
      catch ( e ) {
          console.log( 'Setting Users Error :', e )
          dispatch( { type: USER_LOADING } )
      }

  }

export const UserAddBadge = ( badge: Badge ) => ( dispatch: Dispatch<UserDispatchTypes>, getState: () => RootState ) => {
    const { user } = getState().auth
    if ( !user )
        return
    dispatch( { type: USER_ADD_BADGE, payload: { userId: user.id, badge } } )
}
  


