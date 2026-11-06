import Phaser from 'phaser';
import { GameMode } from '../config';
import { StorageManager } from '../data/StorageManager';
import { AudioManager } from '../audio/AudioManager';
import { createCrispText } from './TextHelper';

export class GameOverModal {
  private scene: Phaser.Scene;
  private container: Phaser.GameObjects.Container;
  private isVisible: boolean = false;

  private scoreText!: Phaser.GameObjects.Text;
  private bestScoreText!: Phaser.GameObjects.Text;
  private newRecordBadge!: Phaser.GameObjects.Container;

  private onRestartCallback: () => void;
  private onMenuCallback: () => void;

  constructor(
    scene: Phaser.Scene,
    onRestart: () => void,
    onMenu: () => void
  ) {
    this.scene = scene;
    this.onRestartCallback = onRestart;
    this.onMenuCallback = onMenu;

    this.container = scene.add.container(0, 0);
    this.container.setDepth(100);
    this.container.setVisible(false);

    this.createContent();
  }

  private createContent(): void {
    const width = this.scene.scale.width;
    const height = this.scene.scale.height;

    // Dark backdrop overlay
    const backdrop = this.scene.add.graphics();
    backdrop.fillStyle(0x000000, 0.75);
    backdrop.fillRect(0, 0, width, height);
    backdrop.setInteractive(new Phaser.Geom.Rectangle(0, 0, width, height), Phaser.Geom.Rectangle.Contains);
    backdrop.on('pointerdown', (e: Phaser.Input.Pointer) => {
      e.event.stopPropagation();
    });
    this.container.add(backdrop);

    // Modal Card
    const cardWidth = 520;
    const cardHeight = 460;
    const cardX = width / 2 - cardWidth / 2;
    const cardY = height / 2 - cardHeight / 2;

    const card = this.scene.add.graphics();
    card.fillStyle(0x131927, 0.96);
    card.fillRoundedRect(cardX, cardY, cardWidth, cardHeight, 20);
    card.lineStyle(2, 0xef4444, 0.8); // subtle red accent border for game over
    card.strokeRoundedRect(cardX, cardY, cardWidth, cardHeight, 20);
    this.container.add(card);

    // Header: GAME OVER
    const title = createCrispText(this.scene, width / 2, cardY + 45, 'GAME OVER', {
      fontSize: '32px',
      color: '#ef4444',
      fontStyle: 'bold',
    });
    title.setOrigin(0.5);
    this.container.add(title);

    // New Record Badge (hidden by default)
    this.newRecordBadge = this.createNewRecordBadge(width / 2, cardY + 95);
    this.newRecordBadge.setVisible(false);
    this.container.add(this.newRecordBadge);

    // Score Board Panel
    const scorePanelY = cardY + 185;
    const scorePanel = this.scene.add.graphics();
    scorePanel.fillStyle(0x1e293b, 0.7);
    scorePanel.fillRoundedRect(width / 2 - 200, scorePanelY - 65, 400, 130, 14);
    scorePanel.lineStyle(1, 0x334155, 0.9);
    scorePanel.strokeRoundedRect(width / 2 - 200, scorePanelY - 65, 400, 130, 14);
    this.container.add(scorePanel);

    // Current Score
    const scoreLabel = createCrispText(this.scene, width / 2, scorePanelY - 42, 'SCORE', {
      fontSize: '14px',
      color: '#94a3b8',
    });
    scoreLabel.setOrigin(0.5);

    this.scoreText = createCrispText(this.scene, width / 2, scorePanelY - 12, '0', {
      fontSize: '36px',
      color: '#ffffff',
      fontStyle: 'bold',
    });
    this.scoreText.setOrigin(0.5);

    // Best Score
    this.bestScoreText = createCrispText(this.scene, width / 2, scorePanelY + 38, 'BEST SCORE: 0', {
      fontSize: '16px',
      color: '#38bdf8',
    });
    this.bestScoreText.setOrigin(0.5);

    this.container.add([scoreLabel, this.scoreText, this.bestScoreText]);

    // Play Again Button
    const playBtnY = cardY + 305;
    const playBtn = this.createButton(
      width / 2,
      playBtnY,
      'PLAY AGAIN',
      0x0284c7,
      0x38bdf8,
      () => {
        AudioManager.getInstance().playClick();
        this.hide(() => this.onRestartCallback());
      }
    );
    this.container.add(playBtn);

    // Main Menu Button
    const menuBtnY = cardY + 375;
    const menuBtn = this.createButton(
      width / 2,
      menuBtnY,
      'MAIN MENU',
      0x1e293b,
      0x475569,
      () => {
        AudioManager.getInstance().playClick();
        this.hide(() => this.onMenuCallback());
      }
    );
    this.container.add(menuBtn);
  }

