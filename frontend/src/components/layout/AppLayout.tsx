import { Outlet, useLocation } from 'react-router-dom';
import TopNav from './TopNav';
import { AnimatePresence, motion } from 'framer-motion';

export default function AppLayout() {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-[#0A0A0A] flex flex-col text-white font-inter">
            <TopNav />

            <main className="flex-1 w-full bg-[#0A0A0A] relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="w-full h-full"
                    >
                        <Outlet />
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
}
