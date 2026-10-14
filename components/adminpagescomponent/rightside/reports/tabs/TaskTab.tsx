import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks";
import AllTaskDetail from "../AllTaskDetail";
import TaskTabHeader from "../TaskTabHeader";
import { useTask } from "@/hooks/useTask";
import { setShowTaskReport } from "@/store/slices/reportSlice";
import TaskShowReport from "../TaskShowReport";
import { useState } from "react";

export default function TaskTab() {

    const dispatch = useAppDispatch()
    const { showTaskReport } = useAppSelector((state) => state.showTaskReport)
    const { getAllTask } = useTask()

    const [taskReportLoader, setTaskReportLoader] = useState(false)

    async function handleTaskReport() {
        try {
            setTaskReportLoader(true)
            await getAllTask()
            dispatch(setShowTaskReport(true))

        }
        catch (err) {
            console.log(err);
        }
        finally {
            setTaskReportLoader(false)
        }
    }

    return (
        <div className="bg-[#11131D] w-full h-full px-4 py-2">
            <TaskTabHeader handleTaskReport={handleTaskReport} taskReportLoader={taskReportLoader} />
            {
                showTaskReport ? <TaskShowReport /> : <AllTaskDetail />
            }

        </div>
    )
}