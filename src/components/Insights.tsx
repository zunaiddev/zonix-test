import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Slider } from './ui/slider';
import {
  Brain,
  TrendingUp,
  TrendingDown,
  Lightbulb,
  Target,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Activity,
  Zap,
  Award,
  Globe,
  MessageSquare,
  Download,
  FileDown,
  MapPin,
  Building2,
  Flame,
  Eye,
  TrendingUpDown,
  Calendar,
  Users,
  Factory,
  Wifi,
  Briefcase,
  Cpu,
  Send,
  Volume2,
  Search,
  Filter,
  ChevronRight,
  Star,
  ShieldAlert,
  LineChart,
  Rocket,
  Shield,
  Percent,
  DollarSign,
  TrendingDownIcon,
  PieChart,
  Signal,
  Database,
  RefreshCw,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  LineChart as ReLineChart,
  Line,
  ComposedChart,
  PieChart as RePieChart,
  Pie,
} from 'recharts';

export function Insights() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('3M');
  const [marketSentiment, setMarketSentiment] = useState(72);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [timelineYear, setTimelineYear] = useState([2025]);

  // Enhanced Forecast Data
  const forecastData = {
    '1M': [
      { month: 'Nov', gdp: 410, tokenCap: 16100, confidence: 92, volume: 2850 },
      { month: 'Dec', gdp: 415, tokenCap: 16800, confidence: 88, volume: 3120 },
    ],
    '3M': [
      { month: 'Nov', gdp: 410, tokenCap: 16100, confidence: 92, volume: 2850 },
      { month: 'Dec', gdp: 415, tokenCap: 16800, confidence: 88, volume: 3120 },
      { month: 'Jan', gdp: 422, tokenCap: 17500, confidence: 85, volume: 3350 },
      { month: 'Feb', gdp: 428, tokenCap: 18200, confidence: 82, volume: 3580 },
    ],
    '6M': [
      { month: 'Nov', gdp: 410, tokenCap: 16100, confidence: 92, volume: 2850 },
      { month: 'Dec', gdp: 415, tokenCap: 16800, confidence: 88, volume: 3120 },
      { month: 'Jan', gdp: 422, tokenCap: 17500, confidence: 85, volume: 3350 },
      { month: 'Feb', gdp: 428, tokenCap: 18200, confidence: 82, volume: 3580 },
      { month: 'Mar', gdp: 435, tokenCap: 18900, confidence: 78, volume: 3820 },
      { month: 'Apr', gdp: 442, tokenCap: 19600, confidence: 75, volume: 4050 },
      { month: 'May', gdp: 450, tokenCap: 20400, confidence: 72, volume: 4280 },
    ],
    '1Y': [
      { month: 'Q1', gdp: 415, tokenCap: 17200, confidence: 88, volume: 9500 },
      { month: 'Q2', gdp: 438, tokenCap: 19200, confidence: 78, volume: 11200 },
      { month: 'Q3', gdp: 465, tokenCap: 21500, confidence: 68, volume: 13500 },
      { month: 'Q4', gdp: 492, tokenCap: 23800, confidence: 60, volume: 15800 },
    ],
  };

  // Top Performing Districts
  const topGainers = [
    { name: 'Bengaluru Urban', change: 24.8, volume: '₹342Cr', risk: 65, trend: 'up', momentum: 92 },
    { name: 'Pune', change: 18.9, volume: '₹289Cr', risk: 58, trend: 'up', momentum: 85 },
    { name: 'Hyderabad', change: 16.7, volume: '₹267Cr', risk: 62, trend: 'up', momentum: 80 },
    { name: 'Surat', change: 15.2, volume: '₹201Cr', risk: 72, trend: 'up', momentum: 75 },
    { name: 'Ahmedabad', change: 14.5, volume: '₹189Cr', risk: 68, trend: 'up', momentum: 73 },
  ];

  const topLosers = [
    { name: 'Kolkata', change: -8.4, volume: '₹152Cr', risk: 45, trend: 'down', momentum: 35 },
    { name: 'Patna', change: -5.6, volume: '₹83Cr', risk: 38, trend: 'down', momentum: 42 },
    { name: 'Jaipur', change: -3.2, volume: '₹127Cr', risk: 42, trend: 'down', momentum: 48 },
  ];

  // Market Distribution
  const marketDistribution = [
    { name: 'District Tokens', value: 42, color: '#FCD34D' },
    { name: 'State Indices', value: 28, color: '#10B981' },
    { name: 'Mutual Funds', value: 18, color: '#8B5CF6' },
    { name: 'ETFs', value: 12, color: '#3B82F6' },
  ];

  // Sector Performance
  const sectorPerformance = [
    { sector: 'Technology', growth: 28.5, investment: 4250, rating: 'A+', color: '#3B82F6' },
    { sector: 'Infrastructure', growth: 22.8, investment: 3890, rating: 'A', color: '#FCD34D' },
    { sector: 'Manufacturing', growth: 18.9, investment: 3200, rating: 'A-', color: '#F59E0B' },
    { sector: 'Healthcare', growth: 15.2, investment: 2450, rating: 'B+', color: '#EC4899' },
    { sector: 'Energy', growth: 12.7, investment: 2100, rating: 'B', color: '#10B981' },
    { sector: 'Agriculture', growth: 9.8, investment: 1650, rating: 'B-', color: '#8B5CF6' },
  ];

  // State Projections
  const stateProjections = [
    { state: 'Maharashtra', gdpGrowth: 6.3, sentiment: 'Bullish', topToken: 'Mumbai', predictedReturn: 18.5, confidence: 88, volume: 5420 },
    { state: 'Karnataka', gdpGrowth: 7.8, sentiment: 'Bullish', topToken: 'Bengaluru', predictedReturn: 24.8, confidence: 92, volume: 4890 },
    { state: 'Gujarat', gdpGrowth: 5.9, sentiment: 'Neutral', topToken: 'Ahmedabad', predictedReturn: 12.3, confidence: 75, volume: 3210 },
    { state: 'Tamil Nadu', gdpGrowth: 5.2, sentiment: 'Neutral', topToken: 'Chennai', predictedReturn: 10.8, confidence: 72, volume: 2980 },
    { state: 'Uttar Pradesh', gdpGrowth: 8.4, sentiment: 'Bullish', topToken: 'Lucknow', predictedReturn: 15.2, confidence: 85, volume: 2750 },
    { state: 'Delhi NCR', gdpGrowth: 4.8, sentiment: 'Bearish', topToken: 'Delhi', predictedReturn: 8.5, confidence: 65, volume: 2450 },
  ];

  // Timeline Data
  const timelineData = [
    { year: 2020, gdp: 2650, tokens: 0, etf: 0, sentiment: 50, investors: 0 },
    { year: 2022, gdp: 3100, tokens: 5000, etf: 2000, sentiment: 58, investors: 1.2 },
    { year: 2024, gdp: 3750, tokens: 12000, etf: 8000, sentiment: 65, investors: 3.5 },
    { year: 2025, gdp: 4100, tokens: 16100, etf: 12500, sentiment: 72, investors: 5.8 },
    { year: 2030, gdp: 5500, tokens: 35000, etf: 28000, sentiment: 82, investors: 12.5 },
    { year: 2040, gdp: 8200, tokens: 75000, etf: 62000, sentiment: 88, investors: 28.3 },
    { year: 2050, gdp: 12500, tokens: 150000, etf: 125000, sentiment: 92, investors: 45.7 },
  ];

  // AI Insights
  const aiInsights = [
    { 
      text: 'Karnataka tech tokens showing 92% bullish momentum - Consider increasing allocation', 
      priority: 'high', 
      icon: Rocket,
      action: 'View Opportunities',
      impact: '+24.8% projected return'
    },
    { 
      text: 'Portfolio risk elevated - Rebalance recommended via Balanced Mutual Fund 2.0', 
      priority: 'high', 
      icon: AlertTriangle,
      action: 'Rebalance Now',
      impact: 'Reduce risk by 35%'
    },
    { 
      text: 'Infrastructure sector showing early recovery signals across 8 districts', 
      priority: 'medium', 
      icon: TrendingUp,
      action: 'Analyze Sector',
      impact: '+18% average growth'
    },
    { 
      text: '3 of your SIPs hitting maturity next month - Reinvestment options available', 
      priority: 'medium', 
      icon: Calendar,
      action: 'View SIPs',
      impact: '₹2.4L total value'
    },
    { 
      text: 'Maharashtra ETF outperforming by 12% - Strong buy signal detected', 
      priority: 'low', 
      icon: Activity,
      action: 'Buy ETF',
      impact: '+12.3% vs benchmark'
    },
  ];

  // News Feed
  const newsFeed = [
    { 
      title: "India's AI Exports Surpass $200B Milestone", 
      sentiment: 'positive', 
      source: 'Economic Times', 
      sector: 'Technology', 
      time: '2h ago',
      impact: 'High',
      tokens: ['Bengaluru', 'Pune', 'Hyderabad']
    },
    { 
      title: 'Infrastructure Token Index Surges 3.8% After New Rail Corridor Launch', 
      sentiment: 'positive', 
      source: 'Business Standard', 
      sector: 'Infrastructure', 
      time: '4h ago',
      impact: 'Medium',
      tokens: ['Delhi', 'Mumbai']
    },
    { 
      title: 'AI Predicts 8.4% GDP Growth in Q3 2025', 
      sentiment: 'positive', 
      source: 'Reuters', 
      sector: 'Economy', 
      time: '6h ago',
      impact: 'High',
      tokens: ['All Indices']
    },
    { 
      title: 'Manufacturing Sector Faces Short-term Headwinds', 
      sentiment: 'negative', 
      source: 'Bloomberg', 
      sector: 'Manufacturing', 
      time: '8h ago',
      impact: 'Medium',
      tokens: ['Gujarat', 'Tamil Nadu']
    },
    { 
      title: 'Karnataka Announces ₹15,000Cr Tech Hub Investment', 
      sentiment: 'positive', 
      source: 'NDTV', 
      sector: 'Technology', 
      time: '10h ago',
      impact: 'High',
      tokens: ['Bengaluru']
    },
  ];

  // Market Stats
  const marketStats = [
    { label: 'Total Market Cap', value: '₹16,100Cr', change: '+12.5%', icon: DollarSign, color: 'yellow' },
    { label: 'Active Investors', value: '5.8M', change: '+18.2%', icon: Users, color: 'blue' },
    { label: 'Daily Volume', value: '₹2,850Cr', change: '+8.7%', icon: Activity, color: 'green' },
    { label: 'AI Confidence', value: '92%', change: '+5%', icon: Brain, color: 'purple' },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border-2 border-yellow-500/50 rounded-xl p-4 shadow-2xl backdrop-blur-xl">
          <div className="space-y-2">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex items-center justify-between gap-4">
                <span className="text-sm text-muted-foreground">{entry.name}:</span>
                <span className="text-sm font-medium" style={{ color: entry.color }}>
                  {entry.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 space-y-6">
      
      {/* Premium Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-purple-500/10 to-blue-500/10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptMCAyYy0yLjIxIDAtNCAxLjc5LTQgNHMxLjc5IDQgNCA0IDQtMS43OSA0LTQtMS43OS00LTQtNHoiIGZpbGw9IiNGQ0QzNEQiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9nPjwvc3ZnPg==')] opacity-30"></div>
        <div className="relative p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
                <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center shadow-2xl">
                  <Brain className="w-10 h-10 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl sm:text-5xl bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 bg-clip-text text-transparent mb-2">
                  Bharat Economic Pulse
                </h1>
                <p className="text-muted-foreground">
                  Powered by Zonix AI — Real-time Intelligence, Forecasting & Market Analytics
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black shadow-lg">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button variant="outline" className="border-yellow-500/30 hover:bg-yellow-500/10">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Market Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {marketStats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className={`relative overflow-hidden border-2 ${
              stat.color === 'yellow' ? 'border-yellow-500/30 bg-gradient-to-br from-yellow-500/5 to-amber-500/5' :
              stat.color === 'blue' ? 'border-blue-500/30 bg-gradient-to-br from-blue-500/5 to-cyan-500/5' :
              stat.color === 'green' ? 'border-green-500/30 bg-gradient-to-br from-green-500/5 to-emerald-500/5' :
              'border-purple-500/30 bg-gradient-to-br from-purple-500/5 to-pink-500/5'
            } backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all group`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full"></div>
              <div className="p-6 relative">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${
                    stat.color === 'yellow' ? 'bg-gradient-to-br from-yellow-500 to-amber-600' :
                    stat.color === 'blue' ? 'bg-gradient-to-br from-blue-500 to-cyan-600' :
                    stat.color === 'green' ? 'bg-gradient-to-br from-green-500 to-emerald-600' :
                    'bg-gradient-to-br from-purple-500 to-pink-600'
                  } flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge className={`${
                    stat.change.startsWith('+') ? 'bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/40' : 'bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/40'
                  }`}>
                    {stat.change}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-3xl">{stat.value}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Market Sentiment Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-2 border-yellow-500/30 bg-gradient-to-br from-card/90 via-yellow-50/5 dark:via-yellow-950/10 to-card backdrop-blur-xl shadow-xl">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center shadow-lg">
                  <Signal className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl">Live Market Sentiment</h3>
                  <p className="text-sm text-muted-foreground">Real-time Analysis of Bharat Economic Mood</p>
                </div>
              </div>
              <div className="text-right">
                <Badge className={`text-lg px-4 py-2 ${marketSentiment >= 70 ? 'bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/40' : marketSentiment >= 40 ? 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/40' : 'bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/40'}`}>
                  {marketSentiment >= 70 ? '🚀 Bullish' : marketSentiment >= 40 ? '⚖️ Neutral' : '📉 Bearish'}
                </Badge>
                <p className="text-sm text-muted-foreground mt-1">{marketSentiment}/100 Score</p>
              </div>
            </div>
            
            <div className="relative h-12 rounded-full overflow-hidden bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 shadow-inner">
              <motion.div
                className="absolute top-0 h-full w-2 bg-white shadow-2xl"
                initial={{ left: '50%' }}
                animate={{ left: `${marketSentiment}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border-4 border-black shadow-xl"></div>
              </motion.div>
            </div>
            <div className="flex items-center justify-between mt-3 text-sm">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-red-500" />
                <span className="text-muted-foreground">Bearish</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-yellow-500" />
                <span className="text-muted-foreground">Neutral</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-muted-foreground">Bullish</span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left & Center Column */}
        <div className="xl:col-span-2 space-y-6">
          
          {/* AI Economic Forecast */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="border-2 border-purple-500/30 bg-gradient-to-br from-card/90 via-purple-50/5 dark:via-purple-950/10 to-card backdrop-blur-xl shadow-xl">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
                      <Zap className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl">AI-Powered Economic Forecast</h3>
                      <p className="text-sm text-muted-foreground">GDP & Token Market Cap Projections with ML Analysis</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {(['1M', '3M', '6M', '1Y'] as const).map((period) => (
                      <Button
                        key={period}
                        size="sm"
                        variant={selectedTimeframe === period ? 'default' : 'outline'}
                        onClick={() => setSelectedTimeframe(period)}
                        className={selectedTimeframe === period ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg' : 'hover:bg-purple-500/10'}
                      >
                        {period}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="h-96 mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={forecastData[selectedTimeframe as keyof typeof forecastData]}>
                      <defs>
                        <linearGradient id="colorGDP" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#FCD34D" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#FCD34D" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorToken" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.2} />
                      <XAxis dataKey="month" stroke="#888" style={{ fontSize: '13px' }} />
                      <YAxis yAxisId="left" stroke="#888" style={{ fontSize: '13px' }} />
                      <YAxis yAxisId="right" orientation="right" stroke="#888" style={{ fontSize: '13px' }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend wrapperStyle={{ fontSize: '13px' }} />
                      <Area yAxisId="left" type="monotone" dataKey="gdp" stroke="#FCD34D" strokeWidth={3} fillOpacity={1} fill="url(#colorGDP)" name="GDP (₹T)" />
                      <Area yAxisId="right" type="monotone" dataKey="tokenCap" stroke="#8B5CF6" strokeWidth={3} fillOpacity={1} fill="url(#colorToken)" name="Token Cap (₹Cr)" />
                      <Line yAxisId="left" type="monotone" dataKey="confidence" stroke="#10B981" strokeWidth={2} strokeDasharray="5 5" name="AI Confidence %" dot={{ fill: '#10B981', r: 4 }} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-purple-500/5 border border-purple-500/20">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">AI Confidence Level</p>
                    <div className="flex items-center justify-center gap-2">
                      <Progress value={92} className="h-2 flex-1" />
                      <span className="text-xl text-purple-600 dark:text-purple-400">92%</span>
                    </div>
                  </div>
                  <div className="text-center border-l border-r border-purple-500/20">
                    <p className="text-sm text-muted-foreground mb-1">Volatility Index</p>
                    <p className="text-xl text-yellow-600 dark:text-yellow-400">28.5 • Moderate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">Data Validation</p>
                    <p className="text-xl">3Y Historical Trend</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Market Analytics Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="border-2 border-blue-500/30 bg-gradient-to-br from-card/90 via-blue-50/5 dark:via-blue-950/10 to-card backdrop-blur-xl shadow-xl">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                    <BarChart3 className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl">Deep Market Analytics</h3>
                    <p className="text-sm text-muted-foreground">Comprehensive Asset Performance Analysis</p>
                  </div>
                </div>

                <Tabs defaultValue="district-tokens" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-6 h-auto gap-2">
                    <TabsTrigger value="district-tokens" className="text-sm">
                      <MapPin className="w-4 h-4 mr-2" />
                      District Tokens
                    </TabsTrigger>
                    <TabsTrigger value="sectors" className="text-sm">
                      <Factory className="w-4 h-4 mr-2" />
                      Sectors
                    </TabsTrigger>
                    <TabsTrigger value="states" className="text-sm">
                      <Globe className="w-4 h-4 mr-2" />
                      States
                    </TabsTrigger>
                    <TabsTrigger value="distribution" className="text-sm">
                      <PieChart className="w-4 h-4 mr-2" />
                      Distribution
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="district-tokens" className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                          <h4 className="text-lg">Top Gainers</h4>
                          <Badge className="bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/40">
                            Hot
                          </Badge>
                        </div>
                        <div className="space-y-3">
                          {topGainers.map((token, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.6 + idx * 0.05 }}
                              className="relative overflow-hidden rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/30 p-4 hover:shadow-lg hover:border-green-500/50 transition-all group"
                            >
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <p className="text-sm mb-1">{token.name}</p>
                                  <p className="text-xs text-muted-foreground">Vol: {token.volume}</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-lg text-green-600 dark:text-green-400 mb-1">+{token.change}%</p>
                                  <Badge variant="outline" className="text-xs">
                                    Momentum: {token.momentum}
                                  </Badge>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-muted-foreground">Risk Score</span>
                                  <span className={token.risk < 60 ? 'text-green-600 dark:text-green-400' : token.risk < 70 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'}>
                                    {token.risk}/100
                                  </span>
                                </div>
                                <Progress value={token.momentum} className="h-2" />
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
                          <h4 className="text-lg">Top Losers</h4>
                          <Badge className="bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/40">
                            Watch
                          </Badge>
                        </div>
                        <div className="space-y-3">
                          {topLosers.map((token, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.6 + idx * 0.05 }}
                              className="relative overflow-hidden rounded-xl bg-gradient-to-br from-red-500/10 to-rose-500/5 border border-red-500/30 p-4 hover:shadow-lg hover:border-red-500/50 transition-all group"
                            >
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <p className="text-sm mb-1">{token.name}</p>
                                  <p className="text-xs text-muted-foreground">Vol: {token.volume}</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-lg text-red-600 dark:text-red-400 mb-1">{token.change}%</p>
                                  <Badge variant="outline" className="text-xs">
                                    Momentum: {token.momentum}
                                  </Badge>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-muted-foreground">Risk Score</span>
                                  <span className={token.risk < 60 ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}>
                                    {token.risk}/100
                                  </span>
                                </div>
                                <Progress value={token.momentum} className="h-2" />
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="sectors" className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                      <div className="lg:col-span-2">
                        <div className="h-80">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={sectorPerformance}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.2} />
                              <XAxis dataKey="sector" stroke="#888" style={{ fontSize: '12px' }} />
                              <YAxis stroke="#888" style={{ fontSize: '12px' }} />
                              <Tooltip content={<CustomTooltip />} />
                              <Bar dataKey="growth" name="Growth %" radius={[8, 8, 0, 0]}>
                                {sectorPerformance.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                      <div className="space-y-3">
                        {sectorPerformance.slice(0, 4).map((sector, idx) => (
                          <div key={idx} className="p-4 rounded-xl bg-gradient-to-br from-background/50 to-background/30 border border-border hover:shadow-lg transition-all">
                            <div className="flex items-center justify-between mb-2">
                              <p className="text-sm">{sector.sector}</p>
                              <Badge style={{ backgroundColor: `${sector.color}20`, color: sector.color, borderColor: `${sector.color}40` }}>
                                {sector.rating}
                              </Badge>
                            </div>
                            <p className="text-2xl mb-1" style={{ color: sector.color }}>+{sector.growth}%</p>
                            <p className="text-xs text-muted-foreground">Investment: ₹{sector.investment}Cr</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="states" className="space-y-4">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left p-4 text-sm">State</th>
                            <th className="text-right p-4 text-sm">GDP Growth</th>
                            <th className="text-center p-4 text-sm">Sentiment</th>
                            <th className="text-left p-4 text-sm">Top Token</th>
                            <th className="text-right p-4 text-sm">Predicted Return</th>
                            <th className="text-right p-4 text-sm">Confidence</th>
                          </tr>
                        </thead>
                        <tbody>
                          {stateProjections.map((state, idx) => (
                            <motion.tr
                              key={state.state}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.6 + idx * 0.05 }}
                              className="border-b border-border/50 hover:bg-blue-500/5 transition-colors"
                            >
                              <td className="p-4">
                                <div className="flex items-center gap-2">
                                  <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                  <span className="text-sm">{state.state}</span>
                                </div>
                              </td>
                              <td className="p-4 text-right">
                                <div className="flex items-center justify-end gap-1">
                                  {state.gdpGrowth >= 6 ? (
                                    <ArrowUpRight className="w-4 h-4 text-green-600 dark:text-green-400" />
                                  ) : state.gdpGrowth >= 4 ? (
                                    <Activity className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                                  ) : (
                                    <ArrowDownRight className="w-4 h-4 text-red-600 dark:text-red-400" />
                                  )}
                                  <span className="text-sm">{state.gdpGrowth}%</span>
                                </div>
                              </td>
                              <td className="p-4 text-center">
                                <Badge className={`${
                                  state.sentiment === 'Bullish' ? 'bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/40' :
                                  state.sentiment === 'Bearish' ? 'bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/40' :
                                  'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/40'
                                }`}>
                                  {state.sentiment}
                                </Badge>
                              </td>
                              <td className="p-4">
                                <div className="flex items-center gap-2">
                                  <MapPin className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                                  <span className="text-sm">{state.topToken}</span>
                                </div>
                              </td>
                              <td className="p-4 text-right">
                                <span className="text-sm text-green-600 dark:text-green-400">+{state.predictedReturn}%</span>
                              </td>
                              <td className="p-4 text-right">
                                <span className="text-sm">{state.confidence}%</span>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>

                  <TabsContent value="distribution" className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <RePieChart>
                            <Pie
                              data={marketDistribution}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, value }) => `${name}: ${value}%`}
                              outerRadius={100}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {marketDistribution.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                          </RePieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="space-y-3">
                        {marketDistribution.map((item, idx) => (
                          <div key={idx} className="p-4 rounded-xl border border-border hover:shadow-lg transition-all" style={{ borderColor: `${item.color}40`, backgroundColor: `${item.color}10` }}>
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                                <p className="text-sm">{item.name}</p>
                              </div>
                              <p className="text-2xl" style={{ color: item.color }}>{item.value}%</p>
                            </div>
                            <Progress value={item.value} className="h-2" style={{ backgroundColor: `${item.color}20` }} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </Card>
          </motion.div>

          {/* Time-Series Analyzer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="border-2 border-indigo-500/30 bg-gradient-to-br from-card/90 via-indigo-50/5 dark:via-indigo-950/10 to-card backdrop-blur-xl shadow-xl">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-lg">
                      <LineChart className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl">Time-Series Growth Analyzer</h3>
                      <p className="text-sm text-muted-foreground">Historical & AI-Projected Growth (2020-2050)</p>
                    </div>
                  </div>
                  <Button className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white shadow-lg">
                    <Zap className="w-4 h-4 mr-2" />
                    Simulate 5Y Future
                  </Button>
                </div>

                <div className="h-96 mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <ReLineChart data={timelineData}>
                      <defs>
                        <linearGradient id="colorTimeline1" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#FCD34D" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#FCD34D" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorTimeline2" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.2} />
                      <XAxis dataKey="year" stroke="#888" style={{ fontSize: '13px' }} />
                      <YAxis stroke="#888" style={{ fontSize: '13px' }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend wrapperStyle={{ fontSize: '13px' }} />
                      <Area type="monotone" dataKey="gdp" stroke="#FCD34D" strokeWidth={3} fill="url(#colorTimeline1)" name="GDP (₹T)" />
                      <Area type="monotone" dataKey="tokens" stroke="#10B981" strokeWidth={2} fill="url(#colorTimeline2)" name="Token Cap" />
                      <Line type="monotone" dataKey="etf" stroke="#8B5CF6" strokeWidth={2} strokeDasharray="5 5" name="ETF Value" dot={{ fill: '#8B5CF6', r: 4 }} />
                      <Line type="monotone" dataKey="investors" stroke="#3B82F6" strokeWidth={2} name="Investors (M)" dot={{ fill: '#3B82F6', r: 3 }} />
                    </ReLineChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Select Year: <span className="text-yellow-600 dark:text-yellow-400 text-lg ml-2">{timelineYear[0]}</span></span>
                    <div className="flex gap-2">
                      <Badge className="bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/40">
                        GDP: ₹{timelineData.find(d => d.year === timelineYear[0])?.gdp}T
                      </Badge>
                      <Badge className="bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/40">
                        Tokens: ₹{timelineData.find(d => d.year === timelineYear[0])?.tokens}Cr
                      </Badge>
                    </div>
                  </div>
                  <Slider
                    value={timelineYear}
                    onValueChange={setTimelineYear}
                    min={2020}
                    max={2050}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>2020 (Historical)</span>
                    <span>2025 (Current)</span>
                    <span>2050 (Projected)</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-500/20">
                    <p className="text-xs text-muted-foreground mb-1">2030 GDP</p>
                    <p className="text-xl text-yellow-600 dark:text-yellow-400">₹5,500T</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20">
                    <p className="text-xs text-muted-foreground mb-1">2030 Tokens</p>
                    <p className="text-xl text-green-600 dark:text-green-400">₹35,000Cr</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20">
                    <p className="text-xs text-muted-foreground mb-1">CAGR</p>
                    <p className="text-xl text-purple-600 dark:text-purple-400">6.8%</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20">
                    <p className="text-xs text-muted-foreground mb-1">Peak Year</p>
                    <p className="text-xl text-blue-600 dark:text-blue-400">2050</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

        </div>

        {/* Right Column - AI Insights & News */}
        <div className="space-y-6">
          
          {/* AI Insights */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="border-2 border-green-500/30 bg-gradient-to-br from-card/90 via-green-50/5 dark:via-green-950/10 to-card backdrop-blur-xl shadow-xl">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl">AI Insights & Alerts</h3>
                    <p className="text-xs text-muted-foreground">Personalized Recommendations</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {aiInsights.map((insight, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                      className={`p-4 rounded-xl border-2 ${
                        insight.priority === 'high' 
                          ? 'border-red-500/40 bg-gradient-to-br from-red-500/10 to-orange-500/5' 
                          : insight.priority === 'medium'
                          ? 'border-yellow-500/40 bg-gradient-to-br from-yellow-500/10 to-amber-500/5'
                          : 'border-blue-500/40 bg-gradient-to-br from-blue-500/10 to-cyan-500/5'
                      } hover:shadow-lg transition-all group cursor-pointer`}
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          insight.priority === 'high' 
                            ? 'bg-red-500/20' 
                            : insight.priority === 'medium'
                            ? 'bg-yellow-500/20'
                            : 'bg-blue-500/20'
                        }`}>
                          <insight.icon className={`w-5 h-5 ${
                            insight.priority === 'high' 
                              ? 'text-red-600 dark:text-red-400' 
                              : insight.priority === 'medium'
                              ? 'text-yellow-600 dark:text-yellow-400'
                              : 'text-blue-600 dark:text-blue-400'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <Badge className={`mb-2 ${
                            insight.priority === 'high' 
                              ? 'bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/40' 
                              : insight.priority === 'medium'
                              ? 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/40'
                              : 'bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/40'
                          }`}>
                            {insight.priority.toUpperCase()} PRIORITY
                          </Badge>
                          <p className="text-sm mb-2">{insight.text}</p>
                          <p className="text-xs text-muted-foreground mb-3">Impact: {insight.impact}</p>
                          <Button size="sm" variant="outline" className="w-full">
                            {insight.action}
                            <ChevronRight className="w-3 h-3 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Live News Feed */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="border-2 border-orange-500/30 bg-gradient-to-br from-card/90 via-orange-50/5 dark:via-orange-950/10 to-card backdrop-blur-xl shadow-xl">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg">
                      <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl">Live News Feed</h3>
                      <p className="text-xs text-muted-foreground">Market Moving Events</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="border-orange-500/30 hover:bg-orange-500/10">
                    <Search className="w-3 h-3 mr-1" />
                    Filter
                  </Button>
                </div>

                <div className="space-y-3">
                  {newsFeed.map((news, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + idx * 0.05 }}
                      className="p-4 rounded-xl border border-border hover:shadow-lg hover:border-orange-500/30 transition-all group cursor-pointer"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className={`w-2 h-2 rounded-full mt-1 ${
                          news.sentiment === 'positive' ? 'bg-green-500' : 'bg-red-500'
                        } animate-pulse`}></div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={`text-xs ${
                              news.impact === 'High' 
                                ? 'bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/40' 
                                : 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/40'
                            }`}>
                              {news.impact} Impact
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {news.sector}
                            </Badge>
                          </div>
                          <p className="text-sm mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                            {news.title}
                          </p>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>{news.source}</span>
                            <span>{news.time}</span>
                          </div>
                          {news.tokens.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {news.tokens.map((token, tidx) => (
                                <Badge key={tidx} variant="outline" className="text-xs">
                                  {token}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <Button className="w-full mt-4 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white shadow-lg">
                  View All News
                  <ArrowUpRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="border-2 border-cyan-500/30 bg-gradient-to-br from-card/90 via-cyan-50/5 dark:via-cyan-950/10 to-card backdrop-blur-xl shadow-xl">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl">Quick Actions</h3>
                    <p className="text-xs text-muted-foreground">AI-Powered Shortcuts</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button className="h-auto flex-col gap-2 p-4 bg-gradient-to-br from-yellow-500/10 to-amber-500/5 border-2 border-yellow-500/30 hover:border-yellow-500/50 hover:shadow-lg transition-all">
                    <Target className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                    <span className="text-xs">Portfolio Rebalance</span>
                  </Button>
                  <Button className="h-auto flex-col gap-2 p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/5 border-2 border-green-500/30 hover:border-green-500/50 hover:shadow-lg transition-all">
                    <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <span className="text-xs">Top Picks</span>
                  </Button>
                  <Button className="h-auto flex-col gap-2 p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border-2 border-blue-500/30 hover:border-blue-500/50 hover:shadow-lg transition-all">
                    <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span className="text-xs">Risk Analysis</span>
                  </Button>
                  <Button className="h-auto flex-col gap-2 p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/5 border-2 border-purple-500/30 hover:border-purple-500/50 hover:shadow-lg transition-all">
                    <Download className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <span className="text-xs">Export Data</span>
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
