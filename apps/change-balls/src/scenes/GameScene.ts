import Phaser from 'phaser';
import {
  CENTER_X,
  CENTER_Y,
  CONTACT_LEFT_X,
  CONTACT_RIGHT_X,
  DEFAULT_SPEED,
  LEFT_PILLAR_X,
  LEFT_PILLAR_Y,
  RIGHT_PILLAR_X,
  RIGHT_PILLAR_Y,
  GameMode,
} from '../config';
import { StorageManager } from '../data/StorageManager';
import { AudioManager } from '../audio/AudioManager';
import { BallPillar } from '../entities/BallPillar';
import { CentralBall } from '../entities/CentralBall';
import { GameOverModal } from '../ui/GameOverModal';
import { createCrispText } from '../ui/TextHelper';
import { HeartsUI } from '../ui/HeartsUI';
import { BannerManager } from '../ui/BannerManager';

export class GameScene extends Phaser.Scene {
  private mode: GameMode = 'onePlayer';

  private leftPillar!: BallPillar;
  private rightPillar!: BallPillar;
  private centralBall!: CentralBall;
  private gameOverModal!: GameOverModal;
  private heartsUI!: HeartsUI;
  private bannerManager!: BannerManager;

  private score: number = 0;
  private combo: number = 0;
  private comboStreak: number = 0;
  private isPlaying: boolean = false;
  private isGameOver: boolean = false;

  private scoreText!: Phaser.GameObjects.Text;
  private bestScoreText!: Phaser.GameObjects.Text;
  private soundBtnText!: Phaser.GameObjects.Text;
  private musicBtnText!: Phaser.GameObjects.Text;

  private comboBadgeContainer!: Phaser.GameObjects.Container;
  private comboBadgeText!: Phaser.GameObjects.Text;

  private dividerGraphics?: Phaser.GameObjects.Graphics;

  constructor() {
    super('GameScene');
  }

  init(data: { mode?: GameMode }): void {
    this.mode = data.mode || 'onePlayer';
    this.score = 0;
    this.combo = 0;
    this.comboStreak = 0;
    this.isPlaying = false;
    this.isGameOver = false;
  }

  create(): void {
    const width = this.scale.width;
    const height = this.scale.height;

    // Banner Manager for holding milestone messages stationary so player can read them comfortably
    this.bannerManager = new BannerManager(this);

    // Start Game Music
    AudioManager.getInstance().playGameMusic();

    // Subtle background guidelines / aesthetics
    this.createBackgroundAesthetics();

    // 2-Player Mode screen divider & cues
    if (this.mode === 'twoPlayer') {
      this.createTwoPlayerDivider(width, height);
    }

    // Ball Pillars
    this.leftPillar = new BallPillar(this, LEFT_PILLAR_X, LEFT_PILLAR_Y, true);
    this.rightPillar = new BallPillar(this, RIGHT_PILLAR_X, RIGHT_PILLAR_Y, false);

    // Calculate speed based on settings
    const speedMult = StorageManager.getSpeedSetting() / 10;
    const finalSpeed = DEFAULT_SPEED * speedMult;

    // Central Ball
    this.centralBall = new CentralBall(this, finalSpeed);

    // HUD Header
    this.createHUD(width, height);

    // Game Over Modal
    this.gameOverModal = new GameOverModal(
      this,
      () => this.restartGame(),
      () => this.returnToMenu()
    );

    // Setup input listeners
    this.setupInputs();

    // Start countdown / launch ball
    this.time.delayedCall(450, () => {
      if (!this.isGameOver) {
        this.isPlaying = true;
        this.centralBall.startMoving(true); // move towards right initially
      }
    });
  }

  private createBackgroundAesthetics(): void {
    const bg = this.add.graphics();
    // Solid navy base + radial center glow
    bg.fillStyle(0x0c0f17, 1);
    bg.fillRect(0, 0, this.scale.width, this.scale.height);
    bg.fillStyle(0x161c2e, 0.85);
    bg.fillCircle(CENTER_X, CENTER_Y, 400);

    // Subtle trajectory track
    bg.lineStyle(1.5, 0x1e293b, 0.4);
    bg.lineBetween(LEFT_PILLAR_X, CENTER_Y, RIGHT_PILLAR_X, CENTER_Y);

    // Subtle central ring
    bg.lineStyle(1, 0x1e293b, 0.3);
    bg.strokeCircle(CENTER_X, CENTER_Y, 70);
  }

