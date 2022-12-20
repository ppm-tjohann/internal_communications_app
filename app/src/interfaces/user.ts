export type UserRole =
  | 'ADMIN'
  | 'USER'

export type User = {
    id: number
    username: string
    email: string
    role: UserRole
    avatar: string | null
}