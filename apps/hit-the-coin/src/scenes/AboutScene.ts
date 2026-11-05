import Phaser from 'phaser';
import { GAME_CONFIG } from '../config';

export class AboutScene extends Phaser.Scene {
  private bg!: Phaser.GameObjects.Rectangle;
  private titleText!: Phaser.GameObjects.Text;
  private devText!: Phaser.GameObjects.Text;
  private websiteText!: Phaser.GameObjects.Text;
  private backBtn!: Phaser.GameObjects.Text;
  private versionText!: Phaser.GameObjects.Text;

  constructor() {
    super('AboutScene');
  }

  create(): void {
    const { width, height } = this.scale;

    // Background
    this.bg = this.add.rectangle(0, 0, width, height, GAME_CONFIG.BG_COLOR_HEX).setOrigin(0);

    // Title
    this.titleText = this.add.text(width / 2, height * 0.22, 'About', {
      fontFamily: GAME_CONFIG.FONT_FAMILY,
      fontSize: `${Math.min(84, Math.max(50, Math.round(width * 0.06)))}px`,
      color: '#000000',
    }).setOrigin(0.5);

    // Developer credit
    this.devText = this.add.text(width / 2, height * 0.40, 'Developer: Reza Nazeri', {
      fontFamily: GAME_CONFIG.FONT_FAMILY,
      fontSize: `${Math.min(64, Math.max(38, Math.round(width * 0.045)))}px`,
      color: '#000000',
    }).setOrigin(0.5);

    // Website link (interactive)
    this.websiteText = this.add.text(width / 2, height * 0.52, 'Website: naazeri.ir', {
      fontFamily: GAME_CONFIG.FONT_FAMILY,
      fontSize: `${Math.min(54, Math.max(32, Math.round(width * 0.038)))}px`,
      color: '#1d4ed8',
    })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    this.websiteText.on('pointerover', () => {
      this.sound.play('ui_hover', { volume: 0.25 });
      this.websiteText.setColor('#2563eb');
      this.tweens.add({ targets: this.websiteText, scale: 1.05, duration: 100 });
    });

    this.websiteText.on('pointerout', () => {
      this.websiteText.setColor('#1d4ed8');
      this.tweens.add({ targets: this.websiteText, scale: 1.0, duration: 100 });
    });

    this.websiteText.on('pointerdown', () => {
      this.sound.play('ui_click', { volume: 0.45 });
      window.open('https://naazeri.ir/', '_blank');
    });

    // Back button
    this.backBtn = this.add.text(width / 2, height * 0.72, 'Back', {
      fontFamily: GAME_CONFIG.FONT_FAMILY,
      fontSize: `${Math.min(72, Math.max(42, Math.round(width * 0.05)))}px`,
      color: '#000000',
    })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    this.backBtn.on('pointerover', () => {
      this.sound.play('ui_hover', { volume: 0.25 });
      this.backBtn.setColor('#2563eb');
      this.tweens.add({ targets: this.backBtn, scale: 1.08, duration: 100 });
    });

    this.backBtn.on('pointerout', () => {
      this.backBtn.setColor('#000000');
      this.tweens.add({ targets: this.backBtn, scale: 1.0, duration: 100 });
    });

    this.backBtn.on('pointerdown', () => {
      this.sound.play('ui_click', { volume: 0.45 });
      this.scene.start('MenuScene');
    });

    // Version tag (bottom right)
    this.versionText = this.add.text(width - 30, height - 25, GAME_CONFIG.VERSION, {
      fontFamily: GAME_CONFIG.FONT_FAMILY,
      fontSize: '28px',
      color: '#666666',
    }).setOrigin(1, 1);

    // Responsive resize
    this.scale.on('resize', this.handleResize, this);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.scale.off('resize', this.handleResize, this);
    });
  }

  private handleResize(gameSize: Phaser.Structs.Size): void {
    const { width, height } = gameSize;
    this.bg.setSize(width, height);
    this.titleText.setPosition(width / 2, height * 0.22);
    this.devText.setPosition(width / 2, height * 0.40);
    this.websiteText.setPosition(width / 2, height * 0.52);
    this.backBtn.setPosition(width / 2, height * 0.72);
    this.versionText.setPosition(width - 30, height - 25);
  }
}
