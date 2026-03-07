import { motion } from 'framer-motion';
import type { CampaignBrief } from '../../../types/campaign';

interface StepProps {
    brief: CampaignBrief;
    update: (updates: Partial<CampaignBrief>) => void;
    next: () => void;
}

export default function Step1Business({ brief, update, next }: StepProps) {
    const isValid = brief.business_name.length > 2 && brief.budget_gbp > 0;

    return (
        <div className="flex flex-col items-center justify-center w-full space-y-12">
            <h2 className="text-3xl font-satoshi font-bold tracking-tight text-center max-w-xl">
                What's your budget and what do you sell?
            </h2>

            <div className="w-full max-w-md space-y-8">
                {/* Business Name */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70">Business Name</label>
                    <input
                        type="text"
                        placeholder="e.g. Acme Shoes"
                        value={brief.business_name}
                        onChange={(e) => update({ business_name: e.target.value })}
                        className="w-full bg-[#141414] border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] transition-colors"
                        autoFocus
                    />
                </div>

                {/* Budget */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70">Total Campaign Budget (£)</label>
                    <input
                        type="number"
                        placeholder="e.g. 5000"
                        value={brief.budget_gbp || ''}
                        onChange={(e) => update({ budget_gbp: parseInt(e.target.value) || 0 })}
                        className="w-full bg-[#141414] border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] transition-colors"
                    />
                </div>

                {/* Product Description */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70">What are you advertising? (Optional)</label>
                    <textarea
                        placeholder="Describe the product or service..."
                        value={brief.product_description}
                        onChange={(e) => update({ product_description: e.target.value })}
                        className="w-full bg-[#141414] border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] transition-colors min-h-[100px] resize-none"
                    />
                </div>

                {/* Next Button */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={next}
                    disabled={!isValid}
                    className={`w-full py-4 rounded-lg font-medium tracking-wide transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] ${isValid
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
