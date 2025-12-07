import { useState, useMemo, memo } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import {
  Search,
  TrendingUp,
  TrendingDown,
  Activity,
  MapPin,
  Eye,
  Zap,
  Wallet,
  Star,
  Flame,
  Crown,
  Sparkles,
  Filter,
  IndianRupee,
  ChevronRight,
  AlertCircle,
  Target,
  BarChart3,
  Users,
} from 'lucide-react';
import { allIndianDistricts } from '../utils/indiaData';
import { WatchlistIcon } from './WatchlistIcon';

export interface DistrictToken {
  id: string;
  name: string;
  state: string;
  stateCode: string;
  category: 'Small Cap' | 'Mid Cap' | 'Large Cap';
  price: number;
  change: number;
  change7d: number;
  change30d: number;
  volume24h: number;
  gdp: number;
  gdpGrowth: number;
  population: number;
  region: string;
  economicPulse: number;
  sentiment: 'Bullish' | 'Bearish' | 'Neutral';
  aiForecast: number;
  miniChart: number[];
  sectors: {
    agriculture: number;
    industry: number;
    services: number;
    tech: number;
  };
  literacy: number;
  employmentRate: number;
  marketCap: number;
  pe_ratio: number;
  dividend_yield: number;
  topIndustries: string[];
}

interface DistrictBrowserProps {
  districts: DistrictToken[];
  onDistrictClick: (district: DistrictToken) => void;
  onTrade: (type: 'buy' | 'sell', district: DistrictToken) => void;
}

