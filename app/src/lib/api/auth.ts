import api from './index'
import { credentials } from '../../actions/auth/AuthActions'
import { User } from '../../interfaces/user'
import { AxiosResponse } from 'axios'
import { ApiResponse } from '../../interfaces/apiResponse'



type loginResponse = {
    user: User
    token: {
        plainTextToken: string
    }
}

export const login = ( credentials: credentials ): ApiResponse<loginResponse> => api.post( 'auth/login', credentials )
export const logout = () => api.get( 'auth/logout' )
export const getUser = (): ApiResponse<User> => api.get( 'auth/user' )