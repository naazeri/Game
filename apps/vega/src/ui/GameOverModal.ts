import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT, FONTS, COLORS } from '../config';
import { createCrispText } from './TextHelper';
import { AudioManager } from '../audio/AudioManager';

export interface GameOverStats {
  score: number;
  wave: number;
  eliminated: number;
  maxCombo: number;
}

export class GameOverModal {
  private scene: Phaser.Scene;
  private audio: AudioManager;
  private container: Phaser.GameObjects.Container;
  private onRestartCallback: () => void;
  private onMenuCallback: () => void;
  public isVisible = false;

  constructor(
    scene: Phaser.Scene,
    audio: AudioManager,
    onRestart: () => void,
    onMenu: () => void
  ) {
    this.scene = scene;
    this.audio = audio;
    this.onRestartCallback = onRestart;
    this.onMenuCallback = onMenu;

    this.container = this.scene.add.container(0, 0);
    this.container.setDepth(100);
    this.container.setVisible(false);
    this.container.setAlpha(0);
  }

  public show(stats: GameOverStats): void {
    this.isVisible = true;
    this.container.removeAll(true);
    this.container.setVisible(true);

    const prevBest = parseInt(localStorage.getItem('vega_best_score') || '0', 10);
    const isNewRecord = stats.score > prevBest;
    if (isNewRecord) {
      localStorage.setItem('vega_best_score', stats.score.toString());
    }
    const currentBest = Math.max(prevBest, stats.score);

    // Dim background overlay
    const overlay = this.scene.add.rectangle(0, 0, GAME_WIDTH, GAME_HEIGHT, 0x030614, 0.88);
    overlay.setOrigin(0, 0);
    overlay.setInteractive(); // block pointer through
    this.container.add(overlay);

    // Dialog card
    const cardWidth = 520;
    const cardHeight = 440;
    const cx = GAME_WIDTH / 2;
    const cy = GAME_HEIGHT / 2;

    const modalBox = this.scene.add.container(cx, cy);

    // Card background
    const bg = this.scene.add.graphics();
    bg.fillStyle(0x0a1024, 0.96);
    bg.fillRoundedRect(-cardWidth / 2, -cardHeight / 2, cardWidth, cardHeight, 16);
    bg.lineStyle(2, COLORS.CRIMSON, 0.8);
    bg.strokeRoundedRect(-cardWidth / 2, -cardHeight / 2, cardWidth, cardHeight, 16);

    // Subtle neon glow lines
    bg.lineStyle(1, 0xff3366, 0.4);
    bg.strokeRoundedRect(-cardWidth / 2 + 3, -cardHeight / 2 + 3, cardWidth - 6, cardHeight - 6, 13);
    modalBox.add(bg);

    // Title
    const title = createCrispText(this.scene, 0, -170, 'CORE COMPROMISED', {
      fontFamily: FONTS.RETRO,
      fontSize: '28px',
      color: '#ff2244',
      stroke: '#3a0815',
      strokeThickness: 3,
    }).setOrigin(0.5);
    modalBox.add(title);

    const subtitle = createCrispText(this.scene, 0, -135, '— MISSION REPORT —', {
      fontFamily: FONTS.RETRO,
      fontSize: '12px',
      color: '#6e85b0',
    }).setOrigin(0.5);
    modalBox.add(subtitle);

    // New High Score Banner
    if (isNewRecord && stats.score > 0) {
      const recordBadge = createCrispText(this.scene, 0, -105, '★ NEW HIGH SCORE! ★', {
        fontFamily: FONTS.RETRO,
        fontSize: '14px',
        color: '#ffdd00',
        stroke: '#403000',
        strokeThickness: 2,
      }).setOrigin(0.5);
      modalBox.add(recordBadge);

      this.scene.tweens.add({
        targets: recordBadge,
        scale: { from: 0.95, to: 1.05 },
        alpha: { from: 0.8, to: 1 },
        yoyo: true,
        repeat: -1,
        duration: 500,
      });
    }

    // Stats Grid
    const statsY = -65;
    const statRows = [
      { label: 'FINAL SCORE', value: stats.score.toLocaleString(), color: '#00ffff' },
      { label: 'HIGH SCORE', value: currentBest.toLocaleString(), color: '#ffdd00' },
      { label: 'WAVE REACHED', value: `SECTOR ${stats.wave}`, color: '#ff8800' },
      { label: 'THREATS DESTROYED', value: stats.eliminated.toString(), color: '#ffffff' },
      { label: 'MAX COMBO', value: `${stats.maxCombo}x`, color: '#cc44ff' },
    ];

    statRows.forEach((row, idx) => {
      const y = statsY + idx * 34;

      // Subtle row striping
      const rowBg = this.scene.add.graphics();
      if (idx % 2 === 0) {
        rowBg.fillStyle(0xffffff, 0.03);
        rowBg.fillRoundedRect(-cardWidth / 2 + 30, y - 12, cardWidth - 60, 26, 4);
      }
      modalBox.add(rowBg);

      const label = createCrispText(this.scene, -cardWidth / 2 + 45, y, row.label, {
        fontFamily: FONTS.RETRO,
        fontSize: '13px',
        color: '#8da2c8',
      }).setOrigin(0, 0.5);
      modalBox.add(label);

      const val = createCrispText(this.scene, cardWidth / 2 - 45, y, row.value, {
        fontFamily: FONTS.RETRO,
        fontSize: '15px',
        color: row.color,
      }).setOrigin(1, 0.5);
      modalBox.add(val);
    });

    // Buttons Container
    const btnY = 155;

    // PLAY AGAIN button
    const playBtn = this.createButton(
      -120,
      btnY,
      200,
      44,
      'PLAY AGAIN',
      0x00e5ff,
      0x003b44,
      () => {
        this.audio.play('startGame');
        this.hide(() => this.onRestartCallback());
      }
    );
    modalBox.add(playBtn);

    // MAIN MENU button
    const menuBtn = this.createButton(
      120,
      btnY,
      200,
      44,
      'MAIN MENU',
      0x4a5d7c,
      0x131a28,
      () => {
        this.audio.play('endGame');
        this.hide(() => this.onMenuCallback());
      }
    );
    modalBox.add(menuBtn);

    this.container.add(modalBox);

    // Entrance Animation
    modalBox.setScale(0.85);
    this.scene.tweens.add({
      targets: this.container,
      alpha: 1,
      duration: 250,
      ease: 'Power2',
    });
    this.scene.tweens.add({
      targets: modalBox,
      scale: 1,
      duration: 350,
      ease: 'Back.easeOut',
    });
  }

