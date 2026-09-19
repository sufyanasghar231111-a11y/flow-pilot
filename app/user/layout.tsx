import { checkPageRole } from "@/libs/auth/checkPageRole";
import { ReactNode } from "react";

export default async function UserLayout({ children }: { children: ReactNode }) {
    await checkPageRole('USER')
    return (
        <div>
            {children}
        </div>
    )
}