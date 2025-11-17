/**
 * Schnapsn - Button Component
 * Wiederverwendbare Button-Komponente mit verschiedenen Varianten
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Theme } from '@constants';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
}) => {
  const buttonStyle = [
    styles.base,
    styles[variant],
    styles[`${size}Size`],
    fullWidth && styles.fullWidth,
    (disabled || loading) && styles.disabled,
    style,
  ];

  const textStyleCombined = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    (disabled || loading) && styles.disabledText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={
            variant === 'outline' || variant === 'ghost'
              ? Theme.colors.primary.main
              : Theme.colors.primary.contrast
          }
        />
      ) : (
        <Text style={textStyleCombined}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Theme.spacing.borderRadius.md,
    ...Theme.shadows.sm,
  },

  // Variants
  primary: {
    backgroundColor: Theme.colors.primary.main,
  },
  secondary: {
    backgroundColor: Theme.colors.secondary.main,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: Theme.spacing.borderWidth.medium,
    borderColor: Theme.colors.primary.main,
  },
  ghost: {
    backgroundColor: 'transparent',
  },

  // Sizes
  smallSize: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  mediumSize: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  largeSize: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },

  // Text Styles
  text: {
    fontWeight: Theme.typography.fontWeight.semiBold,
  },
  primaryText: {
    color: Theme.colors.primary.contrast,
  },
  secondaryText: {
    color: Theme.colors.secondary.contrast,
  },
  outlineText: {
    color: Theme.colors.primary.main,
  },
  ghostText: {
    color: Theme.colors.primary.main,
  },

  // Text Sizes
  smallText: {
    fontSize: Theme.typography.fontSize.sm,
  },
  mediumText: {
    fontSize: Theme.typography.fontSize.base,
  },
  largeText: {
    fontSize: Theme.typography.fontSize.lg,
  },

  // States
  disabled: {
    opacity: Theme.opacity.disabled,
  },
  disabledText: {
    opacity: Theme.opacity.disabled,
  },
  fullWidth: {
    width: '100%',
  },
});

export default Button;
