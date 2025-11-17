/**
 * Schnapsn - Main App Entry Point
 * Demo des Design-Systems und der Komponenten
 */

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import { Theme } from './src/constants';
import { Button, Card, Typography } from './src/components';

export default function App() {
  const handlePress = () => {
    Alert.alert('Schnapsn', 'Willkommen beim Schnapsen! 🎴');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Typography variant="h1" color="inverse" align="center">
            Schnapsn
          </Typography>
          <Typography variant="body" color="inverse" align="center">
            Das authentische österreichische Schnapsen/66 Kartenspiel
          </Typography>
        </View>

        {/* Welcome Card */}
        <Card variant="elevated" padding="lg" style={styles.card}>
          <Typography variant="h3" color="accent">
            Willkommen! 🎴
          </Typography>
          <Typography variant="body" color="secondary" style={styles.spacing}>
            Dies ist eine Demo des Schnapsn Design-Systems mit authentischer
            österreichischer Beisl-Atmosphäre.
          </Typography>

          <Typography variant="h5" style={styles.sectionTitle}>
            Features:
          </Typography>
          <Typography variant="body" color="secondary">
            • Traditionelles Schnapsen/66 Gameplay
          </Typography>
          <Typography variant="body" color="secondary">
            • Multiplayer mit Matchmaking
          </Typography>
          <Typography variant="body" color="secondary">
            • Turniere & Community
          </Typography>
          <Typography variant="body" color="secondary">
            • Echtgeld-Funktion (nach Rechtsgutachten)
          </Typography>
        </Card>

        {/* Buttons Demo */}
        <Card variant="elevated" padding="lg" style={styles.card}>
          <Typography variant="h4" color="accent">
            Button-Varianten
          </Typography>

          <Button
            title="Primary Button"
            onPress={handlePress}
            variant="primary"
            size="large"
            fullWidth
            style={styles.button}
          />

          <Button
            title="Secondary Button"
            onPress={handlePress}
            variant="secondary"
            size="medium"
            fullWidth
            style={styles.button}
          />

          <Button
            title="Outline Button"
            onPress={handlePress}
            variant="outline"
            size="medium"
            fullWidth
            style={styles.button}
          />

          <Button
            title="Ghost Button"
            onPress={handlePress}
            variant="ghost"
            size="small"
            fullWidth
            style={styles.button}
          />

          <Button
            title="Loading..."
            onPress={handlePress}
            variant="primary"
            loading={true}
            fullWidth
            style={styles.button}
          />
        </Card>

        {/* Status Info */}
        <Card variant="outlined" padding="md" style={styles.card}>
          <Typography variant="label" color="accent">
            Projekt-Status
          </Typography>
          <Typography variant="bodySmall" color="secondary">
            Phase 1: MVP - Projekt-Setup abgeschlossen ✓
          </Typography>
          <Typography variant="bodySmall" color="secondary">
            Als nächstes: Schnapsen-Spiellogik Engine
          </Typography>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Theme.spacing.xl,
  },
  header: {
    backgroundColor: Theme.colors.primary.main,
    paddingTop: Theme.spacing['3xl'],
    paddingBottom: Theme.spacing.xl,
    paddingHorizontal: Theme.spacing.md,
  },
  card: {
    marginHorizontal: Theme.spacing.md,
    marginTop: Theme.spacing.md,
  },
  spacing: {
    marginTop: Theme.spacing.sm,
  },
  sectionTitle: {
    marginTop: Theme.spacing.md,
    marginBottom: Theme.spacing.sm,
  },
  button: {
    marginTop: Theme.spacing.sm,
  },
});
