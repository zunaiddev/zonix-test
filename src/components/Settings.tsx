import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { Slider } from './ui/slider';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import {
  User,
  Shield,
  CreditCard,
  Bell,
  Brain,
  Palette,
  Globe,
  Zap,
  Database,
  Receipt,
  Trash2,
  Check,
  Eye,
  EyeOff,
  Upload,
  Download,
  Smartphone,
  Mail,
  Key,
  Lock,
  Wallet,
  Calendar,
  Sparkles,
  TrendingUp,
  Moon,
  Sun,
  MonitorSmartphone,
  AlertTriangle,
  Settings as SettingsIcon,
  BarChart3,
  Volume2,
  Clock,
  MapPin,
  Link2,
  RefreshCw,
  Activity,
  Shield as ShieldCheck,
  ArrowUpRight,
  ArrowDownRight,
  ArrowLeftRight,
  Plus,
  QrCode,
  FileText,
  TrendingDown,
  Filter,
  IndianRupee,
} from 'lucide-react';

interface SettingsProps {
  currentThemeMode?: string;
  currentThemeColor?: string;
  onThemeChange?: (mode: 'light' | 'dark' | 'system', color: 'yellow' | 'green' | 'purple' | 'navy') => void;
  initialCategory?: string;
}

const categories = [
  { id: 'profile', label: 'Profile & Identity', icon: User },
  { id: 'security', label: 'Security & Privacy', icon: Shield },
  { id: 'payments', label: 'Payments & Wallets', icon: Wallet },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'ai', label: 'AI Personalization', icon: Brain },
  { id: 'display', label: 'Display & Themes', icon: Palette },
  { id: 'language', label: 'Language & Region', icon: Globe },
  { id: 'integrations', label: 'Integrations', icon: Zap },
  { id: 'data', label: 'Data & Backups', icon: Database },
  { id: 'billing', label: 'Billing', icon: Receipt },
  { id: 'account', label: 'Account', icon: Trash2 },
];