  private createNewRecordBadge(x: number, y: number): Phaser.GameObjects.Container {
    const badge = this.scene.add.container(x, y);

    const bg = this.scene.add.graphics();
    bg.fillStyle(0xfbbf24, 0.2);
    bg.fillRoundedRect(-120, -18, 240, 36, 18);
    bg.lineStyle(1.5, 0xfbbf24, 1);
    bg.strokeRoundedRect(-120, -18, 240, 36, 18);

    const txt = createCrispText(this.scene, 0, 0, '★ NEW RECORD! ★', {
      fontSize: '15px',
      color: '#fbbf24',
      fontStyle: 'bold',
    });
    txt.setOrigin(0.5);

    badge.add([bg, txt]);

    // Gentle pulse animation
    this.scene.tweens.add({
      targets: badge,
      scaleX: 1.06,
      scaleY: 1.06,
      duration: 500,
      yoyo: true,
      repeat: -1,
      ease: Phaser.Math.Easing.Sine.InOut,
    });

    return badge;
  }

  private createButton(
    x: number,
    y: number,
    label: string,
    bgColor: number,
    borderColor: number,
    onClick: () => void
  ): Phaser.GameObjects.Container {
    const btn = this.scene.add.container(x, y);
    const w = 340;
    const h = 50;

    const bg = this.scene.add.graphics();
    bg.fillStyle(bgColor, 1);
    bg.fillRoundedRect(-w / 2, -h / 2, w, h, 14);
    bg.lineStyle(1.5, borderColor, 1);
    bg.strokeRoundedRect(-w / 2, -h / 2, w, h, 14);

    const txt = createCrispText(this.scene, 0, 0, label, {
      fontSize: '17px',
      color: '#ffffff',
      fontStyle: 'bold',
    });
    txt.setOrigin(0.5);

    btn.add([bg, txt]);
    btn.setSize(w, h);
    btn.setInteractive({ useHandCursor: true });

    btn.on('pointerover', () => btn.setScale(1.03));
    btn.on('pointerout', () => btn.setScale(1.0));
    btn.on('pointerdown', (e: Phaser.Input.Pointer) => {
      e.event.stopPropagation();
      onClick();
    });

    return btn;
  }

  public show(score: number, mode: GameMode): void {
    const isNewRecord = StorageManager.saveBestScore(mode, score);
    StorageManager.saveCurrentScore(score);

    const bestScore = StorageManager.getBestScore(mode);

    this.scoreText.setText(score.toString());
    this.bestScoreText.setText(`BEST SCORE: ${bestScore}`);
    this.newRecordBadge.setVisible(isNewRecord);

    this.isVisible = true;
    this.container.setVisible(true);
    this.container.setAlpha(0);
    this.scene.tweens.add({
      targets: this.container,
      alpha: 1,
      duration: 180,
      ease: Phaser.Math.Easing.Linear,
    });
  }

  public hide(onComplete?: () => void): void {
    this.scene.tweens.add({
      targets: this.container,
      alpha: 0,
      duration: 120,
      ease: Phaser.Math.Easing.Linear,
      onComplete: () => {
        this.isVisible = false;
        this.container.setVisible(false);
        if (onComplete) onComplete();
      },
    });
  }

  public getVisible(): boolean {
    return this.isVisible;
  }
}
