import {useState} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {Card} from './ui/card';
import {Button} from './ui/button';
import {Input} from './ui/input';
import {Badge} from './ui/badge';
import {Tabs, TabsContent, TabsList, TabsTrigger} from './ui/tabs';

import {
    Activity,
    Eye,
    Filter,
    MapPin,
    Plus,
    Search,
    Sparkles,
    Star,
    TrendingDown as TrendingDownIcon,
    TrendingUp,
    Wallet,
} from 'lucide-react';
import {generateDistrictTokens} from '../utils/mockData';
import {useNavigate} from "react-router-dom";

interface MutualFundsProps {
    onLogout: () => void;
}

// Mock data for mutual funds
const mutualFunds = [
    {
        id: 'mf-1',
        name: 'Bharat Growth Fund',
        category: 'Equity',
        subcategory: 'Large Cap',
        nav: 156.78,
        change: 2.34,
        aum: 12450,
        returns: {'1d': 0.45, '1m': 3.2, '6m': 12.5, '1y': 24.5, '3y': 42.3, '5y': 68.9},
        risk: 'Moderate',
        expenseRatio: 0.85,
        launchDate: '2045-03-15',
        minInvestment: 5000,
        rating: 4.5,
        manager: {
            name: 'Dr. Amit Sharma',
            experience: '15 years',
            funds: 8,
        },
        holdings: [
            {type: 'Equity', percent: 75},
            {type: 'Bonds', percent: 15},
            {type: 'Cash', percent: 5},
            {type: 'Others', percent: 5},
        ],
        topHoldings: [
            {name: 'Maharashtra Tech Hub', allocation: 12.5, returns: 18.3},
            {name: 'Karnataka Innovation', allocation: 10.2, returns: 22.1},
            {name: 'Gujarat Manufacturing', allocation: 9.8, returns: 15.7},
            {name: 'Tamil Nadu Auto', allocation: 8.5, returns: 12.4},
            {name: 'Delhi Financial Services', allocation: 7.9, returns: 19.8},
        ],
        sectorAllocation: [
            {sector: 'Technology', percent: 28},
            {sector: 'Manufacturing', percent: 22},
            {sector: 'Finance', percent: 18},
            {sector: 'Healthcare', percent: 15},
            {sector: 'Others', percent: 17},
        ],
    },
    {
        id: 'mf-2',
        name: 'AI Tech Innovation Fund',
        category: 'Equity',
        subcategory: 'Sectoral',
        nav: 245.92,
        change: 3.87,
        aum: 8750,
        returns: {'1d': 0.82, '1m': 5.4, '6m': 18.7, '1y': 31.2, '3y': 48.6, '5y': 75.3},
        risk: 'High',
        expenseRatio: 0.95,
        launchDate: '2046-06-20',
        minInvestment: 10000,
        rating: 4.8,
        manager: {
            name: 'Priya Malhotra',
            experience: '12 years',
            funds: 5,
        },
        holdings: [
            {type: 'Equity', percent: 85},
            {type: 'Bonds', percent: 10},
            {type: 'Cash', percent: 3},
            {type: 'Others', percent: 2},
        ],
        topHoldings: [
            {name: 'Bangalore AI Hub', allocation: 15.2, returns: 32.5},
            {name: 'Pune Tech Corridor', allocation: 12.8, returns: 28.9},
            {name: 'Hyderabad Cyber City', allocation: 11.5, returns: 25.3},
            {name: 'Noida IT Park', allocation: 9.3, returns: 22.1},
            {name: 'Chennai Data Center', allocation: 8.7, returns: 19.6},
        ],
        sectorAllocation: [
            {sector: 'AI/ML', percent: 35},
            {sector: 'Cloud Computing', percent: 25},
            {sector: 'Cybersecurity', percent: 20},
            {sector: 'IoT', percent: 12},
            {sector: 'Others', percent: 8},
        ],
    },
    {
        id: 'mf-3',
        name: 'Green Energy Fund',
        category: 'Equity',
        subcategory: 'Sectoral',
        nav: 189.45,
        change: 2.91,
        aum: 6890,
        returns: {'1d': 0.58, '1m': 4.1, '6m': 15.3, '1y': 28.4, '3y': 45.2, '5y': 71.8},
        risk: 'High',
        expenseRatio: 0.92,
        launchDate: '2046-01-10',
        minInvestment: 10000,
        rating: 4.6,
        manager: {
            name: 'Rajesh Kumar',
            experience: '18 years',
            funds: 6,
        },
        holdings: [
            {type: 'Equity', percent: 80},
            {type: 'Bonds', percent: 12},
            {type: 'Cash', percent: 5},
            {type: 'Others', percent: 3},
        ],
        topHoldings: [
            {name: 'Gujarat Solar Belt', allocation: 14.3, returns: 28.7},
            {name: 'Rajasthan Wind Energy', allocation: 11.9, returns: 24.5},
            {name: 'Karnataka Green Tech', allocation: 10.5, returns: 22.8},
            {name: 'Tamil Nadu Renewables', allocation: 9.8, returns: 20.3},
            {name: 'Maharashtra Clean Energy', allocation: 8.4, returns: 18.9},
        ],
        sectorAllocation: [
            {sector: 'Solar', percent: 38},
            {sector: 'Wind', percent: 28},
            {sector: 'Hydro', percent: 15},
            {sector: 'Battery Tech', percent: 12},
            {sector: 'Others', percent: 7},
        ],
    },
    {
        id: 'mf-4',
        name: 'Bharat Balanced Hybrid',
        category: 'Hybrid',
        subcategory: 'Balanced',
        nav: 134.56,
        change: 1.45,
        aum: 15670,
        returns: {'1d': 0.32, '1m': 2.8, '6m': 10.2, '1y': 18.7, '3y': 32.4, '5y': 52.6},
        risk: 'Low',
        expenseRatio: 0.72,
        launchDate: '2044-09-05',
        minInvestment: 5000,
        rating: 4.3,
        manager: {
            name: 'Sneha Patel',
            experience: '20 years',
            funds: 10,
        },
        holdings: [
            {type: 'Equity', percent: 60},
            {type: 'Bonds', percent: 30},
            {type: 'Cash', percent: 7},
            {type: 'Others', percent: 3},
        ],
        topHoldings: [
            {name: 'Mumbai Financial District', allocation: 10.5, returns: 15.2},
            {name: 'Delhi Corporate Hub', allocation: 9.8, returns: 14.8},
            {name: 'Bangalore IT Sector', allocation: 9.2, returns: 16.3},
            {name: 'Chennai Manufacturing', allocation: 8.5, returns: 12.7},
            {name: 'Pune Real Estate', allocation: 7.9, returns: 11.4},
        ],
        sectorAllocation: [
            {sector: 'Equity Mix', percent: 40},
            {sector: 'Government Bonds', percent: 25},
            {sector: 'Corporate Bonds', percent: 20},
            {sector: 'Real Estate', percent: 10},
            {sector: 'Others', percent: 5},
        ],
    },
];

