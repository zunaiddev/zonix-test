import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Zap, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { generateDistrictTokens, DistrictToken } from '../utils/mockData';

export function LiveTicker() {
  const [tickers, setTickers] = useState<DistrictToken[]>(generateDistrictTokens(15));
  const [tickerPosition, setTickerPosition] = useState(0);

  // Simulate live price updates
  useEffect(() => {
    const priceUpdateInterval = setInterval(() => {
      setTickers(prev => prev.map(ticker => ({
        ...ticker,
        price: ticker.price + (Math.random() - 0.5) * 100,
        change: ticker.change + (Math.random() - 0.5) * 0.3,
      })));
    }, 2000);

    return () => clearInterval(priceUpdateInterval);
  }, []);

  // Animate ticker scrolling
  useEffect(() => {
    const scrollInterval = setInterval(() => {
      setTickerPosition(prev => prev - 1);
    }, 50);

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900 via-black to-gray-900 dark:from-gray-950 dark:via-black dark:to-gray-950 text-white border-b-2 border-yellow-400/40 overflow-hidden h-12 shadow-xl">
      <div className="flex items-center h-full">
        {/* LIVE Badge */}
        <div className="px-5 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black flex items-center gap-2 h-full shrink-0 shadow-lg">
          <div className="relative">
            <Zap className="w-4 h-4 animate-pulse" />
            <div className="absolute inset-0 bg-yellow-300 blur-sm opacity-50"></div>
          </div>
          <span className="text-sm font-black tracking-wide">LIVE</span>
        </div>

        {/* Market Status */}
        <div className="px-5 bg-green-600/20 border-r border-green-400/30 flex items-center gap-2 h-full shrink-0">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
          <span className="text-xs font-bold text-green-400">MARKETS OPEN</span>
        </div>

        {/* Scrolling Tickers */}
        <div 
          className="flex items-center gap-10 px-6 whitespace-nowrap"
          style={{ transform: `translateX(${tickerPosition}px)` }}
        >
          {[...tickers, ...tickers, ...tickers].map((ticker, index) => (
            <div key={`${ticker.id}-${index}`} className="flex items-center gap-4 px-4 py-2 bg-white/5 rounded-lg border border-white/10">
              <span className="text-sm font-bold text-gray-200">{ticker.name}</span>
              <span className="text-sm font-black text-yellow-400">₹{ticker.price.toFixed(0)}</span>
              <span className={`text-xs font-bold flex items-center gap-1.5 px-2 py-1 rounded-md ${
                ticker.change >= 0 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-red-500/20 text-red-400'
              }`}>
                {ticker.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {ticker.change >= 0 ? '+' : ''}{ticker.change.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
