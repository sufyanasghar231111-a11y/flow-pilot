import { useAppSelector } from "@/hooks/reduxhooks";
import AllTeamDetail from "../../team/AllTeamDetail";
import TeamTabHeader from "../TeamTabHeader";
import TeamShowReport from "../TeamShowReport";

export default function TeamTab() {
    const { showTeamReport } = useAppSelector((state) => state.showTeamReport)
    return (
        <div className="bg-[#11131D] w-full h-full ">
            <TeamTabHeader />
            {
                showTeamReport ? (<div className="pb-3"> <TeamShowReport /></div>) : <AllTeamDetail page='prop' />
            }

        </div>
    )
}