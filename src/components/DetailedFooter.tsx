import {motion} from 'motion/react';
import {
    ArrowUpRight,
    Award,
    CheckCircle,
    Clock,
    Facebook,
    FileText,
    Globe,
    Heart,
    Instagram,
    Linkedin,
    Mail,
    MapPin,
    Phone,
    Send,
    Shield,
    Twitter,
    Youtube,
    Zap,
} from 'lucide-react';
import {Input} from './ui/input';
import {Button} from './ui/button';
import {Badge} from './ui/badge';
import {Card} from './ui/card';
import {FormEvent, useState} from 'react';
import {Logo} from './Logo';
import {useNavigate} from "react-router-dom";

export function DetailedFooter() {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);
    const navigate = useNavigate();

    const handleSubscribe = (e: FormEvent) => {
        e.preventDefault();
        setSubscribed(true);
        setTimeout(() => {
            setEmail('');
            setSubscribed(false);
        }, 3000);
    };

    const footerLinks = {
        products: [
            {label: 'District Tokens', page: 'district-browser'},
            {label: 'State Indices', page: 'explore-district'},
            {label: 'F&O Trading', page: 'state-fno'},
            {label: 'Mutual Funds', page: 'mutual-funds'},
            {label: 'Portfolio Manager', page: 'dashboard'},
            {label: 'Market Analytics', page: 'insights'},
        ],
        company: [
            {label: 'About Us', page: 'about'},
            {label: 'How It Works', page: 'how-it-works'},
            {label: 'Features', page: 'features'},
            {label: 'Pricing', page: 'pricing'},
            {label: 'Careers', page: 'contact'},
            {label: 'Press Kit', page: 'contact'},
        ],
        resources: [
            {label: 'Blog & Insights', page: 'insights'},
            {label: 'Help Center', page: 'contact'},
            {label: 'API Documentation', page: 'contact'},
            {label: 'Investment Guide', page: 'how-it-works'},
            {label: 'Market Reports', page: 'insights'},
            {label: 'Webinars', page: 'contact'},
        ],
        legal: [
            {label: 'Privacy Policy', page: 'contact'},
            {label: 'Terms of Service', page: 'contact'},
            {label: 'Risk Disclosure', page: 'contact'},
            {label: 'Refund Policy', page: 'contact'},
            {label: 'Regulatory Compliance', page: 'contact'},
            {label: 'Investor Charter', page: 'contact'},
        ],
    };

    const socialLinks = [
        {icon: Facebook, href: '#', label: 'Facebook', color: 'blue'},
        {icon: Twitter, href: '#', label: 'Twitter', color: 'sky'},
        {icon: Linkedin, href: '#', label: 'LinkedIn', color: 'blue'},
        {icon: Instagram, href: '#', label: 'Instagram', color: 'pink'},
        {icon: Youtube, href: '#', label: 'YouTube', color: 'red'},
    ];

    return (
        <footer
            className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-950 dark:to-black border-t-2 border-yellow-400/20 relative overflow-hidden">
            {/* Background Pattern */}
            <div
                className="absolute inset-0 bg-[linear-gradient(rgba(252,211,77,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(252,211,77,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"/>

            {/* Gradient Orbs */}
            <div
                className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none"/>
            <div
                className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl pointer-events-none"/>

            {/* Newsletter Section */}
            <div className="relative border-b border-gray-200 dark:border-gray-800 py-20 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{opacity: 0, x: -30}}
                            whileInView={{opacity: 1, x: 0}}
                            viewport={{once: true}}
                            transition={{duration: 0.6}}
                        >
                            <Badge
                                className="mb-6 bg-yellow-100 dark:bg-yellow-950/30 text-yellow-700 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700">
                                <Zap className="w-4 h-4 mr-2"/>
                                Newsletter
                            </Badge>
                            <h2 className="text-4xl lg:text-5xl mb-4">
                                Stay Updated with{' '}
                                <span
                                    className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                  ZONIX
                </span>
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                                Get the latest market insights, district performance updates, and exclusive investment
                                opportunities delivered to your inbox every week.
                            </p>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-500"/>
                                    <span>Weekly insights</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-500"/>
                                    <span>Market alerts</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-500"/>
                                    <span>Exclusive offers</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{opacity: 0, x: 30}}
                            whileInView={{opacity: 1, x: 0}}
                            viewport={{once: true}}
                            transition={{duration: 0.6}}
                        >
                            <Card
                                className="p-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-2 border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl">
                                <form onSubmit={handleSubscribe} className="space-y-4">
                                    <div className="relative">
                                        <Mail
                                            className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
                                        <Input
                                            type="email"
                                            placeholder="Enter your email address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="pl-14 h-16 rounded-xl border-2 border-gray-200 dark:border-gray-800 focus:border-yellow-400 bg-white dark:bg-black text-lg"
                                            required
                                            disabled={subscribed}
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        disabled={subscribed}
                                        className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black h-16 rounded-xl shadow-lg relative overflow-hidden group"
                                    >
                                        {subscribed ? (
                                            <motion.span
                                                initial={{scale: 0}}
                                                animate={{scale: 1}}
                                                className="flex items-center gap-2"
                                            >
                                                <CheckCircle className="w-5 h-5"/>
                                                Subscribed!
                                            </motion.span>
                                        ) : (
                                            <>
                                                <motion.div
                                                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
                                                    animate={{
                                                        x: ['-100%', '200%'],
                                                    }}
                                                    transition={{
                                                        duration: 2,
                                                        repeat: Infinity,
                                                        repeatDelay: 1,
                                                    }}
                                                />
                                                <span className="relative flex items-center gap-2">
                          <Send className="w-5 h-5"/>
                          Subscribe Now
                        </span>
                                            </>
                                        )}
                                    </Button>
                                </form>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
                                    By subscribing, you agree to our Privacy Policy and consent to receive updates.
                                </p>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="relative py-20 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
                        {/* Company Info */}
                        <motion.div
                            className="lg:col-span-2"
                            initial={{opacity: 0, y: 30}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true}}
                            transition={{duration: 0.6}}
                        >
                            <div
                                className="flex items-center gap-3 mb-8 cursor-pointer group"
                                onClick={() => navigate('landing')}
                            >
                                <div className="relative">
                                    <div
                                        className="absolute inset-0 bg-yellow-400 blur-xl opacity-50 rounded-full group-hover:opacity-70 transition-opacity"/>
                                    <Logo size="md" showText={false}/>
                                </div>
                                <div>
                                    <h2 className="text-3xl bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                                        ZONIX
                                    </h2>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest -mt-1">
                                        Trade Bharat
                                    </p>
                                </div>
                            </div>

                            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed text-lg">
                                India's first decentralized financial ecosystem for district-level investments. Trade
                                the heartbeat of Bharat with cutting-edge AI and blockchain technology.
                            </p>

                            {/* Contact Info */}
                            <div className="space-y-4 mb-8">
                                {[
                                    {icon: Mail, text: 'support@zonix.in', color: 'yellow'},
                                    {icon: Phone, text: '8171-864-218 (Toll Free)', color: 'green'},
                                    {
                                        icon: MapPin,
                                        text: 'ZONIX Tower, Delhi Road, Saharanpur, UP 247001',
                                        color: 'blue'
                                    },
                                ].map((item, index) => (
                                    <motion.div
                                        key={item.text}
                                        initial={{opacity: 0, x: -20}}
                                        whileInView={{opacity: 1, x: 0}}
                                        viewport={{once: true}}
                                        transition={{duration: 0.4, delay: index * 0.1}}
                                        className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors group"
                                    >
                                        <div
                                            className={`w-10 h-10 rounded-lg bg-${item.color}-100 dark:bg-${item.color}-950/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                                            <item.icon
                                                className={`w-5 h-5 text-${item.color}-600 dark:text-${item.color}-400`}/>
                                        </div>
                                        <span className="pt-2">{item.text}</span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Social Links */}
                            <div className="flex gap-3">
                                {socialLinks.map((social, index) => (
                                    <motion.a
                                        key={social.label}
                                        href={social.href}
                                        initial={{opacity: 0, scale: 0}}
                                        whileInView={{opacity: 1, scale: 1}}
                                        viewport={{once: true}}
                                        transition={{duration: 0.3, delay: index * 0.05}}
                                        whileHover={{scale: 1.1, y: -5}}
                                        className="w-12 h-12 rounded-xl bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-yellow-400 hover:text-black hover:border-yellow-400 transition-all shadow-lg hover:shadow-xl"
                                        aria-label={social.label}
                                    >
                                        <social.icon className="w-5 h-5"/>
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>

                        {/* Links Columns */}
                        {[
                            {title: 'Products', links: footerLinks.products, icon: FileText},
                            {title: 'Company', links: footerLinks.company, icon: Globe},
                            {title: 'Resources', links: footerLinks.resources, icon: FileText},
                            {title: 'Legal', links: footerLinks.legal, icon: Shield},
                        ].map((section, sectionIndex) => (
                            <motion.div
                                key={section.title}
                                initial={{opacity: 0, y: 30}}
                                whileInView={{opacity: 1, y: 0}}
                                viewport={{once: true}}
                                transition={{duration: 0.6, delay: sectionIndex * 0.1}}
                            >
                                <div className="flex items-center gap-2 mb-8">
                                    <div
                                        className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center">
                                        <section.icon className="w-4 h-4 text-black"/>
                                    </div>
                                    <h3 className="text-lg">{section.title}</h3>
                                </div>
                                <ul className="space-y-4">
                                    {section.links.map((link, linkIndex) => (
                                        <motion.li
                                            key={link.label}
                                            initial={{opacity: 0, x: -10}}
                                            whileInView={{opacity: 1, x: 0}}
                                            viewport={{once: true}}
                                            transition={{duration: 0.3, delay: linkIndex * 0.03}}
                                        >
                                            <button
                                                onClick={() => navigate(link.page)}
                                                className="text-gray-600 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors flex items-center gap-2 group"
                                            >
                                                <ArrowUpRight
                                                    className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"/>
                                                <span>{link.label}</span>
                                            </button>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>

                    {/* Certification Badges */}
                    <motion.div
                        initial={{opacity: 0, y: 30}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{duration: 0.6}}
                        className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
                    >
                        {[
                            {icon: Shield, title: 'SEBI Registered', subtitle: 'Verified & Compliant', color: 'green'},
                            {icon: Award, title: 'ISO 27001', subtitle: 'Security Certified', color: 'yellow'},
                            {icon: CheckCircle, title: 'RBI Member', subtitle: 'Banking Partner', color: 'purple'},
                            {icon: Award, title: 'AMFI Certified', subtitle: 'Mutual Fund Expert', color: 'red'},
                        ].map((cert, index) => (
                            <motion.div
                                key={cert.title}
                                initial={{opacity: 0, scale: 0.9}}
                                whileInView={{opacity: 1, scale: 1}}
                                viewport={{once: true}}
                                transition={{duration: 0.4, delay: index * 0.1}}
                                whileHover={{scale: 1.05, y: -5}}
                            >
                                <Card
                                    className={`p-6 bg-gradient-to-br from-${cert.color}-50 to-${cert.color}-100 dark:from-${cert.color}-950/20 dark:to-${cert.color}-900/10 border-2 border-${cert.color}-200 dark:border-${cert.color}-800 rounded-2xl shadow-lg hover:shadow-xl transition-all`}>
                                    <div className="flex items-center gap-4">
                                        <div
                                            className={`w-14 h-14 bg-${cert.color}-100 dark:bg-${cert.color}-900/30 rounded-xl flex items-center justify-center`}>
                                            <cert.icon
                                                className={`w-7 h-7 text-${cert.color}-600 dark:text-${cert.color}-400`}/>
                                        </div>
                                        <div>
                                            <h4 className="text-sm mb-1">{cert.title}</h4>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">{cert.subtitle}</p>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Disclaimer */}
                    <motion.div
                        initial={{opacity: 0, y: 30}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{duration: 0.6}}
                        className="mb-12"
                    >
                        <Card
                            className="p-8 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950/20 dark:to-yellow-900/10 border-2 border-yellow-200 dark:border-yellow-800 rounded-2xl">
                            <div className="flex items-start gap-4">
                                <div
                                    className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Shield className="w-6 h-6 text-black"/>
                                </div>
                                <div>
                                    <h4 className="text-lg mb-3 text-gray-900 dark:text-white">Important Disclaimer</h4>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                        ZONIX is registered with SEBI and operates in compliance with Indian financial
                                        regulations. All investments are subject to market risks. Past performance is
                                        not indicative of future returns. Please read all scheme-related documents
                                        carefully before investing. District-based assets are innovative financial
                                        instruments and carry specific risks. Investors should conduct their own
                                        research or consult a certified financial advisor before making investment
                                        decisions. The value of investments may go up or down depending on various
                                        market factors.
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Bottom Bar */}
                    <div className="pt-12 border-t-2 border-gray-200 dark:border-gray-800">
                        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                            <motion.div
                                initial={{opacity: 0}}
                                whileInView={{opacity: 1}}
                                viewport={{once: true}}
                                transition={{duration: 0.6}}
                                className="flex items-center gap-3 text-gray-600 dark:text-gray-400"
                            >
                                <p className="text-sm">
                                    © 2025 ZONIX Financial Technologies Pvt. Ltd. All rights reserved.
                                </p>
                                <span className="hidden lg:inline">•</span>
                                <p className="text-sm flex items-center gap-1">
                                    Made with <Heart className="w-4 h-4 text-red-500 fill-red-500"/> in Bharat 🇮🇳
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{opacity: 0}}
                                whileInView={{opacity: 1}}
                                viewport={{once: true}}
                                transition={{duration: 0.6, delay: 0.2}}
                                className="flex flex-wrap items-center gap-4"
                            >
                                <Badge
                                    className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20 text-xs">
                                    <CheckCircle className="w-3 h-3 mr-1"/>
                                    SEBI Registered
                                </Badge>
                                <Badge
                                    className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 text-xs">
                                    <Shield className="w-3 h-3 mr-1"/>
                                    Bank-Grade Security
                                </Badge>
                                <Badge
                                    className="bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20 text-xs">
                                    <Clock className="w-3 h-3 mr-1"/>
                                    24/7 Support
                                </Badge>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{opacity: 0}}
                            whileInView={{opacity: 1}}
                            viewport={{once: true}}
                            transition={{duration: 0.6, delay: 0.3}}
                            className="mt-6 flex flex-wrap gap-4 justify-center lg:justify-end text-xs text-gray-500 dark:text-gray-400"
                        >
                            <span>CIN: U67120MH2024PTC123456</span>
                            <span>•</span>
                            <span>SEBI Reg: INZ000123456</span>
                            <span>•</span>
                            <span>RBI Member: 12345</span>
                            <span>•</span>
                            <span>ISO 27001:2013 Certified</span>
                        </motion.div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
