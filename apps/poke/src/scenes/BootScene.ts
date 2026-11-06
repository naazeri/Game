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
      fontSize: '28px',
      color: '#ffffff',
    }).setOrigin(0.5);

    this.load.on('progress', (val: number) => {
      loadingText.setText(`Loading... ${Math.round(val * 100)}%`);
    });

    // Images
    this.load.image('white-glow', 'assets/images/white-glow.webp');
    this.load.image('hamtaro-1', 'assets/images/hamtaro-1.webp');
    this.load.image('hamtaro-2', 'assets/images/hamtaro-2.webp');
    this.load.image('dog-run-1', 'assets/images/dog-run-1.webp');
    this.load.image('dog-run-2', 'assets/images/dog-run-2.webp');
    this.load.image('dog-run-3', 'assets/images/dog-run-3.webp');

    // Audio
    this.load.audio('bgm', 'assets/sounds/bgm.ogg');
    this.load.audio('boom', 'assets/sounds/boom.wav');
    this.load.audio('ui_click', 'assets/sounds/ui_click.wav');
  }

  async create(): Promise<void> {
    // Player running animation
    this.anims.create({
      key: 'hamtaro_run',
      frames: [
        { key: 'hamtaro-1' },
        { key: 'hamtaro-2' },
      ],
      frameRate: 9,
      repeat: -1,
    });

    // Dog running animation
    this.anims.create({
      key: 'dog_run',
      frames: [
        { key: 'dog-run-1' },
        { key: 'dog-run-2' },
        { key: 'dog-run-3' },
      ],
      frameRate: 7,
      repeat: -1,
    });

    // Load font
    try {
      if (document.fonts) {
        await document.fonts.load(`32px "${GAME_CONFIG.FONT_FAMILY}"`);
        await document.fonts.ready;
      }
    } catch {
      // Font fallback
    }

    this.scene.start('GameScene');
  }
}
