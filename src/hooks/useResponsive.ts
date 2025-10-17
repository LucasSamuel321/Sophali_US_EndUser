import { useEffect, useState } from 'react';
import { Dimensions, Platform, ScaledSize } from 'react-native';

interface ResponsiveConfig {
  isTablet: boolean;
  isLandscape: boolean;
  screenWidth: number;
  screenHeight: number;
  orientation: 'portrait' | 'landscape';
  isLargeScreen: boolean;
}

export const useResponsive = (): ResponsiveConfig => {
  const [dimensions, setDimensions] = useState(() => {
    const { width, height } = Dimensions.get('window');
    return { width, height };
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }: { window: ScaledSize }) => {
      setDimensions({ width: window.width, height: window.height });
    });

    return () => subscription?.remove();
  }, []);

  const screenWidth = Math.max(dimensions.width, dimensions.height);
  const screenHeight = Math.min(dimensions.width, dimensions.height);
  
  // Tablet detection
  const isTablet = Platform.OS === 'ios' 
    ? screenWidth >= 768 
    : screenWidth >= 600;
  
  // Orientation detection
  const isLandscape = dimensions.width > dimensions.height;
  const orientation = isLandscape ? 'landscape' : 'portrait';
  
  // Large screen detection (for larger tablets)
  const isLargeScreen = screenWidth >= 1024;

  return {
    isTablet,
    isLandscape,
    screenWidth,
    screenHeight,
    orientation,
    isLargeScreen,
  };
};

// Utility functions for responsive styling
export const getResponsiveValue = (
  mobileValue: number,
  tabletValue: number,
  isTablet: boolean
): number => {
  return isTablet ? tabletValue : mobileValue;
};

export const getResponsivePadding = (isTablet: boolean): number => {
  return isTablet ? 24 : 16;
};

export const getResponsiveMargin = (isTablet: boolean): number => {
  return isTablet ? 20 : 12;
};

export const getResponsiveFontSize = (
  mobileSize: number,
  tabletSize: number,
  isTablet: boolean
): number => {
  return isTablet ? tabletSize : mobileSize;
};
