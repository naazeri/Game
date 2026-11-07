export const GAME_WIDTH = 960;
export const GAME_HEIGHT = 600;

export const COURT_CONFIG = {
  topMargin: 66,
  bottomMargin: 46,
  leftMargin: 40,
  rightMargin: 40,
  lineWidth: 3,
  borderColor: 0x22334e,
  netColor: 0x1d2c44,
  netDash: 12,
  netGap: 8,
};

export const PADDLE_CONFIG = {
  width: 20,
  height: 94,
  radius: 10,
  acceleration: 2600, // px/s²
  maxSpeed: 620,      // px/s
  iceFriction: 4.0,   // LinearDrag = 4.0 (exponential decay)
  wallRestitution: 0.2, // soft bumper reflection
  player1Color: 0x00f0ff,
  player2Color: 0xff3366,
  p1X: 70,
  p2X: GAME_WIDTH - 70,
};

export const BALL_CONFIG = {
  radius: 8,
  initialSpeed: 380,
  speedIncrement: 22,
  maxSpeed: 880,
  minXSpeed: 200,
  color: 0xffffff,
  bounceDistraction: 1.25, // vertical deflection boost on curved corners
};

export enum GameMode {
  OnePlayer = '1player',
  TwoPlayer = '2player',
}

export enum GameStyle {
  Classic = 'classic',
  Arcade = 'arcade',
}

export enum AIDifficulty {
  Casual = 'casual',
  Normal = 'normal',
  Pro = 'pro',
}

export interface AIBotProfile {
  id: AIDifficulty;
  name: string;
  tagline: string;
  avatar: string;
  speedMultiplier: number;
  deadzone: number;
  cornerAimRate: number; // probability to deliberately use rounded corners for sharp cuts
}

export const AI_BOT_PROFILES: Record<AIDifficulty, AIBotProfile> = {
  [AIDifficulty.Casual]: {
    id: AIDifficulty.Casual,
    name: 'BIT BOT',
    tagline: 'The Gentle Rookie',
    avatar: '🤖',
    speedMultiplier: 0.85,
    deadzone: 24,
    cornerAimRate: 0.05,
  },
  [AIDifficulty.Normal]: {
    id: AIDifficulty.Normal,
    name: 'GLIDER',
    tagline: 'The Smooth Rover',
    avatar: '⚡',
    speedMultiplier: 1.0,
    deadzone: 14,
    cornerAimRate: 0.35,
  },
  [AIDifficulty.Pro]: {
    id: AIDifficulty.Pro,
    name: 'CYBER NEO',
    tagline: 'The Corner Master',
    avatar: '👑',
    speedMultiplier: 1.15,
    deadzone: 6,
    cornerAimRate: 0.8,
  },
};

export enum GameTheme {
  CyberNeon = 'cyber_neon',
  PureIce = 'pure_ice',
  RetroAtari = 'retro_atari',
  Synthwave = 'synthwave',
}

export interface ThemeColors {
  id: GameTheme;
  name: string;
  bgHex: string;
  bgNumber: number;
  headerHex: string;
  headerNumber: number;
  railBorder: number;
  netColor: number;
  p1Color: number;
  p2Color: number;
  scoreColor: string;
  accentColor: string;
}

export const GAME_THEMES: Record<GameTheme, ThemeColors> = {
  [GameTheme.CyberNeon]: {
    id: GameTheme.CyberNeon,
    name: 'CYBER NEON',
    bgHex: '#090c15',
    bgNumber: 0x090c15,
    headerHex: '#0c111d',
    headerNumber: 0x0c111d,
    railBorder: 0x22334e,
    netColor: 0x1d2c44,
    p1Color: 0x00f0ff, // Cyan
    p2Color: 0xff3366, // Neon Rose
    scoreColor: '#243754',
    accentColor: '#00f0ff',
  },
  [GameTheme.PureIce]: {
    id: GameTheme.PureIce,
    name: 'PURE ICE',
    bgHex: '#040d1a',
    bgNumber: 0x040d1a,
    headerHex: '#081628',
    headerNumber: 0x081628,
    railBorder: 0x38bdf8,
    netColor: 0x1e3a5f,
    p1Color: 0x38bdf8, // Ice Blue
    p2Color: 0xf1f5f9, // Frost White
    scoreColor: '#1e3a5f',
    accentColor: '#38bdf8',
  },
  [GameTheme.RetroAtari]: {
    id: GameTheme.RetroAtari,
    name: 'RETRO ATARI',
    bgHex: '#050a05',
    bgNumber: 0x050a05,
    headerHex: '#0a140a',
    headerNumber: 0x0a140a,
    railBorder: 0x15803d,
    netColor: 0x14532d,
    p1Color: 0x22c55e, // Phosphor Green
    p2Color: 0xeab308, // Amber Gold
    scoreColor: '#14532d',
    accentColor: '#22c55e',
  },
  [GameTheme.Synthwave]: {
    id: GameTheme.Synthwave,
    name: 'SYNTHWAVE',
    bgHex: '#12071f',
    bgNumber: 0x12071f,
    headerHex: '#1b0c2e',
    headerNumber: 0x1b0c2e,
    railBorder: 0x9333ea,
    netColor: 0x581c87,
    p1Color: 0xc084fc, // Lavender Purple
    p2Color: 0xf97316, // Sunset Orange
    scoreColor: '#581c87',
    accentColor: '#c084fc',
  },
};

export enum PowerUpKind {
  Freeze = 'freeze',
  Extend = 'extend',
  HyperSpeed = 'hyper',
}

export interface MatchSettings {
  mode: GameMode;
  style: GameStyle;
  theme: GameTheme;
  targetScore: number; // 5, 7, 10, or 0 (endless)
  aiDifficulty: AIDifficulty;
  sfxEnabled: boolean;
  musicEnabled: boolean;
}

export const DEFAULT_SETTINGS: MatchSettings = {
  mode: GameMode.OnePlayer,
  style: GameStyle.Arcade,
  theme: GameTheme.CyberNeon,
  targetScore: 5,
  aiDifficulty: AIDifficulty.Normal,
  sfxEnabled: true,
  musicEnabled: true,
};
