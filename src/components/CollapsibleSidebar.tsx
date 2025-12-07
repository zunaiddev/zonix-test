import {useState} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {Logo} from './Logo';
import {
    Bell,
    Briefcase,
    LayoutDashboard,
    Lightbulb,
    LogOut,
    MapPin,
    Receipt,
    Settings,
    Sparkles,
    Star,
    TrendingUp,
} from 'lucide-react';
import {useNavigate} from "react-router-dom";

interface CollapsibleSidebarProps {
    onLogout: () => void;
    isHidden: boolean;
    themeColor?: string;
}

export function CollapsibleSidebar({onLogout, isHidden, themeColor = 'yellow'}: CollapsibleSidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const navigate = useNavigate();
    const activeTab = location.pathname;

    const getThemeClasses = () => {
        switch (themeColor) {
            case 'green':
                return {
                    gradient: 'from-green-400 to-green-500',
                    hover: 'hover:from-green-500 hover:to-green-600',
                    shadow: 'shadow-green-400/30',
                    shadowLg: 'shadow-lg shadow-green-400/50',
                    hoverBg: 'hover:bg-green-400/10',
                    bg: 'bg-green-400',
                    hoverBgSolid: 'hover:bg-green-500',
                };
            case 'purple':
                return {
                    gradient: 'from-purple-400 to-purple-500',
                    hover: 'hover:from-purple-500 hover:to-purple-600',
                    shadow: 'shadow-purple-400/30',
                    shadowLg: 'shadow-lg shadow-purple-400/50',
                    hoverBg: 'hover:bg-purple-400/10',
                    bg: 'bg-purple-400',
                    hoverBgSolid: 'hover:bg-purple-500',
                };
            case 'navy':
                return {
                    gradient: 'from-blue-400 to-blue-500',
                    hover: 'hover:from-blue-500 hover:to-blue-600',
                    shadow: 'shadow-blue-400/30',
                    shadowLg: 'shadow-lg shadow-blue-400/50',
                    hoverBg: 'hover:bg-blue-400/10',
                    bg: 'bg-blue-400',
                    hoverBgSolid: 'hover:bg-blue-500',
                };
            default: // yellow
                return {
                    gradient: 'from-yellow-400 to-yellow-500',
                    hover: 'hover:from-yellow-500 hover:to-yellow-600',
                    shadow: 'shadow-yellow-400/30',
                    shadowLg: 'shadow-lg shadow-yellow-400/50',
                    hoverBg: 'hover:bg-yellow-400/10',
                    bg: 'bg-yellow-400',
                    hoverBgSolid: 'hover:bg-yellow-500',
                };
        }
    };

    const theme = getThemeClasses();

    const menuItems = [
        {icon: LayoutDashboard, label: 'Dashboard', page: '/dashboard'},
        {icon: MapPin, label: 'Explore District', page: '/dashboard/explore'},
        {icon: TrendingUp, label: 'State F&O', page: '/dashboard/state-fno'},
        {icon: Sparkles, label: 'Mutual Funds 2.0', page: '/dashboard/mutual-funds'},
        {icon: Briefcase, label: 'Portfolio', page: '/dashboard/portfolio'},
        {icon: Star, label: 'Watchlist', page: '/dashboard/watchlist'},
        {icon: Lightbulb, label: 'Insights', page: '/dashboard/insights'},
        {icon: Receipt, label: 'Smart Receipt', page: '/dashboard/receipts'},
        {icon: Bell, label: 'Notifications', page: '/dashboard/notifications'},
        {icon: Settings, label: 'Settings', page: '/dashboard/settings'},
    ];

    return (
        <>
            {/* Sidebar */}
            <AnimatePresence>
                {!isHidden && (
                    <motion.aside
                        initial={{x: -256}}
                        animate={{
                            x: 0,
                            width: isCollapsed ? '80px' : '256px'
                        }}
                        exit={{x: -256}}
                        transition={{
                            duration: 0.2,
                            ease: [0.4, 0, 0.2, 1],
                            type: "tween"
                        }}
                        className={`fixed left-0 top-[76px] h-[calc(100vh-76px)] backdrop-blur-2xl bg-white/90 dark:bg-black/90 border-r ${
                            themeColor === 'green' ? 'border-green-400/20' :
                                themeColor === 'purple' ? 'border-purple-400/20' :
                                    themeColor === 'navy' ? 'border-blue-400/20' :
                                        'border-yellow-400/20'
                        } z-40 overflow-hidden transform-gpu`}
                    >
                        <div className="relative h-full flex flex-col p-6">
                            {/* Logo and Collapse Button */}
                            <div className="flex items-center justify-between mb-8">
                                <AnimatePresence mode="wait">
                                    {!isCollapsed && (
                                        <motion.div
                                            initial={{opacity: 0}}
                                            animate={{opacity: 1}}
                                            exit={{opacity: 0}}
                                            transition={{duration: 0.15, ease: [0.4, 0, 0.2, 1]}}
                                        >
                                            <Logo size="md" showText={true}/>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {isCollapsed && (
                                    <div className="mx-auto">
                                        <Logo size="sm" showText={false}/>
                                    </div>
                                )}
                            </div>

                            {/* Navigation */}
                            <nav className="space-y-2 flex-1">
                                {menuItems.map((item) => (
                                    <motion.button
                                        key={item.page}
                                        onClick={() => navigate(item.page)}
                                        whileHover={{x: isCollapsed ? 0 : 4}}
                                        whileTap={{scale: 0.98}}
                                        transition={{duration: 0.15}}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-smooth-fast relative transform-gpu ${
                                            activeTab.endsWith(item.page)
                                                ? `bg-gradient-to-r ${theme.gradient} text-black shadow-lg ${theme.shadow}`
                                                : `text-gray-600 dark:text-gray-400 ${theme.hoverBg}`
                                        }`}
                                        title={isCollapsed ? item.label : undefined}
                                    >
                                        {activeTab === item.page && (
                                            <motion.div
                                                layoutId="activeTab"
                                                className={`absolute inset-0 bg-gradient-to-r ${theme.gradient} rounded-xl transform-gpu`}
                                                initial={false}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 400,
                                                    damping: 35,
                                                    mass: 0.5
                                                }}
                                            />
                                        )}
                                        <item.icon className={`w-5 h-5 relative z-10 ${isCollapsed ? 'mx-auto' : ''}`}/>
                                        <AnimatePresence>
                                            {!isCollapsed && (
                                                <motion.span
                                                    initial={{opacity: 0, width: 0}}
                                                    animate={{opacity: 1, width: 'auto'}}
                                                    exit={{opacity: 0, width: 0}}
                                                    transition={{duration: 0.15, ease: [0.4, 0, 0.2, 1]}}
                                                    className="text-sm relative z-10 whitespace-nowrap"
                                                >
                                                    {item.label}
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </motion.button>
                                ))}
                            </nav>

                            {/* Logout Button */}
                            <button
                                onClick={onLogout}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-500/10 transition-all ${
                                    isCollapsed ? 'justify-center' : ''
                                }`}
                                title={isCollapsed ? 'Logout' : undefined}
                            >
                                <LogOut className="w-5 h-5"/>
                                <AnimatePresence>
                                    {!isCollapsed && (
                                        <motion.span
                                            initial={{opacity: 0, width: 0}}
                                            animate={{opacity: 1, width: 'auto'}}
                                            exit={{opacity: 0, width: 0}}
                                            transition={{duration: 0.2}}
                                            className="text-sm whitespace-nowrap"
                                        >
                                            Logout
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </button>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>
        </>
    );
}