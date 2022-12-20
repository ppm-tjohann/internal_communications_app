import React, { createContext, useState } from 'react'
import { ReactNode, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootStore } from '../../../Store'
import { Redirect } from 'react-router'



interface AuthRouterProps {
    children: ReactNode
}

export const AuthContext = createContext( {} )
const AuthProvider = ( { children }: AuthRouterProps ) => {
    const { loggedIn } = useSelector( ( state: RootStore ) => state.auth )

    useEffect( () => {

    }, [ loggedIn ] )

    console.log( 'Rendering AuthRouter', loggedIn )

    if ( !loggedIn ) {
        return <Redirect to={'/login'}/>
    }

    return <AuthContext.Provider value={{}}>
        {children}
    </AuthContext.Provider>
}
export default AuthProvider