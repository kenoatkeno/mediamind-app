import { motion } from 'framer-motion';
import type { CampaignBrief } from '../../../types/campaign';
import { ArrowLeft } from 'lucide-react';

interface StepProps {
    brief: CampaignBrief;
    update: (updates: Partial<CampaignBrief>) => void;
    next: () => void;
    prev: () => void;
}

const AGE_RANGES = ['16-24', '25-34', '35-44', '45-54', '55+'];

export default function Step2Audience({ brief, update, next, prev }: StepProps) {
    const isValid = brief.audience_age_ranges.length > 0 && brief.location.length > 2;

    const toggleAge = (age: string) => {
        const ranges = brief.audience_age_ranges.includes(age)
            ? brief.audience_age_ranges.filter((a) => a !== age)
            : [...brief.audience_age_ranges, age];
        update({ audience_age_ranges: ranges });
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
                Who are you trying to reach?
            </h2>

            <div className="w-full max-w-md space-y-10">
                {/* Age Ranges */}
                <div className="space-y-4">
                    <label className="text-sm font-medium text-white/70">Target Age Ranges</label>
                    <div className="flex flex-wrap gap-3">
                        {AGE_RANGES.map((age) => {
                            const selected = brief.audience_age_ranges.includes(age);
                            return (
                                <button
                                    key={age}
                                    onClick={() => toggleAge(age)}
                                    className={`px-4 py-2 rounded-full border transition-all text-sm font-medium ${selected
                                        ? 'bg-[#0F766E]/20 border-[#0F766E] text-[#0F766E]'
                                        : 'bg-[#141414] border-[#333] text-white/60 hover:border-[#666]'
                                        }`}
                                >
                                    {age}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70">Target Location (UK)</label>
                    <input
                        type="text"
                        placeholder="e.g. London, Nationwide, Manchester"
                        value={brief.location}
                        onChange={(e) => update({ location: e.target.value })}
                        className="w-full bg-[#141414] border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] transition-colors"
                    />
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
