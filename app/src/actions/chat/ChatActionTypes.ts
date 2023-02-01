import { Chat, ChatMessage } from '../../interfaces/chat'



export const CHAT_LOADING = 'CHAT_LOADING'
export const CHAT_ADD_LOADING = 'CHAT_ADD_LOADING'
export const CHAT_SEND_MESSAGE = 'CHAT_SEND_MESSAGE'
export const CHAT_GET_CHAT = 'CHAT_GET_CHAT'

export interface ChatGetChat {
    type: typeof CHAT_GET_CHAT,
    payload: { userId: number, chat: Chat }
}

export interface ChatLoadingChat {
    type: typeof CHAT_LOADING
}

export interface ChatSendMessage {
    type: typeof CHAT_SEND_MESSAGE,
    payload: { message: ChatMessage }
}

export interface ChatAddLoading {
    type: typeof CHAT_ADD_LOADING
}

export type ChatDispatchTypes =
  | ChatGetChat
  | ChatLoadingChat
  | ChatAddLoading
  | ChatSendMessage