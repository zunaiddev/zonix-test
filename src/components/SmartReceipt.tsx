import React, {useMemo, useState} from 'react';
import {
    Award,
    BarChart3,
    Calendar,
    CheckCircle,
    ChevronRight,
    DollarSign,
    Download,
    FileText,
    Filter,
    Receipt,
    Sparkles,
    Star,
    TrendingDown,
    TrendingUp,
    TrendingUpIcon,
    Zap
} from 'lucide-react';
import {formatCurrency, formatDateTime, generateMockReceipts, Receipt as ReceiptType} from '../utils/receipt-utils';
import {motion} from 'motion/react';
import {useNavigate} from "react-router-dom";

export function SmartReceipt() {
    const [receipts] = useState<ReceiptType[]>(() => generateMockReceipts());
    const [filterType, setFilterType] = useState<'all' | 'BUY' | 'SELL'>('all');
    const [filterProfitLoss, setFilterProfitLoss] = useState<'all' | 'profit' | 'loss'>('all');
    const [dateRange, setDateRange] = useState<'all' | '7days' | '30days' | '60days'>('all');
    const navigate = useNavigate();
    // Filter receipts
    const filteredReceipts = useMemo(() => {
        return receipts.filter((receipt) => {
            // Filter by type
            if (filterType !== 'all' && receipt.type !== filterType) return false;

            // Filter by profit/loss
            if (filterProfitLoss === 'profit' && receipt.profitLoss <= 0) return false;
            if (filterProfitLoss === 'loss' && receipt.profitLoss > 0) return false;

            // Filter by date range
            if (dateRange !== 'all') {
                const now = new Date();
                const daysAgo = dateRange === '7days' ? 7 : dateRange === '30days' ? 30 : 60;
                const cutoffDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
                if (receipt.timestamp < cutoffDate) return false;
            }

            return true;
        });
    }, [receipts, filterType, filterProfitLoss, dateRange]);

    // Calculate statistics
    const stats = useMemo(() => {
        const totalProfit = filteredReceipts.reduce((sum, r) => sum + (r.profitLoss > 0 ? r.profitLoss : 0), 0);
        const totalLoss = filteredReceipts.reduce((sum, r) => sum + (r.profitLoss < 0 ? Math.abs(r.profitLoss) : 0), 0);
        const totalFeesPaid = filteredReceipts.reduce((sum, r) => sum + r.finalPayable, 0);
        const totalRebates = filteredReceipts.filter(r => r.rebateApplied).length * 5; // ₹5 rebate per loss trade
        const winningTrades = filteredReceipts.filter(r => r.profitLoss > 0).length;
        const winRate = filteredReceipts.length > 0 ? (winningTrades / filteredReceipts.length) * 100 : 0;

        return {
            totalProfit,
            totalLoss,
            netProfitLoss: totalProfit - totalLoss,
            totalFeesPaid,
            totalRebates,
            totalTrades: filteredReceipts.length,
            winRate,
        };
    }, [filteredReceipts]);

    return (
        <div className="min-h-screen p-6 space-y-6">
            {/* Animated Background Gradient */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div
                    className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"/>
                <div
                    className="absolute top-1/3 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"
                    style={{animationDelay: '1s'}}/>
                <div
                    className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-yellow-600/10 rounded-full blur-3xl animate-pulse"
                    style={{animationDelay: '2s'}}/>
            </div>

            {/* Premium Header Card */}
            <motion.div
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5}}
                className="relative group"
            >
                {/* Glow Effect */}
                <div
                    className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-3xl opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500"/>

                <div
                    className="relative bg-card border border-border rounded-3xl p-8 shadow-2xl hover:shadow-yellow-500/20 transition-all duration-500 hover:scale-[1.01]">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            {/* Premium Icon with Animation */}
                            <motion.div
                                whileHover={{scale: 1.05, rotate: 5}}
                                className="relative p-5 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-2xl shadow-2xl"
                            >
                                <div
                                    className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-yellow-700 rounded-2xl opacity-50 blur-md"/>
                                <Receipt className="w-10 h-10 text-white relative z-10 drop-shadow-lg"/>
                                <div
                                    className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background shadow-lg animate-pulse"/>
                            </motion.div>

                            <div>
                                <motion.h1
                                    initial={{opacity: 0, x: -20}}
                                    animate={{opacity: 1, x: 0}}
                                    transition={{delay: 0.2}}
                                    className="text-foreground mb-1 drop-shadow-sm flex items-center gap-2"
                                >
                                    Smart Receipt System
                                    <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse"/>
                                </motion.h1>
                                <p className="text-muted-foreground flex items-center gap-2">
                                    <Zap className="w-4 h-4 text-yellow-500"/>
                                    Track every trade with detailed receipts & insights
                                </p>
                            </div>
                        </div>

                        {/* Premium Action Button */}
                        <motion.button
                            whileHover={{scale: 1.05, y: -2}}
                            whileTap={{scale: 0.95}}
                            className="relative px-8 py-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white rounded-2xl shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 flex items-center gap-3 overflow-hidden group"
                        >
                            <div
                                className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                            <Download className="w-5 h-5 relative z-10 group-hover:animate-bounce"/>
                            <span className="relative z-10">Export All</span>
                        </motion.button>
                    </div>

                    {/* Professional Header */}
                    <div className="mt-6 pt-6 border-t border-border text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500"/>
                            <p className="text-foreground drop-shadow-sm">ZONIX — Trade the Heartbeat of Bharat</p>
                            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500"/>
                        </div>
                        <p className="text-muted-foreground text-sm flex items-center justify-center gap-3 flex-wrap">
                            <span className="px-3 py-1 bg-yellow-500/20 rounded-lg">Official Transaction Receipts</span>
                            <span>•</span>
                            <span>www.zonix.tech</span>
                            <span>•</span>
                            <span>support@zonix.tech</span>
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Premium Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Profit Card */}
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.1}}
                    className="relative group"
                >
                    <div
                        className="absolute -inset-0.5 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl opacity-20 blur-lg group-hover:opacity-40 transition-opacity duration-500"/>
                    <div
                        className="relative bg-card border border-border rounded-2xl p-6 hover:bg-accent transition-all duration-300 group-hover:scale-[1.03] shadow-xl">
                        <div className="flex items-center justify-between mb-4">
                            <motion.div
                                whileHover={{scale: 1.1, rotate: 5}}
                                className="p-4 bg-gradient-to-br from-green-400 to-green-600 rounded-xl shadow-lg"
                            >
                                <TrendingUp className="w-7 h-7 text-white drop-shadow-lg"/>
                            </motion.div>
                            <span className="text-green-600 drop-shadow-sm px-3 py-1 bg-green-500/20 rounded-lg">
                +{stats.totalProfit > 0 ? ((stats.totalProfit / (stats.totalProfit + stats.totalLoss)) * 100).toFixed(1) : 0}%
              </span>
                        </div>
                        <p className="text-muted-foreground text-sm mb-2">Total Profit</p>
                        <p className="text-foreground drop-shadow-sm mb-2">{formatCurrency(stats.totalProfit)}</p>
                        <div className="h-1 bg-border rounded-full overflow-hidden">
                            <motion.div
                                initial={{width: 0}}
                                animate={{width: `${stats.totalProfit > 0 ? ((stats.totalProfit / (stats.totalProfit + stats.totalLoss)) * 100) : 0}%`}}
                                transition={{duration: 1, delay: 0.5}}
                                className="h-full bg-gradient-to-r from-green-400 to-green-600"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Total Loss Card */}
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.2}}
                    className="relative group"
                >
                    <div
                        className="absolute -inset-0.5 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl opacity-20 blur-lg group-hover:opacity-40 transition-opacity duration-500"/>
                    <div
                        className="relative bg-card border border-border rounded-2xl p-6 hover:bg-accent transition-all duration-300 group-hover:scale-[1.03] shadow-xl">
                        <div className="flex items-center justify-between mb-4">
                            <motion.div
                                whileHover={{scale: 1.1, rotate: -5}}
                                className="p-4 bg-gradient-to-br from-red-400 to-red-600 rounded-xl shadow-lg"
                            >
                                <TrendingDown className="w-7 h-7 text-white drop-shadow-lg"/>
                            </motion.div>
                            <span className="text-red-600 drop-shadow-sm px-3 py-1 bg-red-500/20 rounded-lg">
                -{stats.totalLoss > 0 ? ((stats.totalLoss / (stats.totalProfit + stats.totalLoss)) * 100).toFixed(1) : 0}%
              </span>
                        </div>
                        <p className="text-muted-foreground text-sm mb-2">Total Loss</p>
                        <p className="text-foreground drop-shadow-sm mb-2">{formatCurrency(stats.totalLoss)}</p>
                        <div className="h-1 bg-border rounded-full overflow-hidden">
                            <motion.div
                                initial={{width: 0}}
                                animate={{width: `${stats.totalLoss > 0 ? ((stats.totalLoss / (stats.totalProfit + stats.totalLoss)) * 100) : 0}%`}}
                                transition={{duration: 1, delay: 0.5}}
                                className="h-full bg-gradient-to-r from-red-400 to-red-600"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Win Rate Card */}
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.3}}
                    className="relative group"
                >
                    <div
                        className="absolute -inset-0.5 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl opacity-20 blur-lg group-hover:opacity-40 transition-opacity duration-500"/>
                    <div
                        className="relative bg-card border border-border rounded-2xl p-6 hover:bg-accent transition-all duration-300 group-hover:scale-[1.03] shadow-xl">
                        <div className="flex items-center justify-between mb-4">
                            <motion.div
                                whileHover={{scale: 1.1, rotate: 180}}
                                transition={{duration: 0.3}}
                                className="p-4 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl shadow-lg"
                            >
                                <Award className="w-7 h-7 text-white drop-shadow-lg"/>
                            </motion.div>
                            <motion.div
                                animate={{scale: [1, 1.1, 1]}}
                                transition={{duration: 2, repeat: Infinity}}
                            >
                                <Sparkles className="w-5 h-5 text-yellow-500"/>
                            </motion.div>
                        </div>
                        <p className="text-muted-foreground text-sm mb-2">Win Rate</p>
                        <p className="text-foreground drop-shadow-sm mb-2">{stats.winRate.toFixed(1)}%</p>
                        <p className="text-yellow-600 text-xs">
                            Rebates: {formatCurrency(stats.totalRebates)}
                        </p>
                    </div>
                </motion.div>

                {/* Net P&L Card */}
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.4}}
                    className="relative group"
                >
                    <div
                        className={`absolute -inset-0.5 rounded-2xl opacity-20 blur-lg group-hover:opacity-40 transition-opacity duration-500 ${
                            stats.netProfitLoss >= 0
                                ? 'bg-gradient-to-br from-green-400 to-green-600'
                                : 'bg-gradient-to-br from-red-400 to-red-600'
                        }`}/>
                    <div
                        className="relative bg-card border border-border rounded-2xl p-6 hover:bg-accent transition-all duration-300 group-hover:scale-[1.03] shadow-xl">
                        <div className="flex items-center justify-between mb-4">
                            <motion.div
                                whileHover={{scale: 1.1}}
                                className={`p-4 rounded-xl shadow-lg ${
                                    stats.netProfitLoss >= 0
                                        ? 'bg-gradient-to-br from-green-400 to-green-600'
                                        : 'bg-gradient-to-br from-red-400 to-red-600'
                                }`}
                            >
                                <BarChart3 className="w-7 h-7 text-white drop-shadow-lg"/>
                            </motion.div>
                        </div>
                        <p className="text-muted-foreground text-sm mb-2">Net P&L</p>
                        <p className={`drop-shadow-sm mb-2 ${stats.netProfitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {stats.netProfitLoss >= 0 ? '+' : ''}{formatCurrency(Math.abs(stats.netProfitLoss))}
                        </p>
                        <p className="text-muted-foreground text-xs">{stats.totalTrades} trades</p>
                    </div>
                </motion.div>
            </div>

            {/* Premium Filters Section */}
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.5}}
                className="relative group"
            >
                <div
                    className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400/20 via-yellow-500/20 to-yellow-600/20 rounded-2xl blur-lg"/>
                <div className="relative bg-card border border-border rounded-2xl p-6 shadow-xl">
                    <div className="flex items-center gap-3 mb-6">
                        <motion.div
                            whileHover={{rotate: 180}}
                            transition={{duration: 0.3}}
                        >
                            <Filter className="w-6 h-6 text-yellow-500"/>
                        </motion.div>
                        <h2 className="text-foreground drop-shadow-sm">Smart Filters</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Type Filter */}
                        <div>
                            <label className="text-muted-foreground text-sm mb-3 block flex items-center gap-2">
                                <TrendingUpIcon className="w-4 h-4 text-yellow-500"/>
                                Trade Type
                            </label>
                            <div className="flex gap-2">
                                {(['all', 'BUY', 'SELL'] as const).map((type) => (
                                    <motion.button
                                        key={type}
                                        whileHover={{scale: 1.05, y: -2}}
                                        whileTap={{scale: 0.95}}
                                        onClick={() => setFilterType(type)}
                                        className={`flex-1 px-4 py-3 rounded-xl transition-all duration-300 shadow-md ${
                                            filterType === type
                                                ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-yellow-500/50'
                                                : 'bg-accent text-foreground hover:bg-accent/80'
                                        }`}
                                    >
                                        {type === 'all' ? 'All' : type}
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* P&L Filter */}
                        <div>
                            <label className="text-muted-foreground text-sm mb-3 block flex items-center gap-2">
                                <DollarSign className="w-4 h-4 text-yellow-500"/>
                                Profit/Loss
                            </label>
                            <div className="flex gap-2">
                                {(['all', 'profit', 'loss'] as const).map((pl) => (
                                    <motion.button
                                        key={pl}
                                        whileHover={{scale: 1.05, y: -2}}
                                        whileTap={{scale: 0.95}}
                                        onClick={() => setFilterProfitLoss(pl)}
                                        className={`flex-1 px-4 py-3 rounded-xl transition-all duration-300 shadow-md ${
                                            filterProfitLoss === pl
                                                ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-yellow-500/50'
                                                : 'bg-accent text-foreground hover:bg-accent/80'
                                        }`}
                                    >
                                        {pl === 'all' ? 'All' : pl === 'profit' ? 'Profit' : 'Loss'}
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Date Range Filter */}
                        <div>
                            <label className="text-muted-foreground text-sm mb-3 block flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-yellow-500"/>
                                Date Range
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {(['all', '7days', '30days', '60days'] as const).map((range) => (
                                    <motion.button
                                        key={range}
                                        whileHover={{scale: 1.05, y: -2}}
                                        whileTap={{scale: 0.95}}
                                        onClick={() => setDateRange(range)}
                                        className={`px-3 py-3 rounded-xl transition-all duration-300 text-sm shadow-md ${
                                            dateRange === range
                                                ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-yellow-500/50'
                                                : 'bg-accent text-foreground hover:bg-accent/80'
                                        }`}
                                    >
                                        {range === 'all' ? 'All Time' : range === '7days' ? '7 Days' : range === '30days' ? '30 Days' : '60 Days'}
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Receipt List */}
            <div className="space-y-4">
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 0.6}}
                    className="flex items-center justify-between"
                >
                    <h2 className="text-foreground drop-shadow-sm flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg">
                            <FileText className="w-5 h-5 text-white"/>
                        </div>
                        Transaction History ({filteredReceipts.length})
                    </h2>
                </motion.div>

                {filteredReceipts.length === 0 ? (
                    <motion.div
                        initial={{opacity: 0, scale: 0.9}}
                        animate={{opacity: 1, scale: 1}}
                        transition={{delay: 0.7}}
                        className="relative group"
                    >
                        <div
                            className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 rounded-2xl blur-lg"/>
                        <div className="relative bg-card border border-border rounded-2xl p-12 text-center shadow-xl">
                            <motion.div
                                animate={{y: [0, -10, 0]}}
                                transition={{duration: 2, repeat: Infinity}}
                            >
                                <Receipt className="w-20 h-20 text-muted-foreground mx-auto mb-4"/>
                            </motion.div>
                            <p className="text-foreground text-lg">No receipts found matching your filters</p>
                            <p className="text-muted-foreground text-sm mt-2">Try adjusting your filter criteria</p>
                        </div>
                    </motion.div>
                ) : (
                    <div className="space-y-4">
                        {filteredReceipts.map((receipt, index) => (
                            <motion.div
                                key={receipt.id}
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: 0.7 + index * 0.05}}
                                onClick={() => navigate('receipt-detail')}
                                className="relative group cursor-pointer"
                            >
                                {/* Glow Effect on Hover */}
                                <div
                                    className={`absolute -inset-0.5 rounded-2xl opacity-0 blur-lg group-hover:opacity-30 transition-opacity duration-500 ${
                                        receipt.type === 'BUY'
                                            ? 'bg-gradient-to-r from-green-400 to-green-600'
                                            : 'bg-gradient-to-r from-red-400 to-red-600'
                                    }`}/>

                                <div
                                    className="relative bg-card border border-border rounded-2xl p-6 hover:bg-accent hover:scale-[1.02] transition-all duration-300 shadow-xl hover:shadow-2xl">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-5 flex-1">
                                            {/* Premium Icon */}
                                            <motion.div
                                                whileHover={{scale: 1.15, rotate: receipt.type === 'BUY' ? 10 : -10}}
                                                className={`relative p-4 rounded-2xl shadow-lg ${
                                                    receipt.type === 'BUY'
                                                        ? 'bg-gradient-to-br from-green-400 to-green-600'
                                                        : 'bg-gradient-to-br from-red-400 to-red-600'
                                                }`}
                                            >
                                                {receipt.type === 'BUY' ? (
                                                    <TrendingUp
                                                        className="w-7 h-7 text-white relative z-10 drop-shadow-lg"/>
                                                ) : (
                                                    <TrendingDown
                                                        className="w-7 h-7 text-white relative z-10 drop-shadow-lg"/>
                                                )}

                                                {/* Status Indicator */}
                                                {receipt.status === 'completed' && (
                                                    <div
                                                        className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-background shadow-lg">
                                                        <CheckCircle className="w-full h-full text-white p-0.5"/>
                                                    </div>
                                                )}
                                            </motion.div>

                                            {/* Details */}
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <h3 className="text-foreground drop-shadow-sm">{receipt.tokenName}</h3>
                                                    <span className={`px-4 py-1.5 rounded-xl text-xs shadow-md ${
                                                        receipt.type === 'BUY'
                                                            ? 'bg-gradient-to-r from-green-400 to-green-600 text-white'
                                                            : 'bg-gradient-to-r from-red-400 to-red-600 text-white'
                                                    }`}>
                            {receipt.type}
                          </span>
                                                    {receipt.profitLoss > 0 && (
                                                        <motion.div
                                                            animate={{rotate: [0, 10, -10, 0]}}
                                                            transition={{duration: 2, repeat: Infinity}}
                                                        >
                                                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500"/>
                                                        </motion.div>
                                                    )}
                                                </div>

                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                                    <div className="bg-accent rounded-xl p-3 border border-border">
                                                        <p className="text-muted-foreground text-xs mb-1 flex items-center gap-1">
                                                            <FileText className="w-3 h-3"/>
                                                            Receipt ID
                                                        </p>
                                                        <p className="text-foreground text-sm font-mono">{receipt.receiptId}</p>
                                                    </div>
                                                    <div className="bg-accent rounded-xl p-3 border border-border">
                                                        <p className="text-muted-foreground text-xs mb-1 flex items-center gap-1">
                                                            <Calendar className="w-3 h-3"/>
                                                            Date & Time
                                                        </p>
                                                        <p className="text-foreground text-sm">{formatDateTime(receipt.timestamp)}</p>
                                                    </div>
                                                    <div className="bg-accent rounded-xl p-3 border border-border">
                                                        <p className="text-muted-foreground text-xs mb-1">Quantity ×
                                                            Price</p>
                                                        <p className="text-foreground text-sm">
                                                            {receipt.quantity} × {formatCurrency(receipt.pricePerUnit)}
                                                        </p>
                                                    </div>
                                                    <div className="bg-accent rounded-xl p-3 border border-border">
                                                        <p className="text-muted-foreground text-xs mb-1">Trade
                                                            Value</p>
                                                        <p className="text-foreground text-sm">{formatCurrency(receipt.tradeValue)}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-6 flex-wrap">
                                                    <div
                                                        className="bg-accent rounded-xl px-4 py-2 border border-border">
                                                        <p className="text-muted-foreground text-xs mb-1">P&L</p>
                                                        <p className={`drop-shadow-sm flex items-center gap-1 ${
                                                            receipt.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'
                                                        }`}>
                                                            {receipt.profitLoss >= 0 ? (
                                                                <TrendingUp className="w-4 h-4"/>
                                                            ) : (
                                                                <TrendingDown className="w-4 h-4"/>
                                                            )}
                                                            {receipt.profitLoss >= 0 ? '+' : ''}{formatCurrency(receipt.profitLoss)}
                                                        </p>
                                                    </div>
                                                    <div
                                                        className="bg-yellow-500/20 rounded-xl px-4 py-2 border border-yellow-500/30">
                                                        <p className="text-muted-foreground text-xs mb-1">Total
                                                            Payable</p>
                                                        <p className="text-yellow-700 drop-shadow-sm">{formatCurrency(receipt.finalPayable)}</p>
                                                    </div>
                                                    {receipt.rebateApplied && (
                                                        <motion.div
                                                            whileHover={{scale: 1.05}}
                                                            className="px-4 py-2 bg-gradient-to-r from-green-400 to-green-600 rounded-xl shadow-md"
                                                        >
                                                            <p className="text-white text-xs flex items-center gap-1">
                                                                <Sparkles className="w-3 h-3"/>
                                                                10% Rebate Applied
                                                            </p>
                                                        </motion.div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Arrow with Animation */}
                                        <motion.div
                                            whileHover={{x: 5}}
                                            transition={{type: "spring", stiffness: 400}}
                                        >
                                            <ChevronRight
                                                className="w-6 h-6 text-muted-foreground group-hover:text-yellow-500 transition-colors duration-300"/>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Premium Footer */}
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{delay: 0.8}}
                className="relative group"
            >
                <div
                    className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 rounded-2xl blur-lg"/>
                <div className="relative bg-card border border-border rounded-2xl p-8 text-center shadow-xl">
                    <div className="border-t border-border pt-6">
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500"/>
                            <p className="text-muted-foreground text-sm">
                                Disclaimer: All trades are final and subject to government taxes and ZONIX policies.
                            </p>
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500"/>
                        </div>
                        <p className="text-muted-foreground text-sm mb-3">
                            Thank you for trading with <span
                            className="text-yellow-600 px-2 py-1 bg-yellow-500/20 rounded-lg">ZONIX</span>
                        </p>
                        <div className="flex items-center justify-center gap-2 text-muted-foreground text-xs">
                            <Award className="w-4 h-4 text-yellow-500"/>
                            <span>Powered by ZONIX Technologies © 2025 • Secured & Verified</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
