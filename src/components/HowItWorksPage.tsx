import {motion} from 'motion/react';
import {Card} from './ui/card';
import {Badge} from './ui/badge';
import {Button} from './ui/button';
import {Header} from './Header';
import {DetailedFooter} from './DetailedFooter';
import {
    Award,
    BarChart3,
    CheckCircle2,
    CreditCard,
    LineChart,
    Play,
    Search,
    Shield,
    Smartphone,
    TrendingUp,
    UserPlus,
    Wallet,
} from 'lucide-react';

interface HowItWorksPageProps {
    onNavigate: (page: string) => void;
}

const steps = [
    {
        number: '01',
        icon: UserPlus,
        title: 'Create Your Account',
        description: 'Sign up in less than 2 minutes with your mobile number and email. No paperwork required.',
        details: ['Quick registration process', 'Instant account activation', 'Multi-language support'],
        color: 'blue',
    },
    {
        number: '02',
        icon: Shield,
        title: 'Complete KYC Verification',
        description: 'Secure and simple KYC process using Aadhaar and PAN. Get verified in under 5 minutes.',
        details: ['Aadhaar-based verification', 'Digital document upload', 'Instant approval'],
        color: 'green',
    },
    {
        number: '03',
        icon: Wallet,
        title: 'Add Funds',
        description: 'Deposit money instantly using UPI, net banking, or debit card. Start with as low as ₹100.',
        details: ['UPI instant transfer', 'Multiple payment options', 'Secure transactions'],
        color: 'purple',
    },
    {
        number: '04',
        icon: TrendingUp,
        title: 'Start Trading',
        description: 'Explore districts, states, and AI funds. Execute trades instantly with real-time market data.',
        details: ['Real-time market data', 'One-click trading', 'AI recommendations'],
        color: 'yellow',
    },
];

const tradingTypes = [
    {icon: Search, title: 'District Tokens', description: 'Browse 805 districts', example: 'Buy Mumbai @ ₹2,450'},
    {icon: BarChart3, title: 'State Indices', description: 'Trade state indices', example: 'Trade Maharashtra Index'},
    {
        icon: LineChart,
        title: 'AI Mutual Funds',
        description: 'Smart fund portfolios',
        example: 'Invest in AI Growth Fund'
    },
];

const benefits = [
    {icon: Smartphone, title: 'Mobile Optimized', description: 'Trade on the go with our mobile-first platform'},
    {icon: CreditCard, title: 'Low Minimums', description: 'Start investing with just ₹100'},
    {icon: Award, title: 'Expert Support', description: '24/7 customer support in your language'},
];

