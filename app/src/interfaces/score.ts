import { User } from './user'



export type Score = {
    id: number
    user_id: number
    count: number
    created_at: string
    updated_at: string
    user?: User
}
export default Score