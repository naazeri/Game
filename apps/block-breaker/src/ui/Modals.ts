import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT, FONTS, COLORS } from '../config.js';
import { createCrispText } from './TextHelper.js';
import { AudioManager } from '../audio/AudioManager.js';

// ==========================================
// PAUSE MODAL
// ==========================================
export class PauseModal {
  private scene: Phaser.Scene;
  private container: Phaser.GameObjects.Container;
  public isVisible = false;

  constructor(
    scene: Phaser.Scene,
    onResume: () => void,
    onRestart: () => void,
    onQuit: () => void
  ) {
    this.scene = scene;
    this.container = scene.add.container(0, 0).setDepth(60).setVisible(false);

    // Dim overlay
    const overlay = scene.add
      .rectangle(0, 0, GAME_WIDTH, GAME_HEIGHT, 0x05070e, 0.85)
      .setOrigin(0)
      .setInteractive();
    this.container.add(overlay);

    // Dialog card
    const cx = GAME_WIDTH / 2;
    const cy = GAME_HEIGHT / 2;
    const cardW = 340;
    const cardH = 260;

    const card = scene.add.graphics();
    card.fillStyle(0x0e172a, 0.96);
    card.fillRoundedRect(cx - cardW / 2, cy - cardH / 2, cardW, cardH, 10);
    card.lineStyle(2, 0x00f0ff, 0.9);
    card.strokeRoundedRect(cx - cardW / 2, cy - cardH / 2, cardW, cardH, 10);
    this.container.add(card);

    // Title
    const title = createCrispText(scene, cx, cy - 85, 'MISSION PAUSED', {
      fontFamily: FONTS.RETRO,
      fontSize: '22px',
      color: '#00f0ff',
      stroke: '#003344',
      strokeThickness: 3,
    }).setOrigin(0.5);
    this.container.add(title);

    // Buttons
    const resumeBtn = this.createButton(cx, cy - 20, 240, 38, 'RESUME MISSION', 0x00f0ff, onResume);
    const restartBtn = this.createButton(cx, cy + 32, 240, 38, 'RETRY STAGE', 0xfacc15, onRestart);
    const quitBtn = this.createButton(cx, cy + 84, 240, 38, 'ABORT TO MENU', 0xef4444, onQuit);

    this.container.add([resumeBtn, restartBtn, quitBtn]);
  }

  public show(): void {
    this.isVisible = true;
    this.container.setVisible(true).setAlpha(0);
    this.scene.tweens.add({
      targets: this.container,
      alpha: 1,
      duration: 180,
      ease: 'Sine.easeOut',
    });
  }

  public hide(): void {
    this.isVisible = false;
    this.container.setVisible(false);
  }

  private createButton(
    x: number,
    y: number,
    w: number,
    h: number,
    label: string,
    color: number,
    onClick: () => void
  ): Phaser.GameObjects.Container {
    const btn = this.scene.add.container(x, y);

    const bg = this.scene.add.graphics();
    bg.fillStyle(0x05070e, 0.9);
    bg.fillRoundedRect(-w / 2, -h / 2, w, h, 6);
    bg.lineStyle(1.5, color, 0.8);
    bg.strokeRoundedRect(-w / 2, -h / 2, w, h, 6);
    btn.add(bg);

    const text = createCrispText(this.scene, 0, 0, label, {
      fontFamily: FONTS.RETRO,
      fontSize: '13px',
      color: '#ffffff',
    }).setOrigin(0.5);
    btn.add(text);

    const hit = this.scene.add.rectangle(0, 0, w, h, 0, 0).setInteractive({ useHandCursor: true });
    btn.add(hit);

    hit.on('pointerover', () => {
      bg.clear();
      bg.fillStyle(color, 0.25);
      bg.fillRoundedRect(-w / 2, -h / 2, w, h, 6);
      bg.lineStyle(2, color, 1);
      bg.strokeRoundedRect(-w / 2, -h / 2, w, h, 6);
    });

    hit.on('pointerout', () => {
      bg.clear();
      bg.fillStyle(0x05070e, 0.9);
      bg.fillRoundedRect(-w / 2, -h / 2, w, h, 6);
      bg.lineStyle(1.5, color, 0.8);
      bg.strokeRoundedRect(-w / 2, -h / 2, w, h, 6);
    });

    hit.on('pointerdown', onClick);
    return btn;
  }

