import Phaser from 'phaser';
import { GAME_CONFIG } from '../config';

export class MenuScene extends Phaser.Scene {
  private bg!: Phaser.GameObjects.Rectangle;
  private decoCoin!: Phaser.GameObjects.Sprite;
  private titleText!: Phaser.GameObjects.Text;
  private highScoreText!: Phaser.GameObjects.Text;
  private startBtn!: Phaser.GameObjects.Text;
  private aboutBtn!: Phaser.GameObjects.Text;
  private exitBtn!: Phaser.GameObjects.Text;
  private fullscreenContainer!: Phaser.GameObjects.Container;
  private versionText!: Phaser.GameObjects.Text;

  constructor() {
    super('MenuScene');
  }

  create(): void {
    const { width, height } = this.scale;

    // Start Menu BGM (looping)
    this.playMenuMusic();

    // Background
    this.bg = this.add.rectangle(0, 0, width, height, GAME_CONFIG.BG_COLOR_HEX).setOrigin(0);

    // Decorative animated coin
    this.decoCoin = this.add.sprite(width / 2, height * 0.16, 'coin_1')
      .setDisplaySize(110, 110);
    this.decoCoin.play('coin_spin');

    // Title text
    this.titleText = this.add.text(width / 2, height * 0.28, 'Hit the Coin', {
      fontFamily: GAME_CONFIG.FONT_FAMILY,
      fontSize: `${Math.min(96, Math.max(54, Math.round(width * 0.07)))}px`,
      color: '#000000',
    }).setOrigin(0.5);

    // High score badge
    const savedHighScore = localStorage.getItem(GAME_CONFIG.STORAGE_KEY_HIGHSCORE) || '0';
    this.highScoreText = this.add.text(width / 2, height * 0.38, `High Score: ${savedHighScore}`, {
      fontFamily: GAME_CONFIG.FONT_FAMILY,
      fontSize: `${Math.min(42, Math.max(26, Math.round(width * 0.03)))}px`,
      color: '#444444',
    }).setOrigin(0.5);

    // Menu Buttons
    const btnSize = `${Math.min(76, Math.max(46, Math.round(width * 0.055)))}px`;
    const exitSize = `${Math.min(60, Math.max(38, Math.round(width * 0.045)))}px`;

    this.startBtn = this.createButton(width / 2, height * 0.52, 'Start', btnSize, () => {
      this.sound.stopByKey('bgm_menu');
      this.scene.start('GameScene');
    });

    this.aboutBtn = this.createButton(width / 2, height * 0.65, 'About', btnSize, () => {
      this.scene.start('AboutScene');
    });

    this.exitBtn = this.createButton(width / 2, height * 0.77, 'Exit', exitSize, () => {
      window.location.href = '../';
    });

    // Fullscreen Toggle Button (bottom-left)
    this.createFullscreenButton();

    // Version tag (bottom-right)
    this.versionText = this.add.text(width - 30, height - 25, GAME_CONFIG.VERSION, {
      fontFamily: GAME_CONFIG.FONT_FAMILY,
      fontSize: '28px',
      color: '#666666',
    }).setOrigin(1, 1);

    // Responsive window resize
    this.scale.on('resize', this.handleResize, this);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.scale.off('resize', this.handleResize, this);
    });
  }

  private playMenuMusic(): void {
    if (!this.sound.get('bgm_menu')) {
      const music = this.sound.add('bgm_menu', { loop: true, volume: 0.35 });
      music.play();
    } else if (!this.sound.get('bgm_menu')?.isPlaying) {
      this.sound.get('bgm_menu')?.play();
    }

    // Handle browser autoplay policy on first user click/touch
    if (this.sound.locked) {
      this.sound.once('unlocked', () => {
        if (!this.sound.get('bgm_menu')?.isPlaying) {
          this.sound.get('bgm_menu')?.play();
        }
      });
    }
  }

  private createFullscreenButton(): void {
    const { height } = this.scale;
    const btnSize = 44;
    const padding = 30;

    this.fullscreenContainer = this.add.container(padding + btnSize / 2, height - padding - btnSize / 2);

    const bgBox = this.add.rectangle(0, 0, btnSize, btnSize, 0x000000, 0.08)
      .setStrokeStyle(3, 0x222222);

    const icon = this.add.graphics();
    const drawIcon = (color: number) => {
      icon.clear();
      icon.lineStyle(3, color, 1);
      const half = 12;
      const tick = 6;
      icon.strokeLineShape(new Phaser.Geom.Line(-half, -half + tick, -half, -half));
      icon.strokeLineShape(new Phaser.Geom.Line(-half, -half, -half + tick, -half));
      icon.strokeLineShape(new Phaser.Geom.Line(half - tick, -half, half, -half));
      icon.strokeLineShape(new Phaser.Geom.Line(half, -half, half, -half + tick));
      icon.strokeLineShape(new Phaser.Geom.Line(-half, half - tick, -half, half));
      icon.strokeLineShape(new Phaser.Geom.Line(-half, half, -half + tick, half));
      icon.strokeLineShape(new Phaser.Geom.Line(half - tick, half, half, half));
      icon.strokeLineShape(new Phaser.Geom.Line(half, half, half, half - tick));
    };

    drawIcon(0x222222);
    this.fullscreenContainer.add([bgBox, icon]);

    bgBox.setInteractive({ useHandCursor: true });
    bgBox.on('pointerover', () => {
      this.sound.play('ui_hover', { volume: 0.25 });
      bgBox.setFillStyle(0x2563eb, 0.2);
      bgBox.setStrokeStyle(3, 0x2563eb);
      drawIcon(0x2563eb);
      this.tweens.add({ targets: this.fullscreenContainer, scale: 1.1, duration: 100 });
    });

    bgBox.on('pointerout', () => {
      bgBox.setFillStyle(0x000000, 0.08);
      bgBox.setStrokeStyle(3, 0x222222);
      drawIcon(0x222222);
      this.tweens.add({ targets: this.fullscreenContainer, scale: 1.0, duration: 100 });
    });

    bgBox.on('pointerdown', () => {
      this.sound.play('ui_click', { volume: 0.4 });
      if (this.scale.isFullscreen) {
        this.scale.stopFullscreen();
      } else {
        this.scale.startFullscreen();
      }
    });
  }

  private handleResize(gameSize: Phaser.Structs.Size): void {
    const { width, height } = gameSize;
    this.bg.setSize(width, height);
    this.decoCoin.setPosition(width / 2, height * 0.16);
    this.titleText.setPosition(width / 2, height * 0.28);
    this.highScoreText.setPosition(width / 2, height * 0.38);
    this.startBtn.setPosition(width / 2, height * 0.52);
    this.aboutBtn.setPosition(width / 2, height * 0.65);
    this.exitBtn.setPosition(width / 2, height * 0.77);
    this.fullscreenContainer.setPosition(30 + 22, height - 30 - 22);
    this.versionText.setPosition(width - 30, height - 25);
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
      this.tweens.add({ targets: btn, scale: 1.08, duration: 120, ease: 'Power1' });
    });

    btn.on('pointerout', () => {
      btn.setColor('#000000');
      this.tweens.add({ targets: btn, scale: 1.0, duration: 120, ease: 'Power1' });
    });

    btn.on('pointerdown', () => {
      this.sound.play('ui_click', { volume: 0.45 });
      onClick();
    });

    return btn;
  }
}
