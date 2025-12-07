import {useEffect, useState} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {Card} from './ui/card';
import {Button} from './ui/button';
import {Badge} from './ui/badge';
import {Input} from './ui/input';
import {Tabs, TabsList, TabsTrigger} from './ui/tabs';
import {
    Activity,
    ArrowDownRight,
    ArrowLeft,
    ArrowUpRight,
    Bell,
    BellOff,
    ChevronDown,
    ChevronUp,
    Download,
    MapPin,
    Plus,
    RefreshCw,
    Search,
    Sparkles,
    Star,
    Target,
    TrendingDown,
    TrendingUp,
    X,
} from 'lucide-react';
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,} from 'recharts';
import {useNavigate} from "react-router-dom";

interface WatchlistProps {
    onBack: () => void;
}

interface WatchlistItem {
    id: number;
    name: string;
    type: 'District Token' | 'State F&O' | 'Mutual Fund' | 'State ETF';
    state: string;
    price: number;
    change: number;
    changePercent: number;
    volume: string;
    marketCap: string;
    high52w: number;
    low52w: number;
    avgVolume: string;
    pe: number;
    trend: number[];
    historicalData: { time: string; price: number }[];
    isWatching: boolean;
    hasAlert: boolean;
    alertPrice?: number;
    alertType?: 'above' | 'below';
    addedDate: string;
    category: 'top-gainer' | 'top-loser' | 'most-active' | 'recent' | 'all';
}

