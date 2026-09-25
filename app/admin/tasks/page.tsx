
import AdminNav from "@/components/adminpagescomponent/nav/AdminNav";
import KanbanBoard from "@/components/adminpagescomponent/rightside/tasks/KanbanBoard";
import TaskHeader from "@/components/adminpagescomponent/rightside/tasks/TaskHeader";

export default function Tasks() {
    return (
        <div className="w-full h-full ">
            <AdminNav />
            <TaskHeader />
            <KanbanBoard />
        </div>
    )
}