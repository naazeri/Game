import Phaser from 'phaser';
import { AudioManager } from '../audio/AudioManager.js';
import { GameMode, MatchSettings, DEFAULT_SETTINGS } from '../config.js';
import { AboutModal } from '../ui/AboutModal.js';
import { HelpModal } from '../ui/HelpModal.js';
import { SettingsModal } from '../ui/SettingsModal.js';
import { createCrispText } from '../ui/TextHelper.js';

export class MenuScene extends Phaser.Scene {
  private aboutModal!: AboutModal;
  private helpModal!: HelpModal;
  private settingsModal!: SettingsModal;
  private currentSettings: MatchSettings = { ...DEFAULT_SETTINGS };

  // Demo paddles & ball for background attract mode
  private demoPaddle1Y: number = 300;
  private demoPaddle2Y: number = 300;
  private demoBallX: number = 480;
  private demoBallY: number = 300;
  private demoBallVx: number = 260;
  private demoBallVy: number = 180;
  private demoGraphics!: Phaser.GameObjects.Graphics;

  constructor() {
    super('MenuScene');
  }

  create(): void {
    const width = this.scale.width;
    const height = this.scale.height;

    // Load saved settings if any
    try {
      const saved = localStorage.getItem('ponge_settings');
      if (saved) {
        this.currentSettings = { ...this.currentSettings, ...JSON.parse(saved) };
      }
    } catch {
      // ignore
    }

    AudioManager.getInstance().setSfxEnabled(this.currentSettings.sfxEnabled);
    AudioManager.getInstance().setMusicEnabled(this.currentSettings.musicEnabled);
    AudioManager.getInstance().playMusic('menu');

    // 1. Dark Stadium Background
    const bg = this.add.graphics();
    bg.fillStyle(0x090c15, 1);
    bg.fillRect(0, 0, width, height);

    // Subtle center line
    bg.lineStyle(2, 0x182438, 0.6);
    for (let y = 30; y < height - 30; y += 24) {
      bg.lineBetween(width / 2, y, width / 2, y + 14);
    }

    // Demo attract-mode graphics in the background
    this.demoGraphics = this.add.graphics();

    // 2. Title & Subtitle
    const title = createCrispText(this, width / 2, 105, 'PONGE', {
      fontFamily: 'VCR_OSD_MONO',
      fontSize: '68px',
      color: '#00f0ff',
      fontStyle: 'bold',
    });
    title.setOrigin(0.5);

    // Subtle glow on title
    this.tweens.add({
      targets: title,
      alpha: 0.85,
      y: 108,
      duration: 1800,
      yoyo: true,
      repeat: -1,
      ease: Phaser.Math.Easing.Sine.InOut,
    });

    const subtitle = createCrispText(this, width / 2, 160, 'INERTIA & GLIDE', {
      fontFamily: 'VCR_OSD_MONO',
      fontSize: '18px',
      color: '#ff3366',
      letterSpacing: 6,
    });
    subtitle.setOrigin(0.5);

    // 3. Menu Buttons
    const btnStartY = 230;
    const btnSpacing = 58;

    // 1 Player Button
    this.createMenuButton(width / 2, btnStartY, '1 PLAYER (VS AI)', () => {
      this.startGame(GameMode.OnePlayer);
    }, true);

    // 2 Players Button
    this.createMenuButton(width / 2, btnStartY + btnSpacing, '2 PLAYERS (LOCAL)', () => {
      this.startGame(GameMode.TwoPlayer);
    }, false);

    // Settings Button
    this.createMenuButton(width / 2, btnStartY + btnSpacing * 2, 'SETTINGS', () => {
      AudioManager.getInstance().playClick();
      this.settingsModal.show();
    }, false);

    // Help Button
    this.createMenuButton(width / 2, btnStartY + btnSpacing * 3, 'HOW TO PLAY', () => {
      AudioManager.getInstance().playClick();
      this.helpModal.show();
    }, false);

    // About Button
    this.createMenuButton(width / 2, btnStartY + btnSpacing * 4, 'ABOUT & CREDITS', () => {
      AudioManager.getInstance().playClick();
      this.aboutModal.show();
    }, false);

    // 4. Modals
    this.aboutModal = new AboutModal(this);
    this.helpModal = new HelpModal(this);
    this.settingsModal = new SettingsModal(this, this.currentSettings, (updated) => {
      this.currentSettings = updated;
    });

    // 5. Top Bar Icons (Fullscreen & Sound)
    this.createTopControls();
  }

