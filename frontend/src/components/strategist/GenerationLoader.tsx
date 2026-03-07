import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { CampaignBrief } from '../../types/campaign';

interface LoaderProps {
    brief: CampaignBrief;
}

export default function GenerationLoader({ brief }: LoaderProps) {
    const navigate = useNavigate();

    useEffect(() => {
        // Here is where we will actually call the generated-plan edge function via InsForge
        // For right now, we just simulate a 4-second loading delay so the design can be reviewed.
        console.log("Submitting brief:", brief);

        const timer = setTimeout(() => {
            console.log("Plan generation mocked complete.");
            navigate('/app/plan/test-id');
        }, 4000);

        return () => clearTimeout(timer);
    }, [brief, navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] w-full space-y-8">
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 1, 0.5]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="w-24 h-24 rounded-full border-4 border-[#0F766E] border-t-transparent animate-spin"
            />

            <div className="space-y-3 text-center">
                <h2 className="text-2xl font-satoshi font-bold">
                    The Strategist is thinking...
                </h2>
                <p className="text-white/60 text-sm max-w-sm mx-auto">
                    Analysing demographic data, {brief.budget_gbp ? `allocating £${brief.budget_gbp.toLocaleString()}` : 'calculating budget splits'}, and reviewing 10 UK channels for maximum impact.
                </p>
            </div>
        </div>
    );
}
