import {useMemo, useState} from 'react';
import {Card} from './ui/card';
import {Badge} from './ui/badge';
import {Button} from './ui/button';
import {Tabs, TabsContent, TabsList, TabsTrigger} from './ui/tabs';
import {Progress} from './ui/progress';
import {Separator} from './ui/separator';
import {ScrollArea} from './ui/scroll-area';
import {
    Activity,
    AlertCircle,
    ArrowLeft,
    BarChart3,
    Bell,
    Bookmark,
    Brain,
    Building2,
    Calendar,
    CheckCircle2,
    Coins,
    Crown,
    DollarSign,
    FileText,
    Gauge,
    Info,
    Layers,
    LineChart,
    Lock,
    MapPin,
    Network,
    PieChart,
    Radio,
    Rocket,
    Share2,
    Shield,
    Target,
    TrendingDown,
    TrendingUp,
    TrendingUpDown,
    Users,
    Vote,
    Wallet,
} from 'lucide-react';
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    ComposedChart,
    Legend,
    Line,
    LineChart as RechartsLineChart,
    Pie,
    PieChart as RechartsPieChart,
    PolarAngleAxis,
    PolarGrid,
    PolarRadiusAxis,
    Radar,
    RadarChart,
    ResponsiveContainer,
    Tooltip as RechartsTooltip,
    XAxis,
    YAxis
} from 'recharts';
import {DistrictToken} from './DistrictBrowser';

interface DistrictDetailPageProps {
    district: DistrictToken;
    onBack: () => void;
}

