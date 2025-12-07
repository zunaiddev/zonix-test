/**
 * TradingView Configuration
 * 
 * Configuration for TradingView Charting Library
 */

import { ChartingLibraryWidgetOptions, ResolutionString } from '../types/tradingview.types';

export const TRADINGVIEW_LIBRARY_PATH = import.meta.env.VITE_TRADINGVIEW_LIBRARY_PATH || '/charting_library/';
export const TRADINGVIEW_DATAFEED_URL = import.meta.env.VITE_TRADINGVIEW_DATAFEED_URL || '';

// Supported chart resolutions
export const SUPPORTED_RESOLUTIONS: ResolutionString[] = [
  '1' as ResolutionString,    // 1 minute
  '5' as ResolutionString,    // 5 minutes
  '15' as ResolutionString,   // 15 minutes
  '30' as ResolutionString,   // 30 minutes
  '60' as ResolutionString,   // 1 hour
  '240' as ResolutionString,  // 4 hours
  'D' as ResolutionString,    // 1 day
  'W' as ResolutionString,    // 1 week
  'M' as ResolutionString,    // 1 month
];

// Chart configuration presets
export const CHART_CONFIG = {
  // Light theme (Yellow)
  yellow: {
    theme: 'Light',
    upColor: '#10B981',
    downColor: '#EF4444',
    backgroundColor: '#FFFFFF',
    gridColor: '#F3F4F6',
    textColor: '#1F2937',
    accentColor: '#FBBF24',
  },
  // Dark theme
  dark: {
    theme: 'Dark',
    upColor: '#10B981',
    downColor: '#EF4444',
    backgroundColor: '#1F2937',
    gridColor: '#374151',
    textColor: '#F9FAFB',
    accentColor: '#FBBF24',
  },
} as const;

/**
 * Get default TradingView widget options
 */
export const getDefaultWidgetOptions = (
  symbol: string,
  theme: 'yellow' | 'green' | 'purple' | 'navy' = 'yellow',
  interval: ResolutionString = 'D' as ResolutionString
): Partial<ChartingLibraryWidgetOptions> => {
  const themeConfig = CHART_CONFIG[theme === 'yellow' ? 'yellow' : 'dark'];

  return {
    symbol,
    interval,
    library_path: TRADINGVIEW_LIBRARY_PATH,
    locale: 'en',
    autosize: true,
    fullscreen: false,
    container: 'tv_chart_container',
    
    // Disable features not needed
    disabled_features: [
      'use_localstorage_for_settings',
      'volume_force_overlay',
      'header_symbol_search',
      'header_compare',
      'display_market_status',
    ],
    
    // Enable features
    enabled_features: [
      'study_templates',
      'side_toolbar_in_fullscreen_mode',
      'header_in_fullscreen_mode',
    ],
    
    // Chart settings
    theme: themeConfig.theme as 'Light' | 'Dark',
    custom_css_url: '/tradingview-custom.css',
    
    // Overrides for chart appearance
    overrides: {
      'mainSeriesProperties.candleStyle.upColor': themeConfig.upColor,
      'mainSeriesProperties.candleStyle.downColor': themeConfig.downColor,
      'mainSeriesProperties.candleStyle.borderUpColor': themeConfig.upColor,
      'mainSeriesProperties.candleStyle.borderDownColor': themeConfig.downColor,
      'mainSeriesProperties.candleStyle.wickUpColor': themeConfig.upColor,
      'mainSeriesProperties.candleStyle.wickDownColor': themeConfig.downColor,
      
      'paneProperties.background': themeConfig.backgroundColor,
      'paneProperties.backgroundType': 'solid',
      'paneProperties.vertGridProperties.color': themeConfig.gridColor,
      'paneProperties.horzGridProperties.color': themeConfig.gridColor,
      
      'scalesProperties.textColor': themeConfig.textColor,
      'scalesProperties.lineColor': themeConfig.gridColor,
    },
    
    // Studies (indicators) overrides
    studies_overrides: {
      'volume.volume.color.0': themeConfig.downColor,
      'volume.volume.color.1': themeConfig.upColor,
      'volume.volume.transparency': 50,
    },
    
    // Loading screen
    loading_screen: {
      backgroundColor: themeConfig.backgroundColor,
      foregroundColor: themeConfig.accentColor,
    },
    
    // Timezone
    timezone: 'Asia/Kolkata',
    
    // Time frames
    time_frames: [
      { text: '1D', resolution: '1' as ResolutionString, description: '1 Day', title: '1D' },
      { text: '5D', resolution: '5' as ResolutionString, description: '5 Days', title: '5D' },
      { text: '1M', resolution: '60' as ResolutionString, description: '1 Month', title: '1M' },
      { text: '3M', resolution: '240' as ResolutionString, description: '3 Months', title: '3M' },
      { text: '6M', resolution: 'D' as ResolutionString, description: '6 Months', title: '6M' },
      { text: '1Y', resolution: 'D' as ResolutionString, description: '1 Year', title: '1Y' },
      { text: 'ALL', resolution: 'D' as ResolutionString, description: 'All', title: 'ALL' },
    ],
  };
};

/**
 * Chart style presets
 */
export const CHART_STYLES = {
  CANDLESTICK: 1,
  BAR: 0,
  LINE: 2,
  AREA: 3,
  HEIKIN_ASHI: 8,
  HOLLOW_CANDLES: 9,
} as const;

/**
 * Default indicators/studies
 */
export const DEFAULT_STUDIES = [
  {
    id: 'MASimple@tv-basicstudies',
    inputs: { length: 20 },
  },
  {
    id: 'MASimple@tv-basicstudies',
    inputs: { length: 50 },
  },
  {
    id: 'Volume@tv-basicstudies',
    inputs: {},
  },
] as const;

/**
 * Session times (Indian Market)
 */
export const SESSION_CONFIG = {
  regular: '0915-1530',
  premarket: '0900-0915',
  postmarket: '1530-1600',
} as const;

/**
 * Chart intervals mapping
 */
export const INTERVAL_MAP = {
  '1m': '1' as ResolutionString,
  '5m': '5' as ResolutionString,
  '15m': '15' as ResolutionString,
  '30m': '30' as ResolutionString,
  '1h': '60' as ResolutionString,
  '4h': '240' as ResolutionString,
  '1d': 'D' as ResolutionString,
  '1w': 'W' as ResolutionString,
  '1M': 'M' as ResolutionString,
} as const;
