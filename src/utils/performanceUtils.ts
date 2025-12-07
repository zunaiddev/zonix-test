// Performance utility functions for optimizing React components

// Debounce function for search inputs and other frequent events
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll events and animations
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Intersection Observer for lazy loading
export function createIntersectionObserver(
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
): IntersectionObserver {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  };
  
  return new IntersectionObserver(callback, defaultOptions);
}

// Optimize images with lazy loading
export function lazyLoadImage(img: HTMLImageElement): void {
  const src = img.dataset.src;
  if (!src) return;
  
  const observer = createIntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const image = entry.target as HTMLImageElement;
        image.src = src;
        image.classList.add('fade-in');
        obs.unobserve(image);
      }
    });
  });
  
  observer.observe(img);
}

// Request Animation Frame wrapper for smooth animations
export function requestAnimationFramePolyfill(callback: FrameRequestCallback): number {
  return window.requestAnimationFrame(callback);
}

// Cancel Animation Frame wrapper
export function cancelAnimationFramePolyfill(id: number): void {
  window.cancelAnimationFrame(id);
}

// Measure component render time
export function measureRenderTime(componentName: string): void {
  if (typeof window !== 'undefined' && window.performance) {
    performance.mark(`${componentName}-render-start`);
    
    requestAnimationFrame(() => {
      performance.mark(`${componentName}-render-end`);
      performance.measure(
        `${componentName}-render`,
        `${componentName}-render-start`,
        `${componentName}-render-end`
      );
      
      const measure = performance.getEntriesByName(`${componentName}-render`)[0];
      if (measure) {
        console.log(`${componentName} render time: ${measure.duration.toFixed(2)}ms`);
      }
      
      // Clean up
      performance.clearMarks(`${componentName}-render-start`);
      performance.clearMarks(`${componentName}-render-end`);
      performance.clearMeasures(`${componentName}-render`);
    });
  }
}

// Check if element is in viewport
export function isInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Virtual scroll helper - calculate visible items
export function calculateVisibleItems(
  scrollTop: number,
  containerHeight: number,
  itemHeight: number,
  totalItems: number,
  overscan: number = 3
): { startIndex: number; endIndex: number; offsetY: number } {
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    totalItems - 1,
    Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
  );
  const offsetY = startIndex * itemHeight;
  
  return { startIndex, endIndex, offsetY };
}

// Memoization helper for expensive calculations
export function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map();
  
  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

// Performance observer for monitoring
export function observePerformance(): void {
  if (typeof window === 'undefined' || !window.PerformanceObserver) return;
  
  try {
    // Observe long tasks
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 50) {
          console.warn('Long task detected:', entry);
        }
      }
    });
    
    observer.observe({ entryTypes: ['longtask', 'measure'] });
  } catch (e) {
    // PerformanceObserver not supported
  }
}

// Prefetch resources
export function prefetchResource(url: string, as: string = 'fetch'): void {
  if (typeof document === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = url;
  link.as = as;
  document.head.appendChild(link);
}

// GPU acceleration helper
export function enableGPUAcceleration(element: HTMLElement): void {
  element.style.transform = 'translateZ(0)';
  element.style.backfaceVisibility = 'hidden';
  element.style.perspective = '1000px';
}
