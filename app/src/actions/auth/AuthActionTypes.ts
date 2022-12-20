export const AUTH_LOGIN = 'AUTH_LOGIN'
export const AUTH_LOGOUT = 'AUTH_LOGOUT'
export const AUTH_LOADING = 'AUTH_LOADING'
export const AUTH_REMEMBER = 'AUTH_REMEMBER'
export const AUTH_LOGIN_ERROR = 'AUTH_LOGIN_ERROR'

export interface AuthLoading {
    type: typeof AUTH_LOADING,
}

export interface AuthLogout {
    type: typeof AUTH_LOGOUT,
}

export interface AuthLogin {
    type: typeof AUTH_LOGIN,
    payload: { apiToken: string },
}

export interface AuthRemember {
    type: typeof AUTH_REMEMBER
    payload: { remember: boolean }
}

export interface AuthLoginError {
    type: typeof AUTH_LOGIN_ERROR,
}

export type AuthDispatchTypes = AuthLogin | AuthLoading | AuthLogout | AuthLoginError | AuthRemember
