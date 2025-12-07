import {motion} from 'motion/react';
import {Card} from './ui/card';
import {Badge} from './ui/badge';
import {Button} from './ui/button';
import {Header} from './Header';
import {DetailedFooter} from './DetailedFooter';
import {ArrowRight, Check, Crown, Shield, Sparkles, Star, TrendingUp, Users, Zap,} from 'lucide-react';
import {useNavigate} from "react-router-dom";

const plans = [
    {
        name: 'Starter',
        icon: Zap,
        price: '0',
        period: 'Forever Free',
        description: 'Perfect for beginners exploring hyperlocal trading',
        color: 'blue',
        popular: false,
        features: [
            'Trade up to 10 district tokens',
            'Access to 5 state indices',
            'Basic market analytics',
            'Standard customer support',
            '0.5% brokerage fee',
            'Mobile app access',
            'Email notifications',
        ],
    },
    {
        name: 'Professional',
        icon: Star,
        price: '499',
        period: 'per month',
        description: 'For active traders seeking advanced features',
        color: 'yellow',
        popular: true,
        features: [
            'Trade unlimited district tokens',
            'Access to all 36 state indices',
            'Advanced AI-powered analytics',
            'Priority customer support',
            '0.2% brokerage fee',
            'Real-time market data',
            'AI portfolio recommendations',
            'Advanced charting tools',
            'WhatsApp alerts',
            'Research reports',
        ],
        savings: 'Save ₹1,500/year',
    },
    {
        name: 'Enterprise',
        icon: Crown,
        price: 'Custom',
        period: 'Contact us',
        description: 'For institutions and high-volume traders',
        color: 'purple',
        popular: false,
        features: [
            'Everything in Professional',
            'Dedicated account manager',
            'Custom API access',
            'Institutional-grade analytics',
            'Zero brokerage fees',
            'White-label solutions',
            'Bulk trading capabilities',
            'Custom reporting',
            'SLA guarantee',
            'On-premise deployment option',
        ],
    },
];

const comparisonFeatures = [
    {name: 'District Tokens Access', starter: '10', professional: 'Unlimited', enterprise: 'Unlimited'},
    {name: 'State Indices', starter: '5', professional: '36', enterprise: '36'},
    {name: 'AI Insights', starter: 'Basic', professional: 'Advanced', enterprise: 'Enterprise'},
    {name: 'Brokerage Fee', starter: '0.5%', professional: '0.2%', enterprise: '0%'},
    {name: 'Support', starter: 'Email', professional: 'Priority', enterprise: 'Dedicated'},
    {name: 'API Access', starter: '✗', professional: '✓', enterprise: 'Custom'},
];

const trustIndicators = [
    {icon: Shield, text: 'SEBI Registered'},
    {icon: Users, text: '50K+ Traders'},
    {icon: TrendingUp, text: '₹1000Cr+ Volume'},
];

