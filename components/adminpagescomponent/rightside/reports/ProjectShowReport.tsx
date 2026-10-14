
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import ReportData from "./ReportData";
import ReportDountData from "./ReportDountData";
import { RiCloseLine } from "@remixicon/react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks";
import { setShowReport } from "@/store/slices/reportSlice";
import { TimeAgo } from "@/utils/TimeAgo";
import ExportCSV from "./ExportCsv";
import ExportPDF from "./ExportPDF";
import { useRef } from "react";

const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.length) return null;

    const { label, value, color } = payload[0].payload;
    return (
        <div className="px-3 py-2 rounded-md border border-[#252938] bg-[#222635] shadow-lg">
            <div className="flex items-center gap-2">
                <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: color }}
                />
                <span className="text-sm text-gray-300">{label}</span>
            </div>
            <div className="pt-1 text-lg font-semibold text-white">
                {value} <span className="text-xs font-normal text-gray-400">projects</span>
            </div>
        </div>
    );
};

export default function ProjectShowReport() {
    const printRef = useRef<HTMLDivElement>(null)
    const data1 = ReportData()
    const data = ReportDountData()
    const dispatch = useAppDispatch()
    const { startDate, endDate } = useAppSelector((state) => state.filterData)
    const now = new Date()
    const currentMonth = new Date(
        now.getFullYear(),
        now.getMonth(),
        1
    )

    const sum = data.reduce((acc, project) => acc + project.value, 0)

    const handleDownload = async () => {
        const element = printRef.current;
        if (!element) return;

        const html2canvas = (await import("html2canvas-pro")).default;
        const { default: jsPDF } = await import("jspdf");

        const canvas = await html2canvas(element, {
            scale: 2,
            backgroundColor: "#171A26",
        });

        const pdf = new jsPDF({
            unit: "in",
            format: "letter",
            orientation: "landscape",
        });

        const margin = 0.4;
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = pageWidth - margin * 2;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        const image = canvas.toDataURL("image/jpeg", 0.98);
        let remainingHeight = imgHeight;
        let position = margin;

        pdf.addImage(image, "JPEG", margin, position, imgWidth, imgHeight);
        remainingHeight -= pageHeight - margin * 2;

        while (remainingHeight > 0) {
            position = margin - (imgHeight - (imgHeight - remainingHeight));
            pdf.addPage();
            pdf.addImage(image, "JPEG", margin, position, imgWidth, imgHeight);
            remainingHeight -= pageHeight - margin * 2;
        }

        pdf.save("flowpilot-project-report.pdf");
    };

    return (
        <div className="py-3">
            <div className="rounded-md border border-[#252938] bg-[#171A26]">
                <div ref={printRef} className="px-5 py-3">
                    <div className="flex items-center justify-between">
                        <div className="text-xl ">
                            <h1 className="font-semibold">Generate report</h1>
                            <h1 className="text-[11px] text-gray-400">{startDate || endDate ? (<><TimeAgo time={startDate} /> - <TimeAgo time={endDate} /></>) : (<><TimeAgo time={currentMonth} /> - Onward</>)}</h1>
                        </div>
                        <div className="text-sm text-gray-400 flex items-center gap-6">Total projects: 9 <div onClick={() => { dispatch(setShowReport(false)) }} className="p-1.5 rounded-full hover:bg-gray-700 cursor-pointer transition-all duration-300"><RiCloseLine className="w-5 h-5" /></div></div>
                    </div>
                    <div className="flex flex-wrap gap-3 pt-6 pb-3">
                        {
                            data1.map((elem, index) => {
                                const Icon = elem.icon
                                return <div key={index} className={`w-[185px] px-8 py-3 rounded-md border ${elem.hover} `}>
                                    <div className="flex items-center gap-2">
                                        <Icon className={`w-4 h-4 ${elem.text}`} />
                                        <h1 className={`text-sm ${elem.text}`}>{elem.label}</h1>
                                    </div>
                                    <div className={`text-2xl ${elem.text}`}>
                                        {elem.value}
                                        {
                                            elem.percentage !== '' && (
                                                <span className="text-xs text-gray-400 pl-2">{elem.percentage || 0}% </span>
                                            )
                                        }

                                    </div>
                                </div>
                            })
                        }

                    </div>
                    <div className="flex justify-center  gap-3 py-3 ">
                        <div className="w-[40%] p-3 rounded-md h-72.5 border-[#252938] hover:border-[#252976] bg-[#171A26] border relative">
                            <div className="w-full h-full">
                                <ResponsiveContainer width='100%' height='100%'>
                                    <PieChart>
                                        <Pie data={data} dataKey='value' nameKey='label' innerRadius='60%' outerRadius='88%' startAngle={90} endAngle={-270}>
                                            {data.map((d, i) => (
                                                <Cell
                                                    key={i}
                                                    fill={d.color}
                                                    stroke="none"
                                                />
                                            ))}

                                        </Pie>
                                        <Tooltip contentStyle={{
                                            background: "#1f2335",
                                            border: "1px solid #252938",
                                            borderRadius: 6,
                                            fontSize: "12px",
                                        }}
                                            labelStyle={{ color: "#fff" }}
                                            wrapperStyle={{ zIndex: 1000 }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className=' absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center'>
                                <h1 className="text-xl font-semibold">{sum}</h1>
                                <h1 className="text-xs text-gray-300">Total Projects</h1>
                            </div>
                        </div>
                        <div className="w-[45%] rounded-md border border-[#252938] hover:border-[#252976] bg-[#171A26] px-3 py-3">
                            <div className="flex items-center justify-between pb-4">
                                {
                                    data.map((elem, index) => {
                                        return <div key={index} className="flex items-center gap-1">
                                            <span style={{ backgroundColor: elem.color }} className={"w-2 h-2"}></span>
                                            <h1 className="text-xs text-gray-300">{elem.label} {elem.percentage}%</h1>
                                        </div>
                                    })
                                }
                            </div>
                            <div className="w-full h-[230px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#252938" vertical={false} />
                                        <XAxis
                                            dataKey="label"
                                            stroke="#9ca3af"
                                            tickLine={false}
                                            axisLine={false}
                                            fontSize={12}
                                        />
                                        <YAxis
                                            stroke="#9ca3af"
                                            tickLine={false}
                                            axisLine={false}
                                            allowDecimals={false}
                                            fontSize={12}
                                        />
                                        <Tooltip
                                            cursor={{ fill: "rgba(255,255,255,0.05)" }}
                                            content={<CustomTooltip />}
                                        />
                                        <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={56}>
                                            {data.map((item) => (
                                                <Cell key={item.label} fill={item.color} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-3 px-5 pb-3">
                    <ExportCSV />
                    <ExportPDF handleDownload={handleDownload} />
                </div>
            </div>
        </div>
    )
}