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
          dispatch( { type: USER_SET_USERS, payload: { usersData: usersRes } } )
      }
      catch ( e ) {
          console.log( e )
          if ( e instanceof AxiosError ) {
              if ( e.response?.status === 401 ) {
                  dispatch( { type: AUTH_LOGOUT } )
              }
              dispatch( { type: USER_ERROR } )
          }
      }
      dispatch( { type: USER_LOADING } )
  }