  public destroy(): void {
    this.container.destroy();
  }
}

// ==========================================
// STAGE CLEAR MODAL
// ==========================================
export class StageClearModal {
  private scene: Phaser.Scene;
  private container: Phaser.GameObjects.Container;
  private subtitleText!: Phaser.GameObjects.Text;
  private bonusText!: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene, onNext: () => void) {
    this.scene = scene;
    this.container = scene.add.container(0, 0).setDepth(60).setVisible(false);

    const overlay = scene.add.rectangle(0, 0, GAME_WIDTH, GAME_HEIGHT, 0x05070e, 0.75).setOrigin(0);
    this.container.add(overlay);

    const cx = GAME_WIDTH / 2;
    const cy = GAME_HEIGHT / 2;
    const cardW = 380;
    const cardH = 240;

    const card = scene.add.graphics();
    card.fillStyle(0x0e172a, 0.96);
    card.fillRoundedRect(cx - cardW / 2, cy - cardH / 2, cardW, cardH, 10);
    card.lineStyle(2, 0x10b981, 0.95);
    card.strokeRoundedRect(cx - cardW / 2, cy - cardH / 2, cardW, cardH, 10);
    this.container.add(card);

    const title = createCrispText(scene, cx, cy - 75, 'SECTOR SECURED!', {
      fontFamily: FONTS.RETRO,
      fontSize: '24px',
      color: '#10b981',
      stroke: '#042f2e',
      strokeThickness: 3,
    }).setOrigin(0.5);
    this.container.add(title);

    this.subtitleText = createCrispText(scene, cx, cy - 35, 'STAGE COMPLETED', {
      fontFamily: FONTS.RETRO,
      fontSize: '14px',
      color: '#6ee7b7',
    }).setOrigin(0.5);
    this.container.add(this.subtitleText);

    this.bonusText = createCrispText(scene, cx, cy + 5, 'STAGE BONUS: +1,000 PTS', {
      fontFamily: FONTS.RETRO,
      fontSize: '13px',
      color: '#facc15',
    }).setOrigin(0.5);
    this.container.add(this.bonusText);

    const nextBtn = this.createButton(cx, cy + 65, 260, 42, 'ENGAGE NEXT SECTOR ▶', 0x10b981, onNext);
    this.container.add(nextBtn);
  }

  public show(stageId: number, stageName: string, bonus: number): void {
    this.subtitleText.setText(`${stageName} CLEARED`);
    this.bonusText.setText(`STAGE CLEAR BONUS: +${bonus.toLocaleString()} PTS`);

    this.container.setVisible(true).setAlpha(0);
    this.scene.tweens.add({
      targets: this.container,
      alpha: 1,
      duration: 250,
      ease: 'Back.easeOut',
    });
  }

  public hide(): void {
    this.container.setVisible(false);
  }

  private createButton(
    x: number,
    y: number,
    w: number,
    h: number,
    label: string,
    color: number,
    onClick: () => void
  ): Phaser.GameObjects.Container {
    const btn = this.scene.add.container(x, y);

    const bg = this.scene.add.graphics();
    bg.fillStyle(0x05070e, 0.95);
    bg.fillRoundedRect(-w / 2, -h / 2, w, h, 6);
    bg.lineStyle(1.8, color, 0.9);
    bg.strokeRoundedRect(-w / 2, -h / 2, w, h, 6);
    btn.add(bg);

    const text = createCrispText(this.scene, 0, 0, label, {
      fontFamily: FONTS.RETRO,
      fontSize: '14px',
      color: '#ffffff',
    }).setOrigin(0.5);
    btn.add(text);

    const hit = this.scene.add.rectangle(0, 0, w, h, 0, 0).setInteractive({ useHandCursor: true });
    btn.add(hit);

    hit.on('pointerover', () => {
      bg.clear();
      bg.fillStyle(color, 0.3);
      bg.fillRoundedRect(-w / 2, -h / 2, w, h, 6);
      bg.lineStyle(2, color, 1);
      bg.strokeRoundedRect(-w / 2, -h / 2, w, h, 6);
    });

    hit.on('pointerout', () => {
      bg.clear();
      bg.fillStyle(0x05070e, 0.95);
      bg.fillRoundedRect(-w / 2, -h / 2, w, h, 6);
      bg.lineStyle(1.8, color, 0.9);
      bg.strokeRoundedRect(-w / 2, -h / 2, w, h, 6);
    });

    hit.on('pointerdown', onClick);
    return btn;
  }

  public destroy(): void {
    this.container.destroy();
  }
}

