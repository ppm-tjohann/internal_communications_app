import api from './index'
import { ApiResponse } from '../../interfaces/apiResponse'
import { Chat, ChatMessage } from '../../interfaces/chat'



export const get = ( userId: number ): ApiResponse<Chat> => api.get( `chat/${userId}` )
export const store = ( userId: number, message: string ): ApiResponse<ChatMessage> => api.post( `chat/${userId}`, { text: message } )