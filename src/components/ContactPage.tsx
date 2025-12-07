import * as React from 'react';
import {motion} from 'motion/react';
import {Card} from './ui/card';
import {Badge} from './ui/badge';
import {Button} from './ui/button';
import {Input} from './ui/input';
import {Textarea} from './ui/textarea';
import {Label} from './ui/label';
import {Header} from './Header';
import {DetailedFooter} from './DetailedFooter';
import {
    CheckCircle2,
    Clock,
    Facebook,
    Globe,
    Headphones,
    Instagram,
    Linkedin,
    Mail,
    MapPin,
    MessageSquare,
    Phone,
    Send,
    Twitter,
} from 'lucide-react';
import {toast} from 'sonner';

const contactMethods = [
    {
        icon: Mail,
        title: 'Email Support',
        description: 'Get responses within 2 hours',
        value: 'support@zonix.in',
        action: 'Send Email',
        color: 'blue',
    },
    {
        icon: Phone,
        title: 'Phone Support',
        description: '24/7 customer service',
        value: '+91 1800-123-4567',
        action: 'Call Now',
        color: 'green',
    },
    {
        icon: MessageSquare,
        title: 'Live Chat',
        description: 'Instant assistance available',
        value: 'Start a conversation',
        action: 'Chat Now',
        color: 'purple',
    },
    {
        icon: Headphones,
        title: 'Help Center',
        description: 'Browse FAQs and guides',
        value: 'Self-service resources',
        action: 'Visit Help Center',
        color: 'yellow',
    },
];

const offices = [
    {city: 'Mumbai', address: 'BKC, Mumbai - 400051', region: 'Headquarters'},
    {city: 'Bengaluru', address: 'Koramangala, Bengaluru - 560095', region: 'Tech Hub'},
    {city: 'Delhi', address: 'Connaught Place, New Delhi - 110001', region: 'North Region'},
];

const socialLinks = [
    {icon: Twitter, name: 'Twitter', url: '#'},
    {icon: Facebook, name: 'Facebook', url: '#'},
    {icon: Linkedin, name: 'LinkedIn', url: '#'},
    {icon: Instagram, name: 'Instagram', url: '#'},
];

