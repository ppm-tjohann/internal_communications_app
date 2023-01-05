import { ApiResponse } from '../../interfaces/apiResponse'
import { User } from '../../interfaces/user'
import api from './index'



export const get = (): ApiResponse<User[]> => api.get( 'users' )