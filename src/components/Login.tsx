import {type FormEvent, useState} from 'react';
import {motion} from 'motion/react';
import {Button} from './ui/button';
import {Input} from './ui/input';
import {Label} from './ui/label';
import {ArrowLeft, Eye, EyeOff, Shield, TrendingUp} from 'lucide-react';
import {ThemeToggle} from './ThemeToggle';
import {Logo} from './Logo';
import {useNavigate} from "react-router-dom";

interface LoginProps {
    theme?: 'light' | 'dark';
    onToggleTheme?: () => void;
}

export function Login({theme = 'dark', onToggleTheme}: LoginProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function onLogin() {
        navigate('/dashboard');
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onLogin();
    };

    const handleGoogleLogin = () => {
        // Handle Google login
        console.log('Google login');
        onLogin();
    };

    return (
        <div className="min-h-screen bg-background relative overflow-hidden grid lg:grid-cols-2">
            {/* Left Side - Welcome Message */}
            <div
                className="hidden lg:flex flex-col justify-center items-center p-12 relative bg-gradient-to-br from-yellow-500/5 to-transparent">
                <div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(251,191,36,0.1),transparent_70%)]"></div>

                <motion.div
                    initial={{opacity: 0, y: 30}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.8}}
                    className="relative max-w-xl"
                >
                    <div className="mb-8">
                        <Logo size="xl" showText={true}/>
                    </div>

                    <h1 className="text-5xl mb-6 text-foreground">
                        Welcome Back to the Future of Trading
                    </h1>

                    <p className="text-xl text-muted-foreground mb-12">
                        Continue your journey in trading India's hyperlocal economy. Access your portfolio, district
                        tokens, and AI-powered insights.
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-start space-x-4">
                            <div
                                className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
                                <TrendingUp className="w-6 h-6 text-yellow-400"/>
                            </div>
                            <div>
                                <h3 className="text-lg mb-1 text-foreground">Real-Time Market Data</h3>
                                <p className="text-muted-foreground">Track 750+ districts with live updates and AI
                                    forecasts</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div
                                className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
                                <Shield className="w-6 h-6 text-yellow-400"/>
                            </div>
                            <div>
                                <h3 className="text-lg mb-1 text-foreground">Bank-Grade Security</h3>
                                <p className="text-muted-foreground">Your investments protected with SEBI-compliant
                                    infrastructure</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex items-center justify-center p-6 lg:p-12 relative">
                <div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(251,191,36,0.08),transparent_60%)]"></div>

                {/* Back Button & Theme Toggle */}
                <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
                    <motion.button
                        initial={{opacity: 0, x: -20}}
                        animate={{opacity: 1, x: 0}}
                        onClick={() => navigate('/landing')}
                        className="flex items-center space-x-2 text-muted-foreground hover:text-yellow-400 transition-colors"
                    >
                        <ArrowLeft size={20}/>
                        <span>Back</span>
                    </motion.button>

                    {onToggleTheme && <ThemeToggle theme={theme} onToggle={onToggleTheme}/>}
                </div>

                <div className="relative w-full max-w-md mx-auto">
                    <motion.div
                        initial={{opacity: 0, y: 30}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.6}}
                        className="space-y-8"
                    >
                        {/* Logo & Title for Mobile */}
                        <div className="text-center lg:hidden mb-6">
                            <Logo size="lg" showText={true} className="justify-center"/>
                        </div>

                        {/* Title */}
                        <div className="text-center">
                            <h2 className="text-3xl mb-2 text-foreground">Welcome Back</h2>
                            <p className="text-muted-foreground">Log in to continue trading</p>
                        </div>

                        {/* Login Form */}
                        <div className="relative">
                            <div
                                className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent rounded-3xl blur-xl"></div>
                            <div
                                className="relative bg-card backdrop-blur-xl border border-yellow-500/20 rounded-3xl p-8 shadow-xl">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Email */}
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-foreground">Email Address</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="you@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="bg-input-background border-border focus:border-yellow-500/50 text-foreground placeholder-muted-foreground rounded-xl"
                                            required
                                        />
                                    </div>

                                    {/* Password */}
                                    <div className="space-y-2">
                                        <Label htmlFor="password" className="text-foreground">Password</Label>
                                        <div className="relative">
                                            <Input
                                                id="password"
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="••••••••"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="bg-input-background border-border focus:border-yellow-500/50 text-foreground placeholder-muted-foreground rounded-xl pr-10"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-yellow-400"
                                            >
                                                {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Remember & Forgot */}
                                    <div className="flex items-center justify-between text-sm">
                                        <label className="flex items-center space-x-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="rounded border-yellow-500/30 text-yellow-500 focus:ring-yellow-500/20 bg-input-background"
                                            />
                                            <span className="text-muted-foreground">Remember me</span>
                                        </label>
                                        <button
                                            type="button"
                                            className="text-yellow-400 hover:text-yellow-300 transition-colors"
                                        >
                                            Forgot Password?
                                        </button>
                                    </div>

                                    {/* Login Button */}
                                    <Button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black hover:from-yellow-500 hover:to-yellow-700 rounded-xl py-6 transition-all transform hover:scale-[1.02]"
                                    >
                                        Log In
                                    </Button>

                                    {/* Divider */}
                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-border"></div>
                                        </div>
                                        <div className="relative flex justify-center text-sm">
                                            <span className="px-4 bg-card text-muted-foreground">Or continue with</span>
                                        </div>
                                    </div>

                                    {/* Google Login */}
                                    <Button
                                        type="button"
                                        onClick={handleGoogleLogin}
                                        variant="outline"
                                        className="w-full border-yellow-500/30 text-foreground hover:bg-yellow-500/10 hover:border-yellow-500/50 rounded-xl py-6 flex items-center justify-center space-x-3"
                                    >
                                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                                            <path
                                                fill="#4285F4"
                                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                            />
                                            <path
                                                fill="#34A853"
                                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                            />
                                            <path
                                                fill="#FBBC05"
                                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                            />
                                            <path
                                                fill="#EA4335"
                                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                            />
                                        </svg>
                                        <span>Continue with Google</span>
                                    </Button>

                                    {/* Sign Up Link */}
                                    <div className="text-center text-sm">
                                        <span className="text-muted-foreground">Don't have an account? </span>
                                        <button
                                            type="button"
                                            onClick={() => navigate('/signup')}
                                            className="text-yellow-400 hover:text-yellow-300 transition-colors"
                                        >
                                            Sign Up
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