export function ContactPage() {
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    const [submitted, setSubmitted] = React.useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetch('https://formsync.koyeb.app/api/public/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': '2o6lvtDzlnY7T0EtAmOz89G044PW47CYhA'
            },
            body: JSON.stringify(formData)
        }).then(res => res.json())
            .then(() => {
                setSubmitted(true);
                toast.success("Message sent successfully! We'll get back to you soon.");
                setFormData({name: '', email: '', phone: '', subject: '', message: ''});
            })
            .catch((error) => {
                console.log(error);
                toast.error("Something went wrong! Please try again later.");
            });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-white dark:from-black dark:via-blue-950/10 dark:to-black">
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
                            className="bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-6 py-3 text-sm mb-6">
                            Contact Us
                        </Badge>
                        <h1 className="text-6xl lg:text-7xl font-extrabold mb-8 tracking-tight leading-tight">
                            Get in{' '}
                            <span
                                className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                Touch
              </span>
                        </h1>
                        <p className="text-2xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed font-medium">
                            Have questions? We're here to help. Reach out through any of these channels.
                        </p>
                    </motion.div>

                    {/* Contact Methods */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                        {contactMethods.map((method, idx) => (
                            <motion.div
                                key={idx}
                                initial={{opacity: 0, y: 20}}
                                whileInView={{opacity: 1, y: 0}}
                                transition={{duration: 0.5, delay: idx * 0.1}}
                                viewport={{once: true}}
                            >
                                <Card
                                    className="p-8 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-3xl text-center hover-lift h-full">
                                    <div
                                        className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center shadow-lg ${
                                            method.color === 'blue' ? 'bg-gradient-to-br from-blue-400 to-blue-600' :
                                                method.color === 'green' ? 'bg-gradient-to-br from-green-400 to-green-600' :
                                                    method.color === 'purple' ? 'bg-gradient-to-br from-purple-400 to-purple-600' :
                                                        'bg-gradient-to-br from-yellow-400 to-yellow-600'
                                        }`}>
                                        <method.icon className="w-8 h-8 text-white"/>
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{method.title}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{method.description}</p>
                                    <p className="text-base font-semibold mb-6">{method.value}</p>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full text-sm font-semibold"
                                    >
                                        {method.action}
                                    </Button>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {/* Contact Form & Info */}
                    <div className="grid lg:grid-cols-3 gap-10">
                        {/* Contact Form */}
                        <motion.div
                            initial={{opacity: 0, x: -20}}
                            whileInView={{opacity: 1, x: 0}}
                            transition={{duration: 0.5}}
                            viewport={{once: true}}
                            className="lg:col-span-2"
                        >
                            <Card
                                className="p-10 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-3xl">
                                <h2 className="text-3xl font-bold mb-8">Send us a Message</h2>

                                {submitted ? (
                                    <motion.div
                                        initial={{opacity: 0, scale: 0.9}}
                                        animate={{opacity: 1, scale: 1}}
                                        className="text-center py-16"
                                    >
                                        <div
                                            className="w-24 h-24 mx-auto mb-6 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                                            <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400"/>
                                        </div>
                                        <h4 className="text-2xl font-bold mb-3">Message Sent!</h4>
                                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                                            Thank you for contacting us. We'll get back to you within 24 hours.
                                        </p>
                                        <Button onClick={() => setSubmitted(false)} variant="outline" size="lg">
                                            Send Another Message
                                        </Button>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <Label htmlFor="name" className="mb-2 block text-base font-semibold">Full
                                                    Name *</Label>
                                                <Input
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    placeholder="John Doe"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    className="rounded-xl text-base h-12"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="email" className="mb-2 block text-base font-semibold">Email
                                                    Address *</Label>
                                                <Input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    placeholder="john@example.com"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    className="rounded-xl text-base h-12"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <Label htmlFor="phone" className="mb-2 block text-base font-semibold">Phone
                                                    Number</Label>
                                                <Input
                                                    id="phone"
                                                    name="phone"
                                                    type="tel"
                                                    placeholder="+91 98765 43210"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className="rounded-xl text-base h-12"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="subject" className="mb-2 block text-base font-semibold">Subject
                                                    *</Label>
                                                <Input
                                                    id="subject"
                                                    name="subject"
                                                    type="text"
                                                    placeholder="How can we help?"
                                                    value={formData.subject}
                                                    onChange={handleChange}
                                                    required
                                                    className="rounded-xl text-base h-12"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <Label htmlFor="message" className="mb-2 block text-base font-semibold">Message
                                                *</Label>
                                            <Textarea
                                                id="message"
                                                name="message"
                                                placeholder="Tell us more about your inquiry..."
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                rows={6}
                                                minLength={15}
                                                className="rounded-xl resize-none text-base"
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            size="lg"
                                            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black text-base font-semibold h-14"
                                        >
                                            Send Message
                                            <Send className="w-5 h-5 ml-2"/>
                                        </Button>
                                    </form>
                                )}
                            </Card>
                        </motion.div>

                        {/* Contact Info Sidebar */}
                        <motion.div
                            initial={{opacity: 0, x: 20}}
                            whileInView={{opacity: 1, x: 0}}
                            transition={{duration: 0.5}}
                            viewport={{once: true}}
                            className="space-y-6"
                        >
                            {/* Office Hours */}
                            <Card
                                className="p-8 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-3xl">
                                <div className="flex items-center gap-3 mb-6">
                                    <div
                                        className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                                        <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400"/>
                                    </div>
                                    <h4 className="text-xl font-bold">Office Hours</h4>
                                </div>
                                <div className="space-y-3 text-base">
                                    <div className="flex justify-between">
                                        <span
                                            className="text-gray-600 dark:text-gray-400 font-medium">Monday - Friday</span>
                                        <span className="font-semibold">9:00 AM - 6:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400 font-medium">Saturday</span>
                                        <span className="font-semibold">10:00 AM - 4:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400 font-medium">Sunday</span>
                                        <span className="text-gray-500 font-semibold">Closed</span>
                                    </div>
                                </div>
                                <Badge
                                    className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 mt-6 w-full justify-center py-2 text-sm font-semibold">
                                    24/7 Phone Support Available
                                </Badge>
                            </Card>

                            {/* Our Offices */}
                            <Card
                                className="p-8 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-3xl">
                                <div className="flex items-center gap-3 mb-6">
                                    <div
                                        className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center">
                                        <MapPin className="w-6 h-6 text-purple-600 dark:text-purple-400"/>
                                    </div>
                                    <h4 className="text-xl font-bold">Our Offices</h4>
                                </div>
                                <div className="space-y-5">
                                    {offices.map((office, idx) => (
                                        <div key={idx}
                                             className="pb-5 border-b border-gray-200 dark:border-gray-800 last:border-0 last:pb-0">
                                            <div className="flex items-start justify-between mb-2">
                                                <p className="text-base font-bold">{office.city}</p>
                                                <Badge
                                                    className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs">
                                                    {office.region}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{office.address}</p>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            {/* Social Media */}
                            <Card
                                className="p-8 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-3xl">
                                <div className="flex items-center gap-3 mb-6">
                                    <div
                                        className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-xl flex items-center justify-center">
                                        <Globe className="w-6 h-6 text-yellow-600 dark:text-yellow-400"/>
                                    </div>
                                    <h4 className="text-xl font-bold">Follow Us</h4>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    {socialLinks.map((social, idx) => (
                                        <Button
                                            key={idx}
                                            variant="outline"
                                            size="sm"
                                            className="w-full justify-start font-semibold"
                                        >
                                            <social.icon className="w-4 h-4 mr-2"/>
                                            {social.name}
                                        </Button>
                                    ))}
                                </div>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Map Placeholder */}
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.5}}
                        viewport={{once: true}}
                        className="mt-20"
                    >
                        <Card
                            className="p-2 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden">
                            <div
                                className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-2xl aspect-video flex items-center justify-center">
                                <div className="text-center">
                                    <MapPin className="w-20 h-20 mx-auto mb-4 text-gray-400"/>
                                    <p className="text-xl font-bold text-gray-500 dark:text-gray-400">Interactive
                                        Map</p>
                                    <p className="text-base text-gray-400 dark:text-gray-500 mt-2">Find our offices near
                                        you</p>
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
