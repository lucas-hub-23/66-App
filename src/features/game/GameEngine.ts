/**
 * Schnapsn - Game Engine
 * Kern-Spiellogik für Schnapsen/66
 */

import {
  GameState,
  GamePhase,
  Player,
  Card,
  Suit,
  Rank,
  Move,
  MoveType,
  MoveValidation,
  GameResult,
  GameConfig,
  Trick,
} from '@types/game';
import {
  createDeck,
  shuffleDeck,
  calculatePoints,
  compareCards,
  canAnnounceMarriage,
  getMarriagePoints,
  removeCard,
  findCard,
} from './utils/cardUtils';

export class GameEngine {
  private state: GameState;
  private config: GameConfig;

  constructor(
    player1Id: string,
    player1Name: string,
    player2Id: string,
    player2Name: string,
    config: Partial<GameConfig> = {}
  ) {
    this.config = {
      targetScore: 66,
      allowTalonClose: true,
      allowTrumpExchange: true,
      ...config,
    };

    // Initialisiere Spielzustand
    this.state = this.initializeGame(
      player1Id,
      player1Name,
      player2Id,
      player2Name
    );
  }

  /**
   * Initialisiert ein neues Spiel
   */
  private initializeGame(
    player1Id: string,
    player1Name: string,
    player2Id: string,
    player2Name: string
  ): GameState {
    // Erstelle und mische Deck
    const deck = shuffleDeck(createDeck());

    // Spieler erstellen
    const player1: Player = {
      id: player1Id,
      name: player1Name,
      hand: [],
      tricks: [],
      score: 0,
      announcements: 0,
    };

    const player2: Player = {
      id: player2Id,
      name: player2Name,
      hand: [],
      tricks: [],
      score: 0,
      announcements: 0,
    };

    // Karten austeilen (3-2-3-2 für jeden Spieler)
    player1.hand = [deck[0], deck[2], deck[4], deck[6], deck[8]];
    player2.hand = [deck[1], deck[3], deck[5], deck[7], deck[9]];

    const remainingDeck = deck.slice(10);
    const trumpCard = remainingDeck[0];

    return {
      id: `game-${Date.now()}`,
      phase: GamePhase.PLAYING,
      players: [player1, player2],
      currentPlayer: player1Id, // Player 1 beginnt
      deck: remainingDeck,
      trump: trumpCard.suit,
      trumpCard,
      currentTrick: {
        leadCard: null,
        followCard: null,
        winner: null,
      },
      trickHistory: [],
      talonClosed: false,
      closedBy: null,
      winner: null,
      winnerPoints: 0,
    };
  }

  /**
   * Gibt den aktuellen Spielzustand zurück
   */
  public getState(): GameState {
    return { ...this.state };
  }

  /**
   * Führt einen Spielzug aus
   */
  public makeMove(move: Move): GameState {
    const validation = this.validateMove(move);
    if (!validation.valid) {
      throw new Error(`Invalid move: ${validation.error}`);
    }

    switch (move.type) {
      case MoveType.PLAY_CARD:
        this.playCard(move.playerId, move.card!);
        break;
      case MoveType.CLOSE_TALON:
        this.closeTalon(move.playerId);
        break;
      case MoveType.ANNOUNCE_MARRIAGE:
        this.announceMarriage(move.playerId, move.marriage!);
        break;
      case MoveType.EXCHANGE_TRUMP:
        this.exchangeTrump(move.playerId);
        break;
    }

    return this.getState();
  }

  /**
   * Spielt eine Karte aus
   */
  private playCard(playerId: string, card: Card): void {
    const player = this.getPlayer(playerId);
    const opponent = this.getOpponent(playerId);

    // Entferne Karte von der Hand
    player.hand = removeCard(player.hand, card);

    // Erste oder zweite Karte im Stich?
    if (this.state.currentTrick.leadCard === null) {
      // Erste Karte
      this.state.currentTrick.leadCard = card;
      this.state.currentPlayer = opponent.id;
    } else {
      // Zweite Karte - Stich auswerten
      this.state.currentTrick.followCard = card;
      this.evaluateTrick();
    }
  }

