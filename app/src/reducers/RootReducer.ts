import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import UserReducer from './UserReducer'



const RootReducer = combineReducers( {
    auth: AuthReducer,
    users: UserReducer,
} )

export default RootReducer
