import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { CampaignBrief } from '../../types/campaign';

// Stub step components (will be fleshed out next)
import Step1Business from './steps/Step1Business';
import Step2Audience from './steps/Step2Audience';
import Step3Objective from './steps/Step3Objective';
import Step4Timing from './steps/Step4Timing';
import Step5Channels from './steps/Step5Channels';
import GenerationLoader from './GenerationLoader';

const initialBrief: CampaignBrief = {
    business_name: '',
    industry: '',
    product_description: '',
    campaign_objective: 'brand_awareness',
    audience_age_ranges: [],
    audience_gender: 'all',
    location: '',
    budget_gbp: 0,
    start_date: '',
    end_date: '',
    kpis: [],
    excluded_channels: [],
    preferred_channels: [],
};

export default function ConversationalFlow() {
    const [step, setStep] = useState(1);
    const [brief, setBrief] = useState<CampaignBrief>(initialBrief);
    const [isGenerating, setIsGenerating] = useState(false);

    const nextStep = () => setStep((s) => Math.min(s + 1, 5));
    const prevStep = () => setStep((s) => Math.max(s - 1, 1));

    const updateBrief = (updates: Partial<CampaignBrief>) => {
        setBrief((prev) => ({ ...prev, ...updates }));
    };

    const handleFinish = () => {
        setIsGenerating(true);
    };

    if (isGenerating) {
        return <GenerationLoader brief={brief} />;
    }

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 100 : -100,
            opacity: 0,
        }),
    };

    // Calculate transition direction (hardcoded to always go forward for simplicity right now, 
    // but in a real app we'd track previous step)
    const direction = 1;

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-[#F8F8F8] flex flex-col items-center justify-center p-6 font-inter overflow-hidden">

            {/* Progress Bar */}
            <div className="flex gap-3 mb-16">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div
                        key={i}
                        className={`h-2 rounded-full transition-all duration-300 ${i < step ? 'w-8 bg-[#0F766E]' : i === step ? 'w-8 bg-white' : 'w-2 bg-[#333333]'
                            }`}
                    />
                ))}
            </div>

            {/* Content Area */}
            <div className="w-full max-w-2xl relative min-h-[400px]">
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={step}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="absolute inset-x-0 top-0"
                    >
                        {step === 1 && <Step1Business brief={brief} update={updateBrief} next={nextStep} />}
                        {step === 2 && <Step2Audience brief={brief} update={updateBrief} next={nextStep} prev={prevStep} />}
                        {step === 3 && <Step3Objective brief={brief} update={updateBrief} next={nextStep} prev={prevStep} />}
                        {step === 4 && <Step4Timing brief={brief} update={updateBrief} next={nextStep} prev={prevStep} />}
                        {step === 5 && <Step5Channels brief={brief} update={updateBrief} prev={prevStep} submit={handleFinish} />}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
