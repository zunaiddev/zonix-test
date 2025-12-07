import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Slider } from './ui/slider';
import { Input } from './ui/input';
import { Switch } from './ui/switch';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Star,
  Sparkles,
  Building2,
  User,
  Calendar,
  DollarSign,
  Target,
  Shield,
  BarChart3,
  PieChart as PieChartIcon,
  Download,
  Share2,
  Bell,
  Plus,
  Minus,
  Wallet,
  Activity,
  Award,
  Zap,
  Brain,
  FileText,
  Clock,
  AlertCircle,
  CheckCircle,
  ExternalLink,
  Info,
  LineChart,
  Layers,
} from 'lucide-react';
import {
  LineChart as RechartsLineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';

interface MutualFund {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  nav: number;
  change: number;
  aum: number;
  returns: { '1d': number; '1m': number; '6m': number; '1y': number; '3y': number; '5y': number };
  risk: string;
  expenseRatio: number;
  launchDate: string;
  minInvestment: number;
  rating: number;
  manager: {
    name: string;
    experience: string;
    funds: number;
  };
  holdings: { type: string; percent: number }[];
  topHoldings: { name: string; allocation: number; returns: number }[];
  sectorAllocation: { sector: string; percent: number }[];
}

interface MutualFundDetailPageProps {
  fund: MutualFund;
  onBack: () => void;
}

// Generate mock NAV history data
const generateNAVHistory = (currentNav: number, period: string) => {
  const dataPoints = period === '1M' ? 30 : period === '6M' ? 180 : period === '1Y' ? 365 : period === '3Y' ? 36 : 60;
  const data = [];
  const volatility = period === '1M' ? 0.02 : period === '6M' ? 0.05 : 0.08;
  
  let value = currentNav * 0.85; // Start lower
  for (let i = 0; i < dataPoints; i++) {
    const change = (Math.random() - 0.45) * value * volatility;
    value = value + change;
    data.push({
      date: period === '1M' || period === '6M' || period === '1Y' 
        ? `Day ${i + 1}` 
        : `M${i + 1}`,
      nav: parseFloat(value.toFixed(2)),
    });
  }
  
  // Ensure we end at current NAV
  data[data.length - 1].nav = currentNav;
  
  return data;
};

// Generate yearly returns data
const generateYearlyReturns = () => {
  return [
    { year: '2046', return: 28.5 },
    { year: '2047', return: 35.2 },
    { year: '2048', return: 18.7 },
    { year: '2049', return: 42.3 },
    { year: '2050', return: 24.8 },
  ];
};

// Generate risk metrics
const generateRiskMetrics = (risk: string) => {
  const baseValues = risk === 'High' ? [75, 85, 90, 70, 80] : risk === 'Moderate' ? [60, 65, 70, 65, 68] : [40, 45, 50, 45, 48];
  return [
    { metric: 'Sharpe Ratio', value: baseValues[0] },
    { metric: 'Sortino Ratio', value: baseValues[1] },
    { metric: 'Alpha', value: baseValues[2] },
    { metric: 'Beta', value: baseValues[3] },
    { metric: 'Information Ratio', value: baseValues[4] },
  ];
};

export default function MutualFundDetailPage({ fund, onBack }: MutualFundDetailPageProps) {
  const [activeChart, setActiveChart] = useState<'1M' | '6M' | '1Y' | '3Y' | '5Y'>('1Y');
  const [showBenchmark, setShowBenchmark] = useState(false);
  const [sipAmount, setSipAmount] = useState([5000]);
  const [sipDuration, setSipDuration] = useState([10]);
  const [lumpAmount, setLumpAmount] = useState([50000]);
  const [lumpDuration, setLumpDuration] = useState([5]);
  const [investmentType, setInvestmentType] = useState<'sip' | 'lumpsum'>('sip');

  const COLORS = ['#FBBF24', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899'];
  
  const navHistory = generateNAVHistory(fund.nav, activeChart);
  const yearlyReturns = generateYearlyReturns();
  const riskMetrics = generateRiskMetrics(fund.risk);

  // Calculate SIP projection
  const calculateSIP = () => {
    const expectedReturn = fund.returns['1y'] / 100;
    const monthlyRate = expectedReturn / 12;
    const months = sipDuration[0] * 12;
    const futureValue =
      sipAmount[0] * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
    const invested = sipAmount[0] * months;
    return {
      invested,
      returns: futureValue - invested,
      total: futureValue,
    };
  };

  // Calculate Lumpsum projection
  const calculateLumpsum = () => {
    const expectedReturn = fund.returns['1y'] / 100;
    const years = lumpDuration[0];
    const futureValue = lumpAmount[0] * Math.pow(1 + expectedReturn, years);
    return {
      invested: lumpAmount[0],
      returns: futureValue - lumpAmount[0],
      total: futureValue,
    };
  };

  const sipProjection = calculateSIP();
  const lumpsumProjection = calculateLumpsum();
  const currentProjection = investmentType === 'sip' ? sipProjection : lumpsumProjection;

  // AI Insights tags
  const aiTags = [
    { label: fund.returns['1y'] > 25 ? 'High Growth' : 'Stable Performer', icon: TrendingUp, color: 'green' },
    { label: fund.risk === 'Low' ? 'Low Volatility' : fund.risk === 'Moderate' ? 'Balanced Risk' : 'High Risk High Return', icon: Activity, color: 'yellow' },
    { label: 'Diversified Portfolio', icon: Layers, color: 'blue' },
  ];

  // AI Score calculation
  const aiScore = Math.min(100, Math.round(
    (fund.rating / 5) * 30 +
    (fund.returns['1y'] / 50) * 40 +
    (fund.risk === 'Low' ? 30 : fund.risk === 'Moderate' ? 20 : 10)
  ));

  // Benchmark data (mock)
  const benchmarkHistory = navHistory.map((point, idx) => ({
    ...point,
    benchmark: fund.nav * 0.95 + (idx * 0.02),
  }));

  // Transaction history mock
  const transactionHistory = [
    { date: '2050-10-15', type: 'SIP', amount: 5000, units: 31.95, nav: 156.45, status: 'Completed' },
    { date: '2050-09-15', type: 'SIP', amount: 5000, units: 32.26, nav: 155.02, status: 'Completed' },
    { date: '2050-08-15', type: 'Lumpsum', amount: 50000, units: 326.80, nav: 153.03, status: 'Completed' },
    { date: '2050-07-15', type: 'SIP', amount: 5000, units: 32.89, nav: 152.02, status: 'Completed' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-amber-50/20 dark:to-amber-950/10 relative overflow-hidden">
      {/* Ambient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-amber-500/5 dark:bg-amber-500/3 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-yellow-500/5 dark:bg-yellow-500/3 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-card/80 border-b border-border shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={onBack}
                className="rounded-full border-2 border-yellow-500/30 hover:bg-yellow-500/10 hover:border-yellow-500/50 transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 flex items-center justify-center shadow-lg shadow-yellow-500/50">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{fund.name}</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="border-yellow-500/40 text-yellow-600 dark:text-yellow-400">
                      {fund.category}
                    </Badge>
                    <Badge variant="outline" className="border-amber-500/40 text-amber-600 dark:text-amber-400">
                      {fund.subcategory}
                    </Badge>
                    <div className="flex items-center gap-1 ml-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(fund.rating)
                              ? 'fill-yellow-500 text-yellow-500'
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                        />
                      ))}
                      <span className="text-sm text-muted-foreground ml-1">{fund.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Current NAV</div>
              <div className="text-4xl font-bold bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent">
                ₹{fund.nav.toFixed(2)}
              </div>
              <Badge
                className={`${
                  fund.change >= 0
                    ? 'bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/40'
                    : 'bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/40'
                } border mt-2`}
              >
                {fund.change >= 0 ? '+' : ''}
                {fund.change}% Today
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Fund Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-2 border-yellow-500/30 bg-gradient-to-br from-card via-yellow-50/5 dark:via-yellow-950/10 to-card backdrop-blur-xl overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent">
                      Fund Overview
                    </h2>
                    <Badge
                      className={`${
                        fund.risk === 'High'
                          ? 'bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/40'
                          : fund.risk === 'Moderate'
                          ? 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/40'
                          : 'bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/40'
                      } border px-4 py-1`}
                    >
                      <Shield className="w-4 h-4 mr-1" />
                      {fund.risk} Risk
                    </Badge>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Left Side - Fund Info */}
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50">
                        <Building2 className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                        <div>
                          <div className="text-sm text-muted-foreground">AMC (Asset Management)</div>
                          <div className="font-semibold">Zonix Asset Management Co.</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50">
                        <User className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                        <div>
                          <div className="text-sm text-muted-foreground">Fund Manager</div>
                          <div className="font-semibold">{fund.manager.name}</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {fund.manager.experience} • Managing {fund.manager.funds} funds
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50">
                        <Calendar className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                        <div>
                          <div className="text-sm text-muted-foreground">Launch Date</div>
                          <div className="font-semibold">
                            {new Date(fund.launchDate).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Side - Key Metrics */}
                    <div className="space-y-3">
                      <Card className="p-4 border-2 border-yellow-500/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">AUM</span>
                          <DollarSign className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                        </div>
                        <div className="text-2xl font-bold">₹{(fund.aum / 10).toFixed(0)} Cr</div>
                        <div className="text-xs text-muted-foreground mt-1">Assets Under Management</div>
                      </Card>

                      <Card className="p-4 border-2 border-amber-500/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Expense Ratio</span>
                          <Target className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                        </div>
                        <div className="text-2xl font-bold">{fund.expenseRatio}%</div>
                        <div className="text-xs text-muted-foreground mt-1">Annual fee charged</div>
                      </Card>

                      <Card className="p-4 border-2 border-green-500/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Min Investment</span>
                          <Wallet className="w-4 h-4 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="text-2xl font-bold">₹{fund.minInvestment.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground mt-1">Minimum amount</div>
                      </Card>
                    </div>
                  </div>

                  {/* Returns Timeline */}
                  <div className="mt-6 pt-6 border-t border-border">
                    <div className="text-sm font-semibold mb-3">Performance Returns</div>
                    <div className="grid grid-cols-6 gap-3">
                      {Object.entries(fund.returns).map(([period, value]) => (
                        <div
                          key={period}
                          className="text-center p-3 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30"
                        >
                          <div className="text-xs text-muted-foreground mb-1.5">
                            {period.toUpperCase()}
                          </div>
                          <div className="text-sm font-bold text-green-600 dark:text-green-400">
                            +{value}%
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Benchmark Info */}
                  <div className="mt-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart3 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm font-semibold">Benchmark Index</span>
                    </div>
                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      ZONIX Bharat 100 Index
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Performance Analytics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-2 border-yellow-500/30 bg-gradient-to-br from-card via-yellow-50/5 dark:via-yellow-950/10 to-card backdrop-blur-xl overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent">
                      Performance Analytics
                    </h2>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Compare with Benchmark</span>
                      <Switch checked={showBenchmark} onCheckedChange={setShowBenchmark} />
                    </div>
                  </div>

                  {/* Time Period Selector */}
                  <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
                    {(['1M', '6M', '1Y', '3Y', '5Y'] as const).map((period) => (
                      <Button
                        key={period}
                        variant={activeChart === period ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setActiveChart(period)}
                        className={
                          activeChart === period
                            ? 'bg-gradient-to-r from-yellow-500 to-amber-600 text-white shadow-lg'
                            : 'border-yellow-500/30 hover:bg-yellow-500/10'
                        }
                      >
                        {period}
                      </Button>
                    ))}
                  </div>

                  {/* NAV Chart */}
                  <div className="h-80 mb-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={showBenchmark ? benchmarkHistory : navHistory}>
                        <defs>
                          <linearGradient id="navGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#FBBF24" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#FBBF24" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="benchmarkGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                        <XAxis
                          dataKey="date"
                          stroke="#9CA3AF"
                          tick={{ fontSize: 12 }}
                          tickLine={false}
                        />
                        <YAxis stroke="#9CA3AF" tick={{ fontSize: 12 }} tickLine={false} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#1F2937',
                            border: '1px solid #FBBF24',
                            borderRadius: '8px',
                          }}
                        />
                        {showBenchmark && <Legend />}
                        <Area
                          type="monotone"
                          dataKey="nav"
                          stroke="#FBBF24"
                          strokeWidth={3}
                          fill="url(#navGradient)"
                          name="Fund NAV"
                        />
                        {showBenchmark && (
                          <Area
                            type="monotone"
                            dataKey="benchmark"
                            stroke="#3B82F6"
                            strokeWidth={2}
                            strokeDasharray="5 5"
                            fill="url(#benchmarkGradient)"
                            name="Benchmark"
                          />
                        )}
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Yearly Returns Chart */}
                  <div>
                    <h3 className="font-semibold mb-4">Yearly Returns</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={yearlyReturns}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                          <XAxis dataKey="year" stroke="#9CA3AF" tick={{ fontSize: 12 }} />
                          <YAxis stroke="#9CA3AF" tick={{ fontSize: 12 }} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: '#1F2937',
                              border: '1px solid #10B981',
                              borderRadius: '8px',
                            }}
                          />
                          <Bar dataKey="return" fill="#10B981" radius={[8, 8, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Risk Ratios */}
                  <div className="mt-6 pt-6 border-t border-border">
                    <h3 className="font-semibold mb-4">Risk-Adjusted Returns</h3>
                    <div className="grid md:grid-cols-5 gap-4">
                      <Card className="p-4 border border-yellow-500/30">
                        <div className="text-xs text-muted-foreground mb-1">Sharpe Ratio</div>
                        <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">1.45</div>
                      </Card>
                      <Card className="p-4 border border-amber-500/30">
                        <div className="text-xs text-muted-foreground mb-1">Sortino Ratio</div>
                        <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">1.82</div>
                      </Card>
                      <Card className="p-4 border border-green-500/30">
                        <div className="text-xs text-muted-foreground mb-1">Beta</div>
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">0.95</div>
                      </Card>
                      <Card className="p-4 border border-blue-500/30">
                        <div className="text-xs text-muted-foreground mb-1">Alpha</div>
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">2.3%</div>
                      </Card>
                      <Card className="p-4 border border-purple-500/30">
                        <div className="text-xs text-muted-foreground mb-1">CAGR</div>
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                          {fund.returns['3y'] > 0 ? (Math.pow(1 + fund.returns['3y'] / 100, 1/3) - 1) * 100 : 0}%
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Portfolio Holdings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border-2 border-yellow-500/30 bg-gradient-to-br from-card via-yellow-50/5 dark:via-yellow-950/10 to-card backdrop-blur-xl overflow-hidden">
                <div className="p-6">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent mb-6">
                    Portfolio Holdings
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Holdings Composition Pie Chart */}
                    <div>
                      <h3 className="font-semibold mb-4">Asset Allocation</h3>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={fund.holdings}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ type, percent }) => `${type}: ${percent.toFixed(0)}%`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="percent"
                            >
                              {fund.holdings.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Sector Allocation Pie Chart */}
                    <div>
                      <h3 className="font-semibold mb-4">Sector Distribution</h3>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={fund.sectorAllocation}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ sector, percent }) => `${sector}: ${percent}%`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="percent"
                            >
                              {fund.sectorAllocation.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>

                  {/* Top Holdings Table */}
                  <div className="mt-6 pt-6 border-t border-border">
                    <h3 className="font-semibold mb-4">Top 10 Holdings</h3>
                    <div className="space-y-2">
                      {fund.topHoldings.map((holding, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted/80 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center text-white text-sm font-bold">
                              {index + 1}
                            </div>
                            <div>
                              <div className="font-semibold">{holding.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {holding.allocation.toFixed(1)}% allocation
                              </div>
                            </div>
                          </div>
                          <Badge className="bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/40 border">
                            +{holding.returns}%
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* AI Insights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="border-2 border-purple-500/30 bg-gradient-to-br from-card via-purple-50/5 dark:via-purple-950/10 to-card backdrop-blur-xl overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                      AI-Powered Insights
                    </h2>
                  </div>

                  {/* AI Score */}
                  <div className="mb-6 p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Zonix AI Fund Score</div>
                        <div className="text-5xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                          {aiScore}/100
                        </div>
                      </div>
                      <div className="w-24 h-24 rounded-full border-8 border-purple-500/30 flex items-center justify-center">
                        <Award className="w-12 h-12 text-purple-600 dark:text-purple-400" />
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      This fund shows strong consistency with lower volatility over 3 years. AI predicts
                      continued stable growth with moderate risk.
                    </div>
                  </div>

                  {/* Smart Tags */}
                  <div className="mb-6">
                    <div className="text-sm font-semibold mb-3">Smart Analysis</div>
                    <div className="flex flex-wrap gap-3">
                      {aiTags.map((tag, index) => {
                        const Icon = tag.icon;
                        return (
                          <Badge
                            key={index}
                            className={`${
                              tag.color === 'green'
                                ? 'bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/40'
                                : tag.color === 'yellow'
                                ? 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/40'
                                : 'bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/40'
                            } border px-4 py-2 text-sm`}
                          >
                            <Icon className="w-4 h-4 mr-2" />
                            {tag.label}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>

                  {/* AI Recommendations */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mb-2" />
                      <div className="text-sm font-semibold mb-1">Best for Long Term</div>
                      <div className="text-xs text-muted-foreground">
                        Ideal for 5+ year investment horizon
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30">
                      <Zap className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mb-2" />
                      <div className="text-sm font-semibold mb-1">Strong Momentum</div>
                      <div className="text-xs text-muted-foreground">
                        Positive trend in last 6 months
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
                      <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-2" />
                      <div className="text-sm font-semibold mb-1">Risk Balanced</div>
                      <div className="text-xs text-muted-foreground">
                        Well-diversified portfolio
                      </div>
                    </div>
                  </div>

                  {/* Predictive Chart */}
                  <div className="mt-6 pt-6 border-t border-border">
                    <h3 className="font-semibold mb-4">AI Growth Prediction (Next 12 Months)</h3>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={riskMetrics}>
                          <PolarGrid stroke="#9CA3AF" />
                          <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12 }} />
                          <PolarRadiusAxis angle={90} domain={[0, 100]} />
                          <Radar
                            name="Fund Strength"
                            dataKey="value"
                            stroke="#8B5CF6"
                            fill="#8B5CF6"
                            fillOpacity={0.6}
                          />
                          <Tooltip />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Document Center */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="border-2 border-yellow-500/30 bg-gradient-to-br from-card via-yellow-50/5 dark:via-yellow-950/10 to-card backdrop-blur-xl overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <FileText className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent">
                      Document Center
                    </h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { name: 'Fact Sheet', icon: FileText, size: '2.4 MB', date: 'Oct 2050' },
                      { name: 'Monthly Report', icon: BarChart3, size: '1.8 MB', date: 'Oct 2050' },
                      { name: 'Scheme Document', icon: FileText, size: '5.2 MB', date: 'Jan 2046' },
                      { name: 'Riskometer Disclosure', icon: AlertCircle, size: '850 KB', date: 'Sep 2050' },
                    ].map((doc, index) => {
                      const Icon = doc.icon;
                      return (
                        <Button
                          key={index}
                          variant="outline"
                          className="h-auto p-4 border-2 border-yellow-500/30 hover:bg-yellow-500/10 hover:border-yellow-500/50 transition-all justify-start"
                        >
                          <div className="flex items-center gap-3 w-full">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center">
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1 text-left">
                              <div className="font-semibold">{doc.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {doc.size} • {doc.date}
                              </div>
                            </div>
                            <Download className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                          </div>
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Transaction History */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="border-2 border-yellow-500/30 bg-gradient-to-br from-card via-yellow-50/5 dark:via-yellow-950/10 to-card backdrop-blur-xl overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent">
                        Your Transaction History
                      </h2>
                    </div>
                    <Badge className="bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/40 border">
                      Total Invested: ₹65,000
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    {transactionHistory.map((txn, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted/80 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              txn.type === 'SIP'
                                ? 'bg-gradient-to-br from-green-500 to-emerald-600'
                                : 'bg-gradient-to-br from-yellow-500 to-amber-600'
                            }`}
                          >
                            {txn.type === 'SIP' ? (
                              <Activity className="w-5 h-5 text-white" />
                            ) : (
                              <Wallet className="w-5 h-5 text-white" />
                            )}
                          </div>
                          <div>
                            <div className="font-semibold">{txn.type}</div>
                            <div className="text-sm text-muted-foreground">
                              {new Date(txn.date).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">₹{txn.amount.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">
                            {txn.units.toFixed(2)} units @ ₹{txn.nav.toFixed(2)}
                          </div>
                        </div>
                        <Badge className="bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/40 border">
                          {txn.status}
                        </Badge>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 p-4 rounded-xl bg-green-500/10 border border-green-500/30">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-muted-foreground">Total Returns</div>
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                          +₹8,245 (12.7%)
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Current Value</div>
                        <div className="text-2xl font-bold">₹73,245</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Investment Planner & Actions */}
          <div className="lg:col-span-1 space-y-8">
            {/* Investment Planner */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="sticky top-24"
            >
              <Card className="border-2 border-yellow-500/30 bg-gradient-to-br from-card via-yellow-50/5 dark:via-yellow-950/10 to-card backdrop-blur-xl overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Target className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                    <h2 className="text-xl font-bold">Investment Planner</h2>
                  </div>

                  {/* SIP / Lumpsum Toggle */}
                  <Tabs value={investmentType} onValueChange={(v) => setInvestmentType(v as any)} className="w-full mb-6">
                    <TabsList className="grid w-full grid-cols-2 bg-muted/50">
                      <TabsTrigger
                        value="sip"
                        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white"
                      >
                        SIP
                      </TabsTrigger>
                      <TabsTrigger
                        value="lumpsum"
                        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-amber-600 data-[state=active]:text-white"
                      >
                        Lumpsum
                      </TabsTrigger>
                    </TabsList>

                    {/* SIP Calculator */}
                    <TabsContent value="sip" className="mt-6 space-y-6">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <label className="text-sm font-semibold">Monthly Investment</label>
                          <span className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
                            ₹{sipAmount[0].toLocaleString()}
                          </span>
                        </div>
                        <Slider
                          value={sipAmount}
                          onValueChange={setSipAmount}
                          min={500}
                          max={100000}
                          step={500}
                          className="mb-2"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>₹500</span>
                          <span>₹1,00,000</span>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <label className="text-sm font-semibold">Time Period</label>
                          <span className="text-lg font-bold text-amber-600 dark:text-amber-400">
                            {sipDuration[0]} Years
                          </span>
                        </div>
                        <Slider
                          value={sipDuration}
                          onValueChange={setSipDuration}
                          min={1}
                          max={30}
                          step={1}
                          className="mb-2"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>1 Year</span>
                          <span>30 Years</span>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-muted/50">
                        <div className="text-xs text-muted-foreground mb-1">Expected Return Rate</div>
                        <div className="text-xl font-bold text-green-600 dark:text-green-400">
                          {fund.returns['1y']}% p.a.
                        </div>
                      </div>
                    </TabsContent>

                    {/* Lumpsum Calculator */}
                    <TabsContent value="lumpsum" className="mt-6 space-y-6">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <label className="text-sm font-semibold">Investment Amount</label>
                          <span className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
                            ₹{lumpAmount[0].toLocaleString()}
                          </span>
                        </div>
                        <Slider
                          value={lumpAmount}
                          onValueChange={setLumpAmount}
                          min={fund.minInvestment}
                          max={1000000}
                          step={1000}
                          className="mb-2"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>₹{fund.minInvestment.toLocaleString()}</span>
                          <span>₹10,00,000</span>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <label className="text-sm font-semibold">Time Period</label>
                          <span className="text-lg font-bold text-amber-600 dark:text-amber-400">
                            {lumpDuration[0]} Years
                          </span>
                        </div>
                        <Slider
                          value={lumpDuration}
                          onValueChange={setLumpDuration}
                          min={1}
                          max={30}
                          step={1}
                          className="mb-2"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>1 Year</span>
                          <span>30 Years</span>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-muted/50">
                        <div className="text-xs text-muted-foreground mb-1">Expected Return Rate</div>
                        <div className="text-xl font-bold text-green-600 dark:text-green-400">
                          {fund.returns['1y']}% p.a.
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>

                  {/* Projection Results */}
                  <div className="space-y-3 p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30">
                    <div className="flex items-center justify-between pb-3 border-b border-border">
                      <span className="text-sm text-muted-foreground">Total Invested</span>
                      <span className="font-bold">₹{currentProjection.invested.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                    </div>
                    <div className="flex items-center justify-between pb-3 border-b border-border">
                      <span className="text-sm text-muted-foreground">Estimated Returns</span>
                      <span className="font-bold text-green-600 dark:text-green-400">
                        ₹{currentProjection.returns.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <span className="font-semibold">Future Value</span>
                      <span className="text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                        ₹{currentProjection.total.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3 mt-6">
                    <Button className="w-full h-12 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg shadow-green-500/30">
                      <Plus className="w-5 h-5 mr-2" />
                      {investmentType === 'sip' ? 'Start SIP' : 'Invest Now'}
                    </Button>
                    <Button className="w-full h-12 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white shadow-lg shadow-yellow-500/30">
                      <Wallet className="w-5 h-5 mr-2" />
                      Add to Portfolio
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Alerts & Notifications */}
              <Card className="border-2 border-blue-500/30 bg-gradient-to-br from-card via-blue-50/5 dark:via-blue-950/10 to-card backdrop-blur-xl overflow-hidden mt-6">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Bell className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    <h2 className="text-xl font-bold">Set Alerts</h2>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-sm">NAV Alert</div>
                        <div className="text-xs text-muted-foreground">Notify when NAV changes by 3%</div>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-sm">SIP Reminder</div>
                        <div className="text-xs text-muted-foreground">SIP due date approaching</div>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-sm">Fund Updates</div>
                        <div className="text-xs text-muted-foreground">Manager or rating changes</div>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="border-2 border-yellow-500/30 bg-gradient-to-br from-card via-yellow-50/5 dark:via-yellow-950/10 to-card backdrop-blur-xl overflow-hidden mt-6">
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start border-yellow-500/30 hover:bg-yellow-500/10">
                      <Minus className="w-4 h-4 mr-2" />
                      Redeem Units
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-blue-500/30 hover:bg-blue-500/10">
                      <Star className="w-4 h-4 mr-2" />
                      Add to Watchlist
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-green-500/30 hover:bg-green-500/10">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Fund
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-purple-500/30 hover:bg-purple-500/10">
                      <Download className="w-4 h-4 mr-2" />
                      Export PDF Report
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Investor Sentiment */}
              <Card className="border-2 border-purple-500/30 bg-gradient-to-br from-card via-purple-50/5 dark:via-purple-950/10 to-card backdrop-blur-xl overflow-hidden mt-6">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Activity className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    <h2 className="text-xl font-bold">Investor Sentiment</h2>
                  </div>
                  
                  <div className="text-center mb-4">
                    <div className="text-5xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
                      84%
                    </div>
                    <div className="text-sm text-muted-foreground">Positive Sentiment</div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-green-600 dark:text-green-400">● Bullish</span>
                      <span className="font-semibold">64%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-yellow-600 dark:text-yellow-400">● Neutral</span>
                      <span className="font-semibold">20%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-red-600 dark:text-red-400">● Bearish</span>
                      <span className="font-semibold">16%</span>
                    </div>
                  </div>

                  <div className="mt-4 p-3 rounded-lg bg-purple-500/10 border border-purple-500/30">
                    <div className="text-xs text-muted-foreground">
                      Based on 12,456 Zonix investors tracking this fund
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
