import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import {
  X,
  Maximize2,
  Download,
  Share2,
  Settings,
  TrendingUp,
  TrendingDown,
  Activity,
  BarChart3,
  LineChart,
  CandlestickChart,
  AreaChart as AreaChartIcon,
  Bookmark,
  Bell,
} from 'lucide-react';

interface TradingViewChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  symbol: string;
  assetName: string;
  assetType: 'district' | 'state' | 'ut';
  currentPrice: number;
  change: number;
  themeColor?: string;
}

export function TradingViewChartModal({
  isOpen,
  onClose,
  symbol,
  assetName,
  assetType,
  currentPrice,
  change,
  themeColor = 'yellow',
}: TradingViewChartModalProps) {
  const [chartInterval, setChartInterval] = useState('1D');
  const [chartType, setChartType] = useState('candlestick');

  const getThemeColors = () => {
    switch (themeColor) {
      case 'green':
        return {
          primary: 'text-green-600 dark:text-green-400',
          bg: 'bg-green-500/10',
          border: 'border-green-500/30',
          gradient: 'from-green-500 to-emerald-600',
        };
      case 'purple':
        return {
          primary: 'text-purple-600 dark:text-purple-400',
          bg: 'bg-purple-500/10',
          border: 'border-purple-500/30',
          gradient: 'from-purple-500 to-purple-600',
        };
      case 'navy':
        return {
          primary: 'text-blue-600 dark:text-blue-400',
          bg: 'bg-blue-500/10',
          border: 'border-blue-500/30',
          gradient: 'from-blue-500 to-blue-600',
        };
      default:
        return {
          primary: 'text-yellow-600 dark:text-yellow-400',
          bg: 'bg-yellow-500/10',
          border: 'border-yellow-500/30',
          gradient: 'from-yellow-500 to-amber-600',
        };
    }
  };

  const theme = getThemeColors();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] w-full h-full p-0 gap-0 overflow-hidden">
        {/* Header */}
        <div className={`relative border-b ${theme.border} bg-gradient-to-r ${theme.bg} p-6`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center shadow-lg`}>
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <DialogTitle className={`text-2xl bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
                  {assetName} - Full Chart
                </DialogTitle>
                <DialogDescription className="flex items-center gap-2 mt-1">
                  <span className="text-sm">{symbol}</span>
                  <Badge className={`${theme.bg} ${theme.primary} ${theme.border} text-xs`}>
                    {assetType === 'district' ? 'District Token' : assetType === 'state' ? 'State Index' : 'Union Territory'}
                  </Badge>
                </DialogDescription>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-2">
              <div className="mr-4">
                <div className="text-3xl font-bold">{currentPrice.toFixed(2)}</div>
                <div className={`flex items-center gap-1 ${change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  <span className="font-semibold">{change >= 0 ? '+' : ''}{change.toFixed(2)}%</span>
                </div>
              </div>
              
              <Button size="sm" variant="outline" className={`${theme.border}`}>
                <Bookmark className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" className={`${theme.border}`}>
                <Bell className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" className={`${theme.border}`}>
                <Share2 className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" className={`${theme.border}`}>
                <Download className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" className={`${theme.border}`}>
                <Settings className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Chart Controls */}
          <div className="flex items-center gap-4 mt-4">
            {/* Interval Selector */}
            <Tabs value={chartInterval} onValueChange={setChartInterval}>
              <TabsList className="bg-muted/50 border border-border">
                <TabsTrigger value="1m" className={`data-[state=active]:bg-gradient-to-r data-[state=active]:${theme.gradient} data-[state=active]:text-white`}>1m</TabsTrigger>
                <TabsTrigger value="5m" className={`data-[state=active]:bg-gradient-to-r data-[state=active]:${theme.gradient} data-[state=active]:text-white`}>5m</TabsTrigger>
                <TabsTrigger value="15m" className={`data-[state=active]:bg-gradient-to-r data-[state=active]:${theme.gradient} data-[state=active]:text-white`}>15m</TabsTrigger>
                <TabsTrigger value="1h" className={`data-[state=active]:bg-gradient-to-r data-[state=active]:${theme.gradient} data-[state=active]:text-white`}>1H</TabsTrigger>
                <TabsTrigger value="1D" className={`data-[state=active]:bg-gradient-to-r data-[state=active]:${theme.gradient} data-[state=active]:text-white`}>1D</TabsTrigger>
                <TabsTrigger value="1W" className={`data-[state=active]:bg-gradient-to-r data-[state=active]:${theme.gradient} data-[state=active]:text-white`}>1W</TabsTrigger>
                <TabsTrigger value="1M" className={`data-[state=active]:bg-gradient-to-r data-[state=active]:${theme.gradient} data-[state=active]:text-white`}>1M</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Chart Type Selector */}
            <Tabs value={chartType} onValueChange={setChartType}>
              <TabsList className="bg-muted/50 border border-border">
                <TabsTrigger value="candlestick" className={`data-[state=active]:bg-gradient-to-r data-[state=active]:${theme.gradient} data-[state=active]:text-white`}>
                  <CandlestickChart className="w-4 h-4" />
                </TabsTrigger>
                <TabsTrigger value="line" className={`data-[state=active]:bg-gradient-to-r data-[state=active]:${theme.gradient} data-[state=active]:text-white`}>
                  <LineChart className="w-4 h-4" />
                </TabsTrigger>
                <TabsTrigger value="area" className={`data-[state=active]:bg-gradient-to-r data-[state=active]:${theme.gradient} data-[state=active]:text-white`}>
                  <AreaChartIcon className="w-4 h-4" />
                </TabsTrigger>
                <TabsTrigger value="bars" className={`data-[state=active]:bg-gradient-to-r data-[state=active]:${theme.gradient} data-[state=active]:text-white`}>
                  <BarChart3 className="w-4 h-4" />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* TradingView Chart Container */}
        <div className="flex-1 p-6 bg-gradient-to-br from-background to-muted/20">
          <div className="w-full h-full rounded-xl border-2 border-border bg-card/80 backdrop-blur-xl overflow-hidden">
            {/* Integration Instructions for TradingView */}
            <div className="w-full h-full flex items-center justify-center p-12">
              <div className="text-center max-w-2xl">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center mx-auto mb-6 shadow-2xl`}>
                  <BarChart3 className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">TradingView Chart Integration Ready</h3>
                <p className="text-muted-foreground mb-6">
                  This component is ready to integrate with TradingView Charting Library.
                </p>
                <div className="bg-muted/50 rounded-xl p-6 text-left space-y-3">
                  <p className="text-sm">
                    <span className={`font-semibold ${theme.primary}`}>Asset:</span> {assetName} ({symbol})
                  </p>
                  <p className="text-sm">
                    <span className={`font-semibold ${theme.primary}`}>Type:</span> {assetType}
                  </p>
                  <p className="text-sm">
                    <span className={`font-semibold ${theme.primary}`}>Interval:</span> {chartInterval}
                  </p>
                  <p className="text-sm">
                    <span className={`font-semibold ${theme.primary}`}>Chart Type:</span> {chartType}
                  </p>
                  <div className="pt-4 border-t border-border mt-4">
                    <p className="text-xs text-muted-foreground">
                      To integrate: Import TradingViewChart component and replace this placeholder with:
                    </p>
                    <code className={`block mt-2 p-3 rounded-lg ${theme.bg} text-xs`}>
                      {`<TradingViewChart
  symbol="${symbol}"
  assetType="${assetType === 'district' ? 'district' : 'state_etf'}"
  theme="${themeColor}"
  interval="${chartInterval}"
  height="100%"
/>`}
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
