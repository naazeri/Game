export const GAME_CONFIG = {
  WIDTH: 480,
  HEIGHT: 854,
  FONT_FAMILY: 'FlappyFont',
  STORAGE_KEY_HIGHSCORE: 'flappy_bird_highscore',

  // Player / Physics constants (based on classic Flappy Bird feel)
  PLAYER_START_X: 115,
  PLAYER_START_Y: 427,
  GRAVITY_Y: 1350,
  FLAP_VELOCITY: -410,
  MAX_UP_ANGLE: -25,
  MAX_DOWN_ANGLE: 90,

  // World elements
  GROUND_Y: 686,
  SCROLL_SPEED_BG: 45,
  SCROLL_SPEED_GROUND: 215,

  // Pipes (Obstacles)
  PIPE_SPAWN_INTERVAL_MS: 1600,
  PIPE_SPEED: 215,
  PIPE_GAP: 155,
  PIPE_MIN_Y: 190,
  PIPE_MAX_Y: 520,

  VERSION: '1.0.0',
};
