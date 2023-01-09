import { useState } from 'react'
import { Box, Fade, Skeleton } from '@mui/material'
import useIntersecting from '../../hooks/useIntersecting'



interface ImageProps {
    src: string
    alt?: string
}

const Image = ( { src, alt }: ImageProps ) => {

    const [ loading, setLoading ] = useState( true )
    const { ref, visible } = useIntersecting()

    const handleLoad = () => {
        setLoading( false )
    }
    if ( visible ) {
        console.log( 'Image is Visible' )
    }

    return <Box ref={ref}>
        <Fade in={loading} unmountOnExit>
            <Box sx={{ width: '100%', height: '100%' }}>
                <Skeleton variant={'rectangular'} sx={{ height: '100%' }}/>
                {visible && <img src={src} onLoad={handleLoad}/>}
            </Box>
        </Fade>
        <Fade in={!loading} mountOnEnter>
            <img src={src} alt={alt}/>
        </Fade>
    </Box>
}
export default Image