/**
 * Schnapsn - Trump Indicator Component
 * Zeigt die aktuelle Trumpffarbe an
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Suit } from '@types/game';
import { Theme } from '@constants';
import { Typography } from '@components';

interface TrumpIndicatorProps {
  trump: Suit;
  size?: 'small' | 'medium' | 'large';
}

export const TrumpIndicator: React.FC<TrumpIndicatorProps> = ({
  trump,
  size = 'medium',
}) => {
  const suitSymbol = getSuitSymbol(trump);
  const suitColor = getSuitColor(trump);
  const suitName = getSuitName(trump);

  const iconSize = {
    small: 24,
    medium: 40,
    large: 60,
  }[size];

  return (
    <View style={styles.container}>
      <View style={[styles.badge, { backgroundColor: suitColor }]}>
        <Typography
          variant="h3"
          color="inverse"
          align="center"
          style={{ fontSize: iconSize }}
        >
          {suitSymbol}
        </Typography>
      </View>
      <Typography variant="caption" color="inverse" align="center">
        Trump: {suitName}
      </Typography>
    </View>
  );
};

const getSuitSymbol = (suit: Suit): string => {
  const symbols: Record<Suit, string> = {
    [Suit.HEARTS]: '♥',
    [Suit.BELLS]: '🔔',
    [Suit.LEAVES]: '🍃',
    [Suit.ACORNS]: '🌰',
  };
  return symbols[suit];
};

const getSuitColor = (suit: Suit): string => {
  const colors: Record<Suit, string> = {
    [Suit.HEARTS]: Theme.colors.cards.hearts,
    [Suit.BELLS]: Theme.colors.cards.bells,
    [Suit.LEAVES]: Theme.colors.cards.leaves,
    [Suit.ACORNS]: Theme.colors.cards.acorns,
  };
  return colors[suit];
};

const getSuitName = (suit: Suit): string => {
  const names: Record<Suit, string> = {
    [Suit.HEARTS]: 'Herz',
    [Suit.BELLS]: 'Schellen',
    [Suit.LEAVES]: 'Laub',
    [Suit.ACORNS]: 'Eichel',
  };
  return names[suit];
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: Theme.spacing.xs,
  },

  badge: {
    padding: Theme.spacing.sm,
    borderRadius: Theme.spacing.borderRadius.full,
    ...Theme.shadows.md,
    minWidth: 60,
    minHeight: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TrumpIndicator;
