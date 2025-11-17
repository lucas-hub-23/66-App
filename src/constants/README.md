# Schnapsn Design System

Authentische österreichische Beisl-Atmosphäre mit modernem Touch.

## Nutzung

```typescript
import { Theme, Colors, Typography, Spacing } from '@constants';

// Beispiel: Farbe verwenden
<View style={{ backgroundColor: Colors.primary.main }} />

// Beispiel: Typography verwenden
<Text style={{
  fontSize: Typography.fontSize.lg,
  fontWeight: Typography.fontWeight.bold
}} />

// Beispiel: Spacing verwenden
<View style={{ padding: Spacing.md, borderRadius: Spacing.borderRadius.lg }} />

// Beispiel: Theme verwenden
<View style={[
  Theme.shadows.md,
  { backgroundColor: Theme.colors.background.card }
]} />
```

## Farbpalette

### Primärfarben (Tischfilz Grün)

- **Main**: `#2C5F2D` - Authentisches Kartenspiel-Tischgrün
- **Light**: `#4A7C59`
- **Dark**: `#1B3A1C`

### Kartenfarben (Traditionelle österreichische Karten)

- **Herz**: `#DC143C` (Crimson)
- **Schellen**: `#FFD700` (Gold)
- **Laub**: `#2E7D32` (Grün)
- **Eichel**: `#8B4513` (Braun)

## Typography Scale

- **xs**: 12px - Kleine Labels
- **sm**: 14px - Sekundärer Text
- **base**: 16px - Standard Text
- **lg**: 18px - Größere Texte
- **xl**: 20px - Überschriften
- **2xl**: 24px - Große Überschriften
- **3xl**: 30px - Hero Text
- **4xl**: 36px - Display
- **5xl**: 48px - Extra Large Display

## Spacing (8pt Grid System)

- **xs**: 4px
- **sm**: 8px
- **md**: 16px
- **lg**: 24px
- **xl**: 32px
- **2xl**: 48px
- **3xl**: 64px
- **4xl**: 96px

## Spielkarten Dimensionen

- **Standard**: 70x105px (1.5 Ratio)
- **Large**: 90x135px

## Shadows

Fünf Shadow-Stufen: `none`, `sm`, `md`, `lg`, `xl`

## Animation

- **Fast**: 150ms - Kleine Interaktionen
- **Normal**: 250ms - Standard Animationen
- **Slow**: 350ms - Komplexe Übergänge
