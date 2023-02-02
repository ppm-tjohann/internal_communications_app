import { ChatDispatchTypes } from '../actions/chat/ChatActionTypes'
import { Chat } from '../interfaces/chat'
import moment from 'moment'
import { DEFAULT_FORMAT } from './CalendarReducer'
import { DATE_TIME_FORMAT } from '../interfaces/event'



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
let lastAction: ChatDispatchTypes

const ChatReducer = ( state: DefaultState = defaultState, action: ChatDispatchTypes ) => {

    if ( lastAction === action ) {
        console.log( 'Same Action' )
        return state
    }
    lastAction = action
    switch ( action.type ) {
        case'CHAT_LOADING_GET_ACTIVE_CHAT':
            return { ...state, loadingGetActiveChat: action.payload.loading }
        case'CHAT_LOADING_GET_CHATS':
            return { ...state, loadingGetChats: action.payload.loading }
        case'CHAT_LOADING_SENDING_MESSAGE':
            return { ...state, loadingSendingMessage: !state.loadingSendingMessage }
        case 'CHAT_SET_ACTIVE_CHAT':
            return { ...state, activeChat: action.payload.chat }
        case 'CHAT_SET_CHATS':
            return { ...state, chats: action.payload.chats }
        case 'CHAT_ADD_CHAT':
            return { ...state, chats: [ action.payload.chat, ...state.chats.filter( chat => chat.id !== action.payload.chat.id ) ] }
        case 'CHAT_SET_NEW_MESSAGE':
            return !state.activeChat ?
              state : {
                  ...state,
                  activeChat: {
                      ...state.activeChat,
                      messages: [ action.payload.message, ...state.activeChat.messages.filter( msg => msg.id !== action.payload.message.id ) ],
                  },
              }
        case 'CHAT_SET_NEW_PREVIEW_MESSAGE':
            let newChats = [
                ...state.chats.filter( chat => chat.id == action.payload.chatId ),
                ...state.chats.filter( chat => chat.id !== action.payload.chatId ),
            ]
            newChats[0] = {
                ...newChats[0],
                messages: [ action.payload.message ],
                updated_at: moment().format( DATE_TIME_FORMAT ),
            }
            console.log( 'Setting New Chats :', newChats[0] )
            return {
                ...state,
                chats: newChats,
            }

      // chats: state.chats.filter( chat => chat.id !== action.payload.chatId ? chat : {
      //     ...chat,
      //     messages: [ action.payload.message ],
      // } ),

        default:
            return state
    }
}

export default ChatReducer




