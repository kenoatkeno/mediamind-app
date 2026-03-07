import { AlertTriangle } from 'lucide-react';

interface Allocation {
    channel: string;
    percentage: number;
    budget_gbp: number;
    rationale: string;
}

interface SliderProps {
    allocation: Allocation[];
    onChange: (channel: string, newPercentage: number) => void;
}

export default function AllocationSliders({ allocation, onChange }: SliderProps) {

    // Sort allocations descending by percentage for UI stability
    const sortedAlloc = [...allocation].sort((a, b) => b.percentage - a.percentage);

    return (
        <div className="space-y-6">
            {sortedAlloc.map((alloc) => (
                <div key={alloc.channel} className="space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="font-medium text-white/90">{alloc.channel}</span>
                        <span className="font-satoshi text-[#0F766E] font-bold">{alloc.percentage.toFixed(1)}%</span>
                    </div>

                    <div className="relative w-full h-2 bg-[#1A1A1A] rounded-full overflow-hidden flex items-center">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            step="0.1"
                            value={alloc.percentage}
                            onChange={(e) => onChange(alloc.channel, Number(e.target.value))}
                            className="absolute w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        {/* Custom visual track since styling input[type=range] directly across browsers is painful */}
                        <div
                            className="h-full bg-[#0F766E] rounded-full pointer-events-none transition-all duration-100 ease-out"
                            style={{ width: `${alloc.percentage}%` }}
                        />
                    </div>

                    <div className="flex justify-between text-xs text-white/40">
                        <span>£{alloc.budget_gbp.toLocaleString()}</span>
                    </div>
                </div>
            ))}

            <div className="mt-6 pt-4 border-t border-[#1A1A1A] flex items-start gap-3 text-amber-500/80 text-xs">
                <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                <p>
                    Adjusting one channel automatically redistributes the remainder across your mix proportionally to mathematically maintain a 100% total. Total budget remains strictly fixed.
                </p>
            </div>
        </div>
    );
}
