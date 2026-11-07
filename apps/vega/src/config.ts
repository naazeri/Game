export const GAME_WIDTH = 960;
export const GAME_HEIGHT = 600;
export const CENTER_X = GAME_WIDTH / 2; // 480
export const CENTER_Y = GAME_HEIGHT / 2; // 300

export const PLAYER_CONFIG = {
  coreRadius: 18,
  shieldRadius: 28,
  cannonLength: 26,
  cannonWidth: 7,
  maxShields: 3,
  startingShields: 3,
  maxEmpBombs: 3,
  startingEmpBombs: 1,
  fireRate: 0.18, // seconds between blaster shots (~5.5 shots/sec)
  invulnerabilityDuration: 1.0, // seconds after taking a hit (tighter recovery)
};

export enum WeaponType {
  Standard = 'standard',
  Triple = 'triple',
  Railgun = 'railgun',
  Homing = 'homing',
}

export interface WeaponInfo {
  type: WeaponType;
  name: string;
  icon: string;
  duration: number; // seconds
  color: number;
}

export const WEAPON_INFOS: Record<WeaponType, WeaponInfo> = {
  [WeaponType.Standard]: {
    type: WeaponType.Standard,
    name: 'PLASMA BLASTER',
    icon: '•',
    duration: 0,
    color: 0x00f0ff,
  },
  [WeaponType.Triple]: {
    type: WeaponType.Triple,
    name: 'TRIPLE SPREAD',
    icon: '⚡',
    duration: 8.0,
    color: 0xfacc15,
  },
  [WeaponType.Railgun]: {
    type: WeaponType.Railgun,
    name: 'PLASMA RAILGUN',
    icon: '💥',
    duration: 6.0,
    color: 0xff007f,
  },
  [WeaponType.Homing]: {
    type: WeaponType.Homing,
    name: 'HOMING MISSILES',
    icon: '🚀',
    duration: 7.5,
    color: 0x22c55e,
  },
};

export enum PowerUpType {
  Triple = 'triple',
  Railgun = 'railgun',
  Homing = 'homing',
  ShieldHeal = 'shield',
  EmpBomb = 'emp',
  ChronoFreeze = 'chrono',
}

export enum EnemyType {
  Asteroid = 'asteroid',
  Drone = 'drone',
  Cruiser = 'cruiser',
  Splitter = 'splitter',
  Dreadnought = 'dreadnought',
}

export interface GameSettings {
  sfxEnabled: boolean;
  musicEnabled: boolean;
  autoFire: boolean;
  screenShake: boolean;
  aimLaser: boolean;
}

export const DEFAULT_SETTINGS: GameSettings = {
  sfxEnabled: true,
  musicEnabled: true,
  autoFire: true,
  screenShake: true,
  aimLaser: true,
};

export const FONTS = {
  RETRO: 'VCR_OSD_MONO',
};

export const COLORS = {
  BG_DARK: 0x030614,
  CARD_BG: 0x0a1024,
  CYAN: 0x00f0ff,
  CRIMSON: 0xff2244,
  AMBER: 0xfacc15,
  PURPLE: 0xa855f7,
  EMERALD: 0x22c55e,
  MUTED: 0x6e85b0,
};