export function PricingPage() {
    const navigate = useNavigate();

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-white dark:from-black dark:via-purple-950/10 dark:to-black">
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
                            className="bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 px-6 py-3 text-sm mb-6">
                            Pricing Plans
                        </Badge>
                        <h1 className="text-6xl lg:text-7xl font-extrabold mb-8 tracking-tight leading-tight">
                            Choose Your
                            <br/>
                            <span
                                className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                Trading Plan
              </span>
                        </h1>
                        <p className="text-2xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto mb-10 leading-relaxed font-medium">
                            Transparent pricing with no hidden fees. Upgrade or downgrade anytime.
                        </p>

                        {/* Trust Indicators */}
                        <div
                            className="flex flex-wrap items-center justify-center gap-8 text-base text-gray-600 dark:text-gray-400">
                            {trustIndicators.map((indicator, idx) => (
                                <div key={idx} className="flex items-center gap-3 font-medium">
                                    <indicator.icon className="w-5 h-5 text-green-600 dark:text-green-400"/>
                                    <span>{indicator.text}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Pricing Cards */}
                    <div className="grid md:grid-cols-3 gap-8 mb-20">
                        {plans.map((plan, idx) => (
                            <motion.div
                                key={idx}
                                initial={{opacity: 0, y: 30}}
                                whileInView={{opacity: 1, y: 0}}
                                transition={{duration: 0.5, delay: idx * 0.1}}
                                viewport={{once: true}}
                                className={plan.popular ? 'md:-mt-8' : ''}
                            >
                                <Card className={`p-10 rounded-3xl h-full flex flex-col relative overflow-hidden ${
                                    plan.popular
                                        ? 'bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10 border-4 border-yellow-400 dark:border-yellow-600 shadow-2xl'
                                        : 'bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800'
                                }`}>
                                    {plan.popular && (
                                        <div
                                            className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black text-sm font-bold px-6 py-3 rounded-bl-3xl flex items-center gap-2">
                                            <Sparkles className="w-4 h-4"/>
                                            Most Popular
                                        </div>
                                    )}

                                    <div
                                        className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-8 shadow-lg ${
                                            plan.color === 'blue' ? 'bg-gradient-to-br from-blue-400 to-blue-600' :
                                                plan.color === 'yellow' ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' :
                                                    'bg-gradient-to-br from-purple-400 to-purple-600'
                                        }`}>
                                        <plan.icon className="w-10 h-10 text-white"/>
                                    </div>

                                    <h3 className="text-3xl font-bold mb-3">{plan.name}</h3>
                                    <p className="text-base text-gray-600 dark:text-gray-400 mb-8">{plan.description}</p>

                                    <div className="mb-8">
                                        {plan.price === 'Custom' ? (
                                            <div className="text-5xl font-bold">Custom</div>
                                        ) : (
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-5xl font-bold">₹{plan.price}</span>
                                                <span
                                                    className="text-base text-gray-600 dark:text-gray-400">/{plan.period}</span>
                                            </div>
                                        )}
                                        {plan.savings && (
                                            <Badge
                                                className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 mt-3 text-sm px-3 py-1">
                                                {plan.savings}
                                            </Badge>
                                        )}
                                    </div>

                                    <Button
                                        size="lg"
                                        onClick={() => navigate('signup')}
                                        className={`w-full mb-8 text-base font-semibold ${
                                            plan.popular
                                                ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black shadow-lg'
                                                : 'bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100'
                                        }`}
                                    >
                                        {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                                        <ArrowRight className="w-5 h-5 ml-2"/>
                                    </Button>

                                    <div className="space-y-4 flex-1">
                                        {plan.features.map((feature, i) => (
                                            <div key={i} className="flex items-start gap-3">
                                                <div
                                                    className="w-5 h-5 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <Check className="w-3 h-3 text-green-600 dark:text-green-400"/>
                                                </div>
                                                <span
                                                    className="text-sm font-medium text-gray-700 dark:text-gray-300">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {/* Comparison Table */}
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.5}}
                        viewport={{once: true}}
                        className="mb-20"
                    >
                        <h2 className="text-4xl font-bold text-center mb-12">Detailed Comparison</h2>
                        <Card
                            className="p-8 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-3xl overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                <tr className="border-b-2 border-gray-200 dark:border-gray-800">
                                    <th className="text-left py-5 px-6 text-base font-bold">Feature</th>
                                    <th className="text-center py-5 px-6 text-base font-bold">Starter</th>
                                    <th className="text-center py-5 px-6 text-base font-bold bg-yellow-50 dark:bg-yellow-900/10">
                                        Professional
                                        <Badge className="ml-2 bg-yellow-500 text-white text-xs">Popular</Badge>
                                    </th>
                                    <th className="text-center py-5 px-6 text-base font-bold">Enterprise</th>
                                </tr>
                                </thead>
                                <tbody>
                                {comparisonFeatures.map((feature, idx) => (
                                    <tr key={idx} className="border-b border-gray-200 dark:border-gray-800">
                                        <td className="py-5 px-6 text-base font-medium">{feature.name}</td>
                                        <td className="py-5 px-6 text-center text-base text-gray-600 dark:text-gray-400">
                                            {feature.starter}
                                        </td>
                                        <td className="py-5 px-6 text-center text-base font-semibold bg-yellow-50 dark:bg-yellow-900/10">
                                            {feature.professional}
                                        </td>
                                        <td className="py-5 px-6 text-center text-base text-gray-600 dark:text-gray-400">
                                            {feature.enterprise}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </Card>
                    </motion.div>

                    {/* FAQ Section */}
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.5}}
                        viewport={{once: true}}
                        className="mb-20"
                    >
                        <h2 className="text-4xl font-bold text-center mb-12">Pricing FAQs</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {[
                                {
                                    q: 'Can I switch plans anytime?',
                                    a: 'Yes! You can upgrade or downgrade your plan anytime. Changes take effect immediately.',
                                },
                                {
                                    q: 'Are there any hidden fees?',
                                    a: 'No hidden fees. Only the brokerage mentioned in your plan applies to trades.',
                                },
                                {
                                    q: 'Do you offer refunds?',
                                    a: 'Yes, we offer a 30-day money-back guarantee for all paid plans.',
                                },
                                {
                                    q: 'What payment methods do you accept?',
                                    a: 'We accept UPI, credit/debit cards, net banking, and bank transfers.',
                                },
                            ].map((faq, idx) => (
                                <Card key={idx}
                                      className="p-8 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-3xl">
                                    <h4 className="text-lg font-bold mb-3">{faq.q}</h4>
                                    <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">{faq.a}</p>
                                </Card>
                            ))}
                        </div>
                    </motion.div>

                    {/* Enterprise CTA */}
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.5}}
                        viewport={{once: true}}
                    >
                        <Card
                            className="p-12 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/10 dark:to-indigo-900/10 border-2 border-purple-200 dark:border-purple-800 rounded-3xl text-center">
                            <div
                                className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-400 to-purple-600 rounded-3xl flex items-center justify-center shadow-lg">
                                <Crown className="w-10 h-10 text-white"/>
                            </div>
                            <h3 className="text-3xl font-bold mb-4">Need an Enterprise Solution?</h3>
                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
                                Get custom pricing, dedicated support, and enterprise-grade features tailored to your
                                organization's needs.
                            </p>
                            <Button size="lg"
                                    className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white text-base px-8">
                                Contact Sales Team
                                <ArrowRight className="w-5 h-5 ml-2"/>
                            </Button>
                        </Card>
                    </motion.div>
                </div>
            </section>

            <DetailedFooter/>
        </div>
    );
}