export function Watchlist() {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<'name' | 'price' | 'change' | 'volume'>('change');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [filterType, setFilterType] = useState<'all' | 'District Token' | 'State F&O' | 'Mutual Fund' | 'State ETF'>('all');
    const [activeTab, setActiveTab] = useState<'all' | 'gainers' | 'losers' | 'alerts'>('all');
    const [showAddModal, setShowAddModal] = useState(false);
    const [autoRefresh, setAutoRefresh] = useState(true);
    const [selectedItem, setSelectedItem] = useState<WatchlistItem | null>(null);
    const navigate = useNavigate();

    function onBack() {
        navigate(-1);
    }

    // Generate historical data for chart
    const generateHistoricalData = (basePrice: number) => {
        const data = [];
        const now = new Date();
        for (let i = 24; i >= 0; i--) {
            const time = new Date(now.getTime() - i * 60 * 60 * 1000);
            const variance = (Math.random() - 0.5) * basePrice * 0.05;
            data.push({
                time: time.toLocaleTimeString('en-IN', {hour: '2-digit', minute: '2-digit'}),
                price: basePrice + variance,
            });
        }
        return data;
    };

    const [watchlistItems, setWatchlistItems] = useState<WatchlistItem[]>([
        {
            page: 1,
            name: 'Mumbai',
            type: 'District Token',
            state: 'Maharashtra',
            price: 234.50,
            change: 19.75,
            changePercent: 8.45,
            volume: '₹42.5Cr',
            marketCap: '₹1240Cr',
            high52w: 245.0,
            low52w: 180.0,
            avgVolume: '₹38Cr',
            pe: 24.5,
            trend: [220, 225, 230, 228, 234],
            historicalData: generateHistoricalData(234.50),
            isWatching: true,
            hasAlert: true,
            alertPrice: 240.0,
            alertType: 'above',
            addedDate: '2025-10-15',
            category: 'top-gainer',
        },
        {
            page: 2,
            name: 'Bengaluru',
            type: 'District Token',
            state: 'Karnataka',
            price: 198.20,
            change: 13.02,
            changePercent: 6.78,
            volume: '₹38.2Cr',
            marketCap: '₹980Cr',
            high52w: 210.0,
            low52w: 165.0,
            avgVolume: '₹32Cr',
            pe: 22.8,
            trend: [185, 190, 195, 196, 198],
            historicalData: generateHistoricalData(198.20),
            isWatching: true,
            hasAlert: false,
            addedDate: '2025-10-20',
            category: 'top-gainer',
        },
        {
            page: 3,
            name: 'Maharashtra Index',
            type: 'State F&O',
            state: 'Maharashtra',
            price: 1456.30,
            change: 45.20,
            changePercent: 3.20,
            volume: '₹580Cr',
            marketCap: '₹5200Cr',
            high52w: 1500.0,
            low52w: 1200.0,
            avgVolume: '₹520Cr',
            pe: 18.4,
            trend: [1400, 1420, 1440, 1450, 1456],
            historicalData: generateHistoricalData(1456.30),
            isWatching: true,
            hasAlert: true,
            alertPrice: 1500.0,
            alertType: 'above',
            addedDate: '2025-10-10',
            category: 'most-active',
        },
        {
            page: 4,
            name: 'Bharat Growth Fund',
            type: 'Mutual Fund',
            state: 'India',
            price: 145.82,
            change: 2.45,
            changePercent: 1.71,
            volume: '₹2.4L',
            marketCap: '₹850Cr',
            high52w: 155.0,
            low52w: 120.0,
            avgVolume: '₹2.1L',
            pe: 0,
            trend: [140, 142, 144, 145, 146],
            historicalData: generateHistoricalData(145.82),
            isWatching: true,
            hasAlert: false,
            addedDate: '2025-10-05',
            category: 'recent',
        },
        {
            page: 5,
            name: 'Ahmedabad',
            type: 'District Token',
            state: 'Gujarat',
            price: 142.30,
            change: -3.15,
            changePercent: -2.15,
            volume: '₹22.1Cr',
            marketCap: '₹640Cr',
            high52w: 165.0,
            low52w: 138.0,
            avgVolume: '₹25Cr',
            pe: 19.2,
            trend: [148, 146, 145, 143, 142],
            historicalData: generateHistoricalData(142.30),
            isWatching: true,
            hasAlert: true,
            alertPrice: 140.0,
            alertType: 'below',
            addedDate: '2025-10-18',
            category: 'top-loser',
        },
        {
            page: 6,
            name: 'Pune',
            type: 'District Token',
            state: 'Maharashtra',
            price: 156.80,
            change: 7.78,
            changePercent: 5.23,
            volume: '₹28.5Cr',
            marketCap: '₹720Cr',
            high52w: 170.0,
            low52w: 135.0,
            avgVolume: '₹24Cr',
            pe: 21.5,
            trend: [148, 152, 155, 154, 157],
            historicalData: generateHistoricalData(156.80),
            isWatching: true,
            hasAlert: false,
            addedDate: '2025-10-22',
            category: 'top-gainer',
        },
        {
            page: 7,
            name: 'Karnataka Index',
            type: 'State F&O',
            state: 'Karnataka',
            price: 1298.50,
            change: 52.30,
            changePercent: 4.20,
            volume: '₹420Cr',
            marketCap: '₹4100Cr',
            high52w: 1350.0,
            low52w: 1050.0,
            avgVolume: '₹380Cr',
            pe: 17.8,
            trend: [1220, 1245, 1270, 1285, 1298],
            historicalData: generateHistoricalData(1298.50),
            isWatching: true,
            hasAlert: false,
            addedDate: '2025-10-12',
            category: 'top-gainer',
        },
        {
            page: 8,
            name: 'Digital India Fund',
            type: 'Mutual Fund',
            state: 'India',
            price: 98.45,
            change: -1.25,
            changePercent: -1.25,
            volume: '₹1.8L',
            marketCap: '₹620Cr',
            high52w: 110.0,
            low52w: 85.0,
            avgVolume: '₹1.5L',
            pe: 0,
            trend: [102, 100, 99, 98.5, 98.45],
            historicalData: generateHistoricalData(98.45),
            isWatching: true,
            hasAlert: true,
            alertPrice: 95.0,
            alertType: 'below',
            addedDate: '2025-10-08',
            category: 'top-loser',
        },
    ]);

    // Auto-refresh prices
    useEffect(() => {
        if (!autoRefresh) return;

        const interval = setInterval(() => {
            setWatchlistItems(prev => prev.map(item => {
                const variance = (Math.random() - 0.5) * 2;
                const newPrice = Math.max(0, item.price + variance);
                const newChange = newPrice - (item.price - item.change);
                const newChangePercent = ((newChange / (newPrice - newChange)) * 100);

                return {
                    ...item,
                    price: newPrice,
                    change: newChange,
                    changePercent: newChangePercent,
                };
            }));
        }, 5000);

        return () => clearInterval(interval);
    }, [autoRefresh]);

    // Filter and sort items
    const getFilteredAndSortedItems = () => {
        let filtered = watchlistItems.filter(item => item.isWatching);

        // Filter by tab
        if (activeTab === 'gainers') {
            filtered = filtered.filter(item => item.change > 0).sort((a, b) => b.changePercent - a.changePercent);
        } else if (activeTab === 'losers') {
            filtered = filtered.filter(item => item.change < 0).sort((a, b) => a.changePercent - b.changePercent);
        } else if (activeTab === 'alerts') {
            filtered = filtered.filter(item => item.hasAlert);
        }

        // Filter by type
        if (filterType !== 'all') {
            filtered = filtered.filter(item => item.type === filterType);
        }

        // Filter by search
        if (searchQuery) {
            filtered = filtered.filter(item =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.state.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Sort
        filtered.sort((a, b) => {
            let comparison = 0;
            switch (sortBy) {
                case 'name':
                    comparison = a.name.localeCompare(b.name);
                    break;
                case 'price':
                    comparison = a.price - b.price;
                    break;
                case 'change':
                    comparison = a.changePercent - b.changePercent;
                    break;
                case 'volume':
                    comparison = parseFloat(a.volume.replace(/[^0-9.]/g, '')) - parseFloat(b.volume.replace(/[^0-9.]/g, ''));
                    break;
            }
            return sortOrder === 'asc' ? comparison : -comparison;
        });

        return filtered;
    };

    const filteredItems = getFilteredAndSortedItems();

    // Statistics
    const totalItems = watchlistItems.filter(w => w.isWatching).length;
    const gainers = watchlistItems.filter(w => w.isWatching && w.change > 0).length;
    const losers = watchlistItems.filter(w => w.isWatching && w.change < 0).length;
    const activeAlerts = watchlistItems.filter(w => w.isWatching && w.hasAlert).length;
    const totalValue = watchlistItems
        .filter(w => w.isWatching)
        .reduce((sum, item) => sum + item.price, 0);
    const avgChange = watchlistItems
        .filter(w => w.isWatching)
        .reduce((sum, item) => sum + item.changePercent, 0) / (totalItems || 1);

    const toggleSort = (field: typeof sortBy) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('desc');
        }
    };

    const toggleAlert = (id: number) => {
        setWatchlistItems(prev =>
            prev.map(item =>
                item.id === id ? {...item, hasAlert: !item.hasAlert} : item
            )
        );
    };

    const removeFromWatchlist = (id: number) => {
        setWatchlistItems(prev =>
            prev.map(item =>
                item.id === id ? {...item, isWatching: false} : item
            )
        );
    };

    return (
        <div className="min-h-screen p-4 sm:p-6 space-y-6">
            {/* Header */}
            <motion.div
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                className="relative"
            >
                <Card
                    className="border-2 border-yellow-500/30 bg-gradient-to-br from-card/90 via-yellow-50/5 dark:via-yellow-950/10 to-card backdrop-blur-xl shadow-2xl">
                    <div className="p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            {/* Left: Title & Stats */}
                            <div className="flex items-center gap-4">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={onBack}
                                    className="hover:bg-yellow-500/10"
                                >
                                    <ArrowLeft className="w-4 h-4"/>
                                </Button>
                                <div>
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center shadow-lg">
                                            <Star className="w-6 h-6 text-white fill-white"/>
                                        </div>
                                        <div>
                                            <h1 className="text-2xl">My Watchlist</h1>
                                            <p className="text-sm text-muted-foreground">
                                                {totalItems} assets • {gainers} gainers • {losers} losers
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Quick Actions */}
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setAutoRefresh(!autoRefresh)}
                                    className={autoRefresh ? 'border-green-500/50 text-green-600' : ''}
                                >
                                    <RefreshCw className={`w-4 h-4 mr-2 ${autoRefresh ? 'animate-spin' : ''}`}/>
                                    {autoRefresh ? 'Live' : 'Paused'}
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-yellow-500/30 hover:border-yellow-500/50"
                                >
                                    <Download className="w-4 h-4 mr-2"/>
                                    Export
                                </Button>
                                <Button
                                    size="sm"
                                    className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white shadow-lg"
                                    onClick={() => setShowAddModal(true)}
                                >
                                    <Plus className="w-4 h-4 mr-2"/>
                                    Add Asset
                                </Button>
                            </div>
                        </div>

                        {/* Overview Stats Cards */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                            <div
                                className="p-3 rounded-xl bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20">
                                <div className="flex items-center gap-2 mb-1">
                                    <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400"/>
                                    <span className="text-xs text-muted-foreground">Gainers</span>
                                </div>
                                <div className="text-2xl text-green-600 dark:text-green-400">{gainers}</div>
                            </div>
                            <div
                                className="p-3 rounded-xl bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/20">
                                <div className="flex items-center gap-2 mb-1">
                                    <TrendingDown className="w-4 h-4 text-red-600 dark:text-red-400"/>
                                    <span className="text-xs text-muted-foreground">Losers</span>
                                </div>
                                <div className="text-2xl text-red-600 dark:text-red-400">{losers}</div>
                            </div>
                            <div
                                className="p-3 rounded-xl bg-gradient-to-br from-yellow-500/10 to-amber-600/5 border border-yellow-500/20">
                                <div className="flex items-center gap-2 mb-1">
                                    <Bell className="w-4 h-4 text-yellow-600 dark:text-yellow-400"/>
                                    <span className="text-xs text-muted-foreground">Alerts</span>
                                </div>
                                <div className="text-2xl text-yellow-600 dark:text-yellow-400">{activeAlerts}</div>
                            </div>
                            <div
                                className="p-3 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20">
                                <div className="flex items-center gap-2 mb-1">
                                    <Activity className="w-4 h-4 text-blue-600 dark:text-blue-400"/>
                                    <span className="text-xs text-muted-foreground">Avg Change</span>
                                </div>
                                <div
                                    className={`text-2xl ${avgChange >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                    {avgChange >= 0 ? '+' : ''}{avgChange.toFixed(2)}%
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </motion.div>

            {/* Filters & Search */}
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.1}}
            >
                <Card className="border-2 border-border/50 bg-card/50 backdrop-blur-xl">
                    <div className="p-4">
                        <div className="flex flex-col lg:flex-row gap-4">
                            {/* Tabs */}
                            <Tabs value={activeTab} onValueChange={(v: any) => setActiveTab(v)} className="flex-1">
                                <TabsList className="grid w-full grid-cols-4">
                                    <TabsTrigger value="all">All</TabsTrigger>
                                    <TabsTrigger value="gainers">Gainers</TabsTrigger>
                                    <TabsTrigger value="losers">Losers</TabsTrigger>
                                    <TabsTrigger value="alerts">Alerts</TabsTrigger>
                                </TabsList>
                            </Tabs>

                            {/* Search */}
                            <div className="relative flex-1">
                                <Search
                                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"/>
                                <Input
                                    placeholder="Search assets..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>

                            {/* Type Filter */}
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value as any)}
                                className="px-4 py-2 rounded-lg border border-border bg-background text-sm"
                            >
                                <option value="all">All Types</option>
                                <option value="District Token">District Tokens</option>
                                <option value="State F&O">State F&O</option>
                                <option value="Mutual Fund">Mutual Funds</option>
                                <option value="State ETF">State ETFs</option>
                            </select>
                        </div>
                    </div>
                </Card>
            </motion.div>

            {/* Watchlist Table */}
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.2}}
            >
                <Card className="border-2 border-border/50 bg-card/50 backdrop-blur-xl">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                            <tr className="border-b border-border/50">
                                <th className="text-left p-4 text-xs text-muted-foreground uppercase">
                                    <button
                                        onClick={() => toggleSort('name')}
                                        className="flex items-center gap-1 hover:text-foreground transition-colors"
                                    >
                                        Asset
                                        {sortBy === 'name' && (sortOrder === 'asc' ? <ChevronUp className="w-3 h-3"/> :
                                            <ChevronDown className="w-3 h-3"/>)}
                                    </button>
                                </th>
                                <th className="text-left p-4 text-xs text-muted-foreground uppercase">Type</th>
                                <th className="text-right p-4 text-xs text-muted-foreground uppercase">
                                    <button
                                        onClick={() => toggleSort('price')}
                                        className="flex items-center gap-1 hover:text-foreground transition-colors ml-auto"
                                    >
                                        Price
                                        {sortBy === 'price' && (sortOrder === 'asc' ? <ChevronUp className="w-3 h-3"/> :
                                            <ChevronDown className="w-3 h-3"/>)}
                                    </button>
                                </th>
                                <th className="text-right p-4 text-xs text-muted-foreground uppercase">
                                    <button
                                        onClick={() => toggleSort('change')}
                                        className="flex items-center gap-1 hover:text-foreground transition-colors ml-auto"
                                    >
                                        Change
                                        {sortBy === 'change' && (sortOrder === 'asc' ?
                                            <ChevronUp className="w-3 h-3"/> : <ChevronDown className="w-3 h-3"/>)}
                                    </button>
                                </th>
                                <th className="text-right p-4 text-xs text-muted-foreground uppercase">
                                    <button
                                        onClick={() => toggleSort('volume')}
                                        className="flex items-center gap-1 hover:text-foreground transition-colors ml-auto"
                                    >
                                        Volume
                                        {sortBy === 'volume' && (sortOrder === 'asc' ?
                                            <ChevronUp className="w-3 h-3"/> : <ChevronDown className="w-3 h-3"/>)}
                                    </button>
                                </th>
                                <th className="text-center p-4 text-xs text-muted-foreground uppercase">Trend</th>
                                <th className="text-center p-4 text-xs text-muted-foreground uppercase">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            <AnimatePresence>
                                {filteredItems.map((item, idx) => (
                                    <motion.tr
                                        key={item.id}
                                        initial={{opacity: 0, x: -20}}
                                        animate={{opacity: 1, x: 0}}
                                        exit={{opacity: 0, x: 20}}
                                        transition={{delay: idx * 0.05}}
                                        className="border-b border-border/30 hover:bg-yellow-500/5 transition-colors cursor-pointer"
                                        onClick={() => setSelectedItem(item)}
                                    >
                                        {/* Asset Name */}
                                        <td className="p-4">
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <div className="font-medium">{item.name}</div>
                                                    {item.hasAlert && (
                                                        <Bell className="w-3 h-3 text-yellow-500 fill-yellow-500"/>
                                                    )}
                                                </div>
                                                <div className="text-xs text-muted-foreground flex items-center gap-1">
                                                    <MapPin className="w-3 h-3"/>
                                                    {item.state}
                                                </div>
                                            </div>
                                        </td>

                                        {/* Type */}
                                        <td className="p-4">
                                            <Badge variant="outline" className="text-xs">
                                                {item.type}
                                            </Badge>
                                        </td>

                                        {/* Price */}
                                        <td className="p-4 text-right">
                                            <div className="font-medium">₹{item.price.toFixed(2)}</div>
                                        </td>

                                        {/* Change */}
                                        <td className="p-4 text-right">
                                            <div className={`flex items-center justify-end gap-1 ${
                                                item.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                                            }`}>
                                                {item.change >= 0 ? (
                                                    <ArrowUpRight className="w-3 h-3"/>
                                                ) : (
                                                    <ArrowDownRight className="w-3 h-3"/>
                                                )}
                                                <span className="text-sm font-medium">
                            {item.change >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
                          </span>
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                ₹{Math.abs(item.change).toFixed(2)}
                                            </div>
                                        </td>

                                        {/* Volume */}
                                        <td className="p-4 text-right">
                                            <div className="text-sm">{item.volume}</div>
                                            <div className="text-xs text-muted-foreground">MCap: {item.marketCap}</div>
                                        </td>

                                        {/* Trend Chart */}
                                        <td className="p-4">
                                            <div className="w-24 h-10 mx-auto">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <AreaChart data={item.trend.map((value, i) => ({value}))}>
                                                        <defs>
                                                            <linearGradient id={`miniGradient${item.id}`} x1="0" y1="0"
                                                                            x2="0" y2="1">
                                                                <stop offset="5%"
                                                                      stopColor={item.change >= 0 ? "#10B981" : "#EF4444"}
                                                                      stopOpacity={0.3}/>
                                                                <stop offset="95%"
                                                                      stopColor={item.change >= 0 ? "#10B981" : "#EF4444"}
                                                                      stopOpacity={0}/>
                                                            </linearGradient>
                                                        </defs>
                                                        <Area
                                                            type="monotone"
                                                            dataKey="value"
                                                            stroke={item.change >= 0 ? "#10B981" : "#EF4444"}
                                                            strokeWidth={1.5}
                                                            fill={`url(#miniGradient${item.id})`}
                                                            isAnimationActive={false}
                                                        />
                                                    </AreaChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </td>

                                        {/* Actions */}
                                        <td className="p-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className={`h-8 w-8 p-0 ${item.hasAlert ? 'text-yellow-500 hover:text-yellow-600' : 'text-muted-foreground'}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleAlert(item.id);
                                                    }}
                                                >
                                                    {item.hasAlert ? <Bell className="w-4 h-4 fill-yellow-500"/> :
                                                        <BellOff className="w-4 h-4"/>}
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeFromWatchlist(item.id);
                                                    }}
                                                >
                                                    <X className="w-4 h-4"/>
                                                </Button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                            </tbody>
                        </table>

                        {/* Empty State */}
                        {filteredItems.length === 0 && (
                            <div className="text-center py-12">
                                <Star className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4"/>
                                <p className="text-muted-foreground">No assets in your watchlist</p>
                                <Button
                                    className="mt-4 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white"
                                    onClick={() => setShowAddModal(true)}
                                >
                                    <Plus className="w-4 h-4 mr-2"/>
                                    Add Your First Asset
                                </Button>
                            </div>
                        )}
                    </div>
                </Card>
            </motion.div>

            {/* Detail Modal */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedItem(null)}
                    >
                        <motion.div
                            initial={{scale: 0.9, opacity: 0}}
                            animate={{scale: 1, opacity: 1}}
                            exit={{scale: 0.9, opacity: 0}}
                            className="w-full max-w-4xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Card className="border-2 border-yellow-500/30 bg-card/95 backdrop-blur-xl">
                                <div className="p-6">
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-6">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <h2 className="text-2xl">{selectedItem.name}</h2>
                                                <Badge variant="outline">{selectedItem.type}</Badge>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <MapPin className="w-4 h-4"/>
                                                <span>{selectedItem.state}</span>
                                                <span className="text-muted-foreground/50">•</span>
                                                <span>Added {new Date(selectedItem.addedDate).toLocaleDateString('en-IN')}</span>
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setSelectedItem(null)}
                                        >
                                            <X className="w-5 h-5"/>
                                        </Button>
                                    </div>

                                    {/* Price & Stats Grid */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                        <div
                                            className="p-4 rounded-xl border border-border/50 bg-gradient-to-br from-card to-card/50">
                                            <div className="text-xs text-muted-foreground mb-1">Current Price</div>
                                            <div className="text-2xl">₹{selectedItem.price.toFixed(2)}</div>
                                            <div className={`text-sm flex items-center gap-1 mt-1 ${
                                                selectedItem.change >= 0 ? 'text-green-600' : 'text-red-600'
                                            }`}>
                                                {selectedItem.change >= 0 ? <ArrowUpRight className="w-3 h-3"/> :
                                                    <ArrowDownRight className="w-3 h-3"/>}
                                                {selectedItem.changePercent.toFixed(2)}%
                                            </div>
                                        </div>
                                        <div
                                            className="p-4 rounded-xl border border-border/50 bg-gradient-to-br from-card to-card/50">
                                            <div className="text-xs text-muted-foreground mb-1">52W High</div>
                                            <div className="text-xl">₹{selectedItem.high52w.toFixed(2)}</div>
                                        </div>
                                        <div
                                            className="p-4 rounded-xl border border-border/50 bg-gradient-to-br from-card to-card/50">
                                            <div className="text-xs text-muted-foreground mb-1">52W Low</div>
                                            <div className="text-xl">₹{selectedItem.low52w.toFixed(2)}</div>
                                        </div>
                                        <div
                                            className="p-4 rounded-xl border border-border/50 bg-gradient-to-br from-card to-card/50">
                                            <div className="text-xs text-muted-foreground mb-1">Volume</div>
                                            <div className="text-xl">{selectedItem.volume}</div>
                                        </div>
                                    </div>

                                    {/* Chart */}
                                    <div className="h-64 mb-6">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={selectedItem.historicalData}>
                                                <defs>
                                                    <linearGradient id="detailGradient" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#FFD54F" stopOpacity={0.3}/>
                                                        <stop offset="95%" stopColor="#FFD54F" stopOpacity={0}/>
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.1}/>
                                                <XAxis
                                                    dataKey="time"
                                                    style={{fontSize: '10px'}}
                                                    stroke="#888"
                                                />
                                                <YAxis
                                                    style={{fontSize: '10px'}}
                                                    stroke="#888"
                                                    domain={['dataMin - 5', 'dataMax + 5']}
                                                />
                                                <Tooltip
                                                    contentStyle={{
                                                        backgroundColor: 'rgba(0,0,0,0.9)',
                                                        border: '1px solid rgba(255, 213, 79, 0.3)',
                                                        borderRadius: '8px',
                                                    }}
                                                />
                                                <Area
                                                    type="monotone"
                                                    dataKey="price"
                                                    stroke="#FFD54F"
                                                    strokeWidth={2}
                                                    fill="url(#detailGradient)"
                                                />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>

                                    {/* Alert Settings */}
                                    {selectedItem.hasAlert && (
                                        <div className="p-4 rounded-xl border border-yellow-500/30 bg-yellow-500/10">
                                            <div className="flex items-center gap-3">
                                                <Bell className="w-5 h-5 text-yellow-500 fill-yellow-500"/>
                                                <div>
                                                    <div className="font-medium">Price Alert Active</div>
                                                    <div className="text-sm text-muted-foreground">
                                                        Alert when price
                                                        goes {selectedItem.alertType} ₹{selectedItem.alertPrice}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Actions */}
                                    <div className="flex gap-3 mt-6">
                                        <Button
                                            className="flex-1 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white"
                                        >
                                            <Target className="w-4 h-4 mr-2"/>
                                            Trade Now
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="flex-1"
                                            onClick={() => toggleAlert(selectedItem.id)}
                                        >
                                            <Bell className="w-4 h-4 mr-2"/>
                                            {selectedItem.hasAlert ? 'Remove Alert' : 'Set Alert'}
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="border-red-500/30 text-red-500 hover:bg-red-500/10"
                                            onClick={() => {
                                                removeFromWatchlist(selectedItem.id);
                                                setSelectedItem(null);
                                            }}
                                        >
                                            <X className="w-4 h-4 mr-2"/>
                                            Remove
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Add Asset Modal */}
            <AnimatePresence>
                {showAddModal && (
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowAddModal(false)}
                    >
                        <motion.div
                            initial={{scale: 0.9, opacity: 0}}
                            animate={{scale: 1, opacity: 1}}
                            exit={{scale: 0.9, opacity: 0}}
                            className="w-full max-w-md"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Card className="border-2 border-yellow-500/30 bg-card/95 backdrop-blur-xl">
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-xl">Add to Watchlist</h3>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setShowAddModal(false)}
                                        >
                                            <X className="w-5 h-5"/>
                                        </Button>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="relative">
                                            <Search
                                                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"/>
                                            <Input
                                                placeholder="Search for assets..."
                                                className="pl-10"
                                            />
                                        </div>

                                        <div className="text-center py-8 text-muted-foreground">
                                            <Sparkles className="w-12 h-12 mx-auto mb-3 text-muted-foreground/30"/>
                                            <p>Search functionality coming soon!</p>
                                            <p className="text-sm mt-2">Browse available assets and add them to your
                                                watchlist</p>
                                        </div>

                                        <Button
                                            className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white"
                                            onClick={() => setShowAddModal(false)}
                                        >
                                            Close
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
