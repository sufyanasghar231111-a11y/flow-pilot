import { useEvent } from "@/contexts/eventcontext/EventContext";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, TooltipProps } from "recharts";

type Segment = {
    label: string;
    value: number;
    color: string;
};

export default function EventSummary() {
    const { eventStat } = useEvent()

    const data: Segment[] = [
        { label: 'Total Event', value: eventStat.totalEvent, color: '#3B82F6' },
        { label: 'Project Meeting', value: eventStat.totalPersonalMeeting, color: '#A855F7' },
        { label: 'Deadlines', value: eventStat.totalDeadLine, color: '#EF4444' },
        { label: 'Personal Meeting', value: eventStat.totalPersonalMeeting, color: '#22C55E' },
    ]

    const CustomTooltip = ({ active, payload }: any) => {
        if (!active || !payload?.length) return null;
        const { label, value, color } = payload[0].payload;

        return (
            <div style={{ borderColor: color }} className={`rounded-md border bg-[#252938] px-3 py-2 text-sm shadow`}>
                <span
                    className="mr-2 inline-block h-2 w-2 rounded-full"
                    style={{ background: color }}
                />
                {label}: <b>{value}</b>
            </div>
        );
    };


    return (
        <div className="bg-[#252938] w-full rounded-md">
            <h1 className="text-md font-semibold px-4 py-2">
                Event Summary
            </h1>

            <div className="flex flex-col items-center px-2 pb-2">

                
                <div className="w-full h-40">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="label"
                                innerRadius="65%"
                                outerRadius="88%"
                                startAngle={90}
                                endAngle={-270}
                            >
                                {data.map((d, i) => (
                                    <Cell
                                        key={i}
                                        fill={d.color}
                                        stroke="none"
                                    />
                                ))}
                            </Pie>

                            <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="w-full grid grid-cols-2 gap-3 mt-2">
                    {data.map((elem: Segment, index: number) => (
                        <div key={index}>
                            <div className="flex items-center gap-1.5">
                                <span
                                    style={{ backgroundColor: elem.color }}
                                    className="w-2.5 h-2.5 rounded-full shrink-0"
                                />

                                <h1 className="text-[12px]">
                                    {elem.label}
                                </h1>
                            </div>

                            <div className="text-[11px] flex items-center justify-center font-semibold">
                                {elem.value}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}