import { Badge, User } from '../../interfaces/user'
import { AuthDispatchTypes } from '../auth/AuthActionTypes'



export const USER_LOADING = 'USER_LOADING'
export const USER_SET_USERS = 'USER_SET_USERS'
export const USER_ERROR = 'USER_ERROR'
export const USER_ADD_BADGE = 'USER_ADD_BADGE'

export interface UserAddBadge {
    type: typeof USER_ADD_BADGE
    payload: { badge: Badge, userId: number }
}

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
  | UserAddBadge
  | AuthDispatchTypes



