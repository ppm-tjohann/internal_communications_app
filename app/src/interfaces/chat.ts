import { User } from './user'



export type Message = {
    id: number
    user: User | null
    user_id: number
    text: string
    created_at: string
    updated_at: string
}

export type StoreChat = {
    name: string | null | undefined
    users: number[],
}

export type Chat = {
    id: number
    name: string | null
    users: User[]
    messages: Message[]
    updated_at: string
    created_at: string
}