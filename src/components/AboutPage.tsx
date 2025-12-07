import {motion} from 'motion/react';
import {Card} from './ui/card';
import {Badge} from './ui/badge';
import {Button} from './ui/button';
import {
    ArrowRight,
    Award,
    CheckCircle2,
    Globe,
    Heart,
    MapPin,
    Rocket,
    Shield,
    Sparkles,
    Target,
    TrendingUp,
    Users,
} from 'lucide-react';
import {Header} from './Header';
import {DetailedFooter} from './DetailedFooter';
import {useNavigate} from "react-router-dom";

export function AboutPage() {
    const navigate = useNavigate();
    const stats = [
        {icon: Users, value: '50K+', label: 'Active Investors', color: 'yellow'},
        {icon: MapPin, value: '805', label: 'Districts Covered', color: 'blue'},
        {icon: TrendingUp, value: '₹100Cr+', label: 'Daily Volume', color: 'green'},
        {icon: Award, value: '98%', label: 'Satisfaction Rate', color: 'purple'},
    ];

    const values = [
        {
            icon: Target,
            title: 'Mission Driven',
            description: 'Democratizing access to hyperlocal investment opportunities across every district of India.',
            color: 'yellow',
        },
        {
            icon: Shield,
            title: 'Trust & Security',
            description: 'Bank-grade encryption and SEBI-registered platform ensuring your investments are always safe.',
            color: 'green',
        },
        {
            icon: Sparkles,
            title: 'AI-Powered',
            description: 'Leveraging cutting-edge artificial intelligence to provide smart investment recommendations.',
            color: 'purple',
        },
        {
            icon: Heart,
            title: 'Customer First',
            description: 'Building products that put our investors at the center of everything we do.',
            color: 'red',
        },
    ];

    const team = [
        {name: 'Rajesh Kumar', role: 'Founder & CEO', avatar: 'RK'},
        {name: 'Priya Sharma', role: 'CTO', avatar: 'PS'},
        {name: 'Amit Patel', role: 'CFO', avatar: 'AP'},
        {name: 'Sneha Reddy', role: 'Head of AI', avatar: 'SR'},
    ];

    const milestones = [
        {
            year: '2022',
            title: 'Founded',
            description: 'ZONIX was established with a vision to democratize district-level investing'
        },
        {
            year: '2023',
            title: 'SEBI Registration',
            description: 'Received official SEBI registration and launched beta platform'
        },
        {
            year: '2024',
            title: '50K Users',
            description: 'Crossed 50,000 active investors and ₹100Cr+ daily trading volume'
        },
        {
            year: '2025',
            title: 'AI Integration',
            description: 'Launched AI-powered mutual funds and smart portfolio recommendations'
        },
    ];

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-yellow-50 dark:from-black dark:via-gray-950 dark:to-yellow-950/10">
            <Header/>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 lg:px-8 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div
                        className="absolute top-20 right-20 w-96 h-96 bg-yellow-200/20 dark:bg-yellow-500/10 rounded-full blur-3xl"/>
                    <div
                        className="absolute bottom-20 left-20 w-96 h-96 bg-purple-200/20 dark:bg-purple-500/10 rounded-full blur-3xl"/>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        className="text-center mb-16"
                    >
                        <Badge
                            className="mb-6 bg-yellow-100 dark:bg-yellow-950/30 text-yellow-700 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700/50 px-4 py-2">
                            <Globe className="w-4 h-4 mr-2"/>
                            About ZONIX
                        </Badge>
                        <h1 className="text-5xl lg:text-6xl mb-6">
                            Building India's
                            <br/>
                            <span
                                className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                Financial Future
              </span>
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                            We're on a mission to democratize hyperlocal investing, enabling every Indian to participate
                            in the growth story of their district and state.
                        </p>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.2}}
                        className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: 0.3 + index * 0.1}}
                            >
                                <Card
                                    className="p-6 text-center bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-2 border-gray-200/50 dark:border-gray-800/50 rounded-2xl hover:border-yellow-400/50 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-yellow-500/10">
                                    <div
                                        className="w-14 h-14 bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-950/40 dark:to-yellow-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                                        <stat.icon className="w-7 h-7 text-yellow-600 dark:text-yellow-400"/>
                                    </div>
                                    <h3 className="text-3xl mb-2">{stat.value}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Story Section */}
                    <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
                        <motion.div
                            initial={{opacity: 0, x: -20}}
                            animate={{opacity: 1, x: 0}}
                            transition={{delay: 0.4}}
                        >
                            <h2 className="text-4xl mb-6">Our Story</h2>
                            <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                                <p>
                                    ZONIX was born from a simple yet powerful idea: What if every Indian could invest in
                                    the economic growth of their own district? What if local development wasn't just a
                                    government initiative, but a community-driven investment opportunity?
                                </p>
                                <p>
                                    In 2022, a group of financial technology enthusiasts and economists came together
                                    with this vision. We saw that while India's economy was growing rapidly, the tools
                                    to invest in hyperlocal growth were limited to institutional investors.
                                </p>
                                <p>
                                    Today, ZONIX stands as India's first SEBI-registered platform for district-level
                                    investing, powered by cutting-edge AI and blockchain technology. We've democratized
                                    access to 805 districts, 36 states, and created a new asset class that connects
                                    investors directly to Bharat's heartbeat.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{opacity: 0, x: 20}}
                            animate={{opacity: 1, x: 0}}
                            transition={{delay: 0.5}}
                        >
                            <Card
                                className="p-8 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950/30 dark:to-yellow-900/20 border-2 border-yellow-300 dark:border-yellow-700/50 rounded-3xl">
                                <div className="flex items-center gap-3 mb-6">
                                    <div
                                        className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center">
                                        <Rocket className="w-6 h-6 text-black"/>
                                    </div>
                                    <h3 className="text-2xl">Our Vision</h3>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                                    To become the world's leading platform for hyperlocal investing, enabling
                                    communities to invest in their own growth while creating sustainable wealth for
                                    millions of Indians.
                                </p>
                                <div className="flex items-center gap-2 text-yellow-700 dark:text-yellow-400">
                                    <CheckCircle2 className="w-5 h-5"/>
                                    <span className="text-sm">Empowering 1 Billion Indians by 2030</span>
                                </div>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Values */}
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.6}}
                        className="mb-20"
                    >
                        <div className="text-center mb-12">
                            <h2 className="text-4xl mb-4">Our Core Values</h2>
                            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                                The principles that guide everything we do at ZONIX
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {values.map((value, index) => (
                                <motion.div
                                    key={value.title}
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.7 + index * 0.1}}
                                >
                                    <Card
                                        className="p-6 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-2 border-gray-200/50 dark:border-gray-800/50 rounded-2xl hover:border-yellow-400/50 transition-all duration-300 h-full">
                                        <div
                                            className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-950/40 dark:to-yellow-900/30 rounded-xl flex items-center justify-center mb-4">
                                            <value.icon className="w-6 h-6 text-yellow-600 dark:text-yellow-400"/>
                                        </div>
                                        <h3 className="text-xl mb-3">{value.title}</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                            {value.description}
                                        </p>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Timeline */}
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.8}}
                        className="mb-20"
                    >
                        <div className="text-center mb-12">
                            <h2 className="text-4xl mb-4">Our Journey</h2>
                            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                                Key milestones in our mission to democratize hyperlocal investing
                            </p>
                        </div>
                        <div className="relative">
                            <div
                                className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-yellow-400 to-yellow-600 transform -translate-x-1/2 hidden lg:block"/>
                            <div className="space-y-12">
                                {milestones.map((milestone, index) => (
                                    <motion.div
                                        key={milestone.year}
                                        initial={{opacity: 0, x: index % 2 === 0 ? -20 : 20}}
                                        animate={{opacity: 1, x: 0}}
                                        transition={{delay: 0.9 + index * 0.1}}
                                        className={`flex items-center gap-8 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                                    >
                                        <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                                            <Card
                                                className="p-6 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-2 border-gray-200/50 dark:border-gray-800/50 rounded-2xl inline-block w-full lg:w-auto">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <Badge
                                                        className="bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-500/50">
                                                        {milestone.year}
                                                    </Badge>
                                                    <h3 className="text-xl">{milestone.title}</h3>
                                                </div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {milestone.description}
                                                </p>
                                            </Card>
                                        </div>
                                        <div
                                            className="hidden lg:block w-4 h-4 bg-yellow-400 rounded-full border-4 border-white dark:border-black relative z-10"/>
                                        <div className="flex-1"/>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* CTA */}
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 1.2}}
                    >
                        <Card
                            className="p-12 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950/30 dark:to-yellow-900/20 border-2 border-yellow-300 dark:border-yellow-700/50 rounded-3xl text-center">
                            <h2 className="text-4xl mb-4">Join Our Journey</h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                                Be part of India's financial revolution. Start investing in your district's future
                                today.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    size="lg"
                                    onClick={() => navigate('signup')}
                                    className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-6 rounded-xl shadow-xl shadow-yellow-500/30"
                                >
                                    Start Investing
                                    <ArrowRight className="ml-2 w-5 h-5"/>
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    onClick={() => navigate('contact')}
                                    className="px-8 py-6 rounded-xl border-2 border-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-950/20"
                                >
                                    Contact Us
                                </Button>
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </section>

            <DetailedFooter/>
        </div>
    );
}
