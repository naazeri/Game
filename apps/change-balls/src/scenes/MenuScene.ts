import Phaser from 'phaser';
import { GameMode, COLORS } from '../config';
import { AudioManager } from '../audio/AudioManager';
import { AboutModal } from '../ui/AboutModal';
import { SettingsModal } from '../ui/SettingsModal';
import { StatsModal } from '../ui/StatsModal';
import { createCrispText } from '../ui/TextHelper';

export class MenuScene extends Phaser.Scene {
  private aboutModal!: AboutModal;
  private settingsModal!: SettingsModal;
  private statsModal!: StatsModal;

  private soundBtnText!: Phaser.GameObjects.Text;
  private musicBtnText!: Phaser.GameObjects.Text;

  constructor() {
    super('MenuScene');
  }

  create(): void {
    const width = this.scale.width;
    const height = this.scale.height;

    // Start Menu Music
    AudioManager.getInstance().playMenuMusic();

    // Background decoration: gentle floating ambient light particles
    this.createBackgroundEffects(width, height);

    // Yin-Yang Logo Emblem
    this.createLogoEmblem(width / 2, height / 2 - 170);

    // Title
    const title = createCrispText(this, width / 2, height / 2 - 80, 'CHANGE BALLS', {
      fontSize: '44px',
      color: '#ffffff',
      fontStyle: 'bold',
    });
    title.setOrigin(0.5);

    const subtitle = createCrispText(this, width / 2, height / 2 - 35, 'HARMONY OF MOTION', {
      fontSize: '15px',
      color: '#cbd5e1',
      letterSpacing: 4,
    });
    subtitle.setOrigin(0.5);

    // Menu Buttons
    const btnStartY = height / 2 + 30;
    const btnGap = 62;

    // 1 Player Button (Primary)
    this.createMenuButton(
      width / 2,
      btnStartY,
      '1 PLAYER',
      0x0284c7,
      0x38bdf8,
      () => this.startGame('onePlayer'),
      true
    );

    // 2 Players Button
    this.createMenuButton(
      width / 2,
      btnStartY + btnGap,
      '2 PLAYERS',
      0x1e293b,
      0x475569,
      () => this.startGame('twoPlayer')
    );

    // Settings Button
    this.createMenuButton(
      width / 2,
      btnStartY + btnGap * 2,
      'SETTINGS & SPEED',
      0x1e293b,
      0x475569,
      () => {
        AudioManager.getInstance().playClick();
        this.settingsModal.show();
      }
    );

    // Row with Statistics & About
    const btnRowY = btnStartY + btnGap * 3;
    this.createHalfButton(
      width / 2 - 110,
      btnRowY,
      'STATISTICS',
      () => {
        AudioManager.getInstance().playClick();
        this.statsModal.show();
      }
    );

    this.createHalfButton(
      width / 2 + 110,
      btnRowY,
      'ABOUT',
      () => {
        AudioManager.getInstance().playClick();
        this.aboutModal.show();
      }
    );

    // Top Action Bar (Mute Sound, Mute Music, Fullscreen)
    this.createTopActionBar();

    // Version label at bottom
    const versionText = createCrispText(this, width - 25, height - 20, 'v2.0.0', {
      fontSize: '14px',
      color: '#475569',
    });
    versionText.setOrigin(1, 1);

    // Modals
    this.aboutModal = new AboutModal(this);
    this.settingsModal = new SettingsModal(this);
    this.statsModal = new StatsModal(this);
  }

