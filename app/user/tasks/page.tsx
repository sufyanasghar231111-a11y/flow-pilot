import AllTaskDetail from "@/components/userpagecomponent/userrightside/tasks/AllTaskDetail";
import TaskHeader from "@/components/userpagecomponent/userrightside/tasks/TaskHeader";
import UserNav from "@/components/userpagecomponent/userrightside/UserNav";

export default function MyTasks() {
    return (
        <div className="w-full h-full">
            <UserNav />
            <TaskHeader />
            <AllTaskDetail />
        </div>
    )
}