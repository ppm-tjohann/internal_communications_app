import { Dispatch } from 'redux'
import {
    CHAT_LOADING_GET_ACTIVE_CHAT,
    CHAT_LOADING_GET_CHATS,
    CHAT_LOADING_SENDING_MESSAGE,
    CHAT_SET_ACTIVE_CHAT,
    CHAT_SET_CHATS, CHAT_SET_NEW_MESSAGE, CHAT_SET_NEW_PREVIEW_MESSAGE,
    ChatDispatchTypes,
} from './ChatActionTypes'
import * as chatApi from '../../lib/api/chat'
import { RootState } from '../../Store'



export const setActiveChat = ( chatId: number ) => async ( dispatch: Dispatch<ChatDispatchTypes> ) => {
    dispatch( { type: CHAT_LOADING_GET_ACTIVE_CHAT } )
    try {
        const { data: chat } = await chatApi.find( chatId )
        dispatch( { type: CHAT_SET_ACTIVE_CHAT, payload: { chat } } )
    }
    catch ( e ) {
        console.error( e )
    }
    dispatch( { type: CHAT_LOADING_GET_ACTIVE_CHAT } )
}
export const setChats = () => async ( dispatch: Dispatch<ChatDispatchTypes> ) => {
    console.log( 'Setting Chats Action' )
    dispatch( { type: CHAT_LOADING_GET_CHATS, payload: { loading: true } } )
    try {
        const { data: chats } = await chatApi.get()
        dispatch( { type: CHAT_SET_CHATS, payload: { chats } } )
    }
    catch ( e ) {
        console.error( e )
    }
    dispatch( { type: CHAT_LOADING_GET_CHATS, payload: { loading: false } } )
}
export const sendMessage = ( text: string ) => async ( dispatch: Dispatch<ChatDispatchTypes>, getState: () => RootState ) => {
    dispatch( { type: CHAT_LOADING_SENDING_MESSAGE } )
    try {
        const { activeChat } = getState().chat
        if ( !activeChat )
            throw new Error( 'No Active Chat' )
        const { data: message } = await chatApi.send( activeChat.id, text )
        dispatch( { type: CHAT_SET_NEW_MESSAGE, payload: { message } } )
        dispatch( { type: CHAT_SET_NEW_PREVIEW_MESSAGE, payload: { message, chatId: activeChat.id } } )
    }
    catch ( e ) {
        console.error( e )
    }
    dispatch( { type: CHAT_LOADING_SENDING_MESSAGE } )
}