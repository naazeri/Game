export const GAME_WIDTH = 800;
export const GAME_HEIGHT = 600;

export const ARENA_BOUNDS = {
  left: 20,
  right: 780,
  top: 56, // beneath top HUD bar
  bottom: 588,
  width: 760,
  height: 532,
};

export const PADDLE_CONFIG = {
  y: 546,
  baseWidth: 106,
  expandedWidth: 152,
  height: 16,
  radius: 8,
  minX: ARENA_BOUNDS.left + 53,
  maxX: ARENA_BOUNDS.right - 53,
  laserDuration: 12.0, // seconds
  laserFireRate: 0.22, // seconds between laser shots
  expandDuration: 12.0,
  shieldDuration: 15.0,
};

export const BALL_CONFIG = {
  radius: 7,
  baseSpeed: 450,
  maxSpeed: 640,
  speedStep: 2.2, // speed added per paddle/block bounce
  launchYOffset: -16, // position above paddle when waiting for launch
  fireballDuration: 8.5,
  slowdownDuration: 10.0,
  slowdownFactor: 0.65,
};

export const BLOCK_CONFIG = {
  width: 68,
  height: 22,
  paddingX: 6,
  paddingY: 6,
  gridCols: 10,
  gridStartX: 33, // (800 - (10 * 68 + 9 * 6)) / 2 = (800 - 734) / 2 = 33
  gridStartY: 96,
};

export enum BlockType {
  Emerald = 'emerald',   // 1 hit
  Cyan = 'cyan',         // 2 hits
  Magenta = 'magenta',   // 3 hits
  Gold = 'gold',         // 4 hits, guaranteed power-up
  Bomb = 'bomb',         // 1 hit, explodes adjacent blocks in radius
  Titanium = 'titanium', // Unbreakable
}

export interface BlockDef {
  type: BlockType;
  maxHp: number;
  points: number;
  color: number;
  colorHex: string;
  glowColor: number;
  name: string;
}

export const BLOCK_DEFS: Record<BlockType, BlockDef> = {
  [BlockType.Emerald]: {
    type: BlockType.Emerald,
    maxHp: 1,
    points: 100,
    color: 0x10b981,
    colorHex: '#10b981',
    glowColor: 0x34d399,
    name: 'EMERALD GLASS',
  },
  [BlockType.Cyan]: {
    type: BlockType.Cyan,
    maxHp: 2,
    points: 200,
    color: 0x06b6d4,
    colorHex: '#06b6d4',
    glowColor: 0x22d3ee,
    name: 'CYAN ALLOY',
  },
  [BlockType.Magenta]: {
    type: BlockType.Magenta,
    maxHp: 3,
    points: 350,
    color: 0xd946ef,
    colorHex: '#d946ef',
    glowColor: 0xf472b6,
    name: 'MAGENTA CORE',
  },
  [BlockType.Gold]: {
    type: BlockType.Gold,
    maxHp: 4,
    points: 500,
    color: 0xfacc15,
    colorHex: '#facc15',
    glowColor: 0xfef08a,
    name: 'SOLAR VAULT',
  },
  [BlockType.Bomb]: {
    type: BlockType.Bomb,
    maxHp: 1,
    points: 250,
    color: 0xef4444,
    colorHex: '#ef4444',
    glowColor: 0xf87171,
    name: 'VOLATILE BOMB',
  },
  [BlockType.Titanium]: {
    type: BlockType.Titanium,
    maxHp: 99999,
    points: 0,
    color: 0x64748b,
    colorHex: '#64748b',
    glowColor: 0x94a3b8,
    name: 'TITANIUM PLATING',
  },
};

export enum PowerUpType {
  MultiBall = 'multiBall',
  Laser = 'laser',
  SafetyFloor = 'safetyFloor',
  Expand = 'expand',
  Fireball = 'fireball',
  ChronoSlow = 'chronoSlow',
  ExtraLife = 'extraLife',
}

export interface PowerUpInfo {
  type: PowerUpType;
  name: string;
  symbol: string;
  color: number;
  colorHex: string;
  duration: number; // 0 for instant (e.g. Life, MultiBall)
}

export const POWER_UP_INFOS: Record<PowerUpType, PowerUpInfo> = {
  [PowerUpType.MultiBall]: {
    type: PowerUpType.MultiBall,
    name: 'TRI-BALL SPLIT',
    symbol: '⚡',
    color: 0x38bdf8,
    colorHex: '#38bdf8',
    duration: 0,
  },
  [PowerUpType.Laser]: {
    type: PowerUpType.Laser,
    name: 'TWIN LASERS',
    symbol: '🔫',
    color: 0xf43f5e,
    colorHex: '#f43f5e',
    duration: PADDLE_CONFIG.laserDuration,
  },
  [PowerUpType.SafetyFloor]: {
    type: PowerUpType.SafetyFloor,
    name: 'ENERGY BARRIER',
    symbol: '🛡️',
    color: 0x10b981,
    colorHex: '#10b981',
    duration: PADDLE_CONFIG.shieldDuration,
  },
  [PowerUpType.Expand]: {
    type: PowerUpType.Expand,
    name: 'PADDLE EXPAND',
    symbol: '📏',
    color: 0x06b6d4,
    colorHex: '#06b6d4',
    duration: PADDLE_CONFIG.expandDuration,
  },
  [PowerUpType.Fireball]: {
    type: PowerUpType.Fireball,
    name: 'PLASMA FIREBALL',
    symbol: '🔥',
    color: 0xf97316,
    colorHex: '#f97316',
    duration: BALL_CONFIG.fireballDuration,
  },
  [PowerUpType.ChronoSlow]: {
    type: PowerUpType.ChronoSlow,
    name: 'CHRONO SLOW',
    symbol: '❄️',
    color: 0xa855f7,
    colorHex: '#a855f7',
    duration: BALL_CONFIG.slowdownDuration,
  },
  [PowerUpType.ExtraLife]: {
    type: PowerUpType.ExtraLife,
    name: 'REPAIR CELL',
    symbol: '❤️',
    color: 0xec4899,
    colorHex: '#ec4899',
    duration: 0,
  },
};

export const FONTS = {
  RETRO: 'VCR_OSD_MONO, monospace',
};

export const COLORS = {
  bgDark: 0x05070e,
  bgGlow: 0x0b1120,
  neonCyan: 0x00f0ff,
  neonPink: 0xec4899,
  neonYellow: 0xfacc15,
  hudBorder: 0x1e293b,
  textWhite: '#ffffff',
  textDim: '#7f9bc8',
};

export const COMBO_CONFIG = {
  maxMultiplier: 5,
  musicalNotes: [261.63, 293.66, 329.63, 392.00, 440.00, 523.25], // C4, D4, E4, G4, A4, C5
};

export interface GameSettings {
  sfxVolume: number;
  musicVolume: number;
  sfxMuted: boolean;
  musicMuted: boolean;
}

export const DEFAULT_SETTINGS: GameSettings = {
  sfxVolume: 0.75,
  musicVolume: 0.5,
  sfxMuted: false,
  musicMuted: false,
};