  private createTwoPlayerDivider(width: number, height: number): void {
    this.dividerGraphics = this.add.graphics();
    this.dividerGraphics.lineStyle(2, 0x334155, 0.3);

    // Dotted vertical line down the center
    const step = 20;
    for (let y = 60; y < height - 20; y += step * 2) {
      this.dividerGraphics.lineBetween(width / 2, y, width / 2, y + step);
    }

    // Player 1 cue (Left)
    const p1Label = createCrispText(this, width / 4, height - 35, 'P1: TAP LEFT / SPACE', {
      fontSize: '14px',
      color: '#475569',
    });
    p1Label.setOrigin(0.5);

    // Player 2 cue (Right)
    const p2Label = createCrispText(this, (width / 4) * 3, height - 35, 'P2: TAP RIGHT / ENTER', {
      fontSize: '14px',
      color: '#475569',
    });
    p2Label.setOrigin(0.5);
  }

  private createHUD(width: number, _height: number): void {
    const topY = 38;

    // Back / Menu Button (Top Left)
    this.createIconButton(45, topY, '←', () => {
      AudioManager.getInstance().playClick();
      this.returnToMenu();
    });

    // Hearts / Lives UI (Top Center-Left)
    this.heartsUI = new HeartsUI(this, width / 2 - 130, topY, 1);

    // Score Display (Top Center)
    const scoreContainer = this.add.container(width / 2, topY);
    this.scoreText = createCrispText(this, 0, 0, '0', {
      fontSize: '44px',
      color: '#ffffff',
      fontStyle: 'bold',
    });
    this.scoreText.setOrigin(0.5);
    scoreContainer.add(this.scoreText);

    // Combo Badge (under the score, active when comboStreak >= 20)
    this.comboBadgeContainer = this.add.container(width / 2, topY + 45);
    this.comboBadgeContainer.setVisible(false);
    this.comboBadgeContainer.setDepth(45);

    const cBg = this.add.graphics();
    cBg.fillStyle(0x0f172a, 0.9);
    cBg.fillRoundedRect(-75, -14, 150, 28, 14);
    cBg.lineStyle(1.5, 0xfbbf24, 0.95);
    cBg.strokeRoundedRect(-75, -14, 150, 28, 14);

    this.comboBadgeText = createCrispText(this, 0, 0, '🔥 COMBO x20', {
      fontSize: '13px',
      color: '#fbbf24',
      fontStyle: 'bold',
    });
    this.comboBadgeText.setOrigin(0.5);
    this.comboBadgeContainer.add([cBg, this.comboBadgeText]);

    // Best Score Badge (Top Center-Right)
    const bestScore = StorageManager.getBestScore(this.mode);
    this.bestScoreText = createCrispText(this, width / 2 + 130, topY + 4, `BEST: ${bestScore}`, {
      fontSize: '14px',
      color: '#38bdf8',
    });
    this.bestScoreText.setOrigin(0, 0.5);

    // Top Right Action Buttons: Fullscreen, Sound, Music
    const rightMargin = width - 35;

    // Fullscreen
    this.createIconButton(rightMargin, topY, '⛶', () => {
      AudioManager.getInstance().playClick();
      this.toggleFullscreen();
    });

    // Sound
    const soundBtn = this.createIconButton(rightMargin - 50, topY, '🔊', () => {
      const on = AudioManager.getInstance().toggleSound();
      AudioManager.getInstance().playClick();
      this.soundBtnText.setText(on ? '🔊' : '🔇');
    });
    this.soundBtnText = soundBtn.getByName('iconText') as Phaser.GameObjects.Text;
    this.soundBtnText.setText(AudioManager.getInstance().isSoundOn() ? '🔊' : '🔇');

    // Music
    const musicBtn = this.createIconButton(rightMargin - 100, topY, '🎵', () => {
      AudioManager.getInstance().playClick();
      const on = AudioManager.getInstance().toggleMusic();
      this.musicBtnText.setText(on ? '🎵' : '🔇');
    });
    this.musicBtnText = musicBtn.getByName('iconText') as Phaser.GameObjects.Text;
    this.musicBtnText.setText(AudioManager.getInstance().isMusicOn() ? '🎵' : '🔇');
  }

  private createIconButton(
    x: number,
    y: number,
    symbol: string,
    onClick: () => void
  ): Phaser.GameObjects.Container {
    const btn = this.add.container(x, y);
    const size = 38;

    const bg = this.add.graphics();
    bg.fillStyle(0x1e293b, 0.7);
    bg.fillRoundedRect(-size / 2, -size / 2, size, size, 10);
    bg.lineStyle(1.5, 0x334155, 1);
    bg.strokeRoundedRect(-size / 2, -size / 2, size, size, 10);

    const txt = this.add.text(0, -1, symbol, {
      fontFamily: 'sans-serif',
      fontSize: '18px',
      color: '#ffffff',
    });
    txt.setName('iconText');
    txt.setOrigin(0.5);

    btn.add([bg, txt]);
    btn.setSize(size, size);
    btn.setInteractive({ useHandCursor: true });

    btn.on('pointerdown', (e: Phaser.Input.Pointer) => {
      e.event.stopPropagation();
      onClick();
    });

    return btn;
  }