// ==========================================
// GAME OVER MODAL
// ==========================================
export class GameOverModal {
  private scene: Phaser.Scene;
  private container: Phaser.GameObjects.Container;
  private scoreValueText!: Phaser.GameObjects.Text;
  private bestScoreValueText!: Phaser.GameObjects.Text;
  private stagesText!: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene, onRetry: () => void, onMenu: () => void) {
    this.scene = scene;
    this.container = scene.add.container(0, 0).setDepth(60).setVisible(false);

    const overlay = scene.add.rectangle(0, 0, GAME_WIDTH, GAME_HEIGHT, 0x05070e, 0.85).setOrigin(0);
    this.container.add(overlay);

    const cx = GAME_WIDTH / 2;
    const cy = GAME_HEIGHT / 2;
    const cardW = 380;
    const cardH = 300;

    const card = scene.add.graphics();
    card.fillStyle(0x0e172a, 0.96);
    card.fillRoundedRect(cx - cardW / 2, cy - cardH / 2, cardW, cardH, 10);
    card.lineStyle(2, 0xef4444, 0.9);
    card.strokeRoundedRect(cx - cardW / 2, cy - cardH / 2, cardW, cardH, 10);
    this.container.add(card);

    const title = createCrispText(scene, cx, cy - 105, 'CORE SHATTERED', {
      fontFamily: FONTS.RETRO,
      fontSize: '24px',
      color: '#ef4444',
      stroke: '#450a0a',
      strokeThickness: 3,
    }).setOrigin(0.5);
    this.container.add(title);

    this.scoreValueText = createCrispText(scene, cx, cy - 55, 'FINAL SCORE: 0', {
      fontFamily: FONTS.RETRO,
      fontSize: '18px',
      color: '#00f0ff',
    }).setOrigin(0.5);
    this.container.add(this.scoreValueText);

    this.bestScoreValueText = createCrispText(scene, cx, cy - 25, 'HIGH SCORE: 0', {
      fontFamily: FONTS.RETRO,
      fontSize: '13px',
      color: '#facc15',
    }).setOrigin(0.5);
    this.container.add(this.bestScoreValueText);

    this.stagesText = createCrispText(scene, cx, cy + 2, 'STAGES CLEARED: 0', {
      fontFamily: FONTS.RETRO,
      fontSize: '12px',
      color: '#7f9bc8',
    }).setOrigin(0.5);
    this.container.add(this.stagesText);

    const retryBtn = this.createButton(cx, cy + 50, 260, 40, 'TRY AGAIN', 0x00f0ff, onRetry);
    const menuBtn = this.createButton(cx, cy + 100, 260, 40, 'MAIN MENU', 0x94a3b8, onMenu);
    this.container.add([retryBtn, menuBtn]);
  }

  public show(score: number, bestScore: number, stagesCleared: number): void {
    this.scoreValueText.setText(`FINAL SCORE: ${score.toLocaleString()}`);
    this.bestScoreValueText.setText(`HIGH SCORE: ${bestScore.toLocaleString()}`);
    this.stagesText.setText(`STAGES CLEARED: ${stagesCleared} / 5`);

    this.container.setVisible(true).setAlpha(0);
    this.scene.tweens.add({
      targets: this.container,
      alpha: 1,
      duration: 250,
      ease: 'Sine.easeOut',
    });
  }

  public hide(): void {
    this.container.setVisible(false);
  }

  private createButton(
    x: number,
    y: number,
    w: number,
    h: number,
    label: string,
    color: number,
    onClick: () => void
  ): Phaser.GameObjects.Container {
    const btn = this.scene.add.container(x, y);

    const bg = this.scene.add.graphics();
    bg.fillStyle(0x05070e, 0.95);
    bg.fillRoundedRect(-w / 2, -h / 2, w, h, 6);
    bg.lineStyle(1.6, color, 0.85);
    bg.strokeRoundedRect(-w / 2, -h / 2, w, h, 6);
    btn.add(bg);

    const text = createCrispText(this.scene, 0, 0, label, {
      fontFamily: FONTS.RETRO,
      fontSize: '13px',
      color: '#ffffff',
    }).setOrigin(0.5);
    btn.add(text);

    const hit = this.scene.add.rectangle(0, 0, w, h, 0, 0).setInteractive({ useHandCursor: true });
    btn.add(hit);

    hit.on('pointerover', () => {
      bg.clear();
      bg.fillStyle(color, 0.25);
      bg.fillRoundedRect(-w / 2, -h / 2, w, h, 6);
      bg.lineStyle(2, color, 1);
      bg.strokeRoundedRect(-w / 2, -h / 2, w, h, 6);
    });

    hit.on('pointerout', () => {
      bg.clear();
      bg.fillStyle(0x05070e, 0.95);
      bg.fillRoundedRect(-w / 2, -h / 2, w, h, 6);
      bg.lineStyle(1.6, color, 0.85);
      bg.strokeRoundedRect(-w / 2, -h / 2, w, h, 6);
    });

    hit.on('pointerdown', onClick);
    return btn;
  }

  public destroy(): void {
    this.container.destroy();
  }
}

