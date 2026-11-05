import Phaser from 'phaser';
import { GAME_CONFIG } from '../config';

export class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload(): void {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    const loadingText = this.add.text(width / 2, height / 2, 'Loading...', {
      fontFamily: 'sans-serif',
      fontSize: '48px',
      color: '#333333',
    }).setOrigin(0.5);

    this.load.on('progress', (value: number) => {
      loadingText.setText(`Loading... ${Math.round(value * 100)}%`);
    });

    // Load coin spin sprites and particle pixel
    this.load.image('coin_1', 'assets/images/Coin_Spin_1.png');
    this.load.image('coin_2', 'assets/images/Coin_Spin_2.png');
    this.load.image('coin_3', 'assets/images/Coin_Spin_3.png');
    this.load.image('coin_4', 'assets/images/Coin_Spin_4.png');
    this.load.image('pixel', 'assets/images/pixel.png');

    // Load audio
    this.load.audio('coin_sound', 'assets/sounds/coin.wav');
    this.load.audio('fail_sound', 'assets/sounds/fail.wav');
    this.load.audio('tick_sound', 'assets/sounds/tick.wav');
    this.load.audio('ui_hover', 'assets/sounds/ui_hover.wav');
    this.load.audio('ui_click', 'assets/sounds/ui_click.wav');
    this.load.audio('bgm_menu', 'assets/sounds/bgm_menu.mp3');
    this.load.audio('bgm_game', 'assets/sounds/bgm_game.mp3');
  }

  async create(): Promise<void> {
    // Create coin spinning animation (4 frames, loop)
    this.anims.create({
      key: 'coin_spin',
      frames: [
        { key: 'coin_1' },
        { key: 'coin_2' },
        { key: 'coin_3' },
        { key: 'coin_4' },
      ],
      frameRate: 9,
      repeat: -1,
    });

    // Ensure custom font is available
    try {
      if (document.fonts) {
        await document.fonts.load(`48px "${GAME_CONFIG.FONT_FAMILY}"`);
        await document.fonts.ready;
      }
    } catch {
      // Fallback if font loading fails
    }

    this.scene.start('MenuScene');
  }
}
