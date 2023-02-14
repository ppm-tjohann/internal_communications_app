import { useEffect } from 'react'
import { createSocketconnection } from '../lib/socketService'
import { useAppSelector } from '../Store'



function listen( callBack: ( payload: any ) => void, channel: string, event: string ) {
    window.Echo.channel( channel ).stopListening( `.${event}` )
    window.Echo.channel( channel ).listen( `.${event}`, ( payload: any ) => {
        callBack( payload )
    } )
}


interface useSocketProps {
    type: 'MessageSent' | 'NewScore'
    callBack: ( payload: any ) => any
}

const useSocket = ( { type, callBack }: useSocketProps ) => {

    const { user } = useAppSelector( state => state.auth )

    useEffect( () => {
        createSocketconnection()
        switch ( type ) {
            case 'MessageSent':
                return listen( callBack, 'messages', 'MessageSent' )
            case 'NewScore':
                if ( user )
                  // return null
                    return listen( callBack, `score.${user.id}`, 'score.updated' )
        }
    } )
}
export default useSocket