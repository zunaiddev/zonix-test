/**
 * useDistricts Hook
 * 
 * Custom hook for district data fetching
 */

import { useState, useEffect, useCallback } from 'react';
import { District, DistrictDetail, ChartDataPoint, ChartDataRequest } from '../types/api.types';
import * as districtService from '../services/district.service';

interface UseDistrictsReturn {
  districts: District[];
  isLoading: boolean;
  error: string | null;
  fetchDistricts: (filters?: any) => Promise<void>;
  searchDistricts: (query: string) => Promise<District[]>;
  clearError: () => void;
}

export const useDistricts = (): UseDistrictsReturn => {
  const [districts, setDistricts] = useState<District[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all districts
  const fetchDistricts = useCallback(async (filters?: any) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await districtService.getDistricts(filters);
      setDistricts(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch districts');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Search districts
  const searchDistricts = useCallback(async (query: string): Promise<District[]> => {
    try {
      setError(null);
      const results = await districtService.searchDistricts(query);
      return results;
    } catch (err: any) {
      setError(err.message || 'Search failed');
      return [];
    }
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    districts,
    isLoading,
    error,
    fetchDistricts,
    searchDistricts,
    clearError,
  };
};

interface UseDistrictDetailReturn {
  district: DistrictDetail | null;
  isLoading: boolean;
  error: string | null;
  fetchDistrict: (id: string) => Promise<void>;
  clearError: () => void;
}

export const useDistrictDetail = (districtId?: string): UseDistrictDetailReturn => {
  const [district, setDistrict] = useState<DistrictDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch district detail
  const fetchDistrict = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await districtService.getDistrictDetail(id);
      setDistrict(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch district details');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Auto-fetch on mount if districtId provided
  useEffect(() => {
    if (districtId) {
      fetchDistrict(districtId);
    }
  }, [districtId, fetchDistrict]);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    district,
    isLoading,
    error,
    fetchDistrict,
    clearError,
  };
};

interface UseChartDataReturn {
  chartData: ChartDataPoint[];
  isLoading: boolean;
  error: string | null;
  fetchChartData: (districtId: string, request: ChartDataRequest) => Promise<void>;
  clearError: () => void;
}

export const useChartData = (): UseChartDataReturn => {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch chart data
  const fetchChartData = useCallback(async (districtId: string, request: ChartDataRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await districtService.getChartData(districtId, request);
      setChartData(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch chart data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    chartData,
    isLoading,
    error,
    fetchChartData,
    clearError,
  };
};
