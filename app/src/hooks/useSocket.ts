import { useEffect } from 'react'
import { createSocketconnection } from '../lib/socketService'



function listen( callBack: ( payload: any ) => void, channel: string, event: string ) {
    window.Echo.channel( channel ).listen( event, ( payload: any ) => {
        callBack( payload )
    } )

    return function cleanUp() {
        window.Echo.leaveChannel( `private-${channel}` )
    }
}


interface useSocketProps {
    type: 'MessageSent'
    callBack: ( payload: any ) => any
}

const useSocket = ( { type, callBack }: useSocketProps ) => {
    useEffect( () => {
        console.log( 'Registering Web Socket' )
        createSocketconnection()
        switch ( type ) {
            case 'MessageSent':
                return listen( callBack, 'messages', 'MessageSent' )
        }
    } )
}
export default useSocket