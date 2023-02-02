import Echo from 'laravel-echo'
import Pusher from 'pusher-js'



declare global {
    interface Window {
        Echo: Echo;
        Pusher: Pusher
    }
}

window.Pusher = require( 'pusher-js' )


export function createSocketconnection() {
    if ( !window.Echo ) {
        window.Echo = new Echo( {
            broadcaster: 'pusher',
            key: 'pusherAppKey',
            wsHost: window.location.hostname,
            wsPort: 6001,
            forceTLS: false,
            disableStats: true,
            cluster: 'mt1',
        } )
    }
}
