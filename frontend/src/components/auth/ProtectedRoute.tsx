import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { insforge } from '../../lib/insforge';
import { Loader2 } from 'lucide-react';

export default function ProtectedRoute() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const location = useLocation();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data } = await insforge.auth.getCurrentSession();
                setIsAuthenticated(!!data?.session);
            } catch (err) {
                console.error('Auth verification failed', err);
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, [location.pathname]);

    if (isAuthenticated === null) {
        // Show our global spinner while checking session
        return (
            <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center">
                <Loader2 size={32} className="text-[#0F766E] animate-spin mb-4" />
                <p className="text-white/60 font-medium">Verifying session...</p>
            </div>
        );
    }

    if (!isAuthenticated) {
        // Redirect completely out of /app to /login, remember where they wanted to go
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Render the child routes if verified
    return <Outlet />;
}
