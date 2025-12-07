import {KeyboardEvent, ReactNode, useEffect, useMemo, useRef, useState} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {debounce} from '../utils/performanceUtils';
import {Input} from './ui/input';
import {Card} from './ui/card';
import {ScrollArea} from './ui/scroll-area';
import {Separator} from './ui/separator';
import {ArrowUpRight, Building2, Clock, Hash, MapPin, Search, Sparkles, TrendingUp, X, Zap,} from 'lucide-react';

interface SearchResult {
    id: string;
    type: 'district' | 'state' | 'fund' | 'fno' | 'page';
    title: string;
    subtitle?: string;
    value?: string;
    change?: string;
    trend?: 'up' | 'down';
    icon?: ReactNode;
    action?: () => void;
}

interface GlobalSearchProps {
    placeholder?: string;
    className?: string;
}

export function GlobalSearch({
                                 placeholder = "Search districts, states, funds, F&O...",
                                 className = ""
                             }: GlobalSearchProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const searchRef = useRef<HTMLDivElement>(null);

    // Mock data - in a real app, this would come from your API/database
    const allData: SearchResult[] = [
        // Districts
        {
            page: 'dist-1',
            type: 'district',
            title: 'Mumbai',
            subtitle: 'Maharashtra',
            value: '₹2,450',
            change: '+2.8%',
            trend: 'up'
        },
        {
            page: 'dist-2',
            type: 'district',
            title: 'Pune',
            subtitle: 'Maharashtra',
            value: '₹1,890',
            change: '+3.2%',
            trend: 'up'
        },
        {
            page: 'dist-3',
            type: 'district',
            title: 'Bangalore Urban',
            subtitle: 'Karnataka',
            value: '₹2,100',
            change: '+1.5%',
            trend: 'up'
        },
        {
            page: 'dist-4',
            type: 'district',
            title: 'Chennai',
            subtitle: 'Tamil Nadu',
            value: '₹1,650',
            change: '-0.5%',
            trend: 'down'
        },
        {
            page: 'dist-5',
            type: 'district',
            title: 'Hyderabad',
            subtitle: 'Telangana',
            value: '₹1,450',
            change: '+2.1%',
            trend: 'up'
        },
        {
            page: 'dist-6',
            type: 'district',
            title: 'Ahmedabad',
            subtitle: 'Gujarat',
            value: '₹1,320',
            change: '+1.8%',
            trend: 'up'
        },
        {
            page: 'dist-7',
            type: 'district',
            title: 'Delhi',
            subtitle: 'Delhi NCT',
            value: '₹2,890',
            change: '+0.9%',
            trend: 'up'
        },
        {
            page: 'dist-8',
            type: 'district',
            title: 'Kolkata',
            subtitle: 'West Bengal',
            value: '₹1,250',
            change: '+1.2%',
            trend: 'up'
        },
        {
            page: 'dist-9',
            type: 'district',
            title: 'Surat',
            subtitle: 'Gujarat',
            value: '₹980',
            change: '+4.5%',
            trend: 'up'
        },
        {
            page: 'dist-10',
            type: 'district',
            title: 'Jaipur',
            subtitle: 'Rajasthan',
            value: '₹750',
            change: '+2.3%',
            trend: 'up'
        },

        // States
        {
            page: 'state-1',
            type: 'state',
            title: 'Maharashtra',
            subtitle: 'State Index',
            value: '₹38L Cr',
            change: '+7.2%',
            trend: 'up'
        },
        {
            page: 'state-2',
            type: 'state',
            title: 'Tamil Nadu',
            subtitle: 'State Index',
            value: '₹24L Cr',
            change: '+6.8%',
            trend: 'up'
        },
        {
            page: 'state-3',
            type: 'state',
            title: 'Karnataka',
            subtitle: 'State Index',
            value: '₹22L Cr',
            change: '+8.1%',
            trend: 'up'
        },
        {
            page: 'state-4',
            type: 'state',
            title: 'Gujarat',
            subtitle: 'State Index',
            value: '₹21L Cr',
            change: '+7.5%',
            trend: 'up'
        },
        {
            page: 'state-5',
            type: 'state',
            title: 'Uttar Pradesh',
            subtitle: 'State Index',
            value: '₹20L Cr',
            change: '+5.9%',
            trend: 'up'
        },
        {
            page: 'state-6',
            type: 'state',
            title: 'Delhi NCT',
            subtitle: 'State Index',
            value: '₹10L Cr',
            change: '+6.2%',
            trend: 'up'
        },
        {
            page: 'state-7',
            type: 'state',
            title: 'Telangana',
            subtitle: 'State Index',
            value: '₹12L Cr',
            change: '+7.8%',
            trend: 'up'
        },
        {
            page: 'state-8',
            type: 'state',
            title: 'West Bengal',
            subtitle: 'State Index',
            value: '₹15L Cr',
            change: '+5.5%',
            trend: 'up'
        },

        // Mutual Funds
        {
            page: 'fund-1',
            type: 'fund',
            title: 'Royal Growth Fund',
            subtitle: 'AI-Powered Fund',
            value: 'NAV ₹245.80',
            change: '+12.4%',
            trend: 'up'
        },
        {
            page: 'fund-2',
            type: 'fund',
            title: 'Bharat Equity Fund',
            subtitle: 'Large Cap',
            value: 'NAV ₹189.50',
            change: '+18.2%',
            trend: 'up'
        },
        {
            page: 'fund-3',
            type: 'fund',
            title: 'India Infrastructure Fund',
            subtitle: 'Thematic',
            value: 'NAV ₹156.30',
            change: '+22.5%',
            trend: 'up'
        },
        {
            page: 'fund-4',
            type: 'fund',
            title: 'Smart Diversified Fund',
            subtitle: 'AI Multi-Asset',
            value: 'NAV ₹210.90',
            change: '+15.6%',
            trend: 'up'
        },
        {
            page: 'fund-5',
            type: 'fund',
            title: 'Tech Innovation Fund',
            subtitle: 'Sector Fund',
            value: 'NAV ₹278.45',
            change: '+28.9%',
            trend: 'up'
        },

        // F&O
        {
            page: 'fno-1',
            type: 'fno',
            title: 'Maharashtra ETF',
            subtitle: 'Options Chain',
            value: 'Strike ₹240',
            change: 'Exp: 3 days',
            trend: 'up'
        },
        {
            page: 'fno-2',
            type: 'fno',
            title: 'Karnataka Index',
            subtitle: 'Futures',
            value: '₹268',
            change: '+3.2%',
            trend: 'up'
        },
        {
            page: 'fno-3',
            type: 'fno',
            title: 'Gujarat ETF',
            subtitle: 'Options Chain',
            value: 'Strike ₹180',
            change: 'Exp: 7 days',
            trend: 'up'
        },
        {
            page: 'fno-4',
            type: 'fno',
            title: 'Tamil Nadu Index',
            subtitle: 'Futures',
            value: '₹245',
            change: '+2.8%',
            trend: 'up'
        },

        // Pages
        {page: 'page-1', type: 'page', title: 'District Browser', subtitle: 'Explore all 805 districts'},
        {page: 'page-2', type: 'page', title: 'State F&O', subtitle: 'Futures & Options trading'},
        {page: 'page-3', type: 'page', title: 'Mutual Funds', subtitle: 'AI-powered investment funds'},
        {page: 'page-4', type: 'page', title: 'Portfolio', subtitle: 'View your investments'},
        {page: 'page-5', type: 'page', title: 'Market Performance', subtitle: 'Live market data & analytics'},
        {page: 'page-6', type: 'page', title: 'Live Status', subtitle: 'Real-time market updates'},
        {page: 'page-7', type: 'page', title: 'Insights', subtitle: 'AI-powered market insights'},
        {page: 'page-8', type: 'page', title: 'Settings', subtitle: 'Manage your account'},
    ];

    // Memoized and debounced search functionality
    const performSearch = useMemo(
        () =>
            debounce((query: string) => {
                if (!query.trim()) {
                    setResults([]);
                    return;
                }

                const lowerQuery = query.toLowerCase();
                const filtered = allData.filter(item =>
                    item.title.toLowerCase().includes(lowerQuery) ||
                    item.subtitle?.toLowerCase().includes(lowerQuery) ||
                    item.type.toLowerCase().includes(lowerQuery)
                );

                // Sort by relevance (exact matches first)
                const sorted = filtered.sort((a, b) => {
                    const aExact = a.title.toLowerCase().startsWith(lowerQuery);
                    const bExact = b.title.toLowerCase().startsWith(lowerQuery);
                    if (aExact && !bExact) return -1;
                    if (!aExact && bExact) return 1;
                    return 0;
                });

                setResults(sorted.slice(0, 10)); // Limit to 10 results
                setSelectedIndex(0);
            }, 300),
        [allData]
    );

    useEffect(() => {
        performSearch(searchQuery);
    }, [searchQuery, performSearch]);

    // Handle click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
        if (!isOpen || results.length === 0) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prev => (prev + 1) % results.length);
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
                break;
            case 'Enter':
                e.preventDefault();
                handleSelectResult(results[selectedIndex]);
                break;
            case 'Escape':
                e.preventDefault();
                setIsOpen(false);
                setSearchQuery('');
                break;
        }
    };

    const handleSelectResult = (result: SearchResult) => {
        // Add to recent searches
        setRecentSearches(prev => {
            const filtered = prev.filter(s => s !== result.title);
            return [result.title, ...filtered].slice(0, 5);
        });

        // Navigate based on type
        // if (onNavigate) {
        //     switch (result.type) {
        //         case 'district':
        //             navigate('district-detail', {district: result.title});
        //             break;
        //         case 'state':
        //             navigate('state-fno-detail', {state: result.title});
        //             break;
        //         case 'fund':
        //             navigate('mutual-funds');
        //             break;
        //         case 'fno':
        //             navigate('state-fno');
        //             break;
        //         case 'page':
        //             navigate(result.title.toLowerCase().replace(/\s+/g, '-'));
        //             break;
        //     }
        // }

        setIsOpen(false);
        setSearchQuery('');
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'district':
                return <MapPin className="w-4 h-4"/>;
            case 'state':
                return <Building2 className="w-4 h-4"/>;
            case 'fund':
                return <Sparkles className="w-4 h-4"/>;
            case 'fno':
                return <Zap className="w-4 h-4"/>;
            case 'page':
                return <Hash className="w-4 h-4"/>;
            default:
                return <Search className="w-4 h-4"/>;
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'district':
                return 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-300 dark:border-blue-500/50';
            case 'state':
                return 'bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 border-purple-300 dark:border-purple-500/50';
            case 'fund':
                return 'bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 border-green-300 dark:border-green-500/50';
            case 'fno':
                return 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-300 dark:border-yellow-500/50';
            case 'page':
                return 'bg-gray-100 dark:bg-gray-500/20 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-500/50';
            default:
                return 'bg-gray-100 dark:bg-gray-500/20 text-gray-600 dark:text-gray-400';
        }
    };

    return (
        <div ref={searchRef} className={`relative ${className}`}>
            {/* Search Input */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
                <Input
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className="pl-10 pr-10 rounded-xl border-yellow-400/30 focus:border-yellow-400 focus:ring-yellow-400/20 bg-white/50 dark:bg-black/50"
                />
                {searchQuery && (
                    <button
                        onClick={() => {
                            setSearchQuery('');
                            setResults([]);
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                        <X className="w-4 h-4"/>
                    </button>
                )}
            </div>

            {/* Search Results Dropdown */}
            <AnimatePresence>
                {isOpen && (searchQuery || recentSearches.length > 0) && (
                    <motion.div
                        initial={{opacity: 0, y: -10}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -10}}
                        transition={{duration: 0.2}}
                        className="absolute top-full left-0 right-0 mt-2 z-50"
                    >
                        <Card
                            className="bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-2 border-yellow-400/30 rounded-2xl shadow-2xl shadow-yellow-500/10 overflow-hidden">
                            <ScrollArea className="max-h-[400px]">
                                {results.length > 0 ? (
                                    <div className="p-2">
                                        {/* Group by type */}
                                        {['district', 'state', 'fund', 'fno', 'page'].map(type => {
                                            const typeResults = results.filter(r => r.type === type);
                                            if (typeResults.length === 0) return null;

                                            return (
                                                <div key={type} className="mb-2 last:mb-0">
                                                    <div
                                                        className="px-3 py-2 text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                        {type === 'fno' ? 'F&O' : type}s
                                                    </div>
                                                    {typeResults.map((result, index) => {
                                                        const globalIndex = results.indexOf(result);
                                                        const isSelected = globalIndex === selectedIndex;

                                                        return (
                                                            <motion.button
                                                                key={result.id}
                                                                onClick={() => handleSelectResult(result)}
                                                                onMouseEnter={() => setSelectedIndex(globalIndex)}
                                                                whileHover={{x: 4}}
                                                                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 ${
                                                                    isSelected
                                                                        ? 'bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-400/50'
                                                                        : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                                                                }`}
                                                            >
                                                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                                                    <div
                                                                        className={`w-8 h-8 rounded-lg ${getTypeColor(result.type)} flex items-center justify-center flex-shrink-0 border`}>
                                                                        {getTypeIcon(result.type)}
                                                                    </div>
                                                                    <div className="flex-1 min-w-0 text-left">
                                                                        <div
                                                                            className="text-sm text-gray-900 dark:text-white truncate">
                                                                            {result.title}
                                                                        </div>
                                                                        {result.subtitle && (
                                                                            <div
                                                                                className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                                                                {result.subtitle}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                {result.value && (
                                                                    <div
                                                                        className="flex items-center gap-2 flex-shrink-0 ml-3">
                                                                        <div className="text-right">
                                                                            <div
                                                                                className="text-sm text-gray-900 dark:text-white">
                                                                                {result.value}
                                                                            </div>
                                                                            {result.change && (
                                                                                <div
                                                                                    className={`text-xs flex items-center gap-1 ${
                                                                                        result.trend === 'up'
                                                                                            ? 'text-green-600 dark:text-green-400'
                                                                                            : 'text-red-600 dark:text-red-400'
                                                                                    }`}>
                                                                                    <TrendingUp
                                                                                        className={`w-3 h-3 ${result.trend === 'down' ? 'rotate-180' : ''}`}/>
                                                                                    {result.change}
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                        <ArrowUpRight
                                                                            className="w-4 h-4 text-gray-400"/>
                                                                    </div>
                                                                )}
                                                            </motion.button>
                                                        );
                                                    })}
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : searchQuery ? (
                                    <div className="p-8 text-center">
                                        <div
                                            className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <Search className="w-8 h-8 text-gray-400"/>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">No results
                                            found</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-500">
                                            Try searching for districts, states, or funds
                                        </p>
                                    </div>
                                ) : recentSearches.length > 0 ? (
                                    <div className="p-2">
                                        <div
                                            className="px-3 py-2 text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                            <Clock className="w-3 h-3"/>
                                            Recent Searches
                                        </div>
                                        {recentSearches.map((search, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setSearchQuery(search)}
                                                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200 text-left"
                                            >
                                                <Clock className="w-4 h-4 text-gray-400"/>
                                                <span
                                                    className="text-sm text-gray-700 dark:text-gray-300">{search}</span>
                                            </button>
                                        ))}
                                    </div>
                                ) : null}
                            </ScrollArea>

                            {/* Footer with keyboard shortcuts */}
                            {results.length > 0 && (
                                <>
                                    <Separator className="bg-yellow-400/20"/>
                                    <div
                                        className="px-4 py-2 bg-gray-50/50 dark:bg-gray-900/50 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                        <div className="flex items-center gap-3">
                                            <kbd
                                                className="px-2 py-1 bg-white dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-700">↑↓</kbd>
                                            <span>Navigate</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <kbd
                                                className="px-2 py-1 bg-white dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-700">↵</kbd>
                                            <span>Select</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <kbd
                                                className="px-2 py-1 bg-white dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-700">esc</kbd>
                                            <span>Close</span>
                                        </div>
                                    </div>
                                </>
                            )}
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
