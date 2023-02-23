export type UserRole =
  | 'ADMIN'
  | 'USER'

export type Badge = {
    for: 'COMMENT_BADGE' | 'POST_BADGE'
    variant: 1 | 2 | 3 | 4 | 5
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