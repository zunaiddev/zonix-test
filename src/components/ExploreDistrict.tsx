import {useEffect, useMemo, useRef, useState} from 'react';
import {Button} from './ui/button';
import {Card} from './ui/card';
import {Badge} from './ui/badge';
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from './ui/dialog';
import {Input} from './ui/input';
import {Tabs, TabsList, TabsTrigger} from './ui/tabs';
import {
    Activity,
    Award,
    BarChart3,
    Briefcase,
    Factory,
    GraduationCap,
    MapPin,
    PieChart,
    Share2,
    Target,
    TrendingDown,
    TrendingUp,
    Users,
    Wallet,
    X,
} from 'lucide-react';
import {allIndianDistricts} from '../utils/indiaData';
import {MarketPerformance} from './MarketPerformance';
import {DistrictBrowser, DistrictToken} from './DistrictBrowser';
import {calculateChange, generateSmoothPriceUpdate} from '../utils/livePriceUpdates';
import {useNavigate} from "react-router-dom";

// Generate realistic district data - OPTIMIZED
const generateDistrictData = (): DistrictToken[] => {
    const industryOptions = [
        'Agriculture', 'Manufacturing', 'IT & Services', 'Tourism', 'Textiles',
        'Pharmaceuticals', 'Automotive', 'Mining', 'Retail', 'Food Processing'
    ];

    return allIndianDistricts.map((district, index) => {
        const basePrice = Math.random() * 200 + 50;
        const change = (Math.random() - 0.5) * 20;
        const change7d = (Math.random() - 0.5) * 30;
        const change30d = (Math.random() - 0.5) * 50;
        const economicPulse = Math.floor(Math.random() * 40 + 60);
        const population = Math.floor(Math.random() * 5000000 + 500000);
        const gdp = Math.floor(Math.random() * 100000 + 10000);

        // Generate mini chart data - simplified
        const miniChart = Array.from({length: 12}, (_, i) => {
            const trend = change > 0 ? 1 : -1;
            return basePrice * (1 + (Math.random() * 0.03 - 0.015) * trend);
        });

        // Determine category based on population and GDP
        let category: 'Small Cap' | 'Mid Cap' | 'Large Cap';
        if (gdp > 70000 || population > 3000000) {
            category = 'Large Cap';
        } else if (gdp > 40000 || population > 1500000) {
            category = 'Mid Cap';
        } else {
            category = 'Small Cap';
        }

        // Determine region
        let region = 'Central';
        if (['JK', 'LA', 'HP', 'PB', 'HR', 'DL', 'CH', 'UK', 'UP'].includes(district.stateCode)) region = 'North';
        if (['RJ', 'MP', 'CG'].includes(district.stateCode)) region = 'Central';
        if (['TN', 'KL', 'KA', 'AP', 'TS', 'PY'].includes(district.stateCode)) region = 'South';
        if (['GJ', 'MH', 'GA', 'DD'].includes(district.stateCode)) region = 'West';
        if (['WB', 'OR', 'BR', 'JH'].includes(district.stateCode)) region = 'East';
        if (['AR', 'AS', 'MN', 'ML', 'MZ', 'NL', 'TR', 'SK'].includes(district.stateCode)) region = 'Northeast';

        const sentiment = change > 3 ? 'Bullish' : change < -3 ? 'Bearish' : 'Neutral';

        const topIndustries = Array.from(
            {length: 3},
            () => industryOptions[Math.floor(Math.random() * industryOptions.length)]
        );

        return {
            page: `DIS-${district.stateCode}-${index}`,
            name: district.name,
            state: district.state,
            stateCode: district.stateCode,
            category,
            price: Number(basePrice.toFixed(2)),
            change: Number(change.toFixed(2)),
            change7d: Number(change7d.toFixed(2)),
            change30d: Number(change30d.toFixed(2)),
            volume24h: Math.floor(Math.random() * 5000000 + 100000),
            gdp,
            gdpGrowth: Number((Math.random() * 10 + 2).toFixed(2)),
            population,
            region,
            economicPulse,
            sentiment,
            aiForecast: Number((Math.random() * 20 - 5).toFixed(2)),
            miniChart,
            sectors: {
                agriculture: Math.floor(Math.random() * 40 + 10),
                industry: Math.floor(Math.random() * 40 + 10),
                services: Math.floor(Math.random() * 40 + 20),
                tech: Math.floor(Math.random() * 30 + 5),
            },
            literacy: Math.floor(Math.random() * 20 + 70),
            employmentRate: Math.floor(Math.random() * 15 + 70),
            marketCap: Math.floor(Math.random() * 50000 + 5000),
            pe_ratio: Number((Math.random() * 30 + 10).toFixed(2)),
            dividend_yield: Number((Math.random() * 5 + 1).toFixed(2)),
            topIndustries,
        };
    });
};

