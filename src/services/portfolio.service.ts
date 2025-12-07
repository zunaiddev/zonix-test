// ============================================================================
// ZONIX Trading Platform - Portfolio Service
// API service for portfolio operations
// ============================================================================

import {httpClient} from './api.service';
import {API_ENDPOINTS, shouldUseMockData} from '../config/api.config';
import {APIResponse, Portfolio, PortfolioAsset} from '../types';

// ============================================================================
// PORTFOLIO SERVICE
// ============================================================================

class PortfolioService {
    /**
     * Get user portfolio
     */
    async getPortfolio(): Promise<APIResponse<Portfolio>> {
        if (shouldUseMockData()) {
            return this.getMockPortfolio();
        }

        return httpClient.get(API_ENDPOINTS.PORTFOLIO.GET);
    }

    /**
     * Get portfolio assets
     */
    async getAssets(): Promise<APIResponse<PortfolioAsset[]>> {
        if (shouldUseMockData()) {
            const portfolio = await this.getMockPortfolio();
            return {
                success: true,
                data: portfolio.data?.assets || [],
            };
        }

        return httpClient.get(API_ENDPOINTS.PORTFOLIO.ASSETS);
    }

    /**
     * Get portfolio performance
     */
    async getPerformance(timeframe: '1D' | '1W' | '1M' | '3M' | '6M' | '1Y' | 'ALL'): Promise<APIResponse<any>> {
        if (shouldUseMockData()) {
            return this.getMockPerformance(timeframe);
        }

        return httpClient.get(API_ENDPOINTS.PORTFOLIO.PERFORMANCE, {
            params: {timeframe},
        });
    }

    // ============================================================================
    // MOCK DATA METHODS
    // ============================================================================

    private async getMockPortfolio(): Promise<APIResponse<Portfolio>> {
        const mockAssets: PortfolioAsset[] = [
            {
                page: '1',
                userId: '1',
                assetType: 'district',
                assetId: 'mumbai-suburban',
                assetName: 'Mumbai Suburban',
                quantity: 10,
                avgBuyPrice: 2450,
                currentPrice: 2567,
                totalValue: 25670,
                totalCost: 24500,
                profitLoss: 1170,
                profitLossPercent: 4.78,
                purchaseDate: '2024-10-15',
                lastUpdated: new Date().toISOString(),
            },
            {
                page: '2',
                userId: '1',
                assetType: 'district',
                assetId: 'bengaluru-urban',
                assetName: 'Bengaluru Urban',
                quantity: 15,
                avgBuyPrice: 1980,
                currentPrice: 2150,
                totalValue: 32250,
                totalCost: 29700,
                profitLoss: 2550,
                profitLossPercent: 8.59,
                purchaseDate: '2024-09-20',
                lastUpdated: new Date().toISOString(),
            },
        ];

        const totalValue = mockAssets.reduce((sum, asset) => sum + asset.totalValue, 0);
        const totalCost = mockAssets.reduce((sum, asset) => sum + asset.totalCost, 0);
        const totalProfitLoss = totalValue - totalCost;

        const portfolio: Portfolio = {
            userId: '1',
            totalValue,
            totalInvested: totalCost,
            totalProfitLoss,
            totalProfitLossPercent: (totalProfitLoss / totalCost) * 100,
            assets: mockAssets,
            dayChange: totalValue * 0.012,
            dayChangePercent: 1.2,
            lastUpdated: new Date().toISOString(),
        };

        return {
            success: true,
            data: portfolio,
        };
    }

    private async getMockPerformance(timeframe: string): Promise<APIResponse<any>> {
        const dataPoints = timeframe === '1D' ? 24 : timeframe === '1W' ? 7 : 30;
        const data = [];
        let value = 50000;

        for (let i = 0; i < dataPoints; i++) {
            value += (Math.random() - 0.45) * 1000;
            data.push({
                timestamp: Date.now() - (dataPoints - i) * 3600000,
                value,
                profitLoss: value - 50000,
            });
        }

        return {
            success: true,
            data,
        };
    }
}

// ============================================================================
// EXPORT SINGLETON INSTANCE
// ============================================================================

export const portfolioService = new PortfolioService();
export default portfolioService;
