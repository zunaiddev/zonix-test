import {motion} from "motion/react";
import logo from "../assets/logo.png"; // update path

export function LogoLoader() {
    return (
        <div
            className="min-h-screen flex items-center justify-center bg-gradient-to-r from-theme-primary to-theme-primary-dark">

            <div className="relative w-36 h-36 flex items-center justify-center mx-auto">

                {/* Rotating Ring */}
                <motion.div
                    className="
            absolute w-36 h-36 rounded-full border-4
            border-yellow-400/60 shadow-[0_0_18px_rgba(255,200,50,0.9)]
          "
                    animate={{rotate: 360}}
                    transition={{
                        repeat: Infinity,
                        duration: 3,
                        ease: "linear"
                    }}
                />

                {/* Logo Pulse */}
                <motion.img
                    src={logo}
                    alt="Zonix Logo"
                    className="w-24 h-24 z-20"
                    animate={{
                        scale: [1, 1.08, 1],
                        opacity: [0.8, 1, 0.8]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Text */}
                <h2 className="absolute top-full mt-4 text-white/80 text-lg tracking-wide">
                    Loading...
                </h2>

            </div>
        </div>
    );
}

export default LogoLoader;