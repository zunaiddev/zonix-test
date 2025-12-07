import { Button } from './ui/button';
import { Moon, Sun, Zap } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  onNavigate: (page: string) => void;
}

export function Navbar({ onNavigate }: NavbarProps) {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-black/80 border-b border-yellow-400/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('landing')}>
            <Zap className="w-8 h-8 text-yellow-400 fill-yellow-400" />
            <span className="text-black dark:text-white tracking-tight">ZONIX</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-700 dark:text-gray-300 hover:text-yellow-500 transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-700 dark:text-gray-300 hover:text-yellow-500 transition-colors">How It Works</a>
            <a href="#pricing" className="text-gray-700 dark:text-gray-300 hover:text-yellow-500 transition-colors">Pricing</a>
            <a href="#contact" className="text-gray-700 dark:text-gray-300 hover:text-yellow-500 transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-yellow-400/20 transition-colors"
            >
              {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-700" />}
            </button>
            
            <Button
              variant="ghost"
              onClick={() => onNavigate('login')}
              className="text-gray-700 dark:text-gray-300 hover:text-yellow-500"
            >
              Log In
            </Button>
            
            <Button
              onClick={() => onNavigate('signup')}
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 rounded-full px-6 shadow-lg shadow-yellow-400/50 hover:shadow-yellow-500/50 transition-all"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
