import {motion, useScroll, useTransform} from 'motion/react';
import {Button} from './ui/button';
import {Badge} from './ui/badge';
import {Card} from './ui/card';
import {
    Activity,
    ArrowRight,
    Award,
    BarChart3,
    Brain,
    CheckCircle,
    ChevronRight,
    Globe,
    LineChart,
    Lock,
    MapPin,
    Rocket,
    Shield,
    Smartphone,
    Sparkles,
    TrendingUp,
    Users,
} from 'lucide-react';
import {Header} from './Header';
import {DetailedFooter} from './DetailedFooter';
import {useState} from 'react';
import {useNavigate} from "react-router-dom";

export function LandingPage() {
    const {scrollYProgress} = useScroll();
    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
    const [videoPlaying, setVideoPlaying] = useState(false);
    const navigate = useNavigate();

    // State data for the hero card
    const topStates = [
        {name: 'Maharashtra', value: '₹38L Cr', color: 'from-emerald-500 to-green-600'},
        {name: 'Tamil Nadu', value: '₹24L Cr', color: 'from-purple-500 to-pink-600'},
        {name: 'Karnataka', value: '₹22L Cr', color: 'from-red-500 to-orange-600'},
        {name: 'Gujarat', value: '₹21L Cr', color: 'from-yellow-500 to-amber-600'},
    ];

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-gray-50 via-amber-50/30 to-yellow-50/50 dark:from-black dark:via-gray-950 dark:to-yellow-950/10 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Gradient Orbs */}
                <motion.div
                    className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] bg-gradient-to-br from-yellow-400/20 to-yellow-600/10 dark:from-yellow-400/10 dark:to-yellow-600/5 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                        rotate: [0, 90, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] bg-gradient-to-tr from-purple-400/10 to-blue-500/10 dark:from-purple-400/5 dark:to-blue-500/5 rounded-full blur-3xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.2, 0.5, 0.2],
                        rotate: [0, -90, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                {/* Floating Particles */}
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1.5 h-1.5 bg-yellow-400/20 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.2, 0.6, 0.2],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            <Header/>

            {/* Hero Section */}
            <section className="relative pt-20 md:pt-32 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        {/* Left Content */}
                        <motion.div
                            initial={{opacity: 0, y: 30}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.8}}
                            className="relative z-10 order-2 lg:order-1"
                        >
                            {/* Badge */}
                            <motion.div
                                initial={{opacity: 0, y: -20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: 0.2}}
                                className="inline-block mb-6 sm:mb-8"
                            >
                                <Badge
                                    className="px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-yellow-400 to-amber-500 text-black border-0 shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/40 transition-all text-xs sm:text-sm">
                                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-2"/>
                                    India's First Fastest-Level Trading Platform
                                </Badge>
                            </motion.div>

                            {/* Heading */}
                            <motion.div
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: 0.3}}
                            >
                                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-6">
                                    <span className="block">Trade The</span>
                                    <span
                                        className="block bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-600 bg-clip-text text-transparent font-black">
                    Heart Beat
                  </span>
                                    <span className="block">Of Bharat</span>
                                </h1>
                            </motion.div>

                            {/* Subtitle */}
                            <motion.p
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: 0.4}}
                                className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 sm:mb-10 max-w-xl leading-relaxed"
                            >
                                Invest in India's future with district-level tokens, state indices, and AI-powered
                                mutual funds. Trade 805 districts across 36 states with bank-grade security.
                            </motion.p>

                            {/* CTAs */}
                            <motion.div
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: 0.5}}
                                className="flex flex-col sm:flex-row gap-4 sm:gap-4"
                            >
                                <Button
                                    onClick={() => navigate('signup')}
                                    size="lg"
                                    className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black shadow-xl shadow-yellow-500/30 hover:shadow-yellow-500/50 transition-all h-12 sm:h-14 text-base sm:text-lg px-6 sm:px-8 group"
                                >
                                    Start Trading Free
                                    <ArrowRight
                                        className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"/>
                                </Button>
                                <Button
                                    onClick={() => navigate('features')}
                                    size="lg"
                                    variant="outline"
                                    className="border-2 border-gray-300 dark:border-gray-700 hover:border-yellow-500 dark:hover:border-yellow-500 hover:bg-yellow-500/10 transition-all h-12 sm:h-14 text-base sm:text-lg px-6 sm:px-8 group"
                                >
                                    Explore Features
                                    <ChevronRight
                                        className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"/>
                                </Button>
                            </motion.div>
                        </motion.div>

                        {/* Right Content - India GDP Card */}
                        <motion.div
                            initial={{opacity: 0, x: 30}}
                            animate={{opacity: 1, x: 0}}
                            transition={{duration: 0.8, delay: 0.3}}
                            className="relative z-10 order-1 lg:order-2"
                        >
                            <Card
                                className="p-6 sm:p-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-2 border-gray-200 dark:border-gray-800 shadow-2xl shadow-gray-900/10 dark:shadow-yellow-500/5 rounded-3xl">
                                {/* Globe Icon */}
                                <div className="absolute top-6 right-6 sm:top-8 sm:right-8">
                                    <div
                                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-lg">
                                        <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-black"/>
                                    </div>
                                </div>

                                {/* India's GDP */}
                                <div className="mb-6 sm:mb-8">
                                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2">India's GDP
                                        (2024)</p>
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-2">₹297 Lakh Cr</h2>
                                    <div className="flex items-center gap-2">
                                        <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-500"/>
                                        <span
                                            className="text-sm sm:text-base text-green-600 dark:text-green-400 font-semibold">+7.2% YoY Growth</span>
                                    </div>
                                </div>

                                {/* State Cards Grid */}
                                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                                    {topStates.map((state, index) => (
                                        <motion.div
                                            key={state.name}
                                            initial={{opacity: 0, scale: 0.9}}
                                            animate={{opacity: 1, scale: 1}}
                                            transition={{delay: 0.5 + index * 0.1}}
                                            className="p-3 sm:p-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 hover:border-yellow-500 dark:hover:border-yellow-500 transition-all cursor-pointer group"
                                        >
                                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">{state.name}</p>
                                            <p className={`text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r ${state.color} bg-clip-text text-transparent group-hover:scale-105 transition-transform`}>
                                                {state.value}
                                            </p>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Security Badge */}
                                <div
                                    className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-800">
                                    <Lock className="w-3 h-3 sm:w-4 sm:h-4"/>
                                    <span>Bank-grade security • SEBI Registered</span>
                                </div>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Stats Cards */}
                    <motion.div
                        initial={{opacity: 0, y: 30}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.7, duration: 0.8}}
                        className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-12 sm:mt-16 md:mt-20"
                    >
                        {[
                            {icon: Users, label: 'Active Traders', value: '50K+', color: 'from-blue-500 to-cyan-600'},
                            {icon: MapPin, label: 'Districts', value: '805', color: 'from-green-500 to-emerald-600'},
                            {
                                icon: Activity,
                                label: 'Daily Volume',
                                value: '₹100Cr+',
                                color: 'from-purple-500 to-pink-600'
                            },
                            {icon: Award, label: 'Success Rate', value: '98%', color: 'from-orange-500 to-red-600'},
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: 0.8 + index * 0.1}}
                            >
                                <Card
                                    className="p-4 sm:p-6 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-gray-200 dark:border-gray-800 hover:border-yellow-500 dark:hover:border-yellow-500 transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer rounded-2xl">
                                    <div
                                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3 sm:mb-4 shadow-lg`}>
                                        <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white"/>
                                    </div>
                                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black mb-1 sm:mb-2">{stat.value}</h3>
                                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section
                className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-950/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{opacity: 0, y: 30}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{duration: 0.8}}
                        className="text-center mb-12 sm:mb-16"
                    >
                        <Badge
                            className="mb-4 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20">
                            Platform Features
                        </Badge>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
                            Everything You Need to
                            <span
                                className="block bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent">
                Trade Bharat
              </span>
                        </h2>
                        <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Powerful tools and insights to make informed investment decisions
                        </p>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {[
                            {
                                icon: MapPin,
                                title: 'District Tokens',
                                description: 'Trade 805 district tokens across all Indian states and union territories',
                                color: 'from-blue-500 to-cyan-600',
                            },
                            {
                                icon: BarChart3,
                                title: 'State Indices F&O',
                                description: 'Futures & Options trading on state-level economic indices',
                                color: 'from-green-500 to-emerald-600',
                            },
                            {
                                icon: Brain,
                                title: 'AI-Powered Funds',
                                description: 'Smart mutual funds optimized by advanced machine learning algorithms',
                                color: 'from-purple-500 to-pink-600',
                            },
                            {
                                icon: LineChart,
                                title: 'Real-time Analytics',
                                description: 'Live market data, charts, and comprehensive technical analysis tools',
                                color: 'from-orange-500 to-red-600',
                            },
                            {
                                icon: Shield,
                                title: 'Bank-Grade Security',
                                description: '256-bit encryption, 2FA, and SEBI-compliant trading infrastructure',
                                color: 'from-yellow-500 to-amber-600',
                            },
                            {
                                icon: Smartphone,
                                title: 'Mobile Trading',
                                description: 'Trade on-the-go with our fully responsive mobile-optimized platform',
                                color: 'from-teal-500 to-cyan-600',
                            },
                        ].map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{opacity: 0, y: 20}}
                                whileInView={{opacity: 1, y: 0}}
                                viewport={{once: true}}
                                transition={{delay: index * 0.1}}
                            >
                                <Card
                                    className="p-6 sm:p-8 h-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-gray-200 dark:border-gray-800 hover:border-yellow-500 dark:hover:border-yellow-500 transition-all hover:shadow-2xl hover:-translate-y-2 cursor-pointer rounded-2xl group">
                                    <div
                                        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 sm:mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                                        <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white"/>
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{feature.title}</h3>
                                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{opacity: 0, y: 30}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{duration: 0.8}}
                        className="text-center mb-12 sm:mb-16"
                    >
                        <Badge
                            className="mb-4 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20">
                            Simple Process
                        </Badge>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
                            Start Trading in
                            <span
                                className="block bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent">
                3 Easy Steps
              </span>
                        </h2>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
                        {[
                            {
                                step: '01',
                                title: 'Create Account',
                                description: 'Sign up in minutes with your email or mobile number. No complex forms.',
                                icon: Users,
                            },
                            {
                                step: '02',
                                title: 'Complete KYC',
                                description: 'Quick verification with Aadhaar. SEBI-compliant onboarding process.',
                                icon: CheckCircle,
                            },
                            {
                                step: '03',
                                title: 'Start Trading',
                                description: 'Deposit funds via UPI and start investing in district tokens instantly.',
                                icon: Rocket,
                            },
                        ].map((step, index) => (
                            <motion.div
                                key={step.step}
                                initial={{opacity: 0, y: 20}}
                                whileInView={{opacity: 1, y: 0}}
                                viewport={{once: true}}
                                transition={{delay: index * 0.2}}
                                className="relative"
                            >
                                <Card
                                    className="p-6 sm:p-8 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-gray-200 dark:border-gray-800 rounded-2xl hover:border-yellow-500 dark:hover:border-yellow-500 transition-all">
                                    <div
                                        className="absolute -top-4 -left-4 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-xl shadow-yellow-500/30">
                                        <span className="text-lg sm:text-2xl font-black text-black">{step.step}</span>
                                    </div>
                                    <div
                                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-yellow-500/20 to-amber-500/20 flex items-center justify-center mb-4 sm:mb-6 ml-8">
                                        <step.icon
                                            className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-600 dark:text-yellow-400"/>
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{step.title}</h3>
                                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                                        {step.description}
                                    </p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{opacity: 0, y: 30}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{duration: 0.8}}
                    >
                        <Card
                            className="relative overflow-hidden p-8 sm:p-12 md:p-16 bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-600 border-0 shadow-2xl shadow-yellow-500/30 rounded-3xl">
                            <div
                                className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

                            <div className="relative z-10 text-center">
                                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-black mb-4 sm:mb-6">
                                    Ready to Trade the
                                    <span className="block">Heartbeat of Bharat?</span>
                                </h2>
                                <p className="text-base sm:text-lg md:text-xl text-black/80 mb-8 sm:mb-10 max-w-2xl mx-auto">
                                    Join 50,000+ traders already investing in India's economic future
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button
                                        onClick={() => navigate('signup')}
                                        size="lg"
                                        className="bg-black hover:bg-gray-900 text-white shadow-2xl hover:shadow-black/50 transition-all h-12 sm:h-14 text-base sm:text-lg px-6 sm:px-10 group"
                                    >
                                        Start Trading Now
                                        <Rocket
                                            className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"/>
                                    </Button>
                                    <Button
                                        onClick={() => navigate('contact')}
                                        size="lg"
                                        variant="outline"
                                        className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border-2 border-black/20 hover:border-black/40 text-black transition-all h-12 sm:h-14 text-base sm:text-lg px-6 sm:px-10"
                                    >
                                        Contact Sales
                                    </Button>
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
