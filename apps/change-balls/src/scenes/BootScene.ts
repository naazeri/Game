import Phaser from 'phaser';
import { AudioManager } from '../audio/AudioManager';

export class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload(): void {
    const width = this.scale.width;
    const height = this.scale.height;

    // Loading background & bar
    const progressBox = this.add.graphics();
    const progressBar = this.add.graphics();
    progressBox.fillStyle(0x1e293b, 0.8);
    progressBox.fillRoundedRect(width / 2 - 160, height / 2 - 15, 320, 30, 8);

    const titleText = this.add.text(width / 2, height / 2 - 50, 'CHANGE BALLS', {
      fontFamily: 'Xolonium, sans-serif',
      fontSize: '28px',
      color: '#38bdf8',
      fontStyle: 'bold',
    });
    titleText.setOrigin(0.5);

    const loadingText = this.add.text(width / 2, height / 2 + 40, 'Loading assets...', {
      fontFamily: 'Xolonium, sans-serif',
      fontSize: '15px',
      color: '#94a3b8',
    });
    loadingText.setOrigin(0.5);

    this.load.on('progress', (value: number) => {
      progressBar.clear();
      progressBar.fillStyle(0x38bdf8, 1);
      progressBar.fillRoundedRect(width / 2 - 156, height / 2 - 11, 312 * value, 22, 6);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
    });

    // Images
    this.load.image('white_ball', './assets/images/white_ball.png');
    this.load.image('black_ball', './assets/images/black_ball.png');
    this.load.image('icon', './assets/images/icon.jpg');

    // Audio SFX
    this.load.audio('rotate', './assets/sounds/rotate.wav');
    this.load.audio('match', './assets/sounds/match.wav');
    this.load.audio('color_switch', './assets/sounds/color_switch.wav');
    this.load.audio('game_over', './assets/sounds/game_over.wav');
    this.load.audio('ui_click', './assets/sounds/ui_click.wav');
    this.load.audio('heart_up', './assets/sounds/heart_up.wav');
    this.load.audio('heart_break', './assets/sounds/heart_break.wav');

    // Audio BGM
    this.load.audio('bgm_menu', './assets/sounds/bgm_menu.mp3');
    this.load.audio('bgm_game', './assets/sounds/bgm_game.mp3');
  }

  create(): void {
    AudioManager.getInstance().init(this.sound);
    this.scene.start('MenuScene');
  }
}
