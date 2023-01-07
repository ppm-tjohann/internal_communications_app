import { useState } from 'react'
import { Box, Fade, Skeleton } from '@mui/material'



interface ImageProps {
    src: string
    alt?: string
}

const Image = ( { src, alt }: ImageProps ) => {

    const [ loading, setLoading ] = useState( true )

    const handleLoad = () => {
        setLoading( false )
    }

    return <>
        <Fade in={loading} unmountOnExit>
            <Box sx={{ width: '100%', height: '100%' }}>
                <Skeleton variant={'rectangular'} sx={{ height: '100%' }}/>
                <img src={src} onLoad={handleLoad}/>
            </Box>
        </Fade>
        <Fade in={!loading} mountOnEnter>
            <img src={src} alt={alt}/>
        </Fade>
    </>
}
export default Image