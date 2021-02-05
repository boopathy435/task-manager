export interface User {
    id: number,
    name: string,
    picture: string
}

export interface UsersResponse{
    status: string,
    users: User[]
}