// ==========================================
// VICTORY MODAL (CAMPAIGN COMPLETE)
// ==========================================
export class VictoryModal {
  private scene: Phaser.Scene;
  private container: Phaser.GameObjects.Container;
  private scoreValueText!: Phaser.GameObjects.Text;
  private bestScoreValueText!: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene, onPlayAgain: () => void, onMenu: () => void) {
    this.scene = scene;
    this.container = scene.add.container(0, 0).setDepth(60).setVisible(false);

    const overlay = scene.add.rectangle(0, 0, GAME_WIDTH, GAME_HEIGHT, 0x05070e, 0.88).setOrigin(0);
    this.container.add(overlay);

    const cx = GAME_WIDTH / 2;
    const cy = GAME_HEIGHT / 2;
    const cardW = 420;
    const cardH = 320;

    const card = scene.add.graphics();
    card.fillStyle(0x0e172a, 0.96);
    card.fillRoundedRect(cx - cardW / 2, cy - cardH / 2, cardW, cardH, 12);
    card.lineStyle(2.5, 0xfacc15, 0.95);
    card.strokeRoundedRect(cx - cardW / 2, cy - cardH / 2, cardW, cardH, 12);
    this.container.add(card);

    const crown = createCrispText(scene, cx, cy - 110, '👑', {
      fontSize: '28px',
    }).setOrigin(0.5);
    this.container.add(crown);

    const title = createCrispText(scene, cx, cy - 75, 'CAMPAIGN CONQUERED!', {
      fontFamily: FONTS.RETRO,
      fontSize: '22px',
      color: '#facc15',
      stroke: '#713f12',
      strokeThickness: 3,
    }).setOrigin(0.5);
    this.container.add(title);

    const subtitle = createCrispText(scene, cx, cy - 45, 'ALL 5 SECTORS FULLY CLEARED', {
      fontFamily: FONTS.RETRO,
      fontSize: '12px',
      color: '#38bdf8',
    }).setOrigin(0.5);
    this.container.add(subtitle);

    this.scoreValueText = createCrispText(scene, cx, cy - 10, 'VICTORY SCORE: 0', {
      fontFamily: FONTS.RETRO,
      fontSize: '18px',
      color: '#00f0ff',
    }).setOrigin(0.5);
    this.container.add(this.scoreValueText);

    this.bestScoreValueText = createCrispText(scene, cx, cy + 20, 'ALL-TIME BEST: 0', {
      fontFamily: FONTS.RETRO,
      fontSize: '13px',
      color: '#ffdd00',
    }).setOrigin(0.5);
    this.container.add(this.bestScoreValueText);

    const playAgainBtn = this.createButton(cx, cy + 65, 260, 40, 'PLAY AGAIN', 0xfacc15, onPlayAgain);
    const menuBtn = this.createButton(cx, cy + 115, 260, 40, 'MAIN MENU', 0x94a3b8, onMenu);
    this.container.add([playAgainBtn, menuBtn]);
  }

  public show(score: number, bestScore: number): void {
    this.scoreValueText.setText(`VICTORY SCORE: ${score.toLocaleString()}`);
    this.bestScoreValueText.setText(`ALL-TIME BEST: ${bestScore.toLocaleString()}`);

    this.container.setVisible(true).setAlpha(0);
    this.scene.tweens.add({
      targets: this.container,
      alpha: 1,
      duration: 350,
      ease: 'Back.easeOut',
    });
  }

  public hide(): void {
    this.container.setVisible(false);
  }

  private createButton(
    x: number,
    y: number,
    w: number,
    h: number,
    label: string,
    color: number,
    onClick: () => void
  ): Phaser.GameObjects.Container {
    const btn = this.scene.add.container(x, y);

    const bg = this.scene.add.graphics();
    bg.fillStyle(0x05070e, 0.95);
    bg.fillRoundedRect(-w / 2, -h / 2, w, h, 6);
    bg.lineStyle(1.6, color, 0.85);
    bg.strokeRoundedRect(-w / 2, -h / 2, w, h, 6);
    btn.add(bg);

    const text = createCrispText(this.scene, 0, 0, label, {
      fontFamily: FONTS.RETRO,
      fontSize: '13px',
      color: '#ffffff',
    }).setOrigin(0.5);
    btn.add(text);

    const hit = this.scene.add.rectangle(0, 0, w, h, 0, 0).setInteractive({ useHandCursor: true });
    btn.add(hit);

    hit.on('pointerover', () => {
      bg.clear();
      bg.fillStyle(color, 0.25);
      bg.fillRoundedRect(-w / 2, -h / 2, w, h, 6);
      bg.lineStyle(2, color, 1);
      bg.strokeRoundedRect(-w / 2, -h / 2, w, h, 6);
    });

    hit.on('pointerout', () => {
      bg.clear();
      bg.fillStyle(0x05070e, 0.95);
      bg.fillRoundedRect(-w / 2, -h / 2, w, h, 6);
      bg.lineStyle(1.6, color, 0.85);
      bg.strokeRoundedRect(-w / 2, -h / 2, w, h, 6);
    });

    hit.on('pointerdown', onClick);
    return btn;
  }

  public destroy(): void {
    this.container.destroy();
  }
}

// ==========================================
// SETTINGS / HELP MODAL
// ==========================================
// HELP / BRIEFING MODAL
// ==========================================
export class HelpModal {
  private scene: Phaser.Scene;
  private container: Phaser.GameObjects.Container;
  public isVisible = false;

  constructor(scene: Phaser.Scene, onClose: () => void) {
    this.scene = scene;
    this.container = scene.add.container(0, 0).setDepth(60).setVisible(false);

    const overlay = scene.add
      .rectangle(0, 0, GAME_WIDTH, GAME_HEIGHT, 0x05070e, 0.85)
      .setOrigin(0)
      .setInteractive();
    this.container.add(overlay);

    const cx = GAME_WIDTH / 2;
    const cy = GAME_HEIGHT / 2;
    const cardW = 460;
    const cardH = 380;

    const card = scene.add.graphics();
    card.fillStyle(0x0e172a, 0.96);
    card.fillRoundedRect(cx - cardW / 2, cy - cardH / 2, cardW, cardH, 10);
    card.lineStyle(2, 0x00f0ff, 0.9);
    card.strokeRoundedRect(cx - cardW / 2, cy - cardH / 2, cardW, cardH, 10);
    this.container.add(card);

    const title = createCrispText(scene, cx, cy - 150, 'TACTICAL BRIEFING', {
      fontFamily: FONTS.RETRO,
      fontSize: '22px',
      color: '#00f0ff',
      stroke: '#003344',
      strokeThickness: 3,
    }).setOrigin(0.5);
    this.container.add(title);

    const guideLines = [
      '• DESKTOP: Move Mouse to steer paddle. Click or Space to launch/fire.',
      '• MOBILE: Touch & slide anywhere on bottom screen to move paddle.',
      '• DEFLECTION: Edge hits angle ball sharply; center reflects straight.',
      '• POWER-UPS: Catch falling capsules (Multi-Ball, Laser, Safety Floor, Fireball).',
      '• BOMB BRICKS: Explode in AoE chain reactions.',
      '• COMBOS: Consecutive hits without touching paddle grant up to 5x multiplier!',
    ];

    let lineY = cy - 105;
    guideLines.forEach((text) => {
      const line = createCrispText(scene, cx - 200, lineY, text, {
        fontFamily: FONTS.RETRO,
        fontSize: '11px',
        color: '#e2e8f0',
        wordWrap: { width: 400 },
      });
      this.container.add(line);
      lineY += 34;
    });

    const closeBtn = this.createButton(cx, cy + 140, 200, 36, 'CLOSE', 0x00f0ff, onClose);
    this.container.add(closeBtn);
  }

  public show(): void {
    this.isVisible = true;
    this.container.setVisible(true).setAlpha(0);
    this.scene.tweens.add({
      targets: this.container,
      alpha: 1,
      duration: 180,
      ease: 'Sine.easeOut',
    });
  }

  public hide(): void {
    this.isVisible = false;
    this.container.setVisible(false);
  }

  private createButton(
    x: number,
    y: number,
    w: number,
    h: number,
    label: string,
    color: number,
    onClick: () => void
  ): Phaser.GameObjects.Container {
    const btn = this.scene.add.container(x, y);

    const bg = this.scene.add.graphics();
    bg.fillStyle(0x05070e, 0.9);
    bg.fillRoundedRect(-w / 2, -h / 2, w, h, 6);
    bg.lineStyle(1.5, color, 0.8);
    bg.strokeRoundedRect(-w / 2, -h / 2, w, h, 6);
    btn.add(bg);

    const text = createCrispText(this.scene, 0, 0, label, {
      fontFamily: FONTS.RETRO,
      fontSize: '13px',
      color: '#ffffff',
    }).setOrigin(0.5);
    btn.add(text);

    const hit = this.scene.add.rectangle(0, 0, w, h, 0, 0).setInteractive({ useHandCursor: true });
    btn.add(hit);

    hit.on('pointerdown', onClick);
    return btn;
  }

  public destroy(): void {
    this.container.destroy();
  }
}

// Backward-compatible alias
export const SettingsModal = HelpModal;

