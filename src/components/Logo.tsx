import logoImage from '../assets/logo.png';

interface LogoProps {
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    showText?: boolean;
    className?: string;
    onClick?: () => void;
}

export function Logo({size = 'md', showText = true, className = '', onClick}: LogoProps) {
    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-12 h-12',
        xl: 'w-16 h-16',
        full: 'w-full h-full',
    };

    const textSizeClasses = {
        sm: 'text-lg',
        md: 'text-2xl',
        lg: 'text-3xl',
        xl: 'text-4xl',
        full: 'text-4xl',
    };

    return (
        <div className={`flex items-center gap-3 ${className}`} onClick={onClick}>
            <div className={`relative group ${onClick ? 'cursor-pointer' : ''}`}>
                <div
                    className="absolute inset-0 bg-gradient-to-r from-theme-primary to-theme-primary-dark rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
                <div
                    className={`relative ${sizeClasses[size]} rounded-full overflow-hidden ring-2 ring-theme-primary/30 group-hover:ring-theme-primary/50 transition-all shadow-xl shadow-theme-primary/20`}>
                    <img
                        src={logoImage}
                        alt="ZONIX Logo"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
            {showText && (
                <span
                    className={`${textSizeClasses[size]} tracking-wider bg-gradient-to-r from-theme-primary via-theme-primary-dark to-yellow-600 bg-clip-text text-transparent`}>
          ZONIX
        </span>
            )}
        </div>
    );
}