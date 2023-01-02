import { ReactNode } from 'react'
import { Paper, Stack } from '@mui/material'



interface PostWrapperProps {
    children: ReactNode[]
}

const PostWrapper = ( { children }: PostWrapperProps ) => {
    return (
      <Paper sx={{ p: 0 }}>
          {children}
      </Paper>
    )
}
export default PostWrapper
