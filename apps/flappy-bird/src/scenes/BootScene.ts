import Phaser from 'phaser';
import { GAME_CONFIG } from '../config';

export class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload(): void {
    const { width, height } = this.scale;

    const loadingText = this.add.text(width / 2, height / 2, 'Loading...', {
      fontFamily: 'sans-serif',
      fontSize: '32px',
      color: '#ffffff',
    }).setOrigin(0.5);

    this.load.on('progress', (value: number) => {
      loadingText.setText(`Loading... ${Math.round(value * 100)}%`);
    });

    // Textures
    this.load.image('background', 'assets/images/background.png');
    this.load.image('ground', 'assets/images/ground.png');
    this.load.image('pipe', 'assets/images/pipe.png');
    this.load.image('message', 'assets/images/message.png');
    this.load.image('gameover', 'assets/images/gameover.png');
    this.load.image('play_button', 'assets/images/PlayButton.png');
    this.load.image('medal_bronze', 'assets/images/medal_bronze.png');
    this.load.image('medal_silver', 'assets/images/medal_silver.png');
    this.load.image('medal_gold', 'assets/images/medal_gold.png');
    this.load.image('medal_platinum', 'assets/images/medal_platinum.png');

    // Bird spritesheet (3 frames of 51x36)
    this.load.spritesheet('bird', 'assets/images/bird.png', {
      frameWidth: 51,
      frameHeight: 36,
    });

    // Audio SFX
    this.load.audio('wing', 'assets/sounds/wing.wav');
    this.load.audio('point', 'assets/sounds/point.wav');
    this.load.audio('hit', 'assets/sounds/hit.wav');
    this.load.audio('die', 'assets/sounds/die.wav');
    this.load.audio('swoosh', 'assets/sounds/swoosh.wav');
    this.load.audio('ui_click', 'assets/sounds/ui_click.wav');
  }

  async create(): Promise<void> {
    // Bird flapping animation
    this.anims.create({
      key: 'bird_flap',
      frames: this.anims.generateFrameNumbers('bird', { frames: [0, 1, 2, 1] }),
      frameRate: 10,
      repeat: -1,
    });

    // Ensure custom FlappyFont is ready
    try {
      if (document.fonts) {
        await document.fonts.load(`48px "${GAME_CONFIG.FONT_FAMILY}"`);
        await document.fonts.ready;
      }
    } catch {
      // Font fallback if needed
    }

    this.scene.start('GameScene');
  }
}
