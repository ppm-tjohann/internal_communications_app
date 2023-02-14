import React, { createContext, useMemo, useState } from 'react'
import { ReactNode, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootStore, useAppDispatch } from '../../../Store'
import { Redirect, useHistory } from 'react-router'
import { CalendarSetEvents } from '../../../actions/calendar/CalendarActions'
import { SetUsers } from '../../../actions/user/UserActions'
import { AuthSetUser } from '../../../actions/auth/AuthActions'
import { SetPosts } from '../../../actions/posts/PostActions'



interface AuthRouterProps {
    children: ReactNode
}

export const AuthContext = createContext( {} )
const AuthProvider = ( { children }: AuthRouterProps ) => {
    const history = useHistory()
    const { auth } = useSelector( ( state: RootStore ) => state )
    const dispatch = useAppDispatch()
    useMemo( () => {
        if ( auth.loggedIn ) {
            // fetch initial States
            dispatch( SetUsers() )
            dispatch( CalendarSetEvents() )
            dispatch( AuthSetUser() )
            dispatch( SetPosts() )
        }
        else {
            history.push( '/login' )
        }
    }, [ auth.loggedIn ] )

    if ( !auth.loggedIn ) {
        console.log( 'REDIRECTING' )
        history.push( '/login' )
    }
    return <AuthContext.Provider value={{}}>
        {children}
    </AuthContext.Provider>
}
export default AuthProvider