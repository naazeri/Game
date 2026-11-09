import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT, COLORS, FONTS } from '../config.js';
import { createCrispText } from '../ui/TextHelper.js';
import { AudioManager } from '../audio/AudioManager.js';

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  public preload(): void {
    const cx = GAME_WIDTH / 2;
    const cy = GAME_HEIGHT / 2;

    // Loading backdrop
    this.add.rectangle(0, 0, GAME_WIDTH, GAME_HEIGHT, COLORS.bgDark).setOrigin(0, 0);

    const titleGfx = this.add.graphics();
    titleGfx.lineStyle(2, COLORS.neonCyan, 0.4);
    titleGfx.strokeRoundedRect(cx - 180, cy - 80, 360, 160, 12);

    const titleText = createCrispText(this, cx, cy - 40, 'BLOCK BREAKER', {
      fontFamily: 'monospace',
      fontSize: '36px',
      color: '#00f0ff',
      stroke: '#003344',
      strokeThickness: 4,
    }).setOrigin(0.5);

    const subText = createCrispText(this, cx, cy, 'INITIALIZING QUANTUM GRID...', {
      fontFamily: 'monospace',
      fontSize: '13px',
      color: '#7f9bc8',
    }).setOrigin(0.5);

    // Progress bar frame
    const progressBox = this.add.graphics();
    const progressBar = this.add.graphics();

    progressBox.lineStyle(2, COLORS.neonCyan, 0.6);
    progressBox.strokeRoundedRect(cx - 140, cy + 30, 280, 14, 6);

    this.load.on('progress', (val: number) => {
      progressBar.clear();
      progressBar.fillStyle(COLORS.neonCyan, 0.9);
      progressBar.fillRoundedRect(cx - 138, cy + 32, 276 * val, 10, 4);
    });

    // Make sure VCR_OSD_MONO font is loaded via FontFace API
    if (typeof FontFace !== 'undefined') {
      const font = new FontFace('VCR_OSD_MONO', 'url(assets/fonts/VCR_OSD_MONO_1.001.ttf)');
      font
        .load()
        .then((loadedFace) => {
          document.fonts.add(loadedFace);
        })
        .catch((err) => {
          console.warn('Font loading failed or already active:', err);
        });
    }

    // Audio Manager Init
    AudioManager.getInstance(this);
  }

  public create(): void {
    // Brief delay to allow font rasterization before starting menu
    this.time.delayedCall(220, () => {
      this.cameras.main.fadeOut(300, 5, 7, 14);
      this.cameras.main.once('camerafadeoutcomplete', () => {
        this.scene.start('MenuScene');
      });
    });
  }
}
