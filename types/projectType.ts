
export type ProjectStatsType = {
    totalCounts: number;
    totalActive: number;
    totalComplete: number;
    totalPending: number;
    totalCancelled: number;
    newProject: number;
    newActiveTask: number;
    newCompleted: number;
    newPending: number
}


export type ProjectStatType = {
    name: string;
    description: string;
    startDate: string;
    deadline: string;
}

export type UpdatePropType = {
    id?:string,
     name: string; description: string; deadline: string; startDate: string; status: string
}

export type ProjectType = {
    projectStats: ProjectStatsType;
    getProject: [];
    handleProjectChange: (e: { target: { name: string; value: string; }; }) => void;
    project: ProjectStatType;
    setProject: React.Dispatch<React.SetStateAction<ProjectStatType>>;
    ProjectCreation: (e: { preventDefault: () => void; }) => void;
    getAllProject: () => void;
    singleProjectData: UpdatePropType | null;
    getSingleProject: (id: string) => void;
}