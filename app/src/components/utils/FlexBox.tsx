import { ReactNode } from 'react'
import { Box } from '@mui/material'



interface FlexBoxProps{
    children:ReactNode,
    [x:string]:any,
}
const FlexBox =({children,...props}:FlexBoxProps)=>{
    return(<Box {...props} sx={{
        display:'flex',alignItems:'center',justifyContent:'center',
        ...props.sx,
    }}>
        {children}
    </Box>)
}
export default FlexBox