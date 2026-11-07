import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT, FONTS, COLORS, DEFAULT_SETTINGS, GameSettings } from '../config';
import { AudioManager } from '../audio/AudioManager';
import { Starfield } from '../objects/Starfield';
import { createCrispText } from '../ui/TextHelper';
import { AboutModal } from '../ui/AboutModal';
import { HelpModal } from '../ui/HelpModal';
import { SettingsModal } from '../ui/SettingsModal';

interface AttractAsteroid {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  rotation: number;
  vRot: number;
  graphics: Phaser.GameObjects.Graphics;
}

export class MenuScene extends Phaser.Scene {
  private audio!: AudioManager;
  private starfield!: Starfield;
  private aboutModal!: AboutModal;
  private helpModal!: HelpModal;
  private settingsModal!: SettingsModal;

  // Attract mode turret & debris
  private turretAngle = 0;
  private turretGfx!: Phaser.GameObjects.Graphics;
  private attractAsteroids: AttractAsteroid[] = [];
  private attractBolts: Array<{ x: number; y: number; vx: number; vy: number; gfx: Phaser.GameObjects.Graphics }> = [];
  private attractShootTimer = 0;

  constructor() {
    super({ key: 'MenuScene' });
  }

  public create(): void {
    const cx = GAME_WIDTH / 2;
    const cy = GAME_HEIGHT / 2;

    this.cameras.main.fadeIn(400, 3, 6, 20);

    // Audio
    this.audio = AudioManager.getInstance(this);
    this.audio.playBgm();

    // Background starfield
    this.starfield = new Starfield(this);

    // Attract mode background graphics
    this.turretGfx = this.add.graphics().setDepth(2);
    this.spawnAttractAsteroids();

    // Title container
    const titleContainer = this.add.container(cx, 105).setDepth(10);

    const titleGlow = createCrispText(this, 0, 0, 'VEGA', {
      fontFamily: FONTS.RETRO,
      fontSize: '72px',
      color: '#00ffff',
      stroke: '#005577',
      strokeThickness: 8,
    }).setOrigin(0.5);

    const titleMain = createCrispText(this, 0, 0, 'VEGA', {
      fontFamily: FONTS.RETRO,
      fontSize: '72px',
      color: '#ffffff',
    }).setOrigin(0.5);

    const subtitle = createCrispText(this, 0, 48, '— ORBITAL DEFENSE —', {
      fontFamily: FONTS.RETRO,
      fontSize: '14px',
      color: '#7f9bc8',
      stroke: '#000000',
      strokeThickness: 2,
    }).setOrigin(0.5);

    titleContainer.add([titleGlow, titleMain, subtitle]);

    // Title breathing tween
    this.tweens.add({
      targets: titleGlow,
      alpha: { from: 0.6, to: 1 },
      scale: { from: 0.98, to: 1.02 },
      yoyo: true,
      repeat: -1,
      duration: 1800,
      ease: 'Sine.easeInOut',
    });

    // Best Score Display
    const bestScore = parseInt(localStorage.getItem('vega_best_score') || '0', 10);
    if (bestScore > 0) {
      createCrispText(this, cx, 180, `★ HIGH SCORE: ${bestScore.toLocaleString()} ★`, {
        fontFamily: FONTS.RETRO,
        fontSize: '13px',
        color: '#ffdd00',
        stroke: '#332200',
        strokeThickness: 2,
      }).setOrigin(0.5).setDepth(10);
    }

    // 2-Column Balanced Menu Buttons
    const btnW = 230;
    const btnH = 42;
    const colLeftX = -125;
    const colRightX = 125;
    const row1Y = 425;
    const row2Y = 485;

    const menuButtons = this.add.container(cx, 0).setDepth(10);

    // Left Column
    const startBtn = this.createMenuButton(colLeftX, row1Y, btnW, btnH + 4, 'START MISSION', 0x00ffff, 0x0a1a33, true, () => {
      this.startGame();
    });

    const helpBtn = this.createMenuButton(colLeftX, row2Y, btnW, btnH, 'HOW TO PLAY', 0x4a9eff, 0x0d152a, false, () => {
      this.audio.play('startGame');
      this.helpModal.show();
    });

    // Right Column
    const settingsBtn = this.createMenuButton(colRightX, row1Y, btnW, btnH + 4, 'SETTINGS', 0xa855f7, 0x160f2a, false, () => {
      this.audio.play('startGame');
      this.settingsModal.show();
    });

    const aboutBtn = this.createMenuButton(colRightX, row2Y, btnW, btnH, 'ABOUT & CREDITS', 0x64748b, 0x111726, false, () => {
      this.audio.play('startGame');
      this.aboutModal.show();
    });

    menuButtons.add([startBtn, helpBtn, settingsBtn, aboutBtn]);

    // Top Bar Utilities (Mute, Fullscreen)
    this.createTopBar();

    // Version label
    createCrispText(this, 16, GAME_HEIGHT - 16, 'VEGA v2.0.0 // TS + PHASER 3', {
      fontFamily: FONTS.RETRO,
      fontSize: '11px',
      color: '#3b4d6b',
    }).setOrigin(0, 1).setDepth(10);

    // Modals
    this.aboutModal = new AboutModal(this);
    this.helpModal = new HelpModal(this);
    const savedSettings = JSON.parse(localStorage.getItem('vega_settings') || '{}');
    const currentSettings: GameSettings = { ...DEFAULT_SETTINGS, ...savedSettings };
    this.settingsModal = new SettingsModal(this, currentSettings, (s) => {
      localStorage.setItem('vega_settings', JSON.stringify(s));
      this.audio.setSfxEnabled(s.sfxEnabled);
      this.audio.setMusicEnabled(s.musicEnabled);
    });

    // Keyboard shortcut: Space or Enter starts game
    this.input.keyboard?.on('keydown-SPACE', () => {
      if (!this.aboutModal.isVisible && !this.helpModal.isVisible && !this.settingsModal.isVisible) {
        this.startGame();
      }
    });
    this.input.keyboard?.on('keydown-ENTER', () => {
      if (!this.aboutModal.isVisible && !this.helpModal.isVisible && !this.settingsModal.isVisible) {
        this.startGame();
      }
    });
  }

