import { ChatDispatchTypes } from '../actions/chat/ChatActionTypes'
import { Chat } from '../interfaces/chat'
import { User } from '../interfaces/user'



interface DefaultState {
    activeChat: Chat | null
    chats: Chat[]
    loadingSendingMessage: boolean
    loadingGetActiveChat: boolean
    loadingGetChats: boolean
    sendLoading: boolean
}

const defaultState: DefaultState = {
    loadingSendingMessage: false,
    loadingGetActiveChat: false,
    loadingGetChats: true,
    sendLoading: false,
    activeChat: null,
    chats: [],
}

const ChatReducer = ( state: DefaultState = defaultState, action: ChatDispatchTypes ) => {
    switch ( action.type ) {
        case'CHAT_LOADING_GET_ACTIVE_CHAT':
            return { ...state, loadingGetActiveChat: !state.loadingGetActiveChat }
        case'CHAT_LOADING_GET_CHATS':
            return { ...state, loadingGetChats: action.payload.loading }
        case'CHAT_LOADING_SENDING_MESSAGE':
            return { ...state, loadingSendingMessage: !state.loadingSendingMessage }
        case 'CHAT_SET_ACTIVE_CHAT':
            return { ...state, activeChat: action.payload.chat }
        case 'CHAT_SET_CHATS':
            return { ...state, chats: action.payload.chats }
        case 'CHAT_SET_NEW_MESSAGE':
            return !state.activeChat ?
              state : {
                  ...state, activeChat: { ...state.activeChat, messages: [ ...state.activeChat.messages, action.payload.message ] },
              }
        case 'CHAT_SET_NEW_PREVIEW_MESSAGE':
            console.log( 'Setting new Preview' )
            return {
                ...state,
                chats: state.chats.map( chat => chat.id !== action.payload.chatId ? chat : {
                    ...chat,
                    messages: [ action.payload.message ],
                } ),
            }
        default:
            return state
    }
}

export default ChatReducer




