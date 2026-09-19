
import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const connectionString = process.env.DATABASE_URL

if(!connectionString){
    throw new Error("Db is not connected")
}

const adapter = new PrismaNeon({
    connectionString
})

const prisma = new PrismaClient({
    adapter
})

export default prisma