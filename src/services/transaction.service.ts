// ============================================================================
// ZONIX Trading Platform - Transaction Service
// API service for transaction and order operations
// ============================================================================

import {httpClient} from './api.service';
import {API_ENDPOINTS, shouldUseMockData} from '../config/api.config';
import {APIResponse, PaginatedResponse, SmartReceipt, Transaction} from '../types';

// ============================================================================
// TRANSACTION SERVICE
// ============================================================================

class TransactionService {
    /**
     * Create a new order (buy/sell)
     */
    async createOrder(orderData: {
        assetType: 'district' | 'state_etf' | 'mutual_fund';
        assetId: string;
        type: 'buy' | 'sell';
        quantity: number;
        price?: number;
    }): Promise<APIResponse<Transaction>> {
        if (shouldUseMockData()) {
            return this.mockCreateOrder(orderData);
        }

        return httpClient.post(API_ENDPOINTS.ORDERS.CREATE, orderData);
    }

    /**
     * Get transaction history
     */
    async getTransactions(params?: {
        page?: number;
        pageSize?: number;
        type?: 'buy' | 'sell';
        status?: string;
    }): Promise<APIResponse<PaginatedResponse<Transaction>>> {
        if (shouldUseMockData()) {
            return this.getMockTransactions(params);
        }

        return httpClient.get(API_ENDPOINTS.TRANSACTIONS.LIST, {params});
    }

    /**
     * Get transaction by ID
     */
    async getTransactionById(id: string): Promise<APIResponse<Transaction>> {
        if (shouldUseMockData()) {
            return this.getMockTransactionById(id);
        }

        return httpClient.get(API_ENDPOINTS.TRANSACTIONS.DETAIL(id));
    }

    /**
     * Get receipt by transaction ID
     */
    async getReceipt(transactionId: string): Promise<APIResponse<SmartReceipt>> {
        if (shouldUseMockData()) {
            return this.getMockReceipt(transactionId);
        }

        return httpClient.get(API_ENDPOINTS.TRANSACTIONS.RECEIPT(transactionId));
    }

    /**
     * Cancel order
     */
    async cancelOrder(orderId: string): Promise<APIResponse<void>> {
        if (shouldUseMockData()) {
            return {success: true};
        }

        return httpClient.post(API_ENDPOINTS.ORDERS.CANCEL(orderId));
    }

    // ============================================================================
    // MOCK DATA METHODS
    // ============================================================================

    private async mockCreateOrder(orderData: any): Promise<APIResponse<Transaction>> {
        await new Promise(resolve => setTimeout(resolve, 500));

        const transaction: Transaction = {
            page: Date.now().toString(),
            userId: '1',
            type: orderData.type,
            assetType: orderData.assetType,
            assetId: orderData.assetId,
            assetName: orderData.assetId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            quantity: orderData.quantity,
            price: orderData.price || 2000,
            totalAmount: orderData.quantity * (orderData.price || 2000),
            fees: 50,
            tax: 18,
            status: 'completed',
            timestamp: new Date().toISOString(),
            receiptId: 'RCP' + Date.now(),
        };

        return {
            success: true,
            data: transaction,
        };
    }

    private async getMockTransactions(params?: any): Promise<APIResponse<PaginatedResponse<Transaction>>> {
        const mockTransactions: Transaction[] = [
            {
                page: '1',
                userId: '1',
                type: 'buy',
                assetType: 'district',
                assetId: 'mumbai-suburban',
                assetName: 'Mumbai Suburban',
                quantity: 10,
                price: 2450,
                totalAmount: 24500,
                fees: 50,
                tax: 18,
                status: 'completed',
                timestamp: '2024-10-15T10:30:00Z',
                receiptId: 'RCP001',
            },
            {
                page: '2',
                userId: '1',
                type: 'buy',
                assetType: 'district',
                assetId: 'bengaluru-urban',
                assetName: 'Bengaluru Urban',
                quantity: 15,
                price: 1980,
                totalAmount: 29700,
                fees: 60,
                tax: 21,
                status: 'completed',
                timestamp: '2024-09-20T14:20:00Z',
                receiptId: 'RCP002',
            },
        ];

        const page = params?.page || 1;
        const pageSize = params?.pageSize || 20;

        return {
            success: true,
            data: {
                items: mockTransactions,
                page,
                pageSize,
                totalPages: 1,
                totalItems: mockTransactions.length,
                hasMore: false,
            },
        };
    }

    private async getMockTransactionById(id: string): Promise<APIResponse<Transaction>> {
        const transaction: Transaction = {
            page: id,
            userId: '1',
            type: 'buy',
            assetType: 'district',
            assetId: 'mumbai-suburban',
            assetName: 'Mumbai Suburban',
            quantity: 10,
            price: 2450,
            totalAmount: 24500,
            fees: 50,
            tax: 18,
            status: 'completed',
            timestamp: '2024-10-15T10:30:00Z',
            receiptId: 'RCP001',
        };

        return {
            success: true,
            data: transaction,
        };
    }

    private async getMockReceipt(transactionId: string): Promise<APIResponse<SmartReceipt>> {
        const receipt: SmartReceipt = {
            page: 'RCP' + transactionId,
            transactionId,
            userId: '1',
            type: 'buy',
            assetType: 'district',
            assetName: 'Mumbai Suburban',
            quantity: 10,
            price: 2450,
            subtotal: 24500,
            fees: 50,
            tax: 18,
            total: 24568,
            paymentMethod: 'UPI',
            status: 'completed',
            timestamp: new Date().toISOString(),
        };

        return {
            success: true,
            data: receipt,
        };
    }
}

// ============================================================================
// EXPORT SINGLETON INSTANCE
// ============================================================================

export const transactionService = new TransactionService();
export default transactionService;
