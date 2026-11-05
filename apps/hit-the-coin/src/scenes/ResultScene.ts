import Phaser from 'phaser';
import { GAME_CONFIG } from '../config';

interface ResultData {
  score: number;
  highScore: number;
  isNewHighScore: boolean;
  maxCombo: number;
}

export class ResultScene extends Phaser.Scene {
  private bg!: Phaser.GameObjects.Rectangle;
  private titleText!: Phaser.GameObjects.Text;
  private scoreText!: Phaser.GameObjects.Text;
  private newRecordText?: Phaser.GameObjects.Text;
  private bestText!: Phaser.GameObjects.Text;
  private comboText!: Phaser.GameObjects.Text;
  private playAgainBtn!: Phaser.GameObjects.Text;
  private backBtn!: Phaser.GameObjects.Text;

  constructor() {
    super('ResultScene');
  }

  create(data: ResultData): void {
    const { width, height } = this.scale;

    // Play cheerful menu/result music if not playing
    if (!this.sound.get('bgm_menu')?.isPlaying) {
      this.sound.play('bgm_menu', { loop: true, volume: 0.35 });
    }

    // Background
    this.bg = this.add.rectangle(0, 0, width, height, GAME_CONFIG.BG_COLOR_HEX).setOrigin(0);

    // Title
    this.titleText = this.add.text(width / 2, height * 0.16, "Time's Up!", {
      fontFamily: GAME_CONFIG.FONT_FAMILY,
      fontSize: `${Math.min(84, Math.max(48, Math.round(width * 0.06)))}px`,
      color: '#000000',
    }).setOrigin(0.5);

    // Final Score
    this.scoreText = this.add.text(width / 2, height * 0.28, `Score: ${data.score ?? 0}`, {
      fontFamily: GAME_CONFIG.FONT_FAMILY,
      fontSize: `${Math.min(96, Math.max(54, Math.round(width * 0.07)))}px`,
      color: '#000000',
    }).setOrigin(0.5);

    // New record banner if applicable
    if (data.isNewHighScore && data.score > 0) {
      this.newRecordText = this.add.text(width / 2, height * 0.38, '★ NEW RECORD! ★', {
        fontFamily: GAME_CONFIG.FONT_FAMILY,
        fontSize: '44px',
        color: '#d97706',
      }).setOrigin(0.5);

      this.tweens.add({
        targets: this.newRecordText,
        scale: 1.1,
        duration: 350,
        yoyo: true,
        repeat: -1,
      });
    }

    // High score & Max Combo
    this.bestText = this.add.text(width / 2, height * 0.46, `Best Score: ${data.highScore ?? data.score ?? 0}`, {
      fontFamily: GAME_CONFIG.FONT_FAMILY,
      fontSize: `${Math.min(46, Math.max(28, Math.round(width * 0.035)))}px`,
      color: '#444444',
    }).setOrigin(0.5);

    this.comboText = this.add.text(width / 2, height * 0.54, `Max Combo: x${data.maxCombo ?? 0}`, {
      fontFamily: GAME_CONFIG.FONT_FAMILY,
      fontSize: `${Math.min(42, Math.max(26, Math.round(width * 0.03)))}px`,
      color: '#ea580c',
    }).setOrigin(0.5);

    // Buttons
    const btnSize = `${Math.min(74, Math.max(44, Math.round(width * 0.05)))}px`;
    const backSize = `${Math.min(62, Math.max(38, Math.round(width * 0.04)))}px`;

    this.playAgainBtn = this.createButton(width / 2, height * 0.68, 'Play Again', btnSize, () => {
      this.sound.stopByKey('bgm_menu');
      this.scene.start('GameScene');
    });

    this.backBtn = this.createButton(width / 2, height * 0.80, 'Back to Menu', backSize, () => {
      this.scene.start('MenuScene');
    });

    // Handle responsive resize
    this.scale.on('resize', this.handleResize, this);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.scale.off('resize', this.handleResize, this);
    });
  }

  private handleResize(gameSize: Phaser.Structs.Size): void {
    const { width, height } = gameSize;
    this.bg.setSize(width, height);
    this.titleText.setPosition(width / 2, height * 0.16);
    this.scoreText.setPosition(width / 2, height * 0.28);
    if (this.newRecordText) {
      this.newRecordText.setPosition(width / 2, height * 0.38);
    }
    this.bestText.setPosition(width / 2, height * 0.46);
    this.comboText.setPosition(width / 2, height * 0.54);
    this.playAgainBtn.setPosition(width / 2, height * 0.68);
    this.backBtn.setPosition(width / 2, height * 0.80);
  }

  private createButton(
    x: number,
    y: number,
    label: string,
    fontSize: string,
    onClick: () => void
  ): Phaser.GameObjects.Text {
    const btn = this.add.text(x, y, label, {
      fontFamily: GAME_CONFIG.FONT_FAMILY,
      fontSize,
      color: '#000000',
    })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    btn.on('pointerover', () => {
      this.sound.play('ui_hover', { volume: 0.25 });
      btn.setColor('#2563eb');
      this.tweens.add({ targets: btn, scale: 1.08, duration: 120 });
    });

    btn.on('pointerout', () => {
      btn.setColor('#000000');
      this.tweens.add({ targets: btn, scale: 1.0, duration: 120 });
    });

    btn.on('pointerdown', () => {
      this.sound.play('ui_click', { volume: 0.45 });
      onClick();
    });

    return btn;
  }
}
