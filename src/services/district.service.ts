// ============================================================================
// ZONIX Trading Platform - District Token Service
// API service for district token operations
// ============================================================================

import { httpClient } from './api.service';
import { API_ENDPOINTS, shouldUseMockData } from '../config/api.config';
import { 
  DistrictToken, 
  DistrictChartData, 
  DistrictStats, 
  APIResponse,
  PaginatedResponse,
} from '../types';
import { districtsData } from '../utils/mockData';

// ============================================================================
// DISTRICT SERVICE
// ============================================================================

class DistrictService {
  /**
   * Get all district tokens with pagination
   */
  async getDistricts(params?: {
    page?: number;
    pageSize?: number;
    state?: string;
    sortBy?: 'name' | 'price' | 'change' | 'volume';
    sortOrder?: 'asc' | 'desc';
  }): Promise<APIResponse<PaginatedResponse<DistrictToken>>> {
    if (shouldUseMockData()) {
      return this.getMockDistricts(params);
    }
    
    return httpClient.get(API_ENDPOINTS.DISTRICTS.LIST, { params });
  }

  /**
   * Get district token by ID
   */
  async getDistrictById(id: string): Promise<APIResponse<DistrictToken>> {
    if (shouldUseMockData()) {
      return this.getMockDistrictById(id);
    }
    
    return httpClient.get(API_ENDPOINTS.DISTRICTS.DETAIL(id));
  }

  /**
   * Get district chart data
   */
  async getDistrictChart(
    id: string,
    params?: {
      timeframe?: '1D' | '1W' | '1M' | '3M' | '6M' | '1Y' | 'ALL';
      interval?: '1m' | '5m' | '15m' | '1h' | '4h' | '1D' | '1W';
    }
  ): Promise<APIResponse<DistrictChartData[]>> {
    if (shouldUseMockData()) {
      return this.getMockChartData(id, params?.timeframe || '1M');
    }
    
    return httpClient.get(API_ENDPOINTS.DISTRICTS.CHART(id), { params });
  }

  /**
   * Get district statistics
   */
  async getDistrictStats(): Promise<APIResponse<DistrictStats>> {
    if (shouldUseMockData()) {
      return this.getMockDistrictStats();
    }
    
    return httpClient.get(API_ENDPOINTS.DISTRICTS.STATS);
  }

  /**
   * Search districts
   */
  async searchDistricts(query: string): Promise<APIResponse<DistrictToken[]>> {
    if (shouldUseMockData()) {
      return this.getMockSearchResults(query);
    }
    
    return httpClient.get(API_ENDPOINTS.DISTRICTS.SEARCH, { 
      params: { q: query } 
    });
  }

  /**
   * Get trending districts
   */
  async getTrendingDistricts(limit = 10): Promise<APIResponse<DistrictToken[]>> {
    if (shouldUseMockData()) {
      return this.getMockTrendingDistricts(limit);
    }
    
    return httpClient.get(API_ENDPOINTS.DISTRICTS.TRENDING, { 
      params: { limit } 
    });
  }

  // ============================================================================
  // MOCK DATA METHODS
  // ============================================================================

  private async getMockDistricts(params?: any): Promise<APIResponse<PaginatedResponse<DistrictToken>>> {
    const page = params?.page || 1;
    const pageSize = params?.pageSize || 20;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    let districts = [...districtsData];

    // Filter by state
    if (params?.state) {
      districts = districts.filter(d => d.stateName === params.state);
    }

    // Sort
    if (params?.sortBy) {
      districts.sort((a, b) => {
        let comparison = 0;
        switch (params.sortBy) {
          case 'name':
            comparison = a.districtName.localeCompare(b.districtName);
            break;
          case 'price':
            comparison = a.currentPrice - b.currentPrice;
            break;
          case 'change':
            comparison = a.changePercent24h - b.changePercent24h;
            break;
          case 'volume':
            comparison = a.volume24h - b.volume24h;
            break;
        }
        return params.sortOrder === 'desc' ? -comparison : comparison;
      });
    }

    const items = districts.slice(startIndex, endIndex);

    return {
      success: true,
      data: {
        items,
        page,
        pageSize,
        totalPages: Math.ceil(districts.length / pageSize),
        totalItems: districts.length,
        hasMore: endIndex < districts.length,
      },
    };
  }

