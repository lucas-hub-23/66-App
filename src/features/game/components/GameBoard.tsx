/**
 * Schnapsn - Game Board Component
 * Haupt-Spielfeld mit allen Game-Komponenten
 */

import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { GameState, Card, Move, MoveType } from '@types/game';
import { Theme } from '@constants';
import { Typography } from '@components';
import { PlayingCard } from './PlayingCard';
import { PlayerHand } from './PlayerHand';
import { ScoreDisplay } from './ScoreDisplay';

interface GameBoardProps {
  gameState: GameState;
  currentUserId: string;
  onMove: (move: Move) => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  gameState,
  currentUserId,
  onMove,
}) => {
  const [selectedCard, setSelectedCard] = React.useState<Card | null>(null);

  const currentPlayer = gameState.players.find((p) => p.id === currentUserId);
  const opponent = gameState.players.find((p) => p.id !== currentUserId);

  if (!currentPlayer || !opponent) return null;

  const isMyTurn = gameState.currentPlayer === currentUserId;

  const handleCardPress = (card: Card) => {
    if (!isMyTurn) return;

    if (selectedCard?.id === card.id) {
      // Karte ausspielen
      onMove({
        type: MoveType.PLAY_CARD,
        playerId: currentUserId,
        card,
      });
      setSelectedCard(null);
    } else {
      // Karte auswählen
      setSelectedCard(card);
    }
  };

  return (
    <View style={styles.container}>
      {/* Score Display */}
      <ScoreDisplay
        player1={currentPlayer}
        player2={opponent}
        currentPlayerId={gameState.currentPlayer}
        showDetails
      />

      {/* Gegner-Hand (verdeckt) */}
      <View style={styles.opponentArea}>
        <Typography variant="bodySmall" color="secondary" align="center">
          {opponent.name}
        </Typography>
        <PlayerHand
          cards={opponent.hand}
          faceUp={false}
          layout="horizontal"
          size="small"
          disabled
        />
      </View>

      {/* Spielfeld-Mitte */}
      <View style={styles.playArea}>
        {/* Trump & Talon */}
        <View style={styles.talonArea}>
          {gameState.trumpCard && (
            <View style={styles.trumpCard}>
              <PlayingCard
                card={gameState.trumpCard}
                faceUp
                size="small"
                style={{ transform: [{ rotate: '90deg' }] }}
              />
            </View>
          )}
          {gameState.deck.length > 1 && !gameState.talonClosed && (
            <View style={styles.deckPile}>
              <PlayingCard
                card={gameState.deck[0]}
                faceUp={false}
                size="small"
              />
              <Typography
                variant="caption"
                color="secondary"
                align="center"
                style={styles.deckCount}
              >
                {gameState.deck.length} Karten
              </Typography>
            </View>
          )}
          {gameState.talonClosed && (
            <View style={styles.closedIndicator}>
              <Typography variant="label" color="accent">
                ZUGEDREHT
              </Typography>
            </View>
          )}
        </View>

        {/* Aktueller Stich */}
        <View style={styles.trickArea}>
          <Typography variant="label" color="secondary" align="center">
            STICH
          </Typography>
          <View style={styles.trickCards}>
            {gameState.currentTrick.leadCard ? (
              <View style={styles.trickCard}>
                <PlayingCard
                  card={gameState.currentTrick.leadCard}
                  faceUp
                  size="medium"
                />
              </View>
            ) : (
              <View style={styles.emptyTrickSlot}>
                <Typography variant="caption" color="disabled">
                  1. Karte
                </Typography>
              </View>
            )}

            {gameState.currentTrick.followCard ? (
              <View style={styles.trickCard}>
                <PlayingCard
                  card={gameState.currentTrick.followCard}
                  faceUp
                  size="medium"
                />
              </View>
            ) : (
              <View style={styles.emptyTrickSlot}>
                <Typography variant="caption" color="disabled">
                  2. Karte
                </Typography>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Eigene Hand */}
      <View style={styles.playerArea}>
        <Typography variant="bodySmall" color="accent" align="center">
          {currentPlayer.name} {isMyTurn && '(Dein Zug)'}
        </Typography>
        <PlayerHand
          cards={currentPlayer.hand}
          faceUp
          selectedCard={selectedCard}
          onCardPress={handleCardPress}
          disabled={!isMyTurn}
          layout="horizontal"
          size="medium"
        />
      </View>

      {/* Aktions-Hinweis */}
      {isMyTurn && selectedCard && (
        <View style={styles.actionHint}>
          <Typography variant="bodySmall" color="inverse" align="center">
            Tippe nochmal, um {selectedCard.rank} {selectedCard.suit} zu spielen
          </Typography>
        </View>
      )}
    </View>
  );
};

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.primary.main,
  },

  opponentArea: {
    paddingVertical: Theme.spacing.md,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },

  playArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Theme.spacing.lg,
  },

  talonArea: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.xl,
    gap: Theme.spacing.md,
  },

  trumpCard: {
    marginRight: Theme.spacing.sm,
  },

  deckPile: {
    alignItems: 'center',
  },

  deckCount: {
    marginTop: Theme.spacing.xs,
    color: Theme.colors.text.inverse,
  },

  closedIndicator: {
    padding: Theme.spacing.sm,
    backgroundColor: Theme.colors.status.warning,
    borderRadius: Theme.spacing.borderRadius.md,
  },

  trickArea: {
    alignItems: 'center',
  },

  trickCards: {
    flexDirection: 'row',
    gap: Theme.spacing.md,
    marginTop: Theme.spacing.sm,
  },

  trickCard: {
    ...Theme.shadows.lg,
  },

  emptyTrickSlot: {
    width: Theme.spacing.card.width,
    height: Theme.spacing.card.height,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    borderStyle: 'dashed',
    borderRadius: Theme.spacing.borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },

  playerArea: {
    paddingVertical: Theme.spacing.md,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },

  actionHint: {
    position: 'absolute',
    bottom: height * 0.25,
    left: Theme.spacing.md,
    right: Theme.spacing.md,
    padding: Theme.spacing.md,
    backgroundColor: Theme.colors.primary.dark,
    borderRadius: Theme.spacing.borderRadius.lg,
    ...Theme.shadows.xl,
  },
});

export default GameBoard;
