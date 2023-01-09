import { Dispatch } from 'redux'
import { USER_ERROR, USER_LOADING, USER_SET_USERS, UserDispatchTypes } from './UserActionTypes'
import * as users from '../../lib/api/user'
import { AUTH_LOGOUT } from '../auth/AuthActionTypes'
import { AxiosError } from 'axios'



export const SetUsers = () =>
  async ( dispatch: Dispatch<UserDispatchTypes> ) => {
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


