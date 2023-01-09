import { useEffect, useRef, useState } from 'react'



const useIntersecting = () => {

    const [ visible, setVisible ] = useState( false )
    const ref = useRef()

    useEffect( () => {
        const observer = new IntersectionObserver( entries => {
            setVisible( entries[0].isIntersecting )
        } )
        if ( ref.current ) {
            console.log( 'Observing Target' )
            observer.observe( ref.current )
        }
        else {
            console.log( 'NO REF' )
        }
    }, [ ref ] )

    return ( { ref, visible } )

}
export default useIntersecting