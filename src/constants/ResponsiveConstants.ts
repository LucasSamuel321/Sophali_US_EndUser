import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');
const screenWidth = Math.max(width, height);
const screenHeight = Math.min(width, height);

// Device detection
export const isTablet = Platform.OS === 'ios' 
  ? screenWidth >= 768 
  : screenWidth >= 600;

export const isLargeTablet = screenWidth >= 1024;

// Responsive spacing
export const SPACING = {
  XS: isTablet ? 8 : 4,
  SM: isTablet ? 12 : 8,
  MD: isTablet ? 16 : 12,
  LG: isTablet ? 24 : 16,
  XL: isTablet ? 32 : 24,
  XXL: isTablet ? 48 : 32,
};

// Responsive font sizes
export const FONT_SIZES = {
  XS: isTablet ? 12 : 10,
  SM: isTablet ? 14 : 12,
  MD: isTablet ? 16 : 14,
  LG: isTablet ? 18 : 16,
  XL: isTablet ? 20 : 18,
  XXL: isTablet ? 24 : 20,
  TITLE: isTablet ? 28 : 24,
  HEADER: isTablet ? 32 : 28,
};

// Responsive component sizes
export const COMPONENT_SIZES = {
  BUTTON_HEIGHT: isTablet ? 56 : 48,
  INPUT_HEIGHT: isTablet ? 52 : 44,
  CARD_PADDING: isTablet ? 24 : 16,
  TAB_BAR_HEIGHT: isTablet ? 80 : 60,
  HEADER_HEIGHT: isTablet ? 88 : 64,
};

// Responsive layout
export const LAYOUT = {
  MAX_CONTENT_WIDTH: isTablet ? 800 : '100%',
  SIDE_PADDING: isTablet ? 32 : 16,
  BORDER_RADIUS: isTablet ? 12 : 8,
  SHADOW_RADIUS: isTablet ? 8 : 4,
};

// Responsive grid
export const GRID = {
  COLUMNS: isTablet ? 2 : 1,
  GUTTER: isTablet ? 24 : 16,
  MARGIN: isTablet ? 32 : 16,
};

// Responsive icons
export const ICON_SIZES = {
  SM: isTablet ? 20 : 16,
  MD: isTablet ? 24 : 20,
  LG: isTablet ? 32 : 24,
  XL: isTablet ? 40 : 32,
};

// Responsive images
export const IMAGE_SIZES = {
  THUMBNAIL: isTablet ? 120 : 80,
  CARD: isTablet ? 200 : 140,
  HERO: isTablet ? 300 : 200,
  AVATAR: isTablet ? 80 : 60,
};

// Breakpoints
export const BREAKPOINTS = {
  MOBILE: 600,
  TABLET: 768,
  LARGE_TABLET: 1024,
  DESKTOP: 1200,
};

// Utility functions
export const getResponsiveValue = <T>(mobileValue: T, tabletValue: T): T => {
  return isTablet ? tabletValue : mobileValue;
};

export const getResponsiveArray = <T>(mobileArray: T[], tabletArray: T[]): T[] => {
  return isTablet ? tabletArray : mobileArray;
};

export const getResponsiveObject = <T extends Record<string, any>>(
  mobileObject: T, 
  tabletObject: T
): T => {
  return isTablet ? tabletObject : mobileObject;
};
