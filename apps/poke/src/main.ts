import Phaser from 'phaser';
import { GAME_CONFIG } from './config';
import { BootScene } from './scenes/BootScene';
import { GameScene } from './scenes/GameScene';

const phaserConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'game-container',
  width: GAME_CONFIG.CANVAS_WIDTH,
  height: GAME_CONFIG.CANVAS_HEIGHT,
  backgroundColor: '#0b0f19',
  pixelArt: true,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.NO_CENTER,
    fullscreenTarget: 'game-container',
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false,
    },
  },
  scene: [BootScene, GameScene],
};

const game = new Phaser.Game(phaserConfig);

// Expose on window for testing
(window as unknown as { game: Phaser.Game }).game = game;

export default game;
