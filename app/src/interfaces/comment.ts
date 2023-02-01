import { User } from './user'



export type BaseComment = {
    text: string
}

export type Comment = BaseComment & {
    id: number
    created_at: string
    user_id: number
    user?: User
}