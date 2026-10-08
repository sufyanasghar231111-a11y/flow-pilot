"use client"
import { projectCreationInput, projectProvider, projectStatProvider } from "@/contexts/projectContext/ProjectContext";
import { useContext } from "react";

export function useProject() {
    const context = useContext(projectProvider)

    if (!context) {
        throw new Error('Project context is not found')
    }

    return context

}


export function useCreationInput() {
    const context = useContext(projectCreationInput)

    if (!context) {
        throw new Error('projectCreationInput context is must inside useCreationInput')
    }
    return context
}

export function useProjectStat() {
    const context = useContext(projectStatProvider)
    if (!context) {
        throw new Error('projectStatProvider context is must inside useProjectStat')
    }

    return context
}