import { useAppSelector } from "@/hooks/reduxhooks";
import AllProjectDetail from "../../project/AllProjectDetail";
import ProjectTabHeader from "../ProjectTabHeader";
import ProjectShowReport from "../ProjectShowReport";

export default function ProjectTab() {
    const showReport = useAppSelector((state) => state.showReport.showReport)
    return (
        <div className="bg-[#11131D] w-full h-full px-4">
            <ProjectTabHeader />
            {
                showReport ? (<ProjectShowReport />) : (<AllProjectDetail data='hello' report='report' />)
            }

        </div>
    )
}