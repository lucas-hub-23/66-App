/**
 * Schnapsn - Game Types
 * TypeScript-Typen für die Schnapsen-Spiellogik
 */

// Kartenfarben (Suits) - Traditionelle österreichische Karten
export enum Suit {
  HEARTS = 'hearts', // Herz (Rot)
  BELLS = 'bells', // Schellen (Gelb/Gold)
  LEAVES = 'leaves', // Laub (Grün)
  ACORNS = 'acorns', // Eichel (Braun)
}

// Kartenwerte (Ranks)
export enum Rank {
  ACE = 'ace', // Ass (Daus) - 11 Punkte
  TEN = 'ten', // Zehner - 10 Punkte
  KING = 'king', // König - 4 Punkte
  QUEEN = 'queen', // Dame (Ober) - 3 Punkte
  JACK = 'jack', // Bube (Unter) - 2 Punkte
}

// Punktewerte der Karten
export const CARD_VALUES: Record<Rank, number> = {
  [Rank.ACE]: 11,
  [Rank.TEN]: 10,
  [Rank.KING]: 4,
  [Rank.QUEEN]: 3,
  [Rank.JACK]: 2,
};

// Spielkarte
export interface Card {
  suit: Suit;
  rank: Rank;
  id: string; // Unique ID für React Keys
}

// Spieler
export interface Player {
  id: string;
  name: string;
  hand: Card[]; // Karten auf der Hand
  tricks: Card[]; // Gewonnene Stiche
  score: number; // Aktuelle Punkte
  announcements: number; // Hochzeiten-Punkte (20/40)
}

// Spielzug-Typen
export enum MoveType {
  PLAY_CARD = 'play_card',
  CLOSE_TALON = 'close_talon', // "Zudrehen"
  ANNOUNCE_MARRIAGE = 'announce_marriage', // Hochzeit ansagen
  EXCHANGE_TRUMP = 'exchange_trump', // Trump-Unter austauschen
}

// Spielzug
export interface Move {
  type: MoveType;
  playerId: string;
  card?: Card; // Bei PLAY_CARD
  marriage?: Suit; // Bei ANNOUNCE_MARRIAGE
}

// Stich (Trick)
export interface Trick {
  leadCard: Card | null; // Erste ausgespielte Karte
  followCard: Card | null; // Zweite Karte
  winner: string | null; // Spieler-ID des Gewinners
}

// Spielphase
export enum GamePhase {
  DEALING = 'dealing', // Karten werden verteilt
  PLAYING = 'playing', // Normales Spiel
  TALON_CLOSED = 'talon_closed', // Talon wurde zugedreht
  FINISHED = 'finished', // Spiel beendet
}

// Spielzustand
export interface GameState {
  id: string;
  phase: GamePhase;
  players: [Player, Player]; // Genau 2 Spieler
  currentPlayer: string; // ID des aktiven Spielers
  deck: Card[]; // Verbleibende Karten im Talon
  trump: Suit; // Trumpffarbe
  trumpCard: Card | null; // Aufgedeckte Trumpfkarte
  currentTrick: Trick; // Aktueller Stich
  trickHistory: Trick[]; // Alle vorherigen Stiche
  talonClosed: boolean; // Wurde der Talon zugedreht?
  closedBy: string | null; // Wer hat zugedreht?
  winner: string | null; // Gewinner (wenn finished)
  winnerPoints: number; // Punkte des Gewinners (1, 2, oder 3)
}

// Spielergebnis
export interface GameResult {
  winner: string;
  loser: string;
  winnerScore: number;
  loserScore: number;
  gamePoints: number; // 1 (einfach), 2 (Schneider), oder 3 (Schwarz)
}

// Spielkonfiguration
export interface GameConfig {
  targetScore: number; // Standard: 66
  allowTalonClose: boolean; // Standard: true
  allowTrumpExchange: boolean; // Standard: true
}

// Validierungsergebnis für Züge
export interface MoveValidation {
  valid: boolean;
  error?: string;
}
