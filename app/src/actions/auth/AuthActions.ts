import { Dispatch } from 'redux'
import * as auth from '../../lib/api/auth'
import { AUTH_LOADING, AUTH_LOGIN, AUTH_LOGIN_ERROR, AUTH_LOGOUT, AuthDispatchTypes } from './AuthActionTypes'
import { RootState } from '../../Store'



export interface credentials {
    email: string
    password: string
}

export const AuthLogin = ( credentials: credentials ) => async ( dispatch: Dispatch<AuthDispatchTypes> ) => {
    try {
        dispatch( { type: AUTH_LOADING } )
        const { data } = await auth.login( credentials )
        localStorage.setItem( 'API_KEY', data.token.plainTextToken )
        dispatch( { type: AUTH_LOGIN, payload: { apiToken: data.token.plainTextToken } } )
    }
    catch ( e: any ) {
        dispatch( { type: AUTH_LOGIN_ERROR } )
    }
}

export const AuthLogout = () => async ( dispatch: Dispatch<AuthDispatchTypes> ) => {
    dispatch( { type: AUTH_LOADING } )
    localStorage.removeItem( 'API_KEY' )
    await auth.logout()
    dispatch( { type: AUTH_LOGOUT } )
}

export const AuthRememberToggle = () => ( dispatch: Dispatch<AuthDispatchTypes> ) => {

}



