import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  ChevronDown, 
  ChevronUp, 
  TrendingUp, 
  TrendingDown,
  Activity,
  BarChart3,
  Globe,
} from 'lucide-react';

interface LiveStatusProps {
  tickers: Array<{
    name: string;
    price: number;
    change: number;
  }>;
}

export function LiveStatus({ tickers }: LiveStatusProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Calculate market stats
  const marketStats = {
    totalVolume: '₹12,450 Cr',
    activeTraders: '24.5K',
    topGainer: tickers.reduce((max, ticker) => ticker.change > max.change ? ticker : max, tickers[0]),
    topLoser: tickers.reduce((min, ticker) => ticker.change < min.change ? ticker : min, tickers[0]),
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-background/95 border-b border-theme-primary/20 shadow-xl">
      <AnimatePresence mode="wait">
        {isCollapsed ? (
          <motion.div
            key="collapsed"
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="flex items-center h-10">
              <button
                onClick={() => setIsCollapsed(false)}
                className="px-5 bg-gradient-to-r from-theme-primary to-theme-primary-dark text-white dark:text-black flex items-center gap-2 h-full hover:from-theme-primary-dark hover:to-theme-primary transition-all shadow-lg shadow-theme-primary/25"
              >
                <Zap className="w-4 h-4 animate-pulse" />
                <span className="text-sm">MARKETS LIVE</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="px-4 text-xs text-muted-foreground flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></span>
                Real-time updates
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="expanded"
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            {/* Main Ticker Bar */}
            <div className="flex items-center h-10 border-b border-theme-primary/10">
              <button
                onClick={() => setIsCollapsed(true)}
                className="px-5 bg-gradient-to-r from-theme-primary to-theme-primary-dark text-white dark:text-black flex items-center gap-2 h-full hover:from-theme-primary-dark hover:to-theme-primary transition-all flex-shrink-0 shadow-lg shadow-theme-primary/25"
              >
                <Zap className="w-4 h-4 animate-pulse" />
                <span className="text-sm">MARKETS LIVE</span>
                <ChevronUp className="w-4 h-4" />
              </button>
              
              {/* Scrolling Tickers */}
              <div className="flex-1 overflow-hidden">
                <motion.div
                  className="flex items-center gap-6 px-4"
                  animate={{ x: [0, -1500] }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                >
                  {[...tickers, ...tickers, ...tickers].map((ticker, index) => (
                    <div key={`${ticker.name}-${index}`} className="flex items-center gap-3 whitespace-nowrap">
                      <span className="text-xs text-muted-foreground">{ticker.name}</span>
                      <span className="text-sm">₹{ticker.price.toFixed(0)}</span>
                      <span className={`text-xs flex items-center gap-1 ${
                        ticker.change >= 0 ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'
                      }`}>
                        {ticker.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {ticker.change >= 0 ? '+' : ''}{ticker.change.toFixed(2)}%
                      </span>
                      <span className="text-muted-foreground/30">|</span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Market Stats Bar */}
            <div className="h-9 backdrop-blur-xl bg-gradient-to-r from-theme-primary/5 via-background/50 to-theme-primary/5">
              <div className="flex items-center h-full px-4 gap-8 text-xs">
                {/* Total Volume */}
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/25">
                    <BarChart3 className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-muted-foreground">Volume:</span>
                  <span>{marketStats.totalVolume}</span>
                </div>

                <div className="w-px h-4 bg-border"></div>

                {/* Active Traders */}
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center shadow-lg shadow-green-500/25">
                    <Activity className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-muted-foreground">Active:</span>
                  <span>{marketStats.activeTraders}</span>
                </div>

                <div className="w-px h-4 bg-border"></div>

                {/* Top Gainer */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-green-500 dark:text-green-400">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span className="text-muted-foreground">Top Gainer:</span>
                  </div>
                  <span>{marketStats.topGainer.name}</span>
                  <span className="text-green-500 dark:text-green-400">+{marketStats.topGainer.change.toFixed(2)}%</span>
                </div>

                <div className="w-px h-4 bg-border"></div>

                {/* Top Loser */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-red-500 dark:text-red-400">
                    <TrendingDown className="w-3.5 h-3.5" />
                    <span className="text-muted-foreground">Top Loser:</span>
                  </div>
                  <span>{marketStats.topLoser.name}</span>
                  <span className="text-red-500 dark:text-red-400">{marketStats.topLoser.change.toFixed(2)}%</span>
                </div>

                <div className="w-px h-4 bg-border"></div>

                {/* Live Indicator */}
                <div className="flex items-center gap-2 ml-auto">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></span>
                  <span className="text-muted-foreground">Real-time • Updates</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}