export function Settings({ currentThemeMode = 'system', currentThemeColor = 'yellow', onThemeChange, initialCategory = 'profile' }: SettingsProps) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [showPassword, setShowPassword] = useState(false);
  const [securityScore, setSecurityScore] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  
  // Settings state
  const [settings, setSettings] = useState({
    // Profile
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@example.com',
    phone: '+91 98765 43210',
    zonixId: 'ZNX-8F7A-9C2D-1B4E',
    kycVerified: true,
    
    // Security
    twoFactor: true,
    biometric: true,
    encryptionLevel: 'quantum',
    hidePortfolio: false,
    restrictAiData: false,
    encryptedBackups: true,
    
    // Payments
    upiEnabled: true,
    autoPay: false,
    biometricApproval: true,
    
    // Notifications
    marketUpdates: true,
    sipReminders: true,
    aiSuggestions: true,
    priceChanges: true,
    securityWarnings: true,
    newsBroadcasts: true,
    soundEnabled: true,
    soundType: 'pulse',
    quietHoursEnabled: false,
    aiPriorityFiltering: true,
    
    // AI
    riskAppetite: 'moderate',
    behaviorMode: 'balanced',
    sentimentPreference: 'neutral',
    autoOptimization: true,
    predictiveInsights: true,
    aiPersonality: 'professional',
    
    // Display
    themeMode: currentThemeMode,
    themeColor: currentThemeColor,
    fontSize: 16,
    uiDensity: 50,
    backgroundAnimations: true,
    glassmorphismIntensity: 70,
    
    // Language & Region
    language: 'en',
    currency: 'INR',
    dateFormat: 'DD-MM-YYYY',
    timeZone: 'Asia/Kolkata',
    voiceLanguage: 'en-IN',
    
    // Data
    autoBackup: true,
    backupFrequency: 'daily',
    
    // Billing
    autoRenew: true,
    plan: 'premium',
  });

  const handleThemeChange = (mode: string, color: string) => {
    setSettings({ ...settings, themeMode: mode, themeColor: color });
    if (onThemeChange) {
      onThemeChange(mode as any, color as any);
    }
  };

  const runSecurityCheck = () => {
    setIsScanning(true);
    setSecurityScore(0);
    
    let score = 0;
    const interval = setInterval(() => {
      score += Math.random() * 15;
      if (score >= 92) {
        score = 92;
        clearInterval(interval);
        setIsScanning(false);
      }
      setSecurityScore(Math.round(score));
    }, 100);
  };

  const renderContent = () => {
    switch (selectedCategory) {
      case 'profile':
        return <ProfileSection settings={settings} setSettings={setSettings} />;
      case 'security':
        return <SecuritySection settings={settings} setSettings={setSettings} securityScore={securityScore} isScanning={isScanning} runSecurityCheck={runSecurityCheck} showPassword={showPassword} setShowPassword={setShowPassword} />;
      case 'payments':
        return <PaymentsSection settings={settings} setSettings={setSettings} />;
      case 'notifications':
        return <NotificationsSection settings={settings} setSettings={setSettings} />;
      case 'ai':
        return <AISection settings={settings} setSettings={setSettings} />;
      case 'display':
        return <DisplaySection settings={settings} setSettings={setSettings} handleThemeChange={handleThemeChange} />;
      case 'language':
        return <LanguageSection settings={settings} setSettings={setSettings} />;
      case 'integrations':
        return <IntegrationsSection />;
      case 'data':
        return <DataSection settings={settings} setSettings={setSettings} />;
      case 'billing':
        return <BillingSection settings={settings} setSettings={setSettings} />;
      case 'account':
        return <AccountSection />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-theme-primary to-theme-primary-dark flex items-center justify-center shadow-lg">
              <SettingsIcon className="w-6 h-6 text-black dark:text-gray-900" />
            </div>
            <div>
              <h1 className="text-3xl text-foreground">Zonix Settings Center</h1>
              <p className="text-sm text-muted-foreground">Control your identity, security, and AI preferences</p>
            </div>
          </motion.div>

          {/* Top Navigation Tabs */}
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-2 min-w-max pb-2">
              {categories.map((category) => {
                const Icon = category.icon;
                const isActive = selectedCategory === category.id;
                
                return (
                  <motion.button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
                      isActive
                        ? 'bg-gradient-to-r from-theme-primary to-theme-primary-dark text-black dark:text-gray-900 shadow-md'
                        : 'bg-card text-muted-foreground hover:bg-accent hover:text-foreground border border-border'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{category.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// Section Components
function ProfileSection({ settings, setSettings }: any) {
  return (
    <div className="space-y-4">
      <Card className="p-6 bg-card border-border rounded-2xl">
        <h2 className="text-xl text-foreground mb-6 flex items-center gap-2">
          <User className="w-5 h-5 text-theme-primary" />
          Profile & Identity
        </h2>

        {/* Avatar Section */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-theme-primary to-theme-primary-dark flex items-center justify-center text-2xl shadow-lg border-2 border-theme-primary/30">
              <span className="text-black dark:text-gray-900">RK</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-lg bg-green-500 flex items-center justify-center border-2 border-background">
              <Check className="w-3 h-3 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <Button size="sm" className="bg-theme-primary hover:bg-theme-primary-dark text-black dark:text-gray-900 mb-2">
              <Upload className="w-4 h-4 mr-2" />
              Upload Photo
            </Button>
            <p className="text-xs text-muted-foreground">JPG, PNG. Max 5MB</p>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Personal Info */}
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input
                value={settings.name}
                onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="rounded-xl"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label>Zonix ID</Label>
              <div className="relative">
                <Input
                  value={settings.zonixId}
                  readOnly
                  className="rounded-xl bg-muted"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Lock className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-500">KYC Verification Status</span>
            </div>
            <p className="text-xs text-muted-foreground">Your account is fully verified on ZonixChain</p>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Social Connections */}
        <div>
          <h3 className="text-sm text-foreground mb-3">Connected Accounts</h3>
          <div className="space-y-2">
            {[
              { platform: 'Wallet Address', value: '0x742d...9f2a', connected: true },
              { platform: 'Telegram', value: '@rajesh_kumar', connected: true },
              { platform: 'Google', value: 'Not Connected', connected: false },
            ].map((account, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-muted rounded-xl">
                <div>
                  <p className="text-sm text-foreground">{account.platform}</p>
                  <p className="text-xs text-muted-foreground">{account.value}</p>
                </div>
                {account.connected ? (
                  <Badge className="bg-green-500/20 text-green-500 border-green-500/30">
                    Connected
                  </Badge>
                ) : (
                  <Button size="sm" variant="outline" className="h-7">
                    Connect
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <Button className="w-full bg-theme-primary hover:bg-theme-primary-dark text-black dark:text-gray-900">
            <Download className="w-4 h-4 mr-2" />
            Download Digital ID (ZonixChain Verified)
          </Button>
        </div>
      </Card>
    </div>
  );
}

function SecuritySection({ settings, setSettings, securityScore, isScanning, runSecurityCheck, showPassword, setShowPassword }: any) {
  return (
    <div className="space-y-4">
      {/* Security Score */}
      <Card className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg text-foreground mb-1">Security Score</h3>
            <p className="text-xs text-muted-foreground">AI-powered vulnerability scan</p>
          </div>
          <div className="text-right">
            <div className="text-3xl text-green-500">{securityScore}/100</div>
            <p className="text-xs text-muted-foreground">Excellent</p>
          </div>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${securityScore}%` }}
            className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
          />
        </div>
        <Button
          onClick={runSecurityCheck}
          disabled={isScanning}
          className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white"
        >
          {isScanning ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Scanning...
            </>
          ) : (
            <>
              <ShieldCheck className="w-4 h-4 mr-2" />
              Run Security Check
            </>
          )}
        </Button>
      </Card>

      {/* Login & Password */}
      <Card className="p-6 bg-card border-border rounded-2xl">
        <h3 className="text-lg text-foreground mb-4 flex items-center gap-2">
          <Lock className="w-5 h-5 text-theme-primary" />
          Login & Password
        </h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Current Password</Label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                className="rounded-xl pr-10"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>New Password</Label>
              <Input
                type="password"
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label>Confirm Password</Label>
              <Input
                type="password"
                className="rounded-xl"
              />
            </div>
          </div>
          <Button className="bg-theme-primary hover:bg-theme-primary-dark text-black dark:text-gray-900">
            Update Password
          </Button>
        </div>
      </Card>

      {/* Biometric & 2FA */}
      <Card className="p-6 bg-card border-border rounded-2xl">
        <h3 className="text-lg text-foreground mb-4">Authentication Methods</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-foreground">Two-Factor Authentication</p>
                <p className="text-xs text-muted-foreground">Extra security layer</p>
              </div>
            </div>
            <Switch
              checked={settings.twoFactor}
              onCheckedChange={(checked) => setSettings({ ...settings, twoFactor: checked })}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Key className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-foreground">Biometric Login</p>
                <p className="text-xs text-muted-foreground">Face ID or Fingerprint</p>
              </div>
            </div>
            <Switch
              checked={settings.biometric}
              onCheckedChange={(checked) => setSettings({ ...settings, biometric: checked })}
            />
          </div>

          <div className="p-4 bg-muted rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <Label>Encryption Level</Label>
              <Badge className="bg-purple-500/20 text-purple-500 border-purple-500/30">
                Quantum Secure
              </Badge>
            </div>
            <Select value={settings.encryptionLevel} onValueChange={(value) => setSettings({ ...settings, encryptionLevel: value })}>
              <SelectTrigger className="rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">AES-256 Standard</SelectItem>
                <SelectItem value="quantum">AI Quantum Secure</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Privacy Options */}
      <Card className="p-6 bg-card border-border rounded-2xl">
        <h3 className="text-lg text-foreground mb-4">Privacy Options</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground">Hide Portfolio from Public Leaderboard</p>
              <p className="text-xs text-muted-foreground">Keep your holdings private</p>
            </div>
            <Switch
              checked={settings.hidePortfolio}
              onCheckedChange={(checked) => setSettings({ ...settings, hidePortfolio: checked })}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground">Restrict Data for AI Learning</p>
              <p className="text-xs text-muted-foreground">Limit AI data collection</p>
            </div>
            <Switch
              checked={settings.restrictAiData}
              onCheckedChange={(checked) => setSettings({ ...settings, restrictAiData: checked })}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground">Enable Encrypted Backups</p>
              <p className="text-xs text-muted-foreground">Secure cloud storage</p>
            </div>
            <Switch
              checked={settings.encryptedBackups}
              onCheckedChange={(checked) => setSettings({ ...settings, encryptedBackups: checked })}
            />
          </div>
        </div>
      </Card>

      {/* Device Management */}
      <Card className="p-6 bg-card border-border rounded-2xl">
        <h3 className="text-lg text-foreground mb-4">Active Devices</h3>
        <div className="space-y-3">
          {[
            { device: 'Chrome on Windows', location: 'Mumbai, India', ip: '103.x.x.x', time: 'Active now', current: true },
            { device: 'Safari on iPhone 14', location: 'Delhi, India', ip: '157.x.x.x', time: '2 hours ago', current: false },
            { device: 'Firefox on MacOS', location: 'Bangalore, India', ip: '49.x.x.x', time: '1 day ago', current: false },
          ].map((session, idx) => (
            <div key={idx} className="flex items-start justify-between p-4 bg-muted rounded-xl">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <MonitorSmartphone className="w-4 h-4 text-theme-primary" />
                  <p className="text-sm text-foreground">{session.device}</p>
                  {session.current && (
                    <Badge className="bg-green-500/20 text-green-500 border-green-500/30 text-xs">
                      Current
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{session.location} • IP: {session.ip}</p>
                <p className="text-xs text-muted-foreground">{session.time}</p>
              </div>
              {!session.current && (
                <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-400 hover:bg-red-500/10">
                  Revoke
                </Button>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function PaymentsSection({ settings, setSettings }: any) {
  const [activeWalletTab, setActiveWalletTab] = useState('overview');
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [autoSettlementEnabled, setAutoSettlementEnabled] = useState(false);
  const [autoThreshold, setAutoThreshold] = useState('10000');
  
  // Mock data for banks
  const linkedBanks = [
    { id: 'sbi', name: 'State Bank of India', logo: '🏦', accountNo: 'XXXX1234', ifsc: 'SBIN0001234', status: 'verified', holder: 'Rajesh Kumar' },
    { id: 'hdfc', name: 'HDFC Bank', logo: '🏦', accountNo: 'XXXX5678', ifsc: 'HDFC0001234', status: 'verified', holder: 'Rajesh Kumar' },
    { id: 'icici', name: 'ICICI Bank', logo: '🏦', accountNo: 'XXXX9012', ifsc: 'ICIC0001234', status: 'pending', holder: 'Rajesh Kumar' },
  ];

  // Mock transactions
  const transactions = [
    { id: 'TXN001', date: '2025-10-27', desc: 'Deposit via HDFC UPI', amount: 10000, type: 'deposit', status: 'completed', mode: 'UPI' },
    { id: 'TXN002', date: '2025-10-26', desc: 'Withdrawal to SBI', amount: -5000, type: 'withdraw', status: 'completed', mode: 'IMPS' },
    { id: 'TXN003', date: '2025-10-25', desc: 'District Token Purchase', amount: -2500, type: 'fee', status: 'completed', mode: 'Wallet' },
    { id: 'TXN004', date: '2025-10-24', desc: 'Trading Reward', amount: 430, type: 'reward', status: 'completed', mode: 'System' },
    { id: 'TXN005', date: '2025-10-23', desc: 'Deposit via Card', amount: 15000, type: 'deposit', status: 'completed', mode: 'Card' },
  ];

  const walletTabs = [
    { id: 'overview', label: 'Wallet Overview', icon: Wallet },
    { id: 'banks', label: 'Linked Banks', icon: BarChart3 },
    { id: 'deposit', label: 'Deposit', icon: ArrowDownRight },
    { id: 'withdraw', label: 'Withdraw', icon: ArrowUpRight },
    { id: 'transactions', label: 'Transactions', icon: FileText },
    { id: 'upi', label: 'UPI & Cards', icon: CreditCard },
    { id: 'settlement', label: 'Auto-Settlement', icon: RefreshCw },
    { id: 'kyc', label: 'Security & KYC', icon: ShieldCheck },
  ];

  return (
    <div className="space-y-4">
      {/* Top Navigation Bar */}
      <Card className="p-4 bg-gradient-to-br from-theme-primary/10 to-theme-primary-dark/10 border border-theme-primary/30 rounded-2xl">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-theme-primary to-theme-primary-dark flex items-center justify-center">
              <Wallet className="w-6 h-6 text-black dark:text-gray-900" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Balance</p>
              <p className="text-xl text-foreground">₹47,890</p>
            </div>
          </div>
          <Button className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white">
            <ArrowDownRight className="w-4 h-4" />
            Deposit
          </Button>
          <Button className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white">
            <ArrowUpRight className="w-4 h-4" />
            Withdraw
          </Button>
          <Button className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white">
            <ArrowLeftRight className="w-4 h-4" />
            Transfer
          </Button>
        </div>
        
        <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-2">
          <Check className="w-4 h-4 text-green-500" />
          <p className="text-sm text-foreground">3 Banks Linked • KYC Verified • Ready to Trade</p>
        </div>
      </Card>

      {/* Wallet Tabs */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 min-w-max pb-2">
          {walletTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeWalletTab === tab.id;
            
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveWalletTab(tab.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-theme-primary to-theme-primary-dark text-black dark:text-gray-900 shadow-md'
                    : 'bg-card text-muted-foreground hover:bg-accent hover:text-foreground border border-border'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{tab.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeWalletTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          {/* 1. Wallet Overview */}
          {activeWalletTab === 'overview' && (
            <div className="space-y-4">
              <Card className="p-6 bg-card border-border rounded-2xl">
                <h3 className="text-lg text-foreground mb-4 flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-theme-primary" />
                  Financial Overview
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl">
                    <p className="text-sm text-muted-foreground mb-1">Available Balance</p>
                    <p className="text-2xl text-green-500">₹45,390</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl">
                    <p className="text-sm text-muted-foreground mb-1">Locked Balance</p>
                    <p className="text-2xl text-orange-500">₹2,500</p>
                  </div>
                </div>

                {/* Chart Placeholder */}
                <div className="h-48 bg-muted rounded-xl flex items-center justify-center mb-4">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 text-theme-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">7 Days Inflow/Outflow Chart</p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-3 gap-3">
                  <Button onClick={() => setActiveWalletTab('deposit')} className="bg-theme-primary hover:bg-theme-primary-dark text-black dark:text-gray-900">
                    <ArrowDownRight className="w-4 h-4 mr-2" />
                    Deposit Now
                  </Button>
                  <Button onClick={() => setActiveWalletTab('withdraw')} variant="outline">
                    <ArrowUpRight className="w-4 h-4 mr-2" />
                    Withdraw
                  </Button>
                  <Button onClick={() => setActiveWalletTab('banks')} variant="outline">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Transfer
                  </Button>
                </div>

                {/* AI Summary */}
                <div className="mt-6 p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl">
                  <div className="flex items-start gap-3">
                    <Brain className="w-5 h-5 text-purple-500 mt-0.5" />
                    <div>
                      <p className="text-sm text-foreground mb-1">Smart AI Summary</p>
                      <p className="text-xs text-muted-foreground">
                        This week you deposited ₹25,000 and withdrew ₹5,000. Your trading profit was ₹4,300 (+5.8%). 
                        Recommended: Consider auto-settlement for better liquidity management.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Badges */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge className="bg-green-500/20 text-green-500 border-green-500/30">
                    <Check className="w-3 h-3 mr-1" />
                    Verified User
                  </Badge>
                  <Badge className="bg-theme-primary/20 text-theme-primary border-theme-primary/30">
                    Linked to SBI / HDFC
                  </Badge>
                  <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/30">
                    KYC Complete
                  </Badge>
                </div>
              </Card>
            </div>
          )}

          {/* 2. Linked Banks */}
          {activeWalletTab === 'banks' && (
            <div className="space-y-4">
              <Card className="p-6 bg-card border-border rounded-2xl">
                <h3 className="text-lg text-foreground mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-theme-primary" />
                  Linked Bank Accounts
                </h3>
                
                <div className="space-y-3 mb-4">
                  {linkedBanks.map((bank) => (
                    <div key={bank.id} className="p-4 bg-muted rounded-xl">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-theme-primary to-theme-primary-dark flex items-center justify-center text-2xl">
                            {bank.logo}
                          </div>
                          <div>
                            <p className="text-sm text-foreground">{bank.name}</p>
                            <p className="text-xs text-muted-foreground">{bank.holder}</p>
                          </div>
                        </div>
                        {bank.status === 'verified' ? (
                          <Badge className="bg-green-500/20 text-green-500 border-green-500/30">
                            <Check className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        ) : (
                          <Badge className="bg-orange-500/20 text-orange-500 border-orange-500/30">
                            <Clock className="w-3 h-3 mr-1" />
                            Pending
                          </Badge>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <p className="text-muted-foreground mb-1">Account No</p>
                          <p className="text-foreground font-mono">{bank.accountNo}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-1">IFSC Code</p>
                          <p className="text-foreground font-mono">{bank.ifsc}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline" className="flex-1">
                          <RefreshCw className="w-3 h-3 mr-1" />
                          Re-verify
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-500 hover:text-red-400 hover:bg-red-500/10">
                          <Trash2 className="w-3 h-3 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <Button className="w-full bg-theme-primary hover:bg-theme-primary-dark text-black dark:text-gray-900">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Bank Account
                </Button>

                <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                  <div className="flex items-start gap-2">
                    <Shield className="w-4 h-4 text-blue-500 mt-0.5" />
                    <p className="text-xs text-muted-foreground">
                      OTP verification required for adding/removing accounts. Only Indian banks allowed.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* 3. Deposit */}
          {activeWalletTab === 'deposit' && (
            <div className="space-y-4">
              <Card className="p-6 bg-card border-border rounded-2xl">
                <h3 className="text-lg text-foreground mb-4 flex items-center gap-2">
                  <ArrowDownRight className="w-5 h-5 text-green-500" />
                  Deposit Funds
                </h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Amount</Label>
                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        type="number"
                        placeholder="Enter amount"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                        className="pl-10 rounded-xl text-lg"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Choose Method</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { name: 'UPI', icon: Smartphone, color: 'from-purple-500 to-pink-500' },
                        { name: 'Bank Transfer', icon: BarChart3, color: 'from-blue-500 to-cyan-500' },
                        { name: 'Debit/Credit Card', icon: CreditCard, color: 'from-orange-500 to-red-500' },
                        { name: 'Net Banking', icon: Globe, color: 'from-green-500 to-emerald-500' },
                      ].map((method) => {
                        const Icon = method.icon;
                        return (
                          <button
                            key={method.name}
                            className={`p-4 rounded-xl border-2 border-border hover:border-theme-primary transition-all bg-gradient-to-br ${method.color} bg-opacity-10`}
                          >
                            <Icon className="w-6 h-6 text-foreground mx-auto mb-2" />
                            <p className="text-sm text-foreground text-center">{method.name}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Select Bank Account</Label>
                    <Select value={selectedBank} onValueChange={setSelectedBank}>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Choose bank account" />
                      </SelectTrigger>
                      <SelectContent>
                        {linkedBanks.filter(b => b.status === 'verified').map(bank => (
                          <SelectItem key={bank.id} value={bank.id}>
                            {bank.logo} {bank.name} - {bank.accountNo}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:opacity-90 text-white text-lg py-6">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Confirm Deposit
                  </Button>

                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                    <p className="text-xs text-muted-foreground text-center">
                      Funds will reflect instantly. Ref ID will be generated. Receipt auto-saved in Smart Receipts.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* 4. Withdraw */}
          {activeWalletTab === 'withdraw' && (
            <div className="space-y-4">
              <Card className="p-6 bg-card border-border rounded-2xl">
                <h3 className="text-lg text-foreground mb-4 flex items-center gap-2">
                  <ArrowUpRight className="w-5 h-5 text-orange-500" />
                  Withdraw Funds
                </h3>

                <div className="p-4 bg-gradient-to-br from-theme-primary/10 to-theme-primary-dark/10 border border-theme-primary/30 rounded-xl mb-4">
                  <p className="text-sm text-muted-foreground mb-1">Available Balance</p>
                  <p className="text-2xl text-foreground">₹45,390</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Withdraw Amount</Label>
                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        type="number"
                        placeholder="Enter amount"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        className="pl-10 rounded-xl text-lg"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Select Bank Account</Label>
                    <Select value={selectedBank} onValueChange={setSelectedBank}>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Choose bank account" />
                      </SelectTrigger>
                      <SelectContent>
                        {linkedBanks.filter(b => b.status === 'verified').map(bank => (
                          <SelectItem key={bank.id} value={bank.id}>
                            {bank.logo} {bank.name} - {bank.accountNo}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Transfer Method</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="p-4 rounded-xl border-2 border-theme-primary bg-theme-primary/10">
                        <Zap className="w-6 h-6 text-theme-primary mx-auto mb-1" />
                        <p className="text-sm text-foreground text-center">Instant (IMPS)</p>
                        <p className="text-xs text-muted-foreground text-center">2-5 minutes</p>
                      </button>
                      <button className="p-4 rounded-xl border-2 border-border hover:border-theme-primary transition-all">
                        <Clock className="w-6 h-6 text-foreground mx-auto mb-1" />
                        <p className="text-sm text-foreground text-center">Standard (NEFT)</p>
                        <p className="text-xs text-muted-foreground text-center">2-4 hours</p>
                      </button>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90 text-white text-lg py-6">
                    <ShieldCheck className="w-5 h-5 mr-2" />
                    Withdraw with OTP
                  </Button>

                  <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                    <p className="text-xs text-muted-foreground text-center">
                      OTP confirmation required. Withdrawal receipt will be auto-generated.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* 5. Transactions */}
          {activeWalletTab === 'transactions' && (
            <div className="space-y-4">
              <Card className="p-6 bg-card border-border rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg text-foreground flex items-center gap-2">
                    <FileText className="w-5 h-5 text-theme-primary" />
                    Transaction History
                  </h3>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Filter className="w-4 h-4 mr-1" />
                      Filter
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4 mr-1" />
                      Export
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  {transactions.map((txn) => (
                    <div key={txn.id} className="p-4 bg-muted rounded-xl hover:bg-accent transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            txn.type === 'deposit' ? 'bg-green-500/20' :
                            txn.type === 'withdraw' ? 'bg-orange-500/20' :
                            txn.type === 'reward' ? 'bg-blue-500/20' :
                            'bg-gray-500/20'
                          }`}>
                            {txn.type === 'deposit' && <ArrowDownRight className="w-5 h-5 text-green-500" />}
                            {txn.type === 'withdraw' && <ArrowUpRight className="w-5 h-5 text-orange-500" />}
                            {txn.type === 'reward' && <Sparkles className="w-5 h-5 text-blue-500" />}
                            {txn.type === 'fee' && <Receipt className="w-5 h-5 text-gray-500" />}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-foreground mb-1">{txn.desc}</p>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <span>{txn.date}</span>
                              <span>•</span>
                              <span>{txn.id}</span>
                              <span>•</span>
                              <span>{txn.mode}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-sm ${txn.amount > 0 ? 'text-green-500' : 'text-orange-500'}`}>
                            {txn.amount > 0 ? '+' : ''}₹{Math.abs(txn.amount).toLocaleString()}
                          </p>
                          <Badge className="bg-green-500/20 text-green-500 border-green-500/30 text-xs mt-1">
                            {txn.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* AI Insight */}
                <div className="mt-4 p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl">
                  <div className="flex items-start gap-3">
                    <Brain className="w-5 h-5 text-purple-500 mt-0.5" />
                    <div>
                      <p className="text-sm text-foreground mb-1">AI Insight</p>
                      <p className="text-xs text-muted-foreground">
                        Most withdrawals are made to ICICI. Consider setting auto-transfer rules for better efficiency.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* 6. UPI & Cards */}
          {activeWalletTab === 'upi' && (
            <div className="space-y-4">
              <Card className="p-6 bg-card border-border rounded-2xl">
                <h3 className="text-lg text-foreground mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-theme-primary" />
                  UPI & Card Management
                </h3>

                {/* UPI Section */}
                <div className="mb-6">
                  <h4 className="text-sm text-foreground mb-3">UPI IDs</h4>
                  <div className="space-y-2">
                    {[
                      { id: 'rajesh@okicici', verified: true, default: true },
                      { id: 'rajesh@paytm', verified: true, default: false },
                    ].map((upi, idx) => (
                      <div key={idx} className="p-4 bg-muted rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <QrCode className="w-5 h-5 text-theme-primary" />
                          <div>
                            <p className="text-sm text-foreground">{upi.id}</p>
                            {upi.default && <p className="text-xs text-muted-foreground">Default UPI</p>}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {upi.verified && <Check className="w-4 h-4 text-green-500" />}
                          <Button size="sm" variant="outline">Manage</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-3 bg-theme-primary hover:bg-theme-primary-dark text-black dark:text-gray-900">
                    <Plus className="w-4 h-4 mr-2" />
                    Add UPI ID
                  </Button>
                </div>

                <Separator className="my-6" />

                {/* Cards Section */}
                <div>
                  <h4 className="text-sm text-foreground mb-3">Saved Cards</h4>
                  <div className="space-y-2">
                    {[
                      { number: '****5678', bank: 'HDFC Bank', type: 'Credit', expiry: '12/27' },
                      { number: '****1234', bank: 'SBI', type: 'Debit', expiry: '05/26' },
                    ].map((card, idx) => (
                      <div key={idx} className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                              <CreditCard className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <p className="text-sm text-foreground font-mono">{card.number}</p>
                              <p className="text-xs text-muted-foreground">{card.bank} {card.type}</p>
                              <p className="text-xs text-muted-foreground">Expires {card.expiry}</p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">Remove</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Card
                  </Button>
                </div>

                <Separator className="my-6" />

                {/* QR Code */}
                <div className="text-center">
                  <div className="w-48 h-48 mx-auto bg-white rounded-2xl flex items-center justify-center mb-3">
                    <QrCode className="w-32 h-32 text-gray-800" />
                  </div>
                  <p className="text-sm text-foreground mb-1">Your UPI QR Code</p>
                  <p className="text-xs text-muted-foreground mb-3">Scan to receive payments</p>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download QR
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {/* 7. Auto-Settlement */}
          {activeWalletTab === 'settlement' && (
            <div className="space-y-4">
              <Card className="p-6 bg-card border-border rounded-2xl">
                <h3 className="text-lg text-foreground mb-4 flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-theme-primary" />
                  Auto-Settlement / Smart Transfers
                </h3>

                <p className="text-sm text-muted-foreground mb-6">
                  Automatically transfer funds from wallet to your preferred bank when threshold is reached.
                </p>

                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                    <div>
                      <p className="text-sm text-foreground mb-1">Enable Auto-Settlement</p>
                      <p className="text-xs text-muted-foreground">Transfer automatically based on rules</p>
                    </div>
                    <Switch
                      checked={autoSettlementEnabled}
                      onCheckedChange={setAutoSettlementEnabled}
                    />
                  </div>

                  {autoSettlementEnabled && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <Label>Threshold Amount</Label>
                        <div className="relative">
                          <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input
                            type="number"
                            placeholder="e.g., 10000"
                            value={autoThreshold}
                            onChange={(e) => setAutoThreshold(e.target.value)}
                            className="pl-10 rounded-xl"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">Transfer when balance exceeds this amount</p>
                      </div>

                      <div className="space-y-2">
                        <Label>Preferred Bank Account</Label>
                        <Select value={selectedBank} onValueChange={setSelectedBank}>
                          <SelectTrigger className="rounded-xl">
                            <SelectValue placeholder="Choose bank account" />
                          </SelectTrigger>
                          <SelectContent>
                            {linkedBanks.filter(b => b.status === 'verified').map(bank => (
                              <SelectItem key={bank.id} value={bank.id}>
                                {bank.logo} {bank.name} - {bank.accountNo}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                        <div>
                          <p className="text-sm text-foreground">Notify Before Transfer</p>
                          <p className="text-xs text-muted-foreground">Get notified 5 minutes before auto-transfer</p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <Button className="w-full bg-theme-primary hover:bg-theme-primary-dark text-black dark:text-gray-900">
                        <Check className="w-4 h-4 mr-2" />
                        Save Auto-Settlement Rules
                      </Button>
                    </motion.div>
                  )}

                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-blue-500 mt-0.5" />
                      <p className="text-xs text-muted-foreground">
                        Smart transfers help maintain optimal liquidity for trading while ensuring your funds earn interest in your bank account.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* 8. Security & KYC */}
          {activeWalletTab === 'kyc' && (
            <div className="space-y-4">
              <Card className="p-6 bg-card border-border rounded-2xl">
                <h3 className="text-lg text-foreground mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-theme-primary" />
                  Security & KYC Verification
                </h3>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-foreground">Verification Progress</p>
                    <p className="text-sm text-theme-primary">80%</p>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '80%' }}
                      className="h-full bg-gradient-to-r from-theme-primary to-theme-primary-dark"
                    />
                  </div>
                </div>

                {/* Verification Steps */}
                <div className="space-y-3 mb-6">
                  {[
                    { label: 'PAN Verification', status: 'verified', icon: Check },
                    { label: 'Aadhaar Link', status: 'verified', icon: Check },
                    { label: 'Selfie Verification', status: 'verified', icon: Check },
                    { label: 'Bank Account Match', status: 'pending', icon: Clock },
                  ].map((step, idx) => {
                    const Icon = step.icon;
                    return (
                      <div key={idx} className="flex items-center justify-between p-4 bg-muted rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            step.status === 'verified' ? 'bg-green-500/20' : 'bg-orange-500/20'
                          }`}>
                            <Icon className={`w-5 h-5 ${
                              step.status === 'verified' ? 'text-green-500' : 'text-orange-500'
                            }`} />
                          </div>
                          <p className="text-sm text-foreground">{step.label}</p>
                        </div>
                        {step.status === 'verified' ? (
                          <Badge className="bg-green-500/20 text-green-500 border-green-500/30">
                            Verified
                          </Badge>
                        ) : (
                          <Button size="sm" className="bg-theme-primary hover:bg-theme-primary-dark text-black dark:text-gray-900">
                            Complete
                          </Button>
                        )}
                      </div>
                    );
                  })}
                </div>

                <Separator className="my-6" />

                {/* Security Settings */}
                <div className="space-y-4">
                  <h4 className="text-sm text-foreground">Security Settings</h4>
                  
                  <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                    <div>
                      <p className="text-sm text-foreground">Two-Factor Authentication (2FA)</p>
                      <p className="text-xs text-muted-foreground">Required for all transactions</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="space-y-2">
                    <Label>Transaction PIN</Label>
                    <div className="flex gap-2">
                      <Input type="password" placeholder="Enter PIN" className="rounded-xl" />
                      <Button variant="outline">Change</Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>UPI PIN</Label>
                    <div className="flex gap-2">
                      <Input type="password" placeholder="Enter UPI PIN" className="rounded-xl" />
                      <Button variant="outline">Change</Button>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <ShieldCheck className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-500">Account Secured</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Your account meets all security requirements for trading on Zonix.
                  </p>
                </div>
              </Card>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function NotificationsSection({ settings, setSettings }: any) {
  return (
    <div className="space-y-4">
      <Card className="p-6 bg-card border-border rounded-2xl">
        <h2 className="text-xl text-foreground mb-6 flex items-center gap-2">
          <Bell className="w-5 h-5 text-theme-primary" />
          Notifications & Alerts
        </h2>

        {/* Notification Types */}
        <div className="space-y-3 mb-6">
          {[
            { key: 'marketUpdates', label: 'Market Updates', desc: 'Daily summaries and trends', icon: TrendingUp },
            { key: 'sipReminders', label: 'SIP Reminders', desc: 'Investment schedule alerts', icon: Calendar },
            { key: 'aiSuggestions', label: 'AI Suggestions', desc: 'Smart investment tips', icon: Brain },
            { key: 'priceChanges', label: 'Token Price Changes', desc: 'Significant price movements', icon: Activity },
            { key: 'securityWarnings', label: 'Security Warnings', desc: 'Account security alerts', icon: Shield },
            { key: 'newsBroadcasts', label: 'News Broadcasts', desc: 'Breaking financial news', icon: Bell },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.key} className="flex items-center justify-between p-4 bg-muted rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-theme-primary/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-theme-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
                <Switch
                  checked={settings[item.key as keyof typeof settings] as boolean}
                  onCheckedChange={(checked) => setSettings({ ...settings, [item.key]: checked })}
                />
              </div>
            );
          })}
        </div>

        <Separator className="my-6" />

        {/* Sound Settings */}
        <div className="space-y-4">
          <h3 className="text-sm text-foreground">Sound & Timing</h3>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-theme-primary" />
              <span className="text-sm text-foreground">Notification Sounds</span>
            </div>
            <Switch
              checked={settings.soundEnabled}
              onCheckedChange={(checked) => setSettings({ ...settings, soundEnabled: checked })}
            />
          </div>

          <div className="space-y-2">
            <Label>Sound Type</Label>
            <Select value={settings.soundType} onValueChange={(value) => setSettings({ ...settings, soundType: value })}>
              <SelectTrigger className="rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="soft">Soft Chime</SelectItem>
                <SelectItem value="futuristic">Futuristic Beep</SelectItem>
                <SelectItem value="pulse">Pulse Tone</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="p-4 bg-muted rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-theme-primary" />
                <span className="text-sm text-foreground">Quiet Hours</span>
              </div>
              <Switch
                checked={settings.quietHoursEnabled}
                onCheckedChange={(checked) => setSettings({ ...settings, quietHoursEnabled: checked })}
              />
            </div>
            {settings.quietHoursEnabled && (
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">From</Label>
                  <Input
                    type="time"
                    defaultValue="22:00"
                    className="rounded-xl h-9"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">To</Label>
                  <Input
                    type="time"
                    defaultValue="08:00"
                    className="rounded-xl h-9"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <Separator className="my-6" />

        {/* AI Priority Filtering */}
        <div className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-purple-500" />
              <span className="text-sm text-foreground">AI Priority Filtering</span>
            </div>
            <Switch
              checked={settings.aiPriorityFiltering}
              onCheckedChange={(checked) => setSettings({ ...settings, aiPriorityFiltering: checked })}
            />
          </div>
          <p className="text-xs text-muted-foreground">Let AI decide which alerts are most important for you</p>
        </div>
      </Card>
    </div>
  );
}

function AISection({ settings, setSettings }: any) {
  return (
    <div className="space-y-4">
      <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-violet-500/10 border border-purple-500/20 rounded-2xl">
        <h2 className="text-xl text-foreground mb-2 flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-500" />
          AI Personalization
        </h2>
        <p className="text-sm text-muted-foreground mb-6">Control How Zonix AI Thinks For You</p>

        {/* Risk Appetite */}
        <div className="space-y-3 mb-6">
          <Label>AI Risk Appetite</Label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: 'low', label: 'Low', color: 'from-green-500 to-emerald-500' },
              { value: 'moderate', label: 'Moderate', color: 'from-yellow-500 to-orange-500' },
              { value: 'aggressive', label: 'Aggressive', color: 'from-red-500 to-pink-500' },
            ].map((risk) => (
              <button
                key={risk.value}
                onClick={() => setSettings({ ...settings, riskAppetite: risk.value })}
                className={`p-4 rounded-xl border transition-all ${
                  settings.riskAppetite === risk.value
                    ? `bg-gradient-to-br ${risk.color} border-transparent text-white shadow-lg`
                    : 'bg-muted border-border text-muted-foreground hover:border-theme-primary'
                }`}
              >
                <div className="text-sm">{risk.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Behavior Mode */}
        <div className="space-y-3 mb-6">
          <Label>AI Behavior Mode</Label>
          <Select value={settings.behaviorMode} onValueChange={(value) => setSettings({ ...settings, behaviorMode: value })}>
            <SelectTrigger className="rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="analytical">Analytical - Data-driven decisions</SelectItem>
              <SelectItem value="emotional">Emotional - Market sentiment based</SelectItem>
              <SelectItem value="balanced">Balanced - Best of both worlds</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sentiment Preference */}
        <div className="space-y-3 mb-6">
          <Label>AI Sentiment Preference</Label>
          <div className="flex gap-3">
            <Slider
              value={[settings.sentimentPreference === 'optimistic' ? 75 : settings.sentimentPreference === 'neutral' ? 50 : 25]}
              onValueChange={([value]) => {
                const pref = value > 66 ? 'optimistic' : value > 33 ? 'neutral' : 'cautious';
                setSettings({ ...settings, sentimentPreference: pref });
              }}
              max={100}
              step={1}
              className="flex-1"
            />
            <span className="text-sm text-theme-primary w-24 capitalize">{settings.sentimentPreference}</span>
          </div>
        </div>

        <Separator className="my-6" />

        {/* AI Features */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-foreground">AI Auto-Optimization for Portfolio</p>
                <p className="text-xs text-muted-foreground">Let AI rebalance automatically</p>
              </div>
            </div>
            <Switch
              checked={settings.autoOptimization}
              onCheckedChange={(checked) => setSettings({ ...settings, autoOptimization: checked })}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-foreground">Predictive Insights & Trend Warnings</p>
                <p className="text-xs text-muted-foreground">Get ahead of market movements</p>
              </div>
            </div>
            <Switch
              checked={settings.predictiveInsights}
              onCheckedChange={(checked) => setSettings({ ...settings, predictiveInsights: checked })}
            />
          </div>
        </div>

        <Separator className="my-6" />

        {/* AI Personality */}
        <div className="space-y-3">
          <Label>AI Personality Style</Label>
          <Select value={settings.aiPersonality} onValueChange={(value) => setSettings({ ...settings, aiPersonality: value })}>
            <SelectTrigger className="rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="professional">Professional Analyst</SelectItem>
              <SelectItem value="friendly">Friendly Advisor</SelectItem>
              <SelectItem value="futurist">Futurist Mode</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Reset AI */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="w-full mt-6 border-red-500/30 text-red-500 hover:bg-red-500/10">
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset AI Preferences
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Reset AI Preferences?</AlertDialogTitle>
              <AlertDialogDescription>
                This will reset all AI settings to default values. Your portfolio and data will not be affected.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-red-500 hover:bg-red-600 text-white">Reset</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Card>
    </div>
  );
}

function DisplaySection({ settings, setSettings, handleThemeChange }: any) {
  return (
    <div className="space-y-4">
      <Card className="p-6 bg-card border-border rounded-2xl">
        <h2 className="text-xl text-foreground mb-6 flex items-center gap-2">
          <Palette className="w-5 h-5 text-theme-primary" />
          Display & Themes
        </h2>

        {/* Theme Mode */}
        <div className="space-y-3 mb-6">
          <Label>Theme Mode</Label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: 'light', label: 'Light', icon: Sun },
              { value: 'dark', label: 'Dark', icon: Moon },
              { value: 'system', label: 'Auto', icon: MonitorSmartphone },
            ].map((mode) => {
              const Icon = mode.icon;
              return (
                <button
                  key={mode.value}
                  onClick={() => handleThemeChange(mode.value, settings.themeColor)}
                  className={`p-4 rounded-xl border transition-all ${
                    settings.themeMode === mode.value
                      ? 'bg-theme-primary border-transparent text-black dark:text-gray-900 shadow-lg'
                      : 'bg-muted border-border text-muted-foreground hover:border-theme-primary'
                  }`}
                >
                  <Icon className="w-5 h-5 mx-auto mb-2" />
                  <div className="text-sm">{mode.label}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Accent Color */}
        <div className="space-y-3 mb-6">
          <Label>Accent Color</Label>
          <div className="grid grid-cols-4 gap-3">
            {[
              { value: 'yellow', name: 'Gold', gradient: 'from-yellow-300 to-yellow-500' },
              { value: 'green', name: 'Emerald', gradient: 'from-green-400 to-green-600' },
              { value: 'purple', name: 'Purple', gradient: 'from-purple-400 to-purple-600' },
              { value: 'navy', name: 'Blue', gradient: 'from-blue-400 to-blue-600' },
            ].map((color) => (
              <button
                key={color.value}
                onClick={() => handleThemeChange(settings.themeMode, color.value)}
                className={`p-4 rounded-xl border transition-all ${
                  settings.themeColor === color.value
                    ? 'ring-2 ring-offset-2 ring-offset-background ring-theme-primary scale-105'
                    : 'opacity-60 hover:opacity-100 border-border'
                }`}
              >
                <div className={`w-full h-12 rounded-lg bg-gradient-to-br ${color.gradient} mb-2 flex items-center justify-center`}>
                  {settings.themeColor === color.value && (
                    <Check className="w-5 h-5 text-white" />
                  )}
                </div>
                <div className="text-xs text-muted-foreground">{color.name}</div>
              </button>
            ))}
          </div>
        </div>

        <Separator className="my-6" />

        {/* Font Size */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between">
            <Label>Font Size</Label>
            <span className="text-sm text-theme-primary">{settings.fontSize}px</span>
          </div>
          <Slider
            value={[settings.fontSize]}
            onValueChange={([value]) => setSettings({ ...settings, fontSize: value })}
            min={12}
            max={20}
            step={1}
          />
        </div>

        {/* UI Density */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between">
            <Label>UI Density</Label>
            <span className="text-sm text-theme-primary">{settings.uiDensity}%</span>
          </div>
          <Slider
            value={[settings.uiDensity]}
            onValueChange={([value]) => setSettings({ ...settings, uiDensity: value })}
            min={0}
            max={100}
            step={10}
          />
        </div>

        {/* Glassmorphism Intensity */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between">
            <Label>Glassmorphism Intensity</Label>
            <span className="text-sm text-theme-primary">{settings.glassmorphismIntensity}%</span>
          </div>
          <Slider
            value={[settings.glassmorphismIntensity]}
            onValueChange={([value]) => setSettings({ ...settings, glassmorphismIntensity: value })}
            min={0}
            max={100}
            step={10}
          />
        </div>

        <Separator className="my-6" />

        {/* Background Animations */}
        <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
          <div>
            <p className="text-sm text-foreground">Background Animations</p>
            <p className="text-xs text-muted-foreground">Disable for low-power devices</p>
          </div>
          <Switch
            checked={settings.backgroundAnimations}
            onCheckedChange={(checked) => setSettings({ ...settings, backgroundAnimations: checked })}
          />
        </div>

        {/* Preview Pane */}
        <div className="mt-6 p-6 bg-muted rounded-xl">
          <p className="text-xs text-muted-foreground mb-3">Live Preview</p>
          <div className="flex items-center gap-3">
            <div className={`flex-1 h-16 rounded-lg bg-gradient-to-br ${
              settings.themeColor === 'yellow' ? 'from-yellow-300 to-yellow-500' :
              settings.themeColor === 'green' ? 'from-green-400 to-green-600' :
              settings.themeColor === 'purple' ? 'from-purple-400 to-purple-600' :
              'from-blue-400 to-blue-600'
            } flex items-center justify-center`}>
              <span className="text-white">Zonix</span>
            </div>
          </div>
        </div>

        <Button className="w-full mt-6 bg-theme-primary hover:bg-theme-primary-dark text-black dark:text-gray-900">
          <Check className="w-4 h-4 mr-2" />
          Save & Apply Theme
        </Button>
      </Card>
    </div>
  );
}

function LanguageSection({ settings, setSettings }: any) {
  return (
    <div className="space-y-4">
      <Card className="p-6 bg-card border-border rounded-2xl">
        <h2 className="text-xl text-foreground mb-6 flex items-center gap-2">
          <Globe className="w-5 h-5 text-theme-primary" />
          Language & Region
        </h2>

        <div className="space-y-4">
          {/* Primary Language */}
          <div className="space-y-2">
            <Label>Primary Language</Label>
            <Select value={settings.language} onValueChange={(value) => setSettings({ ...settings, language: value })}>
              <SelectTrigger className="rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">हिंदी (Hindi)</SelectItem>
                <SelectItem value="ta">தமிழ் (Tamil)</SelectItem>
                <SelectItem value="bn">বাংলা (Bengali)</SelectItem>
                <SelectItem value="te">తెలుగు (Telugu)</SelectItem>
                <SelectItem value="mr">मराठी (Marathi)</SelectItem>
                <SelectItem value="gu">ગુજરાતી (Gujarati)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Currency Format */}
          <div className="space-y-2">
            <Label>Currency Format</Label>
            <Select value={settings.currency} onValueChange={(value) => setSettings({ ...settings, currency: value })}>
              <SelectTrigger className="rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="INR">₹ INR - Indian Rupee</SelectItem>
                <SelectItem value="USD">$ USD - US Dollar</SelectItem>
                <SelectItem value="EUR">€ EUR - Euro</SelectItem>
                <SelectItem value="GBP">£ GBP - British Pound</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date Format */}
          <div className="space-y-2">
            <Label>Date Format</Label>
            <Select value={settings.dateFormat} onValueChange={(value) => setSettings({ ...settings, dateFormat: value })}>
              <SelectTrigger className="rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DD-MM-YYYY">DD-MM-YYYY (27-10-2025)</SelectItem>
                <SelectItem value="MM-DD-YYYY">MM-DD-YYYY (10-27-2025)</SelectItem>
                <SelectItem value="YYYY-MM-DD">YYYY-MM-DD (2025-10-27)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Time Zone */}
          <div className="space-y-2">
            <Label>Time Zone</Label>
            <Select value={settings.timeZone} onValueChange={(value) => setSettings({ ...settings, timeZone: value })}>
              <SelectTrigger className="rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Asia/Kolkata">IST - Asia/Kolkata (UTC +5:30)</SelectItem>
                <SelectItem value="America/New_York">EST - America/New_York (UTC -5:00)</SelectItem>
                <SelectItem value="Europe/London">GMT - Europe/London (UTC +0:00)</SelectItem>
                <SelectItem value="Asia/Tokyo">JST - Asia/Tokyo (UTC +9:00)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator className="my-6" />

          {/* Voice Assistant Language */}
          <div className="space-y-2">
            <Label>Voice Assistant Language</Label>
            <Select value={settings.voiceLanguage} onValueChange={(value) => setSettings({ ...settings, voiceLanguage: value })}>
              <SelectTrigger className="rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en-IN">English (India)</SelectItem>
                <SelectItem value="hi-IN">Hindi (India)</SelectItem>
                <SelectItem value="en-US">English (US)</SelectItem>
                <SelectItem value="en-GB">English (UK)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Auto-detect */}
          <div className="p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl">
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-foreground">Auto-detect Region</span>
            </div>
            <p className="text-xs text-muted-foreground">Automatically set timezone and currency based on location</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

function IntegrationsSection() {
  const [integrations] = useState([
    { name: 'Google', connected: true, icon: '🔍', permissions: 'Email, Calendar' },
    { name: 'Telegram', connected: true, icon: '✈️', permissions: 'Notifications, Bot' },
    { name: 'Razorpay', connected: true, icon: '💳', permissions: 'Payments' },
    { name: 'OpenAI', connected: false, icon: '🤖', permissions: 'AI Analysis' },
    { name: 'Slack', connected: false, icon: '💬', permissions: 'Alerts' },
    { name: 'MetaMask', connected: true, icon: '🦊', permissions: 'Wallet' },
  ]);

  return (
    <div className="space-y-4">
      <Card className="p-6 bg-card border-border rounded-2xl">
        <h2 className="text-xl text-foreground mb-6 flex items-center gap-2">
          <Zap className="w-5 h-5 text-theme-primary" />
          Integrations & Connected Apps
        </h2>

        <div className="space-y-3">
          {integrations.map((app, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-muted rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-theme-primary/20 flex items-center justify-center text-2xl">
                  {app.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm text-foreground">{app.name}</span>
                    {app.connected && (
                      <Badge className="bg-green-500/20 text-green-500 border-green-500/30 text-xs">
                        Connected
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{app.permissions}</p>
                </div>
              </div>
              <Button
                size="sm"
                variant={app.connected ? 'outline' : 'default'}
                className={app.connected 
                  ? 'border-red-500/30 text-red-500 hover:bg-red-500/10'
                  : 'bg-theme-primary hover:bg-theme-primary-dark text-black dark:text-gray-900'
                }
              >
                {app.connected ? 'Disconnect' : 'Connect'}
              </Button>
            </div>
          ))}
        </div>

        <Separator className="my-6" />

        {/* Smart Automation */}
        <div>
          <h3 className="text-sm text-foreground mb-4">Smart Automation</h3>
          <div className="space-y-3">
            {[
              { label: 'Auto-Sync with Ledger', desc: 'Sync portfolio every hour' },
              { label: 'Auto SIP Execution', desc: 'Execute SIP automatically' },
              { label: 'Auto AI Alert Forwarding to Telegram', desc: 'Send alerts to Telegram bot' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-muted rounded-xl">
                <div>
                  <p className="text-sm text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <Switch defaultChecked={idx < 2} />
              </div>
            ))}
          </div>
        </div>

        <Button className="w-full mt-6 bg-theme-primary hover:bg-theme-primary-dark text-black dark:text-gray-900">
          <Link2 className="w-4 h-4 mr-2" />
          Add Integration
        </Button>
      </Card>
    </div>
  );
}

function DataSection({ settings, setSettings }: any) {
  return (
    <div className="space-y-4">
      <Card className="p-6 bg-card border-border rounded-2xl">
        <h2 className="text-xl text-foreground mb-6 flex items-center gap-2">
          <Database className="w-5 h-5 text-theme-primary" />
          Data & Backups
        </h2>

        {/* Backup Status */}
        <div className="p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-foreground">Last Backup</span>
            <Badge className="bg-green-500/20 text-green-500 border-green-500/30">
              Success
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">October 26, 2025 at 11:30 PM</p>
        </div>

        {/* Backup Actions */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Button className="bg-theme-primary hover:bg-theme-primary-dark text-black dark:text-gray-900 flex-col h-auto py-4">
            <Database className="w-5 h-5 mb-1" />
            <span className="text-xs">Local</span>
          </Button>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white flex-col h-auto py-4">
            <Upload className="w-5 h-5 mb-1" />
            <span className="text-xs">Cloud</span>
          </Button>
          <Button className="bg-purple-500 hover:bg-purple-600 text-white flex-col h-auto py-4">
            <Link2 className="w-5 h-5 mb-1" />
            <span className="text-xs">Blockchain</span>
          </Button>
        </div>

        <Separator className="my-6" />

        {/* Auto Backup Settings */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground">Auto Backup</p>
              <p className="text-xs text-muted-foreground">Automatically backup data</p>
            </div>
            <Switch
              checked={settings.autoBackup}
              onCheckedChange={(checked) => setSettings({ ...settings, autoBackup: checked })}
            />
          </div>

          {settings.autoBackup && (
            <div className="space-y-2">
              <Label>Backup Frequency</Label>
              <Select value={settings.backupFrequency} onValueChange={(value) => setSettings({ ...settings, backupFrequency: value })}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Every Hour</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <Separator className="my-6" />

        {/* Data Export */}
        <div>
          <h3 className="text-sm text-foreground mb-4">Export Data</h3>
          <div className="grid grid-cols-3 gap-3">
            {['PDF', 'JSON', 'CSV'].map((format) => (
              <Button
                key={format}
                variant="outline"
                className="hover:bg-muted"
              >
                <Download className="w-4 h-4 mr-2" />
                {format}
              </Button>
            ))}
          </div>
        </div>

        <Separator className="my-6" />

        {/* Advanced Options */}
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted rounded-xl">
            <div>
              <p className="text-sm text-foreground">AI Compression Mode</p>
              <p className="text-xs text-muted-foreground">Compress large data smartly</p>
            </div>
            <Switch defaultChecked />
          </div>

          <Button variant="outline" className="w-full border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/10">
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Temporary Cache
          </Button>
        </div>
      </Card>
    </div>
  );
}

function BillingSection({ settings, setSettings }: any) {
  return (
    <div className="space-y-4">
      <Card className="p-6 bg-card border-border rounded-2xl">
        <h2 className="text-xl text-foreground mb-6 flex items-center gap-2">
          <Receipt className="w-5 h-5 text-theme-primary" />
          Billing & Subscriptions
        </h2>

        {/* Current Plan */}
        <div className="p-6 bg-gradient-to-br from-theme-primary/20 to-theme-primary-dark/20 border border-theme-primary/30 rounded-2xl mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <Badge className="bg-theme-primary text-black dark:text-gray-900 mb-2">Premium Plan</Badge>
              <h3 className="text-2xl text-foreground">₹999/month</h3>
            </div>
            <Sparkles className="w-8 h-8 text-theme-primary" />
          </div>
          <p className="text-sm text-foreground mb-4">
            Unlimited AI insights, advanced analytics, and priority support
          </p>
          <div className="flex gap-3">
            <Button className="flex-1 bg-theme-primary hover:bg-theme-primary-dark text-black dark:text-gray-900">
              Upgrade Plan
            </Button>
            <Button variant="outline" className="flex-1">
              Manage Plan
            </Button>
          </div>
        </div>

        {/* AI Savings Summary */}
        <div className="p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl mb-6">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-sm text-foreground">AI Optimization Savings</span>
          </div>
          <p className="text-2xl text-green-500 mb-1">₹421</p>
          <p className="text-xs text-muted-foreground">Saved this month using AI</p>
        </div>

        <Separator className="my-6" />

        {/* Billing History */}
        <div>
          <h3 className="text-sm text-foreground mb-4">Recent Invoices</h3>
          <div className="space-y-2">
            {[
              { date: 'Oct 01, 2025', amount: '₹999', status: 'Paid', id: '#INV-1234' },
              { date: 'Sep 01, 2025', amount: '₹999', status: 'Paid', id: '#INV-1233' },
              { date: 'Aug 01, 2025', amount: '₹999', status: 'Paid', id: '#INV-1232' },
            ].map((invoice, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-muted rounded-xl">
                <div>
                  <p className="text-sm text-foreground">{invoice.date}</p>
                  <p className="text-xs text-muted-foreground">{invoice.id}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm text-foreground">{invoice.amount}</p>
                    <Badge className="bg-green-500/20 text-green-500 border-green-500/30 text-xs">
                      {invoice.status}
                    </Badge>
                  </div>
                  <Button size="sm" variant="ghost" className="text-theme-primary hover:bg-theme-primary/10">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-6" />

        {/* Auto-Renew */}
        <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
          <div>
            <p className="text-sm text-foreground">Auto-Renew Subscription</p>
            <p className="text-xs text-muted-foreground">Renews on Nov 01, 2025</p>
          </div>
          <Switch
            checked={settings.autoRenew}
            onCheckedChange={(checked) => setSettings({ ...settings, autoRenew: checked })}
          />
        </div>
      </Card>
    </div>
  );
}

function AccountSection() {
  return (
    <div className="space-y-4">
      <Card className="p-6 bg-card border-border rounded-2xl">
        <h2 className="text-xl text-foreground mb-6 flex items-center gap-2">
          <Trash2 className="w-5 h-5 text-red-500" />
          Account & Deletion
        </h2>

        {/* Account Status */}
        <div className="p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl mb-6">
          <div className="flex items-center gap-2 mb-1">
            <Check className="w-4 h-4 text-green-500" />
            <span className="text-sm text-foreground">Account Status: Active</span>
          </div>
          <p className="text-xs text-muted-foreground">Your account is in good standing</p>
        </div>

        {/* Pause Account */}
        <div className="p-4 bg-muted border border-yellow-500/20 rounded-xl mb-6">
          <h3 className="text-sm text-foreground mb-2 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-yellow-500" />
            Pause Account
          </h3>
          <p className="text-xs text-muted-foreground mb-4">
            Temporarily disable your account. You can reactivate anytime.
          </p>
          <Button variant="outline" className="w-full border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/10">
            Pause Account
          </Button>
        </div>

        <Separator className="my-6" />

        {/* Delete Account */}
        <div className="p-6 bg-gradient-to-br from-red-500/10 to-pink-500/10 border border-red-500/20 rounded-xl">
          <h3 className="text-lg text-foreground mb-2 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            Danger Zone
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>

          <div className="space-y-3 mb-4">
            <div className="flex items-start gap-2 text-xs text-muted-foreground">
              <div className="w-1 h-1 rounded-full bg-red-500 mt-1.5"></div>
              <span>All your portfolio data will be permanently deleted</span>
            </div>
            <div className="flex items-start gap-2 text-xs text-muted-foreground">
              <div className="w-1 h-1 rounded-full bg-red-500 mt-1.5"></div>
              <span>Your digital identity will be wiped from ZonixChain</span>
            </div>
            <div className="flex items-start gap-2 text-xs text-muted-foreground">
              <div className="w-1 h-1 rounded-full bg-red-500 mt-1.5"></div>
              <span>This action cannot be undone</span>
            </div>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full bg-red-500 hover:bg-red-600 text-white">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  Are you absolutely sure?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account and remove your data from our servers. 
                  Your digital identity will be wiped from ZonixChain.
                  <br /><br />
                  Type <strong>DELETE</strong> to confirm.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <Input 
                placeholder="Type DELETE to confirm"
                className="rounded-xl"
              />
              <AlertDialogFooter>
                <AlertDialogCancel>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction className="bg-red-500 hover:bg-red-600 text-white">
                  Delete Account Permanently
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <div className="mt-4 p-3 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground">
              Before deleting, you can export your data using the <strong>Data & Backups</strong> section.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
