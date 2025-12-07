import { motion, AnimatePresence } from 'motion/react';
import { LineChart, Line, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Target, Activity, MapPin, ArrowUpRight, ArrowDownRight, Zap, ChevronRight, Search, Plus, Star, X, BarChart3, Wallet, Calendar, Clock, ChevronDown, Bell, Settings, LogOut, User, Menu, Home, Briefcase, FileText, BookOpen, Phone, Eye, EyeOff, Trash2, Shield, Award, ArrowUpDown, Globe, Send, ExternalLink, MessageSquare, Building2, CalendarClock, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { Input } from './ui/input';
import { WatchlistIcon } from './WatchlistIcon';

interface DashboardHomeProps {
  onNavigate?: (page: string) => void;
}

export function DashboardHome({ onNavigate }: DashboardHomeProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [aiMessage, setAiMessage] = useState('');
  const [marketStatus, setMarketStatus] = useState<'open' | 'closed'>('open');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      const hours = new Date().getHours();
      setMarketStatus(hours >= 9 && hours < 15 ? 'open' : 'closed');
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Portfolio Summary Data
  const portfolioValue = 1245000;
  const dailyPL = 52400;
  const dailyPLPercent = 4.21;
  const districtTokensHeld = 12;
  const activeFOContracts = 8;
  const sipInvestments = 4;

  // GDP Growth Trend Data
  const gdpData = [
    { year: '2020', india: 2650, projected: 2600 },
    { year: '2021', india: 2800, projected: 2750 },
    { year: '2022', india: 3100, projected: 3050 },
    { year: '2023', india: 3400, projected: 3350 },
    { year: '2024', india: 3750, projected: 3700 },
    { year: '2025', india: 4100, projected: 4200 },
  ];

  // District Tokens Performance
  const topDistricts = [
    { name: 'Mumbai', price: 234.50, change: 8.45, volume: '₹42.5Cr', marketCap: '₹1240Cr', trend: [220, 225, 230, 228, 234] },
    { name: 'Bengaluru', price: 198.20, change: 6.78, volume: '₹38.2Cr', marketCap: '₹980Cr', trend: [185, 190, 195, 196, 198] },
    { name: 'Pune', price: 156.80, change: 5.23, volume: '₹28.5Cr', marketCap: '₹720Cr', trend: [148, 152, 155, 154, 157] },
    { name: 'Hyderabad', price: 178.90, change: 4.67, volume: '₹32.8Cr', marketCap: '₹850Cr', trend: [170, 173, 176, 177, 179] },
    { name: 'Ahmedabad', price: 142.30, change: -2.15, volume: '₹22.1Cr', marketCap: '₹640Cr', trend: [148, 146, 145, 143, 142] },
  ];

  // State F&O Data
  const stateFO = [
    { state: 'Maharashtra', long: 68, short: 32, expiry: '28 Oct', oi: '₹580Cr', change: 5.4 },
    { state: 'Karnataka', long: 62, short: 38, expiry: '28 Oct', oi: '₹420Cr', change: 4.2 },
    { state: 'Gujarat', long: 58, short: 42, expiry: '28 Oct', oi: '₹340Cr', change: 3.8 },
    { state: 'Tamil Nadu', long: 55, short: 45, expiry: '28 Oct', oi: '₹310Cr', change: 2.9 },
    { state: 'Uttar Pradesh', long: 52, short: 48, expiry: '28 Oct', oi: '₹280Cr', change: 1.5 },
  ];

  // Mutual Funds 2.0 Data
  const mutualFunds = [
    { name: 'Bharat Growth Fund', nav: 145.82, return1y: 18.5, risk: 'Medium', sip: true, value: '₹2.4L' },
    { name: 'Digital India Fund', nav: 98.45, return1y: 24.8, risk: 'High', sip: true, value: '₹1.8L' },
    { name: 'Smart Cities Fund', nav: 112.60, return1y: 15.2, risk: 'Low', sip: false, value: '₹0.95L' },
    { name: 'Infrastructure Fund', nav: 87.30, return1y: 12.8, risk: 'Medium', sip: true, value: '₹1.2L' },
  ];

  // Portfolio Allocation
  const allocationData = [
    { name: 'District Tokens', value: 45, color: '#FFD54F' },
    { name: 'Mutual Funds', value: 30, color: '#10B981' },
    { name: 'State F&O', value: 15, color: '#8B5CF6' },
    { name: 'State ETFs', value: 10, color: '#3B82F6' },
  ];

  // AI Insights
  const aiInsights = [
    { type: 'bullish', text: 'Strong buy signal for Bengaluru & Pune tokens - Tech sector expansion expected', confidence: 87 },
    { type: 'neutral', text: 'Maharashtra F&O showing consolidation - Wait for breakout above ₹580Cr OI', confidence: 72 },
    { type: 'bearish', text: 'Reduce exposure to low-growth districts - Rebalance recommended', confidence: 65 },
  ];

  // Watchlist Data
  const [watchlistItems, setWatchlistItems] = useState([
    { 
      id: 1, 
      name: 'Mumbai', 
      type: 'District Token',
      state: 'Maharashtra', 
      price: 234.50, 
      change: 8.45,
      changePercent: 3.73,
      volume: '₹42.5Cr',
      trend: [220, 225, 230, 228, 234],
      isWatching: true,
    },
    { 
      id: 2, 
      name: 'Bengaluru', 
      type: 'District Token',
      state: 'Karnataka', 
      price: 198.20, 
      change: 6.78,
      changePercent: 3.54,
      volume: '₹38.2Cr',
      trend: [185, 190, 195, 196, 198],
      isWatching: true,
    },
    { 
      id: 3, 
      name: 'Maharashtra Index', 
      type: 'State F&O',
      state: 'Maharashtra', 
      price: 1456.30, 
      change: 45.20,
      changePercent: 3.20,
      volume: '₹580Cr',
      trend: [1400, 1420, 1440, 1450, 1456],
      isWatching: true,
    },
    { 
      id: 4, 
      name: 'Bharat Growth Fund', 
      type: 'Mutual Fund',
      state: 'India', 
      price: 145.82, 
      change: 2.45,
      changePercent: 1.71,
      volume: '₹2.4L',
      trend: [140, 142, 144, 145, 146],
      isWatching: true,
    },
  ]);

  // Recent Transactions
  const recentTransactions = [
    { type: 'buy', asset: 'Mumbai Token', amount: '₹12,450', time: '2 min ago', status: 'completed' },
    { type: 'sip', asset: 'Bharat Growth Fund', amount: '₹5,000', time: '1 hour ago', status: 'completed' },
    { type: 'sell', asset: 'Delhi F&O Long', amount: '₹8,200', time: '3 hours ago', status: 'completed' },
    { type: 'buy', asset: 'Karnataka ETF', amount: '₹15,000', time: '5 hours ago', status: 'completed' },
    { type: 'sip', asset: 'Digital India Fund', amount: '₹5,000', time: '1 day ago', status: 'completed' },
  ];

  // Performance Radar Chart Data
  const performanceMetrics = [
    { metric: 'Returns', value: 85 },
    { metric: 'Diversification', value: 72 },
    { metric: 'Risk Management', value: 68 },
    { metric: 'Liquidity', value: 90 },
    { metric: 'Growth Potential', value: 78 },
  ];

  // Zonix Index vs Nifty
  const indexComparison = [
    { month: 'May', zonix: 12500, nifty: 18200 },
    { month: 'Jun', zonix: 13200, nifty: 18500 },
    { month: 'Jul', zonix: 13800, nifty: 18800 },
    { month: 'Aug', zonix: 14500, nifty: 19200 },
    { month: 'Sep', zonix: 15200, nifty: 19500 },
    { month: 'Oct', zonix: 16100, nifty: 19800 },
  ];

  const formatCurrency = (value: number) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)}Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(2)}L`;
    return `₹${value.toLocaleString('en-IN')}`;
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="backdrop-blur-xl bg-black/90 border border-yellow-500/30 rounded-xl p-3 shadow-2xl">
          <p className="text-sm text-white">{payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  const handleAiQuery = () => {
    if (aiMessage.trim()) {
      // Simulate AI response
      console.log('AI Query:', aiMessage);
      setAiMessage('');
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Top Overview Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden"
      >
        <Card className="relative border-2 border-yellow-500/30 bg-gradient-to-br from-card/90 via-yellow-50/5 dark:via-yellow-950/10 to-card backdrop-blur-xl shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 via-transparent to-yellow-500/5"></div>
          <div className="relative p-4 sm:p-6">
            <div className="grid grid-cols-2 lg:grid-cols-7 gap-3 sm:gap-4">
              {/* Total Portfolio Value */}
              <div className="col-span-2 lg:col-span-2">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center shadow-lg">
                    <Wallet className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Total Portfolio Value</p>
                    <h2 className="text-2xl sm:text-3xl bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent">
                      {formatCurrency(portfolioValue)}
                    </h2>
                  </div>
                </div>
                <div className={`flex items-center gap-2 text-lg ${dailyPL >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {dailyPL >= 0 ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                  <span>{dailyPL >= 0 ? '+' : ''}{formatCurrency(dailyPL)} ({dailyPL >= 0 ? '+' : ''}{dailyPLPercent}%)</span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">District Tokens</p>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                  <p className="text-xl">{districtTokensHeld}</p>
                </div>
                <p className="text-xs text-green-600 dark:text-green-400">Held</p>
              </div>

              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">F&O Contracts</p>
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                  <p className="text-xl">{activeFOContracts}</p>
                </div>
                <p className="text-xs text-blue-600 dark:text-blue-400">Active</p>
              </div>

              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">SIP Running</p>
                <div className="flex items-center gap-2">
                  <CalendarClock className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                  <p className="text-xl">{sipInvestments}</p>
                </div>
                <p className="text-xs text-purple-600 dark:text-purple-400">Funds</p>
              </div>

              {/* Market Status */}
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Market Status</p>
                <div className="flex items-center gap-2">
                  <div className="relative flex h-3 w-3">
                    {marketStatus === 'open' && (
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    )}
                    <span className={`relative inline-flex rounded-full h-3 w-3 ${marketStatus === 'open' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  </div>
                  <p className={`text-sm ${marketStatus === 'open' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {marketStatus === 'open' ? 'LIVE' : 'CLOSED'}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground font-mono">
                  {currentTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>

              {/* India GDP Pulse */}
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Bharat Pulse</p>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-yellow-600 dark:text-yellow-400 animate-pulse" />
                  <p className="text-xl text-yellow-600 dark:text-yellow-400">₹410T</p>
                </div>
                <p className="text-xs text-green-600 dark:text-green-400">+7.2% GDP</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Left & Center Column - Main Widgets */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          
          {/* 1️⃣ Zonix Economic Pulse - India Map Heatmap */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="relative overflow-hidden border-2 border-yellow-500/30 bg-gradient-to-br from-card/90 via-yellow-50/5 dark:via-yellow-950/10 to-card backdrop-blur-xl shadow-xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl"></div>
              <div className="relative p-4 sm:p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center shadow-lg">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent">
                        Zonix Economic Pulse
                      </h3>
                      <p className="text-xs text-muted-foreground">Real-time GDP Performance by State</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500/20 text-green-600 dark:text-green-400 border border-green-500/40">
                    AI Powered
                  </Badge>
                </div>

                {/* GDP Growth Chart */}
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={gdpData}>
                      <defs>
                        <linearGradient id="colorGDP" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#FFD54F" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#FFD54F" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.1} />
                      <XAxis dataKey="year" stroke="#888" style={{ fontSize: '12px' }} />
                      <YAxis stroke="#888" style={{ fontSize: '12px' }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area type="monotone" dataKey="india" stroke="#FFD54F" strokeWidth={3} fillOpacity={1} fill="url(#colorGDP)" />
                      <Line type="monotone" dataKey="projected" stroke="#10B981" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">AI Sentiment</p>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <p className="text-sm text-green-600 dark:text-green-400">Bullish</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Growth Rate</p>
                    <p className="text-sm text-yellow-600 dark:text-yellow-400">+7.2% YoY</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Confidence</p>
                    <div className="flex items-center gap-2">
                      <Progress value={89} className="h-2" />
                      <span className="text-xs">89%</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* 2️⃣ District Tokens Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-2 border-yellow-500/30 bg-gradient-to-br from-card/90 via-yellow-50/5 dark:via-yellow-950/10 to-card backdrop-blur-xl shadow-xl">
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg">Top District Tokens</h3>
                  </div>
                  <Button variant="ghost" size="sm" className="text-yellow-600 dark:text-yellow-400 hover:bg-yellow-500/10">
                    View All <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>

                <div className="space-y-3">
                  {topDistricts.map((district, idx) => (
                    <motion.div
                      key={district.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + idx * 0.05 }}
                      className="relative flex items-center gap-4 p-3 rounded-xl bg-background/50 hover:bg-yellow-500/5 border border-border hover:border-yellow-500/30 transition-all cursor-pointer group"
                    >
                      {/* Watchlist Icon */}
                      <div className="absolute -top-1 -left-1 z-10" onClick={(e) => e.stopPropagation()}>
                        <WatchlistIcon
                          itemId={`district-${district.name}`}
                          itemType="district"
                          size={32}
                          onToggle={(isAdded) => {
                            console.log(`${district.name} ${isAdded ? 'added to' : 'removed from'} watchlist`);
                          }}
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <MapPin className="w-3 h-3 text-yellow-600 dark:text-yellow-400" />
                          <p className="text-sm">{district.name}</p>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>Vol: {district.volume}</span>
                          <span>•</span>
                          <span>Cap: {district.marketCap}</span>
                        </div>
                      </div>

                      <div className="w-24 h-12">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={district.trend.map((v, i) => ({ value: v }))}>
                            <Line type="monotone" dataKey="value" stroke={district.change >= 0 ? '#10B981' : '#EF4444'} strokeWidth={2} dot={false} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="text-right">
                        <p className="text-sm mb-1">₹{district.price}</p>
                        <p className={`text-xs ${district.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                          {district.change >= 0 ? '+' : ''}{district.change}%
                        </p>
                      </div>

                      <div className="flex gap-1">
                        <Button size="sm" className="h-7 px-2 bg-green-500 hover:bg-green-600 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          Buy
                        </Button>
                        <Button size="sm" variant="outline" className="h-7 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          Sell
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* 3️⃣ State F&O Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-2 border-yellow-500/30 bg-gradient-to-br from-card/90 via-yellow-50/5 dark:via-yellow-950/10 to-card backdrop-blur-xl shadow-xl">
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
                      <ArrowUpDown className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg">State F&O Markets</h3>
                      <p className="text-xs text-muted-foreground">Futures & Options Overview</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {stateFO.map((state, idx) => (
                    <motion.div
                      key={state.state}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + idx * 0.05 }}
                      className="p-3 rounded-xl bg-background/50 hover:bg-purple-500/5 border border-border hover:border-purple-500/30 transition-all"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                          <p className="text-sm">{state.state}</p>
                          <Badge variant="outline" className="text-xs border-purple-500/40">
                            {state.expiry}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <p className="text-xs text-muted-foreground">OI: {state.oi}</p>
                          <p className={`text-xs ${state.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                            {state.change >= 0 ? '+' : ''}{state.change}%
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-green-600 dark:text-green-400">Long {state.long}%</span>
                            <span className="text-red-600 dark:text-red-400">Short {state.short}%</span>
                          </div>
                          <div className="h-2 bg-background rounded-full overflow-hidden flex">
                            <div className="bg-green-500" style={{ width: `${state.long}%` }}></div>
                            <div className="bg-red-500" style={{ width: `${state.short}%` }}></div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* 4️⃣ Mutual Funds 2.0 Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-2 border-yellow-500/30 bg-gradient-to-br from-card/90 via-yellow-50/5 dark:via-yellow-950/10 to-card backdrop-blur-xl shadow-xl">
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg">Mutual Funds 2.0</h3>
                  </div>
                  <Button variant="ghost" size="sm" className="text-yellow-600 dark:text-yellow-400 hover:bg-yellow-500/10">
                    Manage <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>

                <div className="space-y-3">
                  {mutualFunds.map((fund, idx) => (
                    <motion.div
                      key={fund.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + idx * 0.05 }}
                      className="p-3 rounded-xl bg-background/50 hover:bg-blue-500/5 border border-border hover:border-blue-500/30 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-sm">{fund.name}</p>
                            {fund.sip && (
                              <Badge className="text-xs bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/40">
                                SIP Active
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span>NAV: ₹{fund.nav}</span>
                            <span>•</span>
                            <span className={fund.risk === 'High' ? 'text-red-600 dark:text-red-400' : fund.risk === 'Medium' ? 'text-yellow-600 dark:text-yellow-400' : 'text-green-600 dark:text-green-400'}>
                              {fund.risk} Risk
                            </span>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-sm mb-1">{fund.value}</p>
                          <p className="text-xs text-green-600 dark:text-green-400">+{fund.return1y}% (1Y)</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>

        </div>

        {/* Right Column - Analytics & AI Panel */}
        <div className="space-y-4 sm:space-y-6">
          
          {/* 5️⃣ Portfolio Insights - Wealth Wheel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <Card className="border-2 border-yellow-500/30 bg-gradient-to-br from-card/90 via-yellow-50/5 dark:via-yellow-950/10 to-card backdrop-blur-xl shadow-xl">
              <div className="p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center shadow-lg">
                    <PieChart className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg">Portfolio Allocation</h3>
                    <p className="text-xs text-muted-foreground">Wealth Distribution</p>
                  </div>
                </div>

                <div className="h-48 mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={allocationData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {allocationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-2">
                  {allocationData.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-xs">{item.name}</span>
                      </div>
                      <span className="text-xs">{item.value}%</span>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-muted-foreground mb-1">Total Return</p>
                    <p className="text-green-600 dark:text-green-400">+67.1%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Best Asset</p>
                    <p className="text-yellow-600 dark:text-yellow-400">Mumbai Token</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Risk Index</p>
                    <p className="text-blue-600 dark:text-blue-400">Medium</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">AI Rating</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      <span className="text-yellow-600 dark:text-yellow-400">4.5/5</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* 6️⃣ AI Insights & Forecast */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <Card className="border-2 border-purple-500/30 bg-gradient-to-br from-card/90 via-purple-50/5 dark:via-purple-950/10 to-card backdrop-blur-xl shadow-xl">
              <div className="p-4 sm:p-6">
                {/* Header with Action */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center shadow-lg">
                      <Star className="w-5 h-5 text-white fill-white" />
                    </div>
                    <div>
                      <h3 className="text-lg">My Watchlist</h3>
                      <p className="text-xs text-muted-foreground">{watchlistItems.filter(w => w.isWatching).length} items tracked</p>
                    </div>
                  </div>
                  <Badge className="bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/20">
                    Live
                  </Badge>
                </div>

                {/* Watchlist Items */}
                <div className="space-y-2 mb-4">
                  {watchlistItems.filter(item => item.isWatching).map((item, idx) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 + idx * 0.1 }}
                      className="group relative p-3 rounded-xl border border-border/50 bg-gradient-to-r from-card/50 to-card/80 hover:border-yellow-500/40 hover:shadow-lg hover:shadow-yellow-500/10 transition-all duration-300"
                    >
                      {/* Hover Glow Effect */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-500/0 via-yellow-500/5 to-yellow-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      <div className="relative flex items-center justify-between gap-3">
                        {/* Left: Asset Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="truncate">{item.name}</h4>
                            <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4">
                              {item.type}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            <span className="truncate">{item.state}</span>
                            <span className="text-muted-foreground/50">•</span>
                            <span className="truncate">{item.volume}</span>
                          </div>
                        </div>

                        {/* Center: Mini Trend Chart */}
                        <div className="hidden sm:block w-16 h-8">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={item.trend.map((value, i) => ({ value }))}>
                              <defs>
                                <linearGradient id={`trendGradient${item.id}`} x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor={item.change >= 0 ? "#10B981" : "#EF4444"} stopOpacity={0.3}/>
                                  <stop offset="95%" stopColor={item.change >= 0 ? "#10B981" : "#EF4444"} stopOpacity={0}/>
                                </linearGradient>
                              </defs>
                              <Area 
                                type="monotone" 
                                dataKey="value" 
                                stroke={item.change >= 0 ? "#10B981" : "#EF4444"} 
                                strokeWidth={1.5}
                                fill={`url(#trendGradient${item.id})`} 
                                isAnimationActive={false}
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>

                        {/* Right: Price & Change */}
                        <div className="text-right">
                          <div className="mb-0.5">₹{item.price.toFixed(2)}</div>
                          <div className={`flex items-center gap-1 text-xs ${
                            item.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                          }`}>
                            {item.change >= 0 ? (
                              <ArrowUpRight className="w-3 h-3" />
                            ) : (
                              <ArrowDownRight className="w-3 h-3" />
                            )}
                            <span>{item.change >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%</span>
                          </div>
                        </div>

                        {/* Actions (Visible on Hover) */}
                        <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0 rounded-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/30"
                            onClick={() => {
                              setWatchlistItems(prev => 
                                prev.map(w => w.id === item.id ? { ...w, isWatching: false } : w)
                              );
                            }}
                          >
                            <X className="w-3 h-3 text-red-600 dark:text-red-400" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* View Full Watchlist Button */}
                <Button 
                  className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/50 transition-all duration-300"
                  onClick={() => {
                    if (onNavigate) {
                      onNavigate('watchlist');
                    }
                  }}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Full Watchlist
                  <ExternalLink className="w-3 h-3 ml-2" />
                </Button>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-border/50">
                  <div className="text-center p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="text-xs text-muted-foreground mb-1">Gainers</div>
                    <div className="flex items-center justify-center gap-1 text-green-600 dark:text-green-400">
                      <TrendingUp className="w-3 h-3" />
                      <span className="text-sm">
                        {watchlistItems.filter(w => w.isWatching && w.change >= 0).length}
                      </span>
                    </div>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                    <div className="text-xs text-muted-foreground mb-1">Losers</div>
                    <div className="flex items-center justify-center gap-1 text-red-600 dark:text-red-400">
                      <TrendingDown className="w-3 h-3" />
                      <span className="text-sm">
                        {watchlistItems.filter(w => w.isWatching && w.change < 0).length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* 7️⃣ Performance Metrics Radar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <Card className="border-2 border-yellow-500/30 bg-gradient-to-br from-card/90 via-yellow-50/5 dark:via-yellow-950/10 to-card backdrop-blur-xl shadow-xl">
              <div className="p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg">Performance Score</h3>
                </div>

                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceMetrics}>
                      <defs>
                        <linearGradient id="colorPerformance" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#FFD54F" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#FFD54F" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.1} />
                      <XAxis dataKey="metric" stroke="#888" style={{ fontSize: '12px' }} />
                      <YAxis stroke="#888" style={{ fontSize: '12px' }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Line type="monotone" dataKey="value" stroke="#FFD54F" strokeWidth={3} fillOpacity={1} fill="url(#colorPerformance)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* 8️⃣ Recent Transactions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            <Card className="border-2 border-yellow-500/30 bg-gradient-to-br from-card/90 via-yellow-50/5 dark:via-yellow-950/10 to-card backdrop-blur-xl shadow-xl">
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-lg">
                      <Activity className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg">Recent Activity</h3>
                  </div>
                </div>

                <div className="space-y-2 max-h-72 overflow-y-auto">
                  {recentTransactions.map((tx, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.45 + idx * 0.05 }}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-background/50 transition-colors"
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        tx.type === 'buy' ? 'bg-green-500/20' :
                        tx.type === 'sell' ? 'bg-red-500/20' :
                        'bg-blue-500/20'
                      }`}>
                        {tx.type === 'buy' ? (
                          <ArrowUpRight className="w-4 h-4 text-green-600 dark:text-green-400" />
                        ) : tx.type === 'sell' ? (
                          <ArrowDownRight className="w-4 h-4 text-red-600 dark:text-red-400" />
                        ) : (
                          <CalendarClock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs truncate">{tx.asset}</p>
                        <p className="text-xs text-muted-foreground">{tx.time}</p>
                      </div>
                      <p className={`text-xs ${
                        tx.type === 'buy' ? 'text-green-600 dark:text-green-400' :
                        tx.type === 'sell' ? 'text-red-600 dark:text-red-400' :
                        'text-blue-600 dark:text-blue-400'
                      }`}>
                        {tx.amount}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* 9️⃣ AI Assistant Widget */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
          >
            <Card className="border-2 border-green-500/30 bg-gradient-to-br from-card/90 via-green-50/5 dark:via-green-950/10 to-card backdrop-blur-xl shadow-xl">
              <div className="p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg">AI Assistant</h3>
                    <p className="text-xs text-muted-foreground">Ask anything</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      placeholder="What's the best ETF this week?"
                      value={aiMessage}
                      onChange={(e) => setAiMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAiQuery()}
                      className="flex-1 h-9 text-sm bg-background/50 border-border"
                    />
                    <Button
                      size="sm"
                      onClick={handleAiQuery}
                      className="h-9 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Quick Actions:</p>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs border-green-500/40 hover:bg-green-500/10"
                        onClick={() => setAiMessage('Show GDP projection for Maharashtra')}
                      >
                        GDP Forecast
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs border-green-500/40 hover:bg-green-500/10"
                        onClick={() => setAiMessage('Top performing districts')}
                      >
                        Top Districts
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

        </div>
      </div>

      {/* Bottom Section - Zonix vs Nifty Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="border-2 border-yellow-500/30 bg-gradient-to-br from-card/90 via-yellow-50/5 dark:via-yellow-950/10 to-card backdrop-blur-xl shadow-xl">
          <div className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg">Market Comparison</h3>
                  <p className="text-xs text-muted-foreground">Zonix Index vs Nifty 50 (6 Months)</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-xs">Zonix</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-xs">Nifty</span>
                </div>
              </div>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={indexComparison}>
                  <defs>
                    <linearGradient id="colorZonix" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FFD54F" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#FFD54F" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorNifty" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.1} />
                  <XAxis dataKey="month" stroke="#888" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#888" style={{ fontSize: '12px' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="zonix" stroke="#FFD54F" strokeWidth={3} fillOpacity={1} fill="url(#colorZonix)" />
                  <Area type="monotone" dataKey="nifty" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorNifty)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-border">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Zonix Index</p>
                <p className="text-sm text-yellow-600 dark:text-yellow-400">16,100</p>
                <p className="text-xs text-green-600 dark:text-green-400">+28.8%</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Nifty 50</p>
                <p className="text-sm text-blue-600 dark:text-blue-400">19,800</p>
                <p className="text-xs text-green-600 dark:text-green-400">+8.8%</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Outperformance</p>
                <p className="text-sm text-green-600 dark:text-green-400">+20.0%</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Correlation</p>
                <p className="text-sm">0.67</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

    </div>
  );
}