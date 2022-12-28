import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import UserReducer from './UserReducer'
import CalendarReducer from './CalendarReducer'



const RootReducer = combineReducers( {
    auth: AuthReducer,
    users: UserReducer,
    calendar: CalendarReducer,
} )

export default RootReducer