export function HowItWorksPage() {
    return (
        <div
            className="min-h-screen bg-gradient-to-br from-white via-green-50/30 to-white dark:from-black dark:via-green-950/10 dark:to-black">
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
                            className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-6 py-3 text-sm mb-6">
                            How It Works
                        </Badge>
                        <h1 className="text-6xl lg:text-7xl font-extrabold mb-8 tracking-tight leading-tight">
                            Start Trading in
                            <br/>
                            <span
                                className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                4 Simple Steps
              </span>
                        </h1>
                        <p className="text-2xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed font-medium">
                            From signup to your first trade in less than 10 minutes
                        </p>
                    </motion.div>

                    {/* Steps */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                        {steps.map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{opacity: 0, y: 30}}
                                whileInView={{opacity: 1, y: 0}}
                                transition={{duration: 0.5, delay: idx * 0.1}}
                                viewport={{once: true}}
                                className="relative"
                            >
                                {idx < steps.length - 1 && (
                                    <div
                                        className="hidden lg:block absolute top-24 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-gray-200 dark:from-gray-700 dark:to-gray-800 -translate-x-4"/>
                                )}

                                <Card
                                    className="p-8 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-3xl h-full hover-lift relative overflow-hidden">
                                    <div className="absolute top-0 right-0 text-9xl font-black opacity-5 select-none">
                                        {step.number}
                                    </div>

                                    <div
                                        className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-lg relative z-10 ${
                                            step.color === 'blue' ? 'bg-gradient-to-br from-blue-400 to-blue-600' :
                                                step.color === 'green' ? 'bg-gradient-to-br from-green-400 to-green-600' :
                                                    step.color === 'purple' ? 'bg-gradient-to-br from-purple-400 to-purple-600' :
                                                        'bg-gradient-to-br from-yellow-400 to-yellow-600'
                                        }`}>
                                        <step.icon className="w-10 h-10 text-white"/>
                                    </div>

                                    <Badge
                                        className="mb-4 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                                        Step {step.number}
                                    </Badge>

                                    <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                                    <p className="text-base text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                                        {step.description}
                                    </p>

                                    <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                                        {step.details.map((detail, i) => (
                                            <div key={i}
                                                 className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                                                <CheckCircle2
                                                    className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0"/>
                                                <span className="font-medium">{detail}</span>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {/* Trading Types */}
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.5}}
                        viewport={{once: true}}
                        className="mb-20"
                    >
                        <h2 className="text-4xl font-bold text-center mb-12">What Can You Trade?</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {tradingTypes.map((type, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{opacity: 0, scale: 0.9}}
                                    whileInView={{opacity: 1, scale: 1}}
                                    transition={{duration: 0.3, delay: idx * 0.1}}
                                    viewport={{once: true}}
                                >
                                    <Card
                                        className="p-8 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-3xl text-center hover-lift">
                                        <div
                                            className="w-16 h-16 mx-auto mb-6 bg-yellow-100 dark:bg-yellow-900/20 rounded-2xl flex items-center justify-center">
                                            <type.icon className="w-8 h-8 text-yellow-600 dark:text-yellow-400"/>
                                        </div>
                                        <h4 className="text-xl font-bold mb-3">{type.title}</h4>
                                        <p className="text-base text-gray-600 dark:text-gray-400 mb-4">{type.description}</p>
                                        <Badge
                                            className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm px-4 py-2">
                                            {type.example}
                                        </Badge>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Benefits Bar */}
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.5}}
                        viewport={{once: true}}
                        className="mb-20"
                    >
                        <Card
                            className="p-10 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10 border-2 border-yellow-200 dark:border-yellow-800 rounded-3xl">
                            <div className="grid md:grid-cols-3 gap-10">
                                {benefits.map((benefit, idx) => (
                                    <div key={idx} className="text-center">
                                        <div
                                            className="w-14 h-14 mx-auto mb-5 bg-yellow-500 rounded-2xl flex items-center justify-center shadow-lg">
                                            <benefit.icon className="w-7 h-7 text-white"/>
                                        </div>
                                        <h4 className="text-lg font-bold mb-3">{benefit.title}</h4>
                                        <p className="text-base text-gray-600 dark:text-gray-400">{benefit.description}</p>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </motion.div>

                    {/* Video Tutorial Section */}
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.5}}
                        viewport={{once: true}}
                    >
                        <Card
                            className="p-10 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-3xl">
                            <div className="grid md:grid-cols-2 gap-10 items-center">
                                <div>
                                    <Badge
                                        className="bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 px-4 py-2 mb-5">
                                        Quick Tutorial
                                    </Badge>
                                    <h3 className="text-4xl font-bold mb-5">Learn in 5 Minutes</h3>
                                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                                        Watch our comprehensive video guide to understand how ZONIX works. Learn about
                                        district tokens,
                                        state indices, AI funds, and trading strategies from our experts.
                                    </p>
                                    <div className="space-y-4 mb-8">
                                        {[
                                            'Platform overview and navigation',
                                            'How to research and analyze districts',
                                            'Executing your first trade',
                                            'Understanding AI recommendations',
                                            'Managing your portfolio',
                                        ].map((topic, idx) => (
                                            <div key={idx} className="flex items-center gap-3 text-base font-medium">
                                                <div className="w-2 h-2 bg-yellow-500 rounded-full"/>
                                                <span>{topic}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <Button size="lg"
                                            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white text-base px-8">
                                        <Play className="w-5 h-5 mr-2"/>
                                        Watch Tutorial
                                    </Button>
                                </div>
                                <div
                                    className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-2xl aspect-video flex items-center justify-center">
                                    <div className="text-center">
                                        <div
                                            className="w-24 h-24 mx-auto mb-4 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center shadow-xl">
                                            <div
                                                className="w-0 h-0 border-t-[14px] border-t-transparent border-l-[20px] border-l-purple-600 border-b-[14px] border-b-transparent ml-2"/>
                                        </div>
                                        <p className="text-base font-semibold text-gray-500 dark:text-gray-400">5 minute
                                            tutorial video</p>
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
