export type userType = {
    createdAt: string
    id: string,
    username: string,
    email: string,
    password: string,
    role: string
    length: number,
    pfp?: string | '',
    timeZone?: string,
    dateFormat?: string
}


export type AuthUser = {
    userId: string,
    role: "USER" | "ADMIN",
    sessionId: string
}