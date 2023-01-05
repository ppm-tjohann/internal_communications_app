import { User } from '../interfaces/user'
import { USER_ERROR, USER_LOADING, USER_SET_USERS, UserDispatchTypes } from '../actions/user/UserActionTypes'



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
        default:
            return state
    }
}
export default UserReducer