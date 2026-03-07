import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Play } from 'lucide-react';

// Stub components (to be built)
import SeasonalityBanner from '../components/dashboard/SeasonalityBanner';
import MediaMixChart from '../components/dashboard/MediaMixChart';
import ChannelCard from '../components/dashboard/ChannelCard';
import AllocationSliders from '../components/dashboard/AllocationSliders';
import BroadcastReadinessPanel from '../components/dashboard/BroadcastReadinessPanel';
import DownloadPDFButton from '../components/dashboard/DownloadPDFButton';

// Mock data based on the Gemini generate-plan schema
const MOCK_PLAN = {
    campaign_name: "Acme Shoes Q4 Push",
    total_budget_gbp: 10000,
    allocation: [
        { channel: "Meta (Facebook/Instagram)", percentage: 45, budget_gbp: 4500, rationale: "Strong for 25-44 apparel sales with high ROAS." },
        { channel: "Google Search", percentage: 35, budget_gbp: 3500, rationale: "Captures high-intent lower-funnel shoe queries." },
        { channel: "TikTok", percentage: 20, budget_gbp: 2000, rationale: "Reaches the younger 25-34 segment effectively." }
    ],
    overlaps_q4: true,
    requires_agency: false,
    contains_broadcast: false,
    overall_rationale: "This mix heavily biases digital performance channels to drive immediate ROAS for Acme Shoes, leveraging Meta for visual discovery, Google for intent, and TikTok for younger audience engagement."
};

export default function ResultsDashboard() {
    // URL id will be used later when connecting to InsForge
    const [plan, setPlan] = useState(MOCK_PLAN);

    // This function will be passed to AllocationSliders to handle the auto-redistribution logic
    const handleSliderChange = (channelName: string, newPercentage: number) => {
        setPlan(prev => {
            const index = prev.allocation.findIndex(a => a.channel === channelName);
            if (index === -1) return prev;

            const oldPercentage = prev.allocation[index].percentage;
            const difference = newPercentage - oldPercentage;

            // If there's only one channel, it must be 100%
            if (prev.allocation.length === 1) {
                const newAlloc = [...prev.allocation];
                newAlloc[0].percentage = 100;
                newAlloc[0].budget_gbp = prev.total_budget_gbp;
                return { ...prev, allocation: newAlloc };
            }

            // Distribute the difference proportionally among the OTHER channels
            const otherSum = 100 - oldPercentage;

            let newAlloc = prev.allocation.map((alloc, i) => {
                if (i === index) {
                    return {
                        ...alloc,
                        percentage: newPercentage,
                        budget_gbp: (newPercentage / 100) * prev.total_budget_gbp
                    };
                }

                // If the other channels previously summed to 0 (which shouldn't happen, but just in case),
                // split evenly. Otherwise, scale proportionally.
                const fractionOfOthers = otherSum > 0 ? alloc.percentage / otherSum : 1 / (prev.allocation.length - 1);

                // New percentage = old percentage - (fraction of the difference we are taking/adding)
                let adjustedObjPercentage = alloc.percentage - (difference * fractionOfOthers);

                // Handle edge case where proportional subtraction pushes a channel below 0
                if (adjustedObjPercentage < 0) adjustedObjPercentage = 0;

                return {
                    ...alloc,
                    percentage: Number(adjustedObjPercentage.toFixed(1)),
                    budget_gbp: Math.round((adjustedObjPercentage / 100) * prev.total_budget_gbp)
                };
            });

            // Normalise to ensure it perfectly sums to 100 (handling floating point rounding errors)
            const sum = newAlloc.reduce((acc, curr) => acc + curr.percentage, 0);
            if (sum !== 100) {
                const largestOtherIndex = newAlloc.findIndex((_, i) => i !== index);
                if (largestOtherIndex !== -1) {
                    const diff = 100 - sum;
                    newAlloc[largestOtherIndex].percentage = Number((newAlloc[largestOtherIndex].percentage + diff).toFixed(1));
                    newAlloc[largestOtherIndex].budget_gbp = Math.round((newAlloc[largestOtherIndex].percentage / 100) * prev.total_budget_gbp);
                }
            }

            return { ...prev, allocation: newAlloc };
        });
    };

    return (
        <div className="bg-[#0A0A0A] min-h-screen text-[#F8F8F8] pb-24">

            {plan.overlaps_q4 && <SeasonalityBanner />}

            <div className="max-w-6xl mx-auto px-6 pt-12">

                {/* Header Sequence */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                    <div className="space-y-4">
                        <Link to="/app/new-plan" className="inline-flex items-center text-white/50 hover:text-white transition-colors text-sm font-medium">
                            <ArrowLeft size={16} className="mr-2" /> Back to Strategist
                        </Link>
                        <h1 className="text-4xl text-white font-satoshi font-bold tracking-tight">
                            {plan.campaign_name}
                        </h1>
                        <p className="text-white/60 text-lg max-w-2xl">
                            {plan.overall_rationale}
                        </p>
                    </div>

                    <div className="flex flex-col items-end gap-3 shrink-0">
                        <div className="text-right">
                            <p className="text-sm text-white/50 uppercase tracking-widest font-medium mb-1">Total Budget</p>
                            <p className="text-3xl font-satoshi font-bold text-[#0F766E]">£{plan.total_budget_gbp.toLocaleString()}</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <DownloadPDFButton plan={plan} isFreeTier={true} />

                            <div className="relative group">
                                <button disabled className="bg-[#141414] border border-[#333] text-white/40 px-6 py-3 rounded-lg flex items-center gap-2 cursor-not-allowed font-medium">
                                    <Play size={16} fill="currentColor" /> Deploy to Ad Accounts
                                </button>
                                {/* Tooltip implementation using Tailwind group-hover */}
                                <div className="absolute top-full right-0 mt-2 w-64 p-3 bg-[#1A1A1A] border border-[#0F766E]/30 text-xs text-white/80 rounded shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                                    This feature unlocks in Milestone 3: The Watchdog Agent.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left Column: Visuals & Adjustments */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="bg-[#141414] border border-[#1A1A1A] rounded-xl p-6">
                            <h3 className="text-xl font-satoshi font-bold mb-6">Media Mix</h3>
                            <MediaMixChart allocation={plan.allocation} />
                        </div>

                        <div className="bg-[#141414] border border-[#1A1A1A] rounded-xl p-6">
                            <h3 className="text-xl font-satoshi font-bold mb-6">Manual Adjustments</h3>
                            <p className="text-sm text-white/50 mb-6">Drag to override the AI recommendation. The plan will auto-rebalance to 100%.</p>
                            <AllocationSliders allocation={plan.allocation} onChange={handleSliderChange} />
                        </div>
                    </div>

                    {/* Right Column: Cards & Readiness */}
                    <div className="lg:col-span-7 space-y-4">
                        {plan.contains_broadcast && (
                            <BroadcastReadinessPanel />
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {plan.allocation.map((alloc, index) => (
                                <ChannelCard key={alloc.channel} alloc={alloc} index={index} />
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
