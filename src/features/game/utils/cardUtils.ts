/**
 * Schnapsn - Card Utilities
 * Hilfsfunktionen für Karten-Management
 */

import { Card, Suit, Rank, CARD_VALUES } from '@types/game';

/**
 * Erstellt ein vollständiges Schnapsen-Deck (20 Karten)
 */
export const createDeck = (): Card[] => {
  const deck: Card[] = [];
  const suits = Object.values(Suit);
  const ranks = Object.values(Rank);

  suits.forEach((suit) => {
    ranks.forEach((rank) => {
      deck.push({
        suit,
        rank,
        id: `${suit}-${rank}`,
      });
    });
  });

  return deck;
};

/**
 * Mischt ein Kartendeck (Fisher-Yates Shuffle)
 */
export const shuffleDeck = (deck: Card[]): Card[] => {
  const shuffled = [...deck];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};

/**
 * Berechnet den Punktewert einer Karte
 */
export const getCardValue = (card: Card): number => {
  return CARD_VALUES[card.rank];
};

/**
 * Berechnet die Gesamtpunkte einer Kartensammlung
 */
export const calculatePoints = (cards: Card[]): number => {
  return cards.reduce((sum, card) => sum + getCardValue(card), 0);
};

/**
 * Prüft ob eine Karte ein Trumpf ist
 */
export const isTrump = (card: Card, trumpSuit: Suit): boolean => {
  return card.suit === trumpSuit;
};

/**
 * Vergleicht zwei Karten und ermittelt den Gewinner
 * @param leadCard - Erste ausgespielte Karte
 * @param followCard - Zweite Karte
 * @param trumpSuit - Trumpffarbe
 * @returns true wenn leadCard gewinnt, false wenn followCard gewinnt
 */
export const compareCards = (
  leadCard: Card,
  followCard: Card,
  trumpSuit: Suit
): boolean => {
  const leadIsTrump = isTrump(leadCard, trumpSuit);
  const followIsTrump = isTrump(followCard, trumpSuit);

  // Wenn beide Trumpf sind, höhere Karte gewinnt
  if (leadIsTrump && followIsTrump) {
    return isHigherRank(leadCard.rank, followCard.rank);
  }

  // Trumpf schlägt immer Nicht-Trumpf
  if (leadIsTrump && !followIsTrump) {
    return true;
  }
  if (!leadIsTrump && followIsTrump) {
    return false;
  }

  // Beide sind dieselbe Farbe (nicht Trumpf)
  if (leadCard.suit === followCard.suit) {
    return isHigherRank(leadCard.rank, followCard.rank);
  }

  // Verschiedene Farben, keine Trumpf -> leadCard gewinnt
  return true;
};

/**
 * Rangfolge der Karten (höchste zuerst)
 */
const RANK_ORDER: Rank[] = [
  Rank.ACE,
  Rank.TEN,
  Rank.KING,
  Rank.QUEEN,
  Rank.JACK,
];

/**
 * Prüft ob rank1 höher ist als rank2
 */
export const isHigherRank = (rank1: Rank, rank2: Rank): boolean => {
  return RANK_ORDER.indexOf(rank1) < RANK_ORDER.indexOf(rank2);
};

/**
 * Prüft ob eine Hochzeit (Marriage) möglich ist
 * König + Dame derselben Farbe
 */
export const canAnnounceMarriage = (hand: Card[], suit: Suit): boolean => {
  const hasKing = hand.some(
    (card) => card.suit === suit && card.rank === Rank.KING
  );
  const hasQueen = hand.some(
    (card) => card.suit === suit && card.rank === Rank.QUEEN
  );
  return hasKing && hasQueen;
};

/**
 * Berechnet Hochzeits-Punkte
 * 40 für Trump-Hochzeit, 20 für normale Hochzeit
 */
export const getMarriagePoints = (suit: Suit, trumpSuit: Suit): number => {
  return suit === trumpSuit ? 40 : 20;
};

/**
 * Findet eine Karte in einer Kartensammlung
 */
export const findCard = (
  cards: Card[],
  suit: Suit,
  rank: Rank
): Card | undefined => {
  return cards.find((card) => card.suit === suit && card.rank === rank);
};

/**
 * Entfernt eine Karte aus einer Kartensammlung
 */
export const removeCard = (cards: Card[], cardToRemove: Card): Card[] => {
  return cards.filter((card) => card.id !== cardToRemove.id);
};

/**
 * Sortiert Karten nach Farbe und Rang
 */
export const sortCards = (cards: Card[], trumpSuit?: Suit): Card[] => {
  return [...cards].sort((a, b) => {
    // Trumpf zuerst
    if (trumpSuit) {
      const aIsTrump = isTrump(a, trumpSuit);
      const bIsTrump = isTrump(b, trumpSuit);
      if (aIsTrump && !bIsTrump) return -1;
      if (!aIsTrump && bIsTrump) return 1;
    }

    // Dann nach Farbe
    if (a.suit !== b.suit) {
      return a.suit.localeCompare(b.suit);
    }

    // Dann nach Rang
    return RANK_ORDER.indexOf(a.rank) - RANK_ORDER.indexOf(b.rank);
  });
};