  private async getMockDistrictById(id: string): Promise<APIResponse<DistrictToken>> {
    const district = districtsData.find(d => d.code === id || d.id === id);
    
    if (!district) {
      return {
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'District not found',
        },
      };
    }

    return {
      success: true,
      data: district,
    };
  }

  private async getMockChartData(
    id: string,
    timeframe: string
  ): Promise<APIResponse<DistrictChartData[]>> {
    // Generate mock chart data
    const now = Date.now();
    const intervals: Record<string, number> = {
      '1D': 24 * 60,
      '1W': 7 * 24 * 60,
      '1M': 30 * 24 * 60,
      '3M': 90 * 24 * 60,
      '6M': 180 * 24 * 60,
      '1Y': 365 * 24 * 60,
      'ALL': 730 * 24 * 60,
    };

    const minutes = intervals[timeframe] || 30 * 24 * 60;
    const dataPoints = Math.min(minutes / 5, 500); // Max 500 points
    const interval = (minutes * 60 * 1000) / dataPoints;

    const district = districtsData.find(d => d.code === id || d.id === id);
    const basePrice = district?.currentPrice || 1000;

    const data: DistrictChartData[] = [];
    let price = basePrice * 0.9;

    for (let i = 0; i < dataPoints; i++) {
      const timestamp = now - (dataPoints - i) * interval;
      const change = (Math.random() - 0.5) * basePrice * 0.02;
      price = Math.max(price + change, basePrice * 0.7);
      
      const high = price * (1 + Math.random() * 0.01);
      const low = price * (1 - Math.random() * 0.01);
      const close = low + Math.random() * (high - low);

      data.push({
        timestamp,
        open: price,
        high,
        low,
        close,
        volume: Math.random() * 1000000,
      });

      price = close;
    }

    return {
      success: true,
      data,
    };
  }

  private async getMockDistrictStats(): Promise<APIResponse<DistrictStats>> {
    const totalMarketCap = districtsData.reduce((sum, d) => sum + d.marketCap, 0);
    const totalVolume24h = districtsData.reduce((sum, d) => sum + d.volume24h, 0);
    const avgGrowth = districtsData.reduce((sum, d) => sum + d.changePercent24h, 0) / districtsData.length;

    const sorted = [...districtsData].sort((a, b) => b.changePercent24h - a.changePercent24h);
    
    return {
      success: true,
      data: {
        totalMarketCap,
        totalVolume24h,
        avgGrowth,
        topGainer: sorted[0],
        topLoser: sorted[sorted.length - 1],
      },
    };
  }

  private async getMockSearchResults(query: string): Promise<APIResponse<DistrictToken[]>> {
    const lowerQuery = query.toLowerCase();
    const results = districtsData.filter(d => 
      d.districtName.toLowerCase().includes(lowerQuery) ||
      d.stateName.toLowerCase().includes(lowerQuery) ||
      d.code.toLowerCase().includes(lowerQuery)
    );

    return {
      success: true,
      data: results.slice(0, 10),
    };
  }

  private async getMockTrendingDistricts(limit: number): Promise<APIResponse<DistrictToken[]>> {
    const trending = [...districtsData]
      .sort((a, b) => b.volume24h - a.volume24h)
      .slice(0, limit);

    return {
      success: true,
      data: trending,
    };
  }
}

// ============================================================================
// EXPORT SINGLETON INSTANCE
// ============================================================================

export const districtService = new DistrictService();
export default districtService;
