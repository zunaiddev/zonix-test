/**
 * TradingView Types
 * 
 * Type definitions for TradingView Charting Library
 */

// Basic TradingView types
export type ResolutionString = string;

export interface ChartingLibraryWidgetOptions {
  symbol: string;
  datafeed: any;
  interval: ResolutionString;
  container: string | HTMLElement;
  library_path: string;
  locale: string;
  disabled_features?: string[];
  enabled_features?: string[];
  charts_storage_url?: string;
  charts_storage_api_version?: string;
  client_id?: string;
  user_id?: string;
  fullscreen?: boolean;
  autosize?: boolean;
  studies_overrides?: any;
  theme?: 'Light' | 'Dark';
  custom_css_url?: string;
  overrides?: any;
  loading_screen?: {
    backgroundColor?: string;
    foregroundColor?: string;
  };
  favorites?: {
    intervals?: ResolutionString[];
    chartTypes?: string[];
  };
  timezone?: string;
  time_frames?: Array<{
    text: string;
    resolution: ResolutionString;
    description: string;
    title: string;
  }>;
}

export interface Bar {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

export interface LibrarySymbolInfo {
  name: string;
  ticker?: string;
  description: string;
  type: string;
  session: string;
  exchange: string;
  listed_exchange?: string;
  timezone: string;
  format?: string;
  pricescale: number;
  minmov: number;
  fractional?: boolean;
  has_intraday?: boolean;
  has_no_volume?: boolean;
  has_weekly_and_monthly?: boolean;
  supported_resolutions: ResolutionString[];
  volume_precision?: number;
  data_status?: string;
  expired?: boolean;
  expiration_date?: number;
  sector?: string;
  industry?: string;
  currency_code?: string;
}

export interface DatafeedConfiguration {
  supported_resolutions: ResolutionString[];
  exchanges?: Array<{
    value: string;
    name: string;
    desc: string;
  }>;
  symbols_types?: Array<{
    name: string;
    value: string;
  }>;
  supports_marks?: boolean;
  supports_timescale_marks?: boolean;
  supports_time?: boolean;
}

export interface ResolveSymbolResponse extends LibrarySymbolInfo {}

export interface HistoryMetadata {
  noData: boolean;
  nextTime?: number;
}

export interface SubscribeBarsCallback {
  (bar: Bar): void;
}

export interface IBasicDataFeed {
  onReady: (callback: (configuration: DatafeedConfiguration) => void) => void;
  searchSymbols: (
    userInput: string,
    exchange: string,
    symbolType: string,
    onResult: (items: any[]) => void
  ) => void;
  resolveSymbol: (
    symbolName: string,
    onResolve: (symbolInfo: LibrarySymbolInfo) => void,
    onError: (reason: string) => void,
    extension?: any
  ) => void;
  getBars: (
    symbolInfo: LibrarySymbolInfo,
    resolution: ResolutionString,
    periodParams: {
      from: number;
      to: number;
      firstDataRequest: boolean;
      countBack?: number;
    },
    onResult: (bars: Bar[], meta: HistoryMetadata) => void,
    onError: (reason: string) => void
  ) => void;
  subscribeBars: (
    symbolInfo: LibrarySymbolInfo,
    resolution: ResolutionString,
    onTick: SubscribeBarsCallback,
    listenerGuid: string,
    onResetCacheNeededCallback: () => void
  ) => void;
  unsubscribeBars: (listenerGuid: string) => void;
}

export interface TradingViewWidget {
  onChartReady: (callback: () => void) => void;
  headerReady: () => Promise<void>;
  chart: () => IChartWidgetApi;
  remove: () => void;
  setSymbol: (symbol: string, interval: ResolutionString, callback: () => void) => void;
}

export interface IChartWidgetApi {
  setSymbol: (symbol: string, interval?: ResolutionString, callback?: () => void) => void;
  setResolution: (resolution: ResolutionString, callback?: () => void) => void;
  resetData: () => void;
  setChartType: (type: number) => void;
  createStudy: (
    name: string,
    forceOverlay: boolean,
    lock: boolean,
    inputs?: any[],
    overrides?: any,
    options?: any
  ) => Promise<string>;
  removeAllStudies: () => void;
  takeScreenshot: () => void;
  lockAllDrawingTools: () => void;
  unlockAllDrawingTools: () => void;
}

export interface TradingViewDatafeedOptions {
  symbol: string;
  assetType: 'district' | 'state_etf' | 'mutual_fund';
  apiEndpoint?: string;
}
