import Phaser from 'phaser';
import { AudioManager } from '../audio/AudioManager.js';
import {
  COURT_CONFIG,
  PADDLE_CONFIG,
  BALL_CONFIG,
  GameMode,
  GameStyle,
  GameTheme,
  GAME_THEMES,
  AI_BOT_PROFILES,
  PowerUpKind,
  MatchSettings,
  DEFAULT_SETTINGS,
} from '../config.js';
import { Paddle } from '../objects/Paddle.js';
import { PlayerPaddle } from '../objects/PlayerPaddle.js';
import { AIPaddle } from '../objects/AIPaddle.js';
import { Ball } from '../objects/Ball.js';
import { PowerUp } from '../objects/PowerUp.js';
import { GameOverModal } from '../ui/GameOverModal.js';
import { SettingsModal } from '../ui/SettingsModal.js';
import { createCrispText, createRetroScoreText } from '../ui/TextHelper.js';

export class GameScene extends Phaser.Scene {
  private settings: MatchSettings = { ...DEFAULT_SETTINGS };

  private paddleLeft!: PlayerPaddle;
  private paddleRight!: Paddle; // PlayerPaddle or AIPaddle
  private ball!: Ball;

  private p1Score: number = 0;
  private p2Score: number = 0;
  private maxRallyInMatch: number = 0;
  private lastMilestoneAnnounced: number = 0;

  private p1ScoreText!: Phaser.GameObjects.Text;
  private p2ScoreText!: Phaser.GameObjects.Text;
  private rallyText!: Phaser.GameObjects.Text;
  private targetText!: Phaser.GameObjects.Text;
  private bannerText!: Phaser.GameObjects.Text;
  private opponentBadgeText?: Phaser.GameObjects.Text;

  private isGoalPausing: boolean = false;
  private gameOverModal!: GameOverModal;
  private settingsModal!: SettingsModal;

  private courtGraphics!: Phaser.GameObjects.Graphics;
  private effectsGraphics!: Phaser.GameObjects.Graphics;

  // Power-Up management (Arcade Mode)
  private currentPowerUp?: PowerUp;
  private powerUpSpawnTimer: number = 8; // First power-up appears 8s into play

