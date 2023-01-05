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
    const { auth, calendar, users } = useSelector( ( state: RootStore ) => state )
    const dispatch = useAppDispatch()
    useEffect( () => {
        console.log( 'Initial States: ', users.loading, users.usersData.length )
        if ( auth.loggedIn ) {
            // fetch initial States
            if ( !users.loading && users.usersData.length === 0 )
                console.log( 'Initial Users' )
            dispatch( SetUsers() )
            if ( !calendar.loading && calendar.events.length === 0 )
                console.log( 'Initial Events' )
            dispatch( CalendarSetEvents() )
        }
    }, [ auth.loggedIn ] )

    console.log( 'Rendering AuthRouter', auth.loggedIn )

    if ( !auth.loggedIn ) {
        return <Redirect to={'/login'}/>
    }

    return <AuthContext.Provider value={{}}>
        {children}
    </AuthContext.Provider>
}
export default AuthProvider