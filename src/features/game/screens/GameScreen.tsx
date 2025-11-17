/**
 * Schnapsn - Game Screen
 * Spielbares Schnapsen-Spiel mit GameEngine-Integration
 */

import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native';
import { GameEngine } from '../GameEngine';
import { GameBoard } from '../components';
import { GameState, Move, GamePhase } from '@types/game';
import { Theme } from '@constants';
import { Button, Typography } from '@components';

export const GameScreen: React.FC = () => {
  const [gameEngine] = React.useState(
    () =>
      new GameEngine('player1', 'Du', 'player2', 'Computer', {
        targetScore: 66,
        allowTalonClose: true,
        allowTrumpExchange: true,
      })
  );

  const [gameState, setGameState] = React.useState<GameState>(
    gameEngine.getState()
  );

  const handleMove = (move: Move) => {
    try {
      const newState = gameEngine.makeMove(move);
      setGameState(newState);

      // Computer-Zug nach kurzer Verzögerung
      if (
        newState.currentPlayer === 'player2' &&
        newState.phase !== GamePhase.FINISHED
      ) {
        setTimeout(() => {
          makeComputerMove();
        }, 1000);
      }

      // Spielende prüfen
      if (newState.phase === GamePhase.FINISHED) {
        const result = gameEngine.getResult();
        if (result) {
          Alert.alert(
            'Spiel beendet!',
            `${result.winner === 'player1' ? 'Du hast' : 'Computer hat'} gewonnen!\n\n` +
              `Punkte: ${result.winnerScore} - ${result.loserScore}\n` +
              `Spielpunkte: ${result.gamePoints} ${getGamePointsText(result.gamePoints)}`,
            [{ text: 'OK' }]
          );
        }
      }
    } catch (error) {
      Alert.alert('Ungültiger Zug', (error as Error).message);
    }
  };

  const makeComputerMove = () => {
    const state = gameEngine.getState();
    const computer = state.players.find((p) => p.id === 'player2');

    if (!computer || state.currentPlayer !== 'player2') return;

    // Einfache KI: Spiele zufällige Karte
    if (computer.hand.length > 0) {
      const randomCard =
        computer.hand[Math.floor(Math.random() * computer.hand.length)];

      try {
        const newState = gameEngine.makeMove({
          type: 'play_card',
          playerId: 'player2',
          card: randomCard,
        });
        setGameState(newState);
      } catch (error) {
        console.error('Computer move error:', error);
      }
    }
  };

  const handleNewGame = () => {
    Alert.alert('Neues Spiel', 'Möchtest du ein neues Spiel starten?', [
      { text: 'Abbrechen', style: 'cancel' },
      {
        text: 'Neues Spiel',
        onPress: () => {
          // Seite neu laden würde neue GameEngine erstellen
          // Für vollständige Implementierung: Navigation zurück und wieder vorwärts
          Alert.alert(
            'Info',
            'Funktion in Entwicklung. App neu starten für neues Spiel.'
          );
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Typography variant="h4" color="inverse">
            Schnapsn
          </Typography>
          <Button
            title="Neu"
            onPress={handleNewGame}
            variant="ghost"
            size="small"
          />
        </View>

        {/* Game Board */}
        <GameBoard
          gameState={gameState}
          currentUserId="player1"
          onMove={handleMove}
        />

        {/* Info Footer */}
        <View style={styles.footer}>
          <Typography variant="caption" color="inverse" align="center">
            Ziel: 66 Punkte | Stiche: {gameState.trickHistory.length}
          </Typography>
          {gameState.phase === GamePhase.FINISHED && (
            <Typography
              variant="bodySmall"
              color="inverse"
              align="center"
              style={{ marginTop: Theme.spacing.xs }}
            >
              Spiel beendet - Gewinner:{' '}
              {gameState.winner === 'player1' ? 'Du' : 'Computer'}
            </Typography>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const getGamePointsText = (points: number): string => {
  switch (points) {
    case 1:
      return '(Einfach)';
    case 2:
      return '(Schneider)';
    case 3:
      return '(Schwarz)';
    default:
      return '';
  }
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Theme.colors.primary.main,
  },

  container: {
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    backgroundColor: Theme.colors.primary.dark,
  },

  footer: {
    padding: Theme.spacing.md,
    backgroundColor: Theme.colors.primary.dark,
  },
});

export default GameScreen;
