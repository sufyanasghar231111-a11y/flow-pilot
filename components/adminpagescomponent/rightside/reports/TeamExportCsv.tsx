import { useTeamReport } from "@/contexts/teamContext/TeamContext";
import { useAppSelector } from "@/hooks/reduxhooks";
import { RiFilePdf2Line } from "@remixicon/react";
import { currentMonth } from "./TaskShowReport";

export default function TeamExportCSV() {
    const { teamReport } = useTeamReport()
    const { teamStartDate, teamEndDate } = useAppSelector((state) => state.filterTeam)

    const csvExport = () => {
        if (!teamReport) return

        const dateRange = teamStartDate || teamEndDate ? `${teamStartDate} - ${teamEndDate}` : `${currentMonth} - Onward`

        const row = [
            [dateRange, ''],
            ['Metric', 'Count'],
            ['Total Member', teamReport.totalMember],
            ['Members With Tasks', teamReport.memberWithTask],
            ['Members Without Tasks', teamReport.memberWithOutTask],
            ['Assigned Tasks', teamReport.totalTask],
        ]

        const csvContent = row.map((elem) =>
            elem.map((value) => {
                const text = String(value ?? '')
                return `"${text.replace(/"/g, '""')}"`
            }
            ).join(",")
        ).join("\r\n")

        const blob = new Blob(['\uFEFF', csvContent], {
            type: "text/csv;charset=utf-8;",
        })

        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')

        link.href = url;
        link.download = "flowpilot-team-report.csv"
        link.click();

        URL.revokeObjectURL(url)

    }

    return (
        <button onClick={csvExport} className="flex items-center gap-3 border hover:border-[#252976] border-[#252938] rounded text-sm text-gray-300 w-[40%] py-2.5 justify-center">
            <RiFilePdf2Line className="w-4 h-4 text-gray-400" />
            Export CSV
        </button>
    )
}