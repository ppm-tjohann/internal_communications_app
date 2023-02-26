import * as z from 'zod'
import { User } from './user'



export const AddPostRequest = z.object( {
    text: z.string().min( 1 ),
    image: z.instanceof( File ),
} )

export type Like = {
    user_id: number
    created_at: string
    user?: User
}

export type BaseComment = {
    text: string
}

export type Comment = BaseComment & {
    id: number
    created_at: string
    user_id: number
    likes_count: number
    likes?: Like[]
    user?: User
}

export type BasePost = {
    text: string
    image: File | null
}

export type Post = BasePost & {
    id: number
    image: string
    likes_count: number
    comments_count: number
    user_id: number
    comments?: Comment[]
    updated_at: string
}