import { motion } from 'framer-motion';
import type { CampaignBrief } from '../../../types/campaign';
import { ArrowLeft } from 'lucide-react';

interface StepProps {
    brief: CampaignBrief;
    update: (updates: Partial<CampaignBrief>) => void;
    prev: () => void;
    submit: () => void;
}

const ALL_CHANNELS = [
    'Meta (Facebook/Instagram)',
    'Google Search',
    'Google Display',
    'TikTok',
    'Spotify Audio',
    'YouTube',
    'LinkedIn',
    'X (Twitter)',
    'DOOH (Digital Outdoor)',
    'Linear TV',
    'Commercial Radio'
];

export default function Step5Channels({ brief, update, prev, submit }: StepProps) {
    const toggleChannel = (channel: string, type: 'preferred' | 'excluded') => {
        const list = type === 'preferred' ? brief.preferred_channels : brief.excluded_channels;
        const otherListType = type === 'preferred' ? 'excluded' : 'preferred';

        // Remove from the other list if it exists there
        if (brief[`${otherListType}_channels`].includes(channel)) {
            update({
                [`${otherListType}_channels`]: brief[`${otherListType}_channels`].filter((c) => c !== channel)
            });
        }

        const newRanges = list.includes(channel)
            ? list.filter((c) => c !== channel)
            : [...list, channel];

        update({ [`${type}_channels`]: newRanges });
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
                Any specific channels in mind?
            </h2>

            <div className="w-full max-w-2xl space-y-10">
                <p className="text-center text-white/60 text-sm">
                    Click once to <span className="text-[#0F766E] font-medium">Prefer</span>, twice to <span className="text-red-500 font-medium">Exclude</span>, and a third time to clear.
                </p>

                <div className="flex flex-wrap justify-center gap-3">
                    {ALL_CHANNELS.map((channel) => {
                        const isPreferred = brief.preferred_channels.includes(channel);
                        const isExcluded = brief.excluded_channels.includes(channel);

                        let stateClass = 'bg-[#141414] border-[#333] text-white/60 hover:border-[#666]';
                        if (isPreferred) stateClass = 'bg-[#0F766E]/20 border-[#0F766E] text-[#0F766E]';
                        if (isExcluded) stateClass = 'bg-red-500/10 border-red-500/50 text-red-500';

                        return (
                            <button
                                key={channel}
                                onClick={() => {
                                    if (isPreferred) toggleChannel(channel, 'excluded');
                                    else if (isExcluded) {
                                        // Clear both
                                        update({ excluded_channels: brief.excluded_channels.filter(c => c !== channel) });
                                    } else {
                                        toggleChannel(channel, 'preferred');
                                    }
                                }}
                                className={`px-4 py-3 rounded-xl border transition-all text-sm font-medium ${stateClass}`}
                            >
                                {channel} {isPreferred && '✓'} {isExcluded && '✕'}
                            </button>
                        );
                    })}
                </div>

                {/* Submit Button */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={submit}
                    className="w-full max-w-md mx-auto block py-4 rounded-lg font-medium tracking-wide transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] mt-8 bg-[#0F766E] text-white hover:bg-[#0d6b63]"
                >
                    Generate Media Plan
                </motion.button>
            </div>
        </div>
    );
}