  /**
   * Wertet einen Stich aus
   */
  private evaluateTrick(): void {
    const { leadCard, followCard } = this.state.currentTrick;
    if (!leadCard || !followCard) return;

    const leadPlayer =
      this.state.currentPlayer === this.state.players[0].id
        ? this.state.players[1]
        : this.state.players[0];
    const followPlayer = this.getPlayer(this.state.currentPlayer);

    // Wer gewinnt?
    const leadWins = compareCards(leadCard, followCard, this.state.trump);
    const winner = leadWins ? leadPlayer : followPlayer;
    const loser = leadWins ? followPlayer : leadPlayer;

    // Stichkarten zum Gewinner hinzufügen
    winner.tricks.push(leadCard, followCard);

    // Punkte berechnen
    winner.score = calculatePoints(winner.tricks) + winner.announcements;
    loser.score = calculatePoints(loser.tricks) + loser.announcements;

    // Stich in Historie speichern
    this.state.trickHistory.push({
      ...this.state.currentTrick,
      winner: winner.id,
    });

    // Neuen Stich beginnen
    this.state.currentTrick = {
      leadCard: null,
      followCard: null,
      winner: null,
    };

    // Neue Karten ziehen (wenn Talon nicht leer und nicht zugedreht)
    if (!this.state.talonClosed && this.state.deck.length > 1) {
      winner.hand.push(this.state.deck.shift()!);
      loser.hand.push(this.state.deck.shift()!);
    }

    // Gewinner beginnt nächsten Stich
    this.state.currentPlayer = winner.id;

    // Spiel beenden?
    this.checkGameEnd();
  }

  /**
   * Schließt den Talon ("Zudrehen")
   */
  private closeTalon(playerId: string): void {
    this.state.talonClosed = true;
    this.state.closedBy = playerId;
    this.state.phase = GamePhase.TALON_CLOSED;
  }

  /**
   * Sagt eine Hochzeit an
   */
  private announceMarriage(playerId: string, suit: Suit): void {
    const player = this.getPlayer(playerId);
    const points = getMarriagePoints(suit, this.state.trump);
    player.announcements += points;
    player.score += points;
  }

  /**
   * Tauscht Trump-Unter (Bube) gegen Trump-Karte
   */
  private exchangeTrump(playerId: string): void {
    const player = this.getPlayer(playerId);
    const trumpJack = findCard(player.hand, this.state.trump, Rank.JACK);

    if (trumpJack && this.state.trumpCard) {
      // Tausche Karten
      player.hand = removeCard(player.hand, trumpJack);
      player.hand.push(this.state.trumpCard);
      this.state.trumpCard = trumpJack;
    }
  }

  /**
   * Validiert einen Spielzug
   */
  public validateMove(move: Move): MoveValidation {
    // Ist der Spieler am Zug?
    if (move.playerId !== this.state.currentPlayer) {
      return { valid: false, error: 'Not your turn' };
    }

    // Spiel beendet?
    if (this.state.phase === GamePhase.FINISHED) {
      return { valid: false, error: 'Game is finished' };
    }

    switch (move.type) {
      case MoveType.PLAY_CARD:
        return this.validatePlayCard(move.playerId, move.card!);
      case MoveType.CLOSE_TALON:
        return this.validateCloseTalon();
      case MoveType.ANNOUNCE_MARRIAGE:
        return this.validateMarriage(move.playerId, move.marriage!);
      case MoveType.EXCHANGE_TRUMP:
        return this.validateTrumpExchange(move.playerId);
      default:
        return { valid: false, error: 'Unknown move type' };
    }
  }

