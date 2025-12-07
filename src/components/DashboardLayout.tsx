import {useEffect, useState} from 'react';
import {motion} from 'motion/react';
import {CollapsibleSidebar} from './CollapsibleSidebar';
import {LiveStatus} from './LiveStatus';
import {Input} from './ui/input';
import {Button} from './ui/button';
import {Avatar, AvatarFallback} from './ui/avatar';
import {Bell, Menu, Moon, Search, Sun, Wallet,} from 'lucide-react';
import {generateDistrictTokens} from '../utils/mockData';
import {Outlet, useNavigate} from "react-router-dom";

interface DashboardLayoutProps {
    onLogout: () => void;
    themeColor?: string;
}

export function DashboardLayout({onLogout, themeColor = 'yellow'}: DashboardLayoutProps) {
    const [isDark, setIsDark] = useState(false);
    const [liveTickers, setLiveTickers] = useState(generateDistrictTokens(10));
    const [sidebarHidden, setSidebarHidden] = useState(false); // Start expanded by default
    const [isMobile, setIsMobile] = useState(false);
    const navigate = useNavigate();


    // Detect mobile screen size
    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 1024; // lg breakpoint
            setIsMobile(mobile);
            if (mobile) {
                setSidebarHidden(true); // Always start hidden on mobile
            } else {
                // On desktop, keep current state (don't force hide)
                setSidebarHidden(prevState => prevState);
            }
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Check initial theme state from document
    useEffect(() => {
        setIsDark(document.documentElement.classList.contains('dark'));
    }, []);

    // Simulate live ticker updates
    useEffect(() => {
        const interval = setInterval(() => {
            setLiveTickers(prev => prev.map(ticker => ({
                ...ticker,
                price: ticker.price + (Math.random() - 0.5) * 100,
                change: ticker.change + (Math.random() - 0.5) * 0.5,
            })));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const toggleTheme = () => {
        setIsDark(!isDark);
        document.documentElement.classList.toggle('dark');
    };

    const tickers = liveTickers.map(t => ({
        name: t.name,
        price: t.price,
        change: t.change,
    }));

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-background to-amber-50/20 dark:to-amber-950/10 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/5 dark:bg-amber-500/3 rounded-full blur-3xl"/>
                <div
                    className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-yellow-500/5 dark:bg-yellow-500/3 rounded-full blur-3xl"/>
            </div>
            <div className="relative z-10">
                {/* Live Status Bar */}
                <LiveStatus tickers={tickers}/>

                {/* Collapsible Sidebar */}
                <CollapsibleSidebar
                    onLogout={onLogout}
                    isHidden={sidebarHidden}
                    themeColor={themeColor}
                />

                {/* Main Content */}
                <motion.div
                    animate={{marginLeft: (sidebarHidden || isMobile) ? '0' : '256px'}}
                    transition={{
                        duration: 0.2,
                        ease: [0.4, 0, 0.2, 1],
                        type: "tween"
                    }}
                    className="pt-[76px] lg:pt-[76px] transform-gpu"
                >
                    {/* Top Bar */}
                    <header
                        className="sticky top-[76px] z-30 backdrop-blur-xl bg-background/80 border-b border-border px-6 py-4">
                        <div className="flex items-center gap-4">
                            {/* Hamburger Menu */}
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setSidebarHidden(!sidebarHidden)}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                            >
                                <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400"/>
                            </Button>

                            {/* Search Bar */}
                            <div className="flex-1 max-w-md hidden sm:block">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"/>
                                    <Input
                                        placeholder="Search..."
                                        className="pl-9 h-10 rounded-lg bg-gray-100 dark:bg-gray-900 border-0 focus:ring-2"
                                        style={{
                                            '--tw-ring-color': `${themeColor === 'yellow' ? '#FBBF24' : themeColor === 'green' ? '#10B981' : themeColor === 'purple' ? '#8B5CF6' : '#3B82F6'}33`
                                        } as any}
                                    />
                                </div>
                            </div>

                            {/* Right Side Actions */}
                            <div className="flex items-center gap-1 sm:gap-2 ml-auto">
                                <button
                                    onClick={() => navigate('/dashboard/wallet')}
                                    className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group hidden sm:block"
                                    title="Wallet"
                                >
                                    <Wallet className={`w-5 h-5 ${
                                        themeColor === 'yellow' ? 'text-yellow-600 dark:text-yellow-400' :
                                            themeColor === 'green' ? 'text-green-600 dark:text-green-400' :
                                                themeColor === 'purple' ? 'text-purple-600 dark:text-purple-400' :
                                                    'text-blue-600 dark:text-blue-400'
                                    } group-hover:scale-110 transition-transform`}/>
                                </button>

                                <button onClick={toggleTheme}
                                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                    {isDark ? (
                                        <Sun className={`w-5 h-5 ${
                                            themeColor === 'yellow' ? 'text-yellow-400' :
                                                themeColor === 'green' ? 'text-green-400' :
                                                    themeColor === 'purple' ? 'text-purple-400' :
                                                        'text-blue-400'
                                        }`}/>
                                    ) : (
                                        <Moon className="w-5 h-5 text-gray-600"/>
                                    )}
                                </button>

                                <button
                                    onClick={() => navigate('/dashboard/notifications')}
                                    className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                >
                                    <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400"/>
                                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                                </button>

                                <Avatar className={`cursor-pointer border-2 w-8 h-8 ${
                                    themeColor === 'yellow' ? 'border-yellow-400/50' :
                                        themeColor === 'green' ? 'border-green-400/50' :
                                            themeColor === 'purple' ? 'border-purple-400/50' :
                                                'border-blue-400/50'
                                }`}>
                                    <AvatarFallback className={`text-black text-sm ${
                                        themeColor === 'yellow' ? 'bg-gradient-to-br from-yellow-400 to-yellow-500' :
                                            themeColor === 'green' ? 'bg-gradient-to-br from-green-400 to-green-500' :
                                                themeColor === 'purple' ? 'bg-gradient-to-br from-purple-400 to-purple-500' :
                                                    'bg-gradient-to-br from-blue-400 to-blue-500'
                                    }`}>JD</AvatarFallback>
                                </Avatar>
                            </div>
                        </div>
                    </header>

                    {/* Page Content */}
                    <main>
                        {<Outlet/>}
                    </main>
                </motion.div>
            </div>
        </div>
    );
}