export function ExploreDistrict() {
    const [districts, setDistricts] = useState<DistrictToken[]>([]);
    const [activePage, setActivePage] = useState<'performance' | 'districts'>('performance');
    const [selectedDistrict, setSelectedDistrict] = useState<DistrictToken | null>(null);
    const [tradeModal, setTradeModal] = useState<{
        open: boolean;
        type: 'buy' | 'sell';
        district: DistrictToken | null
    }>({
        open: false,
        type: 'buy',
        district: null,
    });
    const [quantity, setQuantity] = useState('');
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const navigate = useNavigate();

    function onBack() {
        navigate(-1);
    }

    // Store initial prices for calculating changes
    const initialPricesRef = useRef<Record<string, number>>({});

    // Initialize districts data - sorted alphabetically
    useEffect(() => {
        const data = generateDistrictData();
        const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
        setDistricts(sortedData);

        // Store initial prices
        sortedData.forEach(district => {
            initialPricesRef.current[district.id] = district.price;
        });
    }, []);

    // Live price updates every second with smooth, small changes (1-2 rupees)
    useEffect(() => {
        const priceUpdateInterval = setInterval(() => {
            setDistricts(prevDistricts =>
                prevDistricts.map(district => {
                    const initialPrice = initialPricesRef.current[district.id] || district.price;
                    // Use smooth price updates with 1-2 rupee increments
                    const newPrice = generateSmoothPriceUpdate(district.price, 40, 550);
                    const newChange = calculateChange(initialPrice, newPrice);

                    return {
                        ...district,
                        price: newPrice,
                        change: newChange,
                    };
                })
            );
        }, 1000); // Update every second

        return () => clearInterval(priceUpdateInterval);
    }, []);

    // Scroll detection for header hide/show
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY < 50) {
                setIsHeaderVisible(true);
            } else if (currentScrollY > lastScrollY) {
                // Scrolling down
                setIsHeaderVisible(false);
            } else {
                // Scrolling up
                setIsHeaderVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, {passive: true});
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const marketStats = useMemo(() => {
        const gainers = districts.filter(d => d.change > 0).length;
        const losers = districts.filter(d => d.change < 0).length;
        const totalVolume = districts.reduce((acc, d) => acc + d.volume24h, 0);
        const totalMarketCap = districts.reduce((acc, d) => acc + d.marketCap, 0);

        return {gainers, losers, totalVolume, totalMarketCap};
    }, [districts]);

    const handleTrade = (type: 'buy' | 'sell', district: DistrictToken) => {
        setTradeModal({open: true, type, district});
    };

    const handleConfirmTrade = () => {
        if (tradeModal.district && quantity) {
            const total = parseFloat(quantity) * tradeModal.district.price;
            alert(`${tradeModal.type === 'buy' ? 'Purchase' : 'Sale'} confirmed!\nDistrict: ${tradeModal.district.name}\nQuantity: ${quantity}\nTotal: ₹${total.toFixed(2)}`);
            setTradeModal({open: false, type: 'buy', district: null});
            setQuantity('');
        }
    };

    if (districts.length === 0) {
        return (
            <div
                className="min-h-screen bg-gradient-to-br from-background to-amber-50/20 dark:to-amber-950/10 flex items-center justify-center">
                <div className="text-center">
                    <div
                        className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-xl bg-gradient-to-r from-amber-600 to-yellow-600 dark:from-amber-400 dark:to-yellow-400 bg-clip-text text-transparent">
                        Loading Districts...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-background to-amber-50/20 dark:to-amber-950/10">
            {/* Ambient Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/5 dark:bg-amber-500/3 rounded-full blur-3xl"/>
                <div
                    className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-yellow-500/5 dark:bg-yellow-500/3 rounded-full blur-3xl"/>
            </div>

            {/* Header */}
            <div
                className={`sticky top-0 z-40 backdrop-blur-xl bg-background/90 border-b-2 border-amber-200/50 dark:border-amber-700/30 shadow-lg transition-transform duration-300 ${
                    isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
                }`}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <Button
                                onClick={onBack}
                                variant="outline"
                                size="icon"
                                className="rounded-xl border-2 border-amber-300/50 dark:border-amber-700/50 hover:border-amber-500 hover:bg-amber-500/20 transition-all h-10 w-10"
                            >
                                <X className="w-4 h-4 text-amber-600 dark:text-amber-500"/>
                            </Button>
                            <div>
                                <h1 className="text-3xl sm:text-4xl bg-gradient-to-r from-amber-600 to-yellow-600 dark:from-amber-400 dark:to-yellow-400 bg-clip-text text-transparent">
                                    District Marketplace
                                </h1>
                                <p className="text-sm text-muted-foreground">
                                    <MapPin className="w-3.5 h-3.5 inline mr-1 text-amber-600 dark:text-amber-500"/>
                                    Invest in India's hyper-local growth • {districts.length} districts
                                </p>
                            </div>
                        </div>

                        <Badge
                            className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500/40 text-green-700 dark:text-green-400 px-4 py-2 hidden sm:flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
                            LIVE MARKETS
                        </Badge>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                        <Card
                            className="p-3 bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20">
                            <div className="flex items-center gap-2">
                                <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400"/>
                                <div>
                                    <div
                                        className="text-xl text-green-600 dark:text-green-400">{marketStats.gainers}</div>
                                    <div className="text-xs text-muted-foreground">Gainers</div>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-3 bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/20">
                            <div className="flex items-center gap-2">
                                <TrendingDown className="w-8 h-8 text-red-600 dark:text-red-400"/>
                                <div>
                                    <div className="text-xl text-red-600 dark:text-red-400">{marketStats.losers}</div>
                                    <div className="text-xs text-muted-foreground">Losers</div>
                                </div>
                            </div>
                        </Card>

                        <Card
                            className="p-3 bg-gradient-to-br from-amber-500/10 to-yellow-600/5 border border-amber-500/20">
                            <div className="flex items-center gap-2">
                                <Activity className="w-8 h-8 text-amber-600 dark:text-amber-500"/>
                                <div>
                                    <div
                                        className="text-xl bg-gradient-to-r from-amber-600 to-yellow-600 dark:from-amber-400 dark:to-yellow-400 bg-clip-text text-transparent">
                                        ₹{(marketStats.totalVolume / 10000000).toFixed(1)}Cr
                                    </div>
                                    <div className="text-xs text-muted-foreground">Volume</div>
                                </div>
                            </div>
                        </Card>

                        <Card
                            className="p-3 bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20">
                            <div className="flex items-center gap-2">
                                <PieChart className="w-8 h-8 text-purple-600 dark:text-purple-400"/>
                                <div>
                                    <div className="text-xl text-purple-600 dark:text-purple-400">
                                        ₹{(marketStats.totalMarketCap / 100000).toFixed(1)}L Cr
                                    </div>
                                    <div className="text-xs text-muted-foreground">Market Cap</div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Page Navigation Tabs */}
                    <Tabs value={activePage}
                          onValueChange={(value) => setActivePage(value as 'performance' | 'districts')}
                          className="w-full">
                        <TabsList
                            className="grid w-full max-w-md grid-cols-2 bg-amber-100/50 dark:bg-amber-950/30 h-11">
                            <TabsTrigger
                                value="performance"
                                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-yellow-600 data-[state=active]:text-white"
                            >
                                <Award className="w-4 h-4 mr-2"/>
                                Market Performance
                            </TabsTrigger>
                            <TabsTrigger
                                value="districts"
                                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-yellow-600 data-[state=active]:text-white"
                            >
                                <Target className="w-4 h-4 mr-2"/>
                                All Districts
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {activePage === 'performance' ? (
                    <MarketPerformance districts={districts} onDistrictClick={setSelectedDistrict}/>
                ) : (
                    <DistrictBrowser
                        districts={districts}
                        onDistrictClick={(district) => {
                            // if (onNavigate) {
                            //   onNavigate('district-detail', district);
                            // } else {
                            //   setSelectedDistrict(district);
                            // }
                        }}
                        onTrade={handleTrade}
                    />
                )}
            </div>

            {/* District Detail Dialog */}
            <Dialog open={!!selectedDistrict} onOpenChange={() => setSelectedDistrict(null)}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    {selectedDistrict && (
                        <>
                            <DialogHeader>
                                <DialogTitle
                                    className="text-2xl bg-gradient-to-r from-amber-600 to-yellow-600 dark:from-amber-400 dark:to-yellow-400 bg-clip-text text-transparent">
                                    {selectedDistrict.name}
                                </DialogTitle>
                                <DialogDescription className="flex items-center gap-2 flex-wrap">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-600 dark:text-amber-500"/>
                      {selectedDistrict.state}
                  </span>
                                    <span>•</span>
                                    <Badge
                                        className="bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/40">
                                        {selectedDistrict.stateCode}
                                    </Badge>
                                    <span>•</span>
                                    <span>{selectedDistrict.region}</span>
                                </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-4 mt-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <Card
                                        className="p-4 bg-gradient-to-br from-amber-500/10 to-yellow-500/5 border border-amber-400/30">
                                        <div className="text-sm text-muted-foreground mb-1">Current Price</div>
                                        <div
                                            className="text-3xl bg-gradient-to-r from-amber-600 to-yellow-600 dark:from-amber-400 dark:to-yellow-400 bg-clip-text text-transparent">
                                            ₹{selectedDistrict.price.toFixed(2)}
                                        </div>
                                        <div
                                            className={`text-sm mt-2 ${selectedDistrict.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                            {selectedDistrict.change >= 0 ? '+' : ''}{selectedDistrict.change.toFixed(2)}%
                                            (24h)
                                        </div>
                                    </Card>

                                    <Card className="p-4">
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Market Cap</span>
                                                <span>₹{(selectedDistrict.marketCap / 1000).toFixed(1)}K Cr</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">PE Ratio</span>
                                                <span>{selectedDistrict.pe_ratio}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Dividend</span>
                                                <span>{selectedDistrict.dividend_yield}%</span>
                                            </div>
                                        </div>
                                    </Card>
                                </div>

                                <div className="grid grid-cols-4 gap-3">
                                    <Card className="p-3 text-center">
                                        <BarChart3 className="w-6 h-6 text-purple-600 mx-auto mb-1"/>
                                        <div className="text-lg">₹{(selectedDistrict.gdp / 1000).toFixed(1)}K Cr</div>
                                        <div className="text-xs text-muted-foreground">GDP</div>
                                    </Card>
                                    <Card className="p-3 text-center">
                                        <Users className="w-6 h-6 text-green-600 mx-auto mb-1"/>
                                        <div className="text-lg">{(selectedDistrict.population / 100000).toFixed(1)}L
                                        </div>
                                        <div className="text-xs text-muted-foreground">Population</div>
                                    </Card>
                                    <Card className="p-3 text-center">
                                        <GraduationCap className="w-6 h-6 text-blue-600 mx-auto mb-1"/>
                                        <div className="text-lg">{selectedDistrict.literacy}%</div>
                                        <div className="text-xs text-muted-foreground">Literacy</div>
                                    </Card>
                                    <Card className="p-3 text-center">
                                        <Briefcase className="w-6 h-6 text-amber-600 mx-auto mb-1"/>
                                        <div className="text-lg">{selectedDistrict.employmentRate}%</div>
                                        <div className="text-xs text-muted-foreground">Employment</div>
                                    </Card>
                                </div>

                                <Card className="p-4">
                                    <h4 className="text-sm mb-3 flex items-center gap-2">
                                        <Factory className="w-4 h-4 text-amber-600 dark:text-amber-500"/>
                                        Top Industries
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedDistrict.topIndustries.map((industry, i) => (
                                            <Badge key={i} variant="outline"
                                                   className="border-amber-300/50 dark:border-amber-700/50 bg-amber-100/50 dark:bg-amber-950/30">
                                                {industry}
                                            </Badge>
                                        ))}
                                    </div>
                                </Card>

                                <div className="grid grid-cols-2 gap-3">
                                    <Button
                                        onClick={() => {
                                            setSelectedDistrict(null);
                                            handleTrade('buy', selectedDistrict);
                                        }}
                                        size="lg"
                                        className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white rounded-xl h-12"
                                    >
                                        <Wallet className="w-4 h-4 mr-2"/>
                                        Buy Tokens
                                    </Button>
                                    <Button variant="outline" size="lg"
                                            className="rounded-xl h-12 border-amber-500/50 hover:bg-amber-500/20">
                                        <Share2 className="w-4 h-4 mr-2"/>
                                        Share
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>

            {/* Trade Modal */}
            <Dialog open={tradeModal.open}
                    onOpenChange={() => setTradeModal({open: false, type: 'buy', district: null})}>
                <DialogContent>
                    {tradeModal.district && (
                        <>
                            <DialogHeader>
                                <DialogTitle
                                    className="text-xl bg-gradient-to-r from-amber-600 to-yellow-600 dark:from-amber-400 dark:to-yellow-400 bg-clip-text text-transparent">
                                    {tradeModal.type === 'buy' ? 'Buy' : 'Sell'} {tradeModal.district.name} Tokens
                                </DialogTitle>
                                <DialogDescription>
                                    Current Price: ₹{tradeModal.district.price.toFixed(2)} per token
                                </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-4 mt-4">
                                <div>
                                    <label className="text-sm mb-2 block">Quantity</label>
                                    <Input
                                        type="number"
                                        placeholder="Enter quantity"
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                        className="h-11 rounded-xl border-2 border-amber-200/50 dark:border-amber-700/30 focus:border-amber-500"
                                    />
                                </div>

                                {quantity && (
                                    <Card
                                        className="p-4 bg-gradient-to-br from-amber-500/10 to-yellow-500/5 border border-amber-400/30">
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Quantity</span>
                                                <span>{quantity}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Price per token</span>
                                                <span>₹{tradeModal.district.price.toFixed(2)}</span>
                                            </div>
                                            <div
                                                className="flex justify-between pt-2 border-t border-amber-300/30 dark:border-amber-700/30">
                                                <span>Total</span>
                                                <span
                                                    className="text-xl bg-gradient-to-r from-amber-600 to-yellow-600 dark:from-amber-400 dark:to-yellow-400 bg-clip-text text-transparent">
                          ₹{(parseFloat(quantity) * tradeModal.district.price).toFixed(2)}
                        </span>
                                            </div>
                                        </div>
                                    </Card>
                                )}

                                <Button
                                    onClick={handleConfirmTrade}
                                    disabled={!quantity || parseFloat(quantity) <= 0}
                                    size="lg"
                                    className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white rounded-xl h-12 disabled:opacity-50"
                                >
                                    Confirm {tradeModal.type === 'buy' ? 'Purchase' : 'Sale'}
                                </Button>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
