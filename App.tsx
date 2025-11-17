/**
 * Schnapsn - Main App Entry Point
 * Spielbares Schnapsen/66 Kartenspiel
 */

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { GameScreen } from './src/features/game/screens/GameScreen';

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <GameScreen />
    </>
  );
}
