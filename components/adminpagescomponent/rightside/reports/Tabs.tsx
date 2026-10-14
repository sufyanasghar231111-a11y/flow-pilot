"use client"
import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks"
import { setCustomTab } from "@/store/slices/reportSlice"
import Overview from "./tabs/Overview"
import ProjectTab from "./tabs/ProjectTab"
import TaskTab from "./tabs/TaskTab"
import EventTab from "./tabs/EventTab"
import TeamTab from "./tabs/TeamTab"

export default function Tabs() {
    const dispatch = useAppDispatch()
    const customTab = useAppSelector((state) => state.customTab.customTab)
    return (
        <div className="">
            <div className='py-5'>
                <div className="flex items-center gap-4 text-sm border-b border-gray-700  mx-3">
                    <h1 onClick={() => { dispatch(setCustomTab('overview')) }} className={` rounded w-20 flex items-center justify-center pb-2  ${customTab === 'overview' ? 'border-blue-500 text-white border-b-4' : "text-gray-400 border-0"} cursor-pointer `}>Overview</h1>
                    <h1 onClick={() => { dispatch(setCustomTab('project')) }} className={` rounded w-20 flex items-center justify-center pb-2  ${customTab === 'project' ? 'border-blue-500 text-white border-b-4' : "text-gray-400 border-0"} cursor-pointer `}>Projects</h1>
                    <h1 onClick={() => { dispatch(setCustomTab('task')) }} className={` rounded w-20 flex items-center justify-center pb-2  ${customTab === 'task' ? 'border-blue-500 text-white border-b-4' : "text-gray-400 border-0"} cursor-pointer `}>Tasks</h1>
                    <h1 onClick={() => { dispatch(setCustomTab('team')) }} className={` rounded w-20 flex items-center justify-center pb-2  ${customTab === 'team' ? 'border-blue-500 text-white border-b-4' : "text-gray-400 border-0"} cursor-pointer `}>Team</h1>
                    <h1 onClick={() => { dispatch(setCustomTab('event')) }} className={` rounded w-20 flex items-center justify-center pb-2  ${customTab === 'event' ? 'border-blue-500 text-white border-b-4' : "text-gray-400 border-0"} cursor-pointer `}>Events</h1>
                </div>
            </div>

            {
                customTab === 'overview' && (
                    <Overview />
                )
            }
            {
                customTab === 'project' && (
                    <ProjectTab />
                )
            }
            {
                customTab === 'task' && (
                    <TaskTab />
                )
            }
            {
                customTab === 'event' && (
                    <EventTab />
                )
            }
            {
                customTab === 'team' && (
                    <TeamTab />
                )
            }
        </div>
    )
}