import Phaser from 'phaser';
import { AudioManager } from '../audio/AudioManager.js';

export class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload(): void {
    const width = this.scale.width;
    const height = this.scale.height;

    // Loading background
    const bg = this.add.graphics();
    bg.fillStyle(0x090c15, 1);
    bg.fillRect(0, 0, width, height);

    // Loading indicator
    const barWidth = 300;
    const barHeight = 8;
    const barX = width / 2 - barWidth / 2;
    const barY = height / 2;

    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x1a263c, 0.8);
    progressBox.fillRoundedRect(barX, barY, barWidth, barHeight, 4);

    const progressBar = this.add.graphics();

    this.load.on('progress', (value: number) => {
      progressBar.clear();
      progressBar.fillStyle(0x00f0ff, 1);
      progressBar.fillRoundedRect(barX, barY, barWidth * value, barHeight, 4);
    });

    // Load Audio assets
    this.load.audio('bounce1', './assets/sounds/bounce1.wav');
    this.load.audio('bounce2', './assets/sounds/bounce2.wav');
    this.load.audio('explosion', './assets/sounds/explosion.wav');
  }

  create(): void {
    AudioManager.getInstance().init(this);

    // Wait slightly to ensure custom web fonts are rendered
    this.time.delayedCall(100, () => {
      this.scene.start('MenuScene');
    });
  }
}
