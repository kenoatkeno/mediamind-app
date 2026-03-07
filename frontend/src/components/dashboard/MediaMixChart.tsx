import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface Allocation {
    channel: string;
    percentage: number;
    budget_gbp: number;
    rationale: string;
}

interface ChartProps {
    allocation: Allocation[];
}

// Map the 5 global chart tokens to Recharts cells
const COLORS = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
    'hsl(var(--chart-5))'
];

export default function MediaMixChart({ allocation }: ChartProps) {

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-[#1A1A1A] border border-[#0F766E]/50 p-4 rounded-lg shadow-xl outline-none">
                    <p className="font-satoshi font-bold text-white mb-2">{data.channel}</p>
                    <div className="space-y-1">
                        <p className="text-sm text-white/80">Allocation: <span className="font-semibold">{data.percentage}%</span></p>
                        <p className="text-sm text-white/80">Budget: <span className="font-semibold text-[#0F766E]">£{data.budget_gbp.toLocaleString()}</span></p>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={allocation}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="percentage"
                        stroke="none"
                        animationBegin={200}
                        animationDuration={1500}
                        animationEasing="ease-out"
                    >
                        {allocation.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        content={<CustomTooltip />}
                        cursor={{ fill: 'transparent' }}
                        wrapperStyle={{ outline: 'none' }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
