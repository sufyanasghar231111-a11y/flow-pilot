import { taskContext } from "@/contexts/taskContext/TaskContext";
import { useContext } from "react";

export function useTask() {
    const context = useContext(taskContext)

    if (!context) {
        throw new Error("useTask must be add inside taskContext")
    }

    return context
}