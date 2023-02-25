import { User } from '../interfaces/user'
import { USER_ADD_BADGE, USER_ERROR, USER_LOADING, USER_SET_USERS, UserDispatchTypes } from '../actions/user/UserActionTypes'
import { filter } from 'pusher-js/types/src/core/utils/collections'



interface DefaultState {
    loading: boolean
    error: boolean
    usersData: User[]
}

const defaultState: DefaultState = {
    loading: false,
    error: false,
    usersData: [],
}

const UserReducer = ( state: DefaultState = defaultState, action: UserDispatchTypes ) => {
    switch ( action.type ) {
        case USER_LOADING:
            return {
                ...state,
                loading: true,
            }
        case USER_SET_USERS:
            return {
                ...state,
                loading: false,
                usersData: action.payload.usersData,
            }
        case USER_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
            }
        case USER_ADD_BADGE:
            return {
                ...state,
                usersData: state.usersData.map( user => user.id !== action.payload.userId ? user : {
                    ...user,
                    badges: user.badges ?
                      [ ...user.badges.map( badge => ( badge.id !== action.payload.badge.id ? badge : action.payload.badge ) ) ] :
                      [ action.payload.badge ],
                } ),
            }
        default:
            return state
    }
}
export default UserReducer