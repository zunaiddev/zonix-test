// Live Price Update Utilities for ZONIX Trading Platform

export interface PriceUpdate {
  id: string;
  price: number;
  change: number;
}

/**
 * Generates a realistic random price movement within constraints
 * @param currentPrice - Current price value
 * @param minPrice - Minimum allowed price (default: 40)
 * @param maxPrice - Maximum allowed price (default: 550)
 * @param maxChangePercent - Maximum change percentage per update (default: 0.5%)
 * @returns New price value
 */
export const generateRealisticPriceUpdate = (
  currentPrice: number,
  minPrice: number = 40,
  maxPrice: number = 550,
  maxChangePercent: number = 0.5
): number => {
  // Generate a random change between -maxChangePercent and +maxChangePercent
  const changePercent = (Math.random() - 0.5) * 2 * maxChangePercent;
  const priceChange = currentPrice * (changePercent / 100);
  let newPrice = currentPrice + priceChange;
  
  // Ensure price stays within bounds
  newPrice = Math.max(minPrice, Math.min(maxPrice, newPrice));
  
  // Round to 2 decimal places
  return Number(newPrice.toFixed(2));
};

/**
 * Generates a realistic price movement with absolute value changes (1-2 rupees)
 * Perfect for smooth, incremental price updates
 * @param currentPrice - Current price value
 * @param minPrice - Minimum allowed price
 * @param maxPrice - Maximum allowed price
 * @returns New price value with small absolute changes
 */
export const generateSmoothPriceUpdate = (
  currentPrice: number,
  minPrice: number = 40,
  maxPrice: number = 550
): number => {
  // Generate random change between -2 and +2 rupees
  // Weighted towards smaller changes for more stability
  const random = Math.random();
  let priceChange: number;
  
  // 70% chance of change between -1 and +1
  // 30% chance of change between -2 and +2
  if (random < 0.7) {
    priceChange = (Math.random() - 0.5) * 2; // -1 to +1
  } else {
    priceChange = (Math.random() - 0.5) * 4; // -2 to +2
  }
  
  let newPrice = currentPrice + priceChange;
  
  // Ensure price stays within bounds
  newPrice = Math.max(minPrice, Math.min(maxPrice, newPrice));
  
  // Round to 2 decimal places
  return Number(newPrice.toFixed(2));
};

/**
 * Calculate percentage change between old and new price
 */
export const calculateChange = (oldPrice: number, newPrice: number): number => {
  if (oldPrice === 0) return 0;
  return Number((((newPrice - oldPrice) / oldPrice) * 100).toFixed(2));
};

/**
 * Calculate average price from an array of prices
 */
export const calculateAveragePrice = (prices: number[]): number => {
  if (prices.length === 0) return 0;
  const sum = prices.reduce((acc, price) => acc + price, 0);
  return Number((sum / prices.length).toFixed(2));
};

/**
 * Initialize price tracking for historical comparison
 */
export const initializePriceTracking = (currentPrice: number) => {
  return {
    initialPrice: currentPrice,
    previousPrice: currentPrice,
    currentPrice: currentPrice,
  };
};
