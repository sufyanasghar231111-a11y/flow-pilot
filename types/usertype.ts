export type userType = {
    id:string,
    username:string,
    email:string,
    password:string,
    role:string
    length:number
}


export type AuthUser = {
    userId: string,
    role: "USER" | "ADMIN",
    sessionId: string
}