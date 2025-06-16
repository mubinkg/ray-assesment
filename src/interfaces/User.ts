export interface User {
    id: number
    name: string
    email: string
}

export interface UserResult {
    users: User[]
    count: number
    limit: number
    offset: number
}

export interface UsersResponse {
    message: string
    result: UserResult
}

export interface RequestUserQuery {
    limit: number, offset: number;
}