import api from './index'
import { ApiResponse, ApiResponsePaginated } from '../../interfaces/apiResponse'
import { Post } from '../../interfaces/post'



export const get = (): ApiResponsePaginated<Post[]> => api.get( '/posts?include=user' )
export const store = ( post: FormData ): ApiResponse<Post> => api.post( '/posts', post )
export const update = ( postId: number, post: FormData ): ApiResponse<Post> => api.put( `/posts/${postId}`, post )
export const destroy = ( postId: number ) => api.delete( `/posts/${postId}` )
export const find = ( postId: number ): ApiResponse<Post> => api.get( `/posts/${postId}` )



