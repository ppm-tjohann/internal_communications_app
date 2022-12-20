import { User } from '../../interfaces/user'
import { AuthDispatchTypes } from '../auth/AuthActionTypes'



export const USER_LOADING = 'USER_LOADING'
export const USER_SET_USERS = 'USER_SET_USERS'
export const USER_ERROR = 'USER_ERROR'

export interface UserLoading {
    type: typeof USER_LOADING
}

export interface UserSetUsers {
    type: typeof USER_SET_USERS
    payload: { usersData: User[] }
}

export interface UserError {
    type: typeof USER_ERROR
}

export type UserDispatchTypes =
  | UserLoading
  | UserSetUsers
  | UserError
  | AuthDispatchTypes



