import { motion } from 'framer-motion';
import type { CampaignBrief } from '../../../types/campaign';
import { ArrowLeft } from 'lucide-react';

interface StepProps {
    brief: CampaignBrief;
    update: (updates: Partial<CampaignBrief>) => void;
    next: () => void;
    prev: () => void;
}

export default function Step4Timing({ brief, update, next, prev }: StepProps) {
    const isValid = brief.start_date !== '' && brief.end_date !== '';

    return (
        <div className="flex flex-col items-center justify-center w-full space-y-12">

            <button
                onClick={prev}
                className="absolute -top-16 left-0 text-white/40 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
            >
                <ArrowLeft size={16} /> Back
            </button>

            <h2 className="text-3xl font-satoshi font-bold tracking-tight text-center max-w-xl">
                When do you want to run it?
            </h2>

            <div className="w-full max-w-md space-y-10">

                <div className="grid grid-cols-2 gap-6">
                    {/* Start Date */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/70">Start Date</label>
                        <input
                            type="date"
                            value={brief.start_date}
                            onChange={(e) => update({ start_date: e.target.value })}
                            className="w-full bg-[#141414] border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] transition-colors [color-scheme:dark]"
                        />
                    </div>

                    {/* End Date */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/70">End Date</label>
                        <input
                            type="date"
                            value={brief.end_date}
                            onChange={(e) => update({ end_date: e.target.value })}
                            className="w-full bg-[#141414] border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] transition-colors [color-scheme:dark]"
                        />
                    </div>
                </div>

                {/* Duration Hint */}
                {isValid && (
                    <div className="text-center text-sm text-[#0F766E] bg-[#0F766E]/10 py-3 rounded-lg border border-[#0F766E]/20">
                        {calculateDays(brief.start_date, brief.end_date)} days total duration
                    </div>
                )}


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

function calculateDays(start: string, end: string) {
    const s = new Date(start);
    const e = new Date(end);
    const diffTime = Math.abs(e.getTime() - s.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
