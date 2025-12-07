/**
 * TradingView Chart Component
 * 
 * React component wrapper for TradingView Charting Library
 */

import React, { useEffect, useRef, useState } from 'react';
import { createDatafeed } from './TradingViewDatafeed';
import { getDefaultWidgetOptions, CHART_STYLES } from '../../config/tradingview.config';
import { TradingViewWidget, ResolutionString } from '../../types/tradingview.types';
import { AlertCircle } from 'lucide-react';

interface TradingViewChartProps {
  symbol: string;
  assetType: 'district' | 'state_etf' | 'mutual_fund';
  theme?: 'yellow' | 'green' | 'purple' | 'navy';
  interval?: ResolutionString;
  height?: string | number;
  autosize?: boolean;
  className?: string;
  onReady?: () => void;
}

export const TradingViewChart: React.FC<TradingViewChartProps> = ({
  symbol,
  assetType,
  theme = 'yellow',
  interval = 'D' as ResolutionString,
  height = '500px',
  autosize = true,
  className = '',
  onReady,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<TradingViewWidget | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if TradingView library is available
    if (typeof window === 'undefined' || !(window as any).TradingView) {
      setError('TradingView library not loaded. Please ensure charting_library is available.');
      setIsLoading(false);
      return;
    }

    // Clean up previous widget
    if (widgetRef.current) {
      try {
        widgetRef.current.remove();
      } catch (e) {
        console.warn('Error removing previous widget:', e);
      }
      widgetRef.current = null;
    }

    // Initialize datafeed
    const datafeed = createDatafeed({
      symbol,
      assetType,
    });

    // Get default widget options
    const widgetOptions = getDefaultWidgetOptions(symbol, theme, interval);

    try {
      // Create TradingView widget
      const widget = new (window as any).TradingView.widget({
        ...widgetOptions,
        container: containerRef.current,
        datafeed,
        autosize,
      });

      widget.onChartReady(() => {
        setIsLoading(false);
        console.log('TradingView chart ready');
        
        if (onReady) {
          onReady();
        }
      });

      widgetRef.current = widget;
    } catch (err) {
      console.error('Error initializing TradingView widget:', err);
      setError('Failed to initialize chart. Please try again.');
      setIsLoading(false);
    }

    // Cleanup
    return () => {
      if (widgetRef.current) {
        try {
          widgetRef.current.remove();
        } catch (e) {
          console.warn('Error during cleanup:', e);
        }
        widgetRef.current = null;
      }
    };
  }, [symbol, assetType, theme, interval, autosize, onReady]);

  // Change symbol
  const changeSymbol = (newSymbol: string, newInterval?: ResolutionString) => {
    if (widgetRef.current) {
      widgetRef.current.setSymbol(
        newSymbol,
        newInterval || interval,
        () => {
          console.log('Symbol changed to:', newSymbol);
        }
      );
    }
  };

  // Change chart type
  const changeChartType = (type: keyof typeof CHART_STYLES) => {
    if (widgetRef.current) {
      widgetRef.current.chart().setChartType(CHART_STYLES[type]);
    }
  };

  // Expose methods
  React.useImperativeHandle(
    containerRef,
    () => ({
      changeSymbol,
      changeChartType,
      widget: widgetRef.current,
    }),
    [interval]
  );

  if (error) {
    return (
      <div
        className={`flex items-center justify-center bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 ${className}`}
        style={{ height: autosize ? '100%' : height }}
      >
        <div className="text-center p-8">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-white/80 mb-2">Chart Error</p>
          <p className="text-white/60 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 z-10"
          style={{ height: autosize ? '100%' : height }}
        >
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-yellow-500/30 border-t-yellow-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white/60 text-sm">Loading chart...</p>
          </div>
        </div>
      )}
      <div
        ref={containerRef}
        id="tv_chart_container"
        className="tradingview-chart"
        style={{
          height: autosize ? '100%' : height,
          width: '100%',
        }}
      />
    </div>
  );
};

export default TradingViewChart;
