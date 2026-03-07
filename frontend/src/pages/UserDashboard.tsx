import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import PlanLimitIndicator from '../components/dashboard/PlanLimitIndicator';
import PlanCard from '../components/dashboard/PlanCard';
import EmptyState from '../components/dashboard/EmptyState';

// Dummy data to mock the InsForge database response
const MOCK_PLANS = [
    {
        id: 'test-id-1',
        campaignName: 'Acme Shoes Q4 Push',
        dateGenerated: '2 days ago',
        totalBudget: 10000,
        channelCount: 3,
    },
    {
        id: 'test-id-2',
        campaignName: 'Brand Awareness 2026',
        dateGenerated: '1 week ago',
        totalBudget: 45000,
        channelCount: 5,
    }
];

export default function UserDashboard() {
    // In M3/M4, this state will be populated via a useEffect fetching from InsForge
    const [plans] = useState(MOCK_PLANS);
    // Mock user tier
    const userTier = 'Free';
    const maxPlans = userTier === 'Free' ? 1 : 5; // Hardcoding limits for demo

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white p-6 md:p-12">
            <div className="max-w-5xl mx-auto">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-3xl font-satoshi font-bold text-white mb-2">Your Media Plans</h1>
                        <p className="text-white/60">View, manage, and duplicate your generated campaign strategies.</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <PlanLimitIndicator
                            planCount={plans.length}
                            maxPlans={maxPlans}
                            tierName={userTier}
                        />

                        <Link
                            to="/app/new-plan"
                            className="bg-[#0F766E] hover:bg-[#0D655D] text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] flex items-center gap-2"
                        >
                            <Plus size={18} /> New Plan
                        </Link>
                    </div>
                </div>

                {/* Content Section */}
                <main>
                    {plans.length === 0 ? (
                        <EmptyState />
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {plans.map((plan, index) => (
                                <PlanCard
                                    key={plan.id}
                                    id={plan.id}
                                    campaignName={plan.campaignName}
                                    dateGenerated={plan.dateGenerated}
                                    totalBudget={plan.totalBudget}
                                    channelCount={plan.channelCount}
                                    index={index}
                                />
                            ))}
                        </div>
                    )}
                </main>

            </div>
        </div>
    );
}
