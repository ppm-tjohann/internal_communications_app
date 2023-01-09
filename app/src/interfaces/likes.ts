import { User } from './user'



export type Like = {
    id: number
    user_id: number
    user?: User
}