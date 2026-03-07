import { Radio, Tv } from 'lucide-react';

export default function BroadcastReadinessPanel() {
    return (
        <div className="bg-[#141414] border border-[#1A1A1A] rounded-xl p-6 relative overflow-hidden group">

            {/* Background flourish */}
            <div className="absolute -right-10 -top-10 text-white/5 group-hover:text-white/10 transition-colors pointer-events-none">
                <Tv size={160} strokeWidth={1} />
            </div>

            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-[#0F766E]/20 rounded-lg text-[#0F766E]">
                        <Radio size={20} />
                    </div>
                    <h3 className="text-xl font-satoshi font-bold text-white">Broadcast Readiness</h3>
                </div>

                <p className="text-sm text-white/60 leading-relaxed mb-6 max-w-lg">
                    Your mix includes linear or outdoor channels. MediaMind will not deploy these automatically through the Watchdog Agent. These channels require human agency intervention for media booking and creative delivery to stations (e.g. via Peach).
                </p>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-lg p-3">
                        <p className="text-xs text-white/40 uppercase tracking-wider font-bold mb-1">Standard Lead Time</p>
                        <p className="text-sm text-white font-medium">3-5 Weeks</p>
                    </div>
                    <div className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-lg p-3">
                        <p className="text-xs text-white/40 uppercase tracking-wider font-bold mb-1">Creative Specs</p>
                        <p className="text-sm text-white font-medium">Clearcast Req.</p>
                    </div>
                </div>
            </div>

        </div>
    );
}
