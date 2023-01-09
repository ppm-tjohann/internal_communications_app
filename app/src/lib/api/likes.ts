import api from './index'
import { ApiResponse } from '../../interfaces/apiResponse'
import { Like } from '../../interfaces/likes'



export const find = ( postId: number ): ApiResponse<Like[]> => api.get( `/likes/${postId}` )
export const post = ( postId: number ) => api.get( `likes/post/${postId}` )
export const comment = ( commentId: number ) => api.get( `likes/comment/${commentId}` )