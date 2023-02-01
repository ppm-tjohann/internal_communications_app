import { createContext, ReactNode, useState } from 'react'
import { useAppDispatch } from '../../Store'
import { Comment, Post } from '../../interfaces/post'
import { User } from '../../interfaces/user'



export interface PostContextTypes {
    post: Post
}

export const PostContext = createContext( {} as PostContextTypes )

interface PostProviderProps {
    children: ReactNode
    post: Post
}

const PostProvider = ( { children, post }: PostProviderProps ) => {

    return <PostContext.Provider value={{ post }}>
        {children}
    </PostContext.Provider>
}

export default PostProvider
