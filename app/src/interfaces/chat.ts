import { User } from './user'



export type ChatMessage = {
    id: number
    sender_id: number
    recipient_id: number
    text: string
    created_at: string
    recipient?: User
    sender?: User
    read: 0 | 1
}
export type Chat = ChatMessage[]