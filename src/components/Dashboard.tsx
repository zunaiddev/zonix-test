import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Switch } from './ui/switch';
import { GlobalSearch } from './GlobalSearch';
import {
  LayoutDashboard,
  MapPin,
  TrendingUp,
  Sparkles,
  Briefcase,
  Lightbulb,
  Receipt,
  Bell,
  Settings,
  LogOut,
  Search,
  Plus,
  Download,
  Upload,
  CreditCard,
  Layout,
  Moon,
  Sun,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { generateDistrictTokens } from '../utils/mockData';

interface DashboardProps {
  onLogout: () => void;
  onNavigate?: (page: string) => void;
}

export function Dashboard({ onLogout, onNavigate }: DashboardProps) {
  const [isDark, setIsDark] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [aiForecastEnabled, setAiForecastEnabled] = useState(false);
  const [liveTickers, setLiveTickers] = useState(generateDistrictTokens(10));

  // Simulate live ticker updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveTickers(prev => prev.map(ticker => ({
        ...ticker,
        price: ticker.price + (Math.random() - 0.5) * 100,
        change: ticker.change + (Math.random() - 0.5) * 0.5,
      })));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const handleNavigation = (tab: string) => {
    setActiveTab(tab);
    if (onNavigate) {
      if (tab === 'explore') {
        onNavigate('explore-district');
      } else if (tab === 'state-fno') {
        onNavigate('state-fno');
      }
    }
  };

  const chartData = [
    { month: 'Jan', value: 850000, forecast: null },
    { month: 'Feb', value: 920000, forecast: null },
    { month: 'Mar', value: 980000, forecast: null },
    { month: 'Apr', value: 1050000, forecast: null },
    { month: 'May', value: 1120000, forecast: null },
    { month: 'Jun', value: 1245000, forecast: 1245000 },
    { month: 'Jul', value: null, forecast: 1320000 },
    { month: 'Aug', value: null, forecast: 1390000 },
  ];

  const watchlist = [
    { name: 'Mumbai', state: 'Maharashtra', value: '₹42,150', change: '+12.3%', up: true },
    { name: 'Bangalore', state: 'Karnataka', value: '₹38,920', change: '+18.7%', up: true },
    { name: 'Delhi', state: 'Delhi NCR', value: '₹45,670', change: '+8.4%', up: true },
    { name: 'Pune', state: 'Maharashtra', value: '₹31,200', change: '-2.1%', up: false },
    { name: 'Hyderabad', state: 'Telangana', value: '₹36,540', change: '+15.2%', up: true },
  ];

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
    { icon: MapPin, label: 'Explore District', id: 'explore' },
    { icon: TrendingUp, label: 'State FNO', id: 'state-fno' },
    { icon: Sparkles, label: 'Mutual Funds 2.0', id: 'mutual-funds' },
    { icon: Briefcase, label: 'Portfolio', id: 'portfolio' },
    { icon: Lightbulb, label: 'Insights', id: 'insights' },
    { icon: Receipt, label: 'Smart Receipt', id: 'receipts' },
    { icon: Bell, label: 'Notifications', id: 'notifications' },
    { icon: Settings, label: 'Settings', id: 'settings' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-yellow-50/30 to-gray-50 dark:from-black dark:via-yellow-950/10 dark:to-black">
      {/* Live Ticker Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black text-white border-b border-yellow-400/30 overflow-hidden">
        <div className="flex items-center h-10">
          <div className="px-4 bg-yellow-400 text-black flex items-center gap-2 h-full">
            <Zap className="w-4 h-4" />
            <span className="text-sm">LIVE</span>
          </div>
          <motion.div
            className="flex items-center gap-8 px-4"
            animate={{ x: [0, -1000] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {[...liveTickers, ...liveTickers].map((ticker, index) => (
              <div key={`${ticker.id}-${index}`} className="flex items-center gap-3 whitespace-nowrap">
                <span className="text-sm">{ticker.name}</span>
                <span className="text-yellow-400">₹{ticker.price.toFixed(0)}</span>
                <span className={ticker.change >= 0 ? 'text-green-400 text-sm' : 'text-red-400 text-sm'}>
                  {ticker.change >= 0 ? '+' : ''}{ticker.change.toFixed(2)}%
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Sidebar */}
      <aside className="fixed left-0 top-10 h-[calc(100vh-2.5rem)] w-64 backdrop-blur-2xl bg-white/90 dark:bg-black/90 border-r border-yellow-400/20 p-6 z-40">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center shadow-lg shadow-yellow-400/50">
            <span className="text-black">⚡</span>
          </div>
          <span className="text-xl text-black dark:text-white">ZONIX</span>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black shadow-lg shadow-yellow-400/50'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-yellow-400/10'
              }`}
            >
              {activeTab === item.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <item.icon className="w-5 h-5 relative z-10" />
              <span className="text-sm relative z-10">{item.label}</span>
            </motion.button>
          ))}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="ml-64 pt-10">
        {/* Top Bar */}
        <header className="sticky top-10 z-30 backdrop-blur-2xl bg-white/90 dark:bg-black/90 border-b border-yellow-400/20 px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-xl">
              <GlobalSearch onNavigate={onNavigate} placeholder="Search districts, states, funds..." />
            </div>

            <div className="flex items-center gap-3">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-xl border-yellow-400/30 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-400/10"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Withdraw
                </Button>
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, delay: 0.5 }}
              >
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 rounded-xl shadow-lg shadow-yellow-400/30"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Deposit
                </Button>
              </motion.div>
              <Button
                size="sm"
                className="bg-yellow-500 text-black hover:bg-yellow-600 rounded-xl shadow-lg shadow-yellow-500/30"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Trade
              </Button>
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, delay: 1 }}
              >
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-xl border-yellow-400/30 hover:bg-yellow-400/10"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Fund
                </Button>
              </motion.div>
              <Button
                size="sm"
                variant="ghost"
                className="rounded-xl hover:bg-yellow-400/10"
              >
                <Layout className="w-4 h-4 mr-2" />
                Customize
              </Button>

              <div className="h-8 w-px bg-yellow-400/20"></div>

              <button className="relative p-2 rounded-full hover:bg-yellow-400/20 transition-colors">
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-yellow-400/20 transition-colors">
                {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
              </button>

              <Avatar className="cursor-pointer border-2 border-yellow-400/30">
                <AvatarFallback className="bg-gradient-to-br from-yellow-400 to-yellow-500 text-black">JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl mb-2">Welcome back, John! 👋</h1>
            <p className="text-gray-600 dark:text-gray-400">Here's what's happening with your investments today.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              whileHover={{ y: -4, boxShadow: "0 20px 25px -5px rgba(251, 191, 36, 0.3)" }}
            >
              <Card className="backdrop-blur-xl bg-white/90 dark:bg-black/90 border-yellow-400/30 rounded-2xl p-6 shadow-2xl hover:shadow-yellow-400/40 transition-all border-2">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center shadow-lg shadow-yellow-400/50">
                    <Briefcase className="w-6 h-6 text-black" />
                  </div>
                  <Badge className="bg-green-500/20 text-green-600 dark:text-green-400 hover:bg-green-500/30">
                    +24.5%
                  </Badge>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Net Worth</div>
                <div className="text-3xl text-yellow-500 mb-1">₹12.45L</div>
                <div className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" />
                  <span>+₹2.45L this month</span>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              whileHover={{ y: -4, boxShadow: "0 20px 25px -5px rgba(251, 191, 36, 0.3)" }}
            >
              <Card className="backdrop-blur-xl bg-white/90 dark:bg-black/90 border-yellow-400/30 rounded-2xl p-6 shadow-2xl hover:shadow-yellow-400/40 transition-all border-2">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center shadow-lg shadow-blue-400/50">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-500/30">
                    15 Tokens
                  </Badge>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">District Holdings</div>
                <div className="text-3xl mb-1">₹4.2L</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Across 8 districts</div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              whileHover={{ y: -4, boxShadow: "0 20px 25px -5px rgba(251, 191, 36, 0.3)" }}
            >
              <Card className="backdrop-blur-xl bg-white/90 dark:bg-black/90 border-yellow-400/30 rounded-2xl p-6 shadow-2xl hover:shadow-yellow-400/40 transition-all border-2">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-purple-500 flex items-center justify-center shadow-lg shadow-purple-400/50">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-green-500/20 text-green-600 dark:text-green-400 hover:bg-green-500/30">
                    +18.7%
                  </Badge>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">State ETFs Value</div>
                <div className="text-3xl mb-1">₹5.6L</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">5 state indices</div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              whileHover={{ y: -4, boxShadow: "0 20px 25px -5px rgba(251, 191, 36, 0.3)" }}
            >
              <Card className="backdrop-blur-xl bg-white/90 dark:bg-black/90 border-yellow-400/30 rounded-2xl p-6 shadow-2xl hover:shadow-yellow-400/40 transition-all border-2">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center shadow-lg shadow-green-400/50">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-green-500/20 text-green-600 dark:text-green-400 hover:bg-green-500/30">
                    +14.2%
                  </Badge>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Mutual Funds 2.0</div>
                <div className="text-3xl mb-1">₹3.8L</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">3 AI-curated funds</div>
              </Card>
            </motion.div>
          </div>

          {/* Charts and Watchlist */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <Card className="lg:col-span-2 backdrop-blur-xl bg-white/90 dark:bg-black/90 border-yellow-400/30 rounded-2xl p-6 shadow-2xl border-2">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl mb-1">Portfolio Growth</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Last 6 months performance</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="rounded-lg border-yellow-400/30 text-xs">
                    1M
                  </Button>
                  <Button size="sm" variant="outline" className="rounded-lg border-yellow-400/30 text-xs">
                    3M
                  </Button>
                  <Button size="sm" className="bg-yellow-400 text-black hover:bg-yellow-500 rounded-lg text-xs">
                    6M
                  </Button>
                  <Button size="sm" variant="outline" className="rounded-lg border-yellow-400/30 text-xs">
                    1Y
                  </Button>
                  <div className="flex items-center gap-2 ml-2 px-3 py-2 rounded-lg bg-yellow-400/10 border border-yellow-400/30">
                    <Switch checked={aiForecastEnabled} onCheckedChange={setAiForecastEnabled} />
                    <span className="text-xs text-yellow-600 dark:text-yellow-400">AI Forecast</span>
                  </div>
                </div>
              </div>

              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FBBF24" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#FBBF24" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#FBBF24" opacity={0.1} />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      border: '1px solid rgba(251, 191, 36, 0.3)',
                      borderRadius: '12px',
                    }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#FBBF24" strokeWidth={3} fill="url(#colorValue)" />
                  {aiForecastEnabled && (
                    <Area 
                      type="monotone" 
                      dataKey="forecast" 
                      stroke="#3B82F6" 
                      strokeWidth={3} 
                      strokeDasharray="5 5"
                      fill="url(#colorForecast)" 
                    />
                  )}
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            <Card className="backdrop-blur-xl bg-white/90 dark:bg-black/90 border-yellow-400/30 rounded-2xl p-6 shadow-2xl border-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl">Watchlist</h2>
                <Button size="sm" variant="ghost" className="rounded-lg hover:bg-yellow-400/10">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-3">
                {watchlist.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-yellow-400/10 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center text-xs text-black shadow-lg shadow-yellow-400/30">
                        {item.name.substring(0, 2)}
                      </div>
                      <div>
                        <div className="text-sm">{item.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{item.state}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm">{item.value}</div>
                      <div className={`text-xs flex items-center gap-1 ${item.up ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {item.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {item.change}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Recent Transactions */}
          <Card className="backdrop-blur-xl bg-white/90 dark:bg-black/90 border-yellow-400/30 rounded-2xl p-6 shadow-2xl border-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl">Recent Activity</h2>
              <Button size="sm" variant="ghost" className="rounded-lg text-yellow-600 dark:text-yellow-400 hover:bg-yellow-400/10">
                View All
              </Button>
            </div>

            <div className="space-y-4">
              {[
                { action: 'Bought', item: 'Mumbai District Token', amount: '+15 tokens', value: '₹63,225', time: '2 hours ago', type: 'buy' },
                { action: 'Sold', item: 'Gujarat State Index', amount: '-5 units', value: '₹42,500', time: '5 hours ago', type: 'sell' },
                { action: 'Deposited', item: 'Mutual Fund 2.0 - Tech', amount: '+₹50,000', value: '', time: '1 day ago', type: 'deposit' },
                { action: 'Withdrew', item: 'To Bank Account', amount: '-₹25,000', value: '', time: '2 days ago', type: 'withdraw' },
              ].map((transaction, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-xl hover:bg-yellow-400/5 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      transaction.type === 'buy' ? 'bg-green-500/20' :
                      transaction.type === 'sell' ? 'bg-red-500/20' :
                      transaction.type === 'deposit' ? 'bg-blue-500/20' : 'bg-yellow-500/20'
                    }`}>
                      {transaction.type === 'buy' ? <ArrowUpRight className="w-6 h-6 text-green-600 dark:text-green-400" /> :
                       transaction.type === 'sell' ? <ArrowDownRight className="w-6 h-6 text-red-600 dark:text-red-400" /> :
                       transaction.type === 'deposit' ? <Upload className="w-6 h-6 text-blue-600 dark:text-blue-400" /> :
                       <Download className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />}
                    </div>
                    <div>
                      <div className="text-sm mb-1">
                        <span className="text-gray-600 dark:text-gray-400">{transaction.action}</span> {transaction.item}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{transaction.time}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm mb-1">{transaction.amount}</div>
                    {transaction.value && <div className="text-xs text-gray-500 dark:text-gray-400">{transaction.value}</div>}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}
