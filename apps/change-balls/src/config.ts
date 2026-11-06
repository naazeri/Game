export const GAME_WIDTH = 1280;
export const GAME_HEIGHT = 720;
export const CENTER_X = GAME_WIDTH / 2; // 640
export const CENTER_Y = GAME_HEIGHT / 2; // 360

export const BALL_RADIUS = 38; // 76px diameter
export const PILLAR_ARM_LENGTH = 130; // distance from pivot to each ball center

// Left pillar pivot: y = CENTER_Y - PILLAR_ARM_LENGTH (230)
// At 90 deg (down), bottom ball is at 230 + 130 = 360 (CENTER_Y)
export const LEFT_PILLAR_X = 220;
export const LEFT_PILLAR_Y = CENTER_Y - PILLAR_ARM_LENGTH;

// Right pillar pivot: y = CENTER_Y + PILLAR_ARM_LENGTH (490)
// At 270 deg (up), top ball is at 490 - 130 = 360 (CENTER_Y)
export const RIGHT_PILLAR_X = GAME_WIDTH - 220; // 1060
export const RIGHT_PILLAR_Y = CENTER_Y + PILLAR_ARM_LENGTH;

export const CONTACT_LEFT_X = LEFT_PILLAR_X + BALL_RADIUS + BALL_RADIUS; // 296
export const CONTACT_RIGHT_X = RIGHT_PILLAR_X - BALL_RADIUS - BALL_RADIUS; // 984

export const DEFAULT_SPEED = 460; // pixels per second
export const ROTATION_DURATION = 140; // ms for 180 deg flip

export type BallColor = 'white' | 'black';
export type GameMode = 'onePlayer' | 'twoPlayer';

export const COLORS = {
  bgDark: 0x0c0f17,
  bgRadial: 0x161c2e,
  whiteBall: 0xffffff,
  blackBall: 0x181a20,
  silverLight: 0xf1f5f9,
  silverMid: 0xcfd8dc,
  silverDark: 0x94a3b8,
  silverBorder: 0x64748b,
  rodColor: 0x1e293b,
  rodBorder: 0x475569,
  rodAccentLine: 0xcfd8dc,
  pivotRing: 0x94a3b8,
  pivotCap: 0x64748b,
  textLight: '#f8fafc',
  textDim: '#94a3b8',
  gold: 0xfbbf24,
};
