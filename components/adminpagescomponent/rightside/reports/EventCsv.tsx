import { useEventReport } from "@/contexts/eventcontext/EventContext";
import { useAppSelector } from "@/hooks/reduxhooks";
import { RiFilePdf2Line } from "@remixicon/react";
import { currentMonth } from "./TaskShowReport";

export default function EventCSV() {
    const { eventReport } = useEventReport()
    const { eventstartDate, eventendDate } = useAppSelector((state) => state.filterEvent)

    const dateRange = eventstartDate || eventendDate ? `${eventstartDate} - ${eventendDate}` : `${currentMonth} - Onward`
    const exportCsv = () => {
        if (!eventReport) return

        const row = [
            [dateRange],
            ['Metric', 'Count'],
            ['Total Event', eventReport.totalEvent],
            ['Total Personal Meeting', eventReport.totalPersonalMeeting],
            ['Total Project Meeting', eventReport.totalProjectMeeting],
            ['Total Deadline', eventReport.totalDeadLine],
        ]

        const csvContext = row.map((elem) =>
            elem.map((value) => {
                const text = String(value ?? '')

                return `"${text.replace(/"/g, '""')}"`
            }).join(',')
        ).join("\r\n")

        const blob = new Blob(['\uFEFF', csvContext], {
            type: "text/csv;charset=utf-8;",
        })

        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')

        link.href = url
        link.download = 'flowpilot-team-report.csv'
        link.click()

        URL.revokeObjectURL(url);

    }

    return (
        <button onClick={exportCsv} className="flex items-center gap-3 border border-[#252938] hover:border-[#252976] rounded text-sm text-gray-300 w-[40%] py-3 justify-center">
            <RiFilePdf2Line className="w-4 h-4 text-gray-400" />
            Export CSV
        </button>
    )
}