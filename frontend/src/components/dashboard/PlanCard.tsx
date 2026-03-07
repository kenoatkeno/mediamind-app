import { motion } from 'framer-motion';
import { Clock, Copy, Trash2, ChevronRight, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PlanProps {
    id: string;
    campaignName: string;
    dateGenerated: string;
    totalBudget: number;
    channelCount: number;
    index: number; // For staggered animation
}

export default function PlanCard({ id, campaignName, dateGenerated, totalBudget, channelCount, index }: PlanProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className="group block bg-[#141414] border border-[#1A1A1A] hover:border-[#0F766E]/50 rounded-xl p-5 transition-all overflow-hidden relative"
        >
            {/* Top Row: Name and Date */}
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-white font-satoshi font-bold text-lg group-hover:text-[#0F766E] transition-colors">
                        {campaignName}
                    </h3>
                    <div className="flex items-center gap-1.5 text-white/40 text-xs mt-1 font-medium">
                        <Clock size={12} />
                        <span>{dateGenerated}</span>
                    </div>
                </div>

                {/* Actions (Visible on hover) */}
                <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    <button
                        className="p-2 text-white/40 hover:text-white hover:bg-[#1A1A1A] rounded-md transition-colors"
                        title="Duplicate Plan"
                    >
                        <Copy size={16} />
                    </button>
                    <button
                        className="p-2 text-white/40 hover:text-red-400 hover:bg-red-400/10 rounded-md transition-colors"
                        title="Delete Plan"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>

            {/* Middle Row: Stats */}
            <div className="flex items-center gap-6 py-4 border-t border-[#1A1A1A]">
                <div>
                    <p className="text-white/40 text-[10px] uppercase font-bold tracking-wider mb-1">Budget</p>
                    <p className="text-white font-mono text-sm">£{totalBudget.toLocaleString()}</p>
                </div>
                <div>
                    <p className="text-white/40 text-[10px] uppercase font-bold tracking-wider mb-1">Channels</p>
                    <div className="flex items-center gap-1.5">
                        <BarChart3 size={14} className="text-[#0F766E]" />
                        <span className="text-white text-sm font-medium">{channelCount}</span>
                    </div>
                </div>
            </div>

            {/* Bottom Row: CTA */}
            <Link
                to={`/app/plan/${id}`}
                className="mt-2 w-full flex items-center justify-center gap-2 bg-[#1A1A1A] hover:bg-[#0F766E]/10 text-white/70 hover:text-[#0F766E] py-2.5 rounded-lg border border-transparent hover:border-[#0F766E]/30 transition-all font-medium text-sm"
            >
                View Plan <ChevronRight size={16} />
            </Link>
        </motion.div>
    );
}
