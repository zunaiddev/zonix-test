/**
 * TradingView Datafeed
 * 
 * Custom datafeed implementation for TradingView Charting Library
 */

import {
  IBasicDataFeed,
  DatafeedConfiguration,
  LibrarySymbolInfo,
  ResolutionString,
  Bar,
  HistoryMetadata,
  SubscribeBarsCallback,
} from '../../types/tradingview.types';
import { ApiClient } from '../../services/api/client';
import { DISTRICT_ENDPOINTS, STATE_ENDPOINTS, MUTUAL_FUND_ENDPOINTS } from '../../constants/api.constants';
import { SUPPORTED_RESOLUTIONS, SESSION_CONFIG } from '../../config/tradingview.config';

interface DatafeedOptions {
  symbol: string;
  assetType: 'district' | 'state_etf' | 'mutual_fund';
}

export class TradingViewDatafeed implements IBasicDataFeed {
  private options: DatafeedOptions;
  private subscribers: Map<string, SubscribeBarsCallback> = new Map();
  private wsConnection: WebSocket | null = null;

  constructor(options: DatafeedOptions) {
    this.options = options;
  }

  /**
   * onReady - Called when the library is ready
   */
  onReady(callback: (configuration: DatafeedConfiguration) => void): void {
    setTimeout(() => {
      callback({
        supported_resolutions: SUPPORTED_RESOLUTIONS,
        exchanges: [
          {
            value: 'ZONIX',
            name: 'ZONIX',
            desc: 'ZONIX Trading Platform',
          },
        ],
        symbols_types: [
          {
            name: 'District Token',
            value: 'district',
          },
          {
            name: 'State ETF',
            value: 'state_etf',
          },
          {
            name: 'Mutual Fund',
            value: 'mutual_fund',
          },
        ],
        supports_marks: false,
        supports_timescale_marks: false,
        supports_time: true,
      });
    }, 0);
  }

  /**
   * searchSymbols - Search for symbols
   */
  searchSymbols(
    userInput: string,
    exchange: string,
    symbolType: string,
    onResult: (items: any[]) => void
  ): void {
    // For now, return empty results
    // Can be implemented to search districts/states/funds
    onResult([]);
  }

  /**
   * resolveSymbol - Get symbol information
   */
  async resolveSymbol(
    symbolName: string,
    onResolve: (symbolInfo: LibrarySymbolInfo) => void,
    onError: (reason: string) => void
  ): Promise<void> {
    try {
      // Fetch symbol information based on asset type
      let symbolInfo: Partial<LibrarySymbolInfo> = {
        name: symbolName,
        ticker: symbolName,
        description: symbolName,
        type: this.options.assetType,
        session: SESSION_CONFIG.regular,
        exchange: 'ZONIX',
        listed_exchange: 'ZONIX',
        timezone: 'Asia/Kolkata',
        format: 'price',
        pricescale: 100,
        minmov: 1,
        has_intraday: true,
        has_no_volume: false,
        has_weekly_and_monthly: true,
        supported_resolutions: SUPPORTED_RESOLUTIONS,
        volume_precision: 2,
        data_status: 'streaming',
      };

      // Fetch additional details from API
      try {
        let detailData: any;
        
        if (this.options.assetType === 'district') {
          detailData = await ApiClient.get(DISTRICT_ENDPOINTS.DETAIL(symbolName));
        } else if (this.options.assetType === 'state_etf') {
          detailData = await ApiClient.get(STATE_ENDPOINTS.DETAIL(symbolName));
        } else if (this.options.assetType === 'mutual_fund') {
          detailData = await ApiClient.get(MUTUAL_FUND_ENDPOINTS.DETAIL(symbolName));
        }

        if (detailData) {
          symbolInfo.description = detailData.name || symbolName;
        }
      } catch (error) {
        console.warn('Failed to fetch symbol details:', error);
      }

      onResolve(symbolInfo as LibrarySymbolInfo);
    } catch (error) {
      onError('Symbol not found');
    }
  }