  private createTopBar(): void {
    const bar = this.add.container(GAME_WIDTH - 24, 24).setDepth(20);

    // Sound toggle
    const soundBtn = this.add.container(-42, 0);
    const sGfx = this.add.graphics();
    this.drawIconBtn(sGfx, this.audio.isSoundMuted() ? 0x666666 : 0x00ffff);
    soundBtn.add(sGfx);

    const sLabel = createCrispText(this, 0, 0, this.audio.isSoundMuted() ? 'MUT' : 'SFX', {
      fontFamily: FONTS.RETRO,
      fontSize: '10px',
      color: this.audio.isSoundMuted() ? '#666666' : '#00ffff',
    }).setOrigin(0.5);
    soundBtn.add(sLabel);

    const sHit = this.add.rectangle(0, 0, 32, 32, 0, 0).setInteractive({ useHandCursor: true });
    soundBtn.add(sHit);
    sHit.on('pointerdown', () => {
      const isMuted = !this.audio.isSoundMuted();
      this.audio.setSoundMuted(isMuted);
      sGfx.clear();
      this.drawIconBtn(sGfx, isMuted ? 0x666666 : 0x00ffff);
      sLabel.setText(isMuted ? 'MUT' : 'SFX');
      sLabel.setColor(isMuted ? '#666666' : '#00ffff');
    });

    // Fullscreen toggle
    const fsBtn = this.add.container(0, 0);
    const fsGfx = this.add.graphics();
    this.drawIconBtn(fsGfx, 0x00ffff);
    fsBtn.add(fsGfx);

    const fsLabel = createCrispText(this, 0, 0, this.scale.isFullscreen ? '🗗' : '⛶', {
      fontFamily: 'sans-serif',
      fontSize: '15px',
      color: '#00ffff',
    }).setOrigin(0.5);
    fsBtn.add(fsLabel);

    const updateFsIcon = () => {
      fsLabel.setText(this.scale.isFullscreen ? '🗗' : '⛶');
    };

    this.scale.on(Phaser.Scale.Events.ENTER_FULLSCREEN, updateFsIcon);
    this.scale.on(Phaser.Scale.Events.LEAVE_FULLSCREEN, updateFsIcon);
    this.events.once('shutdown', () => {
      this.scale.off(Phaser.Scale.Events.ENTER_FULLSCREEN, updateFsIcon);
      this.scale.off(Phaser.Scale.Events.LEAVE_FULLSCREEN, updateFsIcon);
    });

    const fsHit = this.add.rectangle(0, 0, 32, 32, 0, 0).setInteractive({ useHandCursor: true });
    fsBtn.add(fsHit);
    fsHit.on('pointerdown', () => {
      if (this.scale.isFullscreen) {
        this.scale.stopFullscreen();
      } else {
        this.scale.startFullscreen();
      }
    });

    bar.add([soundBtn, fsBtn]);
  }

