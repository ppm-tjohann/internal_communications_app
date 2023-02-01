import { ChatDispatchTypes } from '../actions/chat/ChatActionTypes'
import { Chat } from '../interfaces/chat'
import { User } from '../interfaces/user'



interface DefaultState {
    chat: Chat
    users: { user: User, message: string }[]
    loading: boolean
    sendLoading: boolean
    recipientId: number
}

const defaultState: DefaultState = {
    loading: false,
    sendLoading: false,
    recipientId: 0,
    chat: [],
    users: [],
}

const ChatReducer = ( state: DefaultState = defaultState, action: ChatDispatchTypes ) => {
    switch ( action.type ) {
        case 'CHAT_GET_CHAT': {
            return { ...state, chat: action.payload.chat, recipientId: action.payload.userId }
        }
        case 'CHAT_SEND_MESSAGE': {
            return { ...state, chat: [ ...state.chat, action.payload.message ] }
        }

        case 'CHAT_LOADING': {
            return { ...state, loading: !state.loading }
        }
        case 'CHAT_ADD_LOADING': {
            return { ...state, sendLoading: !state.sendLoading }
        }
        default:
            return state
    }
}

export default ChatReducer




