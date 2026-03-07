import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { insforge } from '../../lib/insforge';
import { User, LogOut } from 'lucide-react';

export default function TopNav() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSession = async () => {
            const { data } = await insforge.auth.getCurrentSession();
            if (data?.session) {
                setIsAuthenticated(true);
                setUserEmail(data.session.user.email ?? null);
            }
        };
        fetchSession();
    }, []);

    const handleSignOut = async () => {
        await insforge.auth.signOut();
        setIsAuthenticated(false);
        setUserEmail(null);
        navigate('/login');
    };

    return (
        <nav className="w-full bg-[#0A0A0A]/80 backdrop-blur-md border-b border-[#1A1A1A] sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo Area */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to={isAuthenticated ? "/app" : "/"} className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0F766E] to-[#D97706] flex items-center justify-center">
                                <span className="font-satoshi font-bold text-white text-lg">M</span>
                            </div>
                            <span className="font-satoshi font-bold text-xl text-white tracking-tight">MediaMind</span>
                        </Link>
                    </div>

                    {/* Navigation Links Area */}
                    <div className="hidden md:flex flex-1 justify-center">
                        <div className="flex space-x-8">
                            <Link to="/pricing" className="text-white/60 hover:text-white transition-colors text-sm font-medium">Pricing</Link>
                            <Link to="#" className="text-white/60 hover:text-white transition-colors text-sm font-medium">Resources</Link>
                        </div>
                    </div>

                    {/* Auth Area */}
                    <div className="flex items-center gap-4">
                        {isAuthenticated ? (
                            <div className="flex items-center gap-4">
                                <div className="hidden sm:flex items-center gap-2 text-white/80">
                                    <div className="w-8 h-8 rounded-full bg-[#1A1A1A] border border-[#333] flex items-center justify-center">
                                        <User size={16} className="text-[#0F766E]" />
                                    </div>
                                    <span className="text-sm">{userEmail}</span>
                                </div>
                                <button
                                    onClick={handleSignOut}
                                    className="text-white/60 hover:text-red-400 transition-colors flex items-center gap-2 text-sm font-medium"
                                >
                                    <LogOut size={16} />
                                    <span className="hidden sm:inline">Sign Out</span>
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link to="/login" className="text-white/80 hover:text-white transition-colors text-sm font-medium px-3 py-2">
                                    Log In
                                </Link>
                                <Link to="/signup" className="bg-[#0F766E] hover:bg-[#0D655D] text-white transition-colors text-sm font-medium px-4 py-2 rounded-lg">
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
