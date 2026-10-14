import { useProject } from "@/hooks/useProject"

export default function ProjectProgress() {
    const { getProject } = useProject()
    return (
        <div className="w-[33%] border rounded-md border-[#252938] bg-[#171A26]">
            <div className="px-3 py-2">
                <h1 className='text-sm font-semibold'>Project Progress</h1>
                <h1 className="text-xs text-gray-500">Progress of all projects.</h1>
            </div>
            <div className="px-3 py-2 flex flex-col gap-5">
                {
                    getProject.slice(0, 5).map((elem) => {
                        const total = elem.tasks?.length
                        const completed = ((elem.tasks?.length ?? 0) > 0 ? elem.tasks?.filter(elem => elem.status === 'DONE').length : 0) ?? 0
                        const progress = total ? Math.ceil((completed / total) * 100) : 0

                        return <div key={elem.id} className="flex items-center justify-between gap-2">
                            <h1 className="text-xs w-[30%] truncate">{elem.name}</h1>
                            <div className="bg-[#252938] w-[60%] rounded-full overflow-hidden h-2">
                                <div style={{ width: `${progress}%` }} className="w-full h-full bg-blue-600 transition-all duration-700" />
                            </div>
                            <h1 className="text-xs text-gray-400">{progress || 0}%</h1>
                        </div>
                    })
                }
            </div>
        </div>
    )
}