  private createLogoEmblem(x: number, y: number): void {
    const emblem = this.add.container(x, y);

    // 4 Atomic Orbit Axes (tilted at 0°, 45°, 90°, 135°)
    const angles = [0, 45, 90, 135];
    const orbitW = 144;
    const orbitH = 46;

    const orbitsContainer = this.add.container(0, 0);
    emblem.add(orbitsContainer);

    angles.forEach((deg, idx) => {
      const axisContainer = this.add.container(0, 0);
      axisContainer.setAngle(deg);

      const orbitGraphic = this.add.graphics();
      // Outer subtle silver glow
      orbitGraphic.lineStyle(2, COLORS.silverDark, 0.35);
      orbitGraphic.strokeEllipse(0, 0, orbitW + 2, orbitH + 2);

      // Main crisp metallic silver stroke
      orbitGraphic.lineStyle(1.5, COLORS.silverLight, 0.75);
      orbitGraphic.strokeEllipse(0, 0, orbitW, orbitH);

      axisContainer.add(orbitGraphic);

      // Electron particle orbiting on this ellipse
      const electron = this.add.graphics();
      electron.fillStyle(0xffffff, 0.95);
      electron.fillCircle(0, 0, 2.5);
      electron.lineStyle(1, COLORS.silverLight, 0.8);
      electron.strokeCircle(0, 0, 4);
      axisContainer.add(electron);

      // Animate electron along the ellipse perimeter
      const speed = 2600 + idx * 350;
      const offset = (idx * Math.PI) / 2;
      this.tweens.addCounter({
        from: 0,
        to: Math.PI * 2,
        duration: speed,
        repeat: -1,
        ease: Phaser.Math.Easing.Linear,
        onUpdate: (tween) => {
          const val = tween.getValue();
          const t = (val !== null ? val : 0) + offset;
          const ex = (orbitW / 2) * Math.cos(t);
          const ey = (orbitH / 2) * Math.sin(t);
          electron.setPosition(ex, ey);
        },
      });

      orbitsContainer.add(axisContainer);
    });

    // Slow overall rotation for the 4-axis atomic cage
    this.tweens.add({
      targets: orbitsContainer,
      rotation: Math.PI * 2,
      duration: 36000,
      repeat: -1,
      ease: Phaser.Math.Easing.Linear,
    });

    // Central Nucleus: Orbiting White & Black Balls
    const scale = 44 / 500;
    const whiteBall = this.add.sprite(0, -22, 'white_ball');
    whiteBall.setScale(scale);

    const blackBall = this.add.sprite(0, 22, 'black_ball');
    blackBall.setScale(scale);

    const nucleusContainer = this.add.container(0, 0, [whiteBall, blackBall]);
    emblem.add(nucleusContainer);

    this.tweens.add({
      targets: nucleusContainer,
      rotation: -Math.PI * 2,
      duration: 5000,
      repeat: -1,
      ease: Phaser.Math.Easing.Linear,
    });
  }

  private createBackgroundEffects(width: number, height: number): void {
    // Solid navy base + radial center glow
    const bg = this.add.graphics();
    bg.fillStyle(0x0c0f17, 1);
    bg.fillRect(0, 0, width, height);
    bg.fillStyle(0x161c2e, 0.85);
    bg.fillCircle(width / 2, height / 2, 400);

    for (let i = 0; i < 22; i++) {
      const px = Phaser.Math.Between(50, width - 50);
      const py = Phaser.Math.Between(50, height - 50);
      const radius = Phaser.Math.Between(1, 3);
      const alpha = Phaser.Math.FloatBetween(0.1, 0.35);

      const circle = this.add.graphics();
      circle.fillStyle(COLORS.silverMid, alpha);
      circle.fillCircle(px, py, radius);

      this.tweens.add({
        targets: circle,
        y: py + Phaser.Math.Between(-30, 30),
        alpha: Phaser.Math.FloatBetween(0.05, 0.45),
        duration: Phaser.Math.Between(3000, 7000),
        yoyo: true,
        repeat: -1,
        ease: Phaser.Math.Easing.Sine.InOut,
      });
    }
  }

