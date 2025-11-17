/**
 * Schnapsn - Playing Card Component
 * Visuelle Darstellung einer Spielkarte mit österreichischem Design
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Card, Suit, Rank } from '@types/game';
import { Theme } from '@constants';

interface PlayingCardProps {
  card: Card;
  faceUp?: boolean;
  selected?: boolean;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  onPress?: (card: Card) => void;
  style?: object;
}

export const PlayingCard: React.FC<PlayingCardProps> = ({
  card,
  faceUp = true,
  selected = false,
  disabled = false,
  size = 'medium',
  onPress,
  style,
}) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    if (!disabled && onPress) {
      onPress(card);
    }
  };

  const cardDimensions = {
    small: { width: 50, height: 75 },
    medium: {
      width: Theme.spacing.card.width,
      height: Theme.spacing.card.height,
    },
    large: {
      width: Theme.spacing.card.widthLarge,
      height: Theme.spacing.card.heightLarge,
    },
  };

  const dimensions = cardDimensions[size];

  const containerStyle = [
    styles.container,
    {
      width: dimensions.width,
      height: dimensions.height,
    },
    selected && styles.selected,
    disabled && styles.disabled,
    style,
  ];

  const animatedStyle = {
    transform: [{ scale: scaleAnim }],
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || !onPress}
    >
      <Animated.View style={[containerStyle, animatedStyle]}>
        {faceUp ? (
          <CardFace card={card} size={size} />
        ) : (
          <CardBack size={size} />
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

/**
 * Vorderseite der Karte (mit Wert und Farbe)
 */
const CardFace: React.FC<{ card: Card; size: string }> = ({ card, size }) => {
  const suitColor = getSuitColor(card.suit);
  const rankSymbol = getRankSymbol(card.rank);
  const suitSymbol = getSuitSymbol(card.suit);

  const fontSize = {
    small: 14,
    medium: 18,
    large: 24,
  }[size];

  return (
    <View style={styles.cardFace}>
      {/* Obere linke Ecke */}
      <View style={styles.corner}>
        <Text style={[styles.rankText, { color: suitColor, fontSize }]}>
          {rankSymbol}
        </Text>
        <Text
          style={[
            styles.suitText,
            { color: suitColor, fontSize: fontSize * 0.8 },
          ]}
        >
          {suitSymbol}
        </Text>
      </View>

      {/* Zentrum */}
      <View style={styles.center}>
        <Text
          style={[
            styles.centerSuit,
            { color: suitColor, fontSize: fontSize * 2.5 },
          ]}
        >
          {suitSymbol}
        </Text>
      </View>

      {/* Untere rechte Ecke (gespiegelt) */}
      <View style={[styles.corner, styles.cornerBottomRight]}>
        <Text
          style={[
            styles.suitText,
            { color: suitColor, fontSize: fontSize * 0.8 },
          ]}
        >
          {suitSymbol}
        </Text>
        <Text style={[styles.rankText, { color: suitColor, fontSize }]}>
          {rankSymbol}
        </Text>
      </View>
    </View>
  );
};

/**
 * Rückseite der Karte
 */
const CardBack: React.FC<{ size: string }> = () => {
  return (
    <View style={styles.cardBack}>
      <View style={styles.backPattern}>
        <Text style={styles.backText}>🎴</Text>
      </View>
    </View>
  );
};

/**
 * Hilfsfunktionen für Kartensymbole
 */
const getRankSymbol = (rank: Rank): string => {
  const symbols: Record<Rank, string> = {
    [Rank.ACE]: 'A',
    [Rank.TEN]: '10',
    [Rank.KING]: 'K',
    [Rank.QUEEN]: 'Q',
    [Rank.JACK]: 'J',
  };
  return symbols[rank];
};

const getSuitSymbol = (suit: Suit): string => {
  const symbols: Record<Suit, string> = {
    [Suit.HEARTS]: '♥', // Herz
    [Suit.BELLS]: '🔔', // Schellen (Glocke)
    [Suit.LEAVES]: '🍃', // Laub (Blatt)
    [Suit.ACORNS]: '🌰', // Eichel
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

const styles = StyleSheet.create({
  container: {
    borderRadius: Theme.spacing.borderRadius.sm,
    ...Theme.shadows.md,
  },

  cardFace: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: Theme.spacing.borderRadius.sm,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    padding: Theme.spacing.xs,
  },

  cardBack: {
    flex: 1,
    backgroundColor: Theme.colors.primary.main,
    borderRadius: Theme.spacing.borderRadius.sm,
    borderWidth: 2,
    borderColor: Theme.colors.primary.dark,
    justifyContent: 'center',
    alignItems: 'center',
  },

  backPattern: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  backText: {
    fontSize: 40,
    opacity: 0.7,
  },

  corner: {
    position: 'absolute',
    top: 4,
    left: 4,
    alignItems: 'center',
  },

  cornerBottomRight: {
    top: 'auto',
    left: 'auto',
    bottom: 4,
    right: 4,
    transform: [{ rotate: '180deg' }],
  },

  rankText: {
    fontWeight: Theme.typography.fontWeight.bold,
    lineHeight: 20,
  },

  suitText: {
    lineHeight: 16,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  centerSuit: {
    fontWeight: Theme.typography.fontWeight.bold,
  },

  selected: {
    borderWidth: 3,
    borderColor: Theme.colors.game.highlight,
    ...Theme.shadows.lg,
  },

  disabled: {
    opacity: Theme.opacity.disabled,
  },
});

export default PlayingCard;
