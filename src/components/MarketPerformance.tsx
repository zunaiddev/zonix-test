import { useMemo, useState, memo } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Zap,
  Award,
  MapPin,
  BarChart3,
  Users,
  Crown,
  Star,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Flame,
  Eye,
  DollarSign,
  PieChart,
  TrendingUpIcon,
  Globe,
  Factory,
  Briefcase,
  GraduationCap,
  Building2,
  Network,
  Layers,
  Radio,
} from 'lucide-react';
import { DistrictToken } from './DistrictBrowser';
import {
  AreaChart,
  Area,
  BarChart as RechartsBarChart,
  Bar,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface MarketPerformanceProps {
  districts: DistrictToken[];
  onDistrictClick?: (district: DistrictToken) => void;
}

export const MarketPerformance = memo(({ districts, onDistrictClick }: MarketPerformanceProps) => {
  const [activeTab, setActiveTab] = useState('gainers');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'Large Cap' | 'Mid Cap' | 'Small Cap'>('all');
  const [regionFilter, setRegionFilter] = useState<string>('all');

  const topGainers = useMemo(() => 
    [...districts].sort((a, b) => b.change - a.change).slice(0, 20),
    [districts]
  );

  const topLosers = useMemo(() => 
    [...districts].sort((a, b) => a.change - b.change).slice(0, 20),
    [districts]
  );

  const mostActive = useMemo(() => 
    [...districts].sort((a, b) => b.volume24h - a.volume24h).slice(0, 20),
    [districts]
  );

  const topEconomicPulse = useMemo(() => 
    [...districts].sort((a, b) => b.economicPulse - a.economicPulse).slice(0, 20),
    [districts]
  );

  const marketStats = useMemo(() => {
    const gainers = districts.filter(d => d.change > 0).length;
    const losers = districts.filter(d => d.change < 0).length;
    const neutral = districts.filter(d => d.change === 0).length;
    const avgChange = districts.reduce((acc, d) => acc + d.change, 0) / districts.length;
    const totalVolume = districts.reduce((acc, d) => acc + d.volume24h, 0);
    const totalMarketCap = districts.reduce((acc, d) => acc + d.marketCap, 0);
    const bullish = districts.filter(d => d.sentiment === 'Bullish').length;
    const bearish = districts.filter(d => d.sentiment === 'Bearish').length;
    const avgGDP = districts.reduce((acc, d) => acc + d.gdp, 0) / districts.length;
    const avgPopulation = districts.reduce((acc, d) => acc + d.population, 0) / districts.length;
    
    return { gainers, losers, neutral, avgChange, totalVolume, totalMarketCap, bullish, bearish, avgGDP, avgPopulation };
  }, [districts]);

  // Regional Performance Analysis
  const regionalData = useMemo(() => {
    const regions = ['North', 'South', 'East', 'West', 'Central', 'Northeast'];
    return regions.map(region => {
      const regionDistricts = districts.filter(d => d.region === region);
      const avgChange = regionDistricts.reduce((acc, d) => acc + d.change, 0) / regionDistricts.length;
      const totalVolume = regionDistricts.reduce((acc, d) => acc + d.volume24h, 0);
      return {
        region,
        avgChange: Number(avgChange.toFixed(2)),
        totalVolume,
        districts: regionDistricts.length,
      };
    }).filter(r => r.districts > 0);
  }, [districts]);

  // Category Distribution
  const categoryData = useMemo(() => {
    const largeCap = districts.filter(d => d.category === 'Large Cap').length;
    const midCap = districts.filter(d => d.category === 'Mid Cap').length;
    const smallCap = districts.filter(d => d.category === 'Small Cap').length;
    
    return [
      { name: 'Large Cap', value: largeCap, color: '#FCD34D' },
      { name: 'Mid Cap', value: midCap, color: '#FBBF24' },
      { name: 'Small Cap', value: smallCap, color: '#F59E0B' },
    ];
  }, [districts]);

  // Sentiment Distribution
  const sentimentData = useMemo(() => [
    { name: 'Bullish', value: marketStats.bullish, color: '#10B981' },
    { name: 'Bearish', value: marketStats.bearish, color: '#EF4444' },
    { name: 'Neutral', value: marketStats.neutral, color: '#6B7280' },
  ], [marketStats]);

  // Top Sectors Analysis
  const sectorData = useMemo(() => {
    const sectors = ['Agriculture', 'Industry', 'Services', 'Tech'];
    return sectors.map(sector => {
      const avg = districts.reduce((acc, d) => {
        if (sector === 'Agriculture') return acc + d.sectors.agriculture;
        if (sector === 'Industry') return acc + d.sectors.industry;
        if (sector === 'Services') return acc + d.sectors.services;
        if (sector === 'Tech') return acc + d.sectors.tech;
        return acc;
      }, 0) / districts.length;
      return { sector, average: Number(avg.toFixed(1)) };
    });
  }, [districts]);

  const currentList = useMemo(() => {
    let list = [];
    switch (activeTab) {
      case 'gainers': list = topGainers; break;
      case 'losers': list = topLosers; break;
      case 'active': list = mostActive; break;
      case 'pulse': list = topEconomicPulse; break;
      default: list = topGainers;
    }

    // Apply filters
    if (categoryFilter !== 'all') {
      list = list.filter(d => d.category === categoryFilter);
    }
    if (regionFilter !== 'all') {
      list = list.filter(d => d.region === regionFilter);
    }

    return list;
  }, [activeTab, topGainers, topLosers, mostActive, topEconomicPulse, categoryFilter, regionFilter]);

  return (
    <div className="space-y-6">
      {/* Hero Market Overview */}
      <Card className="relative overflow-hidden border-2 border-yellow-500/30 bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 dark:from-yellow-950/30 dark:via-amber-950/20 dark:to-orange-950/10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center shadow-xl shadow-yellow-500/30">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 bg-clip-text text-transparent">
                District Market Overview
              </h2>
              <p className="text-muted-foreground">
                Comprehensive analysis of {districts.length} districts across India
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <Card className="p-4 bg-white/80 dark:bg-black/40 backdrop-blur-sm border-2 border-green-500/30 hover:border-green-500/50 hover:scale-105 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="text-2xl text-green-600 dark:text-green-400 mb-1">{marketStats.gainers}</div>
              <div className="text-xs text-muted-foreground">Gainers Today</div>
              <div className="mt-2 text-xs text-green-600 dark:text-green-400">
                {((marketStats.gainers / districts.length) * 100).toFixed(1)}% of market
              </div>
            </Card>

            <Card className="p-4 bg-white/80 dark:bg-black/40 backdrop-blur-sm border-2 border-red-500/30 hover:border-red-500/50 hover:scale-105 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center">
                  <TrendingDown className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="text-2xl text-red-600 dark:text-red-400 mb-1">{marketStats.losers}</div>
              <div className="text-xs text-muted-foreground">Losers Today</div>
              <div className="mt-2 text-xs text-red-600 dark:text-red-400">
                {((marketStats.losers / districts.length) * 100).toFixed(1)}% of market
              </div>
            </Card>

            <Card className="p-4 bg-white/80 dark:bg-black/40 backdrop-blur-sm border-2 border-blue-500/30 hover:border-blue-500/50 hover:scale-105 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="text-2xl text-blue-600 dark:text-blue-400 mb-1">₹{(marketStats.totalVolume / 10000000).toFixed(1)}Cr</div>
              <div className="text-xs text-muted-foreground">Total Volume</div>
              <div className="mt-2 text-xs text-blue-600 dark:text-blue-400">
                24h trading activity
              </div>
            </Card>

            <Card className="p-4 bg-white/80 dark:bg-black/40 backdrop-blur-sm border-2 border-yellow-500/30 hover:border-yellow-500/50 hover:scale-105 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className={`text-2xl mb-1 ${marketStats.avgChange >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {marketStats.avgChange >= 0 ? '+' : ''}{marketStats.avgChange.toFixed(2)}%
              </div>
              <div className="text-xs text-muted-foreground">Avg Change</div>
              <div className="mt-2 text-xs text-muted-foreground">
                Market average
              </div>
            </Card>

            <Card className="p-4 bg-white/80 dark:bg-black/40 backdrop-blur-sm border-2 border-purple-500/30 hover:border-purple-500/50 hover:scale-105 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                  <PieChart className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="text-2xl text-purple-600 dark:text-purple-400 mb-1">
                ₹{(marketStats.totalMarketCap / 100000).toFixed(1)}LCr
              </div>
              <div className="text-xs text-muted-foreground">Market Cap</div>
              <div className="mt-2 text-xs text-purple-600 dark:text-purple-400">
                Total valuation
              </div>
            </Card>

            <Card className="p-4 bg-white/80 dark:bg-black/40 backdrop-blur-sm border-2 border-orange-500/30 hover:border-orange-500/50 hover:scale-105 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                  <Flame className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="text-2xl text-orange-600 dark:text-orange-400 mb-1">
                {districts.filter(d => Math.abs(d.change) > 5).length}
              </div>
              <div className="text-xs text-muted-foreground">High Volatility</div>
              <div className="mt-2 text-xs text-orange-600 dark:text-orange-400">
                &gt;5% movement
              </div>
            </Card>
          </div>
        </div>
      </Card>

      {/* Market Sentiment & Analytics Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Market Sentiment */}
        <Card className="lg:col-span-2 p-6 bg-gradient-to-br from-card to-green-50/20 dark:to-green-950/10 border-2 border-green-500/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Market Sentiment Analysis
              </h3>
              <p className="text-sm text-muted-foreground">Real-time sentiment indicators</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <Card className="p-5 bg-gradient-to-br from-green-500/10 to-emerald-500/5 border-2 border-green-500/30 hover:scale-105 transition-transform">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">Bullish Districts</span>
                <ArrowUpRight className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="text-3xl text-green-600 dark:text-green-400 mb-2">{marketStats.bullish}</div>
              <Progress value={(marketStats.bullish / districts.length) * 100} className="h-2 bg-green-100 dark:bg-green-950" />
              <div className="text-sm text-muted-foreground mt-2">
                {((marketStats.bullish / districts.length) * 100).toFixed(1)}% of total
              </div>
            </Card>

            <Card className="p-5 bg-gradient-to-br from-red-500/10 to-rose-500/5 border-2 border-red-500/30 hover:scale-105 transition-transform">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">Bearish Districts</span>
                <ArrowDownRight className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <div className="text-3xl text-red-600 dark:text-red-400 mb-2">{marketStats.bearish}</div>
              <Progress value={(marketStats.bearish / districts.length) * 100} className="h-2 bg-red-100 dark:bg-red-950" />
              <div className="text-sm text-muted-foreground mt-2">
                {((marketStats.bearish / districts.length) * 100).toFixed(1)}% of total
              </div>
            </Card>

            <Card className="p-5 bg-gradient-to-br from-gray-500/10 to-slate-500/5 border-2 border-gray-500/30 hover:scale-105 transition-transform">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">Neutral Districts</span>
                <Minus className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </div>
              <div className="text-3xl text-gray-600 dark:text-gray-400 mb-2">{marketStats.neutral}</div>
              <Progress value={(marketStats.neutral / districts.length) * 100} className="h-2 bg-gray-100 dark:bg-gray-950" />
              <div className="text-sm text-muted-foreground mt-2">
                {((marketStats.neutral / districts.length) * 100).toFixed(1)}% of total
              </div>
            </Card>
          </div>

          {/* Sentiment Pie Chart */}
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    border: '1px solid rgba(251, 191, 36, 0.3)',
                    borderRadius: '8px',
                  }}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Category Distribution */}
        <Card className="p-6 bg-gradient-to-br from-card to-amber-50/20 dark:to-amber-950/10 border-2 border-amber-500/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center shadow-lg">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                Category Split
              </h3>
              <p className="text-sm text-muted-foreground">Market cap distribution</p>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <Card className="p-4 bg-gradient-to-br from-yellow-500/10 to-amber-500/5 border-2 border-yellow-500/30">
              <div className="flex items-center gap-2 mb-2">
                <Crown className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                <span>Large Cap</span>
              </div>
              <div className="text-2xl mb-2">
                {districts.filter(d => d.category === 'Large Cap').length}
              </div>
              <Progress 
                value={(districts.filter(d => d.category === 'Large Cap').length / districts.length) * 100} 
                className="h-2 bg-yellow-100 dark:bg-yellow-950" 
              />
              <div className="text-xs text-muted-foreground mt-1">
                {((districts.filter(d => d.category === 'Large Cap').length / districts.length) * 100).toFixed(1)}% of total
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-amber-500/10 to-orange-500/5 border-2 border-amber-500/30">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <span>Mid Cap</span>
              </div>
              <div className="text-2xl mb-2">
                {districts.filter(d => d.category === 'Mid Cap').length}
              </div>
              <Progress 
                value={(districts.filter(d => d.category === 'Mid Cap').length / districts.length) * 100} 
                className="h-2 bg-amber-100 dark:bg-amber-950" 
              />
              <div className="text-xs text-muted-foreground mt-1">
                {((districts.filter(d => d.category === 'Mid Cap').length / districts.length) * 100).toFixed(1)}% of total
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-orange-500/10 to-red-500/5 border-2 border-orange-500/30">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                <span>Small Cap</span>
              </div>
              <div className="text-2xl mb-2">
                {districts.filter(d => d.category === 'Small Cap').length}
              </div>
              <Progress 
                value={(districts.filter(d => d.category === 'Small Cap').length / districts.length) * 100} 
                className="h-2 bg-orange-100 dark:bg-orange-950" 
              />
              <div className="text-xs text-muted-foreground mt-1">
                {((districts.filter(d => d.category === 'Small Cap').length / districts.length) * 100).toFixed(1)}% of total
              </div>
            </Card>
          </div>

          {/* Category Pie Chart */}
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name.split(' ')[0]}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={70}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    border: '1px solid rgba(251, 191, 36, 0.3)',
                    borderRadius: '8px',
                  }}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Regional Performance */}
      <Card className="p-6 bg-gradient-to-br from-card to-blue-50/20 dark:to-blue-950/10 border-2 border-blue-500/20">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Regional Performance Analysis
            </h3>
            <p className="text-sm text-muted-foreground">Performance across Indian regions</p>
          </div>
        </div>

        <div className="h-80 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart data={regionalData}>
              <defs>
                <linearGradient id="regionGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.3}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(251, 191, 36, 0.1)" />
              <XAxis dataKey="region" stroke="rgba(251, 191, 36, 0.5)" />
              <YAxis stroke="rgba(251, 191, 36, 0.5)" />
              <RechartsTooltip
                contentStyle={{
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  border: '1px solid rgba(251, 191, 36, 0.3)',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="avgChange" fill="url(#regionGradient)" radius={[8, 8, 0, 0]}>
                {regionalData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`}
                    fill={entry.avgChange >= 0 ? '#10B981' : '#EF4444'}
                  />
                ))}
              </Bar>
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {regionalData.map((region, index) => (
            <Card key={index} className="p-3 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-blue-500/30 hover:scale-105 transition-transform">
              <div className="text-sm mb-1">{region.region}</div>
              <div className={`text-xl mb-1 ${region.avgChange >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {region.avgChange >= 0 ? '+' : ''}{region.avgChange}%
              </div>
              <div className="text-xs text-muted-foreground">{region.districts} districts</div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Sector Performance */}
      <Card className="p-6 bg-gradient-to-br from-card to-purple-50/20 dark:to-purple-950/10 border-2 border-purple-500/20">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
            <Factory className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Sector Composition Analysis
            </h3>
            <p className="text-sm text-muted-foreground">Average sector distribution across districts</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-5 bg-gradient-to-br from-green-500/10 to-emerald-500/5 border-2 border-green-500/30">
            <div className="flex items-center gap-2 mb-3">
              <Factory className="w-5 h-5 text-green-600 dark:text-green-400" />
              <span className="text-sm">Agriculture</span>
            </div>
            <div className="text-3xl text-green-600 dark:text-green-400 mb-2">
              {sectorData.find(s => s.sector === 'Agriculture')?.average}%
            </div>
            <Progress 
              value={sectorData.find(s => s.sector === 'Agriculture')?.average || 0} 
              className="h-2 bg-green-100 dark:bg-green-950" 
            />
          </Card>

          <Card className="p-5 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border-2 border-blue-500/30">
            <div className="flex items-center gap-2 mb-3">
              <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="text-sm">Industry</span>
            </div>
            <div className="text-3xl text-blue-600 dark:text-blue-400 mb-2">
              {sectorData.find(s => s.sector === 'Industry')?.average}%
            </div>
            <Progress 
              value={sectorData.find(s => s.sector === 'Industry')?.average || 0} 
              className="h-2 bg-blue-100 dark:bg-blue-950" 
            />
          </Card>

          <Card className="p-5 bg-gradient-to-br from-purple-500/10 to-pink-500/5 border-2 border-purple-500/30">
            <div className="flex items-center gap-2 mb-3">
              <Briefcase className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span className="text-sm">Services</span>
            </div>
            <div className="text-3xl text-purple-600 dark:text-purple-400 mb-2">
              {sectorData.find(s => s.sector === 'Services')?.average}%
            </div>
            <Progress 
              value={sectorData.find(s => s.sector === 'Services')?.average || 0} 
              className="h-2 bg-purple-100 dark:bg-purple-950" 
            />
          </Card>

          <Card className="p-5 bg-gradient-to-br from-orange-500/10 to-amber-500/5 border-2 border-orange-500/30">
            <div className="flex items-center gap-2 mb-3">
              <Network className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              <span className="text-sm">Technology</span>
            </div>
            <div className="text-3xl text-orange-600 dark:text-orange-400 mb-2">
              {sectorData.find(s => s.sector === 'Tech')?.average}%
            </div>
            <Progress 
              value={sectorData.find(s => s.sector === 'Tech')?.average || 0} 
              className="h-2 bg-orange-100 dark:bg-orange-950" 
            />
          </Card>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart data={sectorData} layout="vertical">
              <defs>
                <linearGradient id="sectorGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="5%" stopColor="#A855F7" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#EC4899" stopOpacity={0.5}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(251, 191, 36, 0.1)" />
              <XAxis type="number" stroke="rgba(251, 191, 36, 0.5)" />
              <YAxis dataKey="sector" type="category" stroke="rgba(251, 191, 36, 0.5)" />
              <RechartsTooltip
                contentStyle={{
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  border: '1px solid rgba(251, 191, 36, 0.3)',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="average" fill="url(#sectorGradient)" radius={[0, 8, 8, 0]} />
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Top Performers List */}
      <Card className="p-6 bg-gradient-to-br from-white/95 to-yellow-50/50 dark:from-zinc-900/95 dark:to-yellow-950/20 border-2 border-yellow-200/50 dark:border-yellow-700/30">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center shadow-lg">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
              Top Performing Districts
            </h3>
            <p className="text-sm text-muted-foreground">Track leading districts across categories</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Category:</span>
            <div className="flex gap-1">
              {['all', 'Large Cap', 'Mid Cap', 'Small Cap'].map((cat) => (
                <Button
                  key={cat}
                  variant="outline"
                  size="sm"
                  onClick={() => setCategoryFilter(cat as any)}
                  className={`h-8 text-xs ${
                    categoryFilter === cat
                      ? 'bg-yellow-500/20 border-yellow-500/50 text-yellow-600 dark:text-yellow-400'
                      : 'border-yellow-500/20 hover:bg-yellow-500/10'
                  }`}
                >
                  {cat === 'all' ? 'All' : cat}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Region:</span>
            <div className="flex gap-1 flex-wrap">
              {['all', ...regionalData.map(r => r.region)].map((region) => (
                <Button
                  key={region}
                  variant="outline"
                  size="sm"
                  onClick={() => setRegionFilter(region)}
                  className={`h-8 text-xs ${
                    regionFilter === region
                      ? 'bg-amber-500/20 border-amber-500/50 text-amber-600 dark:text-amber-400'
                      : 'border-amber-500/20 hover:bg-amber-500/10'
                  }`}
                >
                  {region === 'all' ? 'All' : region}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6 bg-amber-100/50 dark:bg-amber-950/30 h-12">
            <TabsTrigger 
              value="gainers" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-green-600 data-[state=active]:text-white"
            >
              <TrendingUp className="w-4 h-4 mr-1.5" />
              <span className="hidden sm:inline">Top </span>Gainers
            </TabsTrigger>
            <TabsTrigger 
              value="losers" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-red-600 data-[state=active]:text-white"
            >
              <TrendingDown className="w-4 h-4 mr-1.5" />
              <span className="hidden sm:inline">Top </span>Losers
            </TabsTrigger>
            <TabsTrigger 
              value="active" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white"
            >
              <Activity className="w-4 h-4 mr-1.5" />
              <span className="hidden sm:inline">Most </span>Active
            </TabsTrigger>
            <TabsTrigger 
              value="pulse" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-yellow-600 data-[state=active]:text-white"
            >
              <Zap className="w-4 h-4 mr-1.5" />
              <span className="hidden sm:inline">Top </span>Pulse
            </TabsTrigger>
          </TabsList>

          <div className="space-y-2">
            {currentList.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Filter className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No districts match the selected filters</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setCategoryFilter('all');
                    setRegionFilter('all');
                  }}
                  className="mt-3 border-yellow-500/50"
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              currentList.map((district, index) => (
                <div 
                  key={district.id}
                  onClick={() => onDistrictClick?.(district)}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/50 dark:bg-black/20 hover:bg-yellow-100/50 dark:hover:bg-yellow-950/20 transition-all cursor-pointer border border-transparent hover:border-yellow-400/30 group"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {/* Rank Badge */}
                    <div className={`flex items-center justify-center w-10 h-10 rounded-xl font-bold text-sm flex-shrink-0 shadow-md ${
                      index === 0 ? 'bg-gradient-to-br from-yellow-500 to-amber-600 text-white' :
                      index === 1 ? 'bg-gradient-to-br from-gray-400 to-gray-500 text-white' :
                      index === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-500 text-white' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {index === 0 ? <Crown className="w-5 h-5" /> :
                       index === 1 ? <Star className="w-5 h-5" /> :
                       index === 2 ? <Sparkles className="w-5 h-5" /> :
                       index + 1}
                    </div>

                    {/* District Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-semibold truncate group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                          {district.name}
                        </span>
                        {Math.abs(district.change) > 5 && (
                          <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-1.5 py-0.5 text-xs flex items-center gap-1">
                            <Flame className="w-3 h-3" />
                            Hot
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-yellow-600 dark:text-yellow-500" />
                          {district.state}
                        </span>
                        <span>•</span>
                        <Badge variant="outline" className="text-xs px-1.5 py-0 border-yellow-400/50 bg-yellow-100/50 dark:bg-yellow-950/30 text-yellow-700 dark:text-yellow-400">
                          {district.stateCode}
                        </Badge>
                        <Badge className={`text-xs px-1.5 py-0 ${
                          district.category === 'Large Cap' 
                            ? 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400' 
                            : district.category === 'Mid Cap' 
                            ? 'bg-amber-500/20 text-amber-700 dark:text-amber-400' 
                            : 'bg-orange-500/20 text-orange-700 dark:text-orange-400'
                        }`}>
                          {district.category}
                        </Badge>
                        <span>•</span>
                        <span className="text-xs">{district.region}</span>
                      </div>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="flex items-center gap-6 ml-4">
                    <div className="text-right">
                      {activeTab === 'gainers' || activeTab === 'losers' ? (
                        <>
                          <div className={`text-lg font-bold ${district.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                            {district.change >= 0 ? '+' : ''}{district.change.toFixed(2)}%
                          </div>
                          <div className="text-xs text-muted-foreground">₹{district.price.toFixed(2)}</div>
                        </>
                      ) : activeTab === 'active' ? (
                        <>
                          <div className="text-lg font-bold text-blue-600 dark:text-blue-400">₹{(district.volume24h / 100000).toFixed(1)}L</div>
                          <div className="text-xs text-muted-foreground">24h Volume</div>
                        </>
                      ) : (
                        <>
                          <div className="text-lg font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
                            {district.economicPulse}/100
                          </div>
                          <div className="text-xs text-muted-foreground">Economic Pulse</div>
                        </>
                      )}
                    </div>

                    {/* View Icon */}
                    <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-400/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Eye className="w-5 h-5 text-yellow-600 dark:text-yellow-500" />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Tabs>
      </Card>

      {/* Economic Indicators */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 bg-gradient-to-br from-card to-emerald-50/20 dark:to-emerald-950/10 border-2 border-emerald-500/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                Economic Indicators
              </h3>
              <p className="text-sm text-muted-foreground">Average across all districts</p>
            </div>
          </div>

          <div className="space-y-4">
            <Card className="p-4 bg-gradient-to-br from-emerald-500/10 to-green-500/5 border border-emerald-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Average GDP</span>
                <DollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="text-3xl text-emerald-600 dark:text-emerald-400">
                ₹{(marketStats.avgGDP / 1000).toFixed(1)}K Cr
              </div>
              <p className="text-xs text-muted-foreground mt-1">Per district average</p>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-blue-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Average Population</span>
                <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-3xl text-blue-600 dark:text-blue-400">
                {(marketStats.avgPopulation / 100000).toFixed(1)}L
              </div>
              <p className="text-xs text-muted-foreground mt-1">Per district average</p>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/5 border border-purple-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Market Breadth</span>
                <Radio className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="text-sm mb-1">
                    <span className="text-green-600 dark:text-green-400">{marketStats.gainers}</span>
                    <span className="text-muted-foreground"> / </span>
                    <span className="text-red-600 dark:text-red-400">{marketStats.losers}</span>
                  </div>
                  <Progress 
                    value={(marketStats.gainers / (marketStats.gainers + marketStats.losers)) * 100} 
                    className="h-2"
                  />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {((marketStats.gainers / (marketStats.gainers + marketStats.losers)) * 100).toFixed(1)}% advancing
              </p>
            </Card>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-card to-indigo-50/20 dark:to-indigo-950/10 border-2 border-indigo-500/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Key Insights
              </h3>
              <p className="text-sm text-muted-foreground">AI-powered market insights</p>
            </div>
          </div>

          <div className="space-y-3">
            <Card className="p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/5 border-l-4 border-l-green-500">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                <div>
                  <p className="mb-1">
                    <span className="font-semibold text-green-600 dark:text-green-400">{marketStats.gainers}</span> districts showing positive momentum
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {((marketStats.gainers / districts.length) * 100).toFixed(0)}% of the market is advancing today
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border-l-4 border-l-blue-500">
              <div className="flex items-start gap-3">
                <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div>
                  <p className="mb-1">
                    High trading activity with <span className="font-semibold text-blue-600 dark:text-blue-400">₹{(marketStats.totalVolume / 10000000).toFixed(1)}Cr</span> volume
                  </p>
                  <p className="text-sm text-muted-foreground">
                    24-hour trading volume across all districts
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-yellow-500/10 to-amber-500/5 border-l-4 border-l-yellow-500">
              <div className="flex items-start gap-3">
                <Target className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                <div>
                  <p className="mb-1">
                    Market average change: <span className={`font-semibold ${marketStats.avgChange >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {marketStats.avgChange >= 0 ? '+' : ''}{marketStats.avgChange.toFixed(2)}%
                    </span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Overall market sentiment is {marketStats.avgChange >= 0 ? 'positive' : 'negative'}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/5 border-l-4 border-l-purple-500">
              <div className="flex items-start gap-3">
                <PieChart className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                <div>
                  <p className="mb-1">
                    Total market cap: <span className="font-semibold text-purple-600 dark:text-purple-400">₹{(marketStats.totalMarketCap / 100000).toFixed(1)}L Cr</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Combined valuation of all district tokens
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </Card>
      </div>
    </div>
  );
});

MarketPerformance.displayName = 'MarketPerformance';

// Missing imports
import { Filter, Minus } from 'lucide-react';