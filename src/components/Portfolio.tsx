import { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Switch } from './ui/switch';
import {
  TrendingUp,
  TrendingDown,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Target,
  Activity,
  MapPin,
  TrendingUpDown,
  Sparkles,
  Building2,
  RefreshCw,
  FileDown,
  Brain,
  Star,
  AlertTriangle,
  Calendar,
  ChevronRight,
  DollarSign,
  Eye,
  ShoppingCart,
  X,
  BarChart3,
  PieChart as PieChartIcon,
  Clock,
  Lightbulb,
  Zap,
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  PieChart as RePieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis, 
  CartesianGrid,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';

export function Portfolio() {
  const [autoOptimize, setAutoOptimize] = useState(false);
  const [selectedTab, setSelectedTab] = useState('district-tokens');

  // Portfolio Summary Data
  const totalValue = 1245000;
  const investedAmount = 1000000;
  const netPL = 245300;
  const netPLPercent = 24.53;
  const cashBalance = 120000;
  const aiScore = 87;
  const diversificationIndex = 'Excellent';

  // Portfolio Allocation
  const allocationData = [
    { name: 'District Tokens', value: 45, amount: 560250, color: '#FFD54F' },
    { name: 'Mutual Funds', value: 30, amount: 373500, color: '#10B981' },
    { name: 'State F&O', value: 15, amount: 186750, color: '#8B5CF6' },
    { name: 'State ETFs', value: 10, amount: 124500, color: '#3B82F6' },
  ];

  // District Tokens Holdings
  const districtTokens = [
    { token: 'MUMBAI', district: 'Mumbai', price: 234.50, change24h: 8.45, change1m: 12.3, change1y: 45.8, holdings: 120, value: 28140, pl: 8420, plPercent: 42.6, trend: [220, 225, 230, 228, 234] },
    { token: 'BANG', district: 'Bengaluru', price: 198.20, change24h: 6.78, change1m: 9.5, change1y: 38.2, holdings: 150, value: 29730, pl: 6950, plPercent: 30.5, trend: [185, 190, 195, 196, 198] },
    { token: 'PUNE', district: 'Pune', price: 156.80, change24h: 5.23, change1m: 7.8, change1y: 32.1, holdings: 200, value: 31360, pl: 5240, plPercent: 20.1, trend: [148, 152, 155, 154, 157] },
    { token: 'HYD', district: 'Hyderabad', price: 178.90, change24h: 4.67, change1m: 6.2, change1y: 28.9, holdings: 100, value: 17890, pl: 3890, plPercent: 27.8, trend: [170, 173, 176, 177, 179] },
    { token: 'AHEMD', district: 'Ahmedabad', price: 142.30, change24h: -2.15, change1m: -1.5, change1y: 15.6, holdings: 180, value: 25614, pl: -1250, plPercent: -4.6, trend: [148, 146, 145, 143, 142] },
  ];

  // F&O Holdings
  const foHoldings = [
    { state: 'Maharashtra', type: 'Future', position: 'Long', expiry: '28 Oct 2025', quantity: 50, entryPrice: 245.60, currentPrice: 268.40, pl: 1140, plPercent: 9.3, margin: 45000, daysLeft: 3 },
    { state: 'Karnataka', type: 'Option', position: 'Long', expiry: '28 Oct 2025', quantity: 100, entryPrice: 12.50, currentPrice: 18.20, pl: 570, plPercent: 45.6, margin: 15000, daysLeft: 3 },
    { state: 'Gujarat', type: 'Future', position: 'Short', expiry: '30 Oct 2025', quantity: 30, entryPrice: 189.30, currentPrice: 182.50, pl: 204, plPercent: 3.6, margin: 32000, daysLeft: 5 },
    { state: 'Tamil Nadu', type: 'Option', position: 'Long', expiry: '15 Nov 2025', quantity: 80, entryPrice: 8.90, currentPrice: 11.40, pl: 200, plPercent: 28.1, margin: 12000, daysLeft: 21 },
  ];

  // Mutual Funds Holdings
  const mutualFunds = [
    { name: 'Bharat Growth Fund', nav: 145.82, return1y: 18.5, risk: 'Medium', sipRunning: true, value: 240000, pl: 38400, plPercent: 19.0 },
    { name: 'Digital India Fund', nav: 98.45, return1y: 24.8, risk: 'High', sipRunning: true, value: 180000, pl: 35800, plPercent: 24.9 },
    { name: 'Smart Cities Fund', nav: 112.60, return1y: 15.2, risk: 'Low', sipRunning: false, value: 95000, pl: 12550, plPercent: 15.2 },
    { name: 'Infrastructure Fund', nav: 87.30, return1y: 12.8, risk: 'Medium', sipRunning: true, value: 120000, pl: 13680, plPercent: 12.9 },
  ];

  // ETF Holdings
  const etfHoldings = [
    { name: 'Maharashtra ETF', nav: 256.40, dayChange: 2.3, return1y: 22.5, holdings: 50, expiry: '15 Dec 2025', value: 12820, pl: 2364, plPercent: 22.6, daysLeft: 51 },
    { name: 'Karnataka Tech ETF', nav: 189.70, dayChange: 1.8, return1y: 28.9, holdings: 70, expiry: '20 Nov 2025', value: 13279, pl: 2980, plPercent: 28.9, daysLeft: 26 },
    { name: 'Gujarat Industries ETF', nav: 142.30, dayChange: -0.5, return1y: 12.3, holdings: 100, expiry: '30 Oct 2025', value: 14230, pl: 1559, plPercent: 12.3, daysLeft: 5 },
  ];

  // SIP Tracker
  const sipData = [
    { name: 'Bharat Growth Fund', amount: 5000, frequency: 'Monthly', nextDue: '01 Nov 2025', duration: '24 months', invested: 60000, projected: 78500, growth: 30.8 },
    { name: 'Digital India Fund', amount: 5000, frequency: 'Monthly', nextDue: '05 Nov 2025', duration: '18 months', invested: 45000, projected: 56200, growth: 24.9 },
    { name: 'Infrastructure Fund', amount: 3000, frequency: 'Monthly', nextDue: '10 Nov 2025', duration: '12 months', invested: 18000, projected: 20340, growth: 13.0 },
  ];

  // Recent Activity
  const recentActivity = [
    { action: 'Bought 20 Mumbai Tokens at ₹234.50 each', time: '2 hours ago', type: 'buy', category: 'District Token' },
    { action: 'SIP Payment: Bharat Growth Fund ₹5,000', time: '1 day ago', type: 'sip', category: 'Mutual Fund' },
    { action: 'Sold Karnataka F&O Long Position - Profit ₹1,140', time: '2 days ago', type: 'sell', category: 'F&O' },
    { action: 'Gujarat ETF Dividend Credited: ₹850', time: '3 days ago', type: 'dividend', category: 'ETF' },
    { action: 'Bought 50 Pune Tokens at ₹156.80 each', time: '5 days ago', type: 'buy', category: 'District Token' },
  ];

  // AI Insights
  const aiInsights = [
    { type: 'warning', text: 'Your portfolio risk is moderate. Consider diversifying by adding low-risk ETFs to balance volatility.', priority: 'medium' },
    { type: 'success', text: 'Top Performing Asset: Bengaluru Token (+38.2% YoY). Strong tech sector growth expected to continue.', priority: 'high' },
    { type: 'alert', text: 'Underperforming: Ahmedabad Token (-4.6% 24h). Consider rebalancing or monitoring closely.', priority: 'medium' },
    { type: 'info', text: '3 F&O contracts expiring within 5 days. Review positions to avoid auto-settlement.', priority: 'high' },
  ];

  // Projected Growth Data
  const projectionData = [
    { month: '1M', conservative: 1260000, moderate: 1280000, aggressive: 1310000 },
    { month: '3M', conservative: 1290000, moderate: 1340000, aggressive: 1420000 },
    { month: '6M', conservative: 1340000, moderate: 1450000, aggressive: 1580000 },
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

  return (
    <div className="min-h-screen p-4 sm:p-6 space-y-4 sm:space-y-6">
      
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl sm:text-4xl bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent mb-2">
            Your Financial Universe
          </h1>
          <p className="text-muted-foreground">Manage your tokenized portfolio with AI-powered insights</p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="border-yellow-500/40 hover:bg-yellow-500/10">
            <FileDown className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white">
            <RefreshCw className="w-4 h-4 mr-2" />
            Rebalance
          </Button>
        </div>
      </motion.div>

      {/* Top Portfolio Summary Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="relative overflow-hidden border-2 border-yellow-500/30 bg-gradient-to-br from-card/90 via-yellow-50/5 dark:via-yellow-950/10 to-card backdrop-blur-xl shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 via-transparent to-yellow-500/5"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"></div>
          
          <div className="relative p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
              
              {/* Total Portfolio Value */}
              <div className="lg:col-span-2">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center shadow-xl">
                    <Wallet className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1">Total Portfolio Value</p>
                    <h2 className="text-3xl sm:text-4xl bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent mb-2">
                      {formatCurrency(totalValue)}
                    </h2>
                    <div className={`flex items-center gap-2 text-lg ${netPL >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {netPL >= 0 ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                      <span>{netPL >= 0 ? '+' : ''}{formatCurrency(netPL)} ({netPL >= 0 ? '+' : ''}{netPLPercent}%)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Invested Amount */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                  <p className="text-xs text-muted-foreground">Invested Amount</p>
                </div>
                <p className="text-xl mb-1">{formatCurrency(investedAmount)}</p>
                <p className="text-xs text-muted-foreground">Principal</p>
              </div>

              {/* Cash Balance */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Wallet className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <p className="text-xs text-muted-foreground">Cash Balance</p>
                </div>
                <p className="text-xl mb-1">{formatCurrency(cashBalance)}</p>
                <p className="text-xs text-green-600 dark:text-green-400">Available</p>
              </div>

              {/* AI Portfolio Score */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <p className="text-xs text-muted-foreground">AI Score</p>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-xl">{aiScore}/100</p>
                  <Badge className="bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/40 text-xs">
                    Bullish
                  </Badge>
                </div>
                <Progress value={aiScore} className="h-2" />
              </div>

              {/* Diversification */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <p className="text-xs text-muted-foreground">Diversification</p>
                </div>
                <p className="text-xl mb-1">{diversificationIndex}</p>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  <Star className="w-3 h-3 text-yellow-500" />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Investment Overview Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left & Center - Overview Cards & Charts */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Investment Overview Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* District Tokens Card */}
              <Card className="border-2 border-yellow-500/30 bg-gradient-to-br from-card/90 via-yellow-50/5 dark:via-yellow-950/10 to-card backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all cursor-pointer group">
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center shadow-lg">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-sm text-muted-foreground mb-1">District Tokens</h3>
                  <p className="text-2xl mb-1">{formatCurrency(allocationData[0].amount)}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <Badge variant="outline" className="text-xs border-yellow-500/40">5 Tokens</Badge>
                    <span className="text-green-600 dark:text-green-400">+42.6%</span>
                  </div>
                </div>
              </Card>

              {/* State F&O Card */}
              <Card className="border-2 border-purple-500/30 bg-gradient-to-br from-card/90 via-purple-50/5 dark:via-purple-950/10 to-card backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all cursor-pointer group">
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
                      <TrendingUpDown className="w-6 h-6 text-white" />
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-sm text-muted-foreground mb-1">State F&O</h3>
                  <p className="text-2xl mb-1">{formatCurrency(allocationData[2].amount)}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <Badge variant="outline" className="text-xs border-purple-500/40">4 Contracts</Badge>
                    <span className="text-green-600 dark:text-green-400">+15.2%</span>
                  </div>
                </div>
              </Card>

              {/* Mutual Funds Card */}
              <Card className="border-2 border-green-500/30 bg-gradient-to-br from-card/90 via-green-50/5 dark:via-green-950/10 to-card backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all cursor-pointer group">
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-sm text-muted-foreground mb-1">Mutual Funds 2.0</h3>
                  <p className="text-2xl mb-1">{formatCurrency(allocationData[1].amount)}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <Badge variant="outline" className="text-xs border-green-500/40 bg-green-500/20 text-green-600 dark:text-green-400">3 SIPs Active</Badge>
                    <span className="text-green-600 dark:text-green-400">+18.5%</span>
                  </div>
                </div>
              </Card>

              {/* State ETFs Card */}
              <Card className="border-2 border-blue-500/30 bg-gradient-to-br from-card/90 via-blue-50/5 dark:via-blue-950/10 to-card backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all cursor-pointer group">
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-sm text-muted-foreground mb-1">State ETFs</h3>
                  <p className="text-2xl mb-1">{formatCurrency(allocationData[3].amount)}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <Badge variant="outline" className="text-xs border-blue-500/40">3 ETFs</Badge>
                    <span className="text-green-600 dark:text-green-400">+22.5%</span>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>

          {/* Portfolio Allocation Donut Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-2 border-yellow-500/30 bg-gradient-to-br from-card/90 via-yellow-50/5 dark:via-yellow-950/10 to-card backdrop-blur-xl shadow-xl">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center shadow-lg">
                    <PieChartIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg">Portfolio Allocation</h3>
                    <p className="text-xs text-muted-foreground">Asset Distribution</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="h-64 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <RePieChart>
                        <Pie
                          data={allocationData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {allocationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                      </RePieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="space-y-4">
                    {allocationData.map((item, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                            <span className="text-sm">{item.name}</span>
                          </div>
                          <span className="text-sm">{item.value}%</span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{formatCurrency(item.amount)}</span>
                        </div>
                        <Progress value={item.value} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Detailed Holdings Tables */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-2 border-yellow-500/30 bg-gradient-to-br from-card/90 via-yellow-50/5 dark:via-yellow-950/10 to-card backdrop-blur-xl shadow-xl">
              <div className="p-6">
                <h3 className="text-lg mb-4">Detailed Holdings</h3>
                
                <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                  <TabsList className="grid w-full grid-cols-5 mb-6">
                    <TabsTrigger value="district-tokens">District Tokens</TabsTrigger>
                    <TabsTrigger value="fo">F&O</TabsTrigger>
                    <TabsTrigger value="mutual-funds">Mutual Funds</TabsTrigger>
                    <TabsTrigger value="etfs">ETFs</TabsTrigger>
                    <TabsTrigger value="sip">SIP Tracker</TabsTrigger>
                  </TabsList>

                  {/* District Tokens Tab */}
                  <TabsContent value="district-tokens" className="space-y-3">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border text-xs text-muted-foreground">
                            <th className="text-left p-3">Token</th>
                            <th className="text-left p-3">District</th>
                            <th className="text-right p-3">Price</th>
                            <th className="text-right p-3">24h %</th>
                            <th className="text-right p-3">1M %</th>
                            <th className="text-right p-3">1Y %</th>
                            <th className="text-right p-3">Holdings</th>
                            <th className="text-right p-3">Value</th>
                            <th className="text-right p-3">P/L</th>
                            <th className="text-right p-3">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {districtTokens.map((token, idx) => (
                            <motion.tr
                              key={token.token}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.4 + idx * 0.05 }}
                              className="border-b border-border/50 hover:bg-yellow-500/5 transition-colors group"
                            >
                              <td className="p-3">
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="border-yellow-500/40 text-xs">
                                    {token.token}
                                  </Badge>
                                </div>
                              </td>
                              <td className="p-3">
                                <div className="flex items-center gap-2">
                                  <MapPin className="w-3 h-3 text-yellow-600 dark:text-yellow-400" />
                                  <span className="text-sm">{token.district}</span>
                                </div>
                              </td>
                              <td className="p-3 text-right text-sm">₹{token.price}</td>
                              <td className="p-3 text-right">
                                <span className={`text-sm ${token.change24h >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                  {token.change24h >= 0 ? '+' : ''}{token.change24h}%
                                </span>
                              </td>
                              <td className="p-3 text-right">
                                <span className={`text-sm ${token.change1m >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                  {token.change1m >= 0 ? '+' : ''}{token.change1m}%
                                </span>
                              </td>
                              <td className="p-3 text-right">
                                <span className={`text-sm ${token.change1y >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                  {token.change1y >= 0 ? '+' : ''}{token.change1y}%
                                </span>
                              </td>
                              <td className="p-3 text-right text-sm">{token.holdings}</td>
                              <td className="p-3 text-right text-sm">₹{token.value.toLocaleString()}</td>
                              <td className="p-3 text-right">
                                <div className="text-sm">
                                  <span className={token.pl >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                                    {token.pl >= 0 ? '+' : ''}₹{token.pl}
                                  </span>
                                  <span className="text-xs text-muted-foreground ml-1">
                                    ({token.pl >= 0 ? '+' : ''}{token.plPercent}%)
                                  </span>
                                </div>
                              </td>
                              <td className="p-3">
                                <div className="flex gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
                                    <Eye className="w-3 h-3" />
                                  </Button>
                                  <Button size="sm" className="h-7 px-2 text-xs bg-green-500 hover:bg-green-600 text-white">
                                    Buy
                                  </Button>
                                  <Button size="sm" variant="outline" className="h-7 px-2 text-xs text-red-600">
                                    Sell
                                  </Button>
                                </div>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>

                  {/* F&O Tab */}
                  <TabsContent value="fo" className="space-y-3">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border text-xs text-muted-foreground">
                            <th className="text-left p-3">State</th>
                            <th className="text-left p-3">Type</th>
                            <th className="text-left p-3">Position</th>
                            <th className="text-left p-3">Expiry</th>
                            <th className="text-right p-3">Qty</th>
                            <th className="text-right p-3">Entry</th>
                            <th className="text-right p-3">Current</th>
                            <th className="text-right p-3">P/L</th>
                            <th className="text-right p-3">Margin</th>
                            <th className="text-right p-3">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {foHoldings.map((holding, idx) => (
                            <motion.tr
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.4 + idx * 0.05 }}
                              className="border-b border-border/50 hover:bg-purple-500/5 transition-colors group"
                            >
                              <td className="p-3">
                                <div className="flex items-center gap-2">
                                  <Building2 className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                                  <span className="text-sm">{holding.state}</span>
                                </div>
                              </td>
                              <td className="p-3">
                                <Badge variant="outline" className="text-xs border-purple-500/40">
                                  {holding.type}
                                </Badge>
                              </td>
                              <td className="p-3">
                                <Badge className={`text-xs ${holding.position === 'Long' ? 'bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/40' : 'bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/40'}`}>
                                  {holding.position}
                                </Badge>
                              </td>
                              <td className="p-3">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs">{holding.expiry}</span>
                                  {holding.daysLeft <= 5 && (
                                    <Badge variant="outline" className="text-xs border-red-500/40 text-red-600 dark:text-red-400">
                                      {holding.daysLeft}d
                                    </Badge>
                                  )}
                                </div>
                              </td>
                              <td className="p-3 text-right text-sm">{holding.quantity}</td>
                              <td className="p-3 text-right text-sm">₹{holding.entryPrice}</td>
                              <td className="p-3 text-right text-sm">₹{holding.currentPrice}</td>
                              <td className="p-3 text-right">
                                <div className="text-sm">
                                  <span className={holding.pl >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                                    {holding.pl >= 0 ? '+' : ''}₹{holding.pl}
                                  </span>
                                  <span className="text-xs text-muted-foreground ml-1">
                                    ({holding.pl >= 0 ? '+' : ''}{holding.plPercent}%)
                                  </span>
                                </div>
                              </td>
                              <td className="p-3 text-right text-sm">₹{holding.margin.toLocaleString()}</td>
                              <td className="p-3">
                                <div className="flex gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Button size="sm" variant="outline" className="h-7 px-2 text-xs text-red-600">
                                    Close
                                  </Button>
                                  <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
                                    Extend
                                  </Button>
                                </div>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>

                  {/* Mutual Funds Tab */}
                  <TabsContent value="mutual-funds" className="space-y-3">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border text-xs text-muted-foreground">
                            <th className="text-left p-3">Fund Name</th>
                            <th className="text-right p-3">NAV</th>
                            <th className="text-right p-3">1Y Return</th>
                            <th className="text-left p-3">SIP Status</th>
                            <th className="text-left p-3">Risk</th>
                            <th className="text-right p-3">Value</th>
                            <th className="text-right p-3">P/L</th>
                            <th className="text-right p-3">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mutualFunds.map((fund, idx) => (
                            <motion.tr
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.4 + idx * 0.05 }}
                              className="border-b border-border/50 hover:bg-green-500/5 transition-colors group"
                            >
                              <td className="p-3">
                                <div className="flex items-center gap-2">
                                  <Sparkles className="w-3 h-3 text-green-600 dark:text-green-400" />
                                  <span className="text-sm">{fund.name}</span>
                                </div>
                              </td>
                              <td className="p-3 text-right text-sm">₹{fund.nav}</td>
                              <td className="p-3 text-right">
                                <span className="text-sm text-green-600 dark:text-green-400">+{fund.return1y}%</span>
                              </td>
                              <td className="p-3">
                                {fund.sipRunning ? (
                                  <Badge className="text-xs bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/40">
                                    Active
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="text-xs">
                                    Inactive
                                  </Badge>
                                )}
                              </td>
                              <td className="p-3">
                                <Badge className={`text-xs ${fund.risk === 'High' ? 'bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/40' : fund.risk === 'Medium' ? 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/40' : 'bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/40'}`}>
                                  {fund.risk}
                                </Badge>
                              </td>
                              <td className="p-3 text-right text-sm">₹{fund.value.toLocaleString()}</td>
                              <td className="p-3 text-right">
                                <div className="text-sm">
                                  <span className="text-green-600 dark:text-green-400">
                                    +₹{fund.pl.toLocaleString()}
                                  </span>
                                  <span className="text-xs text-muted-foreground ml-1">
                                    (+{fund.plPercent}%)
                                  </span>
                                </div>
                              </td>
                              <td className="p-3">
                                <div className="flex gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
                                    {fund.sipRunning ? 'Pause SIP' : 'Start SIP'}
                                  </Button>
                                  <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
                                    Add Lumpsum
                                  </Button>
                                </div>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>

                  {/* ETFs Tab */}
                  <TabsContent value="etfs" className="space-y-3">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border text-xs text-muted-foreground">
                            <th className="text-left p-3">ETF Name</th>
                            <th className="text-right p-3">NAV</th>
                            <th className="text-right p-3">Day %</th>
                            <th className="text-right p-3">1Y Return</th>
                            <th className="text-right p-3">Holdings</th>
                            <th className="text-left p-3">Expiry</th>
                            <th className="text-right p-3">Value</th>
                            <th className="text-right p-3">P/L</th>
                            <th className="text-right p-3">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {etfHoldings.map((etf, idx) => (
                            <motion.tr
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.4 + idx * 0.05 }}
                              className="border-b border-border/50 hover:bg-blue-500/5 transition-colors group"
                            >
                              <td className="p-3">
                                <div className="flex items-center gap-2">
                                  <Building2 className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                                  <span className="text-sm">{etf.name}</span>
                                </div>
                              </td>
                              <td className="p-3 text-right text-sm">₹{etf.nav}</td>
                              <td className="p-3 text-right">
                                <span className={`text-sm ${etf.dayChange >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                  {etf.dayChange >= 0 ? '+' : ''}{etf.dayChange}%
                                </span>
                              </td>
                              <td className="p-3 text-right">
                                <span className="text-sm text-green-600 dark:text-green-400">+{etf.return1y}%</span>
                              </td>
                              <td className="p-3 text-right text-sm">{etf.holdings}</td>
                              <td className="p-3">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs">{etf.expiry}</span>
                                  {etf.daysLeft <= 7 && (
                                    <Badge variant="outline" className="text-xs border-orange-500/40 text-orange-600 dark:text-orange-400">
                                      {etf.daysLeft}d
                                    </Badge>
                                  )}
                                </div>
                              </td>
                              <td className="p-3 text-right text-sm">₹{etf.value.toLocaleString()}</td>
                              <td className="p-3 text-right">
                                <div className="text-sm">
                                  <span className="text-green-600 dark:text-green-400">
                                    +₹{etf.pl.toLocaleString()}
                                  </span>
                                  <span className="text-xs text-muted-foreground ml-1">
                                    (+{etf.plPercent}%)
                                  </span>
                                </div>
                              </td>
                              <td className="p-3">
                                <div className="flex gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
                                    Details
                                  </Button>
                                </div>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>

                  {/* SIP Tracker Tab */}
                  <TabsContent value="sip" className="space-y-3">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border text-xs text-muted-foreground">
                            <th className="text-left p-3">SIP Name</th>
                            <th className="text-right p-3">Amount</th>
                            <th className="text-left p-3">Frequency</th>
                            <th className="text-left p-3">Next Due</th>
                            <th className="text-left p-3">Duration</th>
                            <th className="text-right p-3">Total Invested</th>
                            <th className="text-right p-3">Projected Value</th>
                            <th className="text-right p-3">Growth</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sipData.map((sip, idx) => (
                            <motion.tr
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.4 + idx * 0.05 }}
                              className="border-b border-border/50 hover:bg-yellow-500/5 transition-colors"
                            >
                              <td className="p-3">
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-3 h-3 text-yellow-600 dark:text-yellow-400" />
                                  <span className="text-sm">{sip.name}</span>
                                </div>
                              </td>
                              <td className="p-3 text-right text-sm">₹{sip.amount.toLocaleString()}</td>
                              <td className="p-3">
                                <Badge variant="outline" className="text-xs border-yellow-500/40">
                                  {sip.frequency}
                                </Badge>
                              </td>
                              <td className="p-3 text-xs">{sip.nextDue}</td>
                              <td className="p-3 text-xs">{sip.duration}</td>
                              <td className="p-3 text-right text-sm">₹{sip.invested.toLocaleString()}</td>
                              <td className="p-3 text-right text-sm">₹{sip.projected.toLocaleString()}</td>
                              <td className="p-3 text-right">
                                <span className="text-sm text-green-600 dark:text-green-400">+{sip.growth}%</span>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </Card>
          </motion.div>

        </div>

        {/* Right Column - AI Insights & Activity */}
        <div className="space-y-6">
          
          {/* AI Insights Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-2 border-purple-500/30 bg-gradient-to-br from-card/90 via-purple-50/5 dark:via-purple-950/10 to-card backdrop-blur-xl shadow-xl">
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
                      <Brain className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg">AI Portfolio Advisor</h3>
                      <p className="text-xs text-muted-foreground">Smart Insights</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  {aiInsights.map((insight, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + idx * 0.1 }}
                      className={`p-3 rounded-xl border ${
                        insight.type === 'success' ? 'bg-green-500/10 border-green-500/30' :
                        insight.type === 'warning' ? 'bg-yellow-500/10 border-yellow-500/30' :
                        insight.type === 'alert' ? 'bg-red-500/10 border-red-500/30' :
                        'bg-blue-500/10 border-blue-500/30'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {insight.type === 'success' ? (
                          <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                        ) : insight.type === 'warning' ? (
                          <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                        ) : insight.type === 'alert' ? (
                          <TrendingDown className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                        ) : (
                          <Lightbulb className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                        )}
                        <p className="text-xs leading-relaxed">{insight.text}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Auto Optimize Portfolio</span>
                    <Switch checked={autoOptimize} onCheckedChange={setAutoOptimize} />
                  </div>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white">
                        <Sparkles className="w-4 h-4 mr-2" />
                        Get Rebalancing Suggestion
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <Brain className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                          AI Rebalancing Recommendation
                        </DialogTitle>
                        <DialogDescription>
                          Based on your risk profile and market conditions
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30">
                          <p className="text-sm mb-2">✓ Increase District Token allocation by 5%</p>
                          <p className="text-xs text-muted-foreground">Strong GDP growth in tech hubs expected</p>
                        </div>
                        <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30">
                          <p className="text-sm mb-2">⚠ Reduce F&O exposure by 3%</p>
                          <p className="text-xs text-muted-foreground">High volatility expected in short term</p>
                        </div>
                        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
                          <p className="text-sm mb-2">ℹ Add more State ETFs for diversification</p>
                          <p className="text-xs text-muted-foreground">Balance risk across sectors</p>
                        </div>
                        <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white">
                          Apply Recommendations
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* AI Forecast */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-2 border-yellow-500/30 bg-gradient-to-br from-card/90 via-yellow-50/5 dark:via-yellow-950/10 to-card backdrop-blur-xl shadow-xl">
              <div className="p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center shadow-lg">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg">AI Forecast</h3>
                    <p className="text-xs text-muted-foreground">Projected Growth</p>
                  </div>
                </div>

                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={projectionData}>
                      <defs>
                        <linearGradient id="colorConservative" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorModerate" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#FFD54F" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#FFD54F" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorAggressive" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.1} />
                      <XAxis dataKey="month" stroke="#888" style={{ fontSize: '10px' }} />
                      <YAxis stroke="#888" style={{ fontSize: '10px' }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area type="monotone" dataKey="conservative" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorConservative)" />
                      <Area type="monotone" dataKey="moderate" stroke="#FFD54F" strokeWidth={2} fillOpacity={1} fill="url(#colorModerate)" />
                      <Area type="monotone" dataKey="aggressive" stroke="#8B5CF6" strokeWidth={2} fillOpacity={1} fill="url(#colorAggressive)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-4">
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-xs text-muted-foreground">Conservative</span>
                    </div>
                    <p className="text-xs text-green-600 dark:text-green-400">+7.6%</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      <span className="text-xs text-muted-foreground">Moderate</span>
                    </div>
                    <p className="text-xs text-yellow-600 dark:text-yellow-400">+16.5%</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                      <span className="text-xs text-muted-foreground">Aggressive</span>
                    </div>
                    <p className="text-xs text-purple-600 dark:text-purple-400">+26.9%</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Recent Activity Feed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-2 border-yellow-500/30 bg-gradient-to-br from-card/90 via-yellow-50/5 dark:via-yellow-950/10 to-card backdrop-blur-xl shadow-xl">
              <div className="p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-lg">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg">Recent Activity</h3>
                </div>

                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {recentActivity.map((activity, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + idx * 0.05 }}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-background/50 transition-colors"
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        activity.type === 'buy' ? 'bg-green-500/20' :
                        activity.type === 'sell' ? 'bg-red-500/20' :
                        activity.type === 'sip' ? 'bg-blue-500/20' :
                        'bg-purple-500/20'
                      }`}>
                        {activity.type === 'buy' ? (
                          <ArrowUpRight className="w-4 h-4 text-green-600 dark:text-green-400" />
                        ) : activity.type === 'sell' ? (
                          <ArrowDownRight className="w-4 h-4 text-red-600 dark:text-red-400" />
                        ) : activity.type === 'sip' ? (
                          <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        ) : (
                          <DollarSign className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs leading-relaxed mb-1">{activity.action}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {activity.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{activity.time}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>

        </div>
      </div>

    </div>
  );
}
