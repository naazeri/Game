import Phaser from 'phaser';
import {
  GAME_WIDTH,
  GAME_HEIGHT,
  CENTER_X,
  CENTER_Y,
  PLAYER_CONFIG,
  WeaponType,
  WEAPON_INFOS,
  PowerUpType,
  EnemyType,
  GameSettings,
  DEFAULT_SETTINGS,
  FONTS,
  COLORS,
} from '../config';
import { PlayerCore } from '../objects/PlayerCore';
import { Starfield } from '../objects/Starfield';
import { Projectile } from '../objects/Projectile';
import { Enemy } from '../objects/Enemy';
import { PowerUpCrystal } from '../objects/PowerUpCrystal';
import { AudioManager } from '../audio/AudioManager';
import { createCrispText } from '../ui/TextHelper';
import { GameOverModal } from '../ui/GameOverModal';
import { SettingsModal } from '../ui/SettingsModal';

interface SparkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: number;
  alpha: number;
  radius: number;
}

export class GameScene extends Phaser.Scene {
  private audio!: AudioManager;
  private starfield!: Starfield;
  private player!: PlayerCore;
  private projectiles: Projectile[] = [];
  private enemies: Enemy[] = [];
  private powerUps: PowerUpCrystal[] = [];
  private particles: SparkParticle[] = [];
  private particleGfx!: Phaser.GameObjects.Graphics;

  // Modals
  private gameOverModal!: GameOverModal;
  private settingsModal!: SettingsModal;

  // Game State
  private score = 0;
  private displayScore = 0;
  private bestScore = 0;
  private wave = 1;
  private enemiesSpawnedThisWave = 0;
  private enemiesToSpawnThisWave = 10;
  private enemiesEliminated = 0;
  private spawnTimer = 0;
  private spawnInterval = 1.4;
  private waveCompleteTimer = 0;
  private isWaveInProgress = true;
  private activeDreadnought: Enemy | null = null;

  // Combo system
  private combo = 0;
  private maxCombo = 0;
  private comboTimer = 0;
  private readonly comboMaxTime = 2.8;

  // Chrono freeze
  private chronoFreezeTimer = 0;

  // Weapons & Firing
  private lastFireTime = 0;
  private pointerDown = false;
  private aimTarget = { x: CENTER_X + 100, y: CENTER_Y };

  // Settings
  private settings: GameSettings = { ...DEFAULT_SETTINGS };

  // Status flags
  private isGameOver = false;
  private isPaused = false;

  // UI HUD Elements
  private hudContainer!: Phaser.GameObjects.Container;
  private scoreText!: Phaser.GameObjects.Text;
  private bestScoreText!: Phaser.GameObjects.Text;
  private waveText!: Phaser.GameObjects.Text;
  private comboBadgeContainer!: Phaser.GameObjects.Container;
  private comboMultiplierText!: Phaser.GameObjects.Text;
  private comboBarGfx!: Phaser.GameObjects.Graphics;
  private shieldsContainer!: Phaser.GameObjects.Container;
  private empContainer!: Phaser.GameObjects.Container;
  private weaponBadgeContainer!: Phaser.GameObjects.Container;
  private weaponNameText!: Phaser.GameObjects.Text;
  private weaponTimerText!: Phaser.GameObjects.Text;
  private bossBarContainer!: Phaser.GameObjects.Container;
  private bossBarFill!: Phaser.GameObjects.Graphics;
  private bossBarLabel!: Phaser.GameObjects.Text;
  private bannerText!: Phaser.GameObjects.Text;
  private bannerContainer!: Phaser.GameObjects.Container;
  private pauseOverlay!: Phaser.GameObjects.Container;
  private mobileEmpButton?: Phaser.GameObjects.Container;

  constructor() {
    super({ key: 'GameScene' });
  }

  public create(): void {
    this.cameras.main.fadeIn(300, 3, 6, 20);

    // Audio
    this.audio = AudioManager.getInstance(this);
    this.audio.playBgm();

    // Reset State
    this.score = 0;
    this.displayScore = 0;
    this.wave = 1;
    this.enemiesSpawnedThisWave = 0;
    this.enemiesToSpawnThisWave = 10;
    this.enemiesEliminated = 0;
    this.spawnTimer = 0;
    this.spawnInterval = 1.4;
    this.waveCompleteTimer = 0;
    this.isWaveInProgress = true;
    this.activeDreadnought = null;
    this.combo = 0;
    this.maxCombo = 0;
    this.comboTimer = 0;
    this.chronoFreezeTimer = 0;
    this.lastFireTime = 0;
    this.pointerDown = false;
    this.isGameOver = false;
    this.isPaused = false;
    this.projectiles = [];
    this.enemies = [];
    this.powerUps = [];
    this.particles = [];

    // Load persisted settings & best score
    this.loadSettings();
    this.bestScore = parseInt(localStorage.getItem('vega_best_score') || '0', 10);

    // Background Starfield
    this.starfield = new Starfield(this);

    // Particle graphics layer
    this.particleGfx = this.add.graphics().setDepth(22);

    // Player Core Turret
    this.player = new PlayerCore(this);

    // Build HUD & Overlays
    this.createHUD();
    this.createPauseOverlay();

    // Modals
    this.gameOverModal = new GameOverModal(
      this,
      this.audio,
      () => this.restartGame(),
      () => this.goToMenu()
    );
    this.settingsModal = new SettingsModal(this, this.settings, (newSettings) => {
      this.settings = newSettings;
    });

    // Inputs setup
    this.setupInputHandlers();

    // Announce Wave 1
    this.showWaveBanner(`SECTOR 1: FIRST CONTACT`, '#00f0ff');
  }

