import Phaser from 'phaser';
import { GAME_WIDTH, ARENA_BOUNDS, COLORS, FONTS, PowerUpType, POWER_UP_INFOS } from '../config.js';
import { createCrispText } from './TextHelper.js';
import { AudioManager } from '../audio/AudioManager.js';

export class HUD {
  public scene: Phaser.Scene;
  public container: Phaser.GameObjects.Container;

  private scoreText!: Phaser.GameObjects.Text;
  private bestScoreText!: Phaser.GameObjects.Text;
  private stageText!: Phaser.GameObjects.Text;
  private livesContainer!: Phaser.GameObjects.Container;
  private comboContainer!: Phaser.GameObjects.Container;
  private comboText!: Phaser.GameObjects.Text;
  private powerUpBadgesContainer!: Phaser.GameObjects.Container;

  private soundBtnText!: Phaser.GameObjects.Text;
  private audioManager: AudioManager;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.audioManager = AudioManager.getInstance(scene);
    this.container = scene.add.container(0, 0).setDepth(40);

    this.createHeader();
  }

  private createHeader(): void {
    // Header backing bar
    const bg = this.scene.add.graphics();
    bg.fillStyle(0x05070e, 0.92);
    bg.fillRect(0, 0, GAME_WIDTH, ARENA_BOUNDS.top - 2);

    bg.lineStyle(1.5, COLORS.hudBorder, 0.85);
    bg.lineBetween(0, ARENA_BOUNDS.top - 2, GAME_WIDTH, ARENA_BOUNDS.top - 2);

    // Subtle cyan glow line
    bg.lineStyle(1, 0x00f0ff, 0.4);
    bg.lineBetween(ARENA_BOUNDS.left, ARENA_BOUNDS.top - 2, ARENA_BOUNDS.right, ARENA_BOUNDS.top - 2);
    this.container.add(bg);

    // 1. TOP-LEFT: Score and Best
    const scoreBox = this.scene.add.container(24, 10);
    this.scoreText = createCrispText(this.scene, 0, 0, 'SCORE: 0', {
      fontFamily: FONTS.RETRO,
      fontSize: '18px',
      color: '#00f0ff',
      stroke: '#003344',
      strokeThickness: 2,
    });
    const bestScore = parseInt(localStorage.getItem('blockbreaker_best_score') || '0', 10);
    this.bestScoreText = createCrispText(this.scene, 0, 22, `BEST: ${bestScore.toLocaleString()}`, {
      fontFamily: FONTS.RETRO,
      fontSize: '11px',
      color: '#ffdd00',
    });
    scoreBox.add([this.scoreText, this.bestScoreText]);
    this.container.add(scoreBox);

    // 2. TOP-CENTER: Stage
    const stageBox = this.scene.add.container(GAME_WIDTH / 2, 26);
    this.stageText = createCrispText(this.scene, 0, 0, 'STAGE 1 / 5', {
      fontFamily: FONTS.RETRO,
      fontSize: '17px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 2.5,
    }).setOrigin(0.5);
    stageBox.add(this.stageText);
    this.container.add(stageBox);

    // 3. TOP-RIGHT: Lives & Controls
    this.livesContainer = this.scene.add.container(GAME_WIDTH - 235, 26);
    this.container.add(this.livesContainer);

    // Sound toggle button
    const soundBtn = this.createIconButton(GAME_WIDTH - 110, 26, '🔊', () => {
      const s = this.audioManager.getSettings();
      const newMuted = !s.sfxMuted;
      this.audioManager.updateSettings({ sfxMuted: newMuted, musicMuted: newMuted });
      this.soundBtnText.setText(newMuted ? '🔇' : '🔊');
    });
    this.soundBtnText = soundBtn.getByName('icon_label') as Phaser.GameObjects.Text;
    const isMuted = this.audioManager.getSettings().sfxMuted;
    this.soundBtnText.setText(isMuted ? '🔇' : '🔊');
    this.container.add(soundBtn);

    // Fullscreen toggle button
    const fsBtn = this.createIconButton(GAME_WIDTH - 70, 26, '⛶', () => {
      this.toggleFullscreen();
    });
    this.container.add(fsBtn);

    // Pause button
    const pauseBtn = this.createIconButton(GAME_WIDTH - 30, 26, '⏸', () => {
      this.scene.events.emit('request-pause');
    });
    this.container.add(pauseBtn);

    // 4. COMBO BADGE (Bottom-Left of Arena)
    this.comboContainer = this.scene.add.container(36, ARENA_BOUNDS.bottom - 18).setVisible(false);
    const comboBg = this.scene.add.graphics();
    comboBg.fillStyle(0x0e172a, 0.9);
    comboBg.fillRoundedRect(-10, -12, 115, 24, 6);
    comboBg.lineStyle(1.5, 0xfacc15, 0.9);
    comboBg.strokeRoundedRect(-10, -12, 115, 24, 6);
    this.comboText = createCrispText(this.scene, 47, 0, '2x COMBO', {
      fontFamily: FONTS.RETRO,
      fontSize: '13px',
      color: '#facc15',
    }).setOrigin(0.5);
    this.comboContainer.add([comboBg, this.comboText]);
    this.container.add(this.comboContainer);

    // 5. ACTIVE BUFFS CONTAINER (Bottom-Right of Arena)
    this.powerUpBadgesContainer = this.scene.add.container(GAME_WIDTH - 36, ARENA_BOUNDS.bottom - 18);
    this.container.add(this.powerUpBadgesContainer);

    this.updateLives(3);
  }

  public updateScore(score: number, bestScore: number): void {
    this.scoreText.setText(`SCORE: ${score.toLocaleString()}`);
    this.bestScoreText.setText(`BEST: ${bestScore.toLocaleString()}`);
  }

  public updateStage(stageId: number, totalStages: number = 5): void {
    this.stageText.setText(`STAGE ${stageId} / ${totalStages}`);
  }

  public updateLives(lives: number): void {
    this.livesContainer.removeAll(true);
    const heartSpacing = 20;

    for (let i = 0; i < 5; i++) {
      const active = i < lives;
      const heart = createCrispText(
        this.scene,
        i * heartSpacing,
        0,
        active ? '❤️' : '🖤',
        {
          fontSize: '14px',
        }
      ).setOrigin(0.5);

      if (!active) {
        heart.setAlpha(0.35);
      }
      this.livesContainer.add(heart);
    }
  }

  public updateCombo(combo: number, multiplier: number): void {
    if (multiplier >= 2) {
      this.comboContainer.setVisible(true);
      const isMax = multiplier >= 5;
      this.comboText.setText(`${multiplier}x ${isMax ? 'MAX!' : 'COMBO'}`);
      this.comboText.setColor(isMax ? '#ff3b81' : '#facc15');

      this.scene.tweens.add({
        targets: this.comboContainer,
        scale: { from: 1.15, to: 1.0 },
        duration: 140,
        ease: 'Back.easeOut',
      });
    } else {
      this.comboContainer.setVisible(false);
    }
  }

  public updateActiveBuffs(buffs: Array<{ type: PowerUpType; timeLeft: number }>): void {
    this.powerUpBadgesContainer.removeAll(true);
    let offsetX = 0;

    for (const buff of buffs) {
      if (buff.timeLeft <= 0) continue;
      const info = POWER_UP_INFOS[buff.type];
      const badge = this.scene.add.container(offsetX, 0);

      const bg = this.scene.add.graphics();
      bg.fillStyle(0x0e172a, 0.9);
      bg.fillRoundedRect(-100, -11, 95, 22, 5);
      bg.lineStyle(1.2, info.color, 0.9);
      bg.strokeRoundedRect(-100, -11, 95, 22, 5);

      const label = createCrispText(
        this.scene,
        -52,
        0,
        `${info.symbol} ${Math.ceil(buff.timeLeft)}s`,
        {
          fontFamily: FONTS.RETRO,
          fontSize: '11px',
          color: info.colorHex,
        }
      ).setOrigin(0.5);

      badge.add([bg, label]);
      this.powerUpBadgesContainer.add(badge);
      offsetX -= 105;
    }
  }

  private createIconButton(
    x: number,
    y: number,
    symbol: string,
    onClick: () => void
  ): Phaser.GameObjects.Container {
    const btn = this.scene.add.container(x, y);

    const bg = this.scene.add.graphics();
    bg.fillStyle(0x0e172a, 0.85);
    bg.fillRoundedRect(-14, -14, 28, 28, 6);
    bg.lineStyle(1.2, 0x00f0ff, 0.6);
    bg.strokeRoundedRect(-14, -14, 28, 28, 6);
    btn.add(bg);

    const label = createCrispText(this.scene, 0, 0, symbol, {
      fontFamily: 'sans-serif',
      fontSize: '14px',
      color: '#00f0ff',
    }).setOrigin(0.5).setName('icon_label');
    btn.add(label);

    const hit = this.scene.add.rectangle(0, 0, 28, 28, 0, 0).setInteractive({ useHandCursor: true });
    btn.add(hit);

    hit.on('pointerover', () => {
      bg.clear();
      bg.fillStyle(0x00f0ff, 0.25);
      bg.fillRoundedRect(-14, -14, 28, 28, 6);
      bg.lineStyle(1.5, 0x00f0ff, 1);
      bg.strokeRoundedRect(-14, -14, 28, 28, 6);
    });

    hit.on('pointerout', () => {
      bg.clear();
      bg.fillStyle(0x0e172a, 0.85);
      bg.fillRoundedRect(-14, -14, 28, 28, 6);
      bg.lineStyle(1.2, 0x00f0ff, 0.6);
      bg.strokeRoundedRect(-14, -14, 28, 28, 6);
    });

    hit.on('pointerdown', (e: Phaser.Input.Pointer) => {
      e.event?.stopPropagation();
      onClick();
    });

    return btn;
  }

  private toggleFullscreen(): void {
    if (this.scene.scale.isFullscreen) {
      this.scene.scale.stopFullscreen();
    } else {
      const container = document.getElementById('game-container') || document.body;
      if (container && container.requestFullscreen) {
        container.requestFullscreen().catch(() => {
          this.scene.scale.startFullscreen();
        });
      } else {
        this.scene.scale.startFullscreen();
      }
    }
  }

  public destroy(): void {
    this.container.destroy();
  }
}