// Optimized District Card Component - Compact Professional Design
const DistrictCard = memo(({ district, onView, onTrade }: {
  district: DistrictToken;
  onView: (district: DistrictToken) => void;
  onTrade: (type: 'buy' | 'sell', district: DistrictToken) => void;
}) => {
  // Simplified mini chart
  const miniChartPath = useMemo(() => {
    const data = district.miniChart;
    const points = data.map((value, i) => {
      const x = (i / (data.length - 1)) * 100;
      const min = Math.min(...data);
      const max = Math.max(...data);
      const y = 100 - ((value - min) / (max - min)) * 80 - 10;
      return `${x},${y}`;
    });
    return `M ${points.join(' L ')}`;
  }, [district.miniChart]);

  // Calculate day high and low (simulated)
  const dayHigh = useMemo(() => district.price * (1 + Math.abs(district.change) / 100), [district.price, district.change]);
  const dayLow = useMemo(() => district.price * (1 - Math.abs(district.change) / 100), [district.price, district.change]);
  const rangePercentage = useMemo(() => {
    const range = dayHigh - dayLow;
    return ((district.price - dayLow) / range) * 100;
  }, [district.price, dayHigh, dayLow]);

  const sentimentColor = useMemo(() => {
    switch (district.sentiment) {
      case 'Bullish': return 'text-green-600 dark:text-green-400 bg-green-500/10 border-green-500/30';
      case 'Bearish': return 'text-red-600 dark:text-red-400 bg-red-500/10 border-red-500/30';
      default: return 'text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/30';
    }
  }, [district.sentiment]);

  return (
    <Card 
      className="group relative backdrop-blur-xl bg-gradient-to-br from-white/95 to-amber-50/80 dark:from-zinc-900/95 dark:to-yellow-950/30 border-2 border-amber-200/50 dark:border-amber-700/30 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-300 hover:-translate-y-1"
    >
      {/* Top Accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600"></div>

      {/* Watchlist Icon in top-right corner */}
      <div 
        className="absolute top-3 right-3 z-30"
        onClick={(e) => e.stopPropagation()}
      >
        <WatchlistIcon
          itemId={district.id}
          itemType="district"
          size={40}
          onToggle={(isAdded) => {
            console.log(`${district.name} ${isAdded ? 'added to' : 'removed from'} watchlist`);
          }}
        />
      </div>

      {/* Header Section */}
      <div className="relative p-4 pb-3 pt-6 border-b border-amber-200/50 dark:border-amber-700/30 bg-gradient-to-br from-amber-50/50 to-transparent dark:from-amber-950/20">
        <div className="flex items-start justify-between mb-2 pr-12">
          <div className="flex items-center gap-1.5 flex-wrap">
            <Badge className={`text-xs px-2 py-0.5 rounded-lg shadow-md ${
              district.category === 'Large Cap' 
                ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white' 
                : district.category === 'Mid Cap' 
                ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-zinc-900' 
                : 'bg-gradient-to-r from-orange-400 to-amber-500 text-white'
            }`}>
              {district.category === 'Large Cap' ? <Crown className="w-3 h-3 mr-1 inline" /> : 
               district.category === 'Mid Cap' ? <Star className="w-3 h-3 mr-1 inline" /> : 
               <Sparkles className="w-3 h-3 mr-1 inline" />}
              {district.category}
            </Badge>
            
            {Math.abs(district.change) > 5 && (
              <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-1.5 py-0.5 rounded-lg text-xs flex items-center gap-1">
                <Flame className="w-3 h-3" />
                HOT
              </Badge>
            )}
          </div>
        </div>

        <h3 className="text-xl mb-1.5 bg-gradient-to-r from-amber-600 to-yellow-600 dark:from-amber-400 dark:to-yellow-400 bg-clip-text text-transparent line-clamp-1">
          {district.name}
        </h3>
        
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="w-3.5 h-3.5 text-amber-600 dark:text-amber-500" />
            <span className="text-xs">{district.state}</span>
          </div>
          <Badge variant="outline" className="text-xs px-2 py-0.5 border-amber-400/50 bg-amber-100/50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400">
            {district.stateCode}
          </Badge>
          <Badge className={`text-xs px-2 py-0.5 rounded-lg border ${sentimentColor}`}>
            {district.sentiment}
          </Badge>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3">
        {/* Price Section - Enhanced */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/15 to-yellow-500/10 border-2 border-amber-400/40 shadow-inner">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50"></div>
              <span className="text-xs text-muted-foreground font-medium">Live Price</span>
            </div>
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg shadow-md ${
              district.change >= 0 
                ? 'bg-green-500/25 text-green-700 dark:text-green-400 border border-green-500/40' 
                : 'bg-red-500/25 text-red-700 dark:text-red-400 border border-red-500/40'
            }`}>
              {district.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span className="text-sm font-semibold">{district.change >= 0 ? '+' : ''}{district.change.toFixed(2)}%</span>
            </div>
          </div>
          
          <div className="text-4xl bg-gradient-to-r from-amber-600 to-yellow-600 dark:from-amber-400 dark:to-yellow-400 bg-clip-text text-transparent tracking-tight mb-3">
            ₹{district.price.toFixed(2)}
          </div>

          {/* Day High/Low Indicator */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-red-600 dark:text-red-400 font-medium">Low: ₹{dayLow.toFixed(2)}</span>
              <span className="text-green-600 dark:text-green-400 font-medium">High: ₹{dayHigh.toFixed(2)}</span>
            </div>
            <div className="relative h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <div
                className="absolute h-full bg-gradient-to-r from-red-400 via-yellow-400 to-green-500 rounded-full"
                style={{ width: '100%' }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-1.5 h-4 bg-white dark:bg-zinc-900 rounded-full shadow-lg border-2 border-amber-500"
                style={{ left: `${rangePercentage}%`, transform: 'translate(-50%, -50%)' }}
              />
            </div>
          </div>
        </div>

        {/* Key Metrics Grid - Compact */}
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center p-2.5 rounded-xl bg-gradient-to-br from-emerald-500/15 to-green-500/10 border border-emerald-400/30 shadow-sm hover:shadow-md transition-shadow">
            <BarChart3 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mx-auto mb-1" />
            <div className="text-xs text-muted-foreground mb-0.5">GDP</div>
            <div className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">₹{(district.gdp / 1000).toFixed(1)}K Cr</div>
          </div>
          <div className="text-center p-2.5 rounded-xl bg-gradient-to-br from-blue-500/15 to-indigo-500/10 border border-blue-400/30 shadow-sm hover:shadow-md transition-shadow">
            <Users className="w-4 h-4 text-blue-600 dark:text-blue-400 mx-auto mb-1" />
            <div className="text-xs text-muted-foreground mb-0.5">Population</div>
            <div className="text-sm font-semibold text-blue-700 dark:text-blue-400">{(district.population / 100000).toFixed(1)}L</div>
          </div>
          <div className="text-center p-2.5 rounded-xl bg-gradient-to-br from-orange-500/15 to-amber-500/10 border border-orange-400/30 shadow-sm hover:shadow-md transition-shadow">
            <Activity className="w-4 h-4 text-orange-600 dark:text-orange-400 mx-auto mb-1" />
            <div className="text-xs text-muted-foreground mb-0.5">Volume</div>
            <div className="text-sm font-semibold text-orange-700 dark:text-orange-400">₹{(district.volume24h / 1000000).toFixed(1)}M</div>
          </div>
        </div>
      </div>

      {/* Action Buttons - Equal 3 Column Layout */}
      <div className="px-4 pb-4">
        <div className="grid grid-cols-3 gap-2">
          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onTrade('buy', district);
            }}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg h-9 shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <TrendingUp className="w-3.5 h-3.5 mr-1" />
            Buy
          </Button>
          
          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onTrade('sell', district);
            }}
            className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white rounded-lg h-9 shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <TrendingDown className="w-3.5 h-3.5 mr-1" />
            Sell
          </Button>
          
          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onView(district);
            }}
            className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white rounded-lg h-9 shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <Eye className="w-3.5 h-3.5 mr-1" />
            Details
          </Button>
        </div>
      </div>
    </Card>
  );
});

DistrictCard.displayName = 'DistrictCard';

export const DistrictBrowser = memo(({ districts, onDistrictClick, onTrade }: DistrictBrowserProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sentimentFilter, setSentimentFilter] = useState<string>('all');
  const [regionFilter, setRegionFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('alphabetical');
  const [displayCount, setDisplayCount] = useState(24);

  const filteredAndSortedDistricts = useMemo(() => {
    let filtered = districts.filter(d => {
      const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           d.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           d.stateCode.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || d.category === categoryFilter;
      const matchesSentiment = sentimentFilter === 'all' || d.sentiment === sentimentFilter;
      const matchesRegion = regionFilter === 'all' || d.region === regionFilter;
      return matchesSearch && matchesCategory && matchesSentiment && matchesRegion;
    });

    switch (sortBy) {
      case 'trending':
        filtered = filtered.sort((a, b) => Math.abs(b.change) - Math.abs(a.change));
        break;
      case 'gainers':
        filtered = filtered.sort((a, b) => b.change - a.change);
        break;
      case 'losers':
        filtered = filtered.sort((a, b) => a.change - b.change);
        break;
      case 'volume':
        filtered = filtered.sort((a, b) => b.volume24h - a.volume24h);
        break;
      case 'pulse':
        filtered = filtered.sort((a, b) => b.economicPulse - a.economicPulse);
        break;
      case 'price-low':
        filtered = filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered = filtered.sort((a, b) => b.price - a.price);
        break;
      case 'alphabetical':
        filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return filtered;
  }, [districts, searchQuery, categoryFilter, sentimentFilter, regionFilter, sortBy]);

  const displayedDistricts = useMemo(() => {
    return filteredAndSortedDistricts.slice(0, displayCount);
  }, [filteredAndSortedDistricts, displayCount]);

  const hasMore = displayCount < filteredAndSortedDistricts.length;

  const loadMore = () => {
    setDisplayCount(prev => Math.min(prev + 24, filteredAndSortedDistricts.length));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center shadow-lg">
          <Target className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-2xl bg-gradient-to-r from-amber-600 to-yellow-600 dark:from-amber-400 dark:to-yellow-400 bg-clip-text text-transparent">
            Browse All Districts
          </h2>
          <p className="text-sm text-muted-foreground">
            Explore and invest in {districts.length} district tokens
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-600 dark:text-amber-500" />
          <Input
            type="text"
            placeholder="Search districts, states, or codes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11 rounded-xl border-2 border-amber-200/50 dark:border-amber-700/30 bg-white/50 dark:bg-black/30 backdrop-blur-xl focus:border-amber-500"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[160px] h-9 rounded-lg border-amber-200/50 dark:border-amber-700/30">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="trending">Trending</SelectItem>
              <SelectItem value="gainers">Top Gainers</SelectItem>
              <SelectItem value="losers">Top Losers</SelectItem>
              <SelectItem value="volume">Volume</SelectItem>
              <SelectItem value="pulse">Economic Pulse</SelectItem>
              <SelectItem value="price-high">Price: High</SelectItem>
              <SelectItem value="price-low">Price: Low</SelectItem>
              <SelectItem value="alphabetical">A-Z</SelectItem>
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[140px] h-9 rounded-lg border-amber-200/50 dark:border-amber-700/30">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Large Cap">Large Cap</SelectItem>
              <SelectItem value="Mid Cap">Mid Cap</SelectItem>
              <SelectItem value="Small Cap">Small Cap</SelectItem>
            </SelectContent>
          </Select>

          <Select value={regionFilter} onValueChange={setRegionFilter}>
            <SelectTrigger className="w-[140px] h-9 rounded-lg border-amber-200/50 dark:border-amber-700/30">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="North">North</SelectItem>
              <SelectItem value="South">South</SelectItem>
              <SelectItem value="East">East</SelectItem>
              <SelectItem value="West">West</SelectItem>
              <SelectItem value="Central">Central</SelectItem>
              <SelectItem value="Northeast">Northeast</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sentimentFilter} onValueChange={setSentimentFilter}>
            <SelectTrigger className="w-[140px] h-9 rounded-lg border-amber-200/50 dark:border-amber-700/30">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sentiments</SelectItem>
              <SelectItem value="Bullish">Bullish</SelectItem>
              <SelectItem value="Neutral">Neutral</SelectItem>
              <SelectItem value="Bearish">Bearish</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-100/50 dark:bg-amber-950/30 border border-amber-300/50 dark:border-amber-700/50 ml-auto">
            <Filter className="w-3.5 h-3.5 text-amber-600 dark:text-amber-500" />
            <span className="text-sm text-amber-700 dark:text-amber-400">
              {filteredAndSortedDistricts.length} Results
            </span>
          </div>
        </div>
      </div>

      {/* Districts Grid */}
      {filteredAndSortedDistricts.length === 0 ? (
        <Card className="p-12 text-center">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <h3 className="text-xl mb-2">No districts found</h3>
          <p className="text-muted-foreground">Try adjusting your filters</p>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedDistricts.map((district) => (
              <DistrictCard
                key={district.id}
                district={district}
                onView={onDistrictClick}
                onTrade={onTrade}
              />
            ))}
          </div>

          {hasMore && (
            <div className="text-center">
              <Button
                onClick={loadMore}
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white rounded-xl px-8 h-12 shadow-lg"
              >
                Load More
                <ChevronRight className="w-4 h-4 ml-2" />
                <span className="ml-1 text-sm opacity-90">({filteredAndSortedDistricts.length - displayCount} more)</span>
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
});

DistrictBrowser.displayName = 'DistrictBrowser';