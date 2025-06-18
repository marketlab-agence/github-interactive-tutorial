import { useState, useEffect } from 'react';

type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface BreakpointValues {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
}

const breakpoints: BreakpointValues = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};

export const useResponsive = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isBreakpoint = (breakpoint: Breakpoint): boolean => {
    return windowSize.width >= breakpoints[breakpoint];
  };

  const isMobile = windowSize.width < breakpoints.md;
  const isTablet = windowSize.width >= breakpoints.md && windowSize.width < breakpoints.lg;
  const isDesktop = windowSize.width >= breakpoints.lg;

  const getCurrentBreakpoint = (): Breakpoint => {
    if (windowSize.width >= breakpoints['2xl']) return '2xl';
    if (windowSize.width >= breakpoints.xl) return 'xl';
    if (windowSize.width >= breakpoints.lg) return 'lg';
    if (windowSize.width >= breakpoints.md) return 'md';
    return 'sm';
  };

  return {
    windowSize,
    isBreakpoint,
    isMobile,
    isTablet,
    isDesktop,
    getCurrentBreakpoint,
    breakpoints
  };
};

// Hook pour adapter le contenu selon la taille d'écran
export const useAdaptiveContent = () => {
  const { isMobile, isTablet, isDesktop } = useResponsive();

  const getGridCols = (mobile: number, tablet: number, desktop: number): string => {
    if (isMobile) return `grid-cols-${mobile}`;
    if (isTablet) return `md:grid-cols-${tablet}`;
    return `lg:grid-cols-${desktop}`;
  };

  const getTextSize = (mobile: string, tablet: string, desktop: string): string => {
    if (isMobile) return mobile;
    if (isTablet) return tablet;
    return desktop;
  };

  const getSpacing = (mobile: string, tablet: string, desktop: string): string => {
    if (isMobile) return mobile;
    if (isTablet) return tablet;
    return desktop;
  };

  return {
    getGridCols,
    getTextSize,
    getSpacing,
    isMobile,
    isTablet,
    isDesktop
  };
};