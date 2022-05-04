export type Roles = 'subscriber' | 'admin' | null

export interface User {
    username: string,
    password: string,
}

export interface UserResponse {
    message: string,
    token: string,
    role: Roles,
    userId: number,
}