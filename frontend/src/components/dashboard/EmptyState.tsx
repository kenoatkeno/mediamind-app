import { FolderOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-[#1A1A1A] rounded-xl bg-[#0A0A0A]/50">
            <div className="w-16 h-16 bg-[#141414] rounded-full flex items-center justify-center mb-6 border border-[#1A1A1A]">
                <FolderOpen className="text-white/40" size={24} />
            </div>

            <h3 className="text-xl font-satoshi font-bold text-white mb-2">
                No Plans Generated
            </h3>

            <p className="text-white/50 text-sm max-w-sm mb-8">
                You haven't generated any media plans yet. Ask the Strategist Agent to build your first tailored campaign mix.
            </p>

            <Link
                to="/app/new-plan"
                className="bg-[#0F766E] hover:bg-[#0D655D] text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
            >
                Create Your First Plan
            </Link>
        </div>
    );
}
