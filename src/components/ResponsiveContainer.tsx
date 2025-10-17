import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { LAYOUT, SPACING } from '../constants/ResponsiveConstants';
import { useResponsive } from '../hooks/useResponsive';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: 'none' | 'small' | 'medium' | 'large';
  maxWidth?: number | string;
  centerContent?: boolean;
  backgroundColor?: string;
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  style,
  padding = 'medium',
  maxWidth,
  centerContent = false,
  backgroundColor,
}) => {
  const { isTablet } = useResponsive();

  const getPaddingValue = () => {
    switch (padding) {
      case 'none':
        return 0;
      case 'small':
        return isTablet ? SPACING.MD : SPACING.SM;
      case 'medium':
        return isTablet ? SPACING.LG : SPACING.MD;
      case 'large':
        return isTablet ? SPACING.XL : SPACING.LG;
      default:
        return isTablet ? SPACING.LG : SPACING.MD;
    }
  };

  const containerStyle: ViewStyle = {
    flex: 1,
    paddingHorizontal: getPaddingValue(),
    maxWidth: maxWidth || LAYOUT.MAX_CONTENT_WIDTH,
    alignSelf: centerContent ? 'center' : 'stretch',
    backgroundColor,
    ...style,
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ResponsiveContainer;
