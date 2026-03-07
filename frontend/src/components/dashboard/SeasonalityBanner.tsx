import { CalendarClock } from 'lucide-react';

export default function SeasonalityBanner() {
    return (
        <div className="w-full bg-amber-500/10 border-b border-amber-500/20">
            <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-3">
                <CalendarClock size={16} className="text-amber-500 shrink-0" />
                <p className="text-sm text-amber-500/90 font-medium">
                    <strong className="font-bold">Q4 Seasonality Alert:</strong> Your selected dates overlap with the Golden Quarter. Expect digital CPMs to rise by 20-40% and linear TV airtime to be highly competitive.
                </p>
            </div>
        </div>
    );
}
