import { SignJWT } from "jose"


const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN)

export async function createAccessToken (userId:string, role:string, sessionId:string){
    return new SignJWT({
       userId,
       role,
       sessionId
   })
   .setProtectedHeader({alg:'HS256'})
   .setIssuedAt()
   .setExpirationTime('10m')
   .sign(secret)
}