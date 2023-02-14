import { ReactNode } from 'react'
import { Box } from '@mui/material'



interface SquareBoxProps {
    children: ReactNode
    variant?: 'square' | 'landscape'

    [x: string]: any,
}

const SquareBox = ( { children, variant = 'square', ...props }: SquareBoxProps ) => {

    return (
      <Box sx={{ width: '100%', pb: variant === 'square' ? '100%' : '56%', position: 'relative' }}>
          <Box {...props} sx={{ width: '100%', height: '100%', position: 'absolute', ...props.sx }}>
              {children}
          </Box>
      </Box>
    )

}
export default SquareBox