  private validatePlayCard(playerId: string, card: Card): MoveValidation {
    const player = this.getPlayer(playerId);

    // Hat Spieler die Karte?
    if (!player.hand.some((c) => c.id === card.id)) {
      return { valid: false, error: 'Card not in hand' };
    }

    // TODO: Bedienungszwang prüfen (nach Talon-Schluss)
    // Muss Farbe bedient werden?

    return { valid: true };
  }

  private validateCloseTalon(): MoveValidation {
    if (!this.config.allowTalonClose) {
      return { valid: false, error: 'Talon close not allowed' };
    }
    if (this.state.talonClosed) {
      return { valid: false, error: 'Talon already closed' };
    }
    if (this.state.currentTrick.leadCard !== null) {
      return { valid: false, error: 'Cannot close during trick' };
    }
    return { valid: true };
  }

  private validateMarriage(playerId: string, suit: Suit): MoveValidation {
    const player = this.getPlayer(playerId);

    if (!canAnnounceMarriage(player.hand, suit)) {
      return {
        valid: false,
        error: 'No marriage in this suit',
      };
    }

    // Muss die führende Karte sein
    if (this.state.currentTrick.leadCard !== null) {
      return {
        valid: false,
        error: 'Marriage can only be announced when leading',
      };
    }

    return { valid: true };
  }

  private validateTrumpExchange(playerId: string): MoveValidation {
    if (!this.config.allowTrumpExchange) {
      return { valid: false, error: 'Trump exchange not allowed' };
    }

    const player = this.getPlayer(playerId);
    const hasTrumpJack = player.hand.some(
      (card) => card.suit === this.state.trump && card.rank === Rank.JACK
    );

    if (!hasTrumpJack) {
      return { valid: false, error: 'No trump jack in hand' };
    }

    if (this.state.talonClosed) {
      return { valid: false, error: 'Cannot exchange after talon close' };
    }

    return { valid: true };
  }

  /**
   * Prüft ob das Spiel beendet ist
   */
  private checkGameEnd(): void {
    const [player1, player2] = this.state.players;

    // 66 Punkte erreicht?
    if (player1.score >= this.config.targetScore) {
      this.endGame(player1.id);
      return;
    }
    if (player2.score >= this.config.targetScore) {
      this.endGame(player2.id);
      return;
    }

    // Alle Karten gespielt?
    if (player1.hand.length === 0 && player2.hand.length === 0) {
      // Wer hat mehr Punkte?
      const winnerId = player1.score > player2.score ? player1.id : player2.id;
      this.endGame(winnerId);
    }
  }

  /**
   * Beendet das Spiel
   */
  private endGame(winnerId: string): void {
    const winner = this.getPlayer(winnerId);
    const loser = this.getOpponent(winnerId);

    // Berechne Spielpunkte (1, 2, oder 3)
    let gamePoints = 1;
    if (loser.score < 33) {
      gamePoints = 2; // Schneider
    }
    if (loser.score === 0) {
      gamePoints = 3; // Schwarz
    }

    this.state.phase = GamePhase.FINISHED;
    this.state.winner = winnerId;
    this.state.winnerPoints = gamePoints;
  }

  /**
   * Gibt das Spielergebnis zurück
   */
  public getResult(): GameResult | null {
    if (this.state.phase !== GamePhase.FINISHED) {
      return null;
    }

    const winner = this.getPlayer(this.state.winner!);
    const loser = this.getOpponent(this.state.winner!);

    return {
      winner: winner.id,
      loser: loser.id,
      winnerScore: winner.score,
      loserScore: loser.score,
      gamePoints: this.state.winnerPoints,
    };
  }

  /**
   * Hilfsmethoden
   */
  private getPlayer(playerId: string): Player {
    return this.state.players.find((p) => p.id === playerId)!;
  }

  private getOpponent(playerId: string): Player {
    return this.state.players.find((p) => p.id !== playerId)!;
  }
}