  private toggleFullscreen(): void {
    if (this.scale.isFullscreen) {
      this.scale.stopFullscreen();
    } else {
      this.scale.startFullscreen();
    }
  }

  private setupInputs(): void {
    // Pointer / Touch down
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      // Don't flip pillars if tapping the top HUD area
      if (pointer.y < 80) return;
      if (this.isGameOver || this.gameOverModal.getVisible()) return;

      if (this.mode === 'onePlayer') {
        this.flipBothPillars();
      } else {
        // Two Player: Left half vs Right half
        if (pointer.x < this.scale.width / 2) {
          this.flipLeftPillar();
        } else {
          this.flipRightPillar();
        }
      }
    });

    // Keyboard inputs
    if (this.input.keyboard) {
      this.input.keyboard.on('keydown', (event: KeyboardEvent) => {
        if (this.isGameOver || this.gameOverModal.getVisible()) return;

        if (this.mode === 'onePlayer') {
          if (event.code === 'Space' || event.code === 'Enter') {
            event.preventDefault();
            this.flipBothPillars();
          }
        } else {
          // Two Player keyboard:
          // Left Player: Space or KeyA
          if (event.code === 'Space' || event.code === 'KeyA') {
            event.preventDefault();
            this.flipLeftPillar();
          }
          // Right Player: Enter or KeyD or ArrowRight
          if (event.code === 'Enter' || event.code === 'KeyD' || event.code === 'ArrowRight') {
            event.preventDefault();
            this.flipRightPillar();
          }
        }
      });
    }
  }

  private flipLeftPillar(): void {
    AudioManager.getInstance().playRotate();
    this.leftPillar.flip();
  }

  private flipRightPillar(): void {
    AudioManager.getInstance().playRotate();
    this.rightPillar.flip();
  }

  private flipBothPillars(): void {
    AudioManager.getInstance().playRotate();
    this.leftPillar.flip();
    this.rightPillar.flip();
  }

  override update(_time: number, delta: number): void {
    if (!this.isPlaying || this.isGameOver) return;

    this.centralBall.update(delta);

    const bx = this.centralBall.getX();

    // Check collision moving Right
    if (this.centralBall.vx > 0 && bx >= CONTACT_RIGHT_X) {
      this.centralBall.container.x = CONTACT_RIGHT_X;
      this.handlePillarHit(this.rightPillar);
    }
    // Check collision moving Left
    else if (this.centralBall.vx < 0 && bx <= CONTACT_LEFT_X) {
      this.centralBall.container.x = CONTACT_LEFT_X;
      this.handlePillarHit(this.leftPillar);
    }
  }

  private handlePillarHit(pillar: BallPillar): void {
    if (this.centralBall.isInvulnerable) return;

    const activeColor = pillar.getActiveColor();
    const ballColor = this.centralBall.currentColor;

    if (ballColor === activeColor) {
      // MATCH!
      this.score++;
      this.combo++;
      this.comboStreak++;
      this.scoreText.setText(this.score.toString());

      // Heat level progression
      const { tierChanged, tierInfo } = this.centralBall.updateScore(this.score);

      // Punch animation on score text tinted with current heat color
      this.scoreText.setColor(tierInfo.hex);
      this.tweens.add({
        targets: this.scoreText,
        scaleX: 1.35,
        scaleY: 1.35,
        duration: 90,
        yoyo: true,
        ease: Phaser.Math.Easing.Sine.InOut,
      });

      // SFX: pitch steps up every 4 bounces in musical intervals
      AudioManager.getInstance().playMatch(this.score);

      // Milestone celebration on tier change (every 10 points)
      if (tierChanged) {
        AudioManager.getInstance().playTierUp();

        // Subtle exciting speed ramp (+12 px/sec)
        const sign = Math.sign(this.centralBall.vx) || 1;
        this.centralBall.vx += sign * 12;

        // Big screen flare at score 50 (Supernova)
        if (this.score >= 50) {
          this.cameras.main.flash(350, 239, 68, 68, false);
        }
      }

      // Check Extra Life reward (Every 40 points)
      if (this.score % 40 === 0) {
        const added = this.heartsUI.addLife();
        if (added) {
          AudioManager.getInstance().playHeartUp();
        }
      }

      // Combo System: activates at 20+ consecutive hits
      if (this.comboStreak >= 20) {
        this.comboBadgeContainer.setVisible(true);
        this.comboBadgeText.setText(`🔥 COMBO x${this.comboStreak}`);

        this.tweens.add({
          targets: this.comboBadgeContainer,
          scaleX: 1.15,
          scaleY: 1.15,
          duration: 80,
          yoyo: true,
          ease: Phaser.Math.Easing.Sine.InOut,
        });
      }

      // Bounce and potentially switch color
      this.centralBall.bounceAndDecideColor(() => {
        AudioManager.getInstance().playColorSwitch();
      });

      // Visual match spark in tier color
      this.spawnMatchParticles(this.centralBall.getX(), CENTER_Y, tierInfo.color);
    } else {
      // MISMATCH! Check if player has extra heart/shield
      if (this.heartsUI.getLives() > 1) {
        // Use 1 heart to save the player!
        this.heartsUI.loseLife();
        AudioManager.getInstance().playHeartBreak();

        // Safe bounce & invulnerability shield for 1.4s
        this.centralBall.activateShield(1400);
        this.centralBall.vx = -this.centralBall.vx;

        // Reset combo streak
        this.comboStreak = 0;
        this.comboBadgeContainer.setVisible(false);

        // Screen micro shake
        this.cameras.main.shake(180, 0.012);
      } else {
        // Last life lost -> GAME OVER!
        this.heartsUI.loseLife();
        this.handleGameOver();
      }
    }
  }

  private spawnMatchParticles(x: number, y: number, color: number): void {
    for (let i = 0; i < 8; i++) {
      const angle = Phaser.Math.FloatBetween(0, Math.PI * 2);
      const speed = Phaser.Math.FloatBetween(100, 240);
      const p = this.add.graphics();
      p.fillStyle(color, 0.9);
      p.fillCircle(0, 0, Phaser.Math.Between(2, 4));
      p.setPosition(x, y);

      this.tweens.add({
        targets: p,
        x: x + Math.cos(angle) * (speed * 0.2),
        y: y + Math.sin(angle) * (speed * 0.2),
        alpha: 0,
        duration: 220,
        ease: Phaser.Math.Easing.Cubic.Out,
        onComplete: () => p.destroy(),
      });
    }
  }

  private handleGameOver(): void {
    this.isGameOver = true;
    this.isPlaying = false;
    this.centralBall.vx = 0;

    // SFX & Camera shake
    AudioManager.getInstance().playGameOver();
    this.cameras.main.shake(220, 0.015);

    // Ball explosion / shatter particle effect
    this.spawnGameOverEffect(this.centralBall.getX(), CENTER_Y);

    // Show modal after brief pause
    this.time.delayedCall(450, () => {
      this.gameOverModal.show(this.score, this.mode);
    });
  }

  private spawnGameOverEffect(x: number, y: number): void {
    for (let i = 0; i < 18; i++) {
      const angle = Phaser.Math.FloatBetween(0, Math.PI * 2);
      const dist = Phaser.Math.FloatBetween(40, 160);
      const p = this.add.graphics();
      p.fillStyle(0xef4444, 0.9);
      p.fillCircle(0, 0, Phaser.Math.Between(3, 6));
      p.setPosition(x, y);

      this.tweens.add({
        targets: p,
        x: x + Math.cos(angle) * dist,
        y: y + Math.sin(angle) * dist,
        alpha: 0,
        scaleX: 0.2,
        scaleY: 0.2,
        duration: 400,
        ease: Phaser.Math.Easing.Cubic.Out,
        onComplete: () => p.destroy(),
      });
    }
  }

  private restartGame(): void {
    this.score = 0;
    this.combo = 0;
    this.comboStreak = 0;
    this.isGameOver = false;
    this.isPlaying = false;

    this.scoreText.setText('0');
    this.scoreText.setColor('#ffffff');
    this.comboBadgeContainer.setVisible(false);
    this.heartsUI.reset(1);
    this.bannerManager.clear();
    this.leftPillar.reset();
    this.rightPillar.reset();

    const speedMult = StorageManager.getSpeedSetting() / 10;
    const finalSpeed = DEFAULT_SPEED * speedMult;
    this.centralBall.reset(finalSpeed);

    this.time.delayedCall(350, () => {
      if (!this.isGameOver) {
        this.isPlaying = true;
        this.centralBall.startMoving(true);
      }
    });
  }

  private returnToMenu(): void {
    this.scene.start('MenuScene');
  }
}
