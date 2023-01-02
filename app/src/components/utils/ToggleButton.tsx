import { Box, IconButton, Slide } from '@mui/material'
import { Favorite, FavoriteBorder } from '@mui/icons-material'
import { ReactNode } from 'react'



interface ToggleButtonProps {
    handleClick: () => any
    toggle: boolean
    children: ReactNode[]

}

const ToggleButton = ( { handleClick, toggle, children }: ToggleButtonProps ) => {
    return (
      <IconButton onClick={handleClick} sx={{ overflow: 'hidden', position: 'relative', width: 40 }}>
          <Slide mountOnEnter unmountOnExit in={toggle}>
              <Box sx={{ display: 'inline-block', height: 24, position: 'absolute' }}>
                  {children[0]}
              </Box>
          </Slide>
          <Slide mountOnEnter unmountOnExit in={!toggle}>
              <Box sx={{ display: 'inline-block', height: 24, position: 'absolute' }}>
                  {children[1]}
              </Box>
          </Slide>
      </IconButton>
    )
}
export default ToggleButton