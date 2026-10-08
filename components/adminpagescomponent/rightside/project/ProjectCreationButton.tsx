import { useProjectModal } from "@/contexts/projectContext/ProjectContext"
import { RiAddLine } from "@remixicon/react"

export default function ProjectCreationButton() {
    const { setProjectCreationModal } = useProjectModal()
    return (
        <button onClick={() => { setProjectCreationModal(true) }} className="flex items-center gap-2 rounded-md border border-blue-500/30 bg-blue-800/50 px-3.5 py-2.5 text-blue-100 shadow-[0_0_15px_rgba(59,130,246,0.15)] transition-all duration-200 hover:border-blue-400/50 hover:bg-blue-700/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.25)] active:scale-[0.98]">
            <RiAddLine className="h-5 w-5" />
            <span className="text-sm font-medium">Create Project</span>
        </button>
    )
}