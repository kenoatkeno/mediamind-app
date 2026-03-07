import { motion } from 'framer-motion';

interface Allocation {
    channel: string;
    percentage: number;
    budget_gbp: number;
    rationale: string;
}

interface CardProps {
    alloc: Allocation;
    index: number;
}

const BORDER_COLORS = [
    'border-[hsl(var(--chart-1))]',
    'border-[hsl(var(--chart-2))]',
    'border-[hsl(var(--chart-3))]',
    'border-[hsl(var(--chart-4))]',
    'border-[hsl(var(--chart-5))]'
];

// Simple heuristic to check if a channel generally requires an agency (will rely on actual data later)
const requiresAgency = (channel: string) => {
    const broadcast = ['Linear TV', 'Commercial Radio', 'DOOH (Digital Outdoor)'];
    return broadcast.includes(channel);
};

export default function ChannelCard({ alloc, index }: CardProps) {
    const borderColorClass = BORDER_COLORS[index % BORDER_COLORS.length];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className={`bg-[#141414] rounded-xl p-5 border-t-[3px] border-x border-b border-x-[#1A1A1A] border-b-[#1A1A1A] ${borderColorClass} flex flex-col justify-between h-full hover:-translate-y-1 transition-transform`}
        >
            <div>
                <div className="flex justify-between items-start mb-4">
                    <h4 className="font-satoshi font-bold text-lg max-w-[70%]">{alloc.channel}</h4>
                    {requiresAgency(alloc.channel) && (
                        <span className="text-[10px] font-bold tracking-wider uppercase bg-amber-500/10 text-amber-500 px-2 py-1 rounded">
                            Agency Req
                        </span>
                    )}
                </div>

                <p className="text-sm text-white/50 leading-relaxed mb-6">
                    {alloc.rationale}
                </p>
            </div>

            <div className="flex items-end justify-between mt-auto">
                <div className="flex items-center gap-2">
                    {/* Suitability dots purely visual for now */}
                    <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-[#0F766E]"></div>
                        <div className="w-2 h-2 rounded-full bg-[#0F766E]"></div>
                        <div className="w-2 h-2 rounded-full bg-[#0F766E]"></div>
                        <div className="w-2 h-2 rounded-full bg-[#333]"></div>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-3xl font-satoshi font-bold text-[#0F766E] leading-none mb-1">
                        {alloc.percentage}%
                    </p>
                    <p className="text-xs text-white/40 font-medium">
                        £{alloc.budget_gbp.toLocaleString()}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
