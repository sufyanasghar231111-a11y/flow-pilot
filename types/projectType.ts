import { TaskState } from "@/contexts/taskContext/TaskContext";

export type ProjectStatsType = {
    totalCounts: number;
    totalActive: number;
    totalComplete: number;
    totalPending: number;
    totalCancelled: number;
    newProject: number;
    newActiveTask: number;
    newCompleted: number;
    newPending: number;
}


export type ProjectStatType = {
    name: string;
    description: string;
    startDate: string;
    deadline: string;
}


export type UpdatePropType = {

    id?: string,
    name: string;
    description: string;
    deadline: string;
    startDate: string;
    status: string;
    projectmembers?: {
        id: string
        user: {
            user: {
                username: string;
                id: string
            }
        }
    }[]
    tasks?: TaskState[];
    length?: number;
}

export type ProjectValue = {
    getProject: [];
    getAllProject: () => void;
    singleProjectData: UpdatePropType | null;
    getSingleProject: (id: string) => void;
    filterDate: string
}