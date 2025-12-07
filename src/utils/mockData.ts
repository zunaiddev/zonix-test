// Mock data for district tokens and state indices

export interface DistrictToken {
    id: string;
    name: string;
    state: string;
    stateCode: string;
    category: 'Small Cap' | 'Mid Cap' | 'Large Cap';
    price: number;
    change: number;
    volume: number;
    gdp: number;
    population: number;
    region: string;
    economicPulse: number; // 0-100
    sentiment: 'Bullish' | 'Bearish' | 'Neutral';
    aiForecast: number;
    miniChart: number[];
}

export interface StateIndex {
    id: string;
    name: string;
    code: string;
    value: number;
    change: number;
    districtCount: number;
    volume: number;
    gdp: number;
    employment: number;
    tradeVolume: number;
    sentiment: 'Bullish' | 'Bearish' | 'Neutral';
    districts: string[];
    sparkline: number[];
    // F&O specific fields
    nextExpiry: string;
    contractsTraded24h: number;
    openInterest: number;
    volatility: number;
    aiTrend: 'up' | 'down' | 'neutral';
    avgDistrictPerformance: number;
    topContributor: string;
    rank: number;
    dayHigh: number;
    dayLow: number;
    week52High: number;
    week52Low: number;
    putCallRatio: number;
    maxPain: number;
    beta: number;
}

export interface FutureContract {
    expiry: string;
    ltp: number;
    change: number;
    volume: number;
    oi: number;
    oiChange: number;
    basis: number;
    basisPercent: number;
    aiPrediction: 'Bullish' | 'Bearish' | 'Neutral';
}

export interface OptionContract {
    strike: number;
    callLTP: number;
    callOI: number;
    callOIChange: number;
    callIV: number;
    callVolume: number;
    callLTPChange: number;
    callDelta: number;
    callGamma: number;
    callTheta: number;
    callVega: number;
    putLTP: number;
    putOI: number;
    putOIChange: number;
    putIV: number;
    putVolume: number;
    putLTPChange: number;
    putDelta: number;
    putGamma: number;
    putTheta: number;
    putVega: number;
}

const states = [
    // States (28)
    {name: 'Andhra Pradesh', code: 'AP'},
    {name: 'Arunachal Pradesh', code: 'AR'},
    {name: 'Assam', code: 'AS'},
    {name: 'Bihar', code: 'BR'},
    {name: 'Chhattisgarh', code: 'CG'},
    {name: 'Goa', code: 'GA'},
    {name: 'Gujarat', code: 'GJ'},
    {name: 'Haryana', code: 'HR'},
    {name: 'Himachal Pradesh', code: 'HP'},
    {name: 'Jharkhand', code: 'JH'},
    {name: 'Karnataka', code: 'KA'},
    {name: 'Kerala', code: 'KL'},
    {name: 'Madhya Pradesh', code: 'MP'},
    {name: 'Maharashtra', code: 'MH'},
    {name: 'Manipur', code: 'MN'},
    {name: 'Meghalaya', code: 'ML'},
    {name: 'Mizoram', code: 'MZ'},
    {name: 'Nagaland', code: 'NL'},
    {name: 'Odisha', code: 'OR'},
    {name: 'Punjab', code: 'PB'},
    {name: 'Rajasthan', code: 'RJ'},
    {name: 'Sikkim', code: 'SK'},
    {name: 'Tamil Nadu', code: 'TN'},
    {name: 'Telangana', code: 'TS'},
    {name: 'Tripura', code: 'TR'},
    {name: 'Uttar Pradesh', code: 'UP'},
    {name: 'Uttarakhand', code: 'UK'},
    {name: 'West Bengal', code: 'WB'},

    // Union Territories (8)
    {name: 'Andaman and Nicobar', code: 'AN'},
    {name: 'Chandigarh', code: 'CH'},
    {name: 'Dadra and Nagar Haveli and Daman and Diu', code: 'DD'},
    {name: 'Delhi', code: 'DL'},
    {name: 'Jammu and Kashmir', code: 'JK'},
    {name: 'Ladakh', code: 'LA'},
    {name: 'Lakshadweep', code: 'LD'},
    {name: 'Puducherry', code: 'PY'},
];

const districts = [
    'Mumbai', 'Pune', 'Bangalore', 'Chennai', 'Delhi', 'Hyderabad', 'Ahmedabad',
    'Kolkata', 'Jaipur', 'Indore', 'Surat', 'Nashik', 'Coimbatore', 'Vadodara',
    'Lucknow', 'Kanpur', 'Nagpur', 'Thane', 'Visakhapatnam', 'Bhopal',
    'Patna', 'Ludhiana', 'Agra', 'Madurai', 'Jamshedpur', 'Gwalior', 'Vijayawada',
    'Jodhpur', 'Raipur', 'Kota', 'Guwahati', 'Chandigarh', 'Solapur', 'Mysore',
    'Bareilly', 'Gurgaon', 'Aligarh', 'Moradabad', 'Jalandhar', 'Tiruchirappalli',
];

