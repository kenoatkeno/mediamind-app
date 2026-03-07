import { Zap } from 'lucide-react';

interface TierProps {
    planCount: number;
    maxPlans: number;
    tierName: string;
}

export default function PlanLimitIndicator({ planCount, maxPlans, tierName }: TierProps) {
    const isAtLimit = planCount >= maxPlans;

    return (
        <div className="flex items-center gap-4 bg-[#141414] border border-[#1A1A1A] px-4 py-2 rounded-lg text-sm">
            <div className="flex items-center gap-2 border-r border-[#333] pr-4">
                <div className={`w-2 h-2 rounded-full ${tierName === 'Free' ? 'bg-white/40' : 'bg-[#0F766E]'}`} />
                <span className="font-medium text-white/80">{tierName} Tier</span>
            </div>

            <div className="flex items-center gap-3">
                <span className={`font-mono ${isAtLimit ? 'text-amber-500' : 'text-white/60'}`}>
                    {planCount} / {maxPlans} Plans
                </span>

                {tierName === 'Free' && (
                    <button className="flex items-center gap-1 text-amber-500 hover:text-amber-400 transition-colors font-medium">
                        <Zap size={14} fill="currentColor" /> Upgrade
                    </button>
                )}
            </div>
        </div>
    );
}
