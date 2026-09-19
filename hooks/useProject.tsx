"use client"
import { projectProvider } from "@/contexts/projectContext/ProjectContext";
import { useContext } from "react";

export function useProject() {
    const context = useContext(projectProvider)

    if (!context) {
        throw new Error('Project context is not found')
    }

    return context

}

