import {useState} from 'react';
import {Moon, Sun} from 'lucide-react';
import {Button} from './ui/button';

export function ThemeToggle() {
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);

        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-xl w-11 h-11 hover:bg-yellow-500/10 transition-all duration-300 group"
            aria-label="Toggle theme"
        >
            {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-yellow-500 group-hover:rotate-90 transition-transform duration-300"/>
            ) : (
                <Moon
                    className="h-5 w-5 text-gray-700 dark:text-gray-300 group-hover:-rotate-12 transition-transform duration-300"/>
            )}
        </Button>
    );
}
