import { ReactNode } from 'react'
import { Box } from '@mui/material'



interface SquareBoxProps {
    children: ReactNode

    [x: string]: any,
}

const SquareBox = ( { children, ...props }: SquareBoxProps ) => {

    return (
      <Box sx={{ width: '100%', pb: '100%', position: 'relative' }}>
          <Box {...props} sx={{ width: '100%', height: '100%', position: 'absolute', ...props.sx }}>
              {children}
          </Box>
      </Box>
    )

}
export default SquareBox