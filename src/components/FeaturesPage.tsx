import {motion} from 'motion/react';
import {Card} from './ui/card';
import {Badge} from './ui/badge';
import {Header} from './Header';
import {DetailedFooter} from './DetailedFooter';
import {
    Award,
    BarChart3,
    Brain,
    Clock,
    Globe,
    Lock,
    MapPin,
    Shield,
    Smartphone,
    TrendingUp,
    Users,
    Zap,
} from 'lucide-react';

interface FeaturesPageProps {
    onNavigate: (page: string) => void;
}

const features = [
    {
        icon: MapPin,
        title: 'District Tokens',
        description: 'Invest in the economic growth of 805 Indian districts. Own tokens representing local GDP, infrastructure, and development metrics.',
        color: 'yellow',
        benefits: ['805 Districts', 'Real-time tracking', 'Local insights'],
    },
    {
        icon: BarChart3,
        title: 'State Indices',
        description: 'Trade comprehensive state indices covering all 36 states and union territories with futures and options capabilities.',
        color: 'blue',
        benefits: ['36 States & UTs', 'F&O Trading', 'Hedge positions'],
    },
    {
        icon: Brain,
        title: 'AI-Powered Funds',
        description: 'Machine learning algorithms analyze millions of data points to provide smart investment recommendations and automated portfolio management.',
        color: 'purple',
        benefits: ['AI Analysis', 'Auto-rebalancing', 'Smart alerts'],
    },
    {
        icon: Shield,
        title: 'Bank-Grade Security',
        description: 'Your investments protected with 256-bit encryption, two-factor authentication, and regulatory compliance.',
        color: 'green',
        benefits: ['256-bit SSL', '2FA', 'SEBI Compliant'],
    },
    {
        icon: TrendingUp,
        title: 'Real-Time Analytics',
        description: 'Bloomberg-level market data, live charts, and economic indicators updated every second for informed decision making.',
        color: 'orange',
        benefits: ['Live data', 'Advanced charts', 'Market insights'],
    },
    {
        icon: Zap,
        title: 'Instant Trading',
        description: 'Execute trades in milliseconds with our high-performance trading engine and seamless UPI integration.',
        color: 'red',
        benefits: ['Fast execution', 'UPI payments', 'Zero delays'],
    },
];

const additionalFeatures = [
    {
        icon: Globe,
        title: 'Pan-India Coverage',
        description: 'Complete coverage of every district, state, and union territory across India.'
    },
    {
        icon: Lock,
        title: 'Regulatory Compliance',
        description: 'Fully compliant with RBI, SEBI, and all Indian financial regulations.'
    },
    {icon: Clock, title: '24/7 Support', description: 'Round-the-clock customer support in multiple Indian languages.'},
    {
        icon: Smartphone,
        title: 'Mobile First',
        description: 'Optimized for mobile trading with native iOS and Android apps.'
    },
    {icon: Award, title: 'Low Fees', description: 'Industry-leading low brokerage and transparent pricing.'},
    {icon: Users, title: 'Community', description: 'Join 50,000+ traders sharing insights and strategies.'},
];

export function FeaturesPage() {
    return (
        <div
            className="min-h-screen bg-gradient-to-br from-white via-yellow-50/30 to-white dark:from-black dark:via-yellow-950/10 dark:to-black">
            <Header/>

            <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Page Header */}
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.5}}
                        className="text-center mb-20"
                    >
                        <Badge
                            className="bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 px-6 py-3 text-sm mb-6">
                            Platform Features
                        </Badge>
                        <h1 className="text-6xl lg:text-7xl font-extrabold mb-8 tracking-tight leading-tight">
                            Everything You Need to
                            <br/>
                            <span
                                className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                Trade Smart
              </span>
                        </h1>
                        <p className="text-2xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed font-medium">
                            Powerful tools and insights to help you invest in India's growth story at every level
                        </p>
                    </motion.div>

                    {/* Main Features Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{opacity: 0, y: 30}}
                                whileInView={{opacity: 1, y: 0}}
                                transition={{duration: 0.5, delay: idx * 0.1}}
                                viewport={{once: true}}
                            >
                                <Card
                                    className="p-8 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-3xl h-full hover-lift group">
                                    <div
                                        className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg ${
                                            feature.color === 'yellow' ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' :
                                                feature.color === 'blue' ? 'bg-gradient-to-br from-blue-400 to-blue-600' :
                                                    feature.color === 'purple' ? 'bg-gradient-to-br from-purple-400 to-purple-600' :
                                                        feature.color === 'green' ? 'bg-gradient-to-br from-green-400 to-green-600' :
                                                            feature.color === 'orange' ? 'bg-gradient-to-br from-orange-400 to-orange-600' :
                                                                'bg-gradient-to-br from-red-400 to-red-600'
                                        } group-hover:scale-110 transition-transform duration-300`}>
                                        <feature.icon className="w-8 h-8 text-white"/>
                                    </div>

                                    <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                                    <p className="text-base text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                                        {feature.description}
                                    </p>

                                    <div
                                        className="flex flex-wrap gap-2 pt-4 border-t border-gray-200 dark:border-gray-800">
                                        {feature.benefits.map((benefit, i) => (
                                            <Badge
                                                key={i}
                                                className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm px-3 py-1"
                                            >
                                                {benefit}
                                            </Badge>
                                        ))}
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {/* Additional Features */}
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.5}}
                        viewport={{once: true}}
                        className="mb-20"
                    >
                        <h2 className="text-4xl font-bold text-center mb-12">And Much More...</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                            {additionalFeatures.map((feature, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{opacity: 0, scale: 0.9}}
                                    whileInView={{opacity: 1, scale: 1}}
                                    transition={{duration: 0.3, delay: idx * 0.05}}
                                    viewport={{once: true}}
                                >
                                    <Card
                                        className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl text-center hover-lift">
                                        <div
                                            className="w-12 h-12 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center">
                                            <feature.icon className="w-6 h-6 text-yellow-600 dark:text-yellow-400"/>
                                        </div>
                                        <p className="text-sm font-semibold mb-2">{feature.title}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-500 leading-relaxed">{feature.description}</p>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Feature Comparison */}
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.5}}
                        viewport={{once: true}}
                    >
                        <Card
                            className="p-10 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10 border-2 border-yellow-200 dark:border-yellow-800 rounded-3xl">
                            <div className="grid md:grid-cols-2 gap-12">
                                <div>
                                    <h3 className="text-3xl font-bold mb-8">Why Choose ZONIX?</h3>
                                    <div className="space-y-5">
                                        {[
                                            'First hyperlocal trading platform in India',
                                            'AI-powered investment recommendations',
                                            'Complete coverage of all 805 districts',
                                            'Bank-grade security and encryption',
                                            'Lowest brokerage in the industry',
                                            'Real-time data and analytics',
                                        ].map((point, idx) => (
                                            <div key={idx} className="flex items-start gap-4">
                                                <div
                                                    className="w-7 h-7 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24"
                                                         stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                                                    </svg>
                                                </div>
                                                <p className="text-base font-medium text-gray-700 dark:text-gray-300">{point}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center justify-center">
                                    <div className="text-center">
                                        <div
                                            className="w-40 h-40 mx-auto mb-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-3xl flex items-center justify-center shadow-2xl">
                                            <Award className="w-20 h-20 text-black"/>
                                        </div>
                                        <h4 className="text-2xl font-bold mb-3">Award Winning Platform</h4>
                                        <p className="text-base text-gray-600 dark:text-gray-400">
                                            Recognized as India's Most Innovative FinTech Platform 2024
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </section>

            <DetailedFooter/>
        </div>
    );
}
