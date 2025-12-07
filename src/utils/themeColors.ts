/**
 * Theme Color Utilities for ZONIX
 * 
 * This file provides helper functions to get theme colors dynamically.
 * Use these when you need to apply colors via inline styles or JavaScript.
 * 
 * For Tailwind classes, use the utility classes defined in globals.css:
 * - bg-theme-primary, text-theme-primary, border-theme-primary
 * - bg-theme-gradient-to-r, bg-theme-gradient-to-br
 * - from-theme-primary, to-theme-primary-dark, via-theme-primary
 */

/**
 * Get the current theme colors from CSS variables
 */
export function getThemeColors() {
  const root = document.documentElement;
  const computedStyle = getComputedStyle(root);
  
  return {
    primary: computedStyle.getPropertyValue('--theme-primary').trim(),
    primaryDark: computedStyle.getPropertyValue('--theme-primary-dark').trim(),
    primaryLight: computedStyle.getPropertyValue('--theme-primary-light').trim(),
    gradientFrom: computedStyle.getPropertyValue('--theme-gradient-from').trim(),
    gradientTo: computedStyle.getPropertyValue('--theme-gradient-to').trim(),
  };
}

/**
 * Get a gradient style string for inline styles
 * @param direction - gradient direction (to-r, to-br, to-b, etc.)
 */
export function getThemeGradient(direction: string = 'to right'): string {
  const colors = getThemeColors();
  return `linear-gradient(${direction}, ${colors.primary}, ${colors.primaryDark})`;
}

/**
 * Get a gradient background style object
 */
export function getThemeGradientStyle(direction: string = 'to right') {
  return {
    background: getThemeGradient(direction)
  };
}

/**
 * Get RGBA color string with opacity
 * @param opacity - opacity value between 0 and 1
 */
export function getThemeColorWithOpacity(opacity: number = 1): string {
  const root = document.documentElement;
  const computedStyle = getComputedStyle(root);
  const rgb = computedStyle.getPropertyValue('--theme-primary-rgb').trim();
  
  return `rgba(${rgb}, ${opacity})`;
}

/**
 * Apply theme color to an element
 * @param element - HTML element
 * @param property - CSS property to set
 * @param useGradient - whether to use gradient (default: false)
 */
export function applyThemeColor(
  element: HTMLElement,
  property: string,
  useGradient: boolean = false
) {
  if (useGradient) {
    element.style.setProperty(property, getThemeGradient('to right'));
  } else {
    element.style.setProperty(property, `var(--theme-primary)`);
  }
}
