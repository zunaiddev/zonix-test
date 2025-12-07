import {useMemo, useState} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {Card} from './ui/card';
import {Button} from './ui/button';
import {Badge} from './ui/badge';
import {ScrollArea} from './ui/scroll-area';
import {Separator} from './ui/separator';
import {Switch} from './ui/switch';
import {Tabs, TabsContent, TabsList, TabsTrigger} from './ui/tabs';
import {Progress} from './ui/progress';
import {Input} from './ui/input';
import {
    Activity,
    AlertTriangle,
    Archive,
    ArrowLeft,
    BarChart3,
    Bell,
    BellOff,
    BellRing,
    Bookmark,
    Calculator,
    Calendar,
    Check,
    CheckCheck,
    CheckCircle2,
    ChevronDown,
    Circle,
    Clock,
    DollarSign,
    Download,
    ExternalLink,
    Eye,
    FileText,
    Filter,
    Flame,
    Info,
    Layers,
    Link2,
    MapPin,
    Maximize2,
    Minimize2,
    MoreHorizontal,
    Newspaper,
    PieChart,
    Pin,
    RefreshCcw,
    Rocket,
    Search,
    Settings,
    Share2,
    Shield,
    Sliders,
    Sparkles,
    Target,
    Trash2,
    TrendingDown,
    TrendingUp,
    Users,
    Volume2,
    VolumeX,
    X,
    Zap,
} from 'lucide-react';

interface Notification {
    id: string;
    category: 'market' | 'sip' | 'fno' | 'ai' | 'security' | 'news' | 'system' | 'portfolio' | 'social';
    title: string;
    message: string;
    timestamp: string;
    timeAgo: string;
    tag: 'New' | 'AI Alert' | 'Market' | 'Security' | 'Reminder' | 'Update' | 'Critical' | 'Info' | 'Success';
    isRead: boolean;
    isPinned: boolean;
    isBookmarked: boolean;
    priority: 'critical' | 'high' | 'medium' | 'low';
    detailedMessage?: string;
    actionButtons?: {
        label: string;
        action: string;
        variant?: 'default' | 'outline' | 'destructive';
        icon?: React.ReactNode;
    }[];
    aiInsight?: {
        summary: string;
        predictedImpact: string;
        recommendedAction: string;
        confidence: number;
        tags?: string[];
    };
    metadata?: {
        icon?: string;
        value?: string;
        change?: string;
        type?: string;
        location?: string;
        device?: string;
        relatedAsset?: string;
    };
    relatedLinks?: {
        label: string;
        url: string;
    }[];
    attachments?: {
        name: string;
        size: string;
        type: string;
    }[];
}

