import {useEffect, useState} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {Button} from './ui/button';
import {ArrowRight, ChevronDown, Menu, Sparkles, X} from 'lucide-react';
import {ThemeToggle} from './ThemeToggle';
import {Logo} from './Logo';
import {GlobalSearch} from './GlobalSearch';
import {Badge} from './ui/badge';
import {useNavigate} from "react-router-dom";

interface HeaderProps {
    showSearch?: boolean;
}

export function Header({showSearch = false}: HeaderProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        {
            label: 'Products',
            page: '/products',
            dropdown: [
                {
                    label: 'District Tokens',
                    page: '/district-browser',
                    description: 'Invest in 805 districts',
                    icon: '🏛️',
                    badge: 'Popular'
                },
                {
                    label: 'State Indices',
                    page: '/explore-district',
                    description: 'Trade state-level indices',
                    icon: '📊'
                },
                {
                    label: 'F&O Trading',
                    page: '/state-fno',
                    description: 'Futures & Options',
                    icon: '📈'
                },
                {
                    label: 'Mutual Funds',
                    page: '/mutual-funds',
                    description: 'AI-powered funds',
                    icon: '🤖',
                    badge: 'New'
                },
            ]
        },
        {
            label: 'Learn',
            page: '/learn',
            dropdown: [
                {
                    label: 'How It Works',
                    page: '/how-it-works',
                    description: 'Understanding the platform',
                    icon: '💡'
                },
                {
                    label: 'Features',
                    page: '/features',
                    description: 'Platform capabilities',
                    icon: '⚡'
                },
                {
                    label: 'Market Insights',
                    page: '/insights',
                    description: 'AI-powered analysis',
                    icon: '🧠'
                },
            ]
        },
        {label: 'Pricing', page: '/pricing'},
        {label: 'About', page: '/about'},
        {label: 'Contact', page: '/contact'},
    ];

    const handleNavClick = (page: string) => {
        navigate(page);
        setMobileMenuOpen(false);
        setActiveDropdown(null);
    };

    return (
        <motion.header
            initial={{y: -100}}
            animate={{y: 0}}
            transition={{type: 'spring', stiffness: 120, damping: 20}}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                scrolled
                    ? 'bg-white/95 dark:bg-black/95 backdrop-blur-2xl shadow-2xl border-b border-yellow-400/30 shadow-yellow-500/5'
                    : 'bg-transparent'
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <motion.div
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 0.95}}
                        onClick={() => navigate('landing')}
                        className="cursor-pointer flex items-center gap-3 z-10 relative"
                    >
                        {/* Glow Effect */}
                        <div
                            className="absolute inset-0 bg-yellow-400/30 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full"/>

                        <div className="relative">
                            <motion.div
                                className="absolute inset-0 bg-yellow-400 blur-xl opacity-60 rounded-full"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.4, 0.7, 0.4],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                }}
                            />
                            <Logo size="md" showText={false}/>
                        </div>

                        <div>
                            <h1 className="text-2xl tracking-tight">
                                <motion.span
                                    className="bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 bg-clip-text text-transparent"
                                    animate={{
                                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                                    }}
                                    transition={{
                                        duration: 5,
                                        repeat: Infinity,
                                    }}
                                    style={{
                                        backgroundSize: '200% 200%',
                                    }}
                                >
                                    ZONIX
                                </motion.span>
                            </h1>
                            <p className="text-[8px] text-gray-500 dark:text-gray-400 uppercase tracking-widest -mt-1">
                                Trade Bharat
                            </p>
                        </div>
                    </motion.div>

                    {/* Search Bar (Desktop - if enabled) */}
                    {showSearch && (
                        <div className="hidden lg:block flex-1 max-w-md mx-8">
                            <GlobalSearch/>
                        </div>
                    )}

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-2">
                        {navItems.map((item, idx) => (
                            <div
                                key={item.page}
                                className="relative"
                                onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <motion.button
                                    initial={{opacity: 0, y: -20}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: idx * 0.05, type: 'spring', stiffness: 200}}
                                    onClick={() => !item.dropdown && handleNavClick(item.page)}
                                    className="relative px-5 py-2.5 text-gray-700 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors group rounded-xl hover:bg-yellow-50 dark:hover:bg-yellow-950/20 flex items-center gap-2"
                                >
                  <span className="relative">
                    {item.label}
                      <motion.span
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 origin-left"
                          initial={{scaleX: 0}}
                          whileHover={{scaleX: 1}}
                          transition={{duration: 0.3}}
                      />
                  </span>
                                    {item.dropdown && (
                                        <ChevronDown
                                            className={`w-4 h-4 transition-transform duration-300 ${
                                                activeDropdown === item.label ? 'rotate-180' : ''
                                            }`}
                                        />
                                    )}
                                </motion.button>

                                {/* Enhanced Dropdown Menu */}
                                <AnimatePresence>
                                    {item.dropdown && activeDropdown === item.label && (
                                        <motion.div
                                            initial={{opacity: 0, y: 10, scale: 0.95}}
                                            animate={{opacity: 1, y: 0, scale: 1}}
                                            exit={{opacity: 0, y: 10, scale: 0.95}}
                                            transition={{duration: 0.2}}
                                            className="absolute top-full left-0 mt-3 w-80 bg-white/98 dark:bg-gray-950/98 backdrop-blur-2xl border-2 border-yellow-400/30 rounded-2xl shadow-2xl shadow-yellow-500/20 overflow-hidden"
                                        >
                                            <div className="p-3">
                                                {item.dropdown.map((subItem, subIdx) => (
                                                    <motion.button
                                                        key={subItem.page}
                                                        onClick={() => handleNavClick(subItem.page)}
                                                        initial={{opacity: 0, x: -10}}
                                                        animate={{opacity: 1, x: 0}}
                                                        transition={{delay: subIdx * 0.05}}
                                                        className="w-full text-left px-5 py-4 rounded-xl hover:bg-gradient-to-r hover:from-yellow-50 hover:to-yellow-100 dark:hover:from-yellow-950/20 dark:hover:to-yellow-900/20 transition-all duration-200 group relative overflow-hidden"
                                                    >
                                                        <div className="flex items-start gap-4 relative z-10">
                                                            <div className="text-3xl mt-1">{subItem.icon}</div>
                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-2 mb-1">
                                  <span
                                      className="text-sm text-gray-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                                    {subItem.label}
                                  </span>
                                                                    {subItem.badge && (
                                                                        <Badge className={`text-[10px] px-2 py-0.5 ${
                                                                            subItem.badge === 'New'
                                                                                ? 'bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400'
                                                                                : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-400'
                                                                        }`}>
                                                                            {subItem.badge}
                                                                        </Badge>
                                                                    )}
                                                                </div>
                                                                <div
                                                                    className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                                                                    {subItem.description}
                                                                </div>
                                                            </div>
                                                            <ArrowRight
                                                                className="w-4 h-4 text-gray-400 group-hover:text-yellow-500 group-hover:translate-x-1 transition-all opacity-0 group-hover:opacity-100"/>
                                                        </div>
                                                    </motion.button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden lg:flex items-center gap-3">
                        <ThemeToggle/>

                        <Button
                            variant="ghost"
                            onClick={() => navigate('login')}
                            className="hover:bg-yellow-50 dark:hover:bg-yellow-950/20 rounded-xl px-5"
                        >
                            Login
                        </Button>

                        <Button
                            onClick={() => navigate('signup')}
                            className="relative overflow-hidden bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black rounded-xl shadow-lg shadow-yellow-400/30 hover:shadow-xl hover:shadow-yellow-400/50 transition-all px-6 group"
                        >
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
                                animate={{
                                    x: ['-100%', '200%'],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatDelay: 1,
                                }}
                            />
                            <span className="relative flex items-center gap-2">
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
              </span>
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden flex items-center gap-3">
                        <ThemeToggle/>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="rounded-xl relative"
                        >
                            <AnimatePresence mode="wait">
                                {mobileMenuOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{rotate: -90, opacity: 0}}
                                        animate={{rotate: 0, opacity: 1}}
                                        exit={{rotate: 90, opacity: 0}}
                                        transition={{duration: 0.2}}
                                    >
                                        <X className="w-6 h-6"/>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{rotate: 90, opacity: 0}}
                                        animate={{rotate: 0, opacity: 1}}
                                        exit={{rotate: -90, opacity: 0}}
                                        transition={{duration: 0.2}}
                                    >
                                        <Menu className="w-6 h-6"/>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Enhanced Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{opacity: 0, height: 0}}
                        animate={{opacity: 1, height: 'auto'}}
                        exit={{opacity: 0, height: 0}}
                        transition={{duration: 0.3}}
                        className="lg:hidden bg-white/98 dark:bg-black/98 backdrop-blur-2xl border-t border-yellow-400/30"
                    >
                        <div className="px-6 py-8 space-y-6 max-h-[calc(100vh-5rem)] overflow-y-auto">
                            {/* Mobile Search */}
                            {showSearch && (
                                <div className="mb-6">
                                    <GlobalSearch/>
                                </div>
                            )}

                            {/* Mobile Navigation */}
                            {navItems.map((item, idx) => (
                                <motion.div
                                    key={item.page}
                                    initial={{opacity: 0, x: -20}}
                                    animate={{opacity: 1, x: 0}}
                                    transition={{delay: idx * 0.05}}
                                >
                                    {item.dropdown ? (
                                        <div className="space-y-3">
                                            <div
                                                className="text-sm uppercase tracking-wider px-4 text-gray-500 dark:text-gray-400 flex items-center gap-2">
                                                <Sparkles className="w-4 h-4 text-yellow-500"/>
                                                {item.label}
                                            </div>
                                            <div className="space-y-2">
                                                {item.dropdown.map((subItem, subIdx) => (
                                                    <motion.button
                                                        key={subItem.page}
                                                        onClick={() => handleNavClick(subItem.page)}
                                                        initial={{opacity: 0, x: -20}}
                                                        animate={{opacity: 1, x: 0}}
                                                        transition={{delay: idx * 0.05 + subIdx * 0.03}}
                                                        className="block w-full text-left px-5 py-4 rounded-xl hover:bg-gradient-to-r hover:from-yellow-50 hover:to-yellow-100 dark:hover:from-yellow-950/20 dark:hover:to-yellow-900/20 transition-all border border-transparent hover:border-yellow-400/30"
                                                    >
                                                        <div className="flex items-center gap-3 mb-1">
                                                            <span className="text-2xl">{subItem.icon}</span>
                                                            <span className="text-sm text-gray-900 dark:text-white">
                                {subItem.label}
                              </span>
                                                            {subItem.badge && (
                                                                <Badge className={`text-[10px] px-2 py-0.5 ${
                                                                    subItem.badge === 'New'
                                                                        ? 'bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400'
                                                                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-400'
                                                                }`}>
                                                                    {subItem.badge}
                                                                </Badge>
                                                            )}
                                                        </div>
                                                        <div className="text-xs text-gray-600 dark:text-gray-400 pl-11">
                                                            {subItem.description}
                                                        </div>
                                                    </motion.button>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => handleNavClick(item.page)}
                                            className="block w-full text-left px-5 py-4 rounded-xl hover:bg-yellow-50 dark:hover:bg-yellow-950/20 transition-colors border border-transparent hover:border-yellow-400/30"
                                        >
                      <span className="text-sm text-gray-900 dark:text-white">
                        {item.label}
                      </span>
                                        </button>
                                    )}
                                </motion.div>
                            ))}

                            {/* Mobile Actions */}
                            <div className="pt-6 space-y-3 border-t border-yellow-400/30">
                                <Button
                                    variant="outline"
                                    className="w-full rounded-xl border-2 border-yellow-400/30 hover:bg-yellow-50 dark:hover:bg-yellow-950/20"
                                    onClick={() => {
                                        navigate('login');
                                        setMobileMenuOpen(false);
                                    }}
                                >
                                    Login
                                </Button>
                                <Button
                                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black rounded-xl shadow-lg shadow-yellow-400/30 relative overflow-hidden group"
                                    onClick={() => {
                                        navigate('signup');
                                        setMobileMenuOpen(false);
                                    }}
                                >
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
                                        animate={{
                                            x: ['-100%', '200%'],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            repeatDelay: 1,
                                        }}
                                    />
                                    <span className="relative flex items-center justify-center gap-2">
                    Get Started Free
                    <ArrowRight className="w-4 h-4"/>
                  </span>
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}