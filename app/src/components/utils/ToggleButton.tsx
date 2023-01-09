import { Box, IconButton, Skeleton, Slide } from '@mui/material'
import { Favorite, FavoriteBorder } from '@mui/icons-material'
import { ReactNode } from 'react'



interface ToggleButtonProps {
    handleClick: () => any
    toggle: boolean
    loading?: boolean
    children: ReactNode[]

}

const ToggleButton = ( { handleClick, toggle, children, loading }: ToggleButtonProps ) => {

    if ( loading !== undefined && loading ) {
        return <IconButton sx={{ overflow: 'hidden', flexShrink: 0, flexGrow: 0, position: 'relative', width: 40 }}>
            <Skeleton sx={{ position: 'absolute', width: '100%', height: '100%' }}/>
        </IconButton>
    }

    return (
      <IconButton onClick={handleClick} sx={{ overflow: 'hidden', flexShrink: 0, flexGrow: 0, position: 'relative', width: 40 }}>
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