import { Dispatch } from 'redux'
import {
    CHAT_ADD_CHAT,
    CHAT_LOADING_GET_ACTIVE_CHAT,
    CHAT_LOADING_GET_CHATS,
    CHAT_LOADING_SENDING_MESSAGE,
    CHAT_SET_ACTIVE_CHAT,
    CHAT_SET_CHATS,
    CHAT_SET_NEW_MESSAGE,
    CHAT_SET_NEW_PREVIEW_MESSAGE,
    ChatDispatchTypes,
} from './ChatActionTypes'
import * as chatApi from '../../lib/api/chat'
import { RootState } from '../../Store'
import { Chat, Message, StoreChat } from '../../interfaces/chat'

// TODO register new channel for each chat and listen to it

export const newChatMessage = ( message: Message ) => ( dispatch: Dispatch<ChatDispatchTypes>, getState: () => RootState ) => {

    const { auth, chat } = getState()
    dispatch( { type: CHAT_SET_NEW_PREVIEW_MESSAGE, payload: { message, chatId: message.chat_id } } )

    if ( chat.activeChat !== null && ( message.chat_id === chat.activeChat.id ) && message.user_id !== auth.user?.id ) {
        dispatch( { type: CHAT_SET_NEW_MESSAGE, payload: { message } } )

        // } ).listen( '.new-chat-created', ( { chat }: { chat: Chat } ) => {
        //     dispatch( { type: CHAT_ADD_CHAT, payload: { chat } } )
    }

}
export const newChatCreated = ( chat: Chat ) => async ( dispatch: Dispatch<ChatDispatchTypes> ) => {
}

export const setActiveChat = ( chatId: number ) => async ( dispatch: Dispatch<ChatDispatchTypes> ) => {
    dispatch( { type: CHAT_LOADING_GET_ACTIVE_CHAT, payload: { loading: true } } )
    try {
        const { data: chat } = await chatApi.find( chatId )
        dispatch( { type: CHAT_SET_ACTIVE_CHAT, payload: { chat } } )
    }
    catch ( e ) {
        console.error( e )
    }
    dispatch( { type: CHAT_LOADING_GET_ACTIVE_CHAT, payload: { loading: false } } )
}
export const setChats = () => async ( dispatch: Dispatch<ChatDispatchTypes>, getState: () => RootState ) => {
    dispatch( { type: CHAT_LOADING_GET_CHATS, payload: { loading: true } } )
    try {
        const { data: chats } = await chatApi.get()
        dispatch( { type: CHAT_SET_CHATS, payload: { chats } } )

        const activeChat = getState().chat.activeChat
        console.log( 'Active Chat :', activeChat )

        if ( activeChat === null || chats.length > 0 ) {
            dispatch( { type: CHAT_SET_ACTIVE_CHAT, payload: { chat: chats[0] } } )
            dispatch( { type: CHAT_LOADING_GET_ACTIVE_CHAT, payload: { loading: false } } )
        }
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
    }
    catch ( e ) {
        console.error( e )
    }
    dispatch( { type: CHAT_LOADING_SENDING_MESSAGE } )
}

export const addChat = ( values: StoreChat ) => async ( dispatch: Dispatch<ChatDispatchTypes> ) => {
    /*
    * submit
    * add to chats list
    * make it active
    * */
    try {
        // Submitting new Chat + Add To Chat List
        const { data: chat } = await chatApi.store( values )
        dispatch( { type: CHAT_ADD_CHAT, payload: { chat } } )
        // Make new Chat active
        dispatch( { type: CHAT_SET_ACTIVE_CHAT, payload: { chat } } )
    }
    catch ( e ) {
        console.error( 'Adding Chat Failed: ', e )
    }
}