const categories: Array<'Small Cap' | 'Mid Cap' | 'Large Cap'> = ['Small Cap', 'Mid Cap', 'Large Cap'];
const regions = ['North', 'South', 'East', 'West', 'Central', 'Northeast'];
const sentiments: Array<'Bullish' | 'Bearish' | 'Neutral'> = ['Bullish', 'Bearish', 'Neutral'];

function generateMiniChart(basePrice: number, volatility: number = 5): number[] {
    const chart = [basePrice];
    for (let i = 0; i < 23; i++) {
        const change = (Math.random() - 0.5) * volatility;
        chart.push(chart[chart.length - 1] + change);
    }
    return chart;
}

export function generateDistrictTokens(count: number = 100): DistrictToken[] {
    const tokens: DistrictToken[] = [];

    for (let i = 0; i < count; i++) {
        const state = states[Math.floor(Math.random() * states.length)];
        const district = districts[Math.floor(Math.random() * districts.length)];
        // Price range: ₹50 to ₹250
        const price = Math.random() * 200 + 50;
        const change = (Math.random() - 0.4) * 15;

        tokens.push({
            page: `DT-${i + 1000}`,
            name: district,
            state: state.name,
            stateCode: state.code,
            category: categories[Math.floor(Math.random() * categories.length)],
            price: parseFloat(price.toFixed(2)),
            change: parseFloat(change.toFixed(2)),
            volume: Math.floor(Math.random() * 1000000) + 50000,
            gdp: Math.floor(Math.random() * 500000) + 100000,
            population: Math.floor(Math.random() * 5000000) + 500000,
            region: regions[Math.floor(Math.random() * regions.length)],
            economicPulse: Math.floor(Math.random() * 40) + 60,
            sentiment: change > 5 ? 'Bullish' : change < -2 ? 'Bearish' : 'Neutral',
            aiForecast: parseFloat((change + (Math.random() * 4 - 2)).toFixed(2)),
            miniChart: generateMiniChart(price, price * 0.02),
        });
    }

    return tokens.sort((a, b) => b.price - a.price);
}

export function generateStateIndices(): StateIndex[] {
    return states.map((state, i) => {
        const value = Math.random() * 2000000 + 500000;
        const change = (Math.random() - 0.4) * 12;
        const volatility = Math.random() * 25 + 10;

        // Generate expiry dates (last Thursday of upcoming months)
        const expiryDates = ['28-Nov-2050', '26-Dec-2050', '30-Jan-2051', '27-Feb-2051'];

        return {
            id: `SI-${i + 100}`,
            name: state.name,
            code: state.code,
            value: parseFloat(value.toFixed(2)),
            change: parseFloat(change.toFixed(2)),
            districtCount: Math.floor(Math.random() * 30) + 10,
            volume: Math.floor(Math.random() * 50000000) + 10000000,
            gdp: Math.floor(Math.random() * 10000000) + 2000000,
            employment: parseFloat((Math.random() * 15 + 85).toFixed(1)),
            tradeVolume: Math.floor(Math.random() * 100000000) + 20000000,
            sentiment: change > 3 ? 'Bullish' : change < -1 ? 'Bearish' : 'Neutral',
            districts: districts.slice(0, Math.floor(Math.random() * 10) + 5),
            sparkline: generateMiniChart(value, value * 0.015),
            // F&O specific fields
            nextExpiry: expiryDates[Math.floor(Math.random() * expiryDates.length)],
            contractsTraded24h: Math.floor(Math.random() * 5000000) + 500000,
            openInterest: Math.floor(Math.random() * 10000000) + 1000000,
            volatility: parseFloat(volatility.toFixed(2)),
            aiTrend: change > 2 ? 'up' : change < -2 ? 'down' : 'neutral',
            avgDistrictPerformance: parseFloat((change + (Math.random() - 0.5) * 2).toFixed(2)),
            topContributor: districts[Math.floor(Math.random() * districts.length)],
            rank: i + 1,
            dayHigh: value * (1 + Math.random() * 0.03),
            dayLow: value * (1 - Math.random() * 0.03),
            week52High: value * (1 + Math.random() * 0.25 + 0.05),
            week52Low: value * (1 - Math.random() * 0.25 - 0.05),
            putCallRatio: parseFloat((Math.random() * 1.5 + 0.5).toFixed(2)),
            maxPain: value * (1 + (Math.random() - 0.5) * 0.05),
            beta: parseFloat((Math.random() * 0.8 + 0.8).toFixed(2)),
        };
    }).sort((a, b) => b.value - a.value);
}

