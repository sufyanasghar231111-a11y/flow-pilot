
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Segment } from "./ProjectStatusDistribution";

export default function TaskDonut({ data, total }: { data: Segment[], total: number }) {
    return (
        <>
            <ResponsiveContainer width='100%' height='100%'>
                <PieChart>
                    <Pie data={data} dataKey='value' nameKey='label' innerRadius='65%' outerRadius='88%' startAngle={90} endAngle={-270}>
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
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                    <p className="text-md font-bold">{total || 0}</p>
                    <p className="text-[10px] text-muted-foreground text-gray-300">Total Tasks</p>
                </div>
            </div>
        </>
    )
}