  // Particle systems
  private sparkParticles: Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    alpha: number;
    size: number;
    color: number;
  }> = [];

  constructor() {
    super('GameScene');
  }

  init(data?: Partial<MatchSettings>): void {
    this.settings = { ...DEFAULT_SETTINGS, ...data };
    this.p1Score = 0;
    this.p2Score = 0;
    this.maxRallyInMatch = 0;
    this.lastMilestoneAnnounced = 0;
    this.isGoalPausing = false;
    this.currentPowerUp = undefined;
    this.powerUpSpawnTimer = 8;
  }

  create(): void {
    const width = this.scale.width;
    const height = this.scale.height;

    AudioManager.getInstance().setSfxEnabled(this.settings.sfxEnabled);
    AudioManager.getInstance().setMusicEnabled(this.settings.musicEnabled);
    AudioManager.getInstance().playMusic('game');

    // 1. Draw Court Background & Borders
    this.courtGraphics = this.add.graphics();
    this.effectsGraphics = this.add.graphics();
    this.effectsGraphics.setDepth(22);
    this.drawCourt();

    // 2. Large Retro Background Scoreboard (VCR OSD Mono Font)
    const currentTheme = GAME_THEMES[this.settings.theme] || GAME_THEMES[GameTheme.CyberNeon];
    this.p1ScoreText = createRetroScoreText(this, width / 2 - 140, height / 2 - 10, '0');
    this.p1ScoreText.setOrigin(0.5);
    this.p1ScoreText.setDepth(3);
    this.p1ScoreText.setColor(currentTheme.scoreColor);

    this.p2ScoreText = createRetroScoreText(this, width / 2 + 140, height / 2 - 10, '0');
    this.p2ScoreText.setOrigin(0.5);
    this.p2ScoreText.setDepth(3);
    this.p2ScoreText.setColor(currentTheme.scoreColor);

    // 3. Create Paddles
    const centerY = height / 2;
    this.paddleLeft = new PlayerPaddle(
      this,
      PADDLE_CONFIG.p1X,
      centerY,
      currentTheme.p1Color,
      true,
      this.settings.mode === GameMode.TwoPlayer
    );

    if (this.settings.mode === GameMode.TwoPlayer) {
      this.paddleRight = new PlayerPaddle(
        this,
        PADDLE_CONFIG.p2X,
        centerY,
        currentTheme.p2Color,
        false,
        true
      );
    } else {
      this.paddleRight = new AIPaddle(
        this,
        PADDLE_CONFIG.p2X,
        centerY,
        currentTheme.p2Color,
        this.settings.aiDifficulty
      );
    }

    // 4. Create Ball
    this.ball = new Ball(this, width / 2, centerY);

    // 5. In-Game HUD Elements
    this.createHUD();

    // 6. Mobile Touch Buttons (if touch is active)
    this.createMobileTouchControls();

    // 7. Modals
    this.gameOverModal = new GameOverModal(
      this,
      () => this.restartMatch(),
      () => this.scene.start('MenuScene')
    );

    this.settingsModal = new SettingsModal(this, this.settings, (updated) => {
      this.settings = updated;
      this.applySettingsChange();
    });

    // Keyboard Shortcuts (R: Reset, ESC: Menu)
    if (this.input.keyboard) {
      this.input.keyboard.on('keydown-R', () => {
        if (!this.gameOverModal.getVisible() && !this.settingsModal.getVisible()) {
          this.resetRound(true);
        }
      });
      this.input.keyboard.on('keydown-ESC', () => {
        if (this.settingsModal.getVisible()) {
          this.settingsModal.hide();
        } else {
          this.scene.start('MenuScene');
        }
      });
    }

    // Start with Initial Serve Countdown
    this.prepareServe(true);
  }

  private applySettingsChange(): void {
    const currentTheme = GAME_THEMES[this.settings.theme] || GAME_THEMES[GameTheme.CyberNeon];
    this.drawCourt();
    this.p1ScoreText.setColor(currentTheme.scoreColor);
    this.p2ScoreText.setColor(currentTheme.scoreColor);
    this.paddleLeft.setColor(currentTheme.p1Color);
    this.paddleRight.setColor(currentTheme.p2Color);

    if (this.settings.mode === GameMode.OnePlayer && this.paddleRight instanceof AIPaddle) {
      this.paddleRight.setDifficulty(this.settings.aiDifficulty);
      this.opponentBadgeText?.setText(`AI: ${this.settings.aiDifficulty.toUpperCase()}`);
    }

    const targetStr = this.settings.targetScore === 0 ? 'TARGET: ∞' : `FIRST TO ${this.settings.targetScore}`;
    this.targetText.setText(targetStr);

    // If switched away from Arcade, clean up active power-up
    if (this.settings.style !== GameStyle.Arcade && this.currentPowerUp) {
      this.currentPowerUp.destroy();
      this.currentPowerUp = undefined;
    }
  }

  private drawCourt(): void {
    const width = this.scale.width;
    const height = this.scale.height;
    const theme = GAME_THEMES[this.settings.theme] || GAME_THEMES[GameTheme.CyberNeon];

    this.courtGraphics.clear();
    this.courtGraphics.setDepth(1);

    // Deep Stadium Backdrop
    this.courtGraphics.fillStyle(theme.bgNumber, 1);
    this.courtGraphics.fillRect(0, 0, width, height);

    // Top Header Backdrop strip
    this.courtGraphics.fillStyle(theme.headerNumber, 0.95);
    this.courtGraphics.fillRect(0, 0, width, COURT_CONFIG.topMargin - 6);

    // Top & Bottom Rails (Solid Ice Borders)
    this.courtGraphics.fillStyle(theme.headerNumber, 1);
    this.courtGraphics.fillRect(COURT_CONFIG.leftMargin, COURT_CONFIG.topMargin - 6, width - COURT_CONFIG.leftMargin * 2, 6);
    this.courtGraphics.fillRect(COURT_CONFIG.leftMargin, height - COURT_CONFIG.bottomMargin, width - COURT_CONFIG.leftMargin * 2, 6);

    // Top & Bottom Rail Neon Edge
    this.courtGraphics.lineStyle(2, theme.railBorder, 0.85);
    this.courtGraphics.lineBetween(COURT_CONFIG.leftMargin, COURT_CONFIG.topMargin, width - COURT_CONFIG.leftMargin, COURT_CONFIG.topMargin);
    this.courtGraphics.lineBetween(COURT_CONFIG.leftMargin, height - COURT_CONFIG.bottomMargin, width - COURT_CONFIG.leftMargin, height - COURT_CONFIG.bottomMargin);

    // Center Dashed Net Line
    this.courtGraphics.lineStyle(3, theme.netColor, 0.9);
    const startY = COURT_CONFIG.topMargin + 10;
    const endY = height - COURT_CONFIG.bottomMargin - 10;
    for (let y = startY; y < endY; y += COURT_CONFIG.netDash + COURT_CONFIG.netGap) {
      this.courtGraphics.lineBetween(width / 2, y, width / 2, y + COURT_CONFIG.netDash);
    }

    // Center Circle Ring
    this.courtGraphics.lineStyle(2, theme.netColor, 0.4);
    this.courtGraphics.strokeCircle(width / 2, height / 2, 65);
  }

  private createHUD(): void {
    const width = this.scale.width;
    const height = this.scale.height;
    const hudY = 30;

    // Rally Counter (Center Top)
    this.rallyText = createCrispText(this, width / 2, hudY, 'RALLY: 0', {
      fontSize: '16px',
      color: '#00f0ff',
      fontStyle: 'bold',
    });
    this.rallyText.setOrigin(0.5, 0.5);
    this.rallyText.setDepth(30);

    // Opponent AI Difficulty Badge (if 1 Player mode)
    if (this.settings.mode === GameMode.OnePlayer) {
      this.opponentBadgeText = createCrispText(this, width / 2, hudY + 18, `AI: ${this.settings.aiDifficulty.toUpperCase()}`, {
        fontSize: '11px',
        color: '#64748b',
        fontStyle: 'bold',
      });
      this.opponentBadgeText.setOrigin(0.5, 0.5);
      this.opponentBadgeText.setDepth(30);
    }

    // Target Score Indicator (Center Bottom)
    const targetStr = this.settings.targetScore === 0 ? 'TARGET: ∞' : `FIRST TO ${this.settings.targetScore}`;
    this.targetText = createCrispText(this, width / 2, height - 24, targetStr, {
      fontSize: '13px',
      color: '#47658c',
    });
    this.targetText.setOrigin(0.5, 0.5);
    this.targetText.setDepth(30);

    // Goal / Point Celebration Banner (Hidden by default)
    this.bannerText = createCrispText(this, width / 2, height / 2 - 60, '', {
      fontSize: '36px',
      color: '#00f0ff',
      fontStyle: 'bold',
    });
    this.bannerText.setOrigin(0.5);
    this.bannerText.setAlpha(0);
    this.bannerText.setDepth(40);

    // Back to Menu Button (Left Top)
    const backBtn = this.add.container(70, hudY);
    const backBg = this.add.graphics();
    backBg.fillStyle(0x131a2c, 0.9);
    backBg.fillRoundedRect(-45, -14, 90, 28, 6);
    backBg.lineStyle(1.2, 0x00f0ff, 0.6);
    backBg.strokeRoundedRect(-45, -14, 90, 28, 6);

    const backTxt = createCrispText(this, 0, 0, '⮌ MENU', { fontSize: '13px', color: '#00f0ff' });
    backTxt.setOrigin(0.5);
    backBtn.add([backBg, backTxt]);
    backBtn.setSize(90, 28);
    backBtn.setInteractive({ useHandCursor: true });
    backBtn.setDepth(30);
    backBtn.on('pointerdown', () => {
      AudioManager.getInstance().playClick();
      this.scene.start('MenuScene');
    });

    // In-Game Settings Button (Gear)
    const setBtn = this.add.container(width - 125, hudY);
    const setBg = this.add.graphics();
    setBg.fillStyle(0x131a2c, 0.9);
    setBg.fillRoundedRect(-16, -14, 32, 28, 6);
    setBg.lineStyle(1.2, 0x00f0ff, 0.6);
    setBg.strokeRoundedRect(-16, -14, 32, 28, 6);

    const setTxt = createCrispText(this, 0, 0, '⚙', { fontSize: '15px', color: '#00f0ff' });
    setTxt.setOrigin(0.5);
    setBtn.add([setBg, setTxt]);
    setBtn.setSize(32, 28);
    setBtn.setInteractive({ useHandCursor: true });
    setBtn.setDepth(30);
    setBtn.on('pointerdown', () => {
      AudioManager.getInstance().playClick();
      this.settingsModal.show();
    });

    // Sound Toggle Button
    const sndBtn = this.add.container(width - 85, hudY);
    const sndBg = this.add.graphics();
    sndBg.fillStyle(0x131a2c, 0.9);
    sndBg.fillRoundedRect(-16, -14, 32, 28, 6);
    sndBg.lineStyle(1.2, 0x00f0ff, 0.6);
    sndBg.strokeRoundedRect(-16, -14, 32, 28, 6);

    const sndTxt = createCrispText(this, 0, 0, this.settings.sfxEnabled ? '🔊' : '🔇', { fontSize: '14px' });
    sndTxt.setOrigin(0.5);
    sndBtn.add([sndBg, sndTxt]);
    sndBtn.setSize(32, 28);
    sndBtn.setInteractive({ useHandCursor: true });
    sndBtn.setDepth(30);
    sndBtn.on('pointerdown', () => {
      this.settings.sfxEnabled = !this.settings.sfxEnabled;
      AudioManager.getInstance().setSfxEnabled(this.settings.sfxEnabled);
      AudioManager.getInstance().playClick();
      sndTxt.setText(this.settings.sfxEnabled ? '🔊' : '🔇');
    });

    // Fullscreen Toggle Button
    const fsBtn = this.add.container(width - 40, hudY);
    const fsBg = this.add.graphics();
    fsBg.fillStyle(0x131a2c, 0.9);
    fsBg.fillRoundedRect(-16, -14, 32, 28, 6);
    fsBg.lineStyle(1.2, 0x00f0ff, 0.6);
    fsBg.strokeRoundedRect(-16, -14, 32, 28, 6);

    const fsTxt = createCrispText(this, 0, 0, '⛶', { fontSize: '16px', color: '#00f0ff' });
    fsTxt.setOrigin(0.5);
    fsBtn.add([fsBg, fsTxt]);
    fsBtn.setSize(32, 28);
    fsBtn.setInteractive({ useHandCursor: true });
    fsBtn.setDepth(30);
    fsBtn.on('pointerdown', () => {
      AudioManager.getInstance().playClick();
      if (this.scale.isFullscreen) {
        this.scale.stopFullscreen();
      } else {
        this.scale.startFullscreen();
      }
    });
  }

  private createMobileTouchControls(): void {
    const isMobileOrTouch =
      !this.sys.game.device.os.desktop ||
      'ontouchstart' in window ||
      (navigator.maxTouchPoints > 0 && window.innerWidth <= 1024);

    if (!isMobileOrTouch) {
      // Hide touch controls completely on desktop!
      return;
    }

    const width = this.scale.width;
    const btnSize = 56;
    const margin = 20;
    const upY = 440;
    const downY = 505;

    // Left Touch Controls
    const leftUp = this.createTouchButton(margin + btnSize / 2, upY, '▲', (pressed) => {
      this.paddleLeft.setTouchInput(pressed, false);
    });
    const leftDown = this.createTouchButton(margin + btnSize / 2, downY, '▼', (pressed) => {
      this.paddleLeft.setTouchInput(false, pressed);
    });

    // Right Touch Controls (for 2-Player mode)
    if (this.settings.mode === GameMode.TwoPlayer && this.paddleRight instanceof PlayerPaddle) {
      const rightUp = this.createTouchButton(width - margin - btnSize / 2, upY, '▲', (pressed) => {
        (this.paddleRight as PlayerPaddle).setTouchInput(pressed, false);
      });
      const rightDown = this.createTouchButton(width - margin - btnSize / 2, downY, '▼', (pressed) => {
        (this.paddleRight as PlayerPaddle).setTouchInput(false, pressed);
      });
      rightUp.setDepth(25);
      rightDown.setDepth(25);
    }

    leftUp.setDepth(25);
    leftDown.setDepth(25);
  }

  private createTouchButton(x: number, y: number, symbol: string, onChange: (down: boolean) => void): Phaser.GameObjects.Container {
    const btn = this.add.container(x, y);
    const size = 56;

    const bg = this.add.graphics();
    const drawBg = (pressed: boolean) => {
      bg.clear();
      bg.fillStyle(pressed ? 0x00f0ff : 0x131a2c, pressed ? 0.35 : 0.2);
      bg.fillCircle(0, 0, size / 2);
      bg.lineStyle(1.5, 0x00f0ff, pressed ? 0.8 : 0.4);
      bg.strokeCircle(0, 0, size / 2);
    };

    drawBg(false);

    const txt = createCrispText(this, 0, 0, symbol, { fontSize: '20px', color: '#00f0ff' });
    txt.setOrigin(0.5);

    btn.add([bg, txt]);
    btn.setSize(size, size);
    btn.setInteractive();

    btn.on('pointerdown', () => {
      drawBg(true);
      onChange(true);
    });
    btn.on('pointerup', () => {
      drawBg(false);
      onChange(false);
    });
    btn.on('pointerout', () => {
      drawBg(false);
      onChange(false);
    });

    return btn;
  }

  update(_time: number, delta: number): void {
    const dt = delta / 1000;
    const topLimit = COURT_CONFIG.topMargin;
    const bottomLimit = this.scale.height - COURT_CONFIG.bottomMargin;

    // 1. Handle Paddle Inputs
    this.paddleLeft.handleInput();
    this.paddleLeft.update(dt, topLimit, bottomLimit);

    if (this.paddleRight instanceof PlayerPaddle) {
      this.paddleRight.handleInput();
    } else if (this.paddleRight instanceof AIPaddle) {
      this.paddleRight.updateAI(this.ball, this.scale.height / 2, dt);
    }
    this.paddleRight.update(dt, topLimit, bottomLimit);

    // Spawn Ice Drift sparks when drifting fast on ice
    if (Math.abs(this.paddleLeft.vy) > 180) {
      this.spawnIceDrift(this.paddleLeft.x - 4, this.paddleLeft.y, this.paddleLeft.vy, this.paddleLeft.color);
    }
    if (Math.abs(this.paddleRight.vy) > 180) {
      this.spawnIceDrift(this.paddleRight.x + 4, this.paddleRight.y, this.paddleRight.vy, this.paddleRight.color);
    }

    // 2. Update Ball
    if (this.ball.active && !this.isGoalPausing) {
      this.ball.update(dt);
      this.rallyText.setText(`RALLY: ${this.ball.rallyCount}`);

      // Track max rally
      if (this.ball.rallyCount > this.maxRallyInMatch) {
        this.maxRallyInMatch = this.ball.rallyCount;
      }

      // Check Rally Milestones
      this.checkRallyMilestones();

      // Check Wall Collisions
      this.checkWallCollisions(topLimit, bottomLimit);

      // Check Paddle Capsule Collisions
      this.checkPaddleCollisions();

      // Check Power-Up Spawning and Collision (in Arcade mode)
      if (this.settings.style === GameStyle.Arcade) {
        this.updatePowerUpManager(dt);
      }

      // Check Goal Lines
      this.checkGoalLines();
    }

    // 3. Update Spark Particles
    this.updateSparks(dt);
  }

  private checkRallyMilestones(): void {
    const r = this.ball.rallyCount;
    if (r >= 20 && this.lastMilestoneAnnounced < 20) {
      this.lastMilestoneAnnounced = 20;
      this.showRallyMilestone(20, '👑 GODLIKE RALLY! 👑', '#ff00ff');
    } else if (r >= 15 && this.lastMilestoneAnnounced < 15) {
      this.lastMilestoneAnnounced = 15;
      this.showRallyMilestone(15, '💥 INSANE RALLY! (15)', '#ff5500');
    } else if (r >= 10 && this.lastMilestoneAnnounced < 10) {
      this.lastMilestoneAnnounced = 10;
      this.showRallyMilestone(10, '🔥 SUPER RALLY! (10)', '#facc15');
    } else if (r >= 5 && this.lastMilestoneAnnounced < 5) {
      this.lastMilestoneAnnounced = 5;
      this.showRallyMilestone(5, '⚡ NICE RALLY! (5)', '#00f0ff');
    }
  }

  private showRallyMilestone(level: number, text: string, colorHex: string): void {
    AudioManager.getInstance().playRallyMilestone(level);
    this.cameras.main.shake(100, 0.003);

    const milestoneBadge = createCrispText(this, this.scale.width / 2, this.scale.height / 2 - 75, text, {
      fontFamily: 'VCR_OSD_MONO',
      fontSize: '24px',
      color: colorHex,
      fontStyle: 'bold',
    });
    milestoneBadge.setOrigin(0.5);
    milestoneBadge.setDepth(35);
    milestoneBadge.setScale(0.7);

    this.tweens.add({
      targets: milestoneBadge,
      y: milestoneBadge.y - 25,
      scale: 1.2,
      duration: 350,
      ease: Phaser.Math.Easing.Back.Out,
      onComplete: () => {
        this.tweens.add({
          targets: milestoneBadge,
          alpha: 0,
          y: milestoneBadge.y - 20,
          delay: 450,
          duration: 300,
          ease: Phaser.Math.Easing.Linear,
          onComplete: () => milestoneBadge.destroy(),
        });
      },
    });
  }

  private updatePowerUpManager(dt: number): void {
    // If no power-up exists, tick down spawn timer
    if (!this.currentPowerUp) {
      this.powerUpSpawnTimer -= dt;
      if (this.powerUpSpawnTimer <= 0) {
        this.spawnPowerUp();
        this.powerUpSpawnTimer = Phaser.Math.Between(13, 17);
      }
    } else {
      // Check collision with ball
      if (this.currentPowerUp.active && this.currentPowerUp.checkHit(this.ball.x, this.ball.y, this.ball.radius)) {
        this.collectPowerUp(this.currentPowerUp);
      }
    }
  }

  private spawnPowerUp(): void {
    const spawnX = Phaser.Math.Between(360, 600);
    const spawnY = Phaser.Math.Between(150, 450);

    const kinds = [PowerUpKind.Freeze, PowerUpKind.Extend, PowerUpKind.HyperSpeed];
    const kind = Phaser.Utils.Array.GetRandom(kinds);

    this.currentPowerUp = new PowerUp(this, spawnX, spawnY, kind);
    AudioManager.getInstance().playPowerUpSpawn();
  }

  private collectPowerUp(powerUp: PowerUp): void {
    AudioManager.getInstance().playPowerUpCollect();
    powerUp.shatter();

    // Determine beneficiary and opponent
    const lastHitter = this.ball.lastHitter || (this.ball.vx > 0 ? 'left' : 'right');
    const playerPaddle = lastHitter === 'left' ? this.paddleLeft : this.paddleRight;
    const opponentPaddle = lastHitter === 'left' ? this.paddleRight : this.paddleLeft;

    let notificationText = '';
    let notificationColor = '#ffffff';

    switch (powerUp.kind) {
      case PowerUpKind.Freeze:
        opponentPaddle.freeze(2.3);
        notificationText = '❄ OPPONENT FROZEN!';
        notificationColor = '#38bdf8';
        this.spawnSparks(opponentPaddle.x, opponentPaddle.y, 16, 0x38bdf8);
        break;
      case PowerUpKind.Extend:
        playerPaddle.extend(6.0);
        notificationText = '⇕ PADDLE EXTENDED!';
        notificationColor = '#22c55e';
        this.spawnSparks(playerPaddle.x, playerPaddle.y, 16, 0x22c55e);
        break;
      case PowerUpKind.HyperSpeed:
        this.ball.activateHyper(4.5);
        notificationText = '⚡ HYPER SPEED!';
        notificationColor = '#facc15';
        this.spawnSparks(this.ball.x, this.ball.y, 22, 0xfacc15);
        break;
    }

    // Floating Power-Up pickup banner
    const badge = createCrispText(this, powerUp.x, powerUp.y - 10, notificationText, {
      fontFamily: 'VCR_OSD_MONO',
      fontSize: '18px',
      color: notificationColor,
      fontStyle: 'bold',
    });
    badge.setOrigin(0.5);
    badge.setDepth(35);

    this.tweens.add({
      targets: badge,
      y: badge.y - 35,
      alpha: 0,
      duration: 1000,
      ease: Phaser.Math.Easing.Cubic.Out,
      onComplete: () => badge.destroy(),
    });

    this.currentPowerUp = undefined;
  }

  private checkWallCollisions(topLimit: number, bottomLimit: number): void {
    if (this.ball.y - this.ball.radius <= topLimit && this.ball.vy < 0) {
      this.ball.y = topLimit + this.ball.radius;
      this.ball.vy = -this.ball.vy;
      AudioManager.getInstance().playWallBounce();
      this.spawnSparks(this.ball.x, topLimit, 6, 0x00f0ff);
    } else if (this.ball.y + this.ball.radius >= bottomLimit && this.ball.vy > 0) {
      this.ball.y = bottomLimit - this.ball.radius;
      this.ball.vy = -this.ball.vy;
      AudioManager.getInstance().playWallBounce();
      this.spawnSparks(this.ball.x, bottomLimit, 6, 0x00f0ff);
    }
  }

  private checkPaddleCollisions(): void {
    this.testCapsuleCollision(this.paddleLeft, true);
    this.testCapsuleCollision(this.paddleRight, false);
  }

  /**
   * Geometric 2D Capsule vs Circle Collision Solver with Rounded Corners
   */
  private testCapsuleCollision(paddle: Paddle, isLeft: boolean): void {
    const H = paddle.height;
    const R = paddle.radius;
    const px = paddle.x;
    const py = paddle.y;
    const bx = this.ball.x;
    const by = this.ball.y;

    // Segment axis runs from (px, py - H/2 + R) to (px, py + H/2 - R)
    const minY = py - H / 2 + R;
    const maxY = py + H / 2 - R;
    const clampedY = Phaser.Math.Clamp(by, minY, maxY);

    // Closest point on capsule axis
    const qx = px;
    const qy = clampedY;

    const dx = bx - qx;
    const dy = by - qy;
    const distSq = dx * dx + dy * dy;
    const collisionRadius = R + this.ball.radius;

    if (distSq <= collisionRadius * collisionRadius) {
      const dist = Math.sqrt(distSq) || 0.001;
      const nx = dx / dist;
      const ny = dy / dist;

      // Normal velocity component
      const dot = this.ball.vx * nx + this.ball.vy * ny;

      // Only reflect if ball is moving into the paddle
      if (dot < 0) {
        // Record last hitter
        this.ball.lastHitter = isLeft ? 'left' : 'right';

        // Geometric reflection across surface normal
        let rx = this.ball.vx - 2 * dot * nx;
        let ry = this.ball.vy - 2 * dot * ny;

        // Apply curved corner bounce distraction boost
        ry *= BALL_CONFIG.bounceDistraction;

        // Impart slice / momentum from moving paddle on ice
        ry += paddle.vy * 0.22;

        this.ball.vx = rx;
        this.ball.vy = ry;

        // Guarantee ball moves away from paddle face
        if (isLeft && this.ball.vx < BALL_CONFIG.minXSpeed) {
          this.ball.vx = BALL_CONFIG.minXSpeed;
        } else if (!isLeft && this.ball.vx > -BALL_CONFIG.minXSpeed) {
          this.ball.vx = -BALL_CONFIG.minXSpeed;
        }

        // Boost ball speed for intense rallies
        this.ball.boostSpeed();

        // Push ball outside collider to prevent multi-hit
        this.ball.x = qx + nx * (collisionRadius + 1);
        this.ball.y = qy + ny * (collisionRadius + 1);

        // Sound & visual sparks
        AudioManager.getInstance().playPaddleBounce();
        this.spawnSparks(this.ball.x, this.ball.y, 10, paddle.color);
        this.cameras.main.shake(60, 0.003);

        // Paddle micro recoil
        this.tweens.add({
          targets: paddle.graphics,
          x: isLeft ? -3 : 3,
          duration: 60,
          yoyo: true,
          ease: Phaser.Math.Easing.Sine.Out,
        });
      }
    }
  }

  private checkGoalLines(): void {
    const width = this.scale.width;

    if (this.ball.x < COURT_CONFIG.leftMargin - 10) {
      // Point for Player 2 / AI
      this.handleGoal(false);
    } else if (this.ball.x > width - COURT_CONFIG.rightMargin + 10) {
      // Point for Player 1
      this.handleGoal(true);
    }
  }

  private handleGoal(p1Scored: boolean): void {
    this.isGoalPausing = true;
    this.ball.stop();

    if (this.currentPowerUp) {
      this.currentPowerUp.destroy();
      this.currentPowerUp = undefined;
    }

    AudioManager.getInstance().playScoreExplosion();
    this.cameras.main.shake(160, 0.007);

    const theme = GAME_THEMES[this.settings.theme] || GAME_THEMES[GameTheme.CyberNeon];

    if (p1Scored) {
      this.p1Score++;
      this.pulseScore(this.p1ScoreText, this.p1Score, '#00f0ff');
      this.showCelebrationBanner('POINT TO P1!', '#00f0ff');
      this.spawnGoalShockwave(this.scale.width - COURT_CONFIG.rightMargin, this.ball.y, theme.p1Color);
    } else {
      this.p2Score++;
      const scorerName = this.settings.mode === GameMode.TwoPlayer ? 'POINT TO P2!' : 'COMPUTER SCORES!';
      this.pulseScore(this.p2ScoreText, this.p2Score, '#ff3366');
      this.showCelebrationBanner(scorerName, '#ff3366');
      this.spawnGoalShockwave(COURT_CONFIG.leftMargin, this.ball.y, theme.p2Color);
    }

    // Check Match Win Condition
    if (this.settings.targetScore > 0) {
      if (this.p1Score >= this.settings.targetScore) {
        this.endMatch('PLAYER 1 WINS THE MATCH!');
        return;
      } else if (this.p2Score >= this.settings.targetScore) {
        const winner =
          this.settings.mode === GameMode.TwoPlayer ? 'PLAYER 2 WINS THE MATCH!' : 'COMPUTER WINS THE MATCH!';
        this.endMatch(winner);
        return;
      }
    }

    // Goal Pause and Serve Next Round
    this.time.delayedCall(1350, () => {
      this.resetRound(p1Scored);
    });
  }

  private pulseScore(scoreObj: Phaser.GameObjects.Text, scoreVal: number, highlightColor: string): void {
    const theme = GAME_THEMES[this.settings.theme] || GAME_THEMES[GameTheme.CyberNeon];
    scoreObj.setText(String(scoreVal));
    scoreObj.setColor(highlightColor);
    this.tweens.add({
      targets: scoreObj,
      scale: 1.35,
      duration: 180,
      yoyo: true,
      ease: Phaser.Math.Easing.Back.Out,
      onComplete: () => {
        scoreObj.setColor(theme.scoreColor);
      },
    });
  }

  private showCelebrationBanner(text: string, color: string): void {
    this.bannerText.setText(text);
    this.bannerText.setColor(color);
    this.bannerText.setAlpha(0);
    this.bannerText.setScale(0.8);

    this.tweens.add({
      targets: this.bannerText,
      alpha: 1,
      scale: 1.05,
      duration: 200,
      ease: Phaser.Math.Easing.Back.Out,
      onComplete: () => {
        this.tweens.add({
          targets: this.bannerText,
          alpha: 0,
          scale: 1.15,
          delay: 800,
          duration: 250,
          ease: Phaser.Math.Easing.Linear,
        });
      },
    });
  }

  private resetRound(p1JustScored: boolean): void {
    const width = this.scale.width;
    const height = this.scale.height;

    if (this.currentPowerUp) {
      this.currentPowerUp.destroy();
      this.currentPowerUp = undefined;
    }
    this.powerUpSpawnTimer = 8;
    this.lastMilestoneAnnounced = 0;

    this.paddleLeft.reset(height / 2);
    this.paddleRight.reset(height / 2);
    this.ball.x = width / 2;
    this.ball.y = height / 2;
    this.ball.stop();

    // Serve towards player who conceded
    this.prepareServe(!p1JustScored);
  }

  private prepareServe(towardsLeft: boolean): void {
    this.isGoalPausing = true;
    AudioManager.getInstance().playServeChime();

    // Subtle serve countdown pulse ring
    const ring = this.add.graphics();
    ring.setDepth(10);
    let radius = 40;

    this.tweens.addCounter({
      from: 40,
      to: 10,
      duration: 600,
      onUpdate: (tween) => {
        radius = tween.getValue() ?? 10;
        ring.clear();
        ring.lineStyle(2, 0x00f0ff, 0.8);
        ring.strokeCircle(this.scale.width / 2, this.scale.height / 2, radius);
      },
      onComplete: () => {
        ring.destroy();
        this.isGoalPausing = false;
        this.ball.serve(towardsLeft);
      },
    });
  }

  private endMatch(winnerMessage: string): void {
    this.isGoalPausing = true;
    if (this.currentPowerUp) {
      this.currentPowerUp.destroy();
      this.currentPowerUp = undefined;
    }

    AudioManager.getInstance().playWinFanfare();
    this.time.delayedCall(500, () => {
      this.gameOverModal.show(winnerMessage, this.p1Score, this.p2Score, this.maxRallyInMatch);
    });
  }

  private restartMatch(): void {
    this.p1Score = 0;
    this.p2Score = 0;
    this.p1ScoreText.setText('0');
    this.p2ScoreText.setText('0');
    this.rallyText.setText('RALLY: 0');
    this.maxRallyInMatch = 0;
    this.lastMilestoneAnnounced = 0;
    this.resetRound(true);
  }

  private spawnIceDrift(x: number, y: number, vy: number, color: number): void {
    if (Math.random() < 0.45) {
      this.sparkParticles.push({
        x: x + Phaser.Math.FloatBetween(-4, 4),
        y: y + Phaser.Math.FloatBetween(-30, 30),
        vx: Phaser.Math.FloatBetween(-25, 25),
        vy: -vy * 0.12 + Phaser.Math.FloatBetween(-15, 15),
        alpha: 0.55,
        size: Phaser.Math.FloatBetween(1.5, 3),
        color,
      });
    }
  }

  private spawnSparks(x: number, y: number, count: number, color: number): void {
    for (let i = 0; i < count; i++) {
      const angle = Phaser.Math.FloatBetween(0, Math.PI * 2);
      const speed = Phaser.Math.FloatBetween(80, 240);
      this.sparkParticles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1.0,
        size: Phaser.Math.FloatBetween(2, 4),
        color,
      });
    }
  }

  private spawnGoalShockwave(x: number, y: number, color: number): void {
    const shockwave = this.add.graphics();
    shockwave.setDepth(5);
    this.tweens.addCounter({
      from: 10,
      to: 160,
      duration: 450,
      ease: Phaser.Math.Easing.Cubic.Out,
      onUpdate: (tween) => {
        const rad = tween.getValue() ?? 10;
        const alpha = Math.max(0, 1 - rad / 160);
        shockwave.clear();
        shockwave.lineStyle(4, color, alpha);
        shockwave.strokeCircle(x, y, rad);
      },
      onComplete: () => {
        shockwave.destroy();
      },
    });
  }

  private updateSparks(dt: number): void {
    this.effectsGraphics.clear();

    for (const p of this.sparkParticles) {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.alpha -= dt * 3.0;

      this.effectsGraphics.fillStyle(p.color, Math.max(0, p.alpha));
      this.effectsGraphics.fillCircle(p.x, p.y, p.size);
    }

    this.sparkParticles = this.sparkParticles.filter((p) => p.alpha > 0.05);
  }
}
