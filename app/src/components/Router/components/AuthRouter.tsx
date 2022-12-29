import React, { createContext, useState } from 'react'
import { ReactNode, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootStore, useAppDispatch } from '../../../Store'
import { Redirect } from 'react-router'
import { CalendarSetEvents } from '../../../actions/calendar/CalendarActions'
import { SetUsers } from '../../../actions/user/UserActions'



interface AuthRouterProps {
    children: ReactNode
}

export const AuthContext = createContext( {} )
const AuthProvider = ( { children }: AuthRouterProps ) => {
    const { loggedIn } = useSelector( ( state: RootStore ) => state.auth )
    const dispatch = useAppDispatch()
    useEffect( () => {

    }, [ loggedIn ] )

    if ( loggedIn ) {
        // fetch initial States
        dispatch( SetUsers() )
        dispatch( CalendarSetEvents() )
    }

    console.log( 'Rendering AuthRouter', loggedIn )

    if ( !loggedIn ) {
        return <Redirect to={'/login'}/>
    }

    return <AuthContext.Provider value={{}}>
        {children}
    </AuthContext.Provider>
}
export default AuthProvider