  private drawIconBtn(gfx: Phaser.GameObjects.Graphics, color: number): void {
    gfx.fillStyle(0x0a1024, 0.85);
    gfx.fillRoundedRect(-16, -16, 32, 32, 6);
    gfx.lineStyle(1.5, color, 0.7);
    gfx.strokeRoundedRect(-16, -16, 32, 32, 6);
  }

  private createMenuButton(
    x: number,
    y: number,
    w: number,
    h: number,
    text: string,
    accentColor: number,
    bgColor: number,
    primary = false,
    onClick: () => void
  ): Phaser.GameObjects.Container {
    const btn = this.add.container(x, y);

    const bg = this.add.graphics();
    bg.fillStyle(bgColor, 0.85);
    bg.fillRoundedRect(-w / 2, -h / 2, w, h, 8);
    bg.lineStyle(primary ? 2 : 1, accentColor, primary ? 0.9 : 0.6);
    bg.strokeRoundedRect(-w / 2, -h / 2, w, h, 8);
    btn.add(bg);

    const hexStr = '#' + accentColor.toString(16).padStart(6, '0');
    const label = createCrispText(this, 0, 0, text, {
      fontFamily: FONTS.RETRO,
      fontSize: primary ? '16px' : '13px',
      color: hexStr,
    }).setOrigin(0.5);
    btn.add(label);

    const hit = this.add.rectangle(0, 0, w, h, 0, 0).setInteractive({ useHandCursor: true });
    btn.add(hit);

    hit.on('pointerover', () => {
      this.tweens.add({ targets: btn, scale: 1.05, duration: 120, ease: 'Quad.easeOut' });
      bg.clear();
      bg.fillStyle(accentColor, 0.25);
      bg.fillRoundedRect(-w / 2, -h / 2, w, h, 8);
      bg.lineStyle(2, accentColor, 1);
      bg.strokeRoundedRect(-w / 2, -h / 2, w, h, 8);
    });

    hit.on('pointerout', () => {
      this.tweens.add({ targets: btn, scale: 1, duration: 120, ease: 'Quad.easeOut' });
      bg.clear();
      bg.fillStyle(bgColor, 0.85);
      bg.fillRoundedRect(-w / 2, -h / 2, w, h, 8);
      bg.lineStyle(primary ? 2 : 1, accentColor, primary ? 0.9 : 0.6);
      bg.strokeRoundedRect(-w / 2, -h / 2, w, h, 8);
    });

    hit.on('pointerdown', () => {
      onClick();
    });

    return btn;
  }

