export type UserRole =
  | 'ADMIN'
  | 'USER'

export type Badge = {
    id: number,
    for: 'COMMENT_BADGE' | 'POST_BADGE' | 'LIKES_BADGE' | 'TESTING'
    variant: 1 | 2 | 3 | 4 | 5
    user_id: number
    created_at: string
    updated_at: string
}

export type User = {
    id: number
    firstname: string
    lastname: string
    username: string
    email: string
    role: UserRole
    badges?: Badge[]
    avatar: string | null
}