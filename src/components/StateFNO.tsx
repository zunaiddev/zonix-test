import {useEffect, useMemo, useRef, useState} from 'react';
import {Card} from './ui/card';
import {Button} from './ui/button';
import {Badge} from './ui/badge';
import {Input} from './ui/input';
import {Tabs, TabsList, TabsTrigger} from './ui/tabs';
import {
    Activity,
    ArrowDownRight,
    ArrowUpRight,
    Brain,
    Building2,
    ChevronDown,
    ChevronUp,
    Clock,
    Filter,
    Globe,
    Layers,
    Map,
    Minus,
    Search,
    SortAsc,
    Sparkles,
    Target,
    TrendingDown,
    TrendingUp,
    Zap,
} from 'lucide-react';
import {generateStateIndices, StateIndex} from '../utils/mockData';
import {allIndianDistricts} from '../utils/indiaData';
import {calculateAveragePrice, calculateChange, generateSmoothPriceUpdate} from '../utils/livePriceUpdates';
import {useNavigate} from "react-router-dom";

export function StateFNO() {
    const [states, setStates] = useState<StateIndex[]>([]);
    const [filteredStates, setFilteredStates] = useState<StateIndex[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<'volume' | 'expiry' | 'oi' | 'volatility'>('volume');
    const [filterType, setFilterType] = useState<'all' | 'high-oi' | 'low-volatility'>('all');
    const [activeTab, setActiveTab] = useState<'states' | 'uts'>('states');
    const [currentTime, setCurrentTime] = useState(new Date());
    const navigate = useNavigate();

    function onBack() {
        navigate(-1);
    }

    // TradingView Chart Modal State
    const [chartModalOpen, setChartModalOpen] = useState(false);
    const [selectedChartState, setSelectedChartState] = useState<StateIndex | null>(null);

    // Store district prices for calculating state averages
    const [districtPrices, setDistrictPrices] = useState<Record<string, number>>({});
    const initialStatePricesRef = useRef<Record<string, number>>({});

    // India Index state
    const [indiaIndex, setIndiaIndex] = useState({
        value: 12450000,
        change: 2.45,
        volume: 450000000,
        sentiment: 'Bullish' as const,
    });
    const initialIndiaIndexRef = useRef(12450000);

    // Initialize states data
    useEffect(() => {
        const data = generateStateIndices();
        setStates(data);
        setFilteredStates(data);

        // Store initial state prices for change calculation
        data.forEach(state => {
            initialStatePricesRef.current[state.code] = state.value;
        });

        // Initialize district prices (40-550 range)
        const initialDistrictPrices: Record<string, number> = {};
        allIndianDistricts.forEach(district => {
            const randomPrice = 40 + Math.random() * 510; // Range: 40-550
            initialDistrictPrices[`${district.stateCode}-${district.name}`] = randomPrice;
        });
        setDistrictPrices(initialDistrictPrices);
    }, []);

    // Update clock every second
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Live price updates for districts and states every second
    useEffect(() => {
        const priceUpdateInterval = setInterval(() => {
            // Update district prices with smooth 1-2 rupee increments
            setDistrictPrices(prevPrices => {
                const newPrices: Record<string, number> = {};
                Object.entries(prevPrices).forEach(([key, price]) => {
                    const newPrice = generateSmoothPriceUpdate(price, 40, 550);
                    newPrices[key] = newPrice;
                });
                return newPrices;
            });
        }, 1000); // Update every second

        return () => clearInterval(priceUpdateInterval);
    }, []);

    // Calculate state values from district averages
    useEffect(() => {
        if (Object.keys(districtPrices).length === 0) return;

        const updatedStates = states.map(state => {
            // Get all districts for this state
            const stateDistricts = allIndianDistricts.filter(d => d.stateCode === state.code);
            const districtPricesForState = stateDistricts
                .map(d => districtPrices[`${d.stateCode}-${d.name}`])
                .filter((p): p is number => p !== undefined);

            if (districtPricesForState.length === 0) return state;

            // Calculate average price from districts
            const avgPrice = calculateAveragePrice(districtPricesForState);
            const newValue = avgPrice * 10000; // Scale up for state index value

            // Calculate change from initial value
            const initialValue = initialStatePricesRef.current[state.code] || state.value;
            const newChange = calculateChange(initialValue, newValue);

            return {
                ...state,
                value: newValue,
                change: newChange,
            };
        });

        setStates(updatedStates);

        // Calculate India Index as average of all state values
        if (updatedStates.length > 0) {
            const avgStateValue = calculateAveragePrice(updatedStates.map(s => s.value));
            const newIndiaIndexChange = calculateChange(initialIndiaIndexRef.current, avgStateValue);

            setIndiaIndex(prev => ({
                ...prev,
                value: avgStateValue,
                change: newIndiaIndexChange,
                sentiment: newIndiaIndexChange > 0 ? 'Bullish' : newIndiaIndexChange < 0 ? 'Bearish' : 'Neutral',
            }));
        }
    }, [districtPrices]);

    // Filter and sort states
    useEffect(() => {
        let filtered = [...states];

        // Filter by tab (states vs union territories)
        const stateCodes = ['AP', 'AR', 'AS', 'BR', 'CG', 'GA', 'GJ', 'HR', 'HP', 'JH', 'KA', 'KL', 'MP', 'MH', 'MN', 'ML', 'MZ', 'NL', 'OR', 'PB', 'RJ', 'SK', 'TN', 'TS', 'TR', 'UP', 'UK', 'WB'];
        const utCodes = ['AN', 'CH', 'DD', 'DL', 'JK', 'LA', 'LD', 'PY'];

        if (activeTab === 'states') {
            filtered = filtered.filter(s => stateCodes.includes(s.code));
        } else {
            filtered = filtered.filter(s => utCodes.includes(s.code));
        }

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(s =>
                s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                s.code.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Type filter
        if (filterType === 'high-oi') {
            const avgOI = filtered.reduce((sum, s) => sum + s.openInterest, 0) / filtered.length;
            filtered = filtered.filter(s => s.openInterest > avgOI);
        } else if (filterType === 'low-volatility') {
            filtered = filtered.filter(s => s.volatility < 20);
        }

        // Sort
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'volume':
                    return b.volume - a.volume;
                case 'expiry':
                    return a.nextExpiry.localeCompare(b.nextExpiry);
                case 'oi':
                    return b.openInterest - a.openInterest;
                case 'volatility':
                    return b.volatility - a.volatility;
                default:
                    return 0;
            }
        });

        setFilteredStates(filtered);
    }, [states, searchTerm, sortBy, filterType, activeTab]);

    // Market stats
    const marketStats = useMemo(() => {
        const gainers = states.filter(s => s.change > 0).length;
        const losers = states.filter(s => s.change < 0).length;
        const totalVolume = states.reduce((sum, s) => sum + s.volume, 0);
        const totalOI = states.reduce((sum, s) => sum + s.openInterest, 0);
        return {gainers, losers, totalVolume, totalOI};
    }, [states]);

    const getTrendIcon = (trend: 'up' | 'down' | 'neutral') => {
        if (trend === 'up') return <ChevronUp className="w-4 h-4"/>;
        if (trend === 'down') return <ChevronDown className="w-4 h-4"/>;
        return <Minus className="w-4 h-4"/>;
    };

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

            {/* Fixed Top Navbar */}
            <div
                className="sticky top-0 z-50 backdrop-blur-2xl bg-background/95 border-b border-yellow-500/30 shadow-lg shadow-yellow-500/10">
                <div className="max-w-[2000px] mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo & Title */}
                        <div className="flex items-center gap-6">
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 bg-clip-text text-transparent">
                                    Zonix State F&O Dashboard
                                </h1>
                                <p className="text-xs text-muted-foreground">Futures & Options Trading Terminal</p>
                            </div>
                        </div>

                        {/* Live Clock & AI Assistant */}
                        <div className="flex items-center gap-4">
                            <div
                                className="flex items-center gap-3 px-4 py-2 rounded-xl bg-yellow-500/10 border border-yellow-500/30">
                                <Clock className="w-4 h-4 text-yellow-600 dark:text-yellow-400"/>
                                <span className="text-sm text-yellow-600 dark:text-yellow-400 font-mono">
                  {currentTime.toLocaleTimeString('en-IN', {hour: '2-digit', minute: '2-digit', second: '2-digit'})}
                </span>
                            </div>
                            <Button
                                size="sm"
                                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0"
                            >
                                <Brain className="w-4 h-4 mr-2"/>
                                AI Assistant
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative z-10 max-w-[2000px] mx-auto px-6 py-8 space-y-8">
                {/* Hero Banner - Bharat Index */}
                <Card
                    className="relative overflow-hidden border-2 border-yellow-500/30 bg-gradient-to-br from-card/90 via-yellow-50/10 dark:via-yellow-950/20 to-amber-50/10 dark:to-amber-950/20 backdrop-blur-xl shadow-2xl shadow-yellow-500/20">
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 via-transparent to-amber-500/5"></div>

                    <div className="relative z-10 p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            {/* Main Index */}
                            <div className="lg:col-span-3 xl:col-span-3">
                                <div className="flex items-center gap-3 mb-4">
                                    <div
                                        className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center shadow-lg shadow-yellow-500/50">
                                        <Globe className="w-7 h-7 text-white"/>
                                    </div>
                                    <div>
                                        <h2 className="text-lg text-muted-foreground">Bharat Index</h2>
                                        <p className="text-xs text-yellow-600 dark:text-yellow-400">ZONIX-IND</p>
                                    </div>
                                </div>
                                <div
                                    className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent mb-3">
                                    ₹{(indiaIndex.value / 10000).toFixed(2)}L
                                </div>
                                <div
                                    className={`flex items-center gap-2 text-xl lg:text-2xl mb-4 lg:mb-6 ${indiaIndex.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                    {indiaIndex.change >= 0 ? <ArrowUpRight className="w-5 h-5 lg:w-6 lg:h-6"/> :
                                        <ArrowDownRight className="w-5 h-5 lg:w-6 lg:h-6"/>}
                                    <span>{indiaIndex.change >= 0 ? '+' : ''}{indiaIndex.change}%</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="relative flex h-3 w-3">
                                        <span
                                            className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                    </div>
                                    <span className="text-sm text-green-600 dark:text-green-400">MARKETS LIVE</span>
                                </div>
                            </div>

                            {/* Quick Stats Grid */}
                            <div className="lg:col-span-9 xl:col-span-9 grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div
                                    className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30">
                                    <div className="flex items-center gap-2 mb-2">
                                        <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400"/>
                                        <span className="text-xs text-muted-foreground">Gainers</span>
                                    </div>
                                    <p className="text-3xl font-bold text-green-600 dark:text-green-400">{marketStats.gainers}</p>
                                    <p className="text-xs text-green-600/60 dark:text-green-400/60 mt-1">States up
                                        today</p>
                                </div>

                                <div
                                    className="p-4 rounded-xl bg-gradient-to-br from-red-500/10 to-rose-500/10 border border-red-500/30">
                                    <div className="flex items-center gap-2 mb-2">
                                        <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400"/>
                                        <span className="text-xs text-muted-foreground">Losers</span>
                                    </div>
                                    <p className="text-3xl font-bold text-red-600 dark:text-red-400">{marketStats.losers}</p>
                                    <p className="text-xs text-red-600/60 dark:text-red-400/60 mt-1">States down
                                        today</p>
                                </div>

                                <div
                                    className="p-4 rounded-xl bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border border-yellow-500/30">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Activity className="w-5 h-5 text-yellow-600 dark:text-yellow-400"/>
                                        <span className="text-xs text-muted-foreground">Total Volume</span>
                                    </div>
                                    <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">₹{(marketStats.totalVolume / 10000000).toFixed(0)}Cr</p>
                                    <p className="text-xs text-yellow-600/60 dark:text-yellow-400/60 mt-1">24h trading
                                        volume</p>
                                </div>

                                <div
                                    className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Layers className="w-5 h-5 text-amber-600 dark:text-amber-400"/>
                                        <span className="text-xs text-muted-foreground">Open Interest</span>
                                    </div>
                                    <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">₹{(marketStats.totalOI / 10000000).toFixed(0)}Cr</p>
                                    <p className="text-xs text-amber-600/60 dark:text-amber-400/60 mt-1">Total OI across
                                        states</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Filter Bar */}
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Tabs */}
                    <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'states' | 'uts')}
                          className="flex-shrink-0">
                        <TabsList className="bg-muted/50 border border-yellow-500/20 h-12">
                            <TabsTrigger
                                value="states"
                                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-amber-600 data-[state=active]:text-white px-6"
                            >
                                <Map className="w-4 h-4 mr-2"/>
                                State Indices
                            </TabsTrigger>
                            <TabsTrigger
                                value="uts"
                                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white px-6"
                            >
                                <Building2 className="w-4 h-4 mr-2"/>
                                Union Territories
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>

                    {/* Search */}
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"/>
                        <Input
                            placeholder="Search by state name or code..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 bg-muted/50 border-yellow-500/20 placeholder:text-muted-foreground h-12"
                        />
                    </div>

                    {/* Sort */}
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSortBy(sortBy === 'volume' ? 'oi' : sortBy === 'oi' ? 'expiry' : sortBy === 'expiry' ? 'volatility' : 'volume')}
                            className="bg-muted/50 border-yellow-500/20 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-500/20 h-12 px-6"
                        >
                            <SortAsc className="w-4 h-4 mr-2"/>
                            Sort: {sortBy === 'volume' ? 'Volume' : sortBy === 'oi' ? 'OI' : sortBy === 'expiry' ? 'Expiry' : 'Volatility'}
                        </Button>

                        {/* Filter */}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setFilterType(filterType === 'all' ? 'high-oi' : filterType === 'high-oi' ? 'low-volatility' : 'all')}
                            className="bg-muted/50 border-amber-500/20 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 h-12 px-6"
                        >
                            <Filter className="w-4 h-4 mr-2"/>
                            {filterType === 'all' ? 'All' : filterType === 'high-oi' ? 'High OI' : 'Low Vol'}
                        </Button>
                    </div>
                </div>

                {/* State Cards Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredStates.map((state, index) => (
                        <Card
                            key={state.id}
                            className="group relative overflow-hidden border-2 border-yellow-500/20 bg-card/80 backdrop-blur-xl hover:border-yellow-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/20 hover:-translate-y-1 cursor-pointer"
                            style={{
                                animationDelay: `${index * 30}ms`,
                                animation: 'fadeInUp 0.5s ease-out forwards',
                            }}
                        >
                            {/* Glow Effect on Hover */}
                            <div
                                className="absolute inset-0 bg-gradient-to-br from-yellow-500/0 via-amber-500/0 to-orange-500/0 group-hover:from-yellow-500/10 group-hover:via-amber-500/5 group-hover:to-orange-500/10 transition-all duration-500 pointer-events-none"></div>

                            <div className="relative z-10 p-6 space-y-4">
                                {/* Header */}
                                <div className="flex items-start justify-between">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="text-lg font-bold">{state.name}</h3>
                                            <Badge
                                                className="bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border border-yellow-500/40 text-xs">
                                                {state.code}-X
                                            </Badge>
                                        </div>
                                        <p className="text-xs text-muted-foreground">{state.districtCount} districts</p>
                                    </div>
                                    <Badge className={`${
                                        state.sentiment === 'Bullish' ? 'bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/40' :
                                            state.sentiment === 'Bearish' ? 'bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/40' :
                                                'bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/40'
                                    } border text-xs`}>
                                        {state.sentiment}
                                    </Badge>
                                </div>

                                {/* Current Value */}
                                <div>
                                    <div
                                        className="text-4xl font-bold bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent mb-2">
                                        ₹{(state.value / 10000).toFixed(2)}L
                                    </div>
                                    <div
                                        className={`flex items-center gap-2 ${state.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                        {state.change >= 0 ? <ArrowUpRight className="w-4 h-4"/> :
                                            <ArrowDownRight className="w-4 h-4"/>}
                                        <span className="text-lg font-semibold">
                      {state.change >= 0 ? '+' : ''}{state.change.toFixed(2)}%
                    </span>
                                        <span className="text-xs text-muted-foreground">(24h)</span>
                                    </div>
                                </div>

                                {/* F&O Metrics */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div
                                        className="p-3 rounded-lg bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30">
                                        <p className="text-xs text-muted-foreground mb-1">Next Expiry</p>
                                        <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">{state.nextExpiry}</p>
                                    </div>
                                    <div
                                        className="p-3 rounded-lg bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border border-yellow-500/30">
                                        <p className="text-xs text-muted-foreground mb-1">Contracts (24h)</p>
                                        <p className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">{(state.contractsTraded24h / 1000000).toFixed(1)}M</p>
                                    </div>
                                    <div
                                        className="p-3 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30">
                                        <p className="text-xs text-muted-foreground mb-1">Open Interest</p>
                                        <p className="text-sm font-semibold text-green-600 dark:text-green-400">{(state.openInterest / 1000000).toFixed(1)}M</p>
                                    </div>
                                    <div
                                        className="p-3 rounded-lg bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30">
                                        <p className="text-xs text-muted-foreground mb-1">Volatility</p>
                                        <p className="text-sm font-semibold text-orange-600 dark:text-orange-400">{state.volatility.toFixed(1)}%</p>
                                    </div>
                                </div>

                                {/* AI Trend & Top Contributor */}
                                <div
                                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                            state.aiTrend === 'up' ? 'bg-green-500/20 text-green-600 dark:text-green-400' :
                                                state.aiTrend === 'down' ? 'bg-red-500/20 text-red-600 dark:text-red-400' :
                                                    'bg-blue-500/20 text-blue-600 dark:text-blue-400'
                                        }`}>
                                            {getTrendIcon(state.aiTrend)}
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">AI Trend</p>
                                            <p className="text-sm font-semibold capitalize">{state.aiTrend}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-muted-foreground">Top Contributor</p>
                                        <p className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">{state.topContributor}</p>
                                    </div>
                                </div>

                                {/* Rank Badge */}
                                <div className="flex items-center justify-between">
                                    <Badge
                                        className="bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/40">
                                        <Target className="w-3 h-3 mr-1"/>
                                        Rank #{state.rank}
                                    </Badge>
                                    <div className="text-xs text-muted-foreground">
                                        Avg District: <span
                                        className={state.avgDistrictPerformance >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                      {state.avgDistrictPerformance >= 0 ? '+' : ''}{state.avgDistrictPerformance.toFixed(2)}%
                    </span>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border">
                                    <Button
                                        size="sm"
                                        className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg shadow-green-500/30"
                                    >
                                        <Zap className="w-3 h-3 mr-1"/>
                                        Long
                                    </Button>
                                    <Button
                                        size="sm"
                                        className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white shadow-lg shadow-red-500/30"
                                    >
                                        <Zap className="w-3 h-3 mr-1"/>
                                        Short
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => navigate('state-fno-detail', state)}
                                        className="border-yellow-500/40 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-500/20"
                                    >
                                        <Sparkles className="w-3 h-3 mr-1"/>
                                        Details
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* No Results */}
                {filteredStates.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-muted-foreground"/>
                        </div>
                        <p className="text-xl text-muted-foreground mb-2">No states found</p>
                        <p className="text-sm text-muted-foreground/60">Try adjusting your search or filters</p>
                    </div>
                )}
            </div>

            <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
        </div>
    );
}