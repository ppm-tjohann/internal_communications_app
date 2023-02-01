import { Dispatch } from 'redux'
import { CHAT_ADD_LOADING, CHAT_GET_CHAT, CHAT_LOADING, CHAT_SEND_MESSAGE, ChatDispatchTypes } from './ChatActionTypes'
import * as chatApi from '../../lib/api/chat'



export const getUserList = () => async ( dispatch: Dispatch<ChatDispatchTypes> ) => {

}

export const getChat = ( userId: number ) => async ( dispatch: Dispatch<ChatDispatchTypes> ) => {
    dispatch( { type: CHAT_LOADING } )
    try {
        const { data: chat } = await chatApi.get( userId )
        dispatch( { type: CHAT_GET_CHAT, payload: { chat, userId } } )
    }
    catch ( e ) {
        console.error( 'Getting Chat failed: ', e )
    }
    dispatch( { type: CHAT_LOADING } )
}
export const sendMessage = ( userId: number, message: string ) => async ( dispatch: Dispatch<ChatDispatchTypes> ) => {
    dispatch( { type: CHAT_ADD_LOADING } )
    try {
        const { data: messageRes } = await chatApi.store( userId, message )
        dispatch( { type: CHAT_SEND_MESSAGE, payload: { message: messageRes } } )
    }
    catch ( e ) {
        throw Error( 'Sending Message failed' )
    }
    dispatch( { type: CHAT_ADD_LOADING } )
}