  private createMenuButton(
    x: number,
    y: number,
    label: string,
    bgColor: number,
    borderColor: number,
    onClick: () => void,
    isPrimary: boolean = false
  ): Phaser.GameObjects.Container {
    const btn = this.add.container(x, y);
    const w = 400;
    const h = 52;

    const bg = this.add.graphics();
    const draw = (fill: number) => {
      bg.clear();
      bg.fillStyle(fill, 1);
      bg.fillRoundedRect(-w / 2, -h / 2, w, h, 14);
      bg.lineStyle(1.5, borderColor, 0.9);
      bg.strokeRoundedRect(-w / 2, -h / 2, w, h, 14);
    };

    draw(bgColor);

    const txt = createCrispText(this, 0, 0, label, {
      fontSize: isPrimary ? '20px' : '18px',
      color: '#ffffff',
      fontStyle: isPrimary ? 'bold' : 'normal',
    });
    txt.setOrigin(0.5);

    btn.add([bg, txt]);
    btn.setSize(w, h);
    btn.setInteractive({ useHandCursor: true });

    btn.on('pointerover', () => {
      draw(isPrimary ? 0x0369a1 : 0x334155);
      btn.setScale(1.03);
    });

    btn.on('pointerout', () => {
      draw(bgColor);
      btn.setScale(1.0);
    });

    btn.on('pointerdown', (e: Phaser.Input.Pointer) => {
      e.event.stopPropagation();
      onClick();
    });

    return btn;
  }

  private createHalfButton(
    x: number,
    y: number,
    label: string,
    onClick: () => void
  ): Phaser.GameObjects.Container {
    const btn = this.add.container(x, y);
    const w = 180;
    const h = 48;

    const bg = this.add.graphics();
    bg.fillStyle(0x1e293b, 1);
    bg.fillRoundedRect(-w / 2, -h / 2, w, h, 12);
    bg.lineStyle(1.5, 0x475569, 0.9);
    bg.strokeRoundedRect(-w / 2, -h / 2, w, h, 12);

    const txt = createCrispText(this, 0, 0, label, {
      fontSize: '15px',
      color: '#94a3b8',
    });
    txt.setOrigin(0.5);

    btn.add([bg, txt]);
    btn.setSize(w, h);
    btn.setInteractive({ useHandCursor: true });

    btn.on('pointerover', () => {
      btn.setScale(1.03);
      txt.setColor('#ffffff');
    });

    btn.on('pointerout', () => {
      btn.setScale(1.0);
      txt.setColor('#94a3b8');
    });

    btn.on('pointerdown', (e: Phaser.Input.Pointer) => {
      e.event.stopPropagation();
      onClick();
    });

    return btn;
  }

  private createTopActionBar(): void {
    const topY = 35;
    const rightMargin = this.scale.width - 35;

    // Fullscreen Icon
    this.createIconAction(rightMargin, topY, '⛶', () => {
      AudioManager.getInstance().playClick();
      this.toggleFullscreen();
    });

    // Sound Toggle Icon
    const soundBtn = this.createIconAction(rightMargin - 50, topY, '🔊', () => {
      const on = AudioManager.getInstance().toggleSound();
      AudioManager.getInstance().playClick();
      this.soundBtnText.setText(on ? '🔊' : '🔇');
    });
    this.soundBtnText = soundBtn.getByName('iconText') as Phaser.GameObjects.Text;
    this.soundBtnText.setText(AudioManager.getInstance().isSoundOn() ? '🔊' : '🔇');

    // Music Toggle Icon
    const musicBtn = this.createIconAction(rightMargin - 100, topY, '🎵', () => {
      AudioManager.getInstance().playClick();
      const on = AudioManager.getInstance().toggleMusic();
      this.musicBtnText.setText(on ? '🎵' : '🔇');
    });
    this.musicBtnText = musicBtn.getByName('iconText') as Phaser.GameObjects.Text;
    this.musicBtnText.setText(AudioManager.getInstance().isMusicOn() ? '🎵' : '🔇');
  }

  private createIconAction(
    x: number,
    y: number,
    symbol: string,
    onClick: () => void
  ): Phaser.GameObjects.Container {
    const btn = this.add.container(x, y);
    const size = 38;

    const bg = this.add.graphics();
    bg.fillStyle(0x1e293b, 0.8);
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

    btn.on('pointerover', () => btn.setScale(1.1));
    btn.on('pointerout', () => btn.setScale(1.0));
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

  private startGame(mode: GameMode): void {
    AudioManager.getInstance().playClick();
    this.scene.start('GameScene', { mode });
  }
}