  update(_time: number, delta: number): void {
    const dt = delta / 1000;
    const width = this.scale.width;
    const height = this.scale.height;

    // Update demo attract animation
    this.demoBallX += this.demoBallVx * dt;
    this.demoBallY += this.demoBallVy * dt;

    if (this.demoBallY < 40) {
      this.demoBallY = 40;
      this.demoBallVy = Math.abs(this.demoBallVy);
    } else if (this.demoBallY > height - 40) {
      this.demoBallY = height - 40;
      this.demoBallVy = -Math.abs(this.demoBallVy);
    }

    // Demo paddle tracking
    this.demoPaddle1Y += (this.demoBallY - this.demoPaddle1Y) * dt * 3.5;
    this.demoPaddle2Y += (this.demoBallY - this.demoPaddle2Y) * dt * 3.0;

    if (this.demoBallX < 90) {
      this.demoBallX = 90;
      this.demoBallVx = Math.abs(this.demoBallVx);
    } else if (this.demoBallX > width - 90) {
      this.demoBallX = width - 90;
      this.demoBallVx = -Math.abs(this.demoBallVx);
    }

    // Render demo paddles
    this.demoGraphics.clear();

    // Left demo paddle (Cyan)
    this.demoGraphics.fillStyle(0x00f0ff, 0.22);
    this.demoGraphics.fillRoundedRect(60, this.demoPaddle1Y - 45, 18, 90, 9);

    // Right demo paddle (Rose)
    this.demoGraphics.fillStyle(0xff3366, 0.22);
    this.demoGraphics.fillRoundedRect(width - 78, this.demoPaddle2Y - 45, 18, 90, 9);

    // Demo ball
    this.demoGraphics.fillStyle(0xffffff, 0.35);
    this.demoGraphics.fillCircle(this.demoBallX, this.demoBallY, 7);
  }

  private createMenuButton(
    x: number,
    y: number,
    label: string,
    onClick: () => void,
    isPrimary: boolean = false
  ): Phaser.GameObjects.Container {
    const btn = this.add.container(x, y);
    const btnWidth = 340;
    const btnHeight = 46;

    const bg = this.add.graphics();
    const normalColor = isPrimary ? 0x008ba3 : 0x131a2c;
    const hoverColor = isPrimary ? 0x00a8c6 : 0x202b46;
    const borderColor = isPrimary ? 0x00f0ff : 0x2b3d60;

    const drawBg = (hover: boolean) => {
      bg.clear();
      bg.fillStyle(hover ? hoverColor : normalColor, 0.95);
      bg.fillRoundedRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, 10);
      bg.lineStyle(1.5, hover ? 0x00f0ff : borderColor, 0.9);
      bg.strokeRoundedRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, 10);
    };

    drawBg(false);

    const txt = createCrispText(this, 0, 0, label, {
      fontFamily: 'VCR_OSD_MONO',
      fontSize: '18px',
      color: isPrimary ? '#ffffff' : '#e0f7fc',
      fontStyle: isPrimary ? 'bold' : 'normal',
    });
    txt.setOrigin(0.5);

    btn.add([bg, txt]);
    btn.setSize(btnWidth, btnHeight);
    btn.setInteractive({ useHandCursor: true });

    btn.on('pointerover', () => {
      drawBg(true);
      btn.setScale(1.02);
    });

    btn.on('pointerout', () => {
      drawBg(false);
      btn.setScale(1.0);
    });

    btn.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      pointer.event.stopPropagation();
      onClick();
    });

    return btn;
  }

  private createTopControls(): void {
    const width = this.scale.width;

    // Fullscreen toggle
    const fsBtn = this.add.container(width - 45, 35);
    const fsBg = this.add.graphics();
    fsBg.fillStyle(0x131a2c, 0.85);
    fsBg.fillRoundedRect(-20, -20, 40, 40, 8);
    fsBg.lineStyle(1, 0x00f0ff, 0.6);
    fsBg.strokeRoundedRect(-20, -20, 40, 40, 8);

    const fsIcon = createCrispText(this, 0, 0, '⛶', { fontSize: '20px', color: '#00f0ff' });
    fsIcon.setOrigin(0.5);
    fsBtn.add([fsBg, fsIcon]);
    fsBtn.setSize(40, 40);
    fsBtn.setInteractive({ useHandCursor: true });
    fsBtn.on('pointerdown', () => {
      AudioManager.getInstance().playClick();
      if (this.scale.isFullscreen) {
        this.scale.stopFullscreen();
      } else {
        this.scale.startFullscreen();
      }
    });

    // Sound toggle
    const sndBtn = this.add.container(width - 95, 35);
    const sndBg = this.add.graphics();
    sndBg.fillStyle(0x131a2c, 0.85);
    sndBg.fillRoundedRect(-20, -20, 40, 40, 8);
    sndBg.lineStyle(1, 0x00f0ff, 0.6);
    sndBg.strokeRoundedRect(-20, -20, 40, 40, 8);

    const sndIcon = createCrispText(this, 0, 0, this.currentSettings.sfxEnabled ? '🔊' : '🔇', { fontSize: '18px' });
    sndIcon.setOrigin(0.5);
    sndBtn.add([sndBg, sndIcon]);
    sndBtn.setSize(40, 40);
    sndBtn.setInteractive({ useHandCursor: true });
    sndBtn.on('pointerdown', () => {
      this.currentSettings.sfxEnabled = !this.currentSettings.sfxEnabled;
      AudioManager.getInstance().setSfxEnabled(this.currentSettings.sfxEnabled);
      AudioManager.getInstance().playClick();
      sndIcon.setText(this.currentSettings.sfxEnabled ? '🔊' : '🔇');
      try {
        localStorage.setItem('ponge_settings', JSON.stringify(this.currentSettings));
      } catch {
        // ignore
      }
    });
  }

  private startGame(mode: GameMode): void {
    AudioManager.getInstance().playClick();
    this.currentSettings.mode = mode;
    this.scene.start('GameScene', this.currentSettings);
  }
}