export function Notifications() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
    const [viewState, setViewState] = useState<'list' | 'detail'>('list');
    const [activeTab, setActiveTab] = useState('all');
    const [showAnalytics, setShowAnalytics] = useState(false);
    const [showPreferences, setShowPreferences] = useState(false);
    const [muteAlerts, setMuteAlerts] = useState(false);
    const [smartFilter, setSmartFilter] = useState(false);
    const [autoMarkRead, setAutoMarkRead] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedGroups, setExpandedGroups] = useState<string[]>(['today']);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [viewMode, setViewMode] = useState<'comfortable' | 'compact'>('comfortable');

    // Mock notification data with more variety
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            page: 'NOTIF-001',
            category: 'market',
            title: 'Maharashtra GDP Token Surges 2.8%',
            message: 'Strong upward momentum detected in the last 4 hours. Trading volume increased by 45%.',
            timestamp: '2025-10-27T14:23:00',
            timeAgo: '2 min ago',
            tag: 'Market',
            isRead: false,
            isPinned: true,
            isBookmarked: false,
            priority: 'high',
            detailedMessage: 'Maharashtra GDP Token has shown exceptional performance with a 2.8% price increase in the last 4 hours. The rally is supported by strong trading volumes (up 45%) and positive sentiment around Q3 GDP numbers which exceeded expectations by 3.2%. Technical indicators suggest continued momentum with RSI at 68 and MACD showing bullish crossover.\n\nKey Metrics:\n• Current Price: ₹98.45\n• 24h High: ₹99.20\n• 24h Low: ₹95.80\n• Volume: 2.4M tokens\n• Market Cap: ₹12.8B',
            actionButtons: [
                {label: 'View Token', action: 'view', variant: 'default', icon: <ExternalLink className="w-4 h-4"/>},
                {label: 'Trade Now', action: 'trade', variant: 'outline', icon: <TrendingUp className="w-4 h-4"/>},
                {label: 'Add Alert', action: 'alert', variant: 'outline', icon: <Bell className="w-4 h-4"/>},
            ],
            aiInsight: {
                summary: 'This is a continuation of the bullish trend that started last week.',
                predictedImpact: 'Expected to reach ₹102-105 range (+4.5% to +6.2%)',
                recommendedAction: 'Consider accumulating on dips below ₹95. Set stop loss at ₹92.',
                confidence: 87.3,
                tags: ['Bullish Momentum', 'Volume Surge', 'Technical Breakout'],
            },
            metadata: {
                icon: 'trending_up',
                value: '₹98.45',
                change: '+2.8%',
                type: 'State Token',
                relatedAsset: 'Maharashtra GDP',
            },
            relatedLinks: [
                {label: 'View Chart', url: '#'},
                {label: 'Market Analysis', url: '#'},
                {label: 'News Feed', url: '#'},
            ],
        },
        {
            page: 'NOTIF-002',
            category: 'ai',
            title: 'AI Recommends Portfolio Rebalancing',
            message: 'Shift 3% from Delhi GDP to Gujarat tokens for +2.8% predicted yield improvement.',
            timestamp: '2025-10-27T14:08:00',
            timeAgo: '15 min ago',
            tag: 'AI Alert',
            isRead: false,
            isPinned: true,
            isBookmarked: true,
            priority: 'high',
            detailedMessage: 'Our AI model has identified a portfolio optimization opportunity. By shifting 3% of your holdings from Delhi GDP Token to Gujarat State Token, you can potentially improve your 6-month yield by 2.8%.\n\nThis recommendation is based on:\n• Gujarat\'s industrial growth acceleration (+8.2%)\n• Delhi\'s infrastructure bottlenecks\n• Relative valuation metrics showing Gujarat trading at 12% discount to fundamentals\n• Correlation analysis showing better risk-adjusted returns\n• Sector rotation trends favoring manufacturing over services\n\nRisk Analysis:\n• Volatility Impact: Minimal (+0.2%)\n• Liquidity: High (Both assets)\n• Transaction Cost: ₹125 estimated',
            actionButtons: [
                {label: 'View Analysis', action: 'view', variant: 'default', icon: <BarChart3 className="w-4 h-4"/>},
                {label: 'Execute Rebalance', action: 'execute', variant: 'default', icon: <Zap className="w-4 h-4"/>},
                {
                    label: 'Schedule Later',
                    action: 'schedule',
                    variant: 'outline',
                    icon: <Calendar className="w-4 h-4"/>
                },
                {label: 'Dismiss', action: 'dismiss', variant: 'outline', icon: <X className="w-4 h-4"/>},
            ],
            aiInsight: {
                summary: 'Gujarat showing stronger momentum across 12 key economic indicators.',
                predictedImpact: '+2.8% to +3.5% improvement over 6 months',
                recommendedAction: 'Gradual shift over 2-3 transactions to minimize impact cost',
                confidence: 88.9,
                tags: ['Portfolio Optimization', 'Yield Enhancement', 'Risk Reduction'],
            },
            metadata: {
                icon: 'sparkles',
                value: '3%',
                change: '+2.8% Yield',
                type: 'AI Insight',
            },
            relatedLinks: [
                {label: 'Full Report', url: '#'},
                {label: 'Backtesting Results', url: '#'},
            ],
        },
        {
            page: 'NOTIF-003',
            category: 'sip',
            title: 'SIP Due Tomorrow - ₹2,000',
            message: 'Royal Growth Fund SIP scheduled. Auto-debit from HDFC Bank ****4532 at 10:00 AM.',
            timestamp: '2025-10-27T13:23:00',
            timeAgo: '1 hour ago',
            tag: 'Reminder',
            isRead: false,
            isPinned: false,
            isBookmarked: false,
            priority: 'medium',
            detailedMessage: 'Your monthly SIP for Royal Growth Fund (₹2,000) is scheduled for tomorrow, October 28th at 10:00 AM. The amount will be auto-debited from your linked HDFC Bank account ending in 4532.\n\nInvestment Details:\n• Fund Name: Royal Growth Fund\n• Amount: ₹2,000\n• Current NAV: ₹245.80 (down 0.8% from last month)\n• Units to be allocated: ~8.14 units\n• Total investment so far: ₹24,000 (12 months)\n• Current value: ₹26,450 (+10.2%)\n• Avg NAV: ₹243.10\n\nNote: NAV is near monthly low - good accumulation opportunity.',
            actionButtons: [
                {label: 'Pay Now', action: 'pay', variant: 'default', icon: <DollarSign className="w-4 h-4"/>},
                {label: 'View Details', action: 'view', variant: 'outline', icon: <Eye className="w-4 h-4"/>},
                {label: 'Skip This Month', action: 'skip', variant: 'outline', icon: <X className="w-4 h-4"/>},
            ],
            aiInsight: {
                summary: 'SIP timing is optimal - NAV is near monthly low.',
                predictedImpact: 'Cost averaging benefit: +2.3% over lump sum',
                recommendedAction: 'Proceed with scheduled investment. Consider increasing SIP by ₹500.',
                confidence: 94.7,
                tags: ['Good Timing', 'Cost Averaging', 'Value Buy'],
            },
            metadata: {
                icon: 'dollar_sign',
                value: '₹2,000',
                change: 'Due Tomorrow',
                type: 'SIP',
            },
        },
        {
            page: 'NOTIF-004',
            category: 'fno',
            title: 'Options Expiring in 3 Days - Action Required',
            message: '5 Karnataka ETF call options expiring Oct 28. Current P&L: +₹8,450 (45.6%).',
            timestamp: '2025-10-27T12:23:00',
            timeAgo: '2 hours ago',
            tag: 'Critical',
            isRead: false,
            isPinned: false,
            isBookmarked: true,
            priority: 'critical',
            detailedMessage: 'Your Karnataka ETF call options (Strike: ₹240, Qty: 50) are expiring in 3 days on October 28, 2025. Current market price is ₹268, giving you an unrealized profit of ₹8,450 (45.6% return). Time decay will accelerate from tomorrow.\n\nPosition Details:\n• Strike Price: ₹240\n• Current Price: ₹268\n• Lot Size: 50\n• Investment: ₹18,550\n• Current Value: ₹27,000\n• Unrealized P&L: +₹8,450 (+45.6%)\n• Days to Expiry: 3\n• Theta (Time Decay): -₹320/day\n• Delta: 0.78\n• Implied Volatility: 32%\n\nRisk: Holding till expiry could result in loss of ₹960 to time decay.',
            actionButtons: [
                {
                    label: 'Exercise Options',
                    action: 'exercise',
                    variant: 'default',
                    icon: <CheckCircle2 className="w-4 h-4"/>
                },
                {
                    label: 'Close Position',
                    action: 'close',
                    variant: 'default',
                    icon: <TrendingDown className="w-4 h-4"/>
                },
                {label: 'Roll Forward', action: 'roll', variant: 'outline', icon: <RefreshCcw className="w-4 h-4"/>},
                {label: 'Add Alert', action: 'alert', variant: 'outline', icon: <Bell className="w-4 h-4"/>},
            ],
            aiInsight: {
                summary: 'Strong intrinsic value. Recommend booking profits before time decay.',
                predictedImpact: 'Risk of losing ₹2,100 to time decay if held to expiry',
                recommendedAction: 'Book 70% profits today. Roll remaining 30% to next month.',
                confidence: 91.2,
                tags: ['Time Decay Risk', 'Profit Booking', 'Options Strategy'],
            },
            metadata: {
                icon: 'zap',
                value: '+₹8,450',
                change: '+45.6%',
                type: 'F&O Alert',
            },
        },
        {
            page: 'NOTIF-005',
            category: 'security',
            title: 'New Login Verified from Delhi',
            message: 'Login at 09:23 AM from Chrome, Delhi. IP: 103.21.**.**',
            timestamp: '2025-10-27T09:23:00',
            timeAgo: '3 hours ago',
            tag: 'Security',
            isRead: true,
            isPinned: false,
            isBookmarked: false,
            priority: 'medium',
            detailedMessage: 'A new login to your Zonix account was detected and verified:\n\nDevice & Location:\n• Device: Chrome Browser on Windows 11\n• Location: Delhi, India\n• IP Address: 103.21.**.**\n• Time: Oct 27, 2025 at 09:23 AM IST\n• Session Duration: 2h 15m (Active)\n\nVerification:\n• Method: OTP via registered mobile\n• Phone: +91 ****-**-5678\n• Verification Status: ✓ Successful\n\nSecurity Check:\n• Device recognized: Yes\n• Location pattern: Normal\n• Risk Score: Low (2/100)\n\nThis login was verified using your registered mobile number via OTP. If this wasn\'t you, please contact support immediately and change your password.',
            actionButtons: [
                {
                    label: 'View Login History',
                    action: 'history',
                    variant: 'default',
                    icon: <Clock className="w-4 h-4"/>
                },
                {label: 'Secure Account', action: 'secure', variant: 'outline', icon: <Shield className="w-4 h-4"/>},
                {label: 'End Session', action: 'end', variant: 'destructive', icon: <X className="w-4 h-4"/>},
            ],
            aiInsight: {
                summary: 'Normal login pattern detected. Location matches your typical access points.',
                predictedImpact: 'No security concerns identified',
                recommendedAction: 'No action required. Pattern is consistent with your usage.',
                confidence: 99.2,
                tags: ['Normal Activity', 'Verified Device', 'Safe Location'],
            },
            metadata: {
                icon: 'shield',
                value: 'Verified',
                change: 'Delhi, India',
                type: 'Security',
                location: 'Delhi, India',
                device: 'Chrome on Windows 11',
            },
        },
        {
            page: 'NOTIF-006',
            category: 'news',
            title: 'New SIP Tax Benefits for FY 2025-26',
            message: 'Government announces additional ₹50,000 deduction for district token SIPs.',
            timestamp: '2025-10-27T09:00:00',
            timeAgo: '5 hours ago',
            tag: 'Update',
            isRead: true,
            isPinned: false,
            isBookmarked: true,
            priority: 'medium',
            detailedMessage: 'The Ministry of Finance has announced new tax benefits for FY 2025-26. Investors can now claim an additional deduction of up to ₹50,000 under Section 80C for SIPs in district tokens. This is in addition to the existing ₹1.5L limit.\n\nKey Highlights:\n• Additional deduction: ₹50,000\n• Applicable under: Section 80C (Extended)\n• Minimum tenure: 5 years\n• Minimum SIP amount: ₹1,000/month\n• Eligible instruments: District tokens, State indices\n• Effective from: FY 2025-26\n• Lock-in period: 5 years\n\nPotential Tax Savings:\n• For 30% tax bracket: ₹15,000/year\n• For 20% tax bracket: ₹10,000/year\n• For 10% tax bracket: ₹5,000/year\n\nThis move is expected to boost retail participation in district-level economic instruments.',
            actionButtons: [
                {
                    label: 'Calculate Savings',
                    action: 'calculate',
                    variant: 'default',
                    icon: <Calculator className="w-4 h-4"/>
                },
                {label: 'Learn More', action: 'learn', variant: 'outline', icon: <ExternalLink className="w-4 h-4"/>},
                {label: 'Start SIP', action: 'start', variant: 'default', icon: <Rocket className="w-4 h-4"/>},
            ],
            metadata: {
                icon: 'newspaper',
                value: '₹50,000',
                change: 'New Benefit',
                type: 'Tax Update',
            },
            relatedLinks: [
                {label: 'Official Notification', url: '#'},
                {label: 'Tax Calculator', url: '#'},
                {label: 'Eligible SIPs', url: '#'},
            ],
        },
        {
            page: 'NOTIF-007',
            category: 'market',
            title: 'Pune District Token Hits All-Time High',
            message: 'New ATH at ₹158.90, driven by IT sector expansion and startup funding surge.',
            timestamp: '2025-10-27T06:00:00',
            timeAgo: '8 hours ago',
            tag: 'Market',
            isRead: true,
            isPinned: false,
            isBookmarked: false,
            priority: 'low',
            detailedMessage: 'Pune District Token reached a new all-time high of ₹158.90 today, surpassing its previous record of ₹156.30 set in August 2025.\n\nCatalysts:\n• Announcement of 3 new IT parks\n• Venture capital funding for Pune-based startups up 67% YoY\n• Strong industrial output (+12% QoQ)\n• Positive sentiment around Metro Phase 3\n• Smart city initiatives gaining traction\n\nTechnical Analysis:\n• Resistance levels: ₹160, ₹165\n• Support levels: ₹155, ₹152\n• RSI: 72 (Overbought)\n• MACD: Bullish crossover\n• Volume: Above average (+34%)',
            metadata: {
                icon: 'trending_up',
                value: '₹158.90',
                change: '+4.2%',
                type: 'District Token',
                relatedAsset: 'Pune District',
            },
        },
        {
            page: 'NOTIF-008',
            category: 'sip',
            title: 'SIP Auto-Debit Successful',
            message: 'Tamil Nadu Tech Token - ₹3,768 invested at NAV ₹125.60. Units: 30.',
            timestamp: '2025-10-26T10:00:00',
            timeAgo: '1 day ago',
            tag: 'Success',
            isRead: true,
            isPinned: false,
            isBookmarked: false,
            priority: 'low',
            detailedMessage: 'Your SIP investment has been successfully processed.\n\nTransaction Details:\n• Fund: Tamil Nadu Tech Token\n• Amount Debited: ₹3,768\n• NAV: ₹125.60\n• Units Allocated: 30.00\n• Transaction Date: Oct 26, 2025\n• Settlement: T+1\n\nPortfolio Update:\n• Total Units: 360\n• Avg NAV: ₹122.40\n• Current Value: ₹45,216\n• Total Investment: ₹44,064\n• Unrealized Gain: +₹1,152 (+2.6%)',
            metadata: {
                icon: 'check_circle',
                value: '₹3,768',
                change: '30 Units',
                type: 'SIP Success',
            },
        },
        {
            page: 'NOTIF-009',
            category: 'system',
            title: 'Platform Maintenance Scheduled',
            message: 'Zonix will undergo scheduled maintenance on Oct 28, 2:00-4:00 AM IST.',
            timestamp: '2025-10-26T18:00:00',
            timeAgo: '1 day ago',
            tag: 'Update',
            isRead: true,
            isPinned: false,
            isBookmarked: false,
            priority: 'low',
            detailedMessage: 'We will be performing scheduled system maintenance on October 28, 2025 from 2:00 AM to 4:00 AM IST. During this time, the platform will be temporarily unavailable.\n\nMaintenance Activities:\n• Infrastructure upgrades\n• Security enhancements\n• Performance optimizations\n• Database maintenance\n• New feature deployment\n\nWhat to Expect:\n• Platform unavailable: 2:00 AM - 4:00 AM IST\n• Mobile app: Limited functionality\n• Trading: Suspended during maintenance\n• Data sync: Automatic post-maintenance\n\nWe apologize for any inconvenience. This maintenance will help us serve you better with improved performance and new features.',
            metadata: {
                icon: 'settings',
                value: '2 Hours',
                change: 'Oct 28',
                type: 'System',
            },
        },
        {
            page: 'NOTIF-010',
            category: 'ai',
            title: 'Weekly Portfolio Performance Report Ready',
            message: 'Your AI-generated portfolio insights are ready. Overall performance: +8.2%.',
            timestamp: '2025-10-25T09:00:00',
            timeAgo: '2 days ago',
            tag: 'AI Alert',
            isRead: true,
            isPinned: false,
            isBookmarked: true,
            priority: 'low',
            detailedMessage: 'Your weekly AI-generated portfolio performance report is ready for review.\n\nKey Highlights:\n• Overall portfolio return: +8.2%\n• Best performer: Karnataka Innovation ETF (+12.4%)\n• Underperformer: Delhi Metro Fund (+2.1%)\n• Portfolio risk score: 6.4/10 (Moderate)\n• Diversification score: 8.7/10 (Good)\n• Sharpe ratio: 1.42\n• Maximum drawdown: -3.2%\n\nSector Allocation:\n• Technology: 32%\n• Infrastructure: 28%\n• Manufacturing: 22%\n• Services: 18%\n\nAI Recommendations:\n• Increase exposure to manufacturing (+5%)\n• Book partial profits in tech sector\n• Add defensive stocks for stability\n\nThe report includes detailed analysis, sector allocation recommendations, and AI-powered predictions for the upcoming week.',
            actionButtons: [
                {label: 'View Full Report', action: 'view', variant: 'default', icon: <FileText className="w-4 h-4"/>},
                {label: 'Download PDF', action: 'download', variant: 'outline', icon: <Download className="w-4 h-4"/>},
                {label: 'Share Report', action: 'share', variant: 'outline', icon: <Share2 className="w-4 h-4"/>},
            ],
            metadata: {
                icon: 'bar_chart',
                value: '+8.2%',
                change: 'This Week',
                type: 'Performance',
            },
            attachments: [
                {name: 'weekly-report.pdf', size: '2.4 MB', type: 'PDF'},
            ],
        },
        {
            page: 'NOTIF-011',
            category: 'portfolio',
            title: 'Your Portfolio Crossed ₹10 Lakh Milestone!',
            message: 'Congratulations! Your portfolio value reached ₹10,12,450 today.',
            timestamp: '2025-10-27T11:30:00',
            timeAgo: '3 hours ago',
            tag: 'Success',
            isRead: false,
            isPinned: false,
            isBookmarked: true,
            priority: 'medium',
            detailedMessage: '🎉 Congratulations on reaching this significant milestone!\n\nPortfolio Journey:\n• Starting Value: ₹2,50,000\n• Current Value: ₹10,12,450\n• Total Gain: ₹7,62,450\n• Return: +304.98%\n• Time Period: 18 months\n• CAGR: 98.2%\n\nTop Contributors:\n1. Maharashtra GDP Token: +₹2,45,000\n2. Karnataka Innovation ETF: +₹1,89,500\n3. Gujarat Manufacturing Index: +₹1,56,200\n\nNext Milestone: ₹15,00,000\nProjected Time: 8-10 months (based on current growth rate)\n\nKeep up the great work! Your disciplined investment approach is paying off.',
            actionButtons: [
                {label: 'View Portfolio', action: 'view', variant: 'default', icon: <PieChart className="w-4 h-4"/>},
                {label: 'Share Achievement', action: 'share', variant: 'outline', icon: <Share2 className="w-4 h-4"/>},
            ],
            metadata: {
                icon: 'award',
                value: '₹10.12L',
                change: '+304.98%',
                type: 'Milestone',
            },
        },
        {
            page: 'NOTIF-012',
            category: 'social',
            title: 'Friend Request from Rahul Sharma',
            message: 'Rahul Sharma wants to connect and share portfolio insights.',
            timestamp: '2025-10-27T10:45:00',
            timeAgo: '3 hours ago',
            tag: 'New',
            isRead: false,
            isPinned: false,
            isBookmarked: false,
            priority: 'low',
            detailedMessage: 'Rahul Sharma has sent you a friend request on Zonix.\n\nProfile:\n• Name: Rahul Sharma\n• Location: Mumbai, India\n• Investor Level: Advanced\n• Portfolio Size: ₹15-20L range\n• Mutual Connections: 3\n• Investment Focus: State tokens, F&O trading\n• Member Since: Jan 2024\n\nBy connecting, you can:\n• Share portfolio insights (optional)\n• Compare performance (anonymous)\n• Discuss strategies\n• Get trade ideas\n\nYour privacy is protected. You control what you share.',
            actionButtons: [
                {label: 'Accept', action: 'accept', variant: 'default', icon: <CheckCircle2 className="w-4 h-4"/>},
                {label: 'Decline', action: 'decline', variant: 'outline', icon: <X className="w-4 h-4"/>},
                {label: 'View Profile', action: 'profile', variant: 'outline', icon: <Eye className="w-4 h-4"/>},
            ],
            metadata: {
                icon: 'users',
                value: '3 Mutual',
                change: 'Advanced',
                type: 'Social',
            },
        },
    ]);

    // Mark notification as read
    const markAsRead = (id: string) => {
        setNotifications(prev =>
            prev.map(n => n.id === id ? {...n, isRead: true} : n)
        );
    };

    // Toggle pin
    const togglePin = (id: string) => {
        setNotifications(prev =>
            prev.map(n => n.id === id ? {...n, isPinned: !n.isPinned} : n)
        );
    };

    // Toggle bookmark
    const toggleBookmark = (id: string) => {
        setNotifications(prev =>
            prev.map(n => n.id === id ? {...n, isBookmarked: !n.isBookmarked} : n)
        );
    };

    // Delete notification
    const deleteNotification = (id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
        if (selectedNotification?.id === id) {
            setSelectedNotification(null);
        }
    };

    // Mark all as read
    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({...n, isRead: true})));
    };

    // Archive all read
    const archiveAllRead = () => {
        setNotifications(prev => prev.filter(n => !n.isRead));
        setSelectedNotification(null);
    };

    // Filter and search notifications
    const filteredNotifications = useMemo(() => {
        return notifications.filter(n => {
            const categoryMatch = selectedCategory === 'all' || n.category === selectedCategory;
            const tabMatch =
                activeTab === 'all' ||
                (activeTab === 'unread' && !n.isRead) ||
                (activeTab === 'pinned' && n.isPinned) ||
                (activeTab === 'critical' && n.priority === 'critical');
            const smartMatch = !smartFilter || n.priority === 'critical' || n.priority === 'high' || n.tag === 'AI Alert';
            const searchMatch = searchQuery === '' ||
                n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                n.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
                n.tag.toLowerCase().includes(searchQuery.toLowerCase());
            return categoryMatch && tabMatch && smartMatch && searchMatch;
        });
    }, [notifications, selectedCategory, activeTab, smartFilter, searchQuery]);

    // Group notifications by date
    const groupedNotifications = useMemo(() => {
        const groups: { [key: string]: Notification[] } = {
            today: [],
            yesterday: [],
            thisWeek: [],
            older: [],
        };

        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);

        filteredNotifications.forEach(notif => {
            const notifDate = new Date(notif.timestamp);
            if (notifDate >= today) {
                groups.today.push(notif);
            } else if (notifDate >= yesterday) {
                groups.yesterday.push(notif);
            } else if (notifDate >= weekAgo) {
                groups.thisWeek.push(notif);
            } else {
                groups.older.push(notif);
            }
        });

        return groups;
    }, [filteredNotifications]);

    // Analytics data
    const analytics = useMemo(() => ({
        total: notifications.length,
        unread: notifications.filter(n => !n.isRead).length,
        pinned: notifications.filter(n => n.isPinned).length,
        bookmarked: notifications.filter(n => n.isBookmarked).length,
        critical: notifications.filter(n => n.priority === 'critical').length,
        byCategory: {
            market: notifications.filter(n => n.category === 'market').length,
            ai: notifications.filter(n => n.category === 'ai').length,
            sip: notifications.filter(n => n.category === 'sip').length,
            fno: notifications.filter(n => n.category === 'fno').length,
            security: notifications.filter(n => n.category === 'security').length,
            news: notifications.filter(n => n.category === 'news').length,
            system: notifications.filter(n => n.category === 'system').length,
            portfolio: notifications.filter(n => n.category === 'portfolio').length,
            social: notifications.filter(n => n.category === 'social').length,
        },
        todayCount: groupedNotifications.today.length,
        thisWeekCount: notifications.filter(n => {
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            return new Date(n.timestamp) >= weekAgo;
        }).length,
        responseRate: 78,
        avgResponseTime: '2.4 hours',
    }), [notifications, groupedNotifications]);

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'market':
                return <TrendingUp className="w-4 h-4"/>;
            case 'sip':
                return <DollarSign className="w-4 h-4"/>;
            case 'fno':
                return <Zap className="w-4 h-4"/>;
            case 'ai':
                return <Sparkles className="w-4 h-4"/>;
            case 'security':
                return <Shield className="w-4 h-4"/>;
            case 'news':
                return <Newspaper className="w-4 h-4"/>;
            case 'system':
                return <Settings className="w-4 h-4"/>;
            case 'portfolio':
                return <PieChart className="w-4 h-4"/>;
            case 'social':
                return <Users className="w-4 h-4"/>;
            default:
                return <Bell className="w-4 h-4"/>;
        }
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'market':
                return 'bg-amber-500/20 text-amber-700 dark:text-amber-400 border-amber-500/50';
            case 'sip':
                return 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border-emerald-500/50';
            case 'fno':
                return 'bg-orange-500/20 text-orange-700 dark:text-orange-400 border-orange-500/50';
            case 'ai':
                return 'bg-purple-500/20 text-purple-700 dark:text-purple-400 border-purple-500/50';
            case 'security':
                return 'bg-red-500/20 text-red-700 dark:text-red-400 border-red-500/50';
            case 'news':
                return 'bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-500/50';
            case 'system':
                return 'bg-gray-500/20 text-gray-700 dark:text-gray-400 border-gray-500/50';
            case 'portfolio':
                return 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-500/50';
            case 'social':
                return 'bg-pink-500/20 text-pink-700 dark:text-pink-400 border-pink-500/50';
            default:
                return 'bg-gray-500/20 text-gray-700 dark:text-gray-400 border-gray-500/50';
        }
    };

    const getTagColor = (tag: string) => {
        switch (tag) {
            case 'New':
                return 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border-emerald-500/50';
            case 'AI Alert':
                return 'bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400 border-purple-500/50';
            case 'Market':
                return 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 border-amber-500/50';
            case 'Security':
                return 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400 border-red-500/50';
            case 'Reminder':
                return 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-500/50';
            case 'Update':
                return 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-400 border-indigo-500/50';
            case 'Critical':
                return 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400 border-red-500/50';
            case 'Info':
                return 'bg-cyan-100 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-400 border-cyan-500/50';
            case 'Success':
                return 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/50';
            default:
                return 'bg-gray-100 dark:bg-gray-500/20 text-gray-700 dark:text-gray-400 border-gray-500/50';
        }
    };

    const getPriorityIcon = (priority: string) => {
        switch (priority) {
            case 'critical':
                return <Flame className="w-4 h-4 text-red-600 dark:text-red-400"/>;
            case 'high':
                return <AlertTriangle className="w-4 h-4 text-orange-600 dark:text-orange-400"/>;
            case 'medium':
                return <Info className="w-4 h-4 text-blue-600 dark:text-blue-400"/>;
            case 'low':
                return <Circle className="w-4 h-4 text-gray-600 dark:text-gray-400"/>;
            default:
                return <Circle className="w-4 h-4 text-gray-600 dark:text-gray-400"/>;
        }
    };

    const toggleGroup = (group: string) => {
        setExpandedGroups(prev =>
            prev.includes(group) ? prev.filter(g => g !== group) : [...prev, group]
        );
    };

    const handleViewDetails = (notif: Notification) => {
        setSelectedNotification(notif);
        setViewState('detail');
        if (autoMarkRead && !notif.isRead) {
            markAsRead(notif.id);
        }
    };

    const handleBackToList = () => {
        setViewState('list');
        setSelectedNotification(null);
    };

    // DETAIL VIEW - Full-screen notification detail
    if (viewState === 'detail' && selectedNotification) {
        return (
            <div
                className="min-h-screen bg-gradient-to-br from-amber-50/50 via-white to-yellow-50/50 dark:from-gray-950 dark:via-gray-900 dark:to-amber-950/20">
                {/* Floating Background Elements */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div
                        className="absolute top-20 right-20 w-96 h-96 bg-amber-200/20 dark:bg-amber-500/10 rounded-full blur-3xl animate-float"/>
                    <div
                        className="absolute bottom-20 left-20 w-96 h-96 bg-yellow-200/20 dark:bg-yellow-500/10 rounded-full blur-3xl animate-float-delayed"/>
                </div>

                <div className="relative z-10">
                    {/* Sticky Header */}
                    <motion.div
                        initial={{opacity: 0, y: -20}}
                        animate={{opacity: 1, y: 0}}
                        className="sticky top-0 z-50 backdrop-blur-2xl bg-white/80 dark:bg-gray-900/80 border-b border-amber-200/50 dark:border-amber-500/20"
                    >
                        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <Button
                                        onClick={handleBackToList}
                                        variant="outline"
                                        size="sm"
                                        className="border-amber-300 dark:border-amber-500/30 hover:bg-amber-50 dark:hover:bg-amber-500/10 rounded-xl"
                                    >
                                        <ArrowLeft className="w-4 h-4 mr-2"/>
                                        Back
                                    </Button>
                                    <div>
                                        <h1 className="bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-600 dark:from-amber-400 dark:via-yellow-400 dark:to-amber-400 bg-clip-text text-transparent">
                                            Notification Details
                                        </h1>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">{selectedNotification.id}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                        }}
                                        className="border-gray-300 dark:border-gray-700 rounded-xl"
                                    >
                                        <Share2 className="w-4 h-4 mr-2"/>
                                        Share
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                        }}
                                        className="border-gray-300 dark:border-gray-700 rounded-xl"
                                    >
                                        <Download className="w-4 h-4 mr-2"/>
                                        Export
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Main Content */}
                    <ScrollArea className="h-[calc(100vh-5rem)]">
                        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-8">
                            <motion.div
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                className="space-y-6"
                            >
                                {/* Header Card */}
                                <Card
                                    className="bg-white/90 dark:bg-gray-900/70 backdrop-blur-xl border-2 border-amber-300/50 dark:border-amber-500/30 rounded-2xl p-6 shadow-2xl">
                                    <div className="flex items-start gap-4">
                                        <div
                                            className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 border-2 ${getCategoryColor(selectedNotification.category)}`}>
                                            <div className="text-2xl">
                                                {getCategoryIcon(selectedNotification.category)}
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex-1">
                                                    <h2 className="text-2xl text-gray-900 dark:text-white mb-2">
                                                        {selectedNotification.title}
                                                    </h2>
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <Badge
                                                            className={`${getTagColor(selectedNotification.tag)} border px-3 py-1`}>
                                                            {selectedNotification.tag}
                                                        </Badge>
                                                        <Badge
                                                            className={`${getCategoryColor(selectedNotification.category)} border px-3 py-1`}>
                                                            <span
                                                                className="capitalize">{selectedNotification.category}</span>
                                                        </Badge>
                                                        <div
                                                            className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                                                            <Clock className="w-4 h-4"/>
                                                            {selectedNotification.timeAgo}
                                                        </div>
                                                        {selectedNotification.isPinned && (
                                                            <Badge
                                                                className="bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-500/50">
                                                                <Pin className="w-3 h-3 mr-1 fill-current"/>
                                                                Pinned
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                                {selectedNotification.message}
                                            </p>
                                        </div>
                                    </div>
                                </Card>

                                {/* Detailed Message */}
                                {selectedNotification.detailedMessage && (
                                    <Card
                                        className="bg-white/80 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
                                        <h3 className="flex items-center gap-2 text-amber-700 dark:text-amber-400 mb-4">
                                            <FileText className="w-5 h-5"/>
                                            Details
                                        </h3>
                                        <div className="prose prose-sm dark:prose-invert max-w-none">
                                            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                                                {selectedNotification.detailedMessage}
                                            </p>
                                        </div>
                                    </Card>
                                )}

                                {/* AI Insight */}
                                {selectedNotification.aiInsight && (
                                    <Card
                                        className="bg-gradient-to-br from-purple-100/80 to-purple-50/50 dark:from-purple-500/10 dark:to-purple-600/10 backdrop-blur-xl border border-purple-300/50 dark:border-purple-500/30 rounded-2xl p-6">
                                        <div className="flex items-center gap-2 mb-4">
                                            <motion.div
                                                animate={{scale: [1, 1.2, 1], rotate: [0, 180, 360]}}
                                                transition={{duration: 4, repeat: Infinity}}
                                            >
                                                <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400"/>
                                            </motion.div>
                                            <h3 className="text-purple-800 dark:text-purple-300">AI Analysis</h3>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-xs text-purple-600 dark:text-purple-400 mb-1">Summary</p>
                                                <p className="text-sm text-purple-900 dark:text-purple-200">
                                                    {selectedNotification.aiInsight.summary}
                                                </p>
                                            </div>

                                            <Separator className="bg-purple-300/30"/>

                                            <div>
                                                <p className="text-xs text-purple-600 dark:text-purple-400 mb-1">Predicted
                                                    Impact</p>
                                                <p className="text-sm text-purple-900 dark:text-purple-200">
                                                    {selectedNotification.aiInsight.predictedImpact}
                                                </p>
                                            </div>

                                            <Separator className="bg-purple-300/30"/>

                                            <div>
                                                <p className="text-xs text-purple-600 dark:text-purple-400 mb-1">Recommended
                                                    Action</p>
                                                <p className="text-sm text-purple-900 dark:text-purple-200">
                                                    {selectedNotification.aiInsight.recommendedAction}
                                                </p>
                                            </div>

                                            <Separator className="bg-purple-300/30"/>

                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-purple-600 dark:text-purple-400">AI Confidence</span>
                                                <div className="flex items-center gap-2">
                                                    <Progress value={selectedNotification.aiInsight.confidence}
                                                              className="w-24 h-2"/>
                                                    <span className="text-sm text-purple-900 dark:text-purple-200">
                            {selectedNotification.aiInsight.confidence}%
                          </span>
                                                </div>
                                            </div>

                                            {selectedNotification.aiInsight.tags && selectedNotification.aiInsight.tags.length > 0 && (
                                                <div className="flex items-center gap-2 flex-wrap pt-2">
                                                    {selectedNotification.aiInsight.tags.map((tag, index) => (
                                                        <Badge
                                                            key={index}
                                                            className="bg-purple-200/50 dark:bg-purple-800/30 text-purple-800 dark:text-purple-300 border-purple-400/50"
                                                        >
                                                            {tag}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </Card>
                                )}

                                {/* Metadata */}
                                {selectedNotification.metadata && (
                                    <Card
                                        className="bg-white/80 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
                                        <h3 className="flex items-center gap-2 text-amber-700 dark:text-amber-400 mb-4">
                                            <Info className="w-5 h-5"/>
                                            Information
                                        </h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            {selectedNotification.metadata.type && (
                                                <div>
                                                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Type</p>
                                                    <p className="text-sm text-gray-900 dark:text-white">{selectedNotification.metadata.type}</p>
                                                </div>
                                            )}
                                            {selectedNotification.metadata.value && (
                                                <div>
                                                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Value</p>
                                                    <p className="text-sm text-gray-900 dark:text-white">{selectedNotification.metadata.value}</p>
                                                </div>
                                            )}
                                            {selectedNotification.metadata.change && (
                                                <div>
                                                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Change</p>
                                                    <p className={`text-sm ${
                                                        selectedNotification.metadata.change.startsWith('+')
                                                            ? 'text-emerald-600 dark:text-emerald-400'
                                                            : selectedNotification.metadata.change.startsWith('-')
                                                                ? 'text-red-600 dark:text-red-400'
                                                                : 'text-gray-900 dark:text-white'
                                                    }`}>
                                                        {selectedNotification.metadata.change}
                                                    </p>
                                                </div>
                                            )}
                                            {selectedNotification.metadata.relatedAsset && (
                                                <div>
                                                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Related
                                                        Asset</p>
                                                    <p className="text-sm text-gray-900 dark:text-white">{selectedNotification.metadata.relatedAsset}</p>
                                                </div>
                                            )}
                                            {selectedNotification.metadata.location && (
                                                <div>
                                                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Location</p>
                                                    <p className="text-sm text-gray-900 dark:text-white flex items-center gap-1">
                                                        <MapPin className="w-3 h-3"/>
                                                        {selectedNotification.metadata.location}
                                                    </p>
                                                </div>
                                            )}
                                            {selectedNotification.metadata.device && (
                                                <div>
                                                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Device</p>
                                                    <p className="text-sm text-gray-900 dark:text-white flex items-center gap-1">
                                                        <Smartphone className="w-3 h-3"/>
                                                        {selectedNotification.metadata.device}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </Card>
                                )}

                                {/* Action Buttons */}
                                {selectedNotification.actionButtons && selectedNotification.actionButtons.length > 0 && (
                                    <Card
                                        className="bg-white/80 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
                                        <h3 className="flex items-center gap-2 text-amber-700 dark:text-amber-400 mb-4">
                                            <Zap className="w-5 h-5"/>
                                            Quick Actions
                                        </h3>
                                        <div className="flex items-center gap-3 flex-wrap">
                                            {selectedNotification.actionButtons.map((button, index) => (
                                                <Button
                                                    key={index}
                                                    variant={button.variant || 'default'}
                                                    onClick={() => {
                                                    }}
                                                    className="rounded-xl"
                                                >
                                                    {button.icon}
                                                    {button.label}
                                                </Button>
                                            ))}
                                        </div>
                                    </Card>
                                )}

                                {/* Related Links */}
                                {selectedNotification.relatedLinks && selectedNotification.relatedLinks.length > 0 && (
                                    <Card
                                        className="bg-white/80 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
                                        <h3 className="flex items-center gap-2 text-amber-700 dark:text-amber-400 mb-4">
                                            <Link2 className="w-5 h-5"/>
                                            Related Resources
                                        </h3>
                                        <div className="space-y-2">
                                            {selectedNotification.relatedLinks.map((link, index) => (
                                                <motion.a
                                                    key={index}
                                                    href={link.url}
                                                    whileHover={{x: 4}}
                                                    className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800/50 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors group"
                                                >
                                                    <span
                                                        className="text-sm text-gray-700 dark:text-gray-300">{link.label}</span>
                                                    <ExternalLink
                                                        className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors"/>
                                                </motion.a>
                                            ))}
                                        </div>
                                    </Card>
                                )}

                                {/* Attachments */}
                                {selectedNotification.attachments && selectedNotification.attachments.length > 0 && (
                                    <Card
                                        className="bg-white/80 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
                                        <h3 className="flex items-center gap-2 text-amber-700 dark:text-amber-400 mb-4">
                                            <FileText className="w-5 h-5"/>
                                            Attachments
                                        </h3>
                                        <div className="space-y-2">
                                            {selectedNotification.attachments.map((file, index) => (
                                                <motion.div
                                                    key={index}
                                                    whileHover={{scale: 1.01}}
                                                    className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800/50 rounded-xl"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div
                                                            className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center">
                                                            <FileText
                                                                className="w-5 h-5 text-amber-600 dark:text-amber-400"/>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm text-gray-900 dark:text-white">{file.name}</p>
                                                            <p className="text-xs text-gray-600 dark:text-gray-400">{file.size} • {file.type}</p>
                                                        </div>
                                                    </div>
                                                    <Button variant="ghost" size="sm" className="rounded-lg">
                                                        <Download className="w-4 h-4"/>
                                                    </Button>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </Card>
                                )}

                                {/* Timestamp Details */}
                                <Card
                                    className="bg-white/80 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
                                    <h3 className="flex items-center gap-2 text-amber-700 dark:text-amber-400 mb-4">
                                        <Clock className="w-5 h-5"/>
                                        Timeline
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Timestamp</p>
                                            <p className="text-sm text-gray-900 dark:text-white">{selectedNotification.timestamp}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Received</p>
                                            <p className="text-sm text-gray-900 dark:text-white">{selectedNotification.timeAgo}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Priority</p>
                                            <Badge className={`${
                                                selectedNotification.priority === 'critical' ? 'bg-red-500/20 text-red-700 dark:text-red-400 border-red-500/50' :
                                                    selectedNotification.priority === 'high' ? 'bg-orange-500/20 text-orange-700 dark:text-orange-400 border-orange-500/50' :
                                                        selectedNotification.priority === 'medium' ? 'bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-500/50' :
                                                            'bg-gray-500/20 text-gray-700 dark:text-gray-400 border-gray-500/50'
                                            } border capitalize`}>
                                                {selectedNotification.priority}
                                            </Badge>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Status</p>
                                            <Badge className={`${
                                                selectedNotification.isRead
                                                    ? 'bg-gray-500/20 text-gray-700 dark:text-gray-400 border-gray-500/50'
                                                    : 'bg-amber-500/20 text-amber-700 dark:text-amber-400 border-amber-500/50'
                                            } border`}>
                                                {selectedNotification.isRead ? 'Read' : 'Unread'}
                                            </Badge>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        </div>
                    </ScrollArea>
                </div>
            </div>
        );
    }

    // LIST VIEW
    return (
        <div
            className="min-h-screen bg-gradient-to-br from-background via-background to-amber-50/30 dark:to-amber-950/20 relative overflow-hidden">
            {/* Animated Background Orbs */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-1/4 -left-64 w-[600px] h-[600px] bg-amber-300/20 dark:bg-amber-500/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
                <motion.div
                    className="absolute bottom-1/4 -right-64 w-[600px] h-[600px] bg-yellow-300/20 dark:bg-yellow-500/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1.1, 1, 1.1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-200/15 dark:bg-amber-400/5 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            </div>

            <div className="relative z-10 p-4 md:p-6 lg:p-8 max-w-[1800px] mx-auto">
                {/* Hero Header */}
                <motion.div
                    initial={{opacity: 0, y: -20}}
                    animate={{opacity: 1, y: 0}}
                    className="mb-6 md:mb-8"
                >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-br from-amber-400 to-yellow-600 dark:from-amber-400 dark:to-yellow-500 rounded-2xl blur-xl opacity-50"
                                    animate={{
                                        scale: [1, 1.1, 1],
                                        opacity: [0.4, 0.6, 0.4],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                    }}
                                />
                                <div
                                    className="relative w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-amber-400 to-yellow-600 dark:from-amber-400 dark:to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg">
                                    <BellRing className="w-7 h-7 md:w-8 md:h-8 text-white dark:text-gray-900"/>
                                    {analytics.unread > 0 && (
                                        <motion.div
                                            className="absolute -top-1 -right-1 min-w-[28px] h-7 bg-red-500 rounded-full flex items-center justify-center px-2 text-xs text-white shadow-lg"
                                            animate={{scale: [1, 1.15, 1]}}
                                            transition={{duration: 2, repeat: Infinity}}
                                        >
                                            {analytics.unread}
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-3xl lg:text-4xl bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-600 dark:from-amber-400 dark:via-yellow-400 dark:to-amber-400 bg-clip-text text-transparent mb-1">
                                    Notification Center
                                </h1>
                                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                                    AI-powered alerts • Real-time updates • Smart insights
                                </p>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                            <Button
                                variant="outline"
                                size="sm"
                                className="border-gray-300 dark:border-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                                onClick={() => setShowAnalytics(!showAnalytics)}
                            >
                                <BarChart3 className="w-4 h-4 mr-2"/>
                                <span className="hidden sm:inline">Analytics</span>
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="border-gray-300 dark:border-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                                onClick={() => setShowPreferences(!showPreferences)}
                            >
                                <Sliders className="w-4 h-4 mr-2"/>
                                <span className="hidden sm:inline">Settings</span>
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="border-gray-300 dark:border-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                                onClick={markAllAsRead}
                            >
                                <CheckCheck className="w-4 h-4 mr-2"/>
                                <span className="hidden sm:inline">Mark All Read</span>
                            </Button>
                            <Button
                                size="sm"
                                className="bg-gradient-to-r from-amber-400 to-yellow-600 hover:from-amber-500 hover:to-yellow-700 dark:from-amber-400 dark:to-yellow-500 dark:hover:from-amber-500 dark:hover:to-yellow-600 text-gray-900 dark:text-gray-900 rounded-xl shadow-lg shadow-amber-500/30 transition-all duration-300"
                                onClick={archiveAllRead}
                            >
                                <Archive className="w-4 h-4 mr-2"/>
                                <span className="hidden sm:inline">Archive Read</span>
                            </Button>
                        </div>
                    </div>
                </motion.div>

                {/* Analytics Dashboard */}
                <AnimatePresence>
                    {showAnalytics && (
                        <motion.div
                            initial={{opacity: 0, height: 0, marginBottom: 0}}
                            animate={{opacity: 1, height: 'auto', marginBottom: 24}}
                            exit={{opacity: 0, height: 0, marginBottom: 0}}
                            className="overflow-hidden"
                        >
                            <Card
                                className="bg-white/80 dark:bg-gray-900/60 backdrop-blur-xl border-amber-200/50 dark:border-amber-500/20 rounded-2xl p-4 md:p-6 shadow-xl">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h3 className="text-lg md:text-xl text-amber-800 dark:text-amber-400 mb-1">Notification
                                            Analytics</h3>
                                        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Performance
                                            metrics and insights</p>
                                    </div>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => setShowAnalytics(false)}
                                        className="hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg"
                                    >
                                        <X className="w-4 h-4"/>
                                    </Button>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
                                    <StatsCard
                                        label="Today"
                                        value={analytics.todayCount.toString()}
                                        icon={<Calendar className="w-5 h-5"/>}
                                        color="blue"
                                    />
                                    <StatsCard
                                        label="This Week"
                                        value={analytics.thisWeekCount.toString()}
                                        icon={<Activity className="w-5 h-5"/>}
                                        color="purple"
                                    />
                                    <StatsCard
                                        label="Response Rate"
                                        value={`${analytics.responseRate}%`}
                                        icon={<Target className="w-5 h-5"/>}
                                        color="green"
                                    />
                                    <StatsCard
                                        label="Avg Response"
                                        value={analytics.avgResponseTime}
                                        icon={<Clock className="w-5 h-5"/>}
                                        color="amber"
                                    />
                                </div>

                                {/* Category Distribution */}
                                <div>
                                    <h4 className="text-sm text-gray-600 dark:text-gray-400 mb-4">Notifications by
                                        Category</h4>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                                        {Object.entries(analytics.byCategory)
                                            .filter(([, count]) => count > 0)
                                            .map(([category, count]) => (
                                                <motion.div
                                                    key={category}
                                                    whileHover={{scale: 1.02}}
                                                    className="bg-gray-100 dark:bg-gray-800/50 rounded-xl p-3 flex items-center justify-between transition-all duration-300 hover:shadow-md"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <div
                                                            className={`w-8 h-8 rounded-lg flex items-center justify-center ${getCategoryColor(category)}`}>
                                                            {getCategoryIcon(category)}
                                                        </div>
                                                        <span
                                                            className="text-xs md:text-sm text-gray-700 dark:text-gray-300 capitalize">{category}</span>
                                                    </div>
                                                    <Badge
                                                        className="bg-amber-500/20 text-amber-700 dark:text-amber-400 border-amber-500/50">
                                                        {count}
                                                    </Badge>
                                                </motion.div>
                                            ))}
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Preferences Panel */}
                <AnimatePresence>
                    {showPreferences && (
                        <motion.div
                            initial={{opacity: 0, height: 0, marginBottom: 0}}
                            animate={{opacity: 1, height: 'auto', marginBottom: 24}}
                            exit={{opacity: 0, height: 0, marginBottom: 0}}
                            className="overflow-hidden"
                        >
                            <Card
                                className="bg-white/80 dark:bg-gray-900/60 backdrop-blur-xl border-amber-200/50 dark:border-amber-500/20 rounded-2xl p-4 md:p-6 shadow-xl">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h3 className="text-lg md:text-xl text-amber-800 dark:text-amber-400 mb-1">Notification
                                            Preferences</h3>
                                        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Customize
                                            your notification experience</p>
                                    </div>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => setShowPreferences(false)}
                                        className="hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg"
                                    >
                                        <X className="w-4 h-4"/>
                                    </Button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <PreferenceToggle
                                        icon={smartFilter ? <Sparkles className="w-5 h-5"/> :
                                            <Filter className="w-5 h-5"/>}
                                        label="Smart Filter"
                                        description="Show only high-priority and AI alerts"
                                        checked={smartFilter}
                                        onCheckedChange={setSmartFilter}
                                        color="purple"
                                    />
                                    <PreferenceToggle
                                        icon={muteAlerts ? <VolumeX className="w-5 h-5"/> :
                                            <Volume2 className="w-5 h-5"/>}
                                        label="Sound Alerts"
                                        description="Play sound for new notifications"
                                        checked={!muteAlerts}
                                        onCheckedChange={(checked) => setMuteAlerts(!checked)}
                                        color="blue"
                                    />
                                    <PreferenceToggle
                                        icon={<Eye className="w-5 h-5"/>}
                                        label="Auto Mark as Read"
                                        description="Mark notifications as read when viewed"
                                        checked={autoMarkRead}
                                        onCheckedChange={setAutoMarkRead}
                                        color="green"
                                    />
                                    <PreferenceToggle
                                        icon={<BellRing className="w-5 h-5"/>}
                                        label="Push Notifications"
                                        description="Receive push notifications on mobile"
                                        checked={true}
                                        onCheckedChange={() => {
                                        }}
                                        color="amber"
                                    />
                                </div>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
                    {/* Left Sidebar - Filters */}
                    <motion.div
                        initial={{opacity: 0, x: -20}}
                        animate={{opacity: 1, x: 0}}
                        transition={{delay: 0.1}}
                        className="lg:col-span-3 space-y-4 md:space-y-6"
                    >
                        {/* Filter Card */}
                        <Card
                            className="bg-white/80 dark:bg-gray-900/60 backdrop-blur-xl border-amber-200/50 dark:border-amber-500/20 rounded-2xl p-4 md:p-6 shadow-xl">
                            <div className="flex items-center gap-2 mb-4 md:mb-6">
                                <div
                                    className="w-8 h-8 bg-gradient-to-br from-amber-400 to-yellow-600 dark:from-amber-400 dark:to-yellow-500 rounded-lg flex items-center justify-center">
                                    <Filter className="w-4 h-4 text-white dark:text-gray-900"/>
                                </div>
                                <h3 className="text-amber-700 dark:text-amber-400">Filters</h3>
                            </div>

                            <div className="space-y-2">
                                <FilterButton
                                    icon={<Bell className="w-4 h-4"/>}
                                    label="All Notifications"
                                    count={analytics.total}
                                    active={selectedCategory === 'all'}
                                    onClick={() => setSelectedCategory('all')}
                                />
                                <FilterButton
                                    icon={<TrendingUp className="w-4 h-4"/>}
                                    label="Market Alerts"
                                    count={analytics.byCategory.market}
                                    active={selectedCategory === 'market'}
                                    onClick={() => setSelectedCategory('market')}
                                />
                                <FilterButton
                                    icon={<Sparkles className="w-4 h-4"/>}
                                    label="AI Insights"
                                    count={analytics.byCategory.ai}
                                    active={selectedCategory === 'ai'}
                                    onClick={() => setSelectedCategory('ai')}
                                />
                                <FilterButton
                                    icon={<DollarSign className="w-4 h-4"/>}
                                    label="SIP Updates"
                                    count={analytics.byCategory.sip}
                                    active={selectedCategory === 'sip'}
                                    onClick={() => setSelectedCategory('sip')}
                                />
                                <FilterButton
                                    icon={<Zap className="w-4 h-4"/>}
                                    label="F&O Alerts"
                                    count={analytics.byCategory.fno}
                                    active={selectedCategory === 'fno'}
                                    onClick={() => setSelectedCategory('fno')}
                                />
                                <FilterButton
                                    icon={<Shield className="w-4 h-4"/>}
                                    label="Security"
                                    count={analytics.byCategory.security}
                                    active={selectedCategory === 'security'}
                                    onClick={() => setSelectedCategory('security')}
                                />
                                <FilterButton
                                    icon={<PieChart className="w-4 h-4"/>}
                                    label="Portfolio"
                                    count={analytics.byCategory.portfolio}
                                    active={selectedCategory === 'portfolio'}
                                    onClick={() => setSelectedCategory('portfolio')}
                                />
                                <FilterButton
                                    icon={<Newspaper className="w-4 h-4"/>}
                                    label="News"
                                    count={analytics.byCategory.news}
                                    active={selectedCategory === 'news'}
                                    onClick={() => setSelectedCategory('news')}
                                />
                                <FilterButton
                                    icon={<Users className="w-4 h-4"/>}
                                    label="Social"
                                    count={analytics.byCategory.social}
                                    active={selectedCategory === 'social'}
                                    onClick={() => setSelectedCategory('social')}
                                />
                            </div>
                        </Card>

                        {/* Quick Stats */}
                        <Card
                            className="bg-white/80 dark:bg-gray-900/60 backdrop-blur-xl border-amber-200/50 dark:border-amber-500/20 rounded-2xl p-4 md:p-6 shadow-xl">
                            <div className="flex items-center gap-2 mb-4">
                                <Activity className="w-5 h-5 text-amber-600 dark:text-amber-400"/>
                                <h3 className="text-amber-700 dark:text-amber-400">Quick Stats</h3>
                            </div>
                            <div className="space-y-4">
                                <QuickStat label="Unread" value={analytics.unread} color="amber"/>
                                <QuickStat label="Pinned" value={analytics.pinned} color="blue"/>
                                <QuickStat label="Bookmarked" value={analytics.bookmarked} color="purple"/>
                                <QuickStat label="Critical" value={analytics.critical} color="red"/>
                            </div>
                        </Card>

                        {/* AI Assistant */}
                        <Card
                            className="bg-gradient-to-br from-purple-100/80 to-purple-50/50 dark:from-purple-500/10 dark:to-purple-600/10 backdrop-blur-xl border-purple-300/50 dark:border-purple-500/30 rounded-2xl p-4 md:p-5 shadow-xl">
                            <div className="flex items-center gap-2 mb-4">
                                <motion.div
                                    animate={{scale: [1, 1.2, 1], rotate: [0, 180, 360]}}
                                    transition={{duration: 4, repeat: Infinity}}
                                >
                                    <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400"/>
                                </motion.div>
                                <h4 className="text-purple-800 dark:text-purple-300 text-sm">AI Assistant</h4>
                            </div>
                            <div className="space-y-3">
                                <AIMessage
                                    message={`${analytics.unread} notifications need your attention`}
                                    icon={<Bell className="w-3 h-3"/>}
                                />
                                <AIMessage
                                    message="Auto-schedule SIP reminders?"
                                    icon={<Calendar className="w-3 h-3"/>}
                                />
                                <AIMessage
                                    message="Group similar alerts together?"
                                    icon={<Layers className="w-3 h-3"/>}
                                />
                            </div>
                        </Card>
                    </motion.div>

                    {/* Center - Notification List */}
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.2}}
                        className="lg:col-span-9"
                    >
                        <Card
                            className="bg-white/80 dark:bg-gray-900/60 backdrop-blur-xl border-amber-200/50 dark:border-amber-500/20 rounded-2xl shadow-xl overflow-hidden">
                            {/* Tabs and Search */}
                            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                                <div className="border-b border-gray-200 dark:border-gray-800 p-4 md:p-6 space-y-4">
                                    {/* Search Bar */}
                                    <div className="relative">
                                        <Search
                                            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"/>
                                        <Input
                                            type="text"
                                            placeholder="Search notifications..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="pl-10 pr-10 rounded-xl border-gray-300 dark:border-gray-700 focus:border-amber-500 dark:focus:border-amber-500 transition-all duration-300"
                                        />
                                        {searchQuery && (
                                            <button
                                                onClick={() => setSearchQuery('')}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                            >
                                                <X className="w-4 h-4"/>
                                            </button>
                                        )}
                                    </div>

                                    {/* Tabs */}
                                    <TabsList
                                        className="grid w-full grid-cols-4 bg-gray-100 dark:bg-gray-800/50 rounded-xl p-1">
                                        <TabsTrigger value="all"
                                                     className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:text-amber-700 dark:data-[state=active]:text-amber-400 text-xs md:text-sm">
                                            All <span className="hidden sm:inline">({analytics.total})</span>
                                        </TabsTrigger>
                                        <TabsTrigger value="unread"
                                                     className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:text-amber-700 dark:data-[state=active]:text-amber-400 text-xs md:text-sm">
                                            Unread <span className="hidden sm:inline">({analytics.unread})</span>
                                        </TabsTrigger>
                                        <TabsTrigger value="pinned"
                                                     className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:text-blue-700 dark:data-[state=active]:text-blue-400 text-xs md:text-sm">
                                            Pinned <span className="hidden sm:inline">({analytics.pinned})</span>
                                        </TabsTrigger>
                                        <TabsTrigger value="critical"
                                                     className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:text-red-700 dark:data-[state=active]:text-red-400 text-xs md:text-sm">
                                            Critical <span className="hidden sm:inline">({analytics.critical})</span>
                                        </TabsTrigger>
                                    </TabsList>

                                    {/* View Mode Toggle */}
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            {filteredNotifications.length} notifications
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                size="sm"
                                                variant={viewMode === 'comfortable' ? 'default' : 'ghost'}
                                                onClick={() => setViewMode('comfortable')}
                                                className="rounded-lg"
                                            >
                                                <Maximize2 className="w-4 h-4"/>
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant={viewMode === 'compact' ? 'default' : 'ghost'}
                                                onClick={() => setViewMode('compact')}
                                                className="rounded-lg"
                                            >
                                                <Minimize2 className="w-4 h-4"/>
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                <TabsContent value={activeTab} className="mt-0">
                                    <ScrollArea className="h-[calc(100vh-24rem)] md:h-[calc(100vh-20rem)]">
                                        <div className="p-4 md:p-6 pt-2 space-y-4">
                                            {filteredNotifications.length > 0 ? (
                                                <>
                                                    {/* Today */}
                                                    {groupedNotifications.today.length > 0 && (
                                                        <DateGroup
                                                            label="Today"
                                                            count={groupedNotifications.today.length}
                                                            notifications={groupedNotifications.today}
                                                            expanded={expandedGroups.includes('today')}
                                                            onToggle={() => toggleGroup('today')}
                                                            handleViewDetails={handleViewDetails}
                                                            getCategoryIcon={getCategoryIcon}
                                                            getCategoryColor={getCategoryColor}
                                                            getTagColor={getTagColor}
                                                            getPriorityIcon={getPriorityIcon}
                                                            viewMode={viewMode}
                                                            togglePin={togglePin}
                                                            toggleBookmark={toggleBookmark}
                                                        />
                                                    )}

                                                    {/* Yesterday */}
                                                    {groupedNotifications.yesterday.length > 0 && (
                                                        <DateGroup
                                                            label="Yesterday"
                                                            count={groupedNotifications.yesterday.length}
                                                            notifications={groupedNotifications.yesterday}
                                                            expanded={expandedGroups.includes('yesterday')}
                                                            onToggle={() => toggleGroup('yesterday')}
                                                            handleViewDetails={handleViewDetails}
                                                            getCategoryIcon={getCategoryIcon}
                                                            getCategoryColor={getCategoryColor}
                                                            getTagColor={getTagColor}
                                                            getPriorityIcon={getPriorityIcon}
                                                            viewMode={viewMode}
                                                            togglePin={togglePin}
                                                            toggleBookmark={toggleBookmark}
                                                        />
                                                    )}

                                                    {/* This Week */}
                                                    {groupedNotifications.thisWeek.length > 0 && (
                                                        <DateGroup
                                                            label="This Week"
                                                            count={groupedNotifications.thisWeek.length}
                                                            notifications={groupedNotifications.thisWeek}
                                                            expanded={expandedGroups.includes('thisWeek')}
                                                            onToggle={() => toggleGroup('thisWeek')}
                                                            handleViewDetails={handleViewDetails}
                                                            getCategoryIcon={getCategoryIcon}
                                                            getCategoryColor={getCategoryColor}
                                                            getTagColor={getTagColor}
                                                            getPriorityIcon={getPriorityIcon}
                                                            viewMode={viewMode}
                                                            togglePin={togglePin}
                                                            toggleBookmark={toggleBookmark}
                                                        />
                                                    )}

                                                    {/* Older */}
                                                    {groupedNotifications.older.length > 0 && (
                                                        <DateGroup
                                                            label="Older"
                                                            count={groupedNotifications.older.length}
                                                            notifications={groupedNotifications.older}
                                                            expanded={expandedGroups.includes('older')}
                                                            onToggle={() => toggleGroup('older')}
                                                            handleViewDetails={handleViewDetails}
                                                            getCategoryIcon={getCategoryIcon}
                                                            getCategoryColor={getCategoryColor}
                                                            getTagColor={getTagColor}
                                                            getPriorityIcon={getPriorityIcon}
                                                            viewMode={viewMode}
                                                            togglePin={togglePin}
                                                            toggleBookmark={toggleBookmark}
                                                        />
                                                    )}
                                                </>
                                            ) : (
                                                <div
                                                    className="flex flex-col items-center justify-center py-16 text-center">
                                                    <motion.div
                                                        initial={{scale: 0.8, opacity: 0}}
                                                        animate={{scale: 1, opacity: 1}}
                                                        transition={{duration: 0.5}}
                                                    >
                                                        <BellOff
                                                            className="w-16 h-16 text-gray-400 dark:text-gray-700 mb-4"/>
                                                        <p className="text-gray-600 dark:text-gray-500 mb-2">No
                                                            notifications found</p>
                                                        <p className="text-sm text-gray-500 dark:text-gray-600">Try
                                                            adjusting your filters or search query</p>
                                                    </motion.div>
                                                </div>
                                            )}
                                        </div>
                                    </ScrollArea>
                                </TabsContent>
                            </Tabs>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

// Helper Components

interface FilterButtonProps {
    icon: React.ReactNode;
    label: string;
    count: number;
    active: boolean;
    onClick: () => void;
}

function FilterButton({icon, label, count, active, onClick}: FilterButtonProps) {
    return (
        <motion.button
            onClick={onClick}
            whileHover={{scale: 1.02}}
            whileTap={{scale: 0.98}}
            className={`w-full flex items-center justify-between px-3 py-2 md:py-2.5 rounded-xl transition-all duration-300 ${
                active
                    ? 'bg-gradient-to-r from-amber-400/20 to-yellow-500/20 dark:from-amber-500/20 dark:to-yellow-500/20 border border-amber-500/50 dark:border-amber-500/30 shadow-md shadow-amber-500/10'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800/50'
            }`}
        >
            <div className="flex items-center gap-2">
                <div
                    className={`${active ? 'text-amber-700 dark:text-amber-400' : 'text-gray-600 dark:text-gray-400'} transition-colors`}>
                    {icon}
                </div>
                <span
                    className={`text-sm ${active ? 'text-amber-700 dark:text-amber-400' : 'text-gray-700 dark:text-gray-300'} transition-colors`}>
          {label}
        </span>
            </div>
            <Badge className={`${
                active
                    ? 'bg-amber-500/20 text-amber-700 dark:text-amber-400 border-amber-500/50'
                    : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-400 border-transparent'
            } text-xs px-2 py-0.5 transition-all`}>
                {count}
            </Badge>
        </motion.button>
    );
}

interface QuickStatProps {
    label: string;
    value: number;
    color: 'amber' | 'blue' | 'red' | 'purple';
}

function QuickStat({label, value, color}: QuickStatProps) {
    const colorClasses = {
        amber: 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400',
        blue: 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400',
        red: 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400',
        purple: 'bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400',
    };

    return (
        <motion.div
            whileHover={{scale: 1.02}}
            className="flex items-center justify-between transition-all duration-300"
        >
            <span className="text-sm text-gray-600 dark:text-gray-400">{label}</span>
            <div className={`${colorClasses[color]} rounded-lg px-3 py-1 min-w-[40px] text-center shadow-sm`}>
                {value}
            </div>
        </motion.div>
    );
}

interface AIMessageProps {
    message: string;
    icon?: React.ReactNode;
}

function AIMessage({message, icon}: AIMessageProps) {
    return (
        <motion.div
            whileHover={{scale: 1.02, x: 2}}
            className="bg-white/50 dark:bg-purple-900/20 rounded-lg p-3 text-xs text-purple-800 dark:text-purple-300 flex items-start gap-2 cursor-pointer transition-all duration-300 hover:bg-white/70 dark:hover:bg-purple-900/30"
        >
            {icon && <div className="mt-0.5">{icon}</div>}
            <span>{message}</span>
        </motion.div>
    );
}

interface StatsCardProps {
    label: string;
    value: string;
    icon: React.ReactNode;
    color: 'blue' | 'purple' | 'green' | 'amber';
}

function StatsCard({label, value, icon, color}: StatsCardProps) {
    const colorClasses = {
        blue: 'from-blue-400 to-blue-600',
        purple: 'from-purple-400 to-purple-600',
        green: 'from-emerald-400 to-emerald-600',
        amber: 'from-amber-400 to-yellow-600',
    };

    return (
        <motion.div
            whileHover={{scale: 1.02, y: -2}}
            className="bg-gray-100 dark:bg-gray-800/50 rounded-xl p-3 md:p-4 transition-all duration-300 hover:shadow-lg"
        >
            <div className="flex items-center gap-3 mb-2">
                <div
                    className={`w-10 h-10 bg-gradient-to-br ${colorClasses[color]} rounded-lg flex items-center justify-center text-white shadow-lg`}>
                    {icon}
                </div>
                <div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{label}</div>
                    <div className="text-lg md:text-xl text-gray-900 dark:text-white">{value}</div>
                </div>
            </div>
        </motion.div>
    );
}

interface PreferenceToggleProps {
    icon: React.ReactNode;
    label: string;
    description: string;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    color: 'amber' | 'blue' | 'purple' | 'green';
}

function PreferenceToggle({icon, label, description, checked, onCheckedChange, color}: PreferenceToggleProps) {
    const colorClasses = {
        amber: 'text-amber-600 dark:text-amber-400',
        blue: 'text-blue-600 dark:text-blue-400',
        purple: 'text-purple-600 dark:text-purple-400',
        green: 'text-green-600 dark:text-green-400',
    };

    return (
        <motion.div
            whileHover={{scale: 1.01}}
            className="bg-gray-100 dark:bg-gray-800/50 rounded-xl p-4 transition-all duration-300"
        >
            <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                    <div className={colorClasses[color]}>{icon}</div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
                </div>
                <Switch checked={checked} onCheckedChange={onCheckedChange}/>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 pl-7">{description}</p>
        </motion.div>
    );
}

interface DateGroupProps {
    label: string;
    count: number;
    notifications: Notification[];
    expanded: boolean;
    onToggle: () => void;
    handleViewDetails: (notif: Notification) => void;
    getCategoryIcon: (category: string) => React.ReactNode;
    getCategoryColor: (category: string) => string;
    getTagColor: (tag: string) => string;
    getPriorityIcon: (priority: string) => React.ReactNode;
    viewMode: 'comfortable' | 'compact';
    togglePin: (id: string) => void;
    toggleBookmark: (id: string) => void;
}

function DateGroup({
                       label,
                       count,
                       notifications,
                       expanded,
                       onToggle,
                       handleViewDetails,
                       getCategoryIcon,
                       getCategoryColor,
                       getTagColor,
                       getPriorityIcon,
                       viewMode,
                       togglePin,
                       toggleBookmark,
                   }: DateGroupProps) {
    return (
        <div className="space-y-3">
            {/* Group Header */}
            <motion.button
                onClick={onToggle}
                whileHover={{x: 2}}
                className="w-full flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors group"
            >
                <div className="flex items-center gap-2">
                    <motion.div
                        animate={{rotate: expanded ? 180 : 0}}
                        transition={{duration: 0.3}}
                    >
                        <ChevronDown className="w-4 h-4"/>
                    </motion.div>
                    <span className="uppercase tracking-wider">{label}</span>
                    <Badge className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-400 text-xs">
                        {count}
                    </Badge>
                </div>
            </motion.button>

            {/* Notifications */}
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{height: 0, opacity: 0}}
                        animate={{height: 'auto', opacity: 1}}
                        exit={{height: 0, opacity: 0}}
                        transition={{duration: 0.3}}
                        className="space-y-2 overflow-hidden"
                    >
                        {notifications.map((notif, index) => (
                            <NotificationCard
                                key={notif.id}
                                notification={notif}
                                index={index}
                                isSelected={false}
                                onClick={() => handleViewDetails(notif)}
                                getCategoryIcon={getCategoryIcon}
                                getCategoryColor={getCategoryColor}
                                getTagColor={getTagColor}
                                getPriorityIcon={getPriorityIcon}
                                viewMode={viewMode}
                                togglePin={togglePin}
                                toggleBookmark={toggleBookmark}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

interface NotificationCardProps {
    notification: Notification;
    index: number;
    isSelected: boolean;
    onClick: () => void;
    getCategoryIcon: (category: string) => React.ReactNode;
    getCategoryColor: (category: string) => string;
    getTagColor: (tag: string) => string;
    getPriorityIcon: (priority: string) => React.ReactNode;
    viewMode: 'comfortable' | 'compact';
    togglePin: (id: string) => void;
    toggleBookmark: (id: string) => void;
}

function NotificationCard({
                              notification,
                              index,
                              isSelected,
                              onClick,
                              getCategoryIcon,
                              getCategoryColor,
                              getTagColor,
                              getPriorityIcon,
                              viewMode,
                              togglePin,
                              toggleBookmark,
                          }: NotificationCardProps) {
    const [showActions, setShowActions] = useState(false);

    return (
        <motion.div
            initial={{opacity: 0, x: -20}}
            animate={{opacity: 1, x: 0}}
            transition={{delay: index * 0.03}}
            whileHover={{scale: 1.01}}
            onClick={onClick}
            onMouseEnter={() => setShowActions(true)}
            onMouseLeave={() => setShowActions(false)}
            className="cursor-pointer group"
        >
            <Card
                className={`bg-white/90 dark:bg-gray-900/70 backdrop-blur-sm border rounded-xl ${
                    viewMode === 'compact' ? 'p-3' : 'p-4'
                } transition-all duration-300 relative overflow-hidden ${
                    !notification.isRead
                        ? 'border-amber-300/60 dark:border-amber-500/40 shadow-lg shadow-amber-500/10'
                        : 'border-gray-200/50 dark:border-gray-800/50'
                } ${
                    isSelected
                        ? 'ring-2 ring-amber-500 dark:ring-amber-400'
                        : 'hover:border-amber-400/60 dark:hover:border-amber-500/50'
                }`}
            >
                {/* Unread indicator glow */}
                {!notification.isRead && (
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-amber-500/10 to-amber-500/5"
                        animate={{opacity: [0.5, 0.8, 0.5]}}
                        transition={{duration: 2, repeat: Infinity}}
                    />
                )}

                {/* Priority stripe */}
                {notification.priority === 'critical' && (
                    <motion.div
                        className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 to-red-600"
                        animate={{opacity: [0.7, 1, 0.7]}}
                        transition={{duration: 1.5, repeat: Infinity}}
                    />
                )}

                <div className="relative z-10">
                    {/* Header */}
                    <div className={`flex items-start gap-3 ${viewMode === 'compact' ? 'mb-2' : 'mb-3'}`}>
                        {/* Category Icon */}
                        <div
                            className={`${viewMode === 'compact' ? 'w-8 h-8' : 'w-10 h-10'} rounded-lg flex items-center justify-center flex-shrink-0 border ${getCategoryColor(notification.category)}`}>
                            {getCategoryIcon(notification.category)}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                                <div className="flex items-center gap-2 flex-wrap flex-1 min-w-0">
                                    <h4 className="text-gray-900 dark:text-white text-sm line-clamp-1 flex-shrink">{notification.title}</h4>
                                    {notification.isPinned && (
                                        <Pin
                                            className="w-3 h-3 text-blue-600 dark:text-blue-400 flex-shrink-0 fill-current"/>
                                    )}
                                    {notification.isBookmarked && (
                                        <Bookmark
                                            className="w-3 h-3 text-amber-600 dark:text-amber-400 flex-shrink-0 fill-current"/>
                                    )}
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    {!notification.isRead && (
                                        <motion.div
                                            className="w-2 h-2 bg-amber-500 dark:bg-amber-400 rounded-full"
                                            animate={{scale: [1, 1.2, 1]}}
                                            transition={{duration: 2, repeat: Infinity}}
                                        />
                                    )}
                                    <div className="flex-shrink-0">
                                        {getPriorityIcon(notification.priority)}
                                    </div>
                                </div>
                            </div>
                            {viewMode === 'comfortable' && (
                                <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                                    {notification.message}
                                </p>
                            )}
                            <div className="flex items-center gap-2 flex-wrap">
                                <Badge className={`${getTagColor(notification.tag)} border text-xs px-2 py-0.5`}>
                                    {notification.tag}
                                </Badge>
                                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                    <Clock className="w-3 h-3"/>
                                    {notification.timeAgo}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Metadata */}
                    {viewMode === 'comfortable' && notification.metadata && (
                        <div
                            className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-800">
                            <div className="flex items-center gap-2">
                                <span
                                    className="text-xs text-gray-600 dark:text-gray-500">{notification.metadata.type}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span
                                    className="text-sm text-gray-900 dark:text-white">{notification.metadata.value}</span>
                                {notification.metadata.change && (
                                    <span
                                        className={`text-xs ${
                                            notification.metadata.change.startsWith('+')
                                                ? 'text-emerald-600 dark:text-emerald-400'
                                                : notification.metadata.change.startsWith('-')
                                                    ? 'text-red-600 dark:text-red-400'
                                                    : 'text-gray-600 dark:text-gray-400'
                                        }`}
                                    >
                    {notification.metadata.change}
                  </span>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Quick Actions */}
                    <AnimatePresence>
                        {showActions && (
                            <motion.div
                                initial={{opacity: 0, y: 10}}
                                animate={{opacity: 1, y: 0}}
                                exit={{opacity: 0, y: 10}}
                                className="absolute bottom-2 right-2 flex items-center gap-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-lg p-1 shadow-lg border border-gray-200 dark:border-gray-800"
                            >
                                <motion.button
                                    whileHover={{scale: 1.1}}
                                    whileTap={{scale: 0.9}}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        togglePin(notification.id);
                                    }}
                                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                                    title="Pin"
                                >
                                    <Pin
                                        className={`w-3 h-3 ${notification.isPinned ? 'text-blue-600 dark:text-blue-400 fill-current' : 'text-gray-600 dark:text-gray-400'}`}/>
                                </motion.button>
                                <motion.button
                                    whileHover={{scale: 1.1}}
                                    whileTap={{scale: 0.9}}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleBookmark(notification.id);
                                    }}
                                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                                    title="Bookmark"
                                >
                                    <Bookmark
                                        className={`w-3 h-3 ${notification.isBookmarked ? 'text-amber-600 dark:text-amber-400 fill-current' : 'text-gray-600 dark:text-gray-400'}`}/>
                                </motion.button>
                                <motion.button
                                    whileHover={{scale: 1.1}}
                                    whileTap={{scale: 0.9}}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                    }}
                                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                                    title="More"
                                >
                                    <MoreHorizontal className="w-3 h-3 text-gray-600 dark:text-gray-400"/>
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </Card>
        </motion.div>
    );
}

interface NotificationDetailProps {
    notification: Notification;
    onClose: () => void;
    getCategoryIcon: (category: string) => React.ReactNode;
    getCategoryColor: (category: string) => string;
    getTagColor: (tag: string) => string;
    togglePin: (id: string) => void;
    toggleBookmark: (id: string) => void;
    deleteNotification: (id: string) => void;
    markAsRead: (id: string) => void;
}

function NotificationDetail({
                                notification,
                                onClose,
                                getCategoryIcon,
                                getCategoryColor,
                                getTagColor,
                                togglePin,
                                toggleBookmark,
                                deleteNotification,
                                markAsRead,
                            }: NotificationDetailProps) {
    return (
        <motion.div
            key={notification.id}
            initial={{opacity: 0, scale: 0.95}}
            animate={{opacity: 1, scale: 1}}
            exit={{opacity: 0, scale: 0.95}}
            className="sticky top-6"
        >
            <Card
                className="bg-white/90 dark:bg-gray-900/70 backdrop-blur-xl border-2 border-amber-300/50 dark:border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden">
                {/* Animated border */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/20 to-transparent"
                        animate={{x: ['-200%', '200%']}}
                        transition={{duration: 3, repeat: Infinity, ease: 'linear'}}
                    />
                </div>

                <ScrollArea className="h-[calc(100vh-8rem)] relative z-10">
                    <div className="p-6">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex-1">
                                <h3 className="text-xl text-amber-700 dark:text-amber-400 mb-1">Details</h3>
                                <p className="text-xs text-gray-600 dark:text-gray-500">{notification.id}</p>
                            </div>
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={onClose}
                                className="hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg"
                            >
                                <X className="w-4 h-4"/>
                            </Button>
                        </div>

                        {/* Category & Priority */}
                        <div className="flex items-center gap-2 mb-6 flex-wrap">
                            <Badge className={`${getCategoryColor(notification.category)} border px-3 py-1`}>
                                {getCategoryIcon(notification.category)}
                                <span className="ml-1 capitalize">{notification.category}</span>
                            </Badge>
                            <Badge className={`${getTagColor(notification.tag)} border px-3 py-1`}>
                                {notification.tag}
                            </Badge>
                            {!notification.isRead && (
                                <Badge
                                    className="bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 border-amber-500/50 px-3 py-1">
                                    Unread
                                </Badge>
                            )}
                        </div>

                        {/* Title */}
                        <h2 className="text-xl text-gray-900 dark:text-white mb-3">{notification.title}</h2>

                        {/* Timestamp */}
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4"/>
                                {notification.timeAgo}
                            </div>
                            {notification.metadata?.location && (
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4"/>
                                    {notification.metadata.location}
                                </div>
                            )}
                        </div>

                        <Separator className="bg-gray-300 dark:bg-gray-800 mb-6"/>

                        {/* Message */}
                        <div className="mb-6">
                            <p className="text-sm text-gray-800 dark:text-gray-300 leading-relaxed">
                                {notification.message}
                            </p>
                        </div>

                        {/* Detailed Message */}
                        {notification.detailedMessage && (
                            <>
                                <div className="mb-6">
                                    <h4 className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-3">Detailed
                                        Information</h4>
                                    <div className="bg-gray-100 dark:bg-gray-800/50 rounded-xl p-4">
                                        <p className="text-sm text-gray-800 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                                            {notification.detailedMessage}
                                        </p>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Metadata */}
                        {notification.metadata && (
                            <>
                                <div
                                    className="bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800/50 dark:to-gray-800/30 rounded-xl p-4 mb-6 border border-gray-200 dark:border-gray-700">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Type</div>
                                            <div
                                                className="text-sm text-gray-900 dark:text-white">{notification.metadata.type}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Value</div>
                                            <div
                                                className="text-sm text-gray-900 dark:text-white">{notification.metadata.value}</div>
                                        </div>
                                        {notification.metadata.change && (
                                            <div className="col-span-2">
                                                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Change
                                                </div>
                                                <div
                                                    className={`text-sm ${
                                                        notification.metadata.change.startsWith('+')
                                                            ? 'text-emerald-600 dark:text-emerald-400'
                                                            : notification.metadata.change.startsWith('-')
                                                                ? 'text-red-600 dark:text-red-400'
                                                                : 'text-gray-900 dark:text-white'
                                                    }`}
                                                >
                                                    {notification.metadata.change}
                                                </div>
                                            </div>
                                        )}
                                        {notification.metadata.device && (
                                            <div className="col-span-2">
                                                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Device
                                                </div>
                                                <div
                                                    className="text-sm text-gray-900 dark:text-white">{notification.metadata.device}</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}

                        {/* AI Insight */}
                        {notification.aiInsight && (
                            <>
                                <div
                                    className="bg-gradient-to-br from-purple-100/50 to-purple-50/50 dark:from-purple-500/10 dark:to-purple-600/10 border border-purple-300/50 dark:border-purple-500/30 rounded-xl p-4 mb-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div
                                            className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
                                            <Sparkles className="w-4 h-4 text-white"/>
                                        </div>
                                        <span
                                            className="text-sm text-purple-800 dark:text-purple-400">AI Analysis</span>
                                    </div>
                                    <div className="space-y-3">
                                        <div>
                                            <div className="text-xs text-purple-700 dark:text-purple-400 mb-1">Summary
                                            </div>
                                            <p className="text-sm text-gray-800 dark:text-gray-300">{notification.aiInsight.summary}</p>
                                        </div>
                                        <div>
                                            <div className="text-xs text-purple-700 dark:text-purple-400 mb-1">Predicted
                                                Impact
                                            </div>
                                            <p className="text-sm text-gray-800 dark:text-gray-300">{notification.aiInsight.predictedImpact}</p>
                                        </div>
                                        <div>
                                            <div
                                                className="text-xs text-purple-700 dark:text-purple-400 mb-1">Recommended
                                                Action
                                            </div>
                                            <p className="text-sm text-gray-800 dark:text-gray-300">{notification.aiInsight.recommendedAction}</p>
                                        </div>
                                        <div>
                                            <div className="text-xs text-purple-700 dark:text-purple-400 mb-2">AI
                                                Confidence
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Progress value={notification.aiInsight.confidence}
                                                          className="flex-1 h-2"/>
                                                <span
                                                    className="text-sm text-purple-700 dark:text-purple-400">{notification.aiInsight.confidence}%</span>
                                            </div>
                                        </div>
                                        {notification.aiInsight.tags && (
                                            <div>
                                                <div
                                                    className="text-xs text-purple-700 dark:text-purple-400 mb-2">Tags
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {notification.aiInsight.tags.map((tag, idx) => (
                                                        <Badge key={idx}
                                                               className="bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400 border-purple-500/50 text-xs">
                                                            {tag}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Related Links */}
                        {notification.relatedLinks && notification.relatedLinks.length > 0 && (
                            <>
                                <div className="mb-6">
                                    <h4 className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-3">Related
                                        Links</h4>
                                    <div className="space-y-2">
                                        {notification.relatedLinks.map((link, idx) => (
                                            <motion.a
                                                key={idx}
                                                href={link.url}
                                                whileHover={{x: 4}}
                                                className="flex items-center gap-2 text-sm text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 transition-colors group"
                                            >
                                                <Link2 className="w-4 h-4"/>
                                                <span>{link.label}</span>
                                                <ExternalLink
                                                    className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"/>
                                            </motion.a>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Attachments */}
                        {notification.attachments && notification.attachments.length > 0 && (
                            <>
                                <div className="mb-6">
                                    <h4 className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-3">Attachments</h4>
                                    <div className="space-y-2">
                                        {notification.attachments.map((attachment, idx) => (
                                            <motion.div
                                                key={idx}
                                                whileHover={{scale: 1.01}}
                                                className="bg-gray-100 dark:bg-gray-800/50 rounded-lg p-3 flex items-center justify-between group cursor-pointer"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-lg flex items-center justify-center">
                                                        <FileText className="w-5 h-5 text-white"/>
                                                    </div>
                                                    <div>
                                                        <div
                                                            className="text-sm text-gray-900 dark:text-white">{attachment.name}</div>
                                                        <div
                                                            className="text-xs text-gray-600 dark:text-gray-400">{attachment.size} • {attachment.type}</div>
                                                    </div>
                                                </div>
                                                <Download
                                                    className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"/>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Action Buttons */}
                        {notification.actionButtons && notification.actionButtons.length > 0 && (
                            <div className="space-y-3 mb-6">
                                <h4 className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wider">Quick
                                    Actions</h4>
                                {notification.actionButtons.map((btn, idx) => (
                                    <Button
                                        key={idx}
                                        className={
                                            btn.variant === 'outline'
                                                ? 'w-full border-gray-300 dark:border-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800'
                                                : btn.variant === 'destructive'
                                                    ? 'w-full bg-red-500 hover:bg-red-600 text-white rounded-xl'
                                                    : 'w-full bg-gradient-to-r from-amber-400 to-yellow-600 hover:from-amber-500 hover:to-yellow-700 dark:from-amber-400 dark:to-yellow-500 dark:hover:from-amber-500 dark:hover:to-yellow-600 text-gray-900 dark:text-gray-900 rounded-xl shadow-lg shadow-amber-500/30'
                                        }
                                        variant={btn.variant || 'default'}
                                    >
                                        {btn.icon && <span className="mr-2">{btn.icon}</span>}
                                        {btn.label}
                                    </Button>
                                ))}
                            </div>
                        )}

                        {/* Quick Actions */}
                        <Separator className="bg-gray-300 dark:bg-gray-800 my-6"/>

                        <div className="grid grid-cols-2 gap-3">
                            <Button
                                variant="outline"
                                size="sm"
                                className="border-gray-300 dark:border-gray-700 rounded-xl"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    togglePin(notification.id);
                                }}
                            >
                                <Pin className="w-4 h-4 mr-2"/>
                                {notification.isPinned ? 'Unpin' : 'Pin'}
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="border-gray-300 dark:border-gray-700 rounded-xl"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleBookmark(notification.id);
                                }}
                            >
                                <Bookmark className="w-4 h-4 mr-2"/>
                                {notification.isBookmarked ? 'Unbookmark' : 'Bookmark'}
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="border-gray-300 dark:border-gray-700 rounded-xl"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    markAsRead(notification.id);
                                }}
                            >
                                <Check className="w-4 h-4 mr-2"/>
                                Mark as Read
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="border-gray-300 dark:border-gray-700 rounded-xl"
                            >
                                <Share2 className="w-4 h-4 mr-2"/>
                                Share
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="border-gray-300 dark:border-gray-700 rounded-xl"
                            >
                                <Archive className="w-4 h-4 mr-2"/>
                                Archive
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="border-gray-300 dark:border-gray-700 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-600 dark:hover:text-red-400 hover:border-red-300 dark:hover:border-red-700"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteNotification(notification.id);
                                }}
                            >
                                <Trash2 className="w-4 h-4 mr-2"/>
                                Delete
                            </Button>
                        </div>
                    </div>
                </ScrollArea>
            </Card>
        </motion.div>
    );
}

// Missing Calculator import
function Calculator({className}: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <rect x="4" y="2" width="16" height="20" rx="2"/>
            <line x1="8" x2="16" y1="6" y2="6"/>
            <line x1="16" x2="16" y1="14" y2="18"/>
            <path d="M16 10h.01"/>
            <path d="M12 10h.01"/>
            <path d="M8 10h.01"/>
            <path d="M12 14h.01"/>
            <path d="M8 14h.01"/>
            <path d="M12 18h.01"/>
            <path d="M8 18h.01"/>
        </svg>
    );
}