  private createButton(
    x: number,
    y: number,
    w: number,
    h: number,
    text: string,
    accentColor: number,
    bgColor: number,
    onClick: () => void
  ): Phaser.GameObjects.Container {
    const btn = this.scene.add.container(x, y);

    const bg = this.scene.add.graphics();
    bg.fillStyle(bgColor, 0.9);
    bg.fillRoundedRect(-w / 2, -h / 2, w, h, 8);
    bg.lineStyle(1.5, accentColor, 0.8);
    bg.strokeRoundedRect(-w / 2, -h / 2, w, h, 8);
    btn.add(bg);

    const hexColorStr = '#' + accentColor.toString(16).padStart(6, '0');
    const label = createCrispText(this.scene, 0, 0, text, {
      fontFamily: FONTS.RETRO,
      fontSize: '14px',
      color: hexColorStr,
    }).setOrigin(0.5);
    btn.add(label);

    const hit = this.scene.add.rectangle(0, 0, w, h, 0x000000, 0);
    hit.setInteractive({ useHandCursor: true });
    btn.add(hit);

    hit.on('pointerover', () => {
      this.scene.tweens.add({
        targets: btn,
        scale: 1.05,
        duration: 120,
        ease: 'Quad.easeOut',
      });
      bg.clear();
      bg.fillStyle(accentColor, 0.25);
      bg.fillRoundedRect(-w / 2, -h / 2, w, h, 8);
      bg.lineStyle(2, accentColor, 1);
      bg.strokeRoundedRect(-w / 2, -h / 2, w, h, 8);
    });

    hit.on('pointerout', () => {
      this.scene.tweens.add({
        targets: btn,
        scale: 1,
        duration: 120,
        ease: 'Quad.easeOut',
      });
      bg.clear();
      bg.fillStyle(bgColor, 0.9);
      bg.fillRoundedRect(-w / 2, -h / 2, w, h, 8);
      bg.lineStyle(1.5, accentColor, 0.8);
      bg.strokeRoundedRect(-w / 2, -h / 2, w, h, 8);
    });

    hit.on('pointerdown', () => {
      onClick();
    });

    return btn;
  }

  public hide(onComplete?: () => void): void {
    this.scene.tweens.add({
      targets: this.container,
      alpha: 0,
      duration: 200,
      ease: 'Power2',
      onComplete: () => {
        this.isVisible = false;
        this.container.setVisible(false);
        if (onComplete) onComplete();
      },
    });
  }
}
