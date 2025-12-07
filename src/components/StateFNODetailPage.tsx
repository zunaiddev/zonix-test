import { useState, useMemo, useEffect } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Activity,
  BarChart3,
  Building2,
  Zap,
  Target,
  Shield,
  Sparkles,
  LineChart,
  Gauge,
  Info,
  Share2,
  Bookmark,
  Bell,
  Download,
  Calendar,
  AlertCircle,
  DollarSign,
  Network,
  Clock,
  Radio,
  Flame,
  ChevronUp,
  ChevronDown,
  Star,
  Calculator,
  TrendingUpIcon,
  Minus,
  RefreshCw,
  Filter,
  Eye,
  EyeOff,
  Maximize2,
  PlayCircle,
  PauseCircle,
  ArrowUpRight,
  ArrowDownRight,
  Layers,
  Globe,
  Map,
  PieChart,
} from 'lucide-react';
import { 
  LineChart as RechartsLineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer, 
  Legend, 
  ComposedChart,
  Cell,
  PieChart as RechartsPieChart,
  Pie,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import { StateIndex, generateFutureContracts, generateOptionsChain } from '../utils/mockData';
import { TradingViewChartModal } from './TradingViewChartModal';

interface StateFNODetailPageProps {
  state: StateIndex;
  onBack: () => void;
}

export default function StateFNODetailPage({ state, onBack }: StateFNODetailPageProps) {
  const [activeTab, setActiveTab] = useState('options');
  const [chartPeriod, setChartPeriod] = useState('1M');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [selectedExpiry, setSelectedExpiry] = useState('28-Nov-2025');
  const [optionChainView, setOptionChainView] = useState<'all' | 'calls' | 'puts'>('all');
  const [optionStrikeFilter, setOptionStrikeFilter] = useState<'all' | 'itm' | 'atm' | 'otm'>('all');
  const [liveUpdates, setLiveUpdates] = useState(true);
  const [showGreeks, setShowGreeks] = useState(true);
  const [compactView, setCompactView] = useState(false);
  const [highlightMaxOI, setHighlightMaxOI] = useState(true);
  const [strikeRange, setStrikeRange] = useState<number>(10);
  
  // TradingView Chart Modal State
  const [chartModalOpen, setChartModalOpen] = useState(false);

  // Current time for live updates
  const [currentTime, setCurrentTime] = useState(new Date());

  // Generate F&O data
  const futureContracts = useMemo(() => generateFutureContracts(state.value), [state.value]);
  const optionsChain = useMemo(() => generateOptionsChain(state.value), [state.value]);

  // FNO ticker symbol
  const tickerSymbol = `${state.code}FNO`;

  // Determine if state is UT or State
  const utCodes = ['AN', 'CH', 'DD', 'DL', 'JK', 'LA', 'LD', 'PY'];
  const assetType = utCodes.includes(state.code) ? 'Union Territory' : 'State';
  const assetIcon = assetType === 'Union Territory' ? Building2 : Map;

  // Update clock
  useEffect(() => {
    if (liveUpdates) {
      const timer = setInterval(() => setCurrentTime(new Date()), 1000);
      return () => clearInterval(timer);
    }
  }, [liveUpdates]);

  // Generate mock historical price data
  const priceHistoryData = useMemo(() => {
    const periods: Record<string, number> = {
      '1D': 24,
      '1W': 7,
      '1M': 30,
      '3M': 90,
      '6M': 180,
      '1Y': 365,
    };
    const dataPoints = periods[chartPeriod] || 30;
    
    return Array.from({ length: dataPoints }, (_, i) => {
      const baseValue = state.value - ((dataPoints - i) * (state.change / 100) * state.value / dataPoints);
      const variation = (Math.random() - 0.5) * state.value * 0.02;
      const price = baseValue + variation;
      
      return {
        time: chartPeriod === '1D' ? `${i}:00` : `D${i + 1}`,
        price: price,
        volume: state.volume * (0.8 + Math.random() * 0.4),
        futurePrice: price * 1.02,
      };
    });
  }, [chartPeriod, state.value, state.change, state.volume]);

  // OI Trend Data
  const oiTrendData = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => ({
      day: `D${i + 1}`,
      price: state.value * (1 + (Math.random() - 0.5) * 0.05),
      callOI: state.openInterest * (0.4 + Math.random() * 0.2),
      putOI: state.openInterest * (0.4 + Math.random() * 0.2),
    }));
  }, [state.value, state.openInterest]);

  // Max pain calculation
  const maxPainData = useMemo(() => {
    return optionsChain.map(option => ({
      strike: option.strike,
      pain: (option.callOI * Math.max(0, option.strike - state.value)) + 
            (option.putOI * Math.max(0, state.value - option.strike)),
    }));
  }, [optionsChain, state.value]);

  const maxPainStrike = useMemo(() => {
    const minPain = Math.min(...maxPainData.map(d => d.pain));
    const maxPainPoint = maxPainData.find(d => d.pain === minPain);
    return maxPainPoint?.strike || state.value;
  }, [maxPainData, state.value]);

  // Get ATM strike
  const atmStrike = useMemo(() => {
    return optionsChain.reduce((prev, curr) => 
      Math.abs(curr.strike - state.value) < Math.abs(prev.strike - state.value) ? curr : prev
    ).strike;
  }, [optionsChain, state.value]);

  // Filtered options chain
  const filteredOptionsChain = useMemo(() => {
    let filtered = optionsChain;
    
    // Filter by strike range
    const atmIndex = optionsChain.findIndex(opt => opt.strike === atmStrike);
    filtered = optionsChain.slice(
      Math.max(0, atmIndex - strikeRange), 
      Math.min(optionsChain.length, atmIndex + strikeRange + 1)
    );
    
    // Apply additional filters
    if (optionStrikeFilter === 'itm') {
      filtered = filtered.filter(opt => 
        Math.abs(opt.strike - state.value) <= state.value * 0.05 && opt.strike !== atmStrike
      );
    } else if (optionStrikeFilter === 'atm') {
      const atmIdx = filtered.findIndex(opt => opt.strike === atmStrike);
      filtered = filtered.slice(Math.max(0, atmIdx - 2), Math.min(filtered.length, atmIdx + 3));
    } else if (optionStrikeFilter === 'otm') {
      filtered = filtered.filter(opt => 
        Math.abs(opt.strike - state.value) > state.value * 0.02 && opt.strike !== atmStrike
      );
    }
    
    return filtered;
  }, [optionsChain, optionStrikeFilter, atmStrike, state.value, strikeRange]);

  // Calculate total Put/Call OI
  const totalCallOI = useMemo(() => 
    optionsChain.reduce((sum, opt) => sum + opt.callOI, 0), [optionsChain]
  );
  
  const totalPutOI = useMemo(() => 
    optionsChain.reduce((sum, opt) => sum + opt.putOI, 0), [optionsChain]
  );

  // Put/Call Ratio
  const pcRatio = useMemo(() => 
    totalCallOI > 0 ? (totalPutOI / totalCallOI).toFixed(2) : '0.00',
    [totalCallOI, totalPutOI]
  );

  // Find max OI strikes
  const maxCallOIStrike = useMemo(() => {
    return optionsChain.reduce((max, opt) => opt.callOI > max.callOI ? opt : max).strike;
  }, [optionsChain]);

  const maxPutOIStrike = useMemo(() => {
    return optionsChain.reduce((max, opt) => opt.putOI > max.putOI ? opt : max).strike;
  }, [optionsChain]);

  // OI Distribution for Pie Chart
  const oiDistribution = useMemo(() => [
    { name: 'Call OI', value: totalCallOI, color: '#10B981' },
    { name: 'Put OI', value: totalPutOI, color: '#EF4444' },
  ], [totalCallOI, totalPutOI]);

  // Greeks Summary (mock data)
  const greeksSummary = useMemo(() => ({
    portfolioDelta: (Math.random() * 2 - 1).toFixed(3),
    portfolioGamma: (Math.random() * 0.01).toFixed(4),
    portfolioTheta: (-Math.random() * 100).toFixed(2),
    portfolioVega: (Math.random() * 500).toFixed(2),
  }), []);

  // Option Strategy Recommendations
  const strategyRecommendations = useMemo(() => {
    const trend = state.sentiment;
    const volatility = state.volatility;
    
    const strategies = [];
    
    if (trend === 'Bullish') {
      strategies.push({
        name: 'Bull Call Spread',
        sentiment: 'Bullish',
        risk: 'Limited',
        reward: 'Limited',
        description: 'Buy ATM call, sell OTM call',
        color: 'green',
      });
      strategies.push({
        name: 'Long Call',
        sentiment: 'Bullish',
        risk: 'Limited',
        reward: 'Unlimited',
        description: 'Buy ATM/OTM call option',
        color: 'green',
      });
    } else if (trend === 'Bearish') {
      strategies.push({
        name: 'Bear Put Spread',
        sentiment: 'Bearish',
        risk: 'Limited',
        reward: 'Limited',
        description: 'Buy ATM put, sell OTM put',
        color: 'red',
      });
      strategies.push({
        name: 'Long Put',
        sentiment: 'Bearish',
        risk: 'Limited',
        reward: 'High',
        description: 'Buy ATM/OTM put option',
        color: 'red',
      });
    }
    
    if (volatility > 20) {
      strategies.push({
        name: 'Iron Condor',
        sentiment: 'Neutral',
        risk: 'Limited',
        reward: 'Limited',
        description: 'Sell OTM call & put spreads',
        color: 'blue',
      });
      strategies.push({
        name: 'Short Straddle',
        sentiment: 'Neutral',
        risk: 'Unlimited',
        reward: 'Limited',
        description: 'Sell ATM call & put',
        color: 'purple',
      });
    } else {
      strategies.push({
        name: 'Long Straddle',
        sentiment: 'Volatile',
        risk: 'Limited',
        reward: 'Unlimited',
        description: 'Buy ATM call & put',
        color: 'orange',
      });
    }
    
    return strategies;
  }, [state.sentiment, state.volatility]);

  // Support & Resistance Levels
  const supportResistance = useMemo(() => ({
    resistance3: state.value * 1.08,
    resistance2: state.value * 1.05,
    resistance1: state.value * 1.02,
    current: state.value,
    support1: state.value * 0.98,
    support2: state.value * 0.95,
    support3: state.value * 0.92,
  }), [state.value]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-amber-50/20 dark:to-amber-950/10 relative overflow-hidden">
      {/* Ambient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/5 dark:bg-amber-500/3 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-yellow-500/5 dark:bg-yellow-500/3 rounded-full blur-3xl" />
      </div>

      {/* Compact Sticky Header */}
      <div className="sticky top-0 z-50 backdrop-blur-2xl bg-background/95 border-b-2 border-yellow-500/30 shadow-lg shadow-yellow-500/10">
        <div className="max-w-[2000px] mx-auto px-3 py-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onBack}
                className="border-2 border-yellow-500/50 text-yellow-600 dark:text-yellow-400 hover:border-yellow-500 hover:bg-yellow-500/20 transition-all h-6 text-xs px-2"
              >
                <ArrowLeft className="w-3 h-3 mr-1" />
                Back
              </Button>
              <Separator orientation="vertical" className="h-5 bg-yellow-500/20" />
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center shadow-lg shadow-yellow-500/30">
                  <Activity className="w-3.5 h-3.5 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <h1 className="text-sm font-bold bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent">
                      {state.name} F&O
                    </h1>
                    <Badge variant="outline" className="border-amber-500/40 text-amber-600 dark:text-amber-400 text-xs py-0 h-4 px-1">
                      {assetType}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <p className="text-muted-foreground text-xs">{tickerSymbol}</p>
                    <Separator orientation="vertical" className="h-2.5" />
                    <Badge variant="outline" className="border-yellow-500/40 text-yellow-600 dark:text-yellow-400 text-xs py-0 h-4 px-1">
                      F&O
                    </Badge>
                    <Badge className={`${
                      state.sentiment === 'Bullish' ? 'bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/40' :
                      state.sentiment === 'Bearish' ? 'bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/40' :
                      'bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/40'
                    } border text-xs py-0 h-4 px-1`}>
                      {state.sentiment}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                <Clock className="w-3 h-3 text-yellow-600 dark:text-yellow-400" />
                <span className="text-xs text-yellow-600 dark:text-yellow-400 font-mono">
                  {currentTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsBookmarked(!isBookmarked)}
                className="border-yellow-500/50 hover:bg-yellow-500/10 h-6 w-6 p-0"
              >
                <Bookmark className={`w-3 h-3 ${isBookmarked ? 'fill-yellow-600 dark:fill-yellow-400 text-yellow-600 dark:text-yellow-400' : 'text-yellow-600 dark:text-yellow-400'}`} />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-amber-500/50 hover:bg-amber-500/10 h-6 w-6 p-0"
              >
                <Share2 className="w-3 h-3 text-amber-600 dark:text-amber-400" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-green-500/50 hover:bg-green-500/10 h-6 w-6 p-0"
              >
                <Bell className="w-3 h-3 text-green-600 dark:text-green-400" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-48px)]">
        <div className="max-w-[2000px] mx-auto px-3 py-3 space-y-3 relative z-10">
          {/* Compact Live Price Card */}
          <Card className="overflow-hidden border-2 border-yellow-500/30 bg-gradient-to-br from-card/90 to-yellow-50/10 dark:to-yellow-950/20 shadow-xl">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-600"></div>
            
            <div className="p-3">
              <div className="grid lg:grid-cols-3 gap-3 mb-3">
                {/* Live Price */}
                <div className="lg:col-span-1">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                    </div>
                    <span className="text-xs text-muted-foreground">Live Spot Price</span>
                  </div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent mb-1">
                    ₹{(state.value / 10000).toFixed(2)}L
                  </div>
                  <div className={`flex items-center gap-1.5 ${state.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {state.change >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                    <span className="font-bold text-sm">
                      {state.change >= 0 ? '+' : ''}{state.change.toFixed(2)}%
                    </span>
                    <span className="text-xs text-muted-foreground">(Today)</span>
                  </div>
                  <div className="mt-1.5 space-y-0.5 text-xs text-muted-foreground">
                    <p>{assetType}: {state.name}</p>
                    <p>F&O Segment: NSE</p>
                    <p>Districts: {state.districtCount}</p>
                  </div>
                </div>

                {/* Key F&O Metrics - Compact */}
                <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  <div className="p-1.5 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30">
                    <p className="text-xs text-muted-foreground mb-0.5">52W High</p>
                    <p className="text-sm font-bold text-green-600 dark:text-green-400">₹{(state.week52High / 10000).toFixed(2)}L</p>
                  </div>
                  <div className="p-1.5 rounded-lg bg-gradient-to-br from-red-500/10 to-rose-500/10 border border-red-500/30">
                    <p className="text-xs text-muted-foreground mb-0.5">52W Low</p>
                    <p className="text-sm font-bold text-red-600 dark:text-red-400">₹{(state.week52Low / 10000).toFixed(2)}L</p>
                  </div>
                  <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30">
                    <p className="text-xs text-muted-foreground mb-0.5">Day High</p>
                    <p className="text-sm font-bold text-purple-600 dark:text-purple-400">₹{(state.dayHigh / 10000).toFixed(2)}L</p>
                  </div>
                  <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30">
                    <p className="text-xs text-muted-foreground mb-0.5">Day Low</p>
                    <p className="text-sm font-bold text-blue-600 dark:text-blue-400">₹{(state.dayLow / 10000).toFixed(2)}L</p>
                  </div>
                  <div className="p-1.5 rounded-lg bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-500/30">
                    <p className="text-xs text-muted-foreground mb-0.5">F&O Volume</p>
                    <p className="text-sm font-bold text-orange-600 dark:text-orange-400">{(state.volume / 1000000).toFixed(1)}M</p>
                  </div>
                  <div className="p-1.5 rounded-lg bg-gradient-to-br from-teal-500/10 to-emerald-500/10 border border-teal-500/30">
                    <p className="text-xs text-muted-foreground mb-0.5">P/C Ratio</p>
                    <p className="text-sm font-bold text-teal-600 dark:text-teal-400">{pcRatio}</p>
                  </div>
                  <div className="p-1.5 rounded-lg bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border border-yellow-500/30">
                    <p className="text-xs text-muted-foreground mb-0.5">Open Interest</p>
                    <p className="text-sm font-bold text-yellow-600 dark:text-yellow-400">{(state.openInterest / 1000000).toFixed(1)}M</p>
                  </div>
                  <div className="p-1.5 rounded-lg bg-gradient-to-br from-pink-500/10 to-rose-500/10 border border-pink-500/30">
                    <p className="text-xs text-muted-foreground mb-0.5">Volatility</p>
                    <p className="text-sm font-bold text-pink-600 dark:text-pink-400">{state.volatility.toFixed(2)}%</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons - Compact */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5">
                <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white h-8 text-xs shadow-lg shadow-green-500/30">
                  <Zap className="w-3.5 h-3.5 mr-1" />
                  Trade F&O
                </Button>
                <Button className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white h-8 text-xs shadow-lg shadow-amber-500/30">
                  <Star className="w-3.5 h-3.5 mr-1" />
                  Watchlist
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setChartModalOpen(true)}
                  className="border-2 border-purple-500/50 text-purple-600 dark:text-purple-400 hover:bg-purple-500/20 h-8 text-xs"
                >
                  <LineChart className="w-3.5 h-3.5 mr-1" />
                  Full Chart
                </Button>
                <Button 
                  variant="outline"
                  className="border-2 border-blue-500/50 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 h-8 text-xs"
                >
                  <Download className="w-3.5 h-3.5 mr-1" />
                  Export
                </Button>
              </div>
            </div>
          </Card>

          {/* Main Tabs Section - Compact */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 bg-muted/50 border border-yellow-500/20 p-0.5 h-auto gap-0.5">
              <TabsTrigger value="options" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-amber-600 data-[state=active]:text-white text-xs py-1">
                <Activity className="w-3 h-3 mr-1" />
                Option Chain
              </TabsTrigger>
              <TabsTrigger value="futures" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-600 data-[state=active]:text-white text-xs py-1">
                <TrendingUpIcon className="w-3 h-3 mr-1" />
                Futures
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white text-xs py-1">
                <BarChart3 className="w-3 h-3 mr-1" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="strategies" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white text-xs py-1">
                <Calculator className="w-3 h-3 mr-1" />
                Strategies
              </TabsTrigger>
              <TabsTrigger value="charts" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-600 data-[state=active]:text-white text-xs py-1">
                <LineChart className="w-3 h-3 mr-1" />
                Charts
              </TabsTrigger>
            </TabsList>

            {/* OPTION CHAIN TAB */}
            <TabsContent value="options" className="mt-3 space-y-3">
              {/* Option Chain Controls - Compact */}
              <Card className="border-2 border-yellow-500/20 bg-card/80">
                <div className="p-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center">
                        <Layers className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent text-sm">
                          Option Chain - {state.name}
                        </h3>
                        <p className="text-xs text-muted-foreground">Real-time options data</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1.5">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setLiveUpdates(!liveUpdates)}
                        className={`border-green-500/50 h-6 text-xs px-2 ${liveUpdates ? 'bg-green-500/20 text-green-600 dark:text-green-400' : 'text-muted-foreground'}`}
                      >
                        {liveUpdates ? <PauseCircle className="w-3 h-3 mr-0.5" /> : <PlayCircle className="w-3 h-3 mr-0.5" />}
                        {liveUpdates ? 'Live' : 'Paused'}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-amber-500/50 hover:bg-amber-500/10 h-6 w-6 p-0"
                      >
                        <RefreshCw className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Advanced Filters - Compact */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1.5 mb-2">
                    <div className="space-y-0.5">
                      <Label className="text-xs text-muted-foreground">Expiry Date</Label>
                      <Select value={selectedExpiry} onValueChange={setSelectedExpiry}>
                        <SelectTrigger className="border-yellow-500/30 h-7 text-xs">
                          <Calendar className="w-3 h-3 mr-1" />
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="28-Nov-2025">28-Nov-2025 (Weekly)</SelectItem>
                          <SelectItem value="26-Dec-2025">26-Dec-2025 (Monthly)</SelectItem>
                          <SelectItem value="30-Jan-2026">30-Jan-2026</SelectItem>
                          <SelectItem value="27-Feb-2026">27-Feb-2026</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-0.5">
                      <Label className="text-xs text-muted-foreground">Strike Filter</Label>
                      <Select value={optionStrikeFilter} onValueChange={(val: any) => setOptionStrikeFilter(val)}>
                        <SelectTrigger className="border-amber-500/30 h-7 text-xs">
                          <Filter className="w-3 h-3 mr-1" />
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Strikes</SelectItem>
                          <SelectItem value="itm">In The Money</SelectItem>
                          <SelectItem value="atm">At The Money</SelectItem>
                          <SelectItem value="otm">Out of The Money</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-0.5">
                      <Label className="text-xs text-muted-foreground">Strike Range: {strikeRange}</Label>
                      <Input
                        type="range"
                        min="5"
                        max="20"
                        value={strikeRange}
                        onChange={(e) => setStrikeRange(Number(e.target.value))}
                        className="w-full h-7"
                      />
                    </div>

                    <div className="space-y-0.5">
                      <Label className="text-xs text-muted-foreground">View Options</Label>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Switch
                            checked={showGreeks}
                            onCheckedChange={setShowGreeks}
                            id="greeks"
                          />
                          <Label htmlFor="greeks" className="text-xs cursor-pointer">Greeks</Label>
                        </div>
                        <div className="flex items-center gap-1">
                          <Switch
                            checked={compactView}
                            onCheckedChange={setCompactView}
                            id="compact"
                          />
                          <Label htmlFor="compact" className="text-xs cursor-pointer">Compact</Label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Key Metrics Row - Compact */}
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-1.5 mb-2">
                    <div className="p-1.5 rounded-lg bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border border-yellow-500/30">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-xs text-muted-foreground">Spot</span>
                        <Target className="w-3 h-3 text-yellow-600 dark:text-yellow-400" />
                      </div>
                      <p className="text-sm font-bold text-yellow-600 dark:text-yellow-400">
                        ₹{(state.value / 10000).toFixed(2)}L
                      </p>
                    </div>

                    <div className="p-1.5 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-xs text-muted-foreground">Call OI</span>
                        <TrendingUp className="w-3 h-3 text-green-600 dark:text-green-400" />
                      </div>
                      <p className="text-sm font-bold text-green-600 dark:text-green-400">
                        {(totalCallOI / 1000000).toFixed(1)}M
                      </p>
                    </div>

                    <div className="p-1.5 rounded-lg bg-gradient-to-br from-red-500/10 to-rose-500/10 border border-red-500/30">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-xs text-muted-foreground">Put OI</span>
                        <TrendingDown className="w-3 h-3 text-red-600 dark:text-red-400" />
                      </div>
                      <p className="text-sm font-bold text-red-600 dark:text-red-400">
                        {(totalPutOI / 1000000).toFixed(1)}M
                      </p>
                    </div>

                    <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-xs text-muted-foreground">Max Pain</span>
                        <AlertCircle className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                      </div>
                      <p className="text-sm font-bold text-purple-600 dark:text-purple-400">
                        ₹{(maxPainStrike / 10000).toFixed(2)}L
                      </p>
                    </div>

                    <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-xs text-muted-foreground">Max Call</span>
                        <Flame className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                      </div>
                      <p className="text-sm font-bold text-blue-600 dark:text-blue-400">
                        ₹{(maxCallOIStrike / 10000).toFixed(2)}L
                      </p>
                    </div>

                    <div className="p-1.5 rounded-lg bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-500/30">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-xs text-muted-foreground">Max Put</span>
                        <Flame className="w-3 h-3 text-orange-600 dark:text-orange-400" />
                      </div>
                      <p className="text-sm font-bold text-orange-600 dark:text-orange-400">
                        ₹{(maxPutOIStrike / 10000).toFixed(2)}L
                      </p>
                    </div>
                  </div>

                  {/* Option Chain Table - Compact */}
                  <div className="rounded-lg border border-yellow-500/20 overflow-hidden">
                    <ScrollArea className="h-[350px]">
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs">
                          <thead className="sticky top-0 z-10 bg-background">
                            <tr className="bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-b border-yellow-500/30">
                              <th colSpan={showGreeks ? 7 : 5} className="p-2 text-center border-r border-yellow-500/30">
                                <div className="flex items-center justify-center gap-1.5">
                                  <TrendingUp className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                                  <span className="text-xs font-bold text-green-600 dark:text-green-400">CALLS</span>
                                </div>
                              </th>
                              <th className="p-2 text-center border-r border-yellow-500/30">
                                <span className="text-xs font-bold bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent">
                                  STRIKE
                                </span>
                              </th>
                              <th colSpan={showGreeks ? 7 : 5} className="p-2 text-center">
                                <div className="flex items-center justify-center gap-1.5">
                                  <TrendingDown className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                                  <span className="text-xs font-bold text-red-600 dark:text-red-400">PUTS</span>
                                </div>
                              </th>
                            </tr>
                            <tr className="bg-muted/50 border-b border-yellow-500/20 text-xs">
                              <th className="p-1.5 text-left">OI</th>
                              <th className="p-1.5 text-left">Chng OI</th>
                              <th className="p-1.5 text-left">Volume</th>
                              <th className="p-1.5 text-left">IV</th>
                              <th className="p-1.5 text-left">LTP</th>
                              {showGreeks && (
                                <>
                                  <th className="p-1.5 text-left">Delta</th>
                                  <th className="p-1.5 text-left border-r border-yellow-500/20">Gamma</th>
                                </>
                              )}
                              {!showGreeks && <th className="p-1.5 text-left border-r border-yellow-500/20">Chng%</th>}
                              <th className="p-1.5 text-center border-r border-yellow-500/20">Price</th>
                              {showGreeks && (
                                <>
                                  <th className="p-1.5 text-right">Delta</th>
                                  <th className="p-1.5 text-right">Gamma</th>
                                </>
                              )}
                              {!showGreeks && <th className="p-1.5 text-right">Chng%</th>}
                              <th className="p-1.5 text-right">LTP</th>
                              <th className="p-1.5 text-right">IV</th>
                              <th className="p-1.5 text-right">Volume</th>
                              <th className="p-1.5 text-right">Chng OI</th>
                              <th className="p-1.5 text-right">OI</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredOptionsChain.map((option, index) => {
                              const isATM = option.strike === atmStrike;
                              const isITMCall = option.strike < state.value;
                              const isITMPut = option.strike > state.value;
                              const isMaxCallOI = option.strike === maxCallOIStrike && highlightMaxOI;
                              const isMaxPutOI = option.strike === maxPutOIStrike && highlightMaxOI;
                              
                              return (
                                <tr 
                                  key={index} 
                                  className={`border-b border-yellow-500/10 hover:bg-yellow-500/5 transition-colors ${
                                    isATM ? 'bg-yellow-500/10 font-semibold' : ''
                                  }`}
                                >
                                  {/* CALL OI */}
                                  <td className={`p-1.5 ${
                                    isMaxCallOI ? 'bg-green-500/20 font-bold text-green-600 dark:text-green-400' :
                                    isITMCall ? 'font-medium' : 'text-muted-foreground'
                                  }`}>
                                    {(option.callOI / 1000000).toFixed(2)}M
                                  </td>
                                  {/* CALL Change in OI */}
                                  <td className={`p-1.5 ${
                                    option.callOIChange > 0 ? 'text-green-600 dark:text-green-400' : 
                                    option.callOIChange < 0 ? 'text-red-600 dark:text-red-400' : ''
                                  }`}>
                                    {option.callOIChange > 0 ? '+' : ''}{(option.callOIChange / 1000).toFixed(1)}K
                                  </td>
                                  {/* CALL Volume */}
                                  <td className="p-1.5 text-muted-foreground">
                                    {(option.callVolume / 1000).toFixed(1)}K
                                  </td>
                                  {/* CALL IV */}
                                  <td className="p-1.5">
                                    {option.callIV.toFixed(1)}%
                                  </td>
                                  {/* CALL LTP */}
                                  <td className={`p-1.5 font-bold ${
                                    option.callLTPChange > 0 ? 'text-green-600 dark:text-green-400' : 
                                    option.callLTPChange < 0 ? 'text-red-600 dark:text-red-400' : ''
                                  }`}>
                                    ₹{option.callLTP.toFixed(2)}
                                  </td>
                                  {/* CALL Greeks/Change% */}
                                  {showGreeks ? (
                                    <>
                                      <td className="p-1.5 text-muted-foreground">
                                        {(0.1 + Math.random() * 0.8).toFixed(3)}
                                      </td>
                                      <td className="p-1.5 text-muted-foreground border-r border-yellow-500/20">
                                        {(Math.random() * 0.01).toFixed(4)}
                                      </td>
                                    </>
                                  ) : (
                                    <td className={`p-1.5 border-r border-yellow-500/20 ${
                                      option.callLTPChange > 0 ? 'text-green-600 dark:text-green-400' : 
                                      option.callLTPChange < 0 ? 'text-red-600 dark:text-red-400' : ''
                                    }`}>
                                      {option.callLTPChange > 0 ? '+' : ''}{option.callLTPChange.toFixed(2)}%
                                    </td>
                                  )}
                                  
                                  {/* STRIKE PRICE */}
                                  <td className="p-1.5 text-center font-bold border-r border-yellow-500/20">
                                    <div className={`inline-flex items-center justify-center px-2 py-0.5 rounded-lg ${
                                      isATM ? 'bg-yellow-500/30 text-yellow-600 dark:text-yellow-400' : 
                                      'bg-muted'
                                    }`}>
                                      ₹{(option.strike / 10000).toFixed(2)}L
                                      {isATM && <span className="ml-1 text-xs">ATM</span>}
                                    </div>
                                  </td>
                                  
                                  {/* PUT Greeks/Change% */}
                                  {showGreeks ? (
                                    <>
                                      <td className="p-1.5 text-muted-foreground">
                                        {(-0.1 - Math.random() * 0.8).toFixed(3)}
                                      </td>
                                      <td className="p-1.5 text-muted-foreground">
                                        {(Math.random() * 0.01).toFixed(4)}
                                      </td>
                                    </>
                                  ) : (
                                    <td className={`p-1.5 text-right ${
                                      option.putLTPChange > 0 ? 'text-green-600 dark:text-green-400' : 
                                      option.putLTPChange < 0 ? 'text-red-600 dark:text-red-400' : ''
                                    }`}>
                                      {option.putLTPChange > 0 ? '+' : ''}{option.putLTPChange.toFixed(2)}%
                                    </td>
                                  )}
                                  {/* PUT LTP */}
                                  <td className={`p-1.5 font-bold text-right ${
                                    option.putLTPChange > 0 ? 'text-green-600 dark:text-green-400' : 
                                    option.putLTPChange < 0 ? 'text-red-600 dark:text-red-400' : ''
                                  }`}>
                                    ₹{option.putLTP.toFixed(2)}
                                  </td>
                                  {/* PUT IV */}
                                  <td className="p-1.5 text-right">
                                    {option.putIV.toFixed(1)}%
                                  </td>
                                  {/* PUT Volume */}
                                  <td className="p-1.5 text-muted-foreground text-right">
                                    {(option.putVolume / 1000).toFixed(1)}K
                                  </td>
                                  {/* PUT Change in OI */}
                                  <td className={`p-1.5 text-right ${
                                    option.putOIChange > 0 ? 'text-green-600 dark:text-green-400' : 
                                    option.putOIChange < 0 ? 'text-red-600 dark:text-red-400' : ''
                                  }`}>
                                    {option.putOIChange > 0 ? '+' : ''}{(option.putOIChange / 1000).toFixed(1)}K
                                  </td>
                                  {/* PUT OI */}
                                  <td className={`p-1.5 text-right ${
                                    isMaxPutOI ? 'bg-red-500/20 font-bold text-red-600 dark:text-red-400' :
                                    isITMPut ? 'font-medium' : 'text-muted-foreground'
                                  }`}>
                                    {(option.putOI / 1000000).toFixed(2)}M
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </ScrollArea>
                  </div>

                  {/* Quick Stats - Compact */}
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-1.5">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground mb-0.5">Put/Call Ratio</p>
                          <p className="font-bold text-blue-600 dark:text-blue-400">{pcRatio}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {parseFloat(pcRatio) > 1.2 ? 'Bearish Signal' : parseFloat(pcRatio) < 0.8 ? 'Bullish Signal' : 'Neutral'}
                          </p>
                        </div>
                        <PieChart className="w-8 h-8 text-blue-600 dark:text-blue-400 opacity-30" />
                      </div>
                    </div>

                    <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground mb-0.5">Max Pain Level</p>
                          <p className="font-bold text-purple-600 dark:text-purple-400">₹{(maxPainStrike / 10000).toFixed(2)}L</p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {((maxPainStrike - state.value) / state.value * 100).toFixed(2)}% from spot
                          </p>
                        </div>
                        <Target className="w-8 h-8 text-purple-600 dark:text-purple-400 opacity-30" />
                      </div>
                    </div>

                    <div className="p-2 rounded-lg bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground mb-0.5">Total OI</p>
                          <p className="font-bold text-amber-600 dark:text-amber-400">
                            {((totalCallOI + totalPutOI) / 1000000).toFixed(1)}M
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Combined Call + Put
                          </p>
                        </div>
                        <Layers className="w-8 h-8 text-amber-600 dark:text-amber-400 opacity-30" />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* OI Distribution & Max Pain Charts - Compact */}
              <div className="grid md:grid-cols-2 gap-3">
                {/* OI Distribution Pie Chart */}
                <Card className="border-2 border-green-500/20 bg-card/80">
                  <div className="p-2.5">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent text-sm">
                          OI Distribution
                        </h3>
                        <p className="text-xs text-muted-foreground">Call vs Put Open Interest</p>
                      </div>
                    </div>
                    
                    <div className="h-56">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Pie
                            data={oiDistribution}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, value }) => `${name}: ${(value / 1000000).toFixed(1)}M`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {oiDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <RechartsTooltip
                            contentStyle={{
                              backgroundColor: 'rgba(0, 0, 0, 0.8)',
                              border: '1px solid rgba(251, 191, 36, 0.3)',
                              borderRadius: '8px',
                            }}
                            formatter={(value: any) => `${(value / 1000000).toFixed(2)}M`}
                          />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </Card>

                {/* Max Pain Chart */}
                <Card className="border-2 border-purple-500/20 bg-card/80">
                  <div className="p-2.5">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent text-sm">
                          Max Pain Analysis
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Max Pain: ₹{(maxPainStrike / 10000).toFixed(2)}L
                        </p>
                      </div>
                    </div>
                    
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={maxPainData}>
                          <defs>
                            <linearGradient id="maxPainGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#A855F7" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#A855F7" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(251, 191, 36, 0.1)" />
                          <XAxis 
                            dataKey="strike" 
                            stroke="rgba(251, 191, 36, 0.5)"
                            tickFormatter={(value) => `₹${(value / 10000).toFixed(0)}L`}
                          />
                          <YAxis 
                            stroke="rgba(251, 191, 36, 0.5)"
                            tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                          />
                          <RechartsTooltip
                            contentStyle={{
                              backgroundColor: 'rgba(0, 0, 0, 0.8)',
                              border: '1px solid rgba(251, 191, 36, 0.3)',
                              borderRadius: '8px',
                            }}
                            formatter={(value: any) => [`₹${(value / 1000000).toFixed(2)}M`, 'Total Pain']}
                            labelFormatter={(label) => `Strike: ₹${(label / 10000).toFixed(2)}L`}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="pain" 
                            stroke="#A855F7" 
                            strokeWidth={2}
                            fill="url(#maxPainGradient)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* FUTURES TAB */}
            <TabsContent value="futures" className="mt-3 space-y-3">
              <Card className="border-2 border-amber-500/20 bg-card/80">
                <div className="p-3">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                      <TrendingUpIcon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                        Futures Contracts
                      </h3>
                      <p className="text-xs text-muted-foreground">Active futures for {state.name} {assetType}</p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-amber-500/20 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-b border-amber-500/30">
                            <th className="p-2 text-left">Expiry</th>
                            <th className="p-2 text-left">LTP</th>
                            <th className="p-2 text-left">Change</th>
                            <th className="p-2 text-left">Volume</th>
                            <th className="p-2 text-left">Open Interest</th>
                            <th className="p-2 text-left">OI Change</th>
                            <th className="p-2 text-left">Basis</th>
                            <th className="p-2 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {futureContracts.map((contract, index) => (
                            <tr key={index} className="border-b border-amber-500/10 hover:bg-amber-500/5 transition-colors">
                              <td className="p-2">
                                <div className="flex items-center gap-1.5">
                                  <Calendar className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                                  <span className="font-bold">{contract.expiry}</span>
                                  {index === 0 && <Badge className="bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/40 text-xs py-0 h-4 px-1">Near</Badge>}
                                </div>
                              </td>
                              <td className="p-2 font-bold">
                                ₹{(contract.price / 10000).toFixed(2)}L
                              </td>
                              <td className={`p-2 font-bold ${
                                contract.change > 0 ? 'text-green-600 dark:text-green-400' : 
                                contract.change < 0 ? 'text-red-600 dark:text-red-400' : ''
                              }`}>
                                {contract.change > 0 ? '+' : ''}{contract.change.toFixed(2)}%
                              </td>
                              <td className="p-2 text-muted-foreground">
                                {(contract.volume / 1000000).toFixed(2)}M
                              </td>
                              <td className="p-2">
                                {(contract.openInterest / 1000000).toFixed(2)}M
                              </td>
                              <td className={`p-2 ${
                                contract.oiChange > 0 ? 'text-green-600 dark:text-green-400' : 
                                contract.oiChange < 0 ? 'text-red-600 dark:text-red-400' : ''
                              }`}>
                                {contract.oiChange > 0 ? '+' : ''}{contract.oiChange.toFixed(2)}%
                              </td>
                              <td className="p-2">
                                {contract.basis > 0 ? '+' : ''}{contract.basis.toFixed(2)}
                              </td>
                              <td className="p-2">
                                <div className="flex items-center justify-end gap-1">
                                  <Button size="sm" className="bg-green-500/20 text-green-600 dark:text-green-400 hover:bg-green-500/30 border-0 h-6 text-xs px-2">
                                    <Zap className="w-3 h-3 mr-0.5" />
                                    Buy
                                  </Button>
                                  <Button size="sm" className="bg-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-500/30 border-0 h-6 text-xs px-2">
                                    <Zap className="w-3 h-3 mr-0.5" />
                                    Sell
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* ANALYTICS TAB */}
            <TabsContent value="analytics" className="mt-3 space-y-3">
              {/* OI Trend */}
              <Card className="border-2 border-green-500/20 bg-card/80">
                <div className="p-3">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                      <BarChart3 className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                        Open Interest Trend
                      </h3>
                      <p className="text-xs text-muted-foreground">Call vs Put OI over time</p>
                    </div>
                  </div>

                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={oiTrendData}>
                        <defs>
                          <linearGradient id="callOIGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="putOIGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(251, 191, 36, 0.1)" />
                        <XAxis dataKey="day" stroke="rgba(251, 191, 36, 0.5)" />
                        <YAxis 
                          yAxisId="left"
                          stroke="rgba(251, 191, 36, 0.5)"
                          tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                        />
                        <YAxis 
                          yAxisId="right"
                          orientation="right"
                          stroke="rgba(251, 191, 36, 0.5)"
                          tickFormatter={(value) => `₹${(value / 10000).toFixed(0)}L`}
                        />
                        <RechartsTooltip
                          contentStyle={{
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            border: '1px solid rgba(251, 191, 36, 0.3)',
                            borderRadius: '8px',
                          }}
                        />
                        <Legend />
                        <Area 
                          yAxisId="left"
                          type="monotone" 
                          dataKey="callOI" 
                          stroke="#10B981" 
                          fill="url(#callOIGradient)"
                          name="Call OI"
                        />
                        <Area 
                          yAxisId="left"
                          type="monotone" 
                          dataKey="putOI" 
                          stroke="#EF4444" 
                          fill="url(#putOIGradient)"
                          name="Put OI"
                        />
                        <Line 
                          yAxisId="right"
                          type="monotone" 
                          dataKey="price" 
                          stroke="#FCD34D" 
                          strokeWidth={2}
                          dot={false}
                          name="Price"
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </Card>

              {/* Support & Resistance */}
              <Card className="border-2 border-blue-500/20 bg-card/80">
                <div className="p-3">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                      <Target className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                        Support & Resistance Levels
                      </h3>
                      <p className="text-xs text-muted-foreground">Key price levels for {state.name}</p>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="p-2 rounded-xl bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-500/30">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Resistance 3</span>
                        <span className="text-sm font-bold text-red-600 dark:text-red-400">
                          ₹{(supportResistance.resistance3 / 10000).toFixed(2)}L
                        </span>
                      </div>
                    </div>
                    <div className="p-2 rounded-xl bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-500/30">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Resistance 2</span>
                        <span className="text-sm font-bold text-red-600 dark:text-red-400">
                          ₹{(supportResistance.resistance2 / 10000).toFixed(2)}L
                        </span>
                      </div>
                    </div>
                    <div className="p-2 rounded-xl bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-500/30">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Resistance 1</span>
                        <span className="text-sm font-bold text-red-600 dark:text-red-400">
                          ₹{(supportResistance.resistance1 / 10000).toFixed(2)}L
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-2.5 rounded-xl bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-2 border-yellow-500/50">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-yellow-600 dark:text-yellow-400">Current Price</span>
                        <span className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
                          ₹{(supportResistance.current / 10000).toFixed(2)}L
                        </span>
                      </div>
                    </div>

                    <div className="p-2 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Support 1</span>
                        <span className="text-sm font-bold text-green-600 dark:text-green-400">
                          ₹{(supportResistance.support1 / 10000).toFixed(2)}L
                        </span>
                      </div>
                    </div>
                    <div className="p-2 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Support 2</span>
                        <span className="text-sm font-bold text-green-600 dark:text-green-400">
                          ₹{(supportResistance.support2 / 10000).toFixed(2)}L
                        </span>
                      </div>
                    </div>
                    <div className="p-2 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Support 3</span>
                        <span className="text-sm font-bold text-green-600 dark:text-green-400">
                          ₹{(supportResistance.support3 / 10000).toFixed(2)}L
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Greeks Summary */}
              <Card className="border-2 border-purple-500/20 bg-card/80">
                <div className="p-3">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                      <Calculator className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                        Portfolio Greeks Summary
                      </h3>
                      <p className="text-xs text-muted-foreground">Risk metrics for your positions</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30">
                      <p className="text-xs text-muted-foreground mb-1">Delta</p>
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{greeksSummary.portfolioDelta}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Directional exposure</p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30">
                      <p className="text-xs text-muted-foreground mb-1">Gamma</p>
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">{greeksSummary.portfolioGamma}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Delta sensitivity</p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-red-500/10 to-rose-500/10 border border-red-500/30">
                      <p className="text-xs text-muted-foreground mb-1">Theta</p>
                      <p className="text-2xl font-bold text-red-600 dark:text-red-400">{greeksSummary.portfolioTheta}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Time decay per day</p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30">
                      <p className="text-xs text-muted-foreground mb-1">Vega</p>
                      <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{greeksSummary.portfolioVega}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Volatility risk</p>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* STRATEGIES TAB */}
            <TabsContent value="strategies" className="mt-3 space-y-3">
              <Card className="border-2 border-purple-500/20 bg-card/80">
                <div className="p-3">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                        AI-Powered Strategy Recommendations
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Based on current market conditions for {state.name}
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {strategyRecommendations.map((strategy, index) => (
                      <Card
                        key={index}
                        className={`border-2 ${
                          strategy.color === 'green' ? 'border-green-500/30 bg-green-500/5' :
                          strategy.color === 'red' ? 'border-red-500/30 bg-red-500/5' :
                          strategy.color === 'blue' ? 'border-blue-500/30 bg-blue-500/5' :
                          strategy.color === 'purple' ? 'border-purple-500/30 bg-purple-500/5' :
                          'border-orange-500/30 bg-orange-500/5'
                        } hover:scale-105 transition-transform cursor-pointer`}
                      >
                        <div className="p-3">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className={`text-sm font-bold ${
                              strategy.color === 'green' ? 'text-green-600 dark:text-green-400' :
                              strategy.color === 'red' ? 'text-red-600 dark:text-red-400' :
                              strategy.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                              strategy.color === 'purple' ? 'text-purple-600 dark:text-purple-400' :
                              'text-orange-600 dark:text-orange-400'
                            }`}>
                              {strategy.name}
                            </h4>
                            <Badge className={`${
                              strategy.color === 'green' ? 'bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/40' :
                              strategy.color === 'red' ? 'bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/40' :
                              strategy.color === 'blue' ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/40' :
                              strategy.color === 'purple' ? 'bg-purple-500/20 text-purple-600 dark:text-purple-400 border-purple-500/40' :
                              'bg-orange-500/20 text-orange-600 dark:text-orange-400 border-orange-500/40'
                            } border text-xs py-0 h-4 px-1.5`}>
                              {strategy.sentiment}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mb-3">{strategy.description}</p>
                          <div className="flex items-center justify-between text-xs mb-2">
                            <div>
                              <p className="text-muted-foreground">Risk</p>
                              <p className="font-semibold">{strategy.risk}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Reward</p>
                              <p className="font-semibold">{strategy.reward}</p>
                            </div>
                          </div>
                          <Button className="w-full h-7 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white text-xs">
                            <Zap className="w-3 h-3 mr-1" />
                            Execute Strategy
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Strategy Builder */}
              <Card className="border-2 border-amber-500/20 bg-card/80">
                <div className="p-3">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center">
                      <Calculator className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent">
                        Custom Strategy Builder
                      </h3>
                      <p className="text-xs text-muted-foreground">Build your own options strategy</p>
                    </div>
                  </div>

                  <div className="p-6 rounded-xl border-2 border-dashed border-amber-500/30 bg-amber-500/5 text-center">
                    <Calculator className="w-12 h-12 mx-auto mb-3 text-amber-600 dark:text-amber-400 opacity-50" />
                    <h4 className="font-bold text-amber-600 dark:text-amber-400 mb-1.5 text-sm">Interactive Strategy Builder</h4>
                    <p className="text-xs text-muted-foreground mb-3">
                      Design custom multi-leg options strategies with real-time P&L visualization
                    </p>
                    <Button className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white h-7 text-xs">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Launch Strategy Builder
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* CHARTS TAB */}
            <TabsContent value="charts" className="mt-3 space-y-3">
              <Card className="border-2 border-blue-500/20 bg-card/80">
                <div className="p-3">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                        <LineChart className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                          Price History & Technical Analysis
                        </h3>
                        <p className="text-xs text-muted-foreground">Historical price movement for {state.name}</p>
                      </div>
                    </div>
                    
                    <Select value={chartPeriod} onValueChange={setChartPeriod}>
                      <SelectTrigger className="w-28 border-blue-500/30 h-7 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1D">1 Day</SelectItem>
                        <SelectItem value="1W">1 Week</SelectItem>
                        <SelectItem value="1M">1 Month</SelectItem>
                        <SelectItem value="3M">3 Months</SelectItem>
                        <SelectItem value="6M">6 Months</SelectItem>
                        <SelectItem value="1Y">1 Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={priceHistoryData}>
                        <defs>
                          <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(251, 191, 36, 0.1)" />
                        <XAxis dataKey="time" stroke="rgba(251, 191, 36, 0.5)" />
                        <YAxis 
                          stroke="rgba(251, 191, 36, 0.5)"
                          tickFormatter={(value) => `₹${(value / 10000).toFixed(0)}L`}
                        />
                        <RechartsTooltip
                          contentStyle={{
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            border: '1px solid rgba(251, 191, 36, 0.3)',
                            borderRadius: '8px',
                          }}
                          formatter={(value: any, name: string) => [
                            name === 'price' || name === 'futurePrice' ? `₹${(value / 10000).toFixed(2)}L` : value,
                            name === 'price' ? 'Spot Price' : name === 'futurePrice' ? 'Future Price' : name
                          ]}
                        />
                        <Legend />
                        <Area 
                          type="monotone" 
                          dataKey="price" 
                          stroke="#3B82F6" 
                          strokeWidth={2}
                          fill="url(#priceGradient)"
                          name="Spot Price"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="futurePrice" 
                          stroke="#FBBF24" 
                          strokeWidth={2}
                          dot={false}
                          name="Future Price"
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2">
                    <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/30">
                      <p className="text-xs text-muted-foreground mb-0.5">Opening</p>
                      <p className="text-sm font-bold text-blue-600 dark:text-blue-400">
                        ₹{(priceHistoryData[0]?.price / 10000).toFixed(2)}L
                      </p>
                    </div>
                    <div className="p-2 rounded-xl bg-green-500/10 border border-green-500/30">
                      <p className="text-xs text-muted-foreground mb-0.5">High</p>
                      <p className="text-sm font-bold text-green-600 dark:text-green-400">
                        ₹{(Math.max(...priceHistoryData.map(d => d.price)) / 10000).toFixed(2)}L
                      </p>
                    </div>
                    <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/30">
                      <p className="text-xs text-muted-foreground mb-0.5">Low</p>
                      <p className="text-sm font-bold text-red-600 dark:text-red-400">
                        ₹{(Math.min(...priceHistoryData.map(d => d.price)) / 10000).toFixed(2)}L
                      </p>
                    </div>
                    <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/30">
                      <p className="text-xs text-muted-foreground mb-0.5">Close</p>
                      <p className="text-sm font-bold text-purple-600 dark:text-purple-400">
                        ₹{(priceHistoryData[priceHistoryData.length - 1]?.price / 10000).toFixed(2)}L
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* TradingView Integration */}
              <Card className="border-2 border-purple-500/20 bg-card/80">
                <div className="p-3">
                  <div className="p-6 rounded-xl border-2 border-dashed border-purple-500/30 bg-purple-500/5 text-center">
                    <LineChart className="w-12 h-12 mx-auto mb-3 text-purple-600 dark:text-purple-400 opacity-50" />
                    <h4 className="font-bold text-purple-600 dark:text-purple-400 mb-1.5 text-sm">Advanced TradingView Charts</h4>
                    <p className="text-xs text-muted-foreground mb-3">
                      Professional-grade charting with 100+ indicators and drawing tools
                    </p>
                    <Button 
                      onClick={() => setChartModalOpen(true)}
                      className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white h-7 text-xs"
                    >
                      <Maximize2 className="w-3 h-3 mr-1" />
                      Open TradingView Chart
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>

      {/* TradingView Chart Modal */}
      <TradingViewChartModal
        isOpen={chartModalOpen}
        onClose={() => setChartModalOpen(false)}
        symbol={tickerSymbol}
        assetName={`${state.name} F&O`}
        assetType={utCodes.includes(state.code) ? 'ut' : 'state'}
        currentPrice={state.value}
        change={state.change}
        themeColor="yellow"
      />
    </div>
  );
}
