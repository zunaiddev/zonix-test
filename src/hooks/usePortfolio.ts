/**
 * usePortfolio Hook
 * 
 * Custom hook for portfolio data fetching
 */

import { useState, useEffect, useCallback } from 'react';
import {
  PortfolioOverview,
  Holding,
  Transaction,
  PaginationParams,
  PaginatedResponse,
} from '../types/api.types';
import * as portfolioService from '../services/portfolio.service';

interface UsePortfolioReturn {
  overview: PortfolioOverview | null;
  holdings: Holding[];
  isLoading: boolean;
  error: string | null;
  fetchOverview: () => Promise<void>;
  fetchHoldings: () => Promise<void>;
  refresh: () => Promise<void>;
  clearError: () => void;
}

export const usePortfolio = (): UsePortfolioReturn => {
  const [overview, setOverview] = useState<PortfolioOverview | null>(null);
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch portfolio overview
  const fetchOverview = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await portfolioService.getPortfolioOverview();
      setOverview(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch portfolio overview');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch holdings
  const fetchHoldings = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await portfolioService.getHoldings();
      setHoldings(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch holdings');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Refresh all data
  const refresh = useCallback(async () => {
    await Promise.all([fetchOverview(), fetchHoldings()]);
  }, [fetchOverview, fetchHoldings]);

  // Auto-fetch on mount
  useEffect(() => {
    refresh();
  }, [refresh]);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    overview,
    holdings,
    isLoading,
    error,
    fetchOverview,
    fetchHoldings,
    refresh,
    clearError,
  };
};

interface UseTransactionsReturn {
  transactions: Transaction[];
  pagination: PaginatedResponse<Transaction>['pagination'] | null;
  isLoading: boolean;
  error: string | null;
  fetchTransactions: (params?: PaginationParams) => Promise<void>;
  clearError: () => void;
}

export const useTransactions = (): UseTransactionsReturn => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [pagination, setPagination] = useState<PaginatedResponse<Transaction>['pagination'] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch transactions
  const fetchTransactions = useCallback(async (params?: PaginationParams) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await portfolioService.getTransactions(params);
      setTransactions(data.items);
      setPagination(data.pagination);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch transactions');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Auto-fetch on mount
  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    transactions,
    pagination,
    isLoading,
    error,
    fetchTransactions,
    clearError,
  };
};