export default function DistrictDetailPage({district, onBack}: DistrictDetailPageProps) {
    const [activeTab, setActiveTab] = useState('overview');
    const [chartPeriod, setChartPeriod] = useState('1M');
    const [isBookmarked, setIsBookmarked] = useState(false);

    // Generate mock historical price data
    const priceHistoryData = useMemo(() => {
        const periods: Record<string, number> = {
            '1D': 24,
            '1W': 7,
            '1M': 30,
            '3M': 90,
            '1Y': 365,
            'ALL': 730,
        };
        const dataPoints = periods[chartPeriod] || 30;
        const basePrice = district.price;

        return Array.from({length: dataPoints}, (_, i) => {
            const variation = (Math.random() - 0.5) * 10;
            return {
                time: chartPeriod === '1D' ? `${i}:00` : `D${i + 1}`,
                price: basePrice + variation,
                volume: district.volume24h * (0.8 + Math.random() * 0.4),
            };
        });
    }, [chartPeriod, district.price, district.volume24h]);

    // Calculate metrics
    const dayHigh = useMemo(() => district.price * 1.05, [district.price]);
    const dayLow = useMemo(() => district.price * 0.95, [district.price]);
    const week52High = useMemo(() => district.price * 1.25, [district.price]);
    const week52Low = useMemo(() => district.price * 0.75, [district.price]);

    // Sector data for pie chart
    const sectorData = [
        {name: 'Agriculture', value: district.sectors.agriculture, color: '#10B981'},
        {name: 'Industry', value: district.sectors.industry, color: '#F59E0B'},
        {name: 'Services', value: district.sectors.services, color: '#3B82F6'},
        {name: 'Technology', value: district.sectors.tech, color: '#8B5CF6'},
    ];

    // AI Forecast data
    const forecastData = useMemo(() => {
        return Array.from({length: 12}, (_, i) => ({
            month: `M${i + 1}`,
            predicted: district.price * (1 + (district.aiForecast / 100) * (i / 12)),
            lower: district.price * (1 + (district.aiForecast / 100) * (i / 12)) * 0.95,
            upper: district.price * (1 + (district.aiForecast / 100) * (i / 12)) * 1.05,
            confidence: 95 - i * 3,
        }));
    }, [district.price, district.aiForecast]);

    // GDP vs Price data
    const gdpPriceData = useMemo(() => {
        return Array.from({length: 10}, (_, i) => ({
            year: `2${14 + i}`,
            gdp: district.gdp * (1 + i * 0.08),
            price: district.price * (1 + i * 0.12),
            employment: district.employmentRate + (i * 0.5),
        }));
    }, [district.gdp, district.price, district.employmentRate]);

    // Performance comparison data
    const performanceData = useMemo(() => {
        return Array.from({length: 7}, (_, i) => ({
            day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
            district: district.price * (1 + (Math.random() - 0.5) * 0.1),
            state: district.price * (1 + (Math.random() - 0.5) * 0.08),
            national: district.price * (1 + (Math.random() - 0.5) * 0.05),
        }));
    }, [district.price]);

    // Radar chart data for multi-dimensional analysis
    const radarData = [
        {indicator: 'GDP Growth', value: Math.min(district.gdpGrowth * 10, 100)},
        {indicator: 'Employment', value: district.employmentRate},
        {indicator: 'Literacy', value: district.literacy},
        {indicator: 'Infrastructure', value: 75 + Math.random() * 20},
        {indicator: 'Innovation', value: 60 + Math.random() * 30},
        {indicator: 'Sustainability', value: 65 + Math.random() * 25},
    ];

    // Top holders data
    const topHolders = useMemo(() => {
        return Array.from({length: 5}, (_, i) => ({
            wallet: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 4)}`,
            percentage: (20 - i * 3).toFixed(2),
            tokens: Math.floor(Math.random() * 1000000),
        }));
    }, []);

    // Recent trades
    const recentTrades = useMemo(() => {
        return Array.from({length: 10}, (_, i) => ({
            time: `${i + 1}m ago`,
            type: Math.random() > 0.5 ? 'buy' : 'sell',
            price: district.price * (1 + (Math.random() - 0.5) * 0.05),
            amount: Math.floor(Math.random() * 1000),
        }));
    }, [district.price]);

    // Governance proposals
    const proposals = [
        {id: 1, title: 'Infrastructure Development Fund', status: 'Active', votes: 87, for: 72, against: 15},
        {id: 2, title: 'Education Technology Initiative', status: 'Active', votes: 64, for: 58, against: 6},
        {id: 3, title: 'Green Energy Transition Plan', status: 'Pending', votes: 42, for: 38, against: 4},
    ];

    const aiRecommendation = useMemo(() => {
        if (district.aiForecast > 15) return {
            action: 'Strong Buy',
            color: 'text-green-500',
            bg: 'bg-green-500/20',
            border: 'border-green-500/50',
            icon: TrendingUp
        };
        if (district.aiForecast > 5) return {
            action: 'Buy',
            color: 'text-green-400',
            bg: 'bg-green-500/15',
            border: 'border-green-500/40',
            icon: TrendingUp
        };
        if (district.aiForecast > -5) return {
            action: 'Hold',
            color: 'text-blue-400',
            bg: 'bg-blue-500/15',
            border: 'border-blue-500/40',
            icon: Activity
        };
        return {
            action: 'Sell',
            color: 'text-red-400',
            bg: 'bg-red-500/15',
            border: 'border-red-500/40',
            icon: TrendingDown
        };
    }, [district.aiForecast]);

    const riskLevel = useMemo(() => {
        const volatility = Math.abs(district.change);
        if (volatility > 10) return {level: 'High', color: 'text-red-500', value: 75};
        if (volatility > 5) return {level: 'Medium', color: 'text-yellow-500', value: 45};
        return {level: 'Low', color: 'text-green-500', value: 25};
    }, [district.change]);

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-background via-background to-amber-50/20 dark:to-amber-950/10">
            {/* Ambient Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
                <div
                    className="absolute top-20 left-10 w-96 h-96 bg-amber-500/20 dark:bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div
                    className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse"
                    style={{animationDelay: '1s'}}></div>
                <div
                    className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse"
                    style={{animationDelay: '2s'}}></div>
            </div>

            {/* Sticky Header */}
            <div
                className="sticky top-0 z-50 backdrop-blur-2xl bg-background/95 border-b-2 border-amber-200/50 dark:border-amber-700/30 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={onBack}
                                className="border-2 border-amber-400/50 hover:border-amber-500 hover:bg-amber-500/20 transition-all"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2"/>
                                Back to Districts
                            </Button>
                            <Separator orientation="vertical" className="h-8 bg-amber-500/20"/>
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center shadow-lg shadow-amber-500/30">
                                    <Building2 className="w-6 h-6 text-white"/>
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 dark:from-amber-400 dark:to-yellow-400 bg-clip-text text-transparent">
                                        {district.name}
                                    </h1>
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm text-muted-foreground">{district.state}</p>
                                        <Badge variant="outline"
                                               className="border-amber-500/40 text-amber-600 dark:text-amber-400 text-xs">
                                            {district.stateCode}-X
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setIsBookmarked(!isBookmarked)}
                                className="border-amber-400/50 hover:bg-amber-500/10"
                            >
                                <Bookmark
                                    className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500 text-amber-500' : 'text-amber-600 dark:text-amber-400'}`}/>
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="border-amber-400/50 hover:bg-amber-500/10"
                            >
                                <Share2 className="w-4 h-4 text-amber-600 dark:text-amber-400"/>
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="border-amber-400/50 hover:bg-amber-500/10"
                            >
                                <Bell className="w-4 h-4 text-amber-600 dark:text-amber-400"/>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <ScrollArea className="h-[calc(100vh-88px)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 relative z-10">
                    {/* Quick Overview Card */}
                    <Card
                        className="overflow-hidden border-2 border-amber-400/30 bg-gradient-to-br from-background to-amber-50/30 dark:to-amber-950/20 shadow-xl">
                        <div
                            className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600"></div>

                        <div className="p-6">
                            <div className="grid md:grid-cols-3 gap-6">
                                {/* Live Price */}
                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <div
                                            className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50"></div>
                                        <span className="text-sm text-muted-foreground">Live Price</span>
                                        <Badge className={`ml-auto ${
                                            district.sentiment === 'Bullish' ? 'bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/40' :
                                                district.sentiment === 'Bearish' ? 'bg-red-500/20 text-red-700 dark:text-red-400 border-red-500/40' :
                                                    'bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-500/40'
                                        } border text-xs`}>
                                            {district.sentiment}
                                        </Badge>
                                    </div>
                                    <div
                                        className="text-5xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 dark:from-amber-400 dark:to-yellow-400 bg-clip-text text-transparent mb-2">
                                        ₹{district.price.toFixed(2)}
                                    </div>
                                    <div
                                        className={`flex items-center gap-2 ${district.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                        {district.change >= 0 ? <TrendingUp className="w-5 h-5"/> :
                                            <TrendingDown className="w-5 h-5"/>}
                                        <span className="text-xl font-bold">
                      {district.change >= 0 ? '+' : ''}{district.change.toFixed(2)}%
                    </span>
                                        <span className="text-sm text-muted-foreground">(24h)</span>
                                    </div>
                                </div>

                                {/* Key Metrics */}
                                <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    <div
                                        className="p-3 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30">
                                        <p className="text-xs text-muted-foreground mb-1">Market Cap</p>
                                        <p className="text-xl font-bold text-blue-600 dark:text-blue-400">₹{(district.marketCap / 1000000000).toFixed(2)}B</p>
                                    </div>
                                    <div
                                        className="p-3 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30">
                                        <p className="text-xs text-muted-foreground mb-1">24h Volume</p>
                                        <p className="text-xl font-bold text-purple-600 dark:text-purple-400">₹{(district.volume24h / 1000000).toFixed(1)}M</p>
                                    </div>
                                    <div
                                        className="p-3 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30">
                                        <p className="text-xs text-muted-foreground mb-1">GDP Value</p>
                                        <p className="text-xl font-bold text-green-600 dark:text-green-400">₹{(district.gdp / 1000).toFixed(1)}K
                                            Cr</p>
                                    </div>
                                    <div
                                        className="p-3 rounded-xl bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-500/30">
                                        <p className="text-xs text-muted-foreground mb-1">P/E Ratio</p>
                                        <p className="text-xl font-bold text-orange-600 dark:text-orange-400">{district.pe_ratio.toFixed(1)}x</p>
                                    </div>
                                    <div
                                        className="p-3 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/30">
                                        <p className="text-xs text-muted-foreground mb-1">Population</p>
                                        <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{(district.population / 1000000).toFixed(2)}M</p>
                                    </div>
                                    <div
                                        className="p-3 rounded-xl bg-gradient-to-br from-rose-500/10 to-pink-500/10 border border-rose-500/30">
                                        <p className="text-xs text-muted-foreground mb-1">GDP Growth</p>
                                        <p className="text-xl font-bold text-rose-600 dark:text-rose-400">+{district.gdpGrowth.toFixed(1)}%</p>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                                <Button
                                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white h-12 shadow-lg shadow-green-500/30">
                                    <TrendingUp className="w-5 h-5 mr-2"/>
                                    Buy Token
                                </Button>
                                <Button
                                    className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white h-12 shadow-lg shadow-red-500/30">
                                    <TrendingDown className="w-5 h-5 mr-2"/>
                                    Sell Token
                                </Button>
                                <Button
                                    className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white h-12 shadow-lg shadow-amber-500/30">
                                    <LineChart className="w-5 h-5 mr-2"/>
                                    See Full Chart
                                </Button>
                            </div>
                        </div>
                    </Card>

                    {/* Main Tabs Section */}
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList
                            className="grid w-full grid-cols-4 lg:grid-cols-8 bg-amber-100/50 dark:bg-amber-950/30 p-1 h-auto">
                            <TabsTrigger value="overview"
                                         className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-yellow-600 data-[state=active]:text-white">
                                <Info className="w-4 h-4 mr-2"/>
                                <span className="hidden sm:inline">Overview</span>
                            </TabsTrigger>
                            <TabsTrigger value="market"
                                         className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-yellow-600 data-[state=active]:text-white">
                                <LineChart className="w-4 h-4 mr-2"/>
                                <span className="hidden sm:inline">Market</span>
                            </TabsTrigger>
                            <TabsTrigger value="growth"
                                         className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-yellow-600 data-[state=active]:text-white">
                                <BarChart3 className="w-4 h-4 mr-2"/>
                                <span className="hidden sm:inline">Growth</span>
                            </TabsTrigger>
                            <TabsTrigger value="ai-forecast"
                                         className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-yellow-600 data-[state=active]:text-white">
                                <Brain className="w-4 h-4 mr-2"/>
                                <span className="hidden sm:inline">AI Forecast</span>
                            </TabsTrigger>
                            <TabsTrigger value="community"
                                         className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-yellow-600 data-[state=active]:text-white">
                                <Users className="w-4 h-4 mr-2"/>
                                <span className="hidden sm:inline">Community</span>
                            </TabsTrigger>
                            <TabsTrigger value="governance"
                                         className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-yellow-600 data-[state=active]:text-white">
                                <Vote className="w-4 h-4 mr-2"/>
                                <span className="hidden sm:inline">Governance</span>
                            </TabsTrigger>
                            <TabsTrigger value="historical"
                                         className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-yellow-600 data-[state=active]:text-white">
                                <Calendar className="w-4 h-4 mr-2"/>
                                <span className="hidden sm:inline">Historical</span>
                            </TabsTrigger>
                            <TabsTrigger value="analytics"
                                         className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-yellow-600 data-[state=active]:text-white">
                                <Activity className="w-4 h-4 mr-2"/>
                                <span className="hidden sm:inline">Analytics</span>
                            </TabsTrigger>
                        </TabsList>

                        {/* Overview Tab */}
                        <TabsContent value="overview" className="mt-6 space-y-6">
                            <div className="grid lg:grid-cols-2 gap-6">
                                {/* District Information */}
                                <Card className="border-2 border-amber-400/20">
                                    <div
                                        className="p-6 border-b border-amber-400/20 bg-gradient-to-r from-amber-500/10 to-transparent">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center shadow-lg">
                                                <MapPin className="w-5 h-5 text-white"/>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-amber-600 dark:text-amber-400">District
                                                    Information</h3>
                                                <p className="text-xs text-muted-foreground">Geographic and demographic
                                                    data</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6 space-y-4">
                                        <div
                                            className="flex items-center justify-between p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
                                            <span className="text-sm text-muted-foreground">State</span>
                                            <span className="font-semibold">{district.state}</span>
                                        </div>
                                        <div
                                            className="flex items-center justify-between p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
                                            <span className="text-sm text-muted-foreground">Region</span>
                                            <span className="font-semibold">{district.region}</span>
                                        </div>
                                        <div
                                            className="flex items-center justify-between p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
                                            <span className="text-sm text-muted-foreground">Category</span>
                                            <Badge className={`${
                                                district.category === 'Large Cap' ? 'bg-amber-500 text-white' :
                                                    district.category === 'Mid Cap' ? 'bg-yellow-500 text-white' :
                                                        'bg-orange-500 text-white'
                                            }`}>
                                                {district.category}
                                            </Badge>
                                        </div>
                                        <div
                                            className="flex items-center justify-between p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
                                            <span className="text-sm text-muted-foreground">Population</span>
                                            <span
                                                className="font-semibold">{(district.population / 1000000).toFixed(2)}M</span>
                                        </div>
                                        <div
                                            className="flex items-center justify-between p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
                                            <span className="text-sm text-muted-foreground">Literacy Rate</span>
                                            <div className="flex items-center gap-2">
                                                <Progress value={district.literacy} className="w-20 h-2"/>
                                                <span className="font-semibold">{district.literacy.toFixed(1)}%</span>
                                            </div>
                                        </div>
                                        <div
                                            className="flex items-center justify-between p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
                                            <span className="text-sm text-muted-foreground">Employment Rate</span>
                                            <div className="flex items-center gap-2">
                                                <Progress value={district.employmentRate} className="w-20 h-2"/>
                                                <span
                                                    className="font-semibold">{district.employmentRate.toFixed(1)}%</span>
                                            </div>
                                        </div>
                                    </div>
                                </Card>

                                {/* Economic Indicators */}
                                <Card className="border-2 border-amber-400/20">
                                    <div
                                        className="p-6 border-b border-amber-400/20 bg-gradient-to-r from-amber-500/10 to-transparent">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                                                <BarChart3 className="w-5 h-5 text-white"/>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-green-600 dark:text-green-400">Economic
                                                    Indicators</h3>
                                                <p className="text-xs text-muted-foreground">Key financial metrics</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6 space-y-4">
                                        <div
                                            className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm text-muted-foreground">GDP (Gross Domestic Product)</span>
                                                <TrendingUp className="w-4 h-4 text-green-500"/>
                                            </div>
                                            <p className="text-2xl font-bold text-green-600 dark:text-green-400">₹{(district.gdp / 1000).toFixed(1)}K
                                                Crore</p>
                                            <p className="text-xs text-muted-foreground mt-1">Annual economic output</p>
                                        </div>

                                        <div
                                            className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm text-muted-foreground">GDP Growth Rate</span>
                                                <Rocket className="w-4 h-4 text-blue-500"/>
                                            </div>
                                            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">+{district.gdpGrowth.toFixed(2)}%</p>
                                            <p className="text-xs text-muted-foreground mt-1">Year-over-year growth</p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div
                                                className="p-3 rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800">
                                                <p className="text-xs text-muted-foreground mb-1">P/E Ratio</p>
                                                <p className="text-lg font-bold text-purple-600 dark:text-purple-400">{district.pe_ratio.toFixed(1)}x</p>
                                            </div>
                                            <div
                                                className="p-3 rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800">
                                                <p className="text-xs text-muted-foreground mb-1">Div. Yield</p>
                                                <p className="text-lg font-bold text-orange-600 dark:text-orange-400">{district.dividend_yield.toFixed(2)}%</p>
                                            </div>
                                        </div>

                                        <Card
                                            className="p-4 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30">
                                            <div className="flex items-start gap-3">
                                                <div
                                                    className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                                                    <Brain className="w-4 h-4 text-cyan-500"/>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-cyan-600 dark:text-cyan-400 font-semibold mb-1">AI
                                                        INSIGHT</p>
                                                    <p className="text-sm text-foreground">
                                                        {district.name} shows strong economic fundamentals
                                                        with {district.gdpGrowth.toFixed(1)}% GDP growth,
                                                        driven primarily by
                                                        the {district.sectors.services > 40 ? 'services' : district.sectors.industry > 30 ? 'industrial' : 'agricultural'} sector.
                                                    </p>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                </Card>
                            </div>

                            {/* Sector Distribution */}
                            <Card className="border-2 border-amber-400/20">
                                <div
                                    className="p-6 border-b border-amber-400/20 bg-gradient-to-r from-amber-500/10 to-transparent">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
                                            <PieChart className="w-5 h-5 text-white"/>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-purple-600 dark:text-purple-400">Sector
                                                Distribution</h3>
                                            <p className="text-xs text-muted-foreground">Economic composition by
                                                industry</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="h-80">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <RechartsPieChart>
                                                    <Pie
                                                        data={sectorData}
                                                        cx="50%"
                                                        cy="50%"
                                                        labelLine={false}
                                                        label={({
                                                                    name,
                                                                    percent
                                                                }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                                        outerRadius={100}
                                                        fill="#8884d8"
                                                        dataKey="value"
                                                    >
                                                        {sectorData.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={entry.color}/>
                                                        ))}
                                                    </Pie>
                                                    <RechartsTooltip
                                                        contentStyle={{
                                                            backgroundColor: 'hsl(var(--background))',
                                                            border: '1px solid hsl(var(--border))',
                                                            borderRadius: '8px'
                                                        }}
                                                    />
                                                </RechartsPieChart>
                                            </ResponsiveContainer>
                                        </div>

                                        <div className="space-y-4">
                                            <div
                                                className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span
                                                        className="font-semibold text-green-700 dark:text-green-400">Agriculture</span>
                                                    <span
                                                        className="text-sm font-bold text-green-700 dark:text-green-400">{district.sectors.agriculture}%</span>
                                                </div>
                                                <Progress value={district.sectors.agriculture}
                                                          className="h-2 bg-green-100 dark:bg-green-950"/>
                                                <p className="text-xs text-muted-foreground mt-2">Primary sector
                                                    contribution</p>
                                            </div>

                                            <div
                                                className="p-4 rounded-xl bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-500/30">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span
                                                        className="font-semibold text-orange-700 dark:text-orange-400">Industry</span>
                                                    <span
                                                        className="text-sm font-bold text-orange-700 dark:text-orange-400">{district.sectors.industry}%</span>
                                                </div>
                                                <Progress value={district.sectors.industry}
                                                          className="h-2 bg-orange-100 dark:bg-orange-950"/>
                                                <p className="text-xs text-muted-foreground mt-2">Manufacturing &
                                                    production</p>
                                            </div>

                                            <div
                                                className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span
                                                        className="font-semibold text-blue-700 dark:text-blue-400">Services</span>
                                                    <span
                                                        className="text-sm font-bold text-blue-700 dark:text-blue-400">{district.sectors.services}%</span>
                                                </div>
                                                <Progress value={district.sectors.services}
                                                          className="h-2 bg-blue-100 dark:bg-blue-950"/>
                                                <p className="text-xs text-muted-foreground mt-2">Tertiary sector
                                                    activities</p>
                                            </div>

                                            <div
                                                className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span
                                                        className="font-semibold text-purple-700 dark:text-purple-400">Technology</span>
                                                    <span
                                                        className="text-sm font-bold text-purple-700 dark:text-purple-400">{district.sectors.tech}%</span>
                                                </div>
                                                <Progress value={district.sectors.tech}
                                                          className="h-2 bg-purple-100 dark:bg-purple-950"/>
                                                <p className="text-xs text-muted-foreground mt-2">IT & innovation
                                                    sector</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </TabsContent>

                        {/* Market Analysis Tab */}
                        <TabsContent value="market" className="mt-6 space-y-6">
                            <Card className="border-2 border-amber-400/20">
                                <div
                                    className="p-6 border-b border-amber-400/20 bg-gradient-to-r from-amber-500/10 to-transparent">
                                    <div className="flex items-center justify-between flex-wrap gap-4">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center shadow-lg">
                                                <LineChart className="w-5 h-5 text-white"/>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-amber-600 dark:text-amber-400">District
                                                    Chart</h3>
                                                <p className="text-xs text-muted-foreground">Historical price
                                                    performance</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-2 items-center">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="border-amber-400/50 hover:bg-amber-500/10"
                                            >
                                                <LineChart className="w-4 h-4 mr-2"/>
                                                See Full Chart
                                            </Button>
                                            {['1D', '1W', '1M', '3M', '1Y', 'ALL'].map((period) => (
                                                <Button
                                                    key={period}
                                                    variant={chartPeriod === period ? 'default' : 'outline'}
                                                    size="sm"
                                                    onClick={() => setChartPeriod(period)}
                                                    className={chartPeriod === period ? 'bg-amber-500 hover:bg-amber-600' : 'border-amber-400/50'}
                                                >
                                                    {period}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div
                                        className="h-96 rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/10 border border-amber-200 dark:border-amber-800 p-4">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={priceHistoryData}>
                                                <defs>
                                                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8}/>
                                                        <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.1}/>
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))"
                                                               opacity={0.3}/>
                                                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))"/>
                                                <YAxis stroke="hsl(var(--muted-foreground))"/>
                                                <RechartsTooltip
                                                    contentStyle={{
                                                        backgroundColor: 'hsl(var(--background))',
                                                        border: '1px solid hsl(var(--border))',
                                                        borderRadius: '8px'
                                                    }}
                                                />
                                                <Area
                                                    type="monotone"
                                                    dataKey="price"
                                                    stroke="#F59E0B"
                                                    strokeWidth={3}
                                                    fillOpacity={1}
                                                    fill="url(#colorPrice)"
                                                />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </Card>

                            {/* Market Statistics Grid */}
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <Card
                                    className="p-5 border-2 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30">
                                    <p className="text-sm text-muted-foreground mb-2">Day High</p>
                                    <p className="text-3xl font-bold text-green-600 dark:text-green-400">₹{dayHigh.toFixed(2)}</p>
                                    <p className="text-xs text-muted-foreground mt-1">+{((dayHigh / district.price - 1) * 100).toFixed(2)}%
                                        from current</p>
                                </Card>

                                <Card
                                    className="p-5 border-2 bg-gradient-to-br from-red-500/10 to-rose-500/10 border-red-500/30">
                                    <p className="text-sm text-muted-foreground mb-2">Day Low</p>
                                    <p className="text-3xl font-bold text-red-600 dark:text-red-400">₹{dayLow.toFixed(2)}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{((dayLow / district.price - 1) * 100).toFixed(2)}%
                                        from current</p>
                                </Card>

                                <Card
                                    className="p-5 border-2 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30">
                                    <p className="text-sm text-muted-foreground mb-2">52 Week High</p>
                                    <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">₹{week52High.toFixed(2)}</p>
                                    <p className="text-xs text-muted-foreground mt-1">All-time high this year</p>
                                </Card>

                                <Card
                                    className="p-5 border-2 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30">
                                    <p className="text-sm text-muted-foreground mb-2">52 Week Low</p>
                                    <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">₹{week52Low.toFixed(2)}</p>
                                    <p className="text-xs text-muted-foreground mt-1">All-time low this year</p>
                                </Card>
                            </div>

                            {/* Volume Chart */}
                            <Card className="border-2 border-amber-400/20">
                                <div
                                    className="p-6 border-b border-amber-400/20 bg-gradient-to-r from-amber-500/10 to-transparent">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
                                            <Activity className="w-5 h-5 text-white"/>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-purple-600 dark:text-purple-400">Trading
                                                Volume</h3>
                                            <p className="text-xs text-muted-foreground">24-hour trading activity</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div
                                        className="h-64 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/10 border border-purple-200 dark:border-purple-800 p-4">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={priceHistoryData}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))"
                                                               opacity={0.3}/>
                                                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))"/>
                                                <YAxis stroke="hsl(var(--muted-foreground))"/>
                                                <RechartsTooltip
                                                    contentStyle={{
                                                        backgroundColor: 'hsl(var(--background))',
                                                        border: '1px solid hsl(var(--border))',
                                                        borderRadius: '8px'
                                                    }}
                                                />
                                                <Bar dataKey="volume" fill="#A855F7" radius={[4, 4, 0, 0]}/>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </Card>
                        </TabsContent>

                        {/* Growth & Valuation Tab */}
                        <TabsContent value="growth" className="mt-6 space-y-6">
                            <div className="grid lg:grid-cols-2 gap-6">
                                {/* Multi-dimensional Analysis */}
                                <Card className="border-2 border-amber-400/20">
                                    <div
                                        className="p-6 border-b border-amber-400/20 bg-gradient-to-r from-amber-500/10 to-transparent">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                                                <Network className="w-5 h-5 text-white"/>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-indigo-600 dark:text-indigo-400">Multi-Dimensional
                                                    Analysis</h3>
                                                <p className="text-xs text-muted-foreground">Comprehensive performance
                                                    metrics</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="h-80">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <RadarChart data={radarData}>
                                                    <PolarGrid stroke="hsl(var(--border))"/>
                                                    <PolarAngleAxis dataKey="indicator"
                                                                    stroke="hsl(var(--muted-foreground))"/>
                                                    <PolarRadiusAxis stroke="hsl(var(--muted-foreground))"/>
                                                    <Radar name="Performance" dataKey="value" stroke="#8B5CF6"
                                                           fill="#8B5CF6" fillOpacity={0.6}/>
                                                    <RechartsTooltip
                                                        contentStyle={{
                                                            backgroundColor: 'hsl(var(--background))',
                                                            border: '1px solid hsl(var(--border))',
                                                            borderRadius: '8px'
                                                        }}
                                                    />
                                                </RadarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                </Card>

                                {/* Growth Metrics */}
                                <Card className="border-2 border-amber-400/20">
                                    <div
                                        className="p-6 border-b border-amber-400/20 bg-gradient-to-r from-amber-500/10 to-transparent">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                                                <TrendingUpDown className="w-5 h-5 text-white"/>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-green-600 dark:text-green-400">Growth
                                                    Metrics</h3>
                                                <p className="text-xs text-muted-foreground">Key performance
                                                    indicators</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6 space-y-4">
                                        <div
                                            className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30">
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="font-semibold text-green-700 dark:text-green-400">GDP Growth Rate</span>
                                                <Rocket className="w-5 h-5 text-green-500"/>
                                            </div>
                                            <p className="text-3xl font-bold text-green-600 dark:text-green-400">+{district.gdpGrowth.toFixed(2)}%</p>
                                            <Progress value={Math.min(district.gdpGrowth * 10, 100)}
                                                      className="mt-3 h-2"/>
                                            <p className="text-xs text-muted-foreground mt-2">Year-over-year economic
                                                expansion</p>
                                        </div>

                                        <div
                                            className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30">
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="font-semibold text-blue-700 dark:text-blue-400">Employment Rate</span>
                                                <Users className="w-5 h-5 text-blue-500"/>
                                            </div>
                                            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{district.employmentRate.toFixed(1)}%</p>
                                            <Progress value={district.employmentRate} className="mt-3 h-2"/>
                                            <p className="text-xs text-muted-foreground mt-2">Workforce
                                                participation</p>
                                        </div>

                                        <div
                                            className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30">
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="font-semibold text-purple-700 dark:text-purple-400">Literacy Rate</span>
                                                <FileText className="w-5 h-5 text-purple-500"/>
                                            </div>
                                            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{district.literacy.toFixed(1)}%</p>
                                            <Progress value={district.literacy} className="mt-3 h-2"/>
                                            <p className="text-xs text-muted-foreground mt-2">Educational
                                                achievement</p>
                                        </div>

                                        <div
                                            className="p-4 rounded-xl bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-500/30">
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="font-semibold text-orange-700 dark:text-orange-400">Dividend Yield</span>
                                                <DollarSign className="w-5 h-5 text-orange-500"/>
                                            </div>
                                            <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{district.dividend_yield.toFixed(2)}%</p>
                                            <Progress value={district.dividend_yield * 20} className="mt-3 h-2"/>
                                            <p className="text-xs text-muted-foreground mt-2">Annual return on
                                                investment</p>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </TabsContent>

                        {/* AI Forecast Tab */}
                        <TabsContent value="ai-forecast" className="mt-6 space-y-6">
                            <div className="grid lg:grid-cols-2 gap-6">
                                {/* AI Recommendation */}
                                <Card className={`border-2 ${aiRecommendation.border} ${aiRecommendation.bg}`}>
                                    <div
                                        className="p-6 border-b border-amber-400/20 bg-gradient-to-r from-amber-500/10 to-transparent">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
                                                <Brain className="w-5 h-5 text-white"/>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-purple-600 dark:text-purple-400">AI
                                                    Recommendation</h3>
                                                <p className="text-xs text-muted-foreground">Machine learning
                                                    analysis</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div
                                                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-xl">
                                                <aiRecommendation.icon className="w-8 h-8 text-white"/>
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground mb-1">Current Signal</p>
                                                <p className={`text-3xl font-bold ${aiRecommendation.color}`}>{aiRecommendation.action}</p>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="p-4 rounded-xl bg-background/50 border border-border">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span
                                                        className="text-sm text-muted-foreground">Confidence Level</span>
                                                    <span
                                                        className="font-bold text-purple-600 dark:text-purple-400">87%</span>
                                                </div>
                                                <Progress value={87} className="h-2"/>
                                            </div>

                                            <div className="p-4 rounded-xl bg-background/50 border border-border">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span
                                                        className="text-sm text-muted-foreground">Forecast Accuracy</span>
                                                    <span
                                                        className="font-bold text-blue-600 dark:text-blue-400">92%</span>
                                                </div>
                                                <Progress value={92} className="h-2"/>
                                            </div>

                                            <Card
                                                className="p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30">
                                                <p className="text-sm font-semibold text-blue-700 dark:text-blue-400 mb-2">Key
                                                    Insights</p>
                                                <ul className="space-y-2 text-sm text-foreground">
                                                    <li className="flex items-start gap-2">
                                                        <CheckCircle2
                                                            className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"/>
                                                        <span>Strong GDP growth momentum ({district.gdpGrowth.toFixed(1)}%)</span>
                                                    </li>
                                                    <li className="flex items-start gap-2">
                                                        <CheckCircle2
                                                            className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"/>
                                                        <span>Positive market sentiment ({district.sentiment})</span>
                                                    </li>
                                                    <li className="flex items-start gap-2">
                                                        <CheckCircle2
                                                            className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"/>
                                                        <span>Healthy employment rate ({district.employmentRate.toFixed(1)}%)</span>
                                                    </li>
                                                </ul>
                                            </Card>
                                        </div>
                                    </div>
                                </Card>

                                {/* Risk Analysis */}
                                <Card className="border-2 border-amber-400/20">
                                    <div
                                        className="p-6 border-b border-amber-400/20 bg-gradient-to-r from-amber-500/10 to-transparent">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg">
                                                <Shield className="w-5 h-5 text-white"/>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-orange-600 dark:text-orange-400">Risk
                                                    Analysis</h3>
                                                <p className="text-xs text-muted-foreground">Volatility and risk
                                                    metrics</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6 space-y-6">
                                        <div>
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="font-semibold">Risk Level</span>
                                                <Badge className={`${
                                                    riskLevel.level === 'High' ? 'bg-red-500/20 text-red-700 dark:text-red-400 border-red-500/40' :
                                                        riskLevel.level === 'Medium' ? 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-500/40' :
                                                            'bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/40'
                                                } border`}>
                                                    {riskLevel.level} Risk
                                                </Badge>
                                            </div>
                                            <Progress value={riskLevel.value} className="h-3 mb-2">
                                                <div
                                                    className={`h-full rounded-full transition-all ${
                                                        riskLevel.level === 'High' ? 'bg-red-500' :
                                                            riskLevel.level === 'Medium' ? 'bg-yellow-500' :
                                                                'bg-green-500'
                                                    }`}
                                                    style={{width: `${riskLevel.value}%`}}
                                                />
                                            </Progress>
                                            <div className="flex justify-between text-xs text-muted-foreground">
                                                <span>Low</span>
                                                <span>Medium</span>
                                                <span>High</span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div
                                                className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                                                <p className="text-xs text-muted-foreground mb-2">Volatility (30D)</p>
                                                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{Math.abs(district.change).toFixed(2)}%</p>
                                            </div>
                                            <div
                                                className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800">
                                                <p className="text-xs text-muted-foreground mb-2">Beta</p>
                                                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">1.{Math.floor(Math.random() * 50 + 10)}</p>
                                            </div>
                                        </div>

                                        <Card
                                            className="p-4 bg-gradient-to-br from-amber-500/10 to-yellow-500/10 border border-amber-500/30">
                                            <div className="flex items-start gap-3">
                                                <AlertCircle
                                                    className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5"/>
                                                <div>
                                                    <p className="font-semibold text-sm mb-2">Risk Factors</p>
                                                    <ul className="space-y-1 text-xs text-muted-foreground">
                                                        <li>• Market volatility due to economic cycles</li>
                                                        <li>• Policy changes affecting district development</li>
                                                        <li>• Sector-specific risks in key industries</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                </Card>
                            </div>

                            {/* Price Forecast Chart */}
                            <Card className="border-2 border-amber-400/20">
                                <div
                                    className="p-6 border-b border-amber-400/20 bg-gradient-to-r from-amber-500/10 to-transparent">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                                            <Target className="w-5 h-5 text-white"/>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-cyan-600 dark:text-cyan-400">12-Month Price
                                                Forecast</h3>
                                            <p className="text-xs text-muted-foreground">AI-powered price prediction
                                                with confidence intervals</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div
                                        className="h-96 rounded-xl bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/10 border border-cyan-200 dark:border-cyan-800 p-4">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={forecastData}>
                                                <defs>
                                                    <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.8}/>
                                                        <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.1}/>
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))"
                                                               opacity={0.3}/>
                                                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))"/>
                                                <YAxis stroke="hsl(var(--muted-foreground))"/>
                                                <RechartsTooltip
                                                    contentStyle={{
                                                        backgroundColor: 'hsl(var(--background))',
                                                        border: '1px solid hsl(var(--border))',
                                                        borderRadius: '8px'
                                                    }}
                                                />
                                                <Area type="monotone" dataKey="lower" stroke="#94A3B8" strokeWidth={1}
                                                      fill="transparent" strokeDasharray="3 3"/>
                                                <Area type="monotone" dataKey="upper" stroke="#94A3B8" strokeWidth={1}
                                                      fill="transparent" strokeDasharray="3 3"/>
                                                <Area type="monotone" dataKey="predicted" stroke="#06B6D4"
                                                      strokeWidth={3} fillOpacity={1} fill="url(#colorForecast)"/>
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="mt-4 p-4 rounded-lg bg-background/50 border border-border">
                                        <p className="text-sm text-muted-foreground mb-2">Expected Price Range (12M)</p>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-xs text-muted-foreground">Conservative</p>
                                                <p className="text-lg font-bold text-red-600 dark:text-red-400">₹{(district.price * 0.95).toFixed(2)}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground text-center">Expected</p>
                                                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">₹{(district.price * (1 + district.aiForecast / 100)).toFixed(2)}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground text-right">Optimistic</p>
                                                <p className="text-lg font-bold text-green-600 dark:text-green-400">₹{(district.price * 1.05).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </TabsContent>

                        {/* Community Tab */}
                        <TabsContent value="community" className="mt-6 space-y-6">
                            <div className="grid lg:grid-cols-3 gap-6">
                                {/* Market Sentiment */}
                                <Card className="lg:col-span-2 border-2 border-amber-400/20">
                                    <div
                                        className="p-6 border-b border-amber-400/20 bg-gradient-to-r from-amber-500/10 to-transparent">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                                                <Users className="w-5 h-5 text-white"/>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-green-600 dark:text-green-400">Community
                                                    Sentiment</h3>
                                                <p className="text-xs text-muted-foreground">Market psychology and
                                                    investor mood</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6 space-y-6">
                                        <div>
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="font-semibold">Overall Sentiment</span>
                                                <span className="text-sm font-bold text-green-600 dark:text-green-400">Bullish 68%</span>
                                            </div>
                                            <div className="flex gap-1 h-4 rounded-full overflow-hidden">
                                                <div className="bg-green-500 flex-[68] transition-all"></div>
                                                <div className="bg-blue-500 flex-[20] transition-all"></div>
                                                <div className="bg-red-500 flex-[12] transition-all"></div>
                                            </div>
                                            <div className="flex justify-between mt-2 text-xs">
                                                <span
                                                    className="text-green-600 dark:text-green-400">Bullish (68%)</span>
                                                <span className="text-blue-600 dark:text-blue-400">Neutral (20%)</span>
                                                <span className="text-red-600 dark:text-red-400">Bearish (12%)</span>
                                            </div>
                                        </div>

                                        <Separator/>

                                        <div>
                                            <p className="font-semibold mb-4">Community Poll: What's your stance?</p>
                                            <div className="space-y-3">
                                                <div>
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-sm">Buy</span>
                                                        <span
                                                            className="text-sm font-bold text-green-600 dark:text-green-400">52%</span>
                                                    </div>
                                                    <Progress value={52} className="h-2 bg-green-100 dark:bg-green-950">
                                                        <div className="h-full bg-green-500 rounded-full"
                                                             style={{width: '52%'}}/>
                                                    </Progress>
                                                </div>

                                                <div>
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-sm">Hold</span>
                                                        <span
                                                            className="text-sm font-bold text-blue-600 dark:text-blue-400">35%</span>
                                                    </div>
                                                    <Progress value={35} className="h-2 bg-blue-100 dark:bg-blue-950">
                                                        <div className="h-full bg-blue-500 rounded-full"
                                                             style={{width: '35%'}}/>
                                                    </Progress>
                                                </div>

                                                <div>
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-sm">Sell</span>
                                                        <span
                                                            className="text-sm font-bold text-red-600 dark:text-red-400">13%</span>
                                                    </div>
                                                    <Progress value={13} className="h-2 bg-red-100 dark:bg-red-950">
                                                        <div className="h-full bg-red-500 rounded-full"
                                                             style={{width: '13%'}}/>
                                                    </Progress>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>

                                {/* Recent Trades */}
                                <Card className="border-2 border-amber-400/20">
                                    <div
                                        className="p-6 border-b border-amber-400/20 bg-gradient-to-r from-amber-500/10 to-transparent">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
                                                <Activity className="w-5 h-5 text-white"/>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-purple-600 dark:text-purple-400">Recent
                                                    Trades</h3>
                                                <p className="text-xs text-muted-foreground">Live activity</p>
                                            </div>
                                        </div>
                                    </div>
                                    <ScrollArea className="h-[400px] p-6">
                                        <div className="space-y-2">
                                            {recentTrades.map((trade, idx) => (
                                                <div
                                                    key={idx}
                                                    className={`flex items-center justify-between p-3 rounded-lg border ${
                                                        trade.type === 'buy'
                                                            ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800'
                                                            : 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800'
                                                    }`}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        {trade.type === 'buy' ? (
                                                            <TrendingUp
                                                                className="w-4 h-4 text-green-600 dark:text-green-400"/>
                                                        ) : (
                                                            <TrendingDown
                                                                className="w-4 h-4 text-red-600 dark:text-red-400"/>
                                                        )}
                                                        <div>
                                                            <p className={`text-sm font-semibold ${
                                                                trade.type === 'buy' ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'
                                                            }`}>
                                                                {trade.type.toUpperCase()}
                                                            </p>
                                                            <p className="text-xs text-muted-foreground">{trade.time}</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-sm font-bold">₹{trade.price.toFixed(2)}</p>
                                                        <p className="text-xs text-muted-foreground">{trade.amount} tokens</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                </Card>
                            </div>

                            {/* Top Holders */}
                            <Card className="border-2 border-amber-400/20">
                                <div
                                    className="p-6 border-b border-amber-400/20 bg-gradient-to-r from-amber-500/10 to-transparent">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center shadow-lg">
                                            <Crown className="w-5 h-5 text-white"/>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-amber-600 dark:text-amber-400">Top Token
                                                Holders</h3>
                                            <p className="text-xs text-muted-foreground">Largest stakeholders by
                                                percentage</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="space-y-3">
                                        {topHolders.map((holder, idx) => (
                                            <div key={idx}
                                                 className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/10 border border-amber-200 dark:border-amber-800">
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center text-white font-bold text-sm">
                                                        {idx + 1}
                                                    </div>
                                                    <div>
                                                        <p className="font-mono text-sm font-semibold">{holder.wallet}</p>
                                                        <p className="text-xs text-muted-foreground">{holder.tokens.toLocaleString()} tokens</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-lg font-bold text-amber-600 dark:text-amber-400">{holder.percentage}%</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        </TabsContent>

                        {/* Governance Tab */}
                        <TabsContent value="governance" className="mt-6 space-y-6">
                            <div className="grid md:grid-cols-3 gap-6">
                                {/* Staking Rewards */}
                                <Card
                                    className="border-2 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/30">
                                    <div className="p-6">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div
                                                className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                                                <Coins className="w-6 h-6 text-indigo-600 dark:text-indigo-400"/>
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">Staking APY</p>
                                                <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">12.5%</p>
                                            </div>
                                        </div>
                                        <p className="text-xs text-muted-foreground">Stake your tokens to earn passive
                                            rewards and governance rights</p>
                                        <Button className="w-full mt-4 bg-indigo-500 hover:bg-indigo-600">
                                            <Lock className="w-4 h-4 mr-2"/>
                                            Stake Tokens
                                        </Button>
                                    </div>
                                </Card>

                                {/* Total Staked */}
                                <Card
                                    className="border-2 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30">
                                    <div className="p-6">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div
                                                className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                                                <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400"/>
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">Total Staked</p>
                                                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">45.2%</p>
                                            </div>
                                        </div>
                                        <Progress value={45.2} className="h-2 mb-2"/>
                                        <p className="text-xs text-muted-foreground">Of circulating supply currently
                                            staked</p>
                                    </div>
                                </Card>

                                {/* Your Voting Power */}
                                <Card
                                    className="border-2 bg-gradient-to-br from-pink-500/10 to-rose-500/10 border-pink-500/30">
                                    <div className="p-6">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div
                                                className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center">
                                                <Vote className="w-6 h-6 text-pink-600 dark:text-pink-400"/>
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">Voting Power</p>
                                                <p className="text-3xl font-bold text-pink-600 dark:text-pink-400">0.00%</p>
                                            </div>
                                        </div>
                                        <p className="text-xs text-muted-foreground mb-4">Connect wallet to participate
                                            in governance</p>
                                        <Button variant="outline" className="w-full border-pink-500/40">
                                            <Wallet className="w-4 h-4 mr-2"/>
                                            Connect Wallet
                                        </Button>
                                    </div>
                                </Card>
                            </div>

                            {/* Active Proposals */}
                            <Card className="border-2 border-amber-400/20">
                                <div
                                    className="p-6 border-b border-amber-400/20 bg-gradient-to-r from-amber-500/10 to-transparent">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center shadow-lg">
                                                <Radio className="w-5 h-5 text-white"/>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-amber-600 dark:text-amber-400">Active
                                                    Governance Proposals</h3>
                                                <p className="text-xs text-muted-foreground">Vote on district
                                                    development initiatives</p>
                                            </div>
                                        </div>
                                        <Badge
                                            className="bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/40 border">
                                            {proposals.filter(p => p.status === 'Active').length} Active
                                        </Badge>
                                    </div>
                                </div>
                                <div className="p-6 space-y-4">
                                    {proposals.map((proposal) => (
                                        <Card key={proposal.id}
                                              className="p-5 border-2 border-amber-400/20 hover:border-amber-500/40 transition-colors">
                                            <div className="flex items-start justify-between mb-4">
                                                <div>
                                                    <h4 className="font-semibold mb-1">{proposal.title}</h4>
                                                    <Badge className={`text-xs ${
                                                        proposal.status === 'Active'
                                                            ? 'bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/40'
                                                            : 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-500/40'
                                                    } border`}>
                                                        {proposal.status}
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-muted-foreground">{proposal.votes} votes</p>
                                            </div>

                                            <div className="space-y-2 mb-4">
                                                <div>
                                                    <div className="flex items-center justify-between mb-1 text-sm">
                                                        <span className="text-green-600 dark:text-green-400">For</span>
                                                        <span className="font-semibold">{proposal.for}%</span>
                                                    </div>
                                                    <Progress value={proposal.for}
                                                              className="h-2 bg-green-100 dark:bg-green-950">
                                                        <div className="h-full bg-green-500 rounded-full"
                                                             style={{width: `${proposal.for}%`}}/>
                                                    </Progress>
                                                </div>

                                                <div>
                                                    <div className="flex items-center justify-between mb-1 text-sm">
                                                        <span className="text-red-600 dark:text-red-400">Against</span>
                                                        <span className="font-semibold">{proposal.against}%</span>
                                                    </div>
                                                    <Progress value={proposal.against}
                                                              className="h-2 bg-red-100 dark:bg-red-950">
                                                        <div className="h-full bg-red-500 rounded-full"
                                                             style={{width: `${proposal.against}%`}}/>
                                                    </Progress>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-2">
                                                <Button variant="outline"
                                                        className="border-green-500/40 text-green-600 dark:text-green-400 hover:bg-green-500/10">
                                                    Vote For
                                                </Button>
                                                <Button variant="outline"
                                                        className="border-red-500/40 text-red-600 dark:text-red-400 hover:bg-red-500/10">
                                                    Vote Against
                                                </Button>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </Card>
                        </TabsContent>

                        {/* Historical Data Tab */}
                        <TabsContent value="historical" className="mt-6 space-y-6">
                            <Card className="border-2 border-amber-400/20">
                                <div
                                    className="p-6 border-b border-amber-400/20 bg-gradient-to-r from-amber-500/10 to-transparent">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg">
                                            <Calendar className="w-5 h-5 text-white"/>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-blue-600 dark:text-blue-400">GDP vs Token
                                                Price Correlation</h3>
                                            <p className="text-xs text-muted-foreground">10-year historical performance
                                                analysis</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div
                                        className="h-96 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/10 border border-blue-200 dark:border-blue-800 p-4">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <ComposedChart data={gdpPriceData}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))"
                                                               opacity={0.3}/>
                                                <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))"/>
                                                <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))"/>
                                                <YAxis yAxisId="right" orientation="right"
                                                       stroke="hsl(var(--muted-foreground))"/>
                                                <RechartsTooltip
                                                    contentStyle={{
                                                        backgroundColor: 'hsl(var(--background))',
                                                        border: '1px solid hsl(var(--border))',
                                                        borderRadius: '8px'
                                                    }}
                                                />
                                                <Legend/>
                                                <Bar yAxisId="left" dataKey="gdp" fill="#10B981" name="GDP (Cr)"
                                                     radius={[4, 4, 0, 0]}/>
                                                <Line yAxisId="right" type="monotone" dataKey="price" stroke="#F59E0B"
                                                      strokeWidth={3} name="Token Price (₹)"/>
                                                <Line yAxisId="right" type="monotone" dataKey="employment"
                                                      stroke="#8B5CF6" strokeWidth={2} name="Employment (%)"
                                                      strokeDasharray="5 5"/>
                                            </ComposedChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </Card>

                            {/* Performance Comparison */}
                            <Card className="border-2 border-amber-400/20">
                                <div
                                    className="p-6 border-b border-amber-400/20 bg-gradient-to-r from-amber-500/10 to-transparent">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
                                            <Layers className="w-5 h-5 text-white"/>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-purple-600 dark:text-purple-400">Performance
                                                Comparison</h3>
                                            <p className="text-xs text-muted-foreground">District vs State vs National
                                                Index</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div
                                        className="h-80 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/10 border border-purple-200 dark:border-purple-800 p-4">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <RechartsLineChart data={performanceData}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))"
                                                               opacity={0.3}/>
                                                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))"/>
                                                <YAxis stroke="hsl(var(--muted-foreground))"/>
                                                <RechartsTooltip
                                                    contentStyle={{
                                                        backgroundColor: 'hsl(var(--background))',
                                                        border: '1px solid hsl(var(--border))',
                                                        borderRadius: '8px'
                                                    }}
                                                />
                                                <Legend/>
                                                <Line type="monotone" dataKey="district" stroke="#F59E0B"
                                                      strokeWidth={3} name={district.name}/>
                                                <Line type="monotone" dataKey="state" stroke="#3B82F6" strokeWidth={2}
                                                      name={`${district.state} Index`}/>
                                                <Line type="monotone" dataKey="national" stroke="#10B981"
                                                      strokeWidth={2} name="National Index"/>
                                            </RechartsLineChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </Card>
                        </TabsContent>

                        {/* Advanced Analytics Tab */}
                        <TabsContent value="analytics" className="mt-6 space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Technical Indicators */}
                                <Card className="border-2 border-amber-400/20">
                                    <div
                                        className="p-6 border-b border-amber-400/20 bg-gradient-to-r from-amber-500/10 to-transparent">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg">
                                                <Gauge className="w-5 h-5 text-white"/>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-orange-600 dark:text-orange-400">Technical
                                                    Indicators</h3>
                                                <p className="text-xs text-muted-foreground">Advanced trading
                                                    metrics</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6 space-y-4">
                                        <div
                                            className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/10 border border-blue-200 dark:border-blue-800">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-semibold">RSI (14)</span>
                                                <Badge
                                                    className="bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-500/40 border text-xs">
                                                    Neutral
                                                </Badge>
                                            </div>
                                            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">52.3</p>
                                            <Progress value={52.3} className="h-2"/>
                                            <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                                <span>Oversold (30)</span>
                                                <span>Neutral (50)</span>
                                                <span>Overbought (70)</span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div
                                                className="p-3 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
                                                <p className="text-xs text-muted-foreground mb-1">MA (50D)</p>
                                                <p className="text-xl font-bold text-green-600 dark:text-green-400">₹{(district.price * 0.98).toFixed(2)}</p>
                                            </div>
                                            <div
                                                className="p-3 rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800">
                                                <p className="text-xs text-muted-foreground mb-1">MA (200D)</p>
                                                <p className="text-xl font-bold text-purple-600 dark:text-purple-400">₹{(district.price * 0.95).toFixed(2)}</p>
                                            </div>
                                        </div>

                                        <div
                                            className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/10 border border-amber-200 dark:border-amber-800">
                                            <p className="text-sm font-semibold mb-3">MACD Signal</p>
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 h-2 bg-green-500 rounded-full"></div>
                                                <CheckCircle2 className="w-5 h-5 text-green-500"/>
                                            </div>
                                            <p className="text-xs text-muted-foreground mt-2">Bullish crossover
                                                detected</p>
                                        </div>
                                    </div>
                                </Card>

                                {/* Liquidity & Volume Analysis */}
                                <Card className="border-2 border-amber-400/20">
                                    <div
                                        className="p-6 border-b border-amber-400/20 bg-gradient-to-r from-amber-500/10 to-transparent">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                                                <Activity className="w-5 h-5 text-white"/>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-cyan-600 dark:text-cyan-400">Liquidity
                                                    Analysis</h3>
                                                <p className="text-xs text-muted-foreground">Market depth and trading
                                                    activity</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6 space-y-4">
                                        <div
                                            className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30">
                                            <p className="text-sm text-muted-foreground mb-2">Liquidity Score</p>
                                            <div className="flex items-center justify-between mb-2">
                                                <p className="text-3xl font-bold text-green-600 dark:text-green-400">8.5/10</p>
                                                <Badge
                                                    className="bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/40 border">
                                                    Excellent
                                                </Badge>
                                            </div>
                                            <Progress value={85} className="h-2"/>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div
                                                className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                                                <p className="text-xs text-muted-foreground mb-1">Bid-Ask Spread</p>
                                                <p className="text-lg font-bold text-blue-600 dark:text-blue-400">0.12%</p>
                                            </div>
                                            <div
                                                className="p-3 rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800">
                                                <p className="text-xs text-muted-foreground mb-1">Slippage</p>
                                                <p className="text-lg font-bold text-purple-600 dark:text-purple-400">0.08%</p>
                                            </div>
                                        </div>

                                        <div
                                            className="p-4 rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/10 border border-orange-200 dark:border-orange-800">
                                            <p className="text-sm font-semibold mb-3">Average Daily Volume</p>
                                            <p className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                                                ₹{(district.volume24h / 1000000).toFixed(1)}M
                                            </p>
                                            <div className="flex items-center gap-2 text-sm">
                                                <TrendingUp className="w-4 h-4 text-green-500"/>
                                                <span
                                                    className="text-green-600 dark:text-green-400">+15% vs last week</span>
                                            </div>
                                        </div>

                                        <Card
                                            className="p-4 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/30">
                                            <div className="flex items-start gap-3">
                                                <Info className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-0.5"/>
                                                <div>
                                                    <p className="text-sm font-semibold mb-1">Market Depth</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        Strong order book with
                                                        ₹{(district.volume24h * 2.5 / 1000000).toFixed(1)}M in pending
                                                        orders within 2% of current price
                                                    </p>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                </Card>
                            </div>

                            {/* Correlation Matrix */}
                            <Card className="border-2 border-amber-400/20">
                                <div
                                    className="p-6 border-b border-amber-400/20 bg-gradient-to-r from-amber-500/10 to-transparent">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg">
                                            <Network className="w-5 h-5 text-white"/>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-pink-600 dark:text-pink-400">Correlation
                                                Analysis</h3>
                                            <p className="text-xs text-muted-foreground">Relationship with other
                                                indices</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="grid md:grid-cols-3 gap-4">
                                        <div
                                            className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/10 border border-blue-200 dark:border-blue-800">
                                            <p className="text-sm text-muted-foreground mb-2">vs State Index</p>
                                            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">0.87</p>
                                            <Badge
                                                className="bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-500/40 border text-xs">
                                                Strong Positive
                                            </Badge>
                                        </div>

                                        <div
                                            className="p-5 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/10 border border-green-200 dark:border-green-800">
                                            <p className="text-sm text-muted-foreground mb-2">vs National Index</p>
                                            <p className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">0.72</p>
                                            <Badge
                                                className="bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/40 border text-xs">
                                                Positive
                                            </Badge>
                                        </div>

                                        <div
                                            className="p-5 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/10 border border-purple-200 dark:border-purple-800">
                                            <p className="text-sm text-muted-foreground mb-2">vs GDP Growth</p>
                                            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">0.94</p>
                                            <Badge
                                                className="bg-purple-500/20 text-purple-700 dark:text-purple-400 border-purple-500/40 border text-xs">
                                                Very Strong
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </ScrollArea>
        </div>
    );
}
