import api from './index'
import { ApiResponse } from '../../interfaces/apiResponse'
import { Chat, Message, StoreChat } from '../../interfaces/chat'
import { User } from '../../interfaces/user'



export const get = (): ApiResponse<Chat[]> => api.get( `chat` )
export const find = ( chatId: number ): ApiResponse<Chat> => api.get( `chat/${chatId}` )
export const store = ( data: StoreChat ): ApiResponse<{ chat: Chat, user: User }> => api.post( `chat`, data )

export const send = ( chatId: number, message: string ): ApiResponse<Message> => api.post( `chat/${chatId}/send`, { text: message } )

