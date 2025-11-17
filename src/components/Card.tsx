/**
 * Schnapsn - Card Component
 * Container-Komponente für Content-Bereiche
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Theme } from '@constants';

export interface CardProps {
  children: React.ReactNode;
  variant?: 'elevated' | 'flat' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'elevated',
  padding = 'md',
  style,
}) => {
  const cardStyle = [
    styles.base,
    styles[variant],
    padding !== 'none' && styles[`padding${padding.toUpperCase()}`],
    style,
  ];

  return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: Theme.colors.background.card,
    borderRadius: Theme.spacing.borderRadius.lg,
  },

  // Variants
  elevated: {
    ...Theme.shadows.md,
  },
  flat: {
    ...Theme.shadows.none,
  },
  outlined: {
    ...Theme.shadows.none,
    borderWidth: Theme.spacing.borderWidth.thin,
    borderColor: Theme.colors.border.light,
  },

  // Padding
  paddingSM: {
    padding: Theme.spacing.sm,
  },
  paddingMD: {
    padding: Theme.spacing.md,
  },
  paddingLG: {
    padding: Theme.spacing.lg,
  },
});

export default Card;
