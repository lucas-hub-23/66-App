/**
 * Schnapsn - Typography Components
 * Wiederverwendbare Text-Komponenten mit konsistenten Styles
 */

import React from 'react';
import { Text as RNText, StyleSheet, TextStyle } from 'react-native';
import { Theme } from '@constants';

export interface TypographyProps {
  children: React.ReactNode;
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'body'
    | 'bodySmall'
    | 'caption'
    | 'label';
  color?: 'primary' | 'secondary' | 'disabled' | 'inverse' | 'accent' | 'error';
  align?: 'left' | 'center' | 'right';
  weight?: 'regular' | 'medium' | 'semiBold' | 'bold';
  style?: TextStyle;
}

export const Typography: React.FC<TypographyProps> = ({
  children,
  variant = 'body',
  color = 'primary',
  align = 'left',
  weight,
  style,
}) => {
  const textStyle = [
    styles.base,
    styles[variant],
    styles[`color${color.charAt(0).toUpperCase() + color.slice(1)}`],
    align && { textAlign: align },
    weight &&
      styles[`weight${weight.charAt(0).toUpperCase() + weight.slice(1)}`],
    style,
  ];

  return <RNText style={textStyle}>{children}</RNText>;
};

const styles = StyleSheet.create({
  base: {
    color: Theme.colors.text.primary,
  },

  // Variants
  h1: {
    fontSize: Theme.typography.fontSize['5xl'],
    fontWeight: Theme.typography.fontWeight.bold,
    lineHeight: Theme.typography.fontSize['5xl'] * 1.2,
  },
  h2: {
    fontSize: Theme.typography.fontSize['4xl'],
    fontWeight: Theme.typography.fontWeight.bold,
    lineHeight: Theme.typography.fontSize['4xl'] * 1.2,
  },
  h3: {
    fontSize: Theme.typography.fontSize['3xl'],
    fontWeight: Theme.typography.fontWeight.semiBold,
    lineHeight: Theme.typography.fontSize['3xl'] * 1.2,
  },
  h4: {
    fontSize: Theme.typography.fontSize['2xl'],
    fontWeight: Theme.typography.fontWeight.semiBold,
    lineHeight: Theme.typography.fontSize['2xl'] * 1.3,
  },
  h5: {
    fontSize: Theme.typography.fontSize.xl,
    fontWeight: Theme.typography.fontWeight.medium,
    lineHeight: Theme.typography.fontSize.xl * 1.4,
  },
  body: {
    fontSize: Theme.typography.fontSize.base,
    fontWeight: Theme.typography.fontWeight.regular,
    lineHeight:
      Theme.typography.fontSize.base * Theme.typography.lineHeight.normal,
  },
  bodySmall: {
    fontSize: Theme.typography.fontSize.sm,
    fontWeight: Theme.typography.fontWeight.regular,
    lineHeight:
      Theme.typography.fontSize.sm * Theme.typography.lineHeight.normal,
  },
  caption: {
    fontSize: Theme.typography.fontSize.xs,
    fontWeight: Theme.typography.fontWeight.regular,
    lineHeight:
      Theme.typography.fontSize.xs * Theme.typography.lineHeight.normal,
  },
  label: {
    fontSize: Theme.typography.fontSize.sm,
    fontWeight: Theme.typography.fontWeight.medium,
    lineHeight: Theme.typography.fontSize.sm * 1.4,
    letterSpacing: Theme.typography.letterSpacing.wide,
    textTransform: 'uppercase',
  },

  // Colors
  colorPrimary: {
    color: Theme.colors.text.primary,
  },
  colorSecondary: {
    color: Theme.colors.text.secondary,
  },
  colorDisabled: {
    color: Theme.colors.text.disabled,
  },
  colorInverse: {
    color: Theme.colors.text.inverse,
  },
  colorAccent: {
    color: Theme.colors.text.accent,
  },
  colorError: {
    color: Theme.colors.status.error,
  },

  // Weights
  weightRegular: {
    fontWeight: Theme.typography.fontWeight.regular,
  },
  weightMedium: {
    fontWeight: Theme.typography.fontWeight.medium,
  },
  weightSemiBold: {
    fontWeight: Theme.typography.fontWeight.semiBold,
  },
  weightBold: {
    fontWeight: Theme.typography.fontWeight.bold,
  },
});

export default Typography;