export function generateFutureContracts(basePrice: number): FutureContract[] {
    const expiryDates = ['28-Nov-2050', '26-Dec-2050', '30-Jan-2051', '27-Feb-2051'];

    return expiryDates.map((expiry, index) => {
        const daysToExpiry = (index + 1) * 30;
        const timeDecay = index * 0.005;
        const price = basePrice * (1 + timeDecay + (Math.random() - 0.5) * 0.02);
        const changePercent = (Math.random() - 0.5) * 8; // -4% to +4%
        const basis = price - basePrice;
        const basisPercent = (basis / basePrice) * 100;
        const oiChange = (Math.random() - 0.5) * 20; // -10% to +10%

        return {
            expiry,
            ltp: parseFloat(price.toFixed(2)),
            change: parseFloat(changePercent.toFixed(2)),
            volume: Math.floor(Math.random() * 2000000) + 500000,
            oi: Math.floor(Math.random() * 5000000) + 1000000,
            oiChange: parseFloat(oiChange.toFixed(2)),
            basis: parseFloat(basis.toFixed(2)),
            basisPercent: parseFloat(basisPercent.toFixed(2)),
            aiPrediction: changePercent > 0.3 ? 'Bullish' : changePercent < -0.3 ? 'Bearish' : 'Neutral',
        };
    });
}

export function generateOptionsChain(basePrice: number): OptionContract[] {
    const strikes: number[] = [];
    const strikeInterval = Math.round(basePrice * 0.02 / 100) * 100; // 2% intervals, rounded

    // Generate 11 strikes: 5 ITM, ATM, 5 OTM
    for (let i = -5; i <= 5; i++) {
        strikes.push(basePrice + (i * strikeInterval));
    }

    return strikes.map(strike => {
        const distanceFromATM = Math.abs(strike - basePrice);
        const isITM_Call = strike < basePrice;
        const isITM_Put = strike > basePrice;

        // Calculate intrinsic value and time value
        const callIntrinsic = isITM_Call ? basePrice - strike : 0;
        const putIntrinsic = isITM_Put ? strike - basePrice : 0;

        const timeValue = (basePrice * 0.03) * Math.exp(-distanceFromATM / basePrice * 2);

        const callLTP = callIntrinsic + timeValue + (Math.random() - 0.5) * timeValue * 0.3;
        const putLTP = putIntrinsic + timeValue + (Math.random() - 0.5) * timeValue * 0.3;

        // Higher OI near ATM
        const oiMultiplier = 1 + (1 - distanceFromATM / (basePrice * 0.1));

        // Calculate Greeks (simplified Black-Scholes approximation)
        const moneyness = strike / basePrice;
        const callDelta = isITM_Call ? 0.5 + (1 - moneyness) * 0.5 : 0.5 - (moneyness - 1) * 0.5;
        const putDelta = callDelta - 1;

        const gamma = 0.01 * Math.exp(-Math.pow(moneyness - 1, 2) * 5);
        const theta = -(timeValue / 30) + (Math.random() - 0.5) * 10;
        const vega = basePrice * 0.0001 * Math.exp(-Math.pow(moneyness - 1, 2) * 3);

        return {
            strike: parseFloat(strike.toFixed(0)),
            callLTP: parseFloat(Math.max(callLTP, 5).toFixed(2)),
            callOI: Math.floor((Math.random() * 500000 + 200000) * oiMultiplier),
            callOIChange: parseFloat(((Math.random() - 0.5) * 20).toFixed(2)),
            callIV: parseFloat((Math.random() * 10 + 15).toFixed(1)),
            callVolume: Math.floor(Math.random() * 100000 + 50000),
            callLTPChange: parseFloat(((Math.random() - 0.5) * 5).toFixed(2)),
            callDelta: parseFloat(Math.max(0, Math.min(1, callDelta)).toFixed(3)),
            callGamma: parseFloat(Math.abs(gamma).toFixed(4)),
            callTheta: parseFloat(theta.toFixed(2)),
            callVega: parseFloat(Math.abs(vega).toFixed(2)),
            putLTP: parseFloat(Math.max(putLTP, 5).toFixed(2)),
            putOI: Math.floor((Math.random() * 500000 + 200000) * oiMultiplier),
            putOIChange: parseFloat(((Math.random() - 0.5) * 20).toFixed(2)),
            putIV: parseFloat((Math.random() * 10 + 15).toFixed(1)),
            putVolume: Math.floor(Math.random() * 100000 + 50000),
            putLTPChange: parseFloat(((Math.random() - 0.5) * 5).toFixed(2)),
            putDelta: parseFloat(Math.max(-1, Math.min(0, putDelta)).toFixed(3)),
            putGamma: parseFloat(Math.abs(gamma).toFixed(4)),
            putTheta: parseFloat(theta.toFixed(2)),
            putVega: parseFloat(Math.abs(vega).toFixed(2)),
        };
    });
}

export const indiaIndex = {
    value: 12450000,
    change: 2.45,
    volume: 450000000,
    sentiment: 'Bullish' as const,
    weekChange: 5.2,
    monthChange: 12.8,
};