  private startGame(): void {
    this.audio.play('startGame');
    this.cameras.main.fadeOut(300, 3, 6, 20);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start('GameScene');
    });
  }

  // Attract background mode logic
  private spawnAttractAsteroids(): void {
    const cx = GAME_WIDTH / 2;
    const cy = 265;
    for (let i = 0; i < 6; i++) {
      const radius = 12 + Math.random() * 16;
      const angle = Math.random() * Math.PI * 2;
      const dist = 140 + Math.random() * 220;
      const x = cx + Math.cos(angle) * dist;
      const y = cy + Math.sin(angle) * dist;
      const speed = 15 + Math.random() * 25;
      const moveAngle = angle + Math.PI + (Math.random() - 0.5) * 0.8;

      const gfx = this.add.graphics().setDepth(2);
      this.attractAsteroids.push({
        x,
        y,
        vx: Math.cos(moveAngle) * speed,
        vy: Math.sin(moveAngle) * speed,
        radius,
        rotation: 0,
        vRot: (Math.random() - 0.5) * 1.5,
        graphics: gfx,
      });
    }
  }

  public update(_time: number, delta: number): void {
    const dt = delta / 1000;
    this.starfield.update(delta);

    // Rotate attract turret toward nearest asteroid
    const cx = GAME_WIDTH / 2;
    const cy = 265;

    let nearestAst: AttractAsteroid | null = null;
    let minDist = Infinity;

    for (const ast of this.attractAsteroids) {
      ast.x += ast.vx * dt;
      ast.y += ast.vy * dt;
      ast.rotation += ast.vRot * dt;

      // Wrap around bounds
      if (ast.x < -40) ast.x = GAME_WIDTH + 40;
      if (ast.x > GAME_WIDTH + 40) ast.x = -40;
      if (ast.y < -40) ast.y = GAME_HEIGHT + 40;
      if (ast.y > GAME_HEIGHT + 40) ast.y = -40;

      const d = Phaser.Math.Distance.Between(cx, cy, ast.x, ast.y);
      if (d < minDist && d > 60) {
        minDist = d;
        nearestAst = ast;
      }

      // Draw asteroid
      ast.graphics.clear();
      ast.graphics.fillStyle(0x718096, 0.4);
      ast.graphics.lineStyle(1.5, 0xa0aec0, 0.7);
      ast.graphics.beginPath();
      const points = 6;
      for (let p = 0; p < points; p++) {
        const a = ast.rotation + (p * Math.PI * 2) / points;
        const r = ast.radius * (0.8 + 0.2 * Math.sin(p * 2.5));
        const px = ast.x + Math.cos(a) * r;
        const py = ast.y + Math.sin(a) * r;
        if (p === 0) ast.graphics.moveTo(px, py);
        else ast.graphics.lineTo(px, py);
      }
      ast.graphics.closePath();
      ast.graphics.fillPath();
      ast.graphics.strokePath();
    }

    if (nearestAst) {
      const targetAngle = Phaser.Math.Angle.Between(cx, cy, nearestAst.x, nearestAst.y);
      this.turretAngle = Phaser.Math.Angle.RotateTo(this.turretAngle, targetAngle, 3 * dt);

      // Auto fire in attract mode
      this.attractShootTimer += dt;
      if (this.attractShootTimer > 1.2) {
        this.attractShootTimer = 0;
        const boltGfx = this.add.graphics().setDepth(3);
        const bSpeed = 380;
        this.attractBolts.push({
          x: cx + Math.cos(this.turretAngle) * 24,
          y: cy + Math.sin(this.turretAngle) * 24,
          vx: Math.cos(this.turretAngle) * bSpeed,
          vy: Math.sin(this.turretAngle) * bSpeed,
          gfx: boltGfx,
        });
      }
    } else {
      this.turretAngle += 0.5 * dt;
    }

    // Update attract bolts
    for (let i = this.attractBolts.length - 1; i >= 0; i--) {
      const b = this.attractBolts[i];
      b.x += b.vx * dt;
      b.y += b.vy * dt;

      b.gfx.clear();
      b.gfx.fillStyle(0x00ffff, 0.8);
      b.gfx.fillCircle(b.x, b.y, 3);
      b.gfx.lineStyle(1, 0xffffff, 0.9);
      b.gfx.strokeCircle(b.x, b.y, 4);

      if (b.x < 0 || b.x > GAME_WIDTH || b.y < 0 || b.y > GAME_HEIGHT) {
        b.gfx.destroy();
        this.attractBolts.splice(i, 1);
      }
    }

    // Draw central attract turret
    this.turretGfx.clear();
    this.turretGfx.fillStyle(0x0c1b38, 0.8);
    this.turretGfx.fillCircle(cx, cy, 20);
    this.turretGfx.lineStyle(1.5, 0x00ffff, 0.6);
    this.turretGfx.strokeCircle(cx, cy, 20);

    // Turret barrels
    const bLen = 22;
    const bSpread = 7;
    const perp = this.turretAngle + Math.PI / 2;
    const barrelL = {
      x: cx + Math.cos(perp) * bSpread,
      y: cy + Math.sin(perp) * bSpread,
    };
    const barrelR = {
      x: cx - Math.cos(perp) * bSpread,
      y: cy - Math.sin(perp) * bSpread,
    };

    this.turretGfx.lineStyle(3, 0x00ffff, 0.9);
    this.turretGfx.lineBetween(
      barrelL.x,
      barrelL.y,
      barrelL.x + Math.cos(this.turretAngle) * bLen,
      barrelL.y + Math.sin(this.turretAngle) * bLen
    );
    this.turretGfx.lineBetween(
      barrelR.x,
      barrelR.y,
      barrelR.x + Math.cos(this.turretAngle) * bLen,
      barrelR.y + Math.sin(this.turretAngle) * bLen
    );
  }
}