  private loadSettings(): void {
    const saved = localStorage.getItem('vega_settings');
    if (saved) {
      try {
        this.settings = { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
      } catch {
        this.settings = { ...DEFAULT_SETTINGS };
      }
    }
  }

  private setupInputHandlers(): void {
    // Mouse / Touch Aiming
    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      if (this.isPaused || this.isGameOver) return;
      this.aimTarget = { x: pointer.x, y: pointer.y };
      this.player.setAim(pointer.x, pointer.y);
    });

    // Pointer Down (Firing)
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      if (this.isPaused || this.isGameOver) return;
      if (this.gameOverModal.isVisible || this.settingsModal.isVisible) return;

      if (pointer.rightButtonDown()) {
        this.triggerEmpBomb();
        return;
      }

      this.pointerDown = true;
      this.aimTarget = { x: pointer.x, y: pointer.y };
      this.player.setAim(pointer.x, pointer.y);

      // Instant fire on tap/click
      this.tryFireBlaster();
    });

    this.input.on('pointerup', () => {
      this.pointerDown = false;
    });

    // Prevent context menu on right click for EMP bomb
    this.input.mouse?.disableContextMenu();

    // Keyboard Shortcuts
    this.input.keyboard?.on('keydown-SPACE', () => {
      if (!this.isPaused && !this.isGameOver) {
        this.triggerEmpBomb();
      }
    });

    this.input.keyboard?.on('keydown-ESC', () => {
      if (!this.isGameOver && !this.gameOverModal.isVisible && !this.settingsModal.isVisible) {
        this.togglePause();
      }
    });

    this.input.keyboard?.on('keydown-P', () => {
      if (!this.isGameOver && !this.gameOverModal.isVisible && !this.settingsModal.isVisible) {
        this.togglePause();
      }
    });
  }

  // ==========================================
  // HUD CREATION
  // ==========================================
  private createHUD(): void {
    this.hudContainer = this.add.container(0, 0).setDepth(50);

    // Top HUD Bar Header backing
    const headerBg = this.add.graphics();
    headerBg.fillStyle(0x030614, 0.75);
    headerBg.fillRect(0, 0, GAME_WIDTH, 48);
    headerBg.lineStyle(1, 0x1e293b, 0.8);
    headerBg.lineBetween(0, 48, GAME_WIDTH, 48);
    this.hudContainer.add(headerBg);

    // 1. TOP-LEFT: Score and Best Score
    const scoreBox = this.add.container(20, 10);
    this.scoreText = createCrispText(this, 0, 0, 'SCORE: 0', {
      fontFamily: FONTS.RETRO,
      fontSize: '18px',
      color: '#00f0ff',
      stroke: '#003344',
      strokeThickness: 2,
    });
    this.bestScoreText = createCrispText(this, 0, 22, `BEST: ${this.bestScore.toLocaleString()}`, {
      fontFamily: FONTS.RETRO,
      fontSize: '11px',
      color: '#ffdd00',
    });
    scoreBox.add([this.scoreText, this.bestScoreText]);
    this.hudContainer.add(scoreBox);

    // 2. TOP-CENTER: Wave Sector Display
    const waveBox = this.add.container(GAME_WIDTH / 2, 24);
    this.waveText = createCrispText(this, 0, 0, 'SECTOR 1', {
      fontFamily: FONTS.RETRO,
      fontSize: '18px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 3,
    }).setOrigin(0.5);
    waveBox.add(this.waveText);
    this.hudContainer.add(waveBox);

    // Boss Health Bar (Hidden until boss wave)
    this.bossBarContainer = this.add.container(GAME_WIDTH / 2, 60).setVisible(false);
    const bossBarBg = this.add.graphics();
    bossBarBg.fillStyle(0x070b14, 0.95);
    bossBarBg.fillRoundedRect(-150, -11, 300, 22, 6);
    bossBarBg.lineStyle(1.5, 0xef4444, 0.85);
    bossBarBg.strokeRoundedRect(-150, -11, 300, 22, 6);
    this.bossBarFill = this.add.graphics();
    this.bossBarLabel = createCrispText(this, 0, 0, 'DREADNOUGHT WARSHIP [100%]', {
      fontFamily: FONTS.RETRO,
      fontSize: '11px',
      color: '#ffffff',
    }).setOrigin(0.5);
    this.bossBarContainer.add([bossBarBg, this.bossBarFill, this.bossBarLabel]);
    this.hudContainer.add(this.bossBarContainer);

    // 3. TOP-RIGHT: Shields, EMP Bombs, Fullscreen, Pause, Settings
    const rightBox = this.add.container(GAME_WIDTH - 20, 24);

    // Shields display
    this.shieldsContainer = this.add.container(-255, 0);
    const shieldLabel = createCrispText(this, -55, 0, 'SHIELD', {
      fontFamily: FONTS.RETRO,
      fontSize: '11px',
      color: '#38bdf8',
    }).setOrigin(0, 0.5);
    this.shieldsContainer.add(shieldLabel);
    rightBox.add(this.shieldsContainer);

    // EMP Bombs display
    this.empContainer = this.add.container(-150, 0);
    const empLabel = createCrispText(this, -45, 0, 'EMP', {
      fontFamily: FONTS.RETRO,
      fontSize: '11px',
      color: '#ec4899',
    }).setOrigin(0, 0.5);
    this.empContainer.add(empLabel);
    rightBox.add(this.empContainer);

    // Fullscreen button
    const fsBtn = this.createHeaderButton(-66, 0, this.scale.isFullscreen ? '🗗' : '⛶', () => {
      if (this.scale.isFullscreen) {
        this.scale.stopFullscreen();
      } else {
        this.scale.startFullscreen();
      }
    });
    rightBox.add(fsBtn);

    const updateFsIcon = () => {
      const fsLabel = fsBtn.getByName('btn_label') as Phaser.GameObjects.Text;
      if (fsLabel) {
        fsLabel.setText(this.scale.isFullscreen ? '🗗' : '⛶');
      }
    };
    this.scale.on(Phaser.Scale.Events.ENTER_FULLSCREEN, updateFsIcon);
    this.scale.on(Phaser.Scale.Events.LEAVE_FULLSCREEN, updateFsIcon);
    this.events.once('shutdown', () => {
      this.scale.off(Phaser.Scale.Events.ENTER_FULLSCREEN, updateFsIcon);
      this.scale.off(Phaser.Scale.Events.LEAVE_FULLSCREEN, updateFsIcon);
    });

    // Pause button
    const pauseBtn = this.createHeaderButton(-33, 0, '⏸', () => this.togglePause());
    rightBox.add(pauseBtn);

    // Settings button
    const menuBtn = this.createHeaderButton(0, 0, '⚙', () => {
      this.isPaused = true;
      this.settingsModal.show();
    });
    rightBox.add(menuBtn);

    this.hudContainer.add(rightBox);

    // 4. COMBO BADGE GAUGE (Bottom-left)
    this.comboBadgeContainer = this.add.container(20, GAME_HEIGHT - 35).setVisible(false);
    const comboBg = this.add.graphics();
    comboBg.fillStyle(0x080f1e, 0.85);
    comboBg.fillRoundedRect(0, 0, 110, 28, 6);
    comboBg.lineStyle(1.5, 0xa855f7, 0.7);
    comboBg.strokeRoundedRect(0, 0, 110, 28, 6);

    this.comboMultiplierText = createCrispText(this, 12, 14, '1x COMBO', {
      fontFamily: FONTS.RETRO,
      fontSize: '12px',
      color: '#a855f7',
    }).setOrigin(0, 0.5);

    this.comboBarGfx = this.add.graphics();
    this.comboBadgeContainer.add([comboBg, this.comboBarGfx, this.comboMultiplierText]);
    this.hudContainer.add(this.comboBadgeContainer);

    // 5. CURRENT WEAPON BADGE (Bottom-center)
    const badgeW = 180;
    this.weaponBadgeContainer = this.add.container(GAME_WIDTH / 2 - badgeW / 2, GAME_HEIGHT - 36);
    const wBg = this.add.graphics();
    wBg.fillStyle(0x080f1e, 0.85);
    wBg.fillRoundedRect(0, 0, badgeW, 26, 6);
    wBg.lineStyle(1, 0x00f0ff, 0.6);
    wBg.strokeRoundedRect(0, 0, badgeW, 26, 6);

    this.weaponNameText = createCrispText(this, 12, 13, 'PLASMA BLASTER', {
      fontFamily: FONTS.RETRO,
      fontSize: '11px',
      color: '#00f0ff',
    }).setOrigin(0, 0.5);

    this.weaponTimerText = createCrispText(this, badgeW - 12, 13, '∞', {
      fontFamily: FONTS.RETRO,
      fontSize: '12px',
      color: '#ffffff',
    }).setOrigin(1, 0.5);

    this.weaponBadgeContainer.add([wBg, this.weaponNameText, this.weaponTimerText]);
    this.hudContainer.add(this.weaponBadgeContainer);

    // 6. CENTER BANNER NOTIFICATIONS
    this.bannerContainer = this.add.container(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 80).setDepth(60);
    this.bannerText = createCrispText(this, 0, 0, '', {
      fontFamily: FONTS.RETRO,
      fontSize: '26px',
      color: '#00f0ff',
      stroke: '#002233',
      strokeThickness: 4,
    }).setOrigin(0.5);
    this.bannerContainer.add(this.bannerText);
    this.bannerContainer.setAlpha(0);

    // 7. Touch EMP button for Mobile
    this.createMobileTouchControls();

    // Initial draws
    this.updateShieldsDisplay();
    this.updateEmpDisplay();
  }

  private createMobileTouchControls(): void {
    // Show only on touch devices or small screens
    const isTouch = !this.sys.game.device.os.desktop || this.sys.game.device.input.touch;
    if (!isTouch) return;

    this.mobileEmpButton = this.add.container(GAME_WIDTH - 65, GAME_HEIGHT - 65).setDepth(55);

    const btnBg = this.add.graphics();
    btnBg.fillStyle(0xec4899, 0.25);
    btnBg.fillCircle(0, 0, 42);
    btnBg.lineStyle(2.5, 0xec4899, 0.9);
    btnBg.strokeCircle(0, 0, 42);

    const bombIcon = createCrispText(this, 0, -8, '💣', {
      fontSize: '24px',
    }).setOrigin(0.5);

    const btnLabel = createCrispText(this, 0, 18, 'EMP NOVA', {
      fontFamily: FONTS.RETRO,
      fontSize: '9px',
      color: '#ff66b2',
    }).setOrigin(0.5);

    const hitArea = this.add.circle(0, 0, 46, 0x000000, 0).setInteractive({ useHandCursor: true });
    hitArea.on('pointerdown', (e: Phaser.Input.Pointer) => {
      e.event.stopPropagation();
      this.triggerEmpBomb();
    });

    this.mobileEmpButton.add([btnBg, bombIcon, btnLabel, hitArea]);
  }

  private createHeaderButton(
    x: number,
    y: number,
    text: string,
    onClick: () => void
  ): Phaser.GameObjects.Container {
    const btn = this.add.container(x, y);

    const bg = this.add.graphics();
    bg.fillStyle(0x0e172a, 0.8);
    bg.fillRoundedRect(-14, -14, 28, 28, 6);
    bg.lineStyle(1.2, 0x00f0ff, 0.6);
    bg.strokeRoundedRect(-14, -14, 28, 28, 6);
    btn.add(bg);

    const label = createCrispText(this, 0, 0, text, {
      fontFamily: 'sans-serif',
      fontSize: '14px',
      color: '#00f0ff',
    }).setOrigin(0.5).setName('btn_label');
    btn.add(label);

    const hit = this.add.rectangle(0, 0, 28, 28, 0, 0).setInteractive({ useHandCursor: true });
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
      bg.fillStyle(0x0e172a, 0.8);
      bg.fillRoundedRect(-14, -14, 28, 28, 6);
      bg.lineStyle(1.2, 0x00f0ff, 0.6);
      bg.strokeRoundedRect(-14, -14, 28, 28, 6);
    });

    hit.on('pointerdown', () => onClick());

    return btn;
  }

  private updateShieldsDisplay(): void {
    // Redraw shield pips
    const pipsGfx = this.shieldsContainer.getByName('pips') as Phaser.GameObjects.Graphics;
    if (pipsGfx) pipsGfx.destroy();

    const g = this.add.graphics().setName('pips');
    const startX = 5;
    for (let i = 0; i < PLAYER_CONFIG.maxShields; i++) {
      const active = i < this.player.shields;
      g.fillStyle(active ? 0x00f0ff : 0x1e293b, active ? 0.9 : 0.4);
      g.fillRoundedRect(startX + i * 14, -7, 10, 14, 3);
      g.lineStyle(1, active ? 0xffffff : 0x334155, 0.8);
      g.strokeRoundedRect(startX + i * 14, -7, 10, 14, 3);
    }
    this.shieldsContainer.add(g);
  }

  private updateEmpDisplay(): void {
    const pipsGfx = this.empContainer.getByName('emp_pips') as Phaser.GameObjects.Graphics;
    if (pipsGfx) pipsGfx.destroy();

    const g = this.add.graphics().setName('emp_pips');
    const startX = 5;
    for (let i = 0; i < PLAYER_CONFIG.maxEmpBombs; i++) {
      const active = i < this.player.empBombs;
      g.fillStyle(active ? 0xec4899 : 0x1e293b, active ? 0.9 : 0.4);
      g.fillCircle(startX + i * 15 + 6, 0, 5);
      g.lineStyle(1, active ? 0xffffff : 0x334155, 0.8);
      g.strokeCircle(startX + i * 15 + 6, 0, 5);
    }
    this.empContainer.add(g);
  }

  // ==========================================
  // PAUSE OVERLAY
  // ==========================================
  private createPauseOverlay(): void {
    this.pauseOverlay = this.add.container(0, 0).setDepth(80).setVisible(false);

    const overlay = this.add.rectangle(0, 0, GAME_WIDTH, GAME_HEIGHT, 0x030614, 0.85).setOrigin(0, 0);
    overlay.setInteractive();

    const pauseCard = this.add.container(GAME_WIDTH / 2, GAME_HEIGHT / 2);
    const bg = this.add.graphics();
    bg.fillStyle(0x0a1024, 0.95);
    bg.fillRoundedRect(-170, -120, 340, 240, 14);
    bg.lineStyle(2, 0x00f0ff, 0.8);
    bg.strokeRoundedRect(-170, -120, 340, 240, 14);
    pauseCard.add(bg);

    const title = createCrispText(this, 0, -75, 'TACTICAL PAUSE', {
      fontFamily: FONTS.RETRO,
      fontSize: '22px',
      color: '#00f0ff',
    }).setOrigin(0.5);
    pauseCard.add(title);

    // Resume button
    const resumeBtn = this.createDialogButton(0, -10, 240, 40, 'RESUME MISSION', 0x00f0ff, 0x0c2538, () => {
      this.togglePause();
    });
    pauseCard.add(resumeBtn);

    // Restart button
    const restartBtn = this.createDialogButton(0, 40, 240, 40, 'RESTART SECTOR', 0xfacc15, 0x2b2308, () => {
      this.togglePause();
      this.restartGame();
    });
    pauseCard.add(restartBtn);

    // Main Menu button
    const menuBtn = this.createDialogButton(0, 90, 240, 40, 'ABORT TO MENU', 0x94a3b8, 0x1e293b, () => {
      this.togglePause();
      this.goToMenu();
    });
    pauseCard.add(menuBtn);

    this.pauseOverlay.add([overlay, pauseCard]);
  }

  private createDialogButton(
    x: number,
    y: number,
    w: number,
    h: number,
    text: string,
    accent: number,
    bgClr: number,
    onClick: () => void
  ): Phaser.GameObjects.Container {
    const btn = this.add.container(x, y);

    const bg = this.add.graphics();
    bg.fillStyle(bgClr, 0.9);
    bg.fillRoundedRect(-w / 2, -h / 2, w, h, 6);
    bg.lineStyle(1.5, accent, 0.8);
    bg.strokeRoundedRect(-w / 2, -h / 2, w, h, 6);
    btn.add(bg);

    const hex = '#' + accent.toString(16).padStart(6, '0');
    const label = createCrispText(this, 0, 0, text, {
      fontFamily: FONTS.RETRO,
      fontSize: '13px',
      color: hex,
    }).setOrigin(0.5);
    btn.add(label);

    const hit = this.add.rectangle(0, 0, w, h, 0, 0).setInteractive({ useHandCursor: true });
    btn.add(hit);

    hit.on('pointerdown', () => onClick());
    return btn;
  }

  private togglePause(): void {
    this.isPaused = !this.isPaused;
    this.pauseOverlay.setVisible(this.isPaused);
  }

  // ==========================================
  // GAMEPLAY LOOP
  // ==========================================
  public update(time: number, delta: number): void {
    if (this.isPaused || this.isGameOver) return;

    const dt = delta / 1000;

    // Background starfield
    this.starfield.update(delta);

    // Chrono freeze countdown
    const slowFactor = this.chronoFreezeTimer > 0 ? 0.35 : 1.0;
    if (this.chronoFreezeTimer > 0) {
      this.chronoFreezeTimer -= dt;
    }

    // Player update
    this.player.update(dt, this.settings.aimLaser);

    // Continuous auto-firing while pointer is held down
    if (this.pointerDown && this.settings.autoFire) {
      if (time - this.lastFireTime > PLAYER_CONFIG.fireRate * 1000) {
        this.fireBlaster();
        this.lastFireTime = time;
      }
    }

    // Combo decay timer
    if (this.combo > 0) {
      this.comboTimer -= dt;
      if (this.comboTimer <= 0) {
        this.combo = 0;
        this.comboBadgeContainer.setVisible(false);
      } else {
        this.updateComboHUD();
      }
    }

    // Smooth rolling score
    if (this.displayScore < this.score) {
      this.displayScore = Math.min(this.score, Math.round(this.displayScore + (this.score - this.displayScore) * 0.15 + 2));
      this.scoreText.setText(`SCORE: ${this.displayScore.toLocaleString()}`);
    }

    // Update weapon badge display
    const curWep = WEAPON_INFOS[this.player.currentWeapon];
    this.weaponNameText.setText(curWep.name);
    this.weaponNameText.setColor('#' + curWep.color.toString(16).padStart(6, '0'));
    if (this.player.currentWeapon === WeaponType.Standard) {
      this.weaponTimerText.setText('∞');
    } else {
      this.weaponTimerText.setText(`${this.player.weaponTimer.toFixed(1)}s`);
    }

    // Update Projectiles
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i];
      p.update(dt, this.enemies);

      if (!p.active) {
        this.projectiles.splice(i, 1);
        continue;
      }

      // Check collision with PowerUps
      for (const powerUp of this.powerUps) {
        if (powerUp.active && powerUp.checkHit(p.x, p.y, p.radius)) {
          this.collectPowerUp(powerUp);
          p.penetrationsLeft--;
          if (p.penetrationsLeft <= 0) {
            p.active = false;
            p.destroy();
          }
          break;
        }
      }

      // Check collision with Enemies
      for (const enemy of this.enemies) {
        if (!enemy.active) continue;

        const hitDist = p.radius + enemy.radius;
        const dx = p.x - enemy.x;
        const dy = p.y - enemy.y;

        if (dx * dx + dy * dy <= hitDist * hitDist) {
          // Hit enemy
          const destroyed = enemy.takeDamage(p.damage);
          this.spawnHitSparks(p.x, p.y, p.color, 4);

          if (destroyed) {
            this.onEnemyDestroyed(enemy);
          } else {
            this.audio.play('enemyHit');
          }

          p.penetrationsLeft--;
          if (p.penetrationsLeft <= 0) {
            p.active = false;
            p.destroy();
            break;
          }
        }
      }
    }

    // Update Enemies & Check breach against player core
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const enemy = this.enemies[i];
      enemy.update(dt, slowFactor);

      if (!enemy.active) {
        this.enemies.splice(i, 1);
        continue;
      }

      // Check collision with player core
      const distToCore = Phaser.Math.Distance.Between(enemy.x, enemy.y, CENTER_X, CENTER_Y);
      const breachDist = this.player.radius + enemy.radius;

      if (distToCore <= breachDist) {
        // Player breach!
        this.onPlayerCoreBreached(enemy);
        enemy.destroy();
        this.enemies.splice(i, 1);
      }
    }

    // Update Dreadnought boss bar if active
    if (this.activeDreadnought && this.activeDreadnought.active) {
      this.bossBarContainer.setVisible(true);
      const hpRatio = Math.max(0, this.activeDreadnought.hp / this.activeDreadnought.maxHp);
      const hpPct = Math.round(hpRatio * 100);
      this.bossBarFill.clear();
      this.bossBarFill.fillStyle(0xef4444, 0.9);
      this.bossBarFill.fillRoundedRect(-148, -9, 296 * hpRatio, 18, 4);
      this.bossBarLabel.setText(`DREADNOUGHT WARSHIP [${hpPct}%]`);
    } else {
      this.bossBarContainer.setVisible(false);
      this.activeDreadnought = null;
    }

    // Update Particles
    this.updateParticles(dt);

    // Wave Spawning & Progression
    this.updateWaveLogic(dt);
  }

  // ==========================================
  // WEAPONS & SHOOTING
  // ==========================================
  private tryFireBlaster(): void {
    const now = this.time.now;
    if (now - this.lastFireTime > PLAYER_CONFIG.fireRate * 1000) {
      this.fireBlaster();
      this.lastFireTime = now;
    }
  }

  private fireBlaster(): void {
    this.player.triggerRecoil();
    this.audio.play('shoot');

    const angle = this.player.angleRad;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const perpCos = -sin;
    const perpSin = cos;
    const barrelLength = PLAYER_CONFIG.cannonLength;
    const spacing = 5;

    switch (this.player.currentWeapon) {
      case WeaponType.Triple: {
        // Center bolt + angled spread bolts
        const bx = CENTER_X + cos * barrelLength;
        const by = CENTER_Y + sin * barrelLength;
        this.projectiles.push(new Projectile(this, bx, by, angle, WeaponType.Triple));
        this.projectiles.push(new Projectile(this, bx, by, angle - 0.22, WeaponType.Triple));
        this.projectiles.push(new Projectile(this, bx, by, angle + 0.22, WeaponType.Triple));
        break;
      }

      case WeaponType.Railgun: {
        this.audio.playRailgunEffect();
        const bx = CENTER_X + cos * barrelLength;
        const by = CENTER_Y + sin * barrelLength;
        this.projectiles.push(new Projectile(this, bx, by, angle, WeaponType.Railgun));
        if (this.settings.screenShake) {
          this.cameras.main.shake(120, 0.006);
        }
        break;
      }

      case WeaponType.Homing: {
        this.audio.playMissileEffect();
        [-spacing * 1.5, spacing * 1.5].forEach((offset) => {
          const bx = CENTER_X + perpCos * offset + cos * barrelLength;
          const by = CENTER_Y + perpSin * offset + sin * barrelLength;
          this.projectiles.push(new Projectile(this, bx, by, angle, WeaponType.Homing));
        });
        break;
      }

      case WeaponType.Standard:
      default: {
        // Dual twin bolts
        [-spacing, spacing].forEach((offset) => {
          const bx = CENTER_X + perpCos * offset + cos * barrelLength;
          const by = CENTER_Y + perpSin * offset + sin * barrelLength;
          this.projectiles.push(new Projectile(this, bx, by, angle, WeaponType.Standard));
        });
        break;
      }
    }
  }

  // ==========================================
  // EMP NOVA BOMB
  // ==========================================
  public triggerEmpBomb(): void {
    if (this.player.empBombs <= 0 || this.isGameOver || this.isPaused) return;

    this.player.empBombs--;
    this.updateEmpDisplay();
    this.audio.playEmpEffect();

    if (this.settings.screenShake) {
      this.cameras.main.shake(350, 0.02);
    }

    this.showFloatingCombatText(CENTER_X, CENTER_Y - 50, 'EMP NOVA ACTIVATED!', '#ec4899', 18);

    // Expanding EMP Shockwave Ring
    const shockwave = this.add.graphics().setDepth(35);
    this.tweens.addCounter({
      from: 20,
      to: 550,
      duration: 500,
      ease: 'Quad.easeOut',
      onUpdate: (tween) => {
        const r = tween.getValue() ?? 20;
        const alpha = Math.max(0, 1 - r / 550);
        shockwave.clear();
        shockwave.lineStyle(4, 0xec4899, alpha);
        shockwave.strokeCircle(CENTER_X, CENTER_Y, r);
        shockwave.fillStyle(0x00f0ff, alpha * 0.15);
        shockwave.fillCircle(CENTER_X, CENTER_Y, r);
      },
      onComplete: () => shockwave.destroy(),
    });

    // Wipe or push back enemies
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const e = this.enemies[i];
      if (!e.active) continue;

      if (e.type === EnemyType.Cruiser || e.type === EnemyType.Dreadnought) {
        // Heavy armor: take substantial damage & knock back
        const killed = e.takeDamage(5);
        const ang = Phaser.Math.Angle.Between(CENTER_X, CENTER_Y, e.x, e.y);
        e.x += Math.cos(ang) * 140;
        e.y += Math.sin(ang) * 140;
        this.spawnHitSparks(e.x, e.y, 0xec4899, 14);

        if (killed) {
          this.onEnemyDestroyed(e);
        }
      } else {
        // Instant vaporize for light units
        this.spawnHitSparks(e.x, e.y, 0xec4899, 12);
        this.onEnemyDestroyed(e, true);
      }
    }
  }

  // ==========================================
  // ENEMY ELIMINATION & SCORING
  // ==========================================
  private onEnemyDestroyed(enemy: Enemy, isEmp = false): void {
    this.enemiesEliminated++;
    this.audio.play('enemyEliminated');

    // Spawn sparks
    this.spawnHitSparks(enemy.x, enemy.y, enemy.color, enemy.type === EnemyType.Dreadnought ? 36 : 12);

    // Screen shake on heavy kills
    if (this.settings.screenShake) {
      if (enemy.type === EnemyType.Dreadnought) {
        this.cameras.main.shake(350, 0.025);
      } else if (enemy.type === EnemyType.Cruiser) {
        this.cameras.main.shake(160, 0.008);
      }
    }

    // Splitter spawns fragments
    if (enemy.type === EnemyType.Splitter && !isEmp) {
      for (let i = 0; i < 2; i++) {
        const offsetAng = Phaser.Math.FloatBetween(0, Math.PI * 2);
        const fragX = enemy.x + Math.cos(offsetAng) * 15;
        const fragY = enemy.y + Math.sin(offsetAng) * 15;
        const frag = new Enemy(this, fragX, fragY, EnemyType.Asteroid, true, this.wave);
        this.enemies.push(frag);
      }
    }

    // Base score calculation
    let baseScore = 100;
    switch (enemy.type) {
      case EnemyType.Drone:
        baseScore = 150;
        break;
      case EnemyType.Cruiser:
        baseScore = 350;
        break;
      case EnemyType.Splitter:
        baseScore = 250;
        break;
      case EnemyType.Dreadnought:
        baseScore = 1500;
        break;
    }

    // Increment combo
    this.combo++;
    this.comboTimer = this.comboMaxTime;
    if (this.combo > this.maxCombo) this.maxCombo = this.combo;

    // Multiplier calculation (1x up to 5x max)
    const multiplier = Math.min(5, 1 + Math.floor(this.combo / 4));
    const earnedScore = baseScore * multiplier;
    this.score += earnedScore;

    // Floating combat text
    const textLabel = multiplier > 1 ? `+${earnedScore} (${multiplier}x)` : `+${earnedScore}`;
    this.showFloatingCombatText(enemy.x, enemy.y, textLabel, enemy.colorHex, 14);

    // Power-up Drop Chance
    let dropChance = 0.08;
    if (enemy.type === EnemyType.Cruiser) dropChance = 0.65;
    if (enemy.type === EnemyType.Dreadnought) dropChance = 1.0;

    if (Math.random() < dropChance) {
      this.spawnPowerUp(enemy.x, enemy.y);
    }
  }

  private updateComboHUD(): void {
    this.comboBadgeContainer.setVisible(true);
    const multiplier = Math.min(5, 1 + Math.floor(this.combo / 4));
    const label = multiplier >= 5 ? `MAX ${multiplier}x` : `${multiplier}x COMBO`;
    this.comboMultiplierText.setText(label);

    const ratio = Math.max(0, this.comboTimer / this.comboMaxTime);
    this.comboBarGfx.clear();
    this.comboBarGfx.fillStyle(multiplier >= 5 ? 0xff0055 : 0xa855f7, 0.9);
    this.comboBarGfx.fillRoundedRect(3, 22, 104 * ratio, 3, 1.5);
  }

  // ==========================================
  // POWER-UPS
  // ==========================================
  private spawnPowerUp(x: number, y: number, specificType?: PowerUpType): void {
    let type: PowerUpType;
    if (specificType) {
      type = specificType;
    } else {
      const roll = Math.random();
      const canShield = this.player.shields < PLAYER_CONFIG.maxShields;
      // ShieldHeal is rare (6%) and strictly impossible if player already has full shields
      if (canShield && roll < 0.06) {
        type = PowerUpType.ShieldHeal;
      } else if (roll < 0.31) {
        type = PowerUpType.Triple;
      } else if (roll < 0.54) {
        type = PowerUpType.Railgun;
      } else if (roll < 0.76) {
        type = PowerUpType.Homing;
      } else if (roll < 0.90) {
        type = PowerUpType.ChronoFreeze;
      } else {
        type = PowerUpType.EmpBomb;
      }
    }

    const crystal = new PowerUpCrystal(this, x, y, type);
    this.powerUps.push(crystal);
  }

  private collectPowerUp(powerUp: PowerUpCrystal): void {
    powerUp.shatter();
    this.audio.playPowerUpSound();

    let message = '';
    let colorHex = '#ffffff';

    switch (powerUp.type) {
      case PowerUpType.Triple:
        this.player.setWeapon(WeaponType.Triple);
        message = 'TRIPLE SPREAD ONLINE!';
        colorHex = '#facc15';
        break;

      case PowerUpType.Railgun:
        this.player.setWeapon(WeaponType.Railgun);
        message = 'PLASMA RAILGUN ENGAGED!';
        colorHex = '#ff007f';
        break;

      case PowerUpType.Homing:
        this.player.setWeapon(WeaponType.Homing);
        message = 'HOMING MISSILES ARMED!';
        colorHex = '#22c55e';
        break;

      case PowerUpType.ShieldHeal:
        if (this.player.addShield()) {
          message = 'SHIELD RESTORED +1';
        } else {
          message = 'SHIELDS AT MAXIMUM';
        }
        colorHex = '#38bdf8';
        this.updateShieldsDisplay();
        break;

      case PowerUpType.EmpBomb:
        this.player.addEmpBomb();
        message = 'EMP NOVA BOMB STORED!';
        colorHex = '#ec4899';
        this.updateEmpDisplay();
        break;

      case PowerUpType.ChronoFreeze:
        this.chronoFreezeTimer = 6.0;
        message = 'CHRONO FREEZE INITIATED!';
        colorHex = '#60a5fa';
        break;
    }

    this.showFloatingCombatText(powerUp.x, powerUp.y - 20, message, colorHex, 15);
  }

  // ==========================================
  // PLAYER CORE BREACH / DAMAGE
  // ==========================================
  private onPlayerCoreBreached(enemy: Enemy): void {
    if (this.player.isInvulnerable()) return;

    const absorbed = this.player.takeHit();
    this.updateShieldsDisplay();

    if (absorbed) {
      // Shield absorbed the hit
      this.audio.playShieldCrack();
      if (this.settings.screenShake) {
        this.cameras.main.shake(250, 0.018);
      }

      this.showFloatingCombatText(CENTER_X, CENTER_Y - 45, 'SHIELD CELL SHATTERED!', '#ff4444', 16);

      // Radial knockback wave repelling nearby threats
      for (const e of this.enemies) {
        const d = Phaser.Math.Distance.Between(CENTER_X, CENTER_Y, e.x, e.y);
        if (d < 240) {
          const ang = Phaser.Math.Angle.Between(CENTER_X, CENTER_Y, e.x, e.y);
          e.x += Math.cos(ang) * 110;
          e.y += Math.sin(ang) * 110;
        }
      }
    } else {
      // Lethal hit: Game Over
      this.triggerGameOver();
    }
  }

  private triggerGameOver(): void {
    this.isGameOver = true;
    this.audio.play('endGame');

    if (this.settings.screenShake) {
      this.cameras.main.shake(500, 0.035);
    }

    // Death explosion sparks
    this.spawnHitSparks(CENTER_X, CENTER_Y, 0xff0055, 60);

    this.time.delayedCall(700, () => {
      this.gameOverModal.show({
        score: this.score,
        wave: this.wave,
        eliminated: this.enemiesEliminated,
        maxCombo: this.maxCombo,
      });
    });
  }

  // ==========================================
  // WAVE PROGRESSION & SPAWNING
  // ==========================================
  private updateWaveLogic(dt: number): void {
    if (!this.isWaveInProgress) {
      this.waveCompleteTimer += dt;
      if (this.waveCompleteTimer > 2.5) {
        this.startNextWave();
      }
      return;
    }

    // Spawn regular enemies in wave
    if (this.enemiesSpawnedThisWave < this.enemiesToSpawnThisWave) {
      this.spawnTimer += dt;
      if (this.spawnTimer >= this.spawnInterval) {
        this.spawnTimer = 0;
        this.spawnWaveEnemy();
      }
    } else {
      // Check if all wave enemies are dead
      if (this.enemies.length === 0) {
        this.onWaveComplete();
      }
    }
  }

  private spawnWaveEnemy(): void {
    // Choose spawn location outside canvas edge
    const angle = Math.random() * Math.PI * 2;
    const spawnDist = 580;
    const x = CENTER_X + Math.cos(angle) * spawnDist;
    const y = CENTER_Y + Math.sin(angle) * spawnDist;

    // Pick enemy type based on current wave progression
    let type = EnemyType.Asteroid;
    const r = Math.random();

    if (this.wave === 1) {
      type = r < 0.3 ? EnemyType.Drone : EnemyType.Asteroid;
    } else if (this.wave === 2) {
      type = r < 0.4 ? EnemyType.Drone : EnemyType.Asteroid;
    } else if (this.wave === 3) {
      if (r < 0.3) type = EnemyType.Splitter;
      else if (r < 0.6) type = EnemyType.Drone;
      else type = EnemyType.Asteroid;
    } else if (this.wave === 4) {
      if (r < 0.2) type = EnemyType.Cruiser;
      else if (r < 0.5) type = EnemyType.Splitter;
      else if (r < 0.75) type = EnemyType.Drone;
      else type = EnemyType.Asteroid;
    } else {
      // Wave 5+
      if (r < 0.2) type = EnemyType.Cruiser;
      else if (r < 0.4) type = EnemyType.Splitter;
      else if (r < 0.7) type = EnemyType.Drone;
      else type = EnemyType.Asteroid;
    }

    const enemy = new Enemy(this, x, y, type, false, this.wave);
    this.enemies.push(enemy);
    this.enemiesSpawnedThisWave++;

    // Boss Dreadnought spawn on wave 5, 10, 15, etc.
    if (this.wave % 5 === 0 && !this.activeDreadnought && this.enemiesSpawnedThisWave === 1) {
      const bossAng = angle + Math.PI;
      const bx = CENTER_X + Math.cos(bossAng) * (spawnDist + 50);
      const by = CENTER_Y + Math.sin(bossAng) * (spawnDist + 50);
      const boss = new Enemy(this, bx, by, EnemyType.Dreadnought, false, this.wave);
      
      // Dreadnought launches counter-threats towards the core
      boss.onFireCounter = (bossX, bossY) => {
        if (!this.isGameOver && !this.isPaused) {
          this.audio.playMissileEffect();
          const frag = new Enemy(this, bossX, bossY, EnemyType.Drone, false, this.wave);
          this.enemies.push(frag);
          this.showFloatingCombatText(bossX, bossY - 24, 'COUNTER DRONE DEPLOYED!', '#ef4444', 12);
        }
      };

      this.enemies.push(boss);
      this.activeDreadnought = boss;
      this.showWaveBanner('WARNING: DREADNOUGHT WARSHIP!', '#ef4444');
    }
  }

  private onWaveComplete(): void {
    this.isWaveInProgress = false;
    this.waveCompleteTimer = 0;

    // Wave bonus score
    const waveBonus = this.wave * 250;
    this.score += waveBonus;
    this.showWaveBanner(`SECTOR ${this.wave} SECURED! +${waveBonus}`, '#22c55e');
  }

  private startNextWave(): void {
    this.wave++;
    this.waveText.setText(`SECTOR ${this.wave}`);
    this.enemiesSpawnedThisWave = 0;
    this.enemiesToSpawnThisWave = 10 + this.wave * 3;
    this.spawnInterval = Math.max(0.38, 1.25 - this.wave * 0.09);
    this.isWaveInProgress = true;

    // Spawn bonus offensive Weapon crystal each sector (NEVER free shield)
    const pAng = Math.random() * Math.PI * 2;
    const px = CENTER_X + Math.cos(pAng) * 220;
    const py = CENTER_Y + Math.sin(pAng) * 220;
    const offensiveGifts = [
      PowerUpType.Triple,
      PowerUpType.Railgun,
      PowerUpType.Homing,
      PowerUpType.ChronoFreeze,
    ];
    const waveGift = offensiveGifts[Phaser.Math.Between(0, offensiveGifts.length - 1)];
    this.spawnPowerUp(px, py, waveGift);

    this.showWaveBanner(`SECTOR ${this.wave}: ENEMY INCOMING`, '#00f0ff');
  }

  private showWaveBanner(text: string, colorHex: string): void {
    this.bannerText.setText(text);
    this.bannerText.setColor(colorHex);
    this.bannerContainer.setAlpha(0);
    this.bannerContainer.setScale(0.8);

    this.tweens.add({
      targets: this.bannerContainer,
      alpha: 1,
      scale: 1,
      duration: 300,
      ease: 'Back.easeOut',
      onComplete: () => {
        this.time.delayedCall(1600, () => {
          this.tweens.add({
            targets: this.bannerContainer,
            alpha: 0,
            scale: 0.9,
            duration: 300,
            ease: 'Power2',
          });
        });
      },
    });
  }

  private showFloatingCombatText(
    x: number,
    y: number,
    text: string,
    colorHex: string,
    fontSize = 13
  ): void {
    const floatText = createCrispText(this, x, y, text, {
      fontFamily: FONTS.RETRO,
      fontSize: `${fontSize}px`,
      color: colorHex,
      stroke: '#000000',
      strokeThickness: 3,
    }).setOrigin(0.5).setDepth(45);

    this.tweens.add({
      targets: floatText,
      y: y - 35,
      alpha: 0,
      duration: 900,
      ease: 'Quad.easeOut',
      onComplete: () => floatText.destroy(),
    });
  }

  // ==========================================
  // PARTICLES
  // ==========================================
  private spawnHitSparks(x: number, y: number, color: number, count: number): void {
    for (let i = 0; i < count; i++) {
      const ang = Math.random() * Math.PI * 2;
      const speed = 60 + Math.random() * 180;
      this.particles.push({
        x,
        y,
        vx: Math.cos(ang) * speed,
        vy: Math.sin(ang) * speed,
        color,
        alpha: 1,
        radius: 2 + Math.random() * 2.5,
      });
    }
  }

  private updateParticles(dt: number): void {
    this.particleGfx.clear();

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.alpha -= dt * 2.8;

      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      this.particleGfx.fillStyle(p.color, p.alpha);
      this.particleGfx.fillCircle(p.x, p.y, p.radius);
    }
  }

  // ==========================================
  // SCENE TRANSITIONS
  // ==========================================
  private restartGame(): void {
    this.cameras.main.fadeOut(250, 3, 6, 20);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.restart();
    });
  }

  private goToMenu(): void {
    this.cameras.main.fadeOut(250, 3, 6, 20);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start('MenuScene');
    });
  }
}
