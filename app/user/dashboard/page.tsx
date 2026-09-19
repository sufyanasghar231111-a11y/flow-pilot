'use client'
import { useLogout } from "@/contexts/authContext/AuthContext"

export default function User() {
    const { handleLogout } = useLogout()
    return (
        <div>
            User
            <div onClick={handleLogout}>
                logout
            </div>
        </div>
    )
}