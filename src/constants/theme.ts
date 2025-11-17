/**
 * Schnapsn Design System - Theme
 * Zentrales Theme-Objekt für die gesamte App
 */

import { Colors } from './colors';
import { Typography } from './typography';
import { Spacing } from './spacing';

export const Theme = {
  colors: Colors,
  typography: Typography,
  spacing: Spacing,

  // Shadows (für Karten, Buttons, etc.)
  shadows: {
    none: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8,
    },
    xl: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
      elevation: 12,
    },
  },

  // Animation Durations
  animation: {
    fast: 150,
    normal: 250,
    slow: 350,
  },

  // Opacity Values
  opacity: {
    disabled: 0.4,
    pressed: 0.6,
    overlay: 0.8,
  },
} as const;

export type ThemeType = typeof Theme;

export default Theme;