// ==========================================
// AUDIO SETTINGS MODAL
// ==========================================
export class AudioSettingsModal {
  private scene: Phaser.Scene;
  private container: Phaser.GameObjects.Container;
  public isVisible = false;
  private sfxStatusText!: Phaser.GameObjects.Text;
  private musicStatusText!: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene, onClose: () => void) {
    this.scene = scene;
    this.container = scene.add.container(0, 0).setDepth(60).setVisible(false);

    const overlay = scene.add
      .rectangle(0, 0, GAME_WIDTH, GAME_HEIGHT, 0x05070e, 0.85)
      .setOrigin(0)
      .setInteractive();
    this.container.add(overlay);

    const cx = GAME_WIDTH / 2;
    const cy = GAME_HEIGHT / 2;
    const cardW = 380;
    const cardH = 290;

    const card = scene.add.graphics();
    card.fillStyle(0x0e172a, 0.96);
    card.fillRoundedRect(cx - cardW / 2, cy - cardH / 2, cardW, cardH, 10);
    card.lineStyle(2, 0xa855f7, 0.9);
    card.strokeRoundedRect(cx - cardW / 2, cy - cardH / 2, cardW, cardH, 10);
    this.container.add(card);

    const title = createCrispText(scene, cx, cy - 100, 'AUDIO CONTROLS', {
      fontFamily: FONTS.RETRO,
      fontSize: '22px',
      color: '#a855f7',
      stroke: '#3b0764',
      strokeThickness: 3,
    }).setOrigin(0.5);
    this.container.add(title);

    const audioMgr = AudioManager.getInstance(scene);

    // SFX Row
    const sfxBtn = this.createSettingToggle(
      cx,
      cy - 40,
      300,
      40,
      'SOUND EFFECTS (SFX)',
      () => !audioMgr.getSettings().sfxMuted,
      () => {
        const cur = audioMgr.getSettings().sfxMuted;
        audioMgr.updateSettings({ sfxMuted: !cur });
        this.updateLabels();
      }
    );
    this.sfxStatusText = sfxBtn.statusText;
    this.container.add(sfxBtn.container);

    // Music Row
    const musicBtn = this.createSettingToggle(
      cx,
      cy + 15,
      300,
      40,
      'SYNTH BGM MUSIC',
      () => !audioMgr.getSettings().musicMuted,
      () => {
        const cur = audioMgr.getSettings().musicMuted;
        audioMgr.updateSettings({ musicMuted: !cur });
        this.updateLabels();
      }
    );
    this.musicStatusText = musicBtn.statusText;
    this.container.add(musicBtn.container);

    const closeBtn = this.createStandardButton(cx, cy + 90, 200, 36, 'SAVE & CLOSE', 0xa855f7, onClose);
    this.container.add(closeBtn);

    this.updateLabels();
  }

  private updateLabels(): void {
    const audioMgr = AudioManager.getInstance(this.scene);
    const s = audioMgr.getSettings();
    this.sfxStatusText.setText(s.sfxMuted ? 'MUTED' : 'ENABLED');
    this.sfxStatusText.setColor(s.sfxMuted ? '#ef4444' : '#10b981');

    this.musicStatusText.setText(s.musicMuted ? 'MUTED' : 'ENABLED');
    this.musicStatusText.setColor(s.musicMuted ? '#ef4444' : '#10b981');
  }

  private createSettingToggle(
    x: number,
    y: number,
    w: number,
    h: number,
    label: string,
    getValue: () => boolean,
    onToggle: () => void
  ): { container: Phaser.GameObjects.Container; statusText: Phaser.GameObjects.Text } {
    const c = this.scene.add.container(x, y);

    const bg = this.scene.add.graphics();
    bg.fillStyle(0x05070e, 0.85);
    bg.fillRoundedRect(-w / 2, -h / 2, w, h, 6);
    bg.lineStyle(1.2, 0x475569, 0.7);
    bg.strokeRoundedRect(-w / 2, -h / 2, w, h, 6);
    c.add(bg);

    const nameText = createCrispText(this.scene, -w / 2 + 14, 0, label, {
      fontFamily: FONTS.RETRO,
      fontSize: '11px',
      color: '#e2e8f0',
    }).setOrigin(0, 0.5);
    c.add(nameText);

    const statusText = createCrispText(this.scene, w / 2 - 14, 0, 'ENABLED', {
      fontFamily: FONTS.RETRO,
      fontSize: '11px',
      color: '#10b981',
    }).setOrigin(1, 0.5);
    c.add(statusText);

    const hit = this.scene.add.rectangle(0, 0, w, h, 0, 0).setInteractive({ useHandCursor: true });
    hit.on('pointerdown', onToggle);
    c.add(hit);

    return { container: c, statusText };
  }

  private createStandardButton(
    x: number,
    y: number,
    w: number,
    h: number,
    label: string,
    color: number,
    onClick: () => void
  ): Phaser.GameObjects.Container {
    const btn = this.scene.add.container(x, y);

    const bg = this.scene.add.graphics();
    bg.fillStyle(0x05070e, 0.9);
    bg.fillRoundedRect(-w / 2, -h / 2, w, h, 6);
    bg.lineStyle(1.5, color, 0.8);
    bg.strokeRoundedRect(-w / 2, -h / 2, w, h, 6);
    btn.add(bg);

    const text = createCrispText(this.scene, 0, 0, label, {
      fontFamily: FONTS.RETRO,
      fontSize: '13px',
      color: '#ffffff',
    }).setOrigin(0.5);
    btn.add(text);

    const hit = this.scene.add.rectangle(0, 0, w, h, 0, 0).setInteractive({ useHandCursor: true });
    btn.add(hit);

    hit.on('pointerdown', onClick);
    return btn;
  }

  public show(): void {
    this.updateLabels();
    this.isVisible = true;
    this.container.setVisible(true).setAlpha(0);
    this.scene.tweens.add({
      targets: this.container,
      alpha: 1,
      duration: 180,
      ease: 'Sine.easeOut',
    });
  }

  public hide(): void {
    this.isVisible = false;
    this.container.setVisible(false);
  }

  public destroy(): void {
    this.container.destroy();
  }
}

