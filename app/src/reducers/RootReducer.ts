import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import UserReducer from './UserReducer'
import CalendarReducer from './CalendarReducer'
import PostReducer from './PostReducer'
import ChatReducer from './ChatReducer'
import NewsReducer from './NewsReducer'



const RootReducer = combineReducers( {
    auth: AuthReducer,
    users: UserReducer,
    calendar: CalendarReducer,
    posts: PostReducer,
    chat: ChatReducer,
    news: NewsReducer,
} )

export default RootReducer
