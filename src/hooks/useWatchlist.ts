/**
 * useWatchlist Hook
 * 
 * Custom hook for watchlist management
 */

import { useState, useEffect, useCallback } from 'react';
import { WatchlistItem, AddToWatchlistRequest } from '../types/api.types';
import * as watchlistService from '../services/watchlist.service';

interface UseWatchlistReturn {
  watchlist: WatchlistItem[];
  isLoading: boolean;
  error: string | null;
  isInWatchlist: (assetId: string) => boolean;
  addToWatchlist: (request: AddToWatchlistRequest) => Promise<void>;
  removeFromWatchlist: (id: string) => Promise<void>;
  toggleWatchlist: (assetId: string, assetType: string) => Promise<void>;
  fetchWatchlist: () => Promise<void>;
  clearError: () => void;
}

export const useWatchlist = (): UseWatchlistReturn => {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch watchlist
  const fetchWatchlist = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await watchlistService.getWatchlist();
      setWatchlist(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch watchlist');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Check if asset is in watchlist
  const isInWatchlist = useCallback(
    (assetId: string): boolean => {
      return watchlist.some((item) => item.assetId === assetId);
    },
    [watchlist]
  );

  // Add to watchlist
  const addToWatchlist = useCallback(
    async (request: AddToWatchlistRequest) => {
      try {
        setError(null);
        await watchlistService.addToWatchlist(request);
        await fetchWatchlist(); // Refresh watchlist
      } catch (err: any) {
        setError(err.message || 'Failed to add to watchlist');
        throw err;
      }
    },
    [fetchWatchlist]
  );

  // Remove from watchlist
  const removeFromWatchlist = useCallback(
    async (id: string) => {
      try {
        setError(null);
        await watchlistService.removeFromWatchlist(id);
        // Optimistically update UI
        setWatchlist((prev) => prev.filter((item) => item.id !== id));
      } catch (err: any) {
        setError(err.message || 'Failed to remove from watchlist');
        // Refresh on error to ensure consistency
        await fetchWatchlist();
        throw err;
      }
    },
    [fetchWatchlist]
  );

  // Toggle watchlist
  const toggleWatchlist = useCallback(
    async (assetId: string, assetType: string) => {
      const item = watchlist.find((w) => w.assetId === assetId);
      if (item) {
        await removeFromWatchlist(item.id);
      } else {
        await addToWatchlist({ assetId, assetType });
      }
    },
    [watchlist, addToWatchlist, removeFromWatchlist]
  );

  // Auto-fetch on mount
  useEffect(() => {
    fetchWatchlist();
  }, [fetchWatchlist]);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    watchlist,
    isLoading,
    error,
    isInWatchlist,
    addToWatchlist,
    removeFromWatchlist,
    toggleWatchlist,
    fetchWatchlist,
    clearError,
  };
};
