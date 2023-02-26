export type UserRole =
  | 'ADMIN'
  | 'USER'

export type Badge = {
    id: number,
    for: 'COMMENT_BADGE' | 'POST_BADGE' | 'LIKE_BADGE' | 'TESTING'
    variant: 1 | 2 | 3 | 4 | 5
    user_id: number
    created_at: string
    updated_at: string
}

export type Border = {
    created_at: string
    updated_at: string
    id: number
    value: number
    user_id: number
}

export type User = {
    id: number
    firstname: string
    lastname: string
    username: string
    email: string
    phone: string | null
    role: UserRole
    badges?: Badge[]
    border: Border | null
    avatar: string | null
}