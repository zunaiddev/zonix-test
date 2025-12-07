// ============================================================================
// ZONIX Trading Platform - Watchlist Service
// API service for watchlist operations
// ============================================================================

import {httpClient} from './api.service';
import {API_ENDPOINTS, shouldUseMockData} from '../config/api.config';
import {APIResponse, Watchlist, WatchlistItem} from '../types';

// ============================================================================
// WATCHLIST SERVICE
// ============================================================================

class WatchlistService {
    /**
     * Get user watchlist
     */
    async getWatchlist(): Promise<APIResponse<Watchlist>> {
        if (shouldUseMockData()) {
            return this.getMockWatchlist();
        }

        return httpClient.get(API_ENDPOINTS.WATCHLIST.GET);
    }

    /**
     * Add item to watchlist
     */
    async addToWatchlist(item: {
        assetType: 'district' | 'state_etf' | 'mutual_fund';
        assetId: string;
        alertPrice?: number;
    }): Promise<APIResponse<WatchlistItem>> {
        if (shouldUseMockData()) {
            return this.mockAddToWatchlist(item);
        }

        return httpClient.post(API_ENDPOINTS.WATCHLIST.ADD, item);
    }

    /**
     * Remove item from watchlist
     */
    async removeFromWatchlist(itemId: string): Promise<APIResponse<void>> {
        if (shouldUseMockData()) {
            return {success: true};
        }

        return httpClient.delete(API_ENDPOINTS.WATCHLIST.REMOVE(itemId));
    }

    /**
     * Update price alert
     */
    async updateAlert(itemId: string, alertPrice: number): Promise<APIResponse<WatchlistItem>> {
        if (shouldUseMockData()) {
            return this.mockUpdateAlert(itemId, alertPrice);
        }

        return httpClient.patch(API_ENDPOINTS.WATCHLIST.UPDATE_ALERT(itemId), {
            alertPrice,
        });
    }

    // ============================================================================
    // MOCK DATA METHODS
    // ============================================================================

    private async getMockWatchlist(): Promise<APIResponse<Watchlist>> {
        const watchlist: Watchlist = {
            userId: '1',
            items: [
                {
                    page: '1',
                    userId: '1',
                    assetType: 'district',
                    assetId: 'delhi',
                    assetName: 'Delhi',
                    currentPrice: 3200,
                    change24h: 45,
                    changePercent24h: 1.43,
                    addedAt: '2024-11-01T10:00:00Z',
                },
                {
                    page: '2',
                    userId: '1',
                    assetType: 'district',
                    assetId: 'pune',
                    assetName: 'Pune',
                    currentPrice: 1890,
                    change24h: -12,
                    changePercent24h: -0.63,
                    alertPrice: 1850,
                    addedAt: '2024-11-02T14:30:00Z',
                },
            ],
            lastUpdated: new Date().toISOString(),
        };

        return {
            success: true,
            data: watchlist,
        };
    }

    private async mockAddToWatchlist(item: any): Promise<APIResponse<WatchlistItem>> {
        const watchlistItem: WatchlistItem = {
            page: Date.now().toString(),
            userId: '1',
            assetType: item.assetType,
            assetId: item.assetId,
            assetName: item.assetId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            currentPrice: 2000,
            change24h: 25,
            changePercent24h: 1.27,
            alertPrice: item.alertPrice,
            addedAt: new Date().toISOString(),
        };

        return {
            success: true,
            data: watchlistItem,
        };
    }

    private async mockUpdateAlert(itemId: string, alertPrice: number): Promise<APIResponse<WatchlistItem>> {
        const watchlistItem: WatchlistItem = {
            page: itemId,
            userId: '1',
            assetType: 'district',
            assetId: 'pune',
            assetName: 'Pune',
            currentPrice: 1890,
            change24h: -12,
            changePercent24h: -0.63,
            alertPrice,
            addedAt: '2024-11-02T14:30:00Z',
        };

        return {
            success: true,
            data: watchlistItem,
        };
    }
}

// ============================================================================
// EXPORT SINGLETON INSTANCE
// ============================================================================

export const watchlistService = new WatchlistService();
export default watchlistService;
