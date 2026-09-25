import { RiAddFill, RiDeleteBin5Line, RiEdit2Fill } from "@remixicon/react";
import { Names } from "@/components/nameComponent/Names";
import { TimeAgo } from "@/utils/TimeAgo";
import { useProject } from "@/hooks/useProject";
import { useProjectUi1, useUpdateProject } from "@/contexts/projectContext/ProjectContext";

type ProjectMember = {
    user: object,
}

type ElemType = {
    id: string;
    name: string;
    description: string;
    status: string;
    startDate: string;
    deadline: string;
    projectmembers: []
}

type PropType = {
    index: number,
    progressBar: number,
    totalTask: number,
    completeTask: number,
    elem: ElemType
}



export default function ProjectMainDetail({ index, elem, progressBar, totalTask, completeTask }: PropType) {
    const { getSingleProject } = useProject()
    const { setUpdateProjectModal } = useUpdateProject()
    const { setAddMemberModal, setProjectDeleteModal } = useProjectUi1()

    return (
        <div key={elem.id} className="min-h-14 grid grid-cols-[0.5fr_2fr_3fr_1.2fr_1.3fr_1.3fr_1.6fr_1fr_2.4fr_1fr] items-center border-b border-[#252938] px-4 text-sm text-gray-300">

            <div className="text-gray-500">
                {index + 1}
            </div>

            <div className="font-medium text-xs text-white truncate pr-4">
                {elem.name}
            </div>

            <div className="text-gray-400 truncate pr-4">
                {elem.description}
            </div>

            <div>
                <span className={`inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 ${elem.status === 'CANCELLED' && 'bg-red-500/10 text-red-400'} ${elem.status === 'COMPLETE' && 'bg-green-500/10 text-green-400'} ${elem.status === 'PENDING' && 'bg-yellow-500/10 text-yellow-400'}  px-2.5 py-1 text-[10px] font-medium text-blue-400`}>
                    <span className={`h-1.5 w-1.5 ${elem.status === 'CANCELLED' && 'bg-red-400'} ${elem.status === 'COMPLETE' && 'bg-green-400'} ${elem.status === 'PENDING' && 'bg-yellow-400'} rounded-full bg-blue-400`}></span>
                    {elem.status}
                </span>
            </div>

            <div className="text-gray-400 text-[11px] pl-2">
                <TimeAgo time={elem.startDate} />
            </div>

            <div className="text-gray-400 text-[11px]">
                <TimeAgo time={elem.deadline} />
            </div>

            <div className="flex items-center gap-2 pr-4">
                <div className="h-1.5 w-20 overflow-hidden rounded-full bg-[#252938]">
                    <div style={{ width: `${progressBar}%` }} className={`h-full rounded-full bg-blue-500 transition-all`}></div>
                </div>

                <span className="text-xs text-gray-400">
                    {progressBar}%
                </span>
            </div>

            <div className="text-gray-300">
                {completeTask || 0}/{totalTask}
            </div>

            <div className="flex items-center">
                {
                    elem.projectmembers.map((item: ProjectMember) => {
                        const name = item.user.username
                        return <div key={item.user?.id} className="flex h-6 w-6 items-center justify-center rounded-full border border-[#252938] bg-[#202431] text-[10px]">
                            <Names userName={name} />
                        </div>

                    })
                }
                <button onClick={() => {

                    setAddMemberModal(true)
                    getSingleProject(elem.id)
                }} className="ml-2 flex h-6 w-6 items-center justify-center rounded-full border border-[#252938] text-gray-400 transition hover:border-blue-500 hover:bg-blue-500/10 hover:text-blue-400">
                    <RiAddFill className="h-4 w-4" />
                </button>

            </div>

            <div className="flex items-center justify-center gap-2">
                <button onClick={() => {
                    getSingleProject(elem.id)
                    setUpdateProjectModal(true)
                }} className="rounded-md p-1.5 text-gray-400 transition hover:bg-blue-500/10 hover:text-blue-400">
                    <RiEdit2Fill className="h-4 w-4" />
                </button>

                <button onClick={() => {
                    setProjectDeleteModal(true)
                    getSingleProject(elem.id)
                }} className="rounded-md p-1.5 text-gray-400 transition hover:bg-red-500/10 hover:text-red-400">
                    <RiDeleteBin5Line className="h-4 w-4" />
                </button>
            </div>

        </div>
    )
}