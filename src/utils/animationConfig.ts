// Optimized animation configurations for consistent, performant animations

// Reduced motion variants
export const fadeIn = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
};

export const fadeInFast = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.15, ease: [0.4, 0, 0.2, 1] }
};

export const slideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
};

export const slideDown = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
};

export const slideRight = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
  transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
};

// Stagger animations for lists
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

export const staggerItem = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
};

// Card hover effects (optimized for performance)
export const cardHover = {
  whileHover: {
    y: -4,
    scale: 1.01,
    transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
  },
  whileTap: { scale: 0.98 }
};

// Button hover effects
export const buttonHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { duration: 0.15, ease: [0.4, 0, 0.2, 1] }
};

// Floating animation (subtle)
export const float = {
  y: [0, -8, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: 'easeInOut'
  }
};

// Pulse animation
export const pulse = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: 'easeInOut'
  }
};

// Shimmer loading effect
export const shimmer = {
  backgroundPosition: ['-200% 0', '200% 0'],
  transition: {
    duration: 1.5,
    repeat: Infinity,
    ease: 'linear'
  }
};

// Page transition
export const pageTransition = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
  transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
};

// Modal/Dialog animations
export const modalBackdrop = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 }
};

export const modalContent = {
  initial: { opacity: 0, scale: 0.95, y: 10 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: 10 },
  transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
};

// Number counter animation
export const counterAnimation = {
  transition: {
    duration: 0.5,
    ease: [0.4, 0, 0.2, 1]
  }
};

// Spring animations for more natural feel
export const spring = {
  type: 'spring',
  stiffness: 300,
  damping: 30
};

export const springBounce = {
  type: 'spring',
  stiffness: 400,
  damping: 25
};

// Optimized variants for reducing layout shift
export const layoutShiftSafe = {
  layout: true,
  layoutId: (id: string) => id,
  transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
};

// Progress bar animation
export const progressBar = {
  initial: { width: 0 },
  animate: (width: number) => ({
    width: `${width}%`,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
  })
};

// Notification toast animation
export const toastSlide = {
  initial: { opacity: 0, y: -20, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, scale: 0.95, x: 100 },
  transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
};

// Accordion/Collapse animation
export const collapse = {
  initial: { height: 0, opacity: 0 },
  animate: { height: 'auto', opacity: 1 },
  exit: { height: 0, opacity: 0 },
  transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] }
};

// Smooth reveal for images
export const imageReveal = {
  initial: { opacity: 0, scale: 1.1 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
};

// Reduced motion preferences
export const respectReducedMotion = (animation: any) => {
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return {
      ...animation,
      transition: { duration: 0.01 }
    };
  }
  return animation;
};
