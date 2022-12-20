import { User } from '../../interfaces/user'
import { Dispatch } from 'redux'
import { USER_ERROR, USER_LOADING, USER_SET_USERS, UserDispatchTypes } from './UserActionTypes'
import api from '../../lib/api'
import { RootState } from '../../Store'
import { AUTH_LOGOUT } from '../auth/AuthActionTypes'
import { AxiosError } from 'axios'



export const SetUsers = () =>
  async ( dispatch: Dispatch<UserDispatchTypes>, getState: () => RootState ) => {
      dispatch( { type: USER_LOADING } )
      try {
          const { apiToken } = getState().auth
          console.log( 'API Token', getState().auth, apiToken )
          const { data: users } = await api.get( 'users', {
              headers: { 'Authorization': `Bearer ${apiToken}` },
          } )
          console.log( users )
          dispatch( { type: USER_SET_USERS, payload: { usersData: users } } )
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
  }


