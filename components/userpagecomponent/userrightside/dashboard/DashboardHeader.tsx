"use client"
import { useAuth } from "@/contexts/authContext/AuthContext"

export default function DashboardHeader() {
    const { user } = useAuth()
    const firstname = user?.username.split(' ')

    return (
        <div className="pt-23 px-4 ">
            <div>
                <h1 className="text-2xl font-semibold">Welcome back, {firstname && (firstname[0])}!</h1>
                <h1 className="text-sm text-gray-400">Here&apos;s whats happening with your assigned tasks and projects</h1>
            </div>
        </div>
    )
}