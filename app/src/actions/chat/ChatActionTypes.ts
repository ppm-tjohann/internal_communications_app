import { Chat, Message } from '../../interfaces/chat'



/**
 * loadings:
 *  - initial_chats
 *  - getting_active_chat
 *  - sending_message
 *  set:
 *  - set active chat
 *  - set chats
 *  - add new Message
 *
 *
 * */


export const CHAT_LOADING_SENDING_MESSAGE = 'CHAT_LOADING_SENDING_MESSAGE'
export const CHAT_LOADING_GET_ACTIVE_CHAT = 'CHAT_LOADING_GET_ACTIVE_CHAT'
export const CHAT_LOADING_GET_CHATS = 'CHAT_LOADING_GET_CHATS'
export const CHAT_SET_ACTIVE_CHAT = 'CHAT_SET_ACTIVE_CHAT'
export const CHAT_SET_CHATS = 'CHAT_SET_CHATS'
export const CHAT_SET_NEW_MESSAGE = 'CHAT_SET_NEW_MESSAGE'
export const CHAT_SET_NEW_PREVIEW_MESSAGE = 'CHAT_SET_NEW_PREVIEW_MESSAGE'

export interface ChatLoadingSendingMessage {
    type: typeof CHAT_LOADING_SENDING_MESSAGE
}

export interface ChatLoadingGettingActiveChat {
    type: typeof CHAT_LOADING_GET_ACTIVE_CHAT
}

export interface ChatLoadingGettingChats {
    type: typeof CHAT_LOADING_GET_CHATS,
    payload: { loading: boolean }
}

export interface ChatSetActiveChat {
    type: typeof CHAT_SET_ACTIVE_CHAT,
    payload: { chat: Chat }
}

export interface ChatSetChats {
    type: typeof CHAT_SET_CHATS,
    payload: { chats: Chat[] }
}

export interface ChatSetNewMessage {
    type: typeof CHAT_SET_NEW_MESSAGE
    payload: { message: Message }
}

export interface ChatSetNewPreviewMessage {
    type: typeof CHAT_SET_NEW_PREVIEW_MESSAGE
    payload: { message: Message, chatId: number }
}

export type ChatDispatchTypes =
  | ChatLoadingGettingActiveChat
  | ChatLoadingGettingChats
  | ChatLoadingSendingMessage
  | ChatSetActiveChat
  | ChatSetChats
  | ChatSetNewMessage
  | ChatSetNewPreviewMessage

