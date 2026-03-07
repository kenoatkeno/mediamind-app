import { PDFDownloadLink } from '@react-pdf/renderer';
import { Download, Loader2 } from 'lucide-react';
import MediaPlanPDF from '../pdf/MediaPlanPDF';

interface Allocation {
    channel: string;
    percentage: number;
    budget_gbp: number;
    rationale: string;
}

interface PlanData {
    campaign_name: string;
    total_budget_gbp: number;
    allocation: Allocation[];
    overlaps_q4: boolean;
    requires_agency: boolean;
    contains_broadcast: boolean;
    overall_rationale: string;
}

interface ButtonProps {
    plan: PlanData;
    isFreeTier?: boolean;
}

export default function DownloadPDFButton({ plan, isFreeTier = true }: ButtonProps) {
    const filename = `MediaMind_Plan_${plan.campaign_name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`;

    return (
        <PDFDownloadLink
            document={<MediaPlanPDF plan={plan} isFreeTier={isFreeTier} />}
            fileName={filename}
            className="group relative"
        >
            {/* The render prop from react-pdf lets us know if the blob is still compiling */}
            {({ loading }) => (
                <button
                    disabled={loading}
                    className={`
                        flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all
                        ${loading
                            ? 'bg-[#1A1A1A] border border-[#333] text-white/40 cursor-wait'
                            : 'bg-[#141414] border border-[#1A1A1A] text-white/80 hover:bg-[#1A1A1A] hover:border-[#0F766E]/50 hover:text-white'
                        }
                    `}
                >
                    {loading ? (
                        <>
                            <Loader2 size={16} className="animate-spin" />
                            <span>Building PDF...</span>
                        </>
                    ) : (
                        <>
                            <Download size={16} className="group-hover:text-[#0F766E] transition-colors" />
                            <span>Export PDF</span>
                        </>
                    )}
                </button>
            )}
        </PDFDownloadLink>
    );
}