  /**
   * getBars - Get historical bars
   */
  async getBars(
    symbolInfo: LibrarySymbolInfo,
    resolution: ResolutionString,
    periodParams: {
      from: number;
      to: number;
      firstDataRequest: boolean;
    },
    onResult: (bars: Bar[], meta: HistoryMetadata) => void,
    onError: (reason: string) => void
  ): Promise<void> {
    try {
      const { from, to } = periodParams;
      
      // Determine the endpoint based on asset type
      let endpoint: string;
      if (this.options.assetType === 'district') {
        endpoint = DISTRICT_ENDPOINTS.CHART(this.options.symbol);
      } else if (this.options.assetType === 'state_etf') {
        endpoint = STATE_ENDPOINTS.CHART(this.options.symbol);
      } else {
        endpoint = MUTUAL_FUND_ENDPOINTS.PERFORMANCE(this.options.symbol);
      }

      // Fetch chart data from API
      const data = await ApiClient.get<any>(endpoint, {
        params: {
          from: from * 1000, // Convert to milliseconds
          to: to * 1000,
          resolution,
        },
      });

      // Transform API response to TradingView bars format
      const bars: Bar[] = this.transformDataToBars(data);

      if (bars.length === 0) {
        onResult([], { noData: true });
      } else {
        onResult(bars, { noData: false });
      }
    } catch (error) {
      console.error('Error fetching bars:', error);
      onError('Failed to fetch data');
    }
  }

  /**
   * subscribeBars - Subscribe to real-time updates
   */
  subscribeBars(
    symbolInfo: LibrarySymbolInfo,
    resolution: ResolutionString,
    onTick: SubscribeBarsCallback,
    listenerGuid: string,
    onResetCacheNeededCallback: () => void
  ): void {
    this.subscribers.set(listenerGuid, onTick);
    
    // Initialize WebSocket connection for real-time updates
    this.initializeWebSocket();
  }

  /**
   * unsubscribeBars - Unsubscribe from real-time updates
   */
  unsubscribeBars(listenerGuid: string): void {
    this.subscribers.delete(listenerGuid);
    
    // Close WebSocket if no more subscribers
    if (this.subscribers.size === 0 && this.wsConnection) {
      this.wsConnection.close();
      this.wsConnection = null;
    }
  }

  /**
   * Initialize WebSocket connection for real-time updates
   */
  private initializeWebSocket(): void {
    if (this.wsConnection) return;

    const wsUrl = import.meta.env.VITE_WS_URL;
    if (!wsUrl) return;

    try {
      this.wsConnection = new WebSocket(wsUrl);

      this.wsConnection.onopen = () => {
        console.log('WebSocket connected for TradingView datafeed');
        
        // Subscribe to price updates
        this.wsConnection?.send(
          JSON.stringify({
            event: 'subscribe',
            channels: [`price_${this.options.assetType}_${this.options.symbol}`],
          })
        );
      };

      this.wsConnection.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          
          if (message.event === 'price_update') {
            this.handlePriceUpdate(message.data);
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      this.wsConnection.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      this.wsConnection.onclose = () => {
        console.log('WebSocket disconnected');
        this.wsConnection = null;
        
        // Reconnect if there are still subscribers
        if (this.subscribers.size > 0) {
          setTimeout(() => this.initializeWebSocket(), 5000);
        }
      };
    } catch (error) {
      console.error('Failed to initialize WebSocket:', error);
    }
  }

  /**
   * Handle price update from WebSocket
   */
  private handlePriceUpdate(data: any): void {
    const bar: Bar = {
      time: data.timestamp || Date.now(),
      open: data.open || data.price,
      high: data.high || data.price,
      low: data.low || data.price,
      close: data.close || data.price,
      volume: data.volume || 0,
    };

    // Notify all subscribers
    this.subscribers.forEach((callback) => {
      callback(bar);
    });
  }

  /**
   * Transform API data to TradingView bars format
   */
  private transformDataToBars(data: any): Bar[] {
    if (!data) return [];

    // Handle different API response formats
    if (Array.isArray(data)) {
      return data.map((item: any) => ({
        time: item.timestamp || item.time || item.date,
        open: item.open || item.price,
        high: item.high || item.price,
        low: item.low || item.price,
        close: item.close || item.price,
        volume: item.volume || 0,
      }));
    }

    // If data has a specific structure
    if (data.bars && Array.isArray(data.bars)) {
      return data.bars.map((item: any) => ({
        time: item.timestamp || item.time,
        open: item.open,
        high: item.high,
        low: item.low,
        close: item.close,
        volume: item.volume || 0,
      }));
    }

    // If data has OHLCV arrays
    if (data.timestamps && data.close) {
      return data.timestamps.map((timestamp: number, index: number) => ({
        time: timestamp,
        open: data.open?.[index] || data.close[index],
        high: data.high?.[index] || data.close[index],
        low: data.low?.[index] || data.close[index],
        close: data.close[index],
        volume: data.volume?.[index] || 0,
      }));
    }

    return [];
  }
}

/**
 * Create datafeed instance
 */
export const createDatafeed = (options: DatafeedOptions): IBasicDataFeed => {
  return new TradingViewDatafeed(options);
};
