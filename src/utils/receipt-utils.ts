// Receipt calculation utilities for ZONIX Trading Platform

export interface ReceiptCalculation {
    tradeValue: number;
    tradeFee: number;
    commission: number;
    gst: number;
    finalPayable: number;
    rebateApplied: boolean;
}

export interface Receipt {
    id: string;
    receiptId: string;
    timestamp: Date;
    userId: string;
    userName: string;
    type: 'BUY' | 'SELL';
    tokenName: string;
    tokenSymbol: string;
    quantity: number;
    pricePerUnit: number;
    tradeValue: number;
    profitLoss: number;
    commission: number;
    tradeFee: number;
    gst: number;
    finalPayable: number;
    status: 'completed' | 'pending' | 'failed';
    rebateApplied: boolean;
}

/**
 * Calculate receipt details based on trade parameters
 *
 * Fee Logic:
 * - Trade Fee: ₹50 per transaction
 * - Commission: 0.75% on profit only (if profit > 0)
 * - Loss Scenario: No commission, 10% rebate on trade fee (₹45 final)
 * - GST: 18% on trade fee
 */
export function calculateReceiptDetails(
    quantity: number,
    pricePerUnit: number,
    profitLoss: number
): ReceiptCalculation {
    const tradeValue = quantity * pricePerUnit;
    let tradeFee = 50;
    let commission = 0;
    let rebateApplied = false;

    if (profitLoss > 0) {
        // Profit scenario: charge 0.75% commission on profit
        commission = 0.0075 * profitLoss;
    } else {
        // Loss scenario: no commission, 10% rebate on trade fee
        commission = 0;
        tradeFee = tradeFee - (0.10 * tradeFee); // ₹45
        rebateApplied = true;
    }

    const gst = 0.18 * tradeFee;
    const finalPayable = tradeFee + commission + gst;

    return {
        tradeValue: Math.round(tradeValue * 100) / 100,
        tradeFee: Math.round(tradeFee * 100) / 100,
        commission: Math.round(commission * 100) / 100,
        gst: Math.round(gst * 100) / 100,
        finalPayable: Math.round(finalPayable * 100) / 100,
        rebateApplied,
    };
}

/**
 * Generate a unique receipt ID
 */
export function generateReceiptId(): string {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `ZNX-2025-${timestamp}${random}`;
}

/**
 * Format currency in Indian Rupees
 */
export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
    }).format(amount);
}

/**
 * Format date and time
 */
export function formatDateTime(date: Date): string {
    return new Intl.DateTimeFormat('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    }).format(date);
}

/**
 * Generate mock receipt data for demonstration
 */
export function generateMockReceipts(): Receipt[] {
    const tokens = [
        {name: 'Saharanpur District Token', symbol: 'SRNPR'},
        {name: 'Mumbai District Token', symbol: 'MBAI'},
        {name: 'Bangalore District Token', symbol: 'BLORE'},
        {name: 'Delhi District Token', symbol: 'DELHI'},
        {name: 'Pune District Token', symbol: 'PUNE'},
        {name: 'Jaipur District Token', symbol: 'JAIPR'},
        {name: 'Lucknow District Token', symbol: 'LCKW'},
        {name: 'Hyderabad District Token', symbol: 'HYDBD'},
    ];

    const receipts: Receipt[] = [];
    const now = new Date();

    for (let i = 0; i < 25; i++) {
        const token = tokens[Math.floor(Math.random() * tokens.length)];
        const type = Math.random() > 0.5 ? 'BUY' : 'SELL';
        const quantity = Math.floor(Math.random() * 500) + 50;
        const pricePerUnit = Math.floor(Math.random() * 200) + 50;
        const profitLoss = Math.floor(Math.random() * 2000) - 500; // Can be positive or negative

        const calculation = calculateReceiptDetails(quantity, pricePerUnit, profitLoss);

        const daysAgo = Math.floor(Math.random() * 60);
        const timestamp = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);

        receipts.push({
            page: `receipt-${i + 1}`,
            receiptId: generateReceiptId(),
            timestamp,
            userId: 'USR-2025-001',
            userName: 'Vishu Panwar',
            type,
            tokenName: token.name,
            tokenSymbol: token.symbol,
            quantity,
            pricePerUnit,
            tradeValue: calculation.tradeValue,
            profitLoss,
            commission: calculation.commission,
            tradeFee: calculation.tradeFee,
            gst: calculation.gst,
            finalPayable: calculation.finalPayable,
            status: Math.random() > 0.95 ? 'failed' : 'completed',
            rebateApplied: calculation.rebateApplied,
        });
    }

    return receipts.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}
