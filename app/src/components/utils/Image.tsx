import { useState } from 'react'
import { Box, CircularProgress, Fade, Skeleton, Zoom } from '@mui/material'
import useIntersecting from '../../hooks/useIntersecting'
import FlexBox from './FlexBox'



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

    return <Box ref={ref} height={'100%'}>

        {loading && <FlexBox sx={{ width: '100%', height: '100%' }}>
          <Skeleton variant={'rectangular'} sx={{ height: '100%', width: '100%' }}/>
            {visible && <img src={src} onLoad={handleLoad} style={{ display: 'none' }}/>}
        </FlexBox>}

        <Zoom in={!loading} mountOnEnter>
            <img src={src} alt={alt}/>
        </Zoom>
    </Box>
}
export default Image