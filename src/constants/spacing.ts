/**
 * Schnapsn Design System - Spacing & Layout
 * Konsistente Abstände und Dimensionen
 */

export const Spacing = {
  // Spacing Scale (8pt Grid System)
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
  '4xl': 96,

  // Specific Use Cases
  padding: {
    screen: 16, // Standard Screen Padding
    card: 16, // Card Padding
    button: 12, // Button Padding
  },

  margin: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
  },

  // Border Radius
  borderRadius: {
    none: 0,
    xs: 2,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999, // Vollständig rund
  },

  // Border Width
  borderWidth: {
    thin: 1,
    medium: 2,
    thick: 3,
  },

  // Icon Sizes
  iconSize: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 32,
    xl: 48,
  },

  // Card Dimensions (für Spielkarten)
  card: {
    width: 70, // Standard Kartenbreite
    height: 105, // Standard Kartenhöhe (1.5 Ratio)
    widthLarge: 90,
    heightLarge: 135,
  },
} as const;

export type SpacingType = typeof Spacing;
