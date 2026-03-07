import { motion } from 'framer-motion';
import type { CampaignBrief } from '../../../types/campaign';
import { ArrowLeft } from 'lucide-react';

interface StepProps {
    brief: CampaignBrief;
    update: (updates: Partial<CampaignBrief>) => void;
    next: () => void;
    prev: () => void;
}

const KPIS = [
    'Return on Ad Spend (ROAS)',
    'Cost per Acquisition (CPA)',
    'Total Conversions',
    'Click-Through Rate (CTR)',
    'Reach & Impressions',
    'Website Traffic'
];

export default function Step3Objective({ brief, update, next, prev }: StepProps) {
    const isValid = brief.kpis.length > 0;

    const toggleKpi = (kpi: string) => {
        const ranges = brief.kpis.includes(kpi)
            ? brief.kpis.filter((k) => k !== kpi)
            : [...brief.kpis, kpi];
        update({ kpis: ranges });
    };

    return (
        <div className="flex flex-col items-center justify-center w-full space-y-12">

            <button
                onClick={prev}
                className="absolute -top-16 left-0 text-white/40 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
            >
                <ArrowLeft size={16} /> Back
            </button>

            <h2 className="text-3xl font-satoshi font-bold tracking-tight text-center max-w-xl">
                What do you want this campaign to achieve?
            </h2>

            <div className="w-full max-w-md space-y-10">
                {/* Objective Type */}
                <div className="space-y-4">
                    <label className="text-sm font-medium text-white/70">Primary Goal</label>
                    <div className="grid grid-cols-2 gap-4">
                        {(['brand_awareness', 'performance'] as const).map((type) => {
                            const selected = brief.campaign_objective === type;
                            const label = type === 'brand_awareness' ? 'Brand Awareness' : 'Sales / Performance';
                            return (
                                <button
                                    key={type}
                                    onClick={() => update({ campaign_objective: type })}
                                    className={`py-4 rounded-xl border transition-all text-sm font-medium ${selected
                                        ? 'bg-[#0F766E]/20 border-[#0F766E] text-[#0F766E]'
                                        : 'bg-[#141414] border-[#333] text-white/60 hover:border-[#666]'
                                        }`}
                                >
                                    {label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* KPIs */}
                <div className="space-y-4">
                    <label className="text-sm font-medium text-white/70">Key Performance Indicators (Pick 1-3)</label>
                    <div className="flex flex-col gap-2">
                        {KPIS.map((kpi) => {
                            const selected = brief.kpis.includes(kpi);
                            return (
                                <button
                                    key={kpi}
                                    onClick={() => toggleKpi(kpi)}
                                    className={`px-4 py-3 text-left rounded-lg border transition-all text-sm font-medium ${selected
                                        ? 'bg-[#0F766E]/20 border-[#0F766E] text-white'
                                        : 'bg-[#141414] border-[#333] text-white/60 hover:border-[#666]'
                                        }`}
                                >
                                    {kpi}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Next Button */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={next}
                    disabled={!isValid}
                    className={`w-full py-4 rounded-lg font-medium tracking-wide transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] mt-8 ${isValid
                        ? 'bg-[#0F766E] text-white hover:bg-[#0d6b63]'
                        : 'bg-[#1A1A1A] text-white/40 cursor-not-allowed border border-[#333]'
                        }`}
                >
                    Continue
                </motion.button>
            </div>
        </div>
    );
}
