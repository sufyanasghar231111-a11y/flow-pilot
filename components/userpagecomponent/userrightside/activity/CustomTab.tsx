"use client"
import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks"
import { setActivityCustomTab } from "@/store/slices/userSlice"
import AllActivity from "./AllActivity"
export default function CustomTab() {
    const { activityCustomTab } = useAppSelector((state) => state.activityCustomTab)
    const dispatch = useAppDispatch()

    const tabData = [
        {
            type: '',
            name: 'All'
        },
        {
            type: ['taskCreated', 'taskCompleted'],
            name: "Tasks"
        },
        {
            type: 'project',
            name: 'Projects'
        },
        {
            type: 'teamMember',
            name: 'Teams'
        },
    ]
    return (
        <div className=" px-6 bg-[#11131D] pb-4 ">
            <div className="flex items-center gap-1 bg-blue-500/10 w-fit rounded mb-3.5">
                {
                    tabData.map((elem, index) => {
                        return <button onClick={() => { dispatch(setActivityCustomTab(elem.type)) }} key={index} className={`px-7 py-1.5  transition-all duration-400 text-sm rounded ${(activityCustomTab === elem.type || (Array.isArray(elem.type) && elem.type.includes(activityCustomTab as string))) ? 'bg-blue-700' : 'hover:bg-blue-700'}`}>{elem.name}</button>
                    })
                }
            </div>
            {
                activityCustomTab === '' && (
                    <AllActivity />
                )
            }
            {
                ['taskCreated', 'taskCompleted'].some(type =>
                    activityCustomTab.includes(type)
                ) && (
                    <AllActivity />
                )
            }

            {
                activityCustomTab === 'project' && (
                    <AllActivity />
                )
            }
            {
                activityCustomTab === 'teamMember' && (
                    <AllActivity />
                )
            }

        </div>
    )
}