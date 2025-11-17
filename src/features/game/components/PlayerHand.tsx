/**
 * Schnapsn - Player Hand Component
 * Zeigt die Karten eines Spielers in fächerförmiger Anordnung
 */

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card } from '@types/game';
import { PlayingCard } from './PlayingCard';
import { Theme } from '@constants';

interface PlayerHandProps {
  cards: Card[];
  faceUp?: boolean;
  selectedCard?: Card | null;
  onCardPress?: (card: Card) => void;
  disabled?: boolean;
  layout?: 'fan' | 'horizontal' | 'vertical';
  size?: 'small' | 'medium' | 'large';
}

export const PlayerHand: React.FC<PlayerHandProps> = ({
  cards,
  faceUp = true,
  selectedCard,
  onCardPress,
  disabled = false,
  layout = 'horizontal',
  size = 'medium',
}) => {
  if (cards.length === 0) {
    return <View style={styles.emptyHand} />;
  }

  if (layout === 'fan') {
    return (
      <View style={styles.fanContainer}>
        {cards.map((card, index) => {
          const isSelected = selectedCard?.id === card.id;
          const rotation = calculateFanRotation(index, cards.length);
          const translateY = calculateFanTranslation(index, cards.length);

          return (
            <View
              key={card.id}
              style={[
                styles.fanCard,
                {
                  transform: [{ rotate: `${rotation}deg` }, { translateY }],
                  zIndex: isSelected ? 100 : index,
                },
              ]}
            >
              <PlayingCard
                card={card}
                faceUp={faceUp}
                selected={isSelected}
                disabled={disabled}
                size={size}
                onPress={onCardPress}
              />
            </View>
          );
        })}
      </View>
    );
  }

  if (layout === 'vertical') {
    return (
      <ScrollView
        style={styles.verticalContainer}
        contentContainerStyle={styles.verticalContent}
      >
        {cards.map((card) => {
          const isSelected = selectedCard?.id === card.id;
          return (
            <View key={card.id} style={styles.verticalCard}>
              <PlayingCard
                card={card}
                faceUp={faceUp}
                selected={isSelected}
                disabled={disabled}
                size={size}
                onPress={onCardPress}
              />
            </View>
          );
        })}
      </ScrollView>
    );
  }

  // Horizontal layout (default)
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.horizontalContent}
      style={styles.horizontalContainer}
    >
      {cards.map((card) => {
        const isSelected = selectedCard?.id === card.id;
        return (
          <View key={card.id} style={styles.horizontalCard}>
            <PlayingCard
              card={card}
              faceUp={faceUp}
              selected={isSelected}
              disabled={disabled}
              size={size}
              onPress={onCardPress}
            />
          </View>
        );
      })}
    </ScrollView>
  );
};

/**
 * Berechnet die Rotation für Fan-Layout
 */
const calculateFanRotation = (index: number, totalCards: number): number => {
  const maxRotation = 30; // Maximale Rotation in Grad
  const center = (totalCards - 1) / 2;
  const offset = index - center;
  return (offset / totalCards) * maxRotation;
};

/**
 * Berechnet die Y-Translation für Fan-Layout
 */
const calculateFanTranslation = (index: number, totalCards: number): number => {
  const maxTranslation = 20; // Maximale Verschiebung
  const center = (totalCards - 1) / 2;
  const offset = Math.abs(index - center);
  return (offset / center) * maxTranslation;
};

const styles = StyleSheet.create({
  // Fan Layout
  fanContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 150,
    paddingHorizontal: Theme.spacing.md,
  },

  fanCard: {
    position: 'absolute',
  },

  // Horizontal Layout
  horizontalContainer: {
    flexGrow: 0,
  },

  horizontalContent: {
    paddingHorizontal: Theme.spacing.md,
    alignItems: 'center',
  },

  horizontalCard: {
    marginRight: Theme.spacing.sm,
  },

  // Vertical Layout
  verticalContainer: {
    flexGrow: 0,
  },

  verticalContent: {
    paddingVertical: Theme.spacing.md,
    alignItems: 'center',
  },

  verticalCard: {
    marginBottom: Theme.spacing.sm,
  },

  // Empty State
  emptyHand: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PlayerHand;
