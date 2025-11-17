/**
 * Schnapsn Design System - Farben
 * Authentische österreichische Beisl-Atmosphäre
 */

export const Colors = {
  // Primärfarben - Tischfilz Grün (authentisches Kartenspiel-Gefühl)
  primary: {
    main: '#2C5F2D', // Dunkles Waldgrün (Tischfilz)
    light: '#4A7C59', // Helleres Grün
    dark: '#1B3A1C', // Sehr dunkles Grün
    contrast: '#FFFFFF', // Weißer Text auf Grün
  },

  // Sekundärfarben - Holz & Traditionell
  secondary: {
    main: '#8B4513', // Sattelbraun (Holztisch)
    light: '#A0522D', // Sienna
    dark: '#654321', // Dunkles Braun
    contrast: '#FFFFFF',
  },

  // Kartenfarben - Traditional Austrian Cards
  cards: {
    hearts: '#DC143C', // Herz (Crimson)
    bells: '#FFD700', // Schellen (Gold)
    leaves: '#2E7D32', // Laub (Grün)
    acorns: '#8B4513', // Eichel (Braun)
  },

  // UI Farben
  background: {
    primary: '#FAFAF5', // Leicht cremefarbener Hintergrund
    secondary: '#F5F5F0', // Noch heller
    card: '#FFFFFF', // Weiß für Karten/Container
    dark: '#1C1C1E', // Dunkler Modus (optional)
  },

  text: {
    primary: '#1C1C1E', // Fast Schwarz
    secondary: '#6E6E73', // Grau
    disabled: '#AEAEB2', // Hellgrau
    inverse: '#FFFFFF', // Weiß
    accent: '#2C5F2D', // Grün für Hervorhebungen
  },

  // Status Farben
  status: {
    success: '#34C759', // Erfolgreich
    warning: '#FF9500', // Warnung
    error: '#FF3B30', // Fehler
    info: '#007AFF', // Information
  },

  // Spielzustand Farben
  game: {
    player1: '#007AFF', // Blau
    player2: '#FF3B30', // Rot
    neutral: '#8E8E93', // Grau
    trump: '#FFD700', // Gold für Trump
    highlight: '#FFEB3B', // Gelb für Hervorhebungen
  },

  // Overlay & Shadows
  overlay: {
    light: 'rgba(0, 0, 0, 0.1)',
    medium: 'rgba(0, 0, 0, 0.3)',
    dark: 'rgba(0, 0, 0, 0.6)',
  },

  // Borders
  border: {
    light: '#E5E5EA',
    medium: '#C7C7CC',
    dark: '#8E8E93',
  },
} as const;

export type ColorsType = typeof Colors;