// Mock data for State ETFs (matching StateIndex interface)
const stateETFs = [
    {
        id: 'etf-mh',
        name: 'Maharashtra',
        code: 'MH',
        symbol: 'MAHETF',
        value: 156789,
        nav: 1567.89,
        change: 2.14,
        dayChange: 32.56,
        districtCount: 36,
        volume: 2345000000,
        gdp: 3250000000000,
        employment: 94.5,
        tradeVolume: 1567890000,
        sentiment: 'Bullish' as const,
        districts: ['Mumbai City', 'Mumbai Suburban', 'Pune', 'Thane', 'Nashik', 'Nagpur', 'Aurangabad', 'Solapur', 'Kolhapur', 'Satara', 'Sangli', 'Ratnagiri', 'Raigad', 'Dhule', 'Jalgaon', 'Ahmednagar', 'Beed', 'Latur', 'Osmanabad', 'Nanded', 'Parbhani', 'Jalna', 'Buldhana', 'Akola', 'Washim', 'Amravati', 'Wardha', 'Yavatmal', 'Chandrapur', 'Gadchiroli', 'Gondia', 'Bhandara', 'Hingoli', 'Palghar', 'Sindhudurg', 'Nandurbar'],
        sparkline: [156000, 156300, 156100, 156500, 156700, 156900, 156789],
        nextExpiry: '28-Nov-2050',
        contractsTraded24h: 45678,
        openInterest: 23450000,
        volatility: 18.5,
        aiTrend: 'up' as const,
        avgDistrictPerformance: 19.3,
        topContributor: 'Mumbai City',
        rank: 1,
        dayHigh: 157234,
        dayLow: 155890,
        week52High: 167890,
        week52Low: 123456,
        putCallRatio: 0.85,
        maxPain: 156000,
        beta: 1.15,
        range52w: {low: 123456, high: 167890},
        aum: 23450,
        totalUnits: 14567890,
        expenseRatio: 0.15,
        expiry: '28-Nov-2050',
        states: 1,
        benchmark: 'ZONIX-MH100',
        aiSentiment: 82,
        topDistricts: [
            {name: 'Mumbai City', allocation: 18.5, returns: 24.3},
            {name: 'Pune', allocation: 15.2, returns: 21.7},
            {name: 'Thane', allocation: 12.8, returns: 19.5},
            {name: 'Nashik', allocation: 10.5, returns: 17.2},
            {name: 'Nagpur', allocation: 9.8, returns: 15.8},
        ],
        sectorExposure: [
            {sector: 'Finance', percent: 32},
            {sector: 'Technology', percent: 25},
            {sector: 'Manufacturing', percent: 20},
            {sector: 'Real Estate', percent: 15},
            {sector: 'Others', percent: 8},
        ],
        performance: {
            '1y': 19.3,
            '3y': 36.8,
            '5y': 58.4,
            cagr: 15.2,
            sharpeRatio: 1.45,
        },
    },
    {
        id: 'etf-ka',
        name: 'Karnataka',
        code: 'KA',
        symbol: 'KAETF',
        value: 184234,
        nav: 1842.34,
        change: 2.87,
        dayChange: 51.42,
        districtCount: 31,
        volume: 1879000000,
        gdp: 2150000000000,
        employment: 93.8,
        tradeVolume: 1234567000,
        sentiment: 'Bullish' as const,
        districts: ['Bangalore Urban', 'Bangalore Rural', 'Mysuru', 'Tumakuru', 'Mandya', 'Chamarajanagar', 'Hassan', 'Chikkamagaluru', 'Kodagu', 'Dakshina Kannada', 'Udupi', 'Uttara Kannada', 'Shivamogga', 'Chitradurga', 'Davanagere', 'Ballari', 'Koppal', 'Raichur', 'Kalaburagi', 'Bidar', 'Yadgir', 'Vijayapura', 'Bagalkot', 'Belagavi', 'Dharwad', 'Gadag', 'Haveri', 'Ramanagara', 'Chikkaballapura', 'Kolar', 'Vijayanagara'],
        sparkline: [183000, 183500, 183800, 184000, 184100, 184200, 184234],
        nextExpiry: '28-Dec-2050',
        contractsTraded24h: 38920,
        openInterest: 18790000,
        volatility: 21.3,
        aiTrend: 'up' as const,
        avgDistrictPerformance: 26.7,
        topContributor: 'Bangalore Urban',
        rank: 2,
        dayHigh: 185445,
        dayLow: 182890,
        week52High: 189045,
        week52Low: 145678,
        putCallRatio: 0.72,
        maxPain: 184000,
        beta: 1.28,
        range52w: {low: 145678, high: 189045},
        aum: 18790,
        totalUnits: 10234567,
        expenseRatio: 0.12,
        expiry: '28-Dec-2050',
        states: 1,
        benchmark: 'ZONIX-KA100',
        aiSentiment: 88,
        topDistricts: [
            {name: 'Bangalore Urban', allocation: 22.3, returns: 32.5},
            {name: 'Mysuru', allocation: 14.5, returns: 24.8},
            {name: 'Mangaluru', allocation: 11.8, returns: 21.3},
            {name: 'Hubballi', allocation: 9.5, returns: 18.7},
            {name: 'Belgaum', allocation: 8.2, returns: 16.4},
        ],
        sectorExposure: [
            {sector: 'Technology', percent: 42},
            {sector: 'Biotech', percent: 22},
            {sector: 'Manufacturing', percent: 18},
            {sector: 'Services', percent: 12},
            {sector: 'Others', percent: 6},
        ],
        performance: {
            '1y': 26.7,
            '3y': 44.2,
            '5y': 69.3,
            cagr: 18.5,
            sharpeRatio: 1.62,
        },
    },
    {
        id: 'etf-gj',
        name: 'Gujarat',
        code: 'GJ',
        symbol: 'GJETF',
        value: 143267,
        nav: 1432.67,
        change: 1.98,
        dayChange: 27.84,
        districtCount: 33,
        volume: 1654000000,
        gdp: 1980000000000,
        employment: 92.3,
        tradeVolume: 987654000,
        sentiment: 'Bullish' as const,
        districts: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar', 'Junagadh', 'Gandhinagar', 'Anand', 'Kheda', 'Mehsana', 'Patan', 'Banaskantha', 'Sabarkantha', 'Aravalli', 'Mahisagar', 'Panchmahal', 'Dahod', 'Vadodara', 'Narmada', 'Bharuch', 'Surat', 'Navsari', 'Valsad', 'Dang', 'Tapi', 'Amreli', 'Botad', 'Gir Somnath', 'Devbhumi Dwarka', 'Porbandar', 'Kutch', 'Morbi'],
        sparkline: [142500, 142800, 143000, 143100, 143200, 143250, 143267],
        nextExpiry: '28-Jan-2051',
        contractsTraded24h: 32145,
        openInterest: 16540000,
        volatility: 17.8,
        aiTrend: 'up' as const,
        avgDistrictPerformance: 23.8,
        topContributor: 'Ahmedabad',
        rank: 3,
        dayHigh: 143890,
        dayLow: 142340,
        week52High: 148990,
        week52Low: 114523,
        putCallRatio: 0.91,
        maxPain: 143000,
        beta: 1.08,
        range52w: {low: 114523, high: 148990},
        aum: 16540,
        totalUnits: 11567890,
        expenseRatio: 0.13,
        expiry: '28-Jan-2051',
        states: 1,
        benchmark: 'ZONIX-GJ100',
        aiSentiment: 85,
        topDistricts: [
            {name: 'Ahmedabad', allocation: 19.8, returns: 26.4},
            {name: 'Surat', allocation: 16.5, returns: 23.8},
            {name: 'Vadodara', allocation: 13.2, returns: 21.5},
            {name: 'Rajkot', allocation: 11.8, returns: 19.7},
            {name: 'Gandhinagar', allocation: 9.5, returns: 17.2},
        ],
        sectorExposure: [
            {sector: 'Manufacturing', percent: 35},
            {sector: 'Textiles', percent: 25},
            {sector: 'Chemicals', percent: 20},
            {sector: 'Pharma', percent: 12},
            {sector: 'Others', percent: 8},
        ],
        performance: {
            '1y': 23.8,
            '3y': 41.6,
            '5y': 65.7,
            cagr: 16.8,
            sharpeRatio: 1.51,
        },
    },
    {
        id: 'etf-tn',
        name: 'Tamil Nadu',
        code: 'TN',
        symbol: 'TNETF',
        value: 128945,
        nav: 1289.45,
        change: 1.76,
        dayChange: 22.34,
        districtCount: 38,
        volume: 1423000000,
        gdp: 2380000000000,
        employment: 91.7,
        tradeVolume: 876543000,
        sentiment: 'Neutral' as const,
        districts: ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Tiruppur', 'Ranipet', 'Vellore', 'Erode', 'Namakkal', 'Karur', 'Dindigul', 'Pudukkottai', 'Thanjavur', 'Tiruvarur', 'Nagapattinam', 'Cuddalore', 'Viluppuram', 'Kallakurichi', 'Chengalpattu', 'Kanchipuram', 'Tiruvallur', 'Krishnagiri', 'Dharmapuri', 'Virudhunagar', 'Ramanathapuram', 'Thoothukudi', 'Tenkasi', 'Kanyakumari', 'The Nilgiris', 'Theni', 'Sivaganga', 'Ariyalur', 'Perambalur', 'Mayiladuthurai', 'Tirupattur', 'Tirupathur'],
        sparkline: [128000, 128300, 128500, 128700, 128800, 128900, 128945],
        nextExpiry: '28-Feb-2051',
        contractsTraded24h: 28934,
        openInterest: 14230000,
        volatility: 19.2,
        aiTrend: 'neutral' as const,
        avgDistrictPerformance: 21.5,
        topContributor: 'Chennai',
        rank: 4,
        dayHigh: 129567,
        dayLow: 128234,
        week52High: 134567,
        week52Low: 103456,
        putCallRatio: 1.02,
        maxPain: 129000,
        beta: 0.98,
        range52w: {low: 103456, high: 134567},
        aum: 14230,
        totalUnits: 11034567,
        expenseRatio: 0.14,
        expiry: '28-Feb-2051',
        states: 1,
        benchmark: 'ZONIX-TN100',
        aiSentiment: 79,
        topDistricts: [
            {name: 'Chennai', allocation: 20.5, returns: 22.8},
            {name: 'Coimbatore', allocation: 15.8, returns: 20.4},
            {name: 'Madurai', allocation: 12.5, returns: 18.9},
            {name: 'Salem', allocation: 10.2, returns: 16.7},
            {name: 'Tiruchirappalli', allocation: 8.9, returns: 15.3},
        ],
        sectorExposure: [
            {sector: 'Automotive', percent: 30},
            {sector: 'Manufacturing', percent: 25},
            {sector: 'Textiles', percent: 20},
            {sector: 'IT Services', percent: 15},
            {sector: 'Others', percent: 10},
        ],
        performance: {
            '1y': 21.5,
            '3y': 39.4,
            '5y': 62.1,
            cagr: 15.8,
            sharpeRatio: 1.42,
        },
    },
];

