export type UserRole =
  | 'ADMIN'
  | 'USER'

export type User = {
    id: number
    firstname: string
    lastname: string
    username: string
    email: string
    role: UserRole
    avatar: string | null
}