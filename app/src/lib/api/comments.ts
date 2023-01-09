import api from './index'
import { Comment } from '../../interfaces/post'
import { BaseComment } from '../../interfaces/post'
import { ApiResponse } from '../../interfaces/apiResponse'



export const store = ( comment: BaseComment, id: number, context: 'comment' | 'post' ): ApiResponse<Comment> => api.post( `comments/${context}/${id}`, comment )
export const post = ( comment: BaseComment, postId: number ) => store( comment, postId, 'post' )
export const comment = ( comment: BaseComment, commentId: number ) => store( comment, commentId, 'comment' )
export const getForPost = ( postId: number ): ApiResponse<Comment[]> => api.get( `/comments/${postId}` )