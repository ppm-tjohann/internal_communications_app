import api from './index'
import { ApiResponse } from '../../interfaces/apiResponse'
import { Post } from '../../interfaces/post'



export const get = (): ApiResponse<Post[]> => api.get( '/posts' )
export const store = ( post: FormData ): ApiResponse<Post> => api.post( '/posts', post )