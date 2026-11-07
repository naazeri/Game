import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT, FONTS, COLORS } from '../config';

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  public preload(): void {
    const cx = GAME_WIDTH / 2;
    const cy = GAME_HEIGHT / 2;

    // Loading background & UI
    const bg = this.add.rectangle(0, 0, GAME_WIDTH, GAME_HEIGHT, COLORS.BG_DARK).setOrigin(0, 0);

    const titleText = this.add.text(cx, cy - 50, 'VEGA', {
      fontFamily: 'monospace',
      fontSize: '44px',
      color: '#00ffff',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    const subText = this.add.text(cx, cy, 'INITIALIZING DEFENSE SYSTEMS...', {
      fontFamily: 'monospace',
      fontSize: '14px',
      color: '#6e85b0',
    }).setOrigin(0.5);

    // Progress bar graphics
    const progressBox = this.add.graphics();
    const progressBar = this.add.graphics();

    progressBox.lineStyle(2, COLORS.CYAN, 0.6);
    progressBox.strokeRoundedRect(cx - 160, cy + 40, 320, 16, 8);

    this.load.on('progress', (value: number) => {
      progressBar.clear();
      progressBar.fillStyle(COLORS.CYAN, 0.9);
      progressBar.fillRoundedRect(cx - 158, cy + 42, 316 * value, 12, 6);
    });

    // Load Audio
    this.load.audio('bgm', 'assets/sounds/backgroundMusic.mp3');
    this.load.audio('shoot', 'assets/sounds/shoot.mp3');
    this.load.audio('enemyHit', 'assets/sounds/enemyHit.mp3');
    this.load.audio('enemyEliminated', 'assets/sounds/enemyEliminated.mp3');
    this.load.audio('startGame', 'assets/sounds/startGame.mp3');
    this.load.audio('endGame', 'assets/sounds/endGame.mp3');

    // Make sure VCR_OSD_MONO font is loaded via FontFace API
    if (typeof FontFace !== 'undefined') {
      const font = new FontFace(FONTS.RETRO, 'url(assets/fonts/VCR_OSD_MONO_1.001.ttf)');
      font.load().then((loadedFace) => {
        document.fonts.add(loadedFace);
      }).catch((err) => {
        console.warn('Font loading failed or already active:', err);
      });
    }
  }

  public create(): void {
    // Wait briefly for font readiness then launch MenuScene
    this.time.delayedCall(200, () => {
      this.cameras.main.fadeOut(300, 3, 6, 20);
      this.cameras.main.once('camerafadeoutcomplete', () => {
        this.scene.start('MenuScene');
      });
    });
  }
}
