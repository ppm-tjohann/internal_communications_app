import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import UserReducer from './UserReducer'
import CalendarReducer from './CalendarReducer'
import PostReducer from './PostReducer'



const RootReducer = combineReducers( {
    auth: AuthReducer,
    users: UserReducer,
    calendar: CalendarReducer,
    posts: PostReducer,
} )

export default RootReducer
