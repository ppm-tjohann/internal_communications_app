import { createContext, ReactNode } from 'react'
import { Paper, Stack, useTheme } from '@mui/material'
import { Post } from '../../../interfaces/post'



export interface PostContextTypes {
    post: Post
}

export const PostContext = createContext( {} as PostContextTypes )

interface PostWrapperProps {
    children: ReactNode[]
    post: Post
}

const PostWrapper = ( { children, post }: PostWrapperProps ) => {
    const theme = useTheme()

    return (
      <PostContext.Provider value={{ post }}>
          <Paper sx={{ p: 0, borderRadius: theme.spacing( 3 ), overflow: 'hidden' }}>
              {children}
          </Paper>
      </PostContext.Provider>
    )
}
export default PostWrapper
