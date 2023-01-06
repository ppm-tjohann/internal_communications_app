import { AUTH_LOADING, AUTH_LOGIN, AUTH_LOGIN_ERROR, AUTH_LOGOUT, AUTH_REMEMBER, AUTH_SET_USER, AuthDispatchTypes } from '../actions/auth/AuthActionTypes'
import { User } from '../interfaces/user'



interface DefaultState {
    loggedIn: boolean
    loading: boolean
    loginError: boolean
    rememberMe: boolean
    apiToken: string
    user?: User | null
}

const defaultState: DefaultState = {
    loggedIn: localStorage.getItem( 'API_KEY' ) !== null,
    loading: false,
    loginError: false,
    rememberMe: false,
    apiToken: localStorage.getItem( 'API_KEY' ) ?? '',
}

const AuthReducer = ( state: DefaultState = defaultState, action: AuthDispatchTypes ) => {
    switch ( action.type ) {
        case AUTH_LOGIN:
            return {
                ...state,
                loading: false, loginError: false, loggedIn: true,
                apiToken: action.payload.apiToken,
                user: action.payload.user,
            }
        case AUTH_SET_USER:
            return { ...state, user: action.payload.user }
        case AUTH_LOGOUT:
            return defaultState
        case AUTH_LOGIN_ERROR:
            return {
                ...state,
                loading: false,
                loginError: true,
            }
        case AUTH_REMEMBER:
            return {
                ...state,
                rememberMe: action.payload.remember,
            }
        case AUTH_LOADING:
            return {
                ...state,
                loading: true,
            }
        default:
            return state
    }
}
export default AuthReducer