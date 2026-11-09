import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT, FONTS, COLORS } from '../config.js';
import { AudioManager } from '../audio/AudioManager.js';
import { createCrispText } from '../ui/TextHelper.js';
import { HelpModal, AudioSettingsModal, AboutModal } from '../ui/Modals.js';

interface AttractBlock {
  x: number;
  y: number;
  w: number;
  h: number;
  color: number;
  active: boolean;
}

export class MenuScene extends Phaser.Scene {
  private audio!: AudioManager;
  private helpModal!: HelpModal;
  private audioModal!: AudioSettingsModal;
  private aboutModal!: AboutModal;

  // Attract mode background elements
  private attractPaddleX = GAME_WIDTH / 2;
  private attractBall = {
    x: GAME_WIDTH / 2,
    y: 310,
    vx: 180,
    vy: -220,
    radius: 6,
  };
  private attractBlocks: AttractBlock[] = [];
  private attractGfx!: Phaser.GameObjects.Graphics;
  private gridGfx!: Phaser.GameObjects.Graphics;

  private soundBtnLabel!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'MenuScene' });
  }

  public create(): void {
    const cx = GAME_WIDTH / 2;

    this.cameras.main.fadeIn(350, 5, 7, 14);

    // Audio
    this.audio = AudioManager.getInstance(this);
    this.audio.playBgm();

    // Background Grid
    this.gridGfx = this.add.graphics().setDepth(1);
    this.drawCyberGrid();

    // Attract mode autonomous demo
    this.attractGfx = this.add.graphics().setDepth(5);
    this.initAttractDemo();

    // Top Header / Title
    const titleContainer = this.add.container(cx, 105).setDepth(15);

    const titleGlow = createCrispText(this, 0, 0, 'BLOCK BREAKER', {
      fontFamily: FONTS.RETRO,
      fontSize: '56px',
      color: '#00f0ff',
      stroke: '#003344',
      strokeThickness: 8,
    }).setOrigin(0.5);

    const titleMain = createCrispText(this, 0, 0, 'BLOCK BREAKER', {
      fontFamily: FONTS.RETRO,
      fontSize: '56px',
      color: '#ffffff',
    }).setOrigin(0.5);

    const subtitle = createCrispText(this, 0, 46, '— CYBER MATRIX ARCADE —', {
      fontFamily: FONTS.RETRO,
      fontSize: '14px',
      color: '#7f9bc8',
      stroke: '#000000',
      strokeThickness: 2,
    }).setOrigin(0.5);

    titleContainer.add([titleGlow, titleMain, subtitle]);

    // Title breathing glow tween
    this.tweens.add({
      targets: titleGlow,
      alpha: { from: 0.5, to: 1.0 },
      scale: { from: 0.98, to: 1.02 },
      duration: 1800,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    // High Score Badge
    const bestScore = parseInt(localStorage.getItem('blockbreaker_best_score') || '0', 10);
    if (bestScore > 0) {
      createCrispText(this, cx, 185, `★ HIGH SCORE: ${bestScore.toLocaleString()} ★`, {
        fontFamily: FONTS.RETRO,
        fontSize: '13px',
        color: '#facc15',
        stroke: '#422006',
        strokeThickness: 2.5,
      })
        .setOrigin(0.5)
        .setDepth(15);
    }

    // 2-Column Balanced Menu Buttons
    const btnW = 210;
    const btnH = 42;
    const colLeftX = cx - 118;
    const colRightX = cx + 118;
    const row1Y = 445;
    const row2Y = 502;

    const menuContainer = this.add.container(0, 0).setDepth(20);

    // 1. START MISSION (Highlighted primary)
    const startBtn = this.createMenuButton(
      colLeftX,
      row1Y,
      btnW,
      btnH,
      'START MISSION ▶',
      0x00f0ff,
      0x042f2e,
      true,
      () => this.startGame()
    );

    // 2. HOW TO PLAY (Cyan)
    const helpBtn = this.createMenuButton(
      colLeftX,
      row2Y,
      btnW,
      btnH,
      'HOW TO PLAY',
      0x38bdf8,
      0x082f49,
      false,
      () => this.helpModal.show()
    );

    // 3. AUDIO CONTROLS (Purple)
    const audioBtn = this.createMenuButton(
      colRightX,
      row1Y,
      btnW,
      btnH,
      'AUDIO SETTINGS',
      0xa855f7,
      0x3b0764,
      false,
      () => this.audioModal.show()
    );

    // 4. ABOUT & CREDITS (Slate)
    const aboutBtn = this.createMenuButton(
      colRightX,
      row2Y,
      btnW,
      btnH,
      'ABOUT & CREDITS',
      0x94a3b8,
      0x1e293b,
      false,
      () => this.aboutModal.show()
    );

    menuContainer.add([startBtn, helpBtn, audioBtn, aboutBtn]);

    // Top Right Controls (Sound, Fullscreen)
    this.createTopControls();

    // Footer
    this.createFooter();

    // Modals
    this.helpModal = new HelpModal(this, () => this.helpModal.hide());
    this.audioModal = new AudioSettingsModal(this, () => this.audioModal.hide());
    this.aboutModal = new AboutModal(this, () => this.aboutModal.hide());

    // Keyboard controls
    this.input.keyboard?.on('keydown-SPACE', () => {
      if (!this.isAnyModalOpen()) this.startGame();
    });
    this.input.keyboard?.on('keydown-ENTER', () => {
      if (!this.isAnyModalOpen()) this.startGame();
    });
    this.input.keyboard?.on('keydown-H', () => {
      if (!this.isAnyModalOpen()) this.helpModal.show();
    });
  }

  private isAnyModalOpen(): boolean {
    return this.helpModal.isVisible || this.audioModal.isVisible || this.aboutModal.isVisible;
  }

  private startGame(): void {
    this.audio.playPaddleHit(0);
    this.cameras.main.fadeOut(300, 5, 7, 14);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start('GameScene');
    });
  }

  private createMenuButton(
    x: number,
    y: number,
    w: number,
    h: number,
    text: string,
    strokeColor: number,
    bgColor: number,
    isPrimary: boolean,
    onClick: () => void
  ): Phaser.GameObjects.Container {
    const btn = this.add.container(x, y);

    const bg = this.add.graphics();
    bg.fillStyle(bgColor, 0.9);
    bg.fillRoundedRect(-w / 2, -h / 2, w, h, 6);
    bg.lineStyle(isPrimary ? 2 : 1.5, strokeColor, 0.9);
    bg.strokeRoundedRect(-w / 2, -h / 2, w, h, 6);
    btn.add(bg);

    const label = createCrispText(this, 0, 0, text, {
      fontFamily: FONTS.RETRO,
      fontSize: isPrimary ? '14px' : '12px',
      color: isPrimary ? '#00f0ff' : '#ffffff',
      stroke: isPrimary ? '#003344' : undefined,
      strokeThickness: isPrimary ? 2 : 0,
    }).setOrigin(0.5);
    btn.add(label);

    const hit = this.add.rectangle(0, 0, w, h, 0, 0).setInteractive({ useHandCursor: true });
    btn.add(hit);

    hit.on('pointerover', () => {
      bg.clear();
      bg.fillStyle(strokeColor, 0.28);
      bg.fillRoundedRect(-w / 2, -h / 2, w, h, 6);
      bg.lineStyle(2, strokeColor, 1);
      bg.strokeRoundedRect(-w / 2, -h / 2, w, h, 6);
      label.setColor('#ffffff');
    });

    hit.on('pointerout', () => {
      bg.clear();
      bg.fillStyle(bgColor, 0.9);
      bg.fillRoundedRect(-w / 2, -h / 2, w, h, 6);
      bg.lineStyle(isPrimary ? 2 : 1.5, strokeColor, 0.9);
      bg.strokeRoundedRect(-w / 2, -h / 2, w, h, 6);
      label.setColor(isPrimary ? '#00f0ff' : '#ffffff');
    });

    hit.on('pointerdown', (e: Phaser.Input.Pointer) => {
      e.event?.stopPropagation();
      onClick();
    });

    return btn;
  }

  private createTopControls(): void {
    const topBar = this.add.container(GAME_WIDTH - 24, 24).setDepth(25);

    // Sound button
    const soundBtn = this.add.container(-42, 0);
    const sGfx = this.add.graphics();
    this.drawIconBox(sGfx, 0x00f0ff);
    soundBtn.add(sGfx);

    const isMuted = this.audio.getSettings().sfxMuted;
    this.soundBtnLabel = createCrispText(this, 0, 0, isMuted ? '🔇' : '🔊', {
      fontSize: '14px',
    }).setOrigin(0.5);
    soundBtn.add(this.soundBtnLabel);

    const sHit = this.add.rectangle(0, 0, 30, 30, 0, 0).setInteractive({ useHandCursor: true });
    sHit.on('pointerdown', () => {
      const cur = this.audio.getSettings().sfxMuted;
      this.audio.updateSettings({ sfxMuted: !cur, musicMuted: !cur });
      this.soundBtnLabel.setText(!cur ? '🔇' : '🔊');
    });
    soundBtn.add(sHit);

    // Fullscreen button
    const fsBtn = this.add.container(0, 0);
    const fsGfx = this.add.graphics();
    this.drawIconBox(fsGfx, 0x00f0ff);
    fsBtn.add(fsGfx);

    const fsLabel = createCrispText(this, 0, 0, this.scale.isFullscreen ? '🗗' : '⛶', {
      fontSize: '15px',
      color: '#00f0ff',
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

    const fsHit = this.add.rectangle(0, 0, 30, 30, 0, 0).setInteractive({ useHandCursor: true });
    fsHit.on('pointerdown', () => {
      if (this.scale.isFullscreen) {
        this.scale.stopFullscreen();
      } else {
        const container = document.getElementById('game-container') || document.body;
        if (container && container.requestFullscreen) {
          container.requestFullscreen().catch(() => this.scale.startFullscreen());
        } else {
          this.scale.startFullscreen();
        }
      }
    });
    fsBtn.add(fsHit);

    topBar.add([soundBtn, fsBtn]);
  }

  private drawIconBox(gfx: Phaser.GameObjects.Graphics, color: number): void {
    gfx.fillStyle(0x0e172a, 0.85);
    gfx.fillRoundedRect(-15, -15, 30, 30, 6);
    gfx.lineStyle(1.2, color, 0.7);
    gfx.strokeRoundedRect(-15, -15, 30, 30, 6);
  }

  private createFooter(): void {
    // Left: Version tag
    createCrispText(this, 18, GAME_HEIGHT - 16, 'BLOCK BREAKER v2.0 // TS + PHASER 3', {
      fontFamily: FONTS.RETRO,
      fontSize: '11px',
      color: '#475569',
    })
      .setOrigin(0, 1)
      .setDepth(20);

    // Right: Developer link
    const devLink = createCrispText(this, GAME_WIDTH - 18, GAME_HEIGHT - 16, 'Reza Nazeri // nazeriland.ir ↗', {
      fontFamily: FONTS.RETRO,
      fontSize: '11px',
      color: '#38bdf8',
    })
      .setOrigin(1, 1)
      .setDepth(20)
      .setInteractive({ useHandCursor: true });

    devLink.on('pointerover', () => devLink.setColor('#ffffff'));
    devLink.on('pointerout', () => devLink.setColor('#38bdf8'));
    devLink.on('pointerdown', () => window.open('https://nazeriland.ir', '_blank'));
  }

  private drawCyberGrid(): void {
    this.gridGfx.clear();

    // Dark gradient background base
    this.gridGfx.fillStyle(COLORS.bgDark, 1);
    this.gridGfx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // Perspective lines
    this.gridGfx.lineStyle(1, 0x1e293b, 0.4);
    for (let x = 0; x <= GAME_WIDTH; x += 40) {
      this.gridGfx.lineBetween(x, 0, x, GAME_HEIGHT);
    }
    for (let y = 0; y <= GAME_HEIGHT; y += 40) {
      this.gridGfx.lineBetween(0, y, GAME_WIDTH, y);
    }

    // Glowing border frame
    this.gridGfx.lineStyle(1.5, 0x00f0ff, 0.25);
    this.gridGfx.strokeRect(18, 18, GAME_WIDTH - 36, GAME_HEIGHT - 36);
  }

  // ==========================================
  // ATTRACT-MODE AUTONOMOUS DEMO
  // ==========================================
  private initAttractDemo(): void {
    this.attractBlocks = [];
    const colors = [0x10b981, 0x06b6d4, 0xd946ef, 0xfacc15];

    // Create 2 rows of 8 small dummy blocks in upper middle
    const startX = 148;
    const startY = 205;
    const bw = 58;
    const bh = 16;
    const gap = 8;

    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 8; c++) {
        this.attractBlocks.push({
          x: startX + c * (bw + gap),
          y: startY + r * (bh + gap),
          w: bw,
          h: bh,
          color: colors[(r * 8 + c) % colors.length],
          active: true,
        });
      }
    }
  }

  public override update(_time: number, delta: number): void {
    const dt = delta / 1000;
    this.updateAttractDemo(dt);
  }

  private updateAttractDemo(dt: number): void {
    const ball = this.attractBall;

    // Ball movement
    ball.x += ball.vx * dt;
    ball.y += ball.vy * dt;

    // Walls
    if (ball.x <= 40) {
      ball.x = 40;
      ball.vx = Math.abs(ball.vx);
    } else if (ball.x >= GAME_WIDTH - 40) {
      ball.x = GAME_WIDTH - 40;
      ball.vx = -Math.abs(ball.vx);
    }

    if (ball.y <= 60) {
      ball.y = 60;
      ball.vy = Math.abs(ball.vy);
    }

    // Autonomous Paddle tracking
    const targetPaddleX = ball.x;
    this.attractPaddleX += (targetPaddleX - this.attractPaddleX) * Math.min(1, dt * 6);

    // Paddle bounce
    const paddleY = 365;
    const paddleW = 86;
    if (ball.y >= paddleY - 10 && ball.y <= paddleY + 8 && ball.vy > 0) {
      if (Math.abs(ball.x - this.attractPaddleX) < paddleW / 2 + 10) {
        ball.vy = -Math.abs(ball.vy);
        const offset = (ball.x - this.attractPaddleX) / (paddleW / 2);
        ball.vx = offset * 220;
      }
    }

    // Bottom out reset
    if (ball.y > 395) {
      ball.x = GAME_WIDTH / 2;
      ball.y = 300;
      ball.vy = -200;
      ball.vx = (Math.random() - 0.5) * 200;
      // Respawn any destroyed dummy blocks
      this.attractBlocks.forEach((b) => (b.active = true));
    }

    // Dummy block collision
    for (const b of this.attractBlocks) {
      if (!b.active) continue;
      if (
        ball.x + ball.radius >= b.x &&
        ball.x - ball.radius <= b.x + b.w &&
        ball.y + ball.radius >= b.y &&
        ball.y - ball.radius <= b.y + b.h
      ) {
        b.active = false;
        ball.vy = -ball.vy;
        break;
      }
    }

    // Draw attract mode graphics
    this.attractGfx.clear();

    // 1. Draw blocks
    for (const b of this.attractBlocks) {
      if (!b.active) continue;
      this.attractGfx.fillStyle(b.color, 0.4);
      this.attractGfx.fillRoundedRect(b.x, b.y, b.w, b.h, 3);
      this.attractGfx.lineStyle(1, b.color, 0.7);
      this.attractGfx.strokeRoundedRect(b.x, b.y, b.w, b.h, 3);
    }

    // 2. Draw paddle
    const pw = paddleW;
    const ph = 10;
    this.attractGfx.fillStyle(0x0e172a, 0.85);
    this.attractGfx.fillRoundedRect(this.attractPaddleX - pw / 2, paddleY, pw, ph, 4);
    this.attractGfx.lineStyle(1.5, 0x00f0ff, 0.75);
    this.attractGfx.strokeRoundedRect(this.attractPaddleX - pw / 2, paddleY, pw, ph, 4);

    // 3. Draw ball
    this.attractGfx.fillStyle(0x00f0ff, 0.35);
    this.attractGfx.fillCircle(ball.x, ball.y, ball.radius + 3);
    this.attractGfx.fillStyle(0xffffff, 0.95);
    this.attractGfx.fillCircle(ball.x, ball.y, ball.radius);
  }
}