// ==========================================
// ABOUT & CREDITS MODAL
// ==========================================
export class AboutModal {
  private scene: Phaser.Scene;
  private container: Phaser.GameObjects.Container;
  public isVisible = false;

  constructor(scene: Phaser.Scene, onClose: () => void) {
    this.scene = scene;
    this.container = scene.add.container(0, 0).setDepth(60).setVisible(false);

    const overlay = scene.add
      .rectangle(0, 0, GAME_WIDTH, GAME_HEIGHT, 0x05070e, 0.85)
      .setOrigin(0)
      .setInteractive();
    this.container.add(overlay);

    const cx = GAME_WIDTH / 2;
    const cy = GAME_HEIGHT / 2;
    const cardW = 440;
    const cardH = 340;

    const card = scene.add.graphics();
    card.fillStyle(0x0e172a, 0.96);
    card.fillRoundedRect(cx - cardW / 2, cy - cardH / 2, cardW, cardH, 10);
    card.lineStyle(2, 0x00f0ff, 0.9);
    card.strokeRoundedRect(cx - cardW / 2, cy - cardH / 2, cardW, cardH, 10);
    this.container.add(card);

    const title = createCrispText(scene, cx, cy - 120, 'ABOUT BLOCK BREAKER', {
      fontFamily: FONTS.RETRO,
      fontSize: '22px',
      color: '#00f0ff',
      stroke: '#003344',
      strokeThickness: 3,
    }).setOrigin(0.5);
    this.container.add(title);

    const desc = createCrispText(
      scene,
      cx,
      cy - 65,
      'A cyber-arcade remake of the classic brick breaker game,\nengineered with TypeScript, Phaser 3, procedural Web Audio,\nand high-speed particle dynamics.',
      {
        fontFamily: FONTS.RETRO,
        fontSize: '12px',
        color: '#94a3b8',
        align: 'center',
        lineSpacing: 4,
      }
    ).setOrigin(0.5);
    this.container.add(desc);

    // Links
    const webBtn = this.createLinkButton(cx, cy + 5, 320, 36, '🌐  nazeriland.ir', () => {
      window.open('https://nazeriland.ir', '_blank');
    });
    const portalBtn = this.createLinkButton(cx, cy + 48, 320, 36, '🎮  More Games (game.nazeriland.ir)', () => {
      window.open('https://game.nazeriland.ir', '_blank');
    });
    this.container.add([webBtn, portalBtn]);

    const closeBtn = this.createLinkButton(cx, cy + 115, 180, 34, 'CLOSE', onClose, 0x00f0ff);
    this.container.add(closeBtn);
  }

  private createLinkButton(
    x: number,
    y: number,
    w: number,
    h: number,
    label: string,
    onClick: () => void,
    strokeColor: number = 0x475569
  ): Phaser.GameObjects.Container {
    const btn = this.scene.add.container(x, y);

    const bg = this.scene.add.graphics();
    bg.fillStyle(0x05070e, 0.9);
    bg.fillRoundedRect(-w / 2, -h / 2, w, h, 6);
    bg.lineStyle(1.2, strokeColor, 0.8);
    bg.strokeRoundedRect(-w / 2, -h / 2, w, h, 6);
    btn.add(bg);

    const text = createCrispText(this.scene, 0, 0, label, {
      fontFamily: FONTS.RETRO,
      fontSize: '12px',
      color: '#ffffff',
    }).setOrigin(0.5);
    btn.add(text);

    const hit = this.scene.add.rectangle(0, 0, w, h, 0, 0).setInteractive({ useHandCursor: true });
    btn.add(hit);

    hit.on('pointerdown', onClick);
    return btn;
  }

  public show(): void {
    this.isVisible = true;
    this.container.setVisible(true).setAlpha(0);
    this.scene.tweens.add({
      targets: this.container,
      alpha: 1,
      duration: 180,
      ease: 'Sine.easeOut',
    });
  }

  public hide(): void {
    this.isVisible = false;
    this.container.setVisible(false);
  }

  public destroy(): void {
    this.container.destroy();
  }
}

