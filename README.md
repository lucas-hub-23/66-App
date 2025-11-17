# Schnapsn - Das authentische österreichische Schnapsen/66 Kartenspiel

🎴 **Skill-Gaming mit Community** | 🇦🇹 **Made in Austria** | 🏆 **Turniere & Echtgeld**

## Über das Projekt

Schnapsn ist die moderne digitale Plattform für das traditionelle österreichische Kartenspiel Schnapsen/66. Als Geschicklichkeitsspiel klassifiziert, bietet die App:

- ✅ Authentische Beisl-Atmosphäre
- ✅ Multiplayer mit Matchmaking
- ✅ Turniere mit Preispools
- ✅ Community-Features (Chat, Freunde, Statistiken)
- ✅ Rechtlich abgesichert (Skill-Game, kein Glücksspiel)

## Tech Stack

- **Frontend**: React Native + Expo
- **Backend**: Firebase (Authentication, Firestore, Cloud Functions)
- **Programmiersprache**: TypeScript
- **State Management**: TBD (Context API / Redux)
- **Testing**: Jest + React Native Testing Library

## Entwicklungs-Roadmap

### Phase 1: MVP (Wochen 1-21)

- [x] Projekt-Setup
- [ ] Spiellogik-Engine
- [ ] Multiplayer-Infrastruktur
- [ ] User-Management & KYC
- [ ] Turniere & Community
- [ ] Testing & Launch-Vorbereitung

### Phase 2: Echtgeld-Aktivierung

- [ ] Rechtsgutachten einholen
- [ ] Payment-Provider aktivieren (Stripe, PayPal)
- [ ] KYC-Prozess implementieren
- [ ] Compliance & Monitoring

### Phase 3: Expansion

- [ ] Voice-Chat Integration
- [ ] Deutschland-Markt
- [ ] iOS/Android App Store Launch

## Installation

```bash
# Dependencies installieren
npm install

# Development Server starten
npm start

# iOS Simulator (macOS only)
npm run ios

# Android Emulator
npm run android
```

## Project Structure

```
src/
├── features/          # Feature-based modules
│   ├── auth/         # Authentifizierung
│   ├── game/         # Spiellogik
│   ├── multiplayer/  # Multiplayer
│   ├── profile/      # User-Profile
│   └── tournaments/  # Turniere
├── components/       # Shared components
├── hooks/            # Custom hooks
├── utils/            # Utility functions
├── services/         # API services
├── constants/        # Constants (colors, etc.)
├── types/            # TypeScript types
└── navigation/       # Navigation setup
```

## Rechtliche Hinweise

Schnapsen/66 ist in Deutschland und Österreich als **Geschicklichkeitsspiel** klassifiziert und unterliegt **nicht** dem Glücksspielrecht. Die App richtet sich ausschließlich an Personen ab 18 Jahren.

## Kontakt & Support

- **Website**: (TBD)
- **Discord**: (TBD)
- **Email**: support@schnapsn.app

---

🇦🇹 **Entwickelt mit ❤️ für die österreichische Kartenspiel-Community**
