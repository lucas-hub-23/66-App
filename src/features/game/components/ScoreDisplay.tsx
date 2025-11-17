/**
 * Schnapsn - Score Display Component
 * Zeigt die Punktestände beider Spieler an
 */

import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Player } from '@types/game';
import { Theme } from '@constants';
import { Typography } from '@components';

interface ScoreDisplayProps {
  player1: Player;
  player2: Player;
  currentPlayerId: string;
  targetScore?: number;
  showDetails?: boolean;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({
  player1,
  player2,
  currentPlayerId,
  targetScore = 66,
  showDetails = false,
}) => {
  const pulseAnim = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    // Pulse-Animation für aktiven Spieler
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);

  return (
    <View style={styles.container}>
      {/* Spieler 1 */}
      <PlayerScore
        player={player1}
        isActive={currentPlayerId === player1.id}
        targetScore={targetScore}
        showDetails={showDetails}
        pulseAnim={pulseAnim}
        color={Theme.colors.game.player1}
      />

      {/* VS / Ziel-Punktzahl */}
      <View style={styles.centerInfo}>
        <Typography variant="caption" color="secondary">
          Ziel
        </Typography>
        <Typography variant="h3" color="accent" weight="bold">
          {targetScore}
        </Typography>
      </View>

      {/* Spieler 2 */}
      <PlayerScore
        player={player2}
        isActive={currentPlayerId === player2.id}
        targetScore={targetScore}
        showDetails={showDetails}
        pulseAnim={pulseAnim}
        color={Theme.colors.game.player2}
      />
    </View>
  );
};

interface PlayerScoreProps {
  player: Player;
  isActive: boolean;
  targetScore: number;
  showDetails: boolean;
  pulseAnim: Animated.Value;
  color: string;
}

const PlayerScore: React.FC<PlayerScoreProps> = ({
  player,
  isActive,
  targetScore,
  showDetails,
  pulseAnim,
  color,
}) => {
  const animatedStyle = isActive ? { transform: [{ scale: pulseAnim }] } : {};

  const progress = Math.min((player.score / targetScore) * 100, 100);

  return (
    <View style={styles.playerContainer}>
      <Animated.View style={[styles.scoreCard, animatedStyle]}>
        {/* Spielername */}
        <Typography
          variant="bodySmall"
          color={isActive ? 'accent' : 'secondary'}
          align="center"
          weight="medium"
        >
          {player.name}
        </Typography>

        {/* Punktzahl */}
        <Typography variant="h2" align="center" weight="bold" style={{ color }}>
          {player.score}
        </Typography>

        {/* Fortschrittsbalken */}
        <View style={styles.progressBarContainer}>
          <View
            style={[
              styles.progressBar,
              {
                width: `${progress}%`,
                backgroundColor: color,
              },
            ]}
          />
        </View>

        {/* Details (optional) */}
        {showDetails && (
          <View style={styles.details}>
            <Typography variant="caption" color="secondary" align="center">
              Stiche: {player.tricks.length / 2} | Ansagen:{' '}
              {player.announcements}
            </Typography>
          </View>
        )}
      </Animated.View>

      {/* Aktiv-Indikator */}
      {isActive && (
        <View style={styles.activeIndicator}>
          <Typography variant="caption" color="accent" weight="bold">
            AM ZUG
          </Typography>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    backgroundColor: Theme.colors.background.card,
    ...Theme.shadows.sm,
  },

  playerContainer: {
    flex: 1,
    alignItems: 'center',
  },

  scoreCard: {
    width: '100%',
    padding: Theme.spacing.sm,
    backgroundColor: Theme.colors.background.secondary,
    borderRadius: Theme.spacing.borderRadius.md,
  },

  progressBarContainer: {
    height: 4,
    backgroundColor: Theme.colors.border.light,
    borderRadius: Theme.spacing.borderRadius.xs,
    marginTop: Theme.spacing.xs,
    overflow: 'hidden',
  },

  progressBar: {
    height: '100%',
    borderRadius: Theme.spacing.borderRadius.xs,
  },

  details: {
    marginTop: Theme.spacing.xs,
  },

  centerInfo: {
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.md,
  },

  activeIndicator: {
    marginTop: Theme.spacing.xs,
    paddingVertical: 2,
    paddingHorizontal: Theme.spacing.xs,
    backgroundColor: Theme.colors.primary.light,
    borderRadius: Theme.spacing.borderRadius.sm,
  },
});

export default ScoreDisplay;