export function MutualFunds({onLogout}: MutualFundsProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState<'mutual-funds' | 'state-etfs'>('mutual-funds');
    const [liveTickers] = useState(generateDistrictTokens(10));

    const navigate = useNavigate();

    const COLORS = ['#FBBF24', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899'];

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-background to-amber-50/20 dark:to-amber-950/10 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/5 dark:bg-amber-500/3 rounded-full blur-3xl"/>
                <div
                    className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-yellow-500/5 dark:bg-yellow-500/3 rounded-full blur-3xl"/>
            </div>

            {/* Main Content */}
            <div className="relative z-10">
                <div className="container mx-auto px-6 py-8">
                    {/* Header */}
                    <motion.div
                        initial={{opacity: 0, y: -20}}
                        animate={{opacity: 1, y: 0}}
                        className="mb-8"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div
                                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 flex items-center justify-center shadow-lg shadow-yellow-500/50">
                                <Sparkles className="w-7 h-7 text-white"/>
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 bg-clip-text text-transparent">
                                    Mutual Funds 2.0
                                </h1>
                                <p className="text-sm text-muted-foreground mt-1">
                                    AI-Powered Wealth Creation Ecosystem • The Future of Bharat Investment
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Portfolio Stats */}
                    <div className="grid md:grid-cols-4 gap-6 mb-8">
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.1}}
                        >
                            <Card
                                className="relative overflow-hidden border-2 border-yellow-500/30 bg-gradient-to-br from-card via-yellow-50/5 dark:via-yellow-950/10 to-card backdrop-blur-xl shadow-xl">
                                <div
                                    className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl"></div>
                                <div className="relative p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div
                                            className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                                            <Wallet className="w-6 h-6 text-white"/>
                                        </div>
                                        <Badge
                                            className="bg-green-500/20 text-green-600 dark:text-green-400 border border-green-500/40">
                                            +24.5%
                                        </Badge>
                                    </div>
                                    <div className="text-sm text-muted-foreground mb-1">Total Investment</div>
                                    <div
                                        className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent">
                                        ₹8.45L
                                    </div>
                                    <div className="text-xs text-muted-foreground mt-2">12 Active Investments</div>
                                </div>
                            </Card>
                        </motion.div>

                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.2}}
                        >
                            <Card
                                className="relative overflow-hidden border-2 border-amber-500/30 bg-gradient-to-br from-card via-amber-50/5 dark:via-amber-950/10 to-card backdrop-blur-xl shadow-xl">
                                <div
                                    className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl"></div>
                                <div className="relative p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div
                                            className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center shadow-lg">
                                            <TrendingUp className="w-6 h-6 text-white"/>
                                        </div>
                                        <Badge
                                            className="bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border border-yellow-500/40">
                                            Returns
                                        </Badge>
                                    </div>
                                    <div className="text-sm text-muted-foreground mb-1">Current Value</div>
                                    <div
                                        className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                                        ₹10.52L
                                    </div>
                                    <div className="text-xs text-green-600 dark:text-green-400 mt-2">
                                        +₹2.07L Profit
                                    </div>
                                </div>
                            </Card>
                        </motion.div>

                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.3}}
                        >
                            <Card
                                className="relative overflow-hidden border-2 border-orange-500/30 bg-gradient-to-br from-card via-orange-50/5 dark:via-orange-950/10 to-card backdrop-blur-xl shadow-xl">
                                <div
                                    className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl"></div>
                                <div className="relative p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div
                                            className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
                                            <Activity className="w-6 h-6 text-white"/>
                                        </div>
                                        <Badge
                                            className="bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/40">
                                            AI Score
                                        </Badge>
                                    </div>
                                    <div className="text-sm text-muted-foreground mb-1">Portfolio Health</div>
                                    <div
                                        className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                                        Excellent
                                    </div>
                                    <div className="text-xs text-purple-600 dark:text-purple-400 mt-2">
                                        95/100 Score
                                    </div>
                                </div>
                            </Card>
                        </motion.div>

                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.4}}
                        >
                            <Card
                                className="relative overflow-hidden border-2 border-blue-500/30 bg-gradient-to-br from-card via-blue-50/5 dark:via-blue-950/10 to-card backdrop-blur-xl shadow-xl">
                                <div
                                    className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
                                <div className="relative p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div
                                            className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg">
                                            <Sparkles className="w-6 h-6 text-white"/>
                                        </div>
                                        <Badge
                                            className="bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/40">
                                            New
                                        </Badge>
                                    </div>
                                    <div className="text-sm text-muted-foreground mb-1">AI Recommendations</div>
                                    <div
                                        className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                                        5
                                    </div>
                                    <div className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                                        Top Picks for You
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Search and Filter */}
                    <div className="flex items-center gap-4 mb-8">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"/>
                            <Input
                                placeholder="Search funds, ETFs, sectors, managers..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-12 h-14 rounded-2xl border-2 border-yellow-500/30 bg-card/50 backdrop-blur-xl focus:border-yellow-500/60 transition-all"
                            />
                        </div>
                        <Button
                            variant="outline"
                            className="h-14 px-6 rounded-2xl border-2 border-yellow-500/30 hover:bg-yellow-500/10 hover:border-yellow-500/50 transition-all gap-2"
                        >
                            <Filter className="w-5 h-5"/>
                            Filters
                        </Button>
                    </div>

                    {/* Main Tabs */}
                    <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-8 bg-muted/50 p-1.5 rounded-2xl h-14">
                            <TabsTrigger
                                value="mutual-funds"
                                className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-amber-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-yellow-500/50 transition-all"
                            >
                                <Sparkles className="w-5 h-5 mr-2"/>
                                Mutual Funds 2.0
                            </TabsTrigger>
                            <TabsTrigger
                                value="state-etfs"
                                className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-blue-500/50 transition-all"
                            >
                                <MapPin className="w-5 h-5 mr-2"/>
                                State ETFs
                            </TabsTrigger>
                        </TabsList>

                        {/* Mutual Funds Tab */}
                        <TabsContent value="mutual-funds" className="mt-0">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    exit={{opacity: 0, y: -20}}
                                    className="grid lg:grid-cols-2 gap-6"
                                >
                                    {mutualFunds.map((fund, index) => (
                                        <motion.div
                                            key={fund.id}
                                            initial={{opacity: 0, scale: 0.95}}
                                            animate={{opacity: 1, scale: 1}}
                                            transition={{delay: index * 0.1}}
                                            whileHover={{scale: 1.02, y: -4}}
                                            className="cursor-pointer"
                                            onClick={() => navigate('mutual-fund-detail')}
                                        >
                                            <Card
                                                className="relative overflow-hidden border-2 border-yellow-500/30 bg-gradient-to-br from-card via-yellow-50/5 dark:via-yellow-950/10 to-card backdrop-blur-xl hover:border-yellow-500/60 hover:shadow-2xl hover:shadow-yellow-500/20 transition-all">
                                                {/* Glow Effect */}
                                                <div
                                                    className="absolute -top-20 -right-20 w-40 h-40 bg-yellow-500/20 rounded-full blur-3xl"></div>

                                                <div className="relative p-6">
                                                    {/* Header */}
                                                    <div className="flex items-start justify-between mb-6">
                                                        <div className="flex items-center gap-3">
                                                            <div
                                                                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 flex items-center justify-center shadow-lg shadow-yellow-500/50">
                                                                <Sparkles className="w-7 h-7 text-white"/>
                                                            </div>
                                                            <div>
                                                                <h3 className="text-lg font-bold">{fund.name}</h3>
                                                                <div className="flex items-center gap-2 mt-1">
                                                                    <Badge
                                                                        variant="outline"
                                                                        className="border-yellow-500/40 text-yellow-600 dark:text-yellow-400 text-xs"
                                                                    >
                                                                        {fund.category}
                                                                    </Badge>
                                                                    <Badge
                                                                        variant="outline"
                                                                        className="border-amber-500/40 text-amber-600 dark:text-amber-400 text-xs"
                                                                    >
                                                                        {fund.subcategory}
                                                                    </Badge>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <Badge
                                                            className={`${
                                                                fund.change >= 0
                                                                    ? 'bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/40'
                                                                    : 'bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/40'
                                                            } border`}
                                                        >
                                                            {fund.change >= 0 ? '+' : ''}
                                                            {fund.change}%
                                                        </Badge>
                                                    </div>

                                                    {/* NAV Section */}
                                                    <div
                                                        className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-border">
                                                        <div>
                                                            <div className="text-xs text-muted-foreground mb-1.5">
                                                                NAV
                                                            </div>
                                                            <div
                                                                className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent">
                                                                ₹{fund.nav.toFixed(2)}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="text-xs text-muted-foreground mb-1.5">AUM
                                                            </div>
                                                            <div
                                                                className="text-xl font-bold">₹{(fund.aum / 10).toFixed(0)}Cr
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="text-xs text-muted-foreground mb-1.5">Risk
                                                            </div>
                                                            <Badge
                                                                className={`${
                                                                    fund.risk === 'High'
                                                                        ? 'bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/40'
                                                                        : fund.risk === 'Moderate'
                                                                            ? 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/40'
                                                                            : 'bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/40'
                                                                } border`}
                                                            >
                                                                {fund.risk}
                                                            </Badge>
                                                        </div>
                                                    </div>

                                                    {/* Returns Chips */}
                                                    <div className="mb-6">
                                                        <div className="text-sm font-semibold mb-3">Returns</div>
                                                        <div className="grid grid-cols-6 gap-2">
                                                            {Object.entries(fund.returns).map(([period, value]) => (
                                                                <div
                                                                    key={period}
                                                                    className="text-center p-2 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30"
                                                                >
                                                                    <div className="text-xs text-muted-foreground mb-1">
                                                                        {period.toUpperCase()}
                                                                    </div>
                                                                    <div
                                                                        className="text-xs font-bold text-green-600 dark:text-green-400">
                                                                        +{value}%
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Risk Meter */}
                                                    <div className="mb-6">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <div className="text-sm font-semibold">Risk Meter</div>
                                                            <div className="flex items-center gap-1">
                                                                {[...Array(5)].map((_, i) => (
                                                                    <Star
                                                                        key={i}
                                                                        className={`w-3.5 h-3.5 ${
                                                                            i < Math.floor(fund.rating)
                                                                                ? 'fill-yellow-500 text-yellow-500'
                                                                                : 'text-gray-300 dark:text-gray-600'
                                                                        }`}
                                                                    />
                                                                ))}
                                                                <span className="text-xs text-muted-foreground ml-1">
                                  {fund.rating}
                                </span>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="relative h-2 bg-muted rounded-full overflow-hidden">
                                                            <div
                                                                className={`absolute top-0 left-0 h-full rounded-full ${
                                                                    fund.risk === 'Low'
                                                                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 w-1/3'
                                                                        : fund.risk === 'Moderate'
                                                                            ? 'bg-gradient-to-r from-yellow-500 to-amber-500 w-2/3'
                                                                            : 'bg-gradient-to-r from-orange-500 to-red-500 w-full'
                                                                }`}
                                                            ></div>
                                                        </div>
                                                        <div
                                                            className="flex justify-between text-xs text-muted-foreground mt-1">
                                                            <span>Low</span>
                                                            <span>Moderate</span>
                                                            <span>High</span>
                                                        </div>
                                                    </div>

                                                    {/* Fund Details */}
                                                    <div className="grid grid-cols-2 gap-3 mb-6">
                                                        <div className="p-3 rounded-lg bg-muted/50">
                                                            <div className="text-xs text-muted-foreground mb-1">
                                                                Expense Ratio
                                                            </div>
                                                            <div className="font-semibold">{fund.expenseRatio}%</div>
                                                        </div>
                                                        <div className="p-3 rounded-lg bg-muted/50">
                                                            <div className="text-xs text-muted-foreground mb-1">
                                                                Min Investment
                                                            </div>
                                                            <div
                                                                className="font-semibold">₹{fund.minInvestment.toLocaleString()}</div>
                                                        </div>
                                                    </div>

                                                    {/* Action Buttons */}
                                                    <div className="grid grid-cols-3 gap-2">
                                                        <Button
                                                            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg shadow-green-500/30">
                                                            <Plus className="w-4 h-4 mr-1"/>
                                                            SIP
                                                        </Button>
                                                        <Button
                                                            className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white shadow-lg shadow-yellow-500/30">
                                                            <Wallet className="w-4 h-4 mr-1"/>
                                                            Lumpsum
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            className="border-2 border-yellow-500/40 hover:bg-yellow-500/10"
                                                        >
                                                            <Eye className="w-4 h-4 mr-1"/>
                                                            Details
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </AnimatePresence>
                        </TabsContent>

                        {/* State ETFs Tab */}
                        <TabsContent value="state-etfs" className="mt-0">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    exit={{opacity: 0, y: -20}}
                                    className="grid lg:grid-cols-2 gap-6"
                                >
                                    {stateETFs.map((etf, index) => (
                                        <motion.div
                                            key={etf.id}
                                            initial={{opacity: 0, scale: 0.95}}
                                            animate={{opacity: 1, scale: 1}}
                                            transition={{delay: index * 0.1}}
                                            whileHover={{scale: 1.02, y: -4}}
                                            className="cursor-pointer"
                                            onClick={() => navigate('state-fno-detail')}
                                        >
                                            <Card
                                                className="relative overflow-hidden border-2 border-blue-500/30 bg-gradient-to-br from-card via-blue-50/5 dark:via-blue-950/10 to-card backdrop-blur-xl hover:border-blue-500/60 hover:shadow-2xl hover:shadow-blue-500/20 transition-all">
                                                {/* Glow Effect */}
                                                <div
                                                    className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>

                                                <div className="relative p-6">
                                                    {/* Header */}
                                                    <div className="flex items-start justify-between mb-6">
                                                        <div className="flex items-center gap-3">
                                                            <div
                                                                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400 via-blue-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-blue-500/50">
                                                                <MapPin className="w-7 h-7 text-white"/>
                                                            </div>
                                                            <div>
                                                                <h3 className="text-lg font-bold">{etf.name} Index
                                                                    ETF</h3>
                                                                <div className="flex items-center gap-2 mt-1">
                                                                    <Badge
                                                                        variant="outline"
                                                                        className="border-blue-500/40 text-blue-600 dark:text-blue-400 text-xs"
                                                                    >
                                                                        {etf.symbol}
                                                                    </Badge>
                                                                    <Badge
                                                                        variant="outline"
                                                                        className="border-cyan-500/40 text-cyan-600 dark:text-cyan-400 text-xs"
                                                                    >
                                                                        {etf.districtCount} Districts
                                                                    </Badge>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <Badge
                                                            className={`${
                                                                etf.change >= 0
                                                                    ? 'bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/40'
                                                                    : 'bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/40'
                                                            } border`}
                                                        >
                                                            {etf.change >= 0 ? '+' : ''}
                                                            {etf.change}%
                                                        </Badge>
                                                    </div>

                                                    {/* NAV and Stats */}
                                                    <div
                                                        className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-border">
                                                        <div>
                                                            <div className="text-xs text-muted-foreground mb-1.5">
                                                                Current NAV
                                                            </div>
                                                            <div
                                                                className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                                                                ₹{etf.nav.toFixed(2)}
                                                            </div>
                                                            <div
                                                                className="text-xs text-green-600 dark:text-green-400 mt-1">
                                                                +₹{etf.dayChange.toFixed(2)}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="text-xs text-muted-foreground mb-1.5">52W
                                                                Range
                                                            </div>
                                                            <div className="text-sm font-semibold">
                                                                ₹{etf.range52w.low.toFixed(0)}
                                                            </div>
                                                            <div className="text-sm font-semibold">
                                                                ₹{etf.range52w.high.toFixed(0)}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="text-xs text-muted-foreground mb-1.5">AI
                                                                Sentiment
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <div
                                                                    className="text-2xl font-bold text-green-600 dark:text-green-400">
                                                                    {etf.aiSentiment}
                                                                </div>
                                                                <div className="text-xs text-muted-foreground">/100
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Top Districts Carousel */}
                                                    <div className="mb-6">
                                                        <div className="text-sm font-semibold mb-3">Top Performing
                                                            Districts
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-2">
                                                            {etf.topDistricts.slice(0, 4).map((district, idx) => (
                                                                <div
                                                                    key={idx}
                                                                    className="p-2.5 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30"
                                                                >
                                                                    <div
                                                                        className="flex items-center justify-between mb-1">
                                                                        <div className="text-xs font-medium truncate">
                                                                            {district.name}
                                                                        </div>
                                                                        <div
                                                                            className="text-xs font-bold text-green-600 dark:text-green-400">
                                                                            +{district.returns}%
                                                                        </div>
                                                                    </div>
                                                                    <div className="text-xs text-muted-foreground">
                                                                        {district.allocation}% allocation
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Performance Stats */}
                                                    <div className="mb-6">
                                                        <div className="text-sm font-semibold mb-3">Performance</div>
                                                        <div className="grid grid-cols-4 gap-2">
                                                            <div
                                                                className="text-center p-2 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30">
                                                                <div className="text-xs text-muted-foreground mb-1">1Y
                                                                </div>
                                                                <div
                                                                    className="text-sm font-bold text-green-600 dark:text-green-400">
                                                                    +{etf.performance['1y']}%
                                                                </div>
                                                            </div>
                                                            <div
                                                                className="text-center p-2 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30">
                                                                <div className="text-xs text-muted-foreground mb-1">3Y
                                                                </div>
                                                                <div
                                                                    className="text-sm font-bold text-green-600 dark:text-green-400">
                                                                    +{etf.performance['3y']}%
                                                                </div>
                                                            </div>
                                                            <div
                                                                className="text-center p-2 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30">
                                                                <div className="text-xs text-muted-foreground mb-1">5Y
                                                                </div>
                                                                <div
                                                                    className="text-sm font-bold text-green-600 dark:text-green-400">
                                                                    +{etf.performance['5y']}%
                                                                </div>
                                                            </div>
                                                            <div
                                                                className="text-center p-2 rounded-lg bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border border-yellow-500/30">
                                                                <div
                                                                    className="text-xs text-muted-foreground mb-1">CAGR
                                                                </div>
                                                                <div
                                                                    className="text-sm font-bold text-yellow-600 dark:text-yellow-400">
                                                                    {etf.performance.cagr}%
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* ETF Details */}
                                                    <div className="grid grid-cols-3 gap-3 mb-6">
                                                        <div className="p-3 rounded-lg bg-muted/50">
                                                            <div className="text-xs text-muted-foreground mb-1">AUM
                                                            </div>
                                                            <div
                                                                className="text-sm font-semibold">₹{(etf.aum / 10).toFixed(0)}Cr
                                                            </div>
                                                        </div>
                                                        <div className="p-3 rounded-lg bg-muted/50">
                                                            <div
                                                                className="text-xs text-muted-foreground mb-1">Expense
                                                            </div>
                                                            <div className="text-sm font-semibold">{etf.expenseRatio}%
                                                            </div>
                                                        </div>
                                                        <div className="p-3 rounded-lg bg-muted/50">
                                                            <div className="text-xs text-muted-foreground mb-1">Expiry
                                                            </div>
                                                            <div className="text-xs font-semibold">{etf.expiry}</div>
                                                        </div>
                                                    </div>

                                                    {/* Sector Exposure Badges */}
                                                    <div className="mb-6">
                                                        <div className="text-sm font-semibold mb-3">Sector Exposure
                                                        </div>
                                                        <div className="flex flex-wrap gap-2">
                                                            {etf.sectorExposure.slice(0, 4).map((sector, idx) => (
                                                                <Badge
                                                                    key={idx}
                                                                    variant="outline"
                                                                    className="border-blue-500/40 text-blue-600 dark:text-blue-400"
                                                                >
                                                                    {sector.sector} • {sector.percent}%
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Action Buttons */}
                                                    <div className="grid grid-cols-3 gap-2">
                                                        <Button
                                                            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg shadow-green-500/30">
                                                            <Plus className="w-4 h-4 mr-1"/>
                                                            Buy
                                                        </Button>
                                                        <Button
                                                            className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white shadow-lg shadow-red-500/30">
                                                            <TrendingDownIcon className="w-4 h-4 mr-1"/>
                                                            Sell
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            className="border-2 border-blue-500/40 hover:bg-blue-500/10"
                                                        >
                                                            <Eye className="w-4 h-4 mr-1"/>
                                                            Details
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </AnimatePresence>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
