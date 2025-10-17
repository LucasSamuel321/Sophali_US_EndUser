import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    ViewStyle
} from 'react-native';
import {
    FONT_SIZES,
    LAYOUT,
    SPACING
} from '../constants/ResponsiveConstants';
import { useResponsive } from '../hooks/useResponsive';

interface ResponsiveButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

export const ResponsiveButton: React.FC<ResponsiveButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  fullWidth = false,
}) => {
  const { isTablet } = useResponsive();

  const getButtonHeight = () => {
    switch (size) {
      case 'small':
        return isTablet ? 44 : 36;
      case 'medium':
        return isTablet ? 56 : 48;
      case 'large':
        return isTablet ? 64 : 56;
      default:
        return isTablet ? 56 : 48;
    }
  };

  const getFontSize = () => {
    switch (size) {
      case 'small':
        return isTablet ? FONT_SIZES.SM : FONT_SIZES.XS;
      case 'medium':
        return isTablet ? FONT_SIZES.MD : FONT_SIZES.SM;
      case 'large':
        return isTablet ? FONT_SIZES.LG : FONT_SIZES.MD;
      default:
        return isTablet ? FONT_SIZES.MD : FONT_SIZES.SM;
    }
  };

  const getVariantStyles = (): { button: ViewStyle; text: TextStyle } => {
    switch (variant) {
      case 'primary':
        return {
          button: {
            backgroundColor: disabled ? '#ccc' : '#007AFF',
            borderWidth: 0,
          },
          text: {
            color: '#ffffff',
          },
        };
      case 'secondary':
        return {
          button: {
            backgroundColor: disabled ? '#f0f0f0' : '#f8f9fa',
            borderWidth: 0,
          },
          text: {
            color: disabled ? '#999' : '#007AFF',
          },
        };
      case 'outline':
        return {
          button: {
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: disabled ? '#ccc' : '#007AFF',
          },
          text: {
            color: disabled ? '#ccc' : '#007AFF',
          },
        };
      case 'ghost':
        return {
          button: {
            backgroundColor: 'transparent',
            borderWidth: 0,
          },
          text: {
            color: disabled ? '#ccc' : '#007AFF',
          },
        };
      default:
        return {
          button: {
            backgroundColor: disabled ? '#ccc' : '#007AFF',
            borderWidth: 0,
          },
          text: {
            color: '#ffffff',
          },
        };
    }
  };

  const variantStyles = getVariantStyles();

  const buttonStyle: ViewStyle = {
    height: getButtonHeight(),
    borderRadius: LAYOUT.BORDER_RADIUS,
    paddingHorizontal: isTablet ? SPACING.LG : SPACING.MD,
    justifyContent: 'center',
    alignItems: 'center',
    width: fullWidth ? '100%' : undefined,
    ...variantStyles.button,
    ...style,
  };

  const textStyleCombined: TextStyle = {
    fontSize: getFontSize(),
    fontWeight: '600',
    textAlign: 'center',
    ...variantStyles.text,
    ...textStyle,
  };

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variantStyles.text.color} 
        />
      ) : (
        <Text style={textStyleCombined}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Additional styles can be added here if needed
});

export default ResponsiveButton;
