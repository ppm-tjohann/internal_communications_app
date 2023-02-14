import { createContext, ReactNode } from 'react'
import { Paper, Stack } from '@mui/material'
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
    return (
      <PostContext.Provider value={{ post }}>
          <Paper sx={{ p: 0 }}>
              {children}
          </Paper>
      </PostContext.Provider>
    )
}
export default PostWrapper
