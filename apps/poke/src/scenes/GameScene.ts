import Phaser from 'phaser';
import { DEVELOPER_INFO } from '@games/shared';
import { GAME_CONFIG } from '../config';

interface DogMob extends Phaser.Physics.Arcade.Sprite {
  vx: number;
  vy: number;
}

export class GameScene extends Phaser.Scene {
  // Game State
  private state: 'MENU' | 'COUNTDOWN' | 'PLAYING' | 'GAME_OVER' | 'ABOUT' = 'MENU';
  private score = 0;
  private bestScore = 0;

  // Background Ambient Glows
  private glow1!: Phaser.GameObjects.Image;
  private glow2!: Phaser.GameObjects.Image;
  private glow3!: Phaser.GameObjects.Image;
  private colorIndex = 0;
  private readonly PALETTES = [
    { c1: 0x6366f1, c2: 0xec4899, c3: 0x06b6d4 },
    { c1: 0x10b981, c2: 0x3b82f6, c3: 0x8b5cf6 },
    { c1: 0xf59e0b, c2: 0xef4444, c3: 0x6366f1 },
    { c1: 0x06b6d4, c2: 0x8b5cf6, c3: 0xec4899 },
    { c1: 0x3b82f6, c2: 0x10b981, c3: 0xf59e0b },
  ];

  // Game Objects
  private player!: Phaser.Physics.Arcade.Sprite;
  private mobs: DogMob[] = [];
  private mobSpawnTimer?: Phaser.Time.TimerEvent;
  private scoreTimer?: Phaser.Time.TimerEvent;
  private colorTimer?: Phaser.Time.TimerEvent;

  // UI Elements
  private titleText!: Phaser.GameObjects.Text;
  private messageText!: Phaser.GameObjects.Text;
  private scoreLabel!: Phaser.GameObjects.Text;
  private recordLabel!: Phaser.GameObjects.Text;
  private startBtn!: Phaser.GameObjects.Container;
  private aboutBtn!: Phaser.GameObjects.Container;
  private exitBtn!: Phaser.GameObjects.Text;
  private fullscreenBtn!: Phaser.GameObjects.Container;
  private muteBtn!: Phaser.GameObjects.Container;

  // About Modal
  private aboutContainer!: Phaser.GameObjects.Container;

  // Input & Movement State
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private keyW!: Phaser.Input.Keyboard.Key;
  private keyA!: Phaser.Input.Keyboard.Key;
  private keyS!: Phaser.Input.Keyboard.Key;
  private keyD!: Phaser.Input.Keyboard.Key;
  private isTouchDragging = false;
  private lastTouchX = 0;
  private lastTouchY = 0;
  private prevPlayerX = 0;
  private prevPlayerY = 0;
  private newMobMaxSpeed = GAME_CONFIG.MOB_SPEED_MAX;

  constructor() {
    super('GameScene');
  }

  create(): void {
    this.state = 'MENU';
    this.score = 0;
    this.mobs = [];

    // Load Highscore
    const saved = localStorage.getItem(GAME_CONFIG.STORAGE_KEY_HIGHSCORE);
    this.bestScore = saved ? parseInt(saved, 10) : 0;

    // Load Mute setting
    const isMuted = localStorage.getItem(GAME_CONFIG.STORAGE_KEY_MUTED) === 'true';
    this.sound.mute = isMuted;

    // 1. Ambient Dynamic Glow Background
    this.createAmbientGlows();

    // 2. Player (scale 2.0 matching Godot Vector2(2, 2))
    this.player = this.physics.add.sprite(
      GAME_CONFIG.PLAYER_START_X,
      GAME_CONFIG.PLAYER_START_Y,
      'hamtaro-1'
    )
      .setScale(GAME_CONFIG.PLAYER_SCALE)
      .setDepth(20);
    this.player.setVisible(false);

    // 3. UI Construction
    this.createHUD();
    this.createAboutModal();
    this.createGlobalControls();

    // 4. Input Configuration
    this.setupInput();

    // 5. Ambient Color Cycle Timer (every 10s)
    this.colorTimer = this.time.addEvent({
      delay: 10000,
      callback: () => this.cycleAmbientColors(),
      loop: true,
    });

    // 6. Shutdown cleanup
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.sound.stopByKey('bgm');
      if (this.mobSpawnTimer) this.mobSpawnTimer.destroy();
      if (this.scoreTimer) this.scoreTimer.destroy();
      if (this.colorTimer) this.colorTimer.destroy();
    });

    this.showMenu();
  }

  update(_time: number, delta: number): void {
    if (this.state !== 'PLAYING') return;

    const dt = delta / 1000;
    this.handleKeyboardMovement(dt);
    this.updateMobs(dt);
    this.checkCollisions();

    this.prevPlayerX = this.player.x;
    this.prevPlayerY = this.player.y;
  }

  // --- AMBIENT GLOW SYSTEM ---
  private createAmbientGlows(): void {
    const current = this.PALETTES[0];

    // Background 1 (top-left)
    this.glow1 = this.add.image(-160, -166, 'white-glow')
      .setScale(7)
      .setOrigin(0.5)
      .setTint(current.c1)
      .setAlpha(0.65)
      .setDepth(1);

    // Background 2 (bottom-center)
    this.glow2 = this.add.image(385, 834, 'white-glow')
      .setScale(7)
      .setOrigin(0.5)
      .setTint(current.c2)
      .setAlpha(0.65)
      .setDepth(1);

    // Background 3 (top-right)
    this.glow3 = this.add.image(1495, -132, 'white-glow')
      .setScale(7)
      .setOrigin(0.5)
      .setTint(current.c3)
      .setAlpha(0.65)
      .setDepth(1);
  }

  private cycleAmbientColors(): void {
    this.colorIndex = (this.colorIndex + 1) % this.PALETTES.length;
    const target = this.PALETTES[this.colorIndex];

    const tweenTint = (img: Phaser.GameObjects.Image, targetColor: number): void => {
      const fromColor = Phaser.Display.Color.IntegerToColor(img.tintTopLeft);
      const toColor = Phaser.Display.Color.IntegerToColor(targetColor);

      this.tweens.addCounter({
        from: 0,
        to: 100,
        duration: 3500,
        ease: 'Sine.easeInOut',
        onUpdate: (tw) => {
          const val = (tw?.getValue() ?? 0) / 100;
          const r = Math.round(fromColor.red + (toColor.red - fromColor.red) * val);
          const g = Math.round(fromColor.green + (toColor.green - fromColor.green) * val);
          const b = Math.round(fromColor.blue + (toColor.blue - fromColor.blue) * val);
          img.setTint(Phaser.Display.Color.GetColor(r, g, b));
        },
      });
    };

    tweenTint(this.glow1, target.c1);
    tweenTint(this.glow2, target.c2);
    tweenTint(this.glow3, target.c3);
  }

  // --- UI & HUD CREATION ---
  private createHUD(): void {
    const { width, height } = this.scale;

    // Title (Poke)
    this.titleText = this.add.text(width / 2, height * 0.38, 'Poke', {
      fontFamily: GAME_CONFIG.FONT_FAMILY,
      fontSize: '84px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 6,
    }).setOrigin(0.5).setDepth(50);

    // Dynamic message (Get ready..., Pooffff, Nice Job)
    this.messageText = this.add.text(width / 2, height * 0.40, '', {
      fontFamily: GAME_CONFIG.FONT_FAMILY,
      fontSize: '64px',
      color: '#facc15',
      stroke: '#000000',
      strokeThickness: 5,
    }).setOrigin(0.5).setDepth(50).setVisible(false);

    // Live Score Top Center
    this.scoreLabel = this.add.text(width / 2, 45, 'Score:   0', {
      fontFamily: GAME_CONFIG.FONT_FAMILY,
      fontSize: '38px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 4,
    }).setOrigin(0.5).setDepth(50).setVisible(false);

    // Live Record Top Right
    this.recordLabel = this.add.text(width - 40, 45, `Record: ${this.bestScore}`, {
      fontFamily: GAME_CONFIG.FONT_FAMILY,
      fontSize: '28px',
      color: '#a5f3fc',
      stroke: '#000000',
      strokeThickness: 4,
    }).setOrigin(1, 0.5).setDepth(50);

    // Buttons
    this.startBtn = this.createButton(width / 2, height * 0.56, 'Start', () => this.startCountdown());
    this.aboutBtn = this.createButton(width / 2, height * 0.68, 'About', () => this.showAbout());

    // Version Text
    this.add.text(width - 25, height - 36, `v${GAME_CONFIG.VERSION}`, {
      fontFamily: GAME_CONFIG.FONT_FAMILY,
      fontSize: '20px',
      color: '#94a3b8',
    }).setOrigin(1, 0.5).setDepth(50);
  }

  private createButton(x: number, y: number, text: string, onClick: () => void): Phaser.GameObjects.Container {
    const container = this.add.container(x, y).setDepth(50);

    const bg = this.add.rectangle(0, 0, 200, 56, 0x000000, 0.5)
      .setStrokeStyle(2, 0xffffff, 0.8)
      .setInteractive({ useHandCursor: true });

    const label = this.add.text(0, 0, text, {
      fontFamily: GAME_CONFIG.FONT_FAMILY,
      fontSize: '28px',
      color: '#ffffff',
    }).setOrigin(0.5);

    bg.on('pointerover', () => {
      this.input.setDefaultCursor('url(assets/images/cursor_pointer.png) 7 1, pointer');
      bg.setFillStyle(0xffffff, 0.2);
      label.setColor('#facc15');
      this.tweens.add({ targets: container, scale: 1.05, duration: 80 });
    });

    bg.on('pointerout', () => {
      this.input.setDefaultCursor('url(assets/images/cursor.png) 0 0, default');
      bg.setFillStyle(0x000000, 0.5);
      label.setColor('#ffffff');
      this.tweens.add({ targets: container, scale: 1.0, duration: 80 });
    });

    bg.on('pointerdown', (p: Phaser.Input.Pointer) => {
      p.event.stopPropagation();
      this.sound.play('ui_click', { volume: 0.5 });
      onClick();
    });

    container.add([bg, label]);
    return container;
  }

  private createAboutModal(): void {
    const { width, height } = this.scale;
    this.aboutContainer = this.add.container(width / 2, height / 2).setDepth(100).setVisible(false);

    // Backdrop
    const backdrop = this.add.rectangle(0, 0, width, height, 0x000000, 0.75)
      .setInteractive();

    // Modal Card
    const card = this.add.rectangle(0, 0, 680, 420, 0x0f172a, 0.95)
      .setStrokeStyle(3, 0x38bdf8, 0.9);

    const title = this.add.text(0, -140, 'About Poke', {
      fontFamily: GAME_CONFIG.FONT_FAMILY,
      fontSize: '44px',
      color: '#facc15',
    }).setOrigin(0.5);

    const dev = this.add.text(0, -60, `Developer: ${DEVELOPER_INFO.name}`, {
      fontFamily: GAME_CONFIG.FONT_FAMILY,
      fontSize: '30px',
      color: '#ffffff',
    }).setOrigin(0.5);

    const webLink = this.add.text(0, 10, `Website: ${DEVELOPER_INFO.websiteDisplay}`, {
      fontFamily: GAME_CONFIG.FONT_FAMILY,
      fontSize: '28px',
      color: '#38bdf8',
    })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    webLink.on('pointerover', () => webLink.setColor('#93c5fd'));
    webLink.on('pointerout', () => webLink.setColor('#38bdf8'));
    webLink.on('pointerdown', () => {
      this.sound.play('ui_click', { volume: 0.5 });
      window.open(DEVELOPER_INFO.websiteUrl, '_blank');
    });

    const ver = this.add.text(0, 75, `Enhanced Remake v${GAME_CONFIG.VERSION}`, {
      fontFamily: GAME_CONFIG.FONT_FAMILY,
      fontSize: '22px',
      color: '#94a3b8',
    }).setOrigin(0.5);

    const closeBtn = this.createButton(0, 150, 'Back', () => this.hideAbout());

    this.aboutContainer.add([backdrop, card, title, dev, webLink, ver, closeBtn]);
  }

  private showAbout(): void {
    this.state = 'ABOUT';
    this.startBtn.setVisible(false);
    this.aboutBtn.setVisible(false);
    this.titleText.setVisible(false);
    this.aboutContainer.setVisible(true);
  }

  private hideAbout(): void {
    this.aboutContainer.setVisible(false);
    this.showMenu();
  }

  private createGlobalControls(): void {
    const { width, height } = this.scale;

    // Fullscreen (bottom-left)
    this.fullscreenBtn = this.add.container(38, height - 36).setDepth(100);
    const fsBg = this.add.circle(0, 0, 20, 0x000000, 0.45).setInteractive({ useHandCursor: true });
    const fsIcon = this.add.graphics();
    const drawFsIcon = (isFs: boolean): void => {
      fsIcon.clear();
      fsIcon.lineStyle(2, 0xffffff, 1);
      const s = 9;
      if (!isFs) fsIcon.strokeRect(-s, -s, s * 2, s * 2);
      else fsIcon.strokeRect(-s / 2, -s / 2, s, s);
    };
    drawFsIcon(this.scale.isFullscreen);

    fsBg.on('pointerdown', (p: Phaser.Input.Pointer) => {
      p.event.stopPropagation();
      this.sound.play('ui_click', { volume: 0.4 });
      if (this.scale.isFullscreen) {
        this.scale.stopFullscreen();
        drawFsIcon(false);
      } else {
        this.scale.startFullscreen();
        drawFsIcon(true);
      }
    });
    this.fullscreenBtn.add([fsBg, fsIcon]);

    // Mute (bottom-left x: 86)
    this.muteBtn = this.add.container(86, height - 36).setDepth(100);
    const muteBg = this.add.circle(0, 0, 20, 0x000000, 0.45).setInteractive({ useHandCursor: true });
    const muteIcon = this.add.graphics();
    const drawMuteIcon = (muted: boolean): void => {
      muteIcon.clear();
      muteIcon.lineStyle(2, 0xffffff, 1);
      muteIcon.fillStyle(0xffffff, 1);
      muteIcon.fillRect(-8, -4, 4, 8);
      muteIcon.beginPath();
      muteIcon.moveTo(-4, -4);
      muteIcon.lineTo(1, -9);
      muteIcon.lineTo(1, 9);
      muteIcon.lineTo(-4, 4);
      muteIcon.closePath();
      muteIcon.fillPath();

      if (!muted) {
        muteIcon.beginPath();
        muteIcon.arc(1, 0, 5, -Math.PI / 4, Math.PI / 4, false);
        muteIcon.strokePath();
        muteIcon.beginPath();
        muteIcon.arc(1, 0, 9, -Math.PI / 4, Math.PI / 4, false);
        muteIcon.strokePath();
      } else {
        muteIcon.lineStyle(2, 0xef4444, 1);
        muteIcon.lineBetween(-7, -7, 7, 7);
      }
    };
    drawMuteIcon(this.sound.mute);

    muteBg.on('pointerdown', (p: Phaser.Input.Pointer) => {
      p.event.stopPropagation();
      this.sound.mute = !this.sound.mute;
      localStorage.setItem(GAME_CONFIG.STORAGE_KEY_MUTED, this.sound.mute ? 'true' : 'false');
      drawMuteIcon(this.sound.mute);
    });
    this.muteBtn.add([muteBg, muteIcon]);

    // Exit Button (bottom-center)
    this.exitBtn = this.add.text(width / 2, height - 36, 'Exit', {
      fontFamily: GAME_CONFIG.FONT_FAMILY,
      fontSize: '22px',
      color: '#ffffff',
      backgroundColor: '#00000066',
      padding: { x: 16, y: 6 },
    })
      .setOrigin(0.5)
      .setDepth(100)
      .setInteractive({ useHandCursor: true });

    this.exitBtn.on('pointerover', () => this.exitBtn.setColor('#facc15'));
    this.exitBtn.on('pointerout', () => this.exitBtn.setColor('#ffffff'));
    this.exitBtn.on('pointerdown', () => {
      window.location.href = '../';
    });
  }

  // --- INPUT CONTROLS ---
  private setupInput(): void {
    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
      this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
      this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
      this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
      this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    // Touch down: start relative drag
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      if (pointer.wasTouch) {
        this.isTouchDragging = true;
        this.lastTouchX = pointer.x;
        this.lastTouchY = pointer.y;
      }
    });

    // Touch up
    this.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {
      if (pointer.wasTouch) {
        this.isTouchDragging = false;
      }
    });

    // Pointer move (Mouse direct cursor follow OR Touch relative dragging)
    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      if (this.state !== 'PLAYING' && this.state !== 'COUNTDOWN') return;

      const { width, height } = this.scale;
      const margin = 20;

      if (pointer.wasTouch) {
        // MOBILE TOUCH: Relative drag anywhere on screen (hamster doesn't jump to finger)
        if (!this.isTouchDragging) return;
        const dx = pointer.x - this.lastTouchX;
        const dy = pointer.y - this.lastTouchY;

        this.prevPlayerX = this.player.x;
        this.prevPlayerY = this.player.y;

        const newX = Phaser.Math.Clamp(this.player.x + dx, margin, width - margin);
        const newY = Phaser.Math.Clamp(this.player.y + dy, margin, height - margin);

        if (dx !== 0) {
          this.player.setFlipX(dx < 0);
        }

        this.player.setPosition(newX, newY);
        this.lastTouchX = pointer.x;
        this.lastTouchY = pointer.y;
      } else {
        // DESKTOP MOUSE: Hamster directly tracks mouse cursor (no click needed!)
        const targetX = Phaser.Math.Clamp(pointer.x, margin, width - margin);
        const targetY = Phaser.Math.Clamp(pointer.y, margin, height - margin);

        if (targetX !== this.player.x) {
          this.player.setFlipX(targetX < this.player.x);
        }

        this.prevPlayerX = this.player.x;
        this.prevPlayerY = this.player.y;
        this.player.setPosition(targetX, targetY);
      }

      // Check collision immediately upon movement
      if (this.state === 'PLAYING') {
        this.checkCollisions();
      }
    });
  }

  private handleKeyboardMovement(dt: number): void {
    let vx = 0;
    let vy = 0;

    const isLeft = (this.cursors && this.cursors.left.isDown) || (this.keyA && this.keyA.isDown);
    const isRight = (this.cursors && this.cursors.right.isDown) || (this.keyD && this.keyD.isDown);
    const isUp = (this.cursors && this.cursors.up.isDown) || (this.keyW && this.keyW.isDown);
    const isDown = (this.cursors && this.cursors.down.isDown) || (this.keyS && this.keyS.isDown);

    if (isLeft) vx -= 1;
    if (isRight) vx += 1;
    if (isUp) vy -= 1;
    if (isDown) vy += 1;

    if (vx !== 0 || vy !== 0) {
      if (vx !== 0 && vy !== 0) {
        vx *= Math.SQRT1_2;
        vy *= Math.SQRT1_2;
      }
      this.prevPlayerX = this.player.x;
      this.prevPlayerY = this.player.y;

      const { width, height } = this.scale;
      const margin = 20;
      const speed = GAME_CONFIG.PLAYER_SPEED;

      const newX = Phaser.Math.Clamp(this.player.x + vx * speed * dt, margin, width - margin);
      const newY = Phaser.Math.Clamp(this.player.y + vy * speed * dt, margin, height - margin);

      if (vx !== 0) {
        this.player.setFlipX(vx < 0);
      }
      this.player.setPosition(newX, newY);
    }
  }

  // --- COLLISION DETECTION ---
  private checkCollisions(): void {
    if (this.state !== 'PLAYING') return;

    const px = this.player.x;
    const py = this.player.y;
    const prevX = this.prevPlayerX || px;
    const prevY = this.prevPlayerY || py;
    const r = GAME_CONFIG.COLLISION_RADIUS;

    for (let i = 0; i < this.mobs.length; i++) {
      const mob = this.mobs[i];
      const dist = this.distToSegment(mob.x, mob.y, prevX, prevY, px, py);
      if (dist < r) {
        this.handleGameOver();
        break;
      }
    }
  }

  private distToSegment(px: number, py: number, x1: number, y1: number, x2: number, y2: number): number {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const l2 = dx * dx + dy * dy;
    if (l2 === 0) return Math.hypot(px - x1, py - y1);
    let t = ((px - x1) * dx + (py - y1) * dy) / l2;
    t = Math.max(0, Math.min(1, t));
    return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy));
  }

  // --- GAMEPLAY LIFECYCLE ---
  private showMenu(): void {
    this.state = 'MENU';
    this.game.canvas.style.cursor = '';
    this.input.setDefaultCursor('url(assets/images/cursor.png) 0 0, default');

    this.titleText.setVisible(true);
    this.messageText.setVisible(false);
    this.scoreLabel.setVisible(false);
    this.startBtn.setVisible(true);
    this.aboutBtn.setVisible(true);
    this.player.setVisible(false);
    this.clearMobs();
  }

  private startCountdown(): void {
    this.clearMobs();
    this.state = 'COUNTDOWN';
    this.game.canvas.style.cursor = 'none';

    this.titleText.setVisible(false);
    this.startBtn.setVisible(false);
    this.aboutBtn.setVisible(false);

    // Reset Player
    this.player.setPosition(GAME_CONFIG.PLAYER_START_X, GAME_CONFIG.PLAYER_START_Y);
    this.prevPlayerX = GAME_CONFIG.PLAYER_START_X;
    this.prevPlayerY = GAME_CONFIG.PLAYER_START_Y;
    (this.player.body as Phaser.Physics.Arcade.Body).setVelocity(0, 0);
    this.player.setVisible(true);
    this.player.play('hamtaro_run', true);

    this.messageText.setText('Get ready...').setColor('#facc15').setVisible(true);

    this.time.delayedCall(1600, () => {
      this.startGame();
    });
  }

  private startGame(): void {
    this.state = 'PLAYING';
    this.score = 0;
    this.newMobMaxSpeed = GAME_CONFIG.MOB_SPEED_MAX;
    this.messageText.setVisible(false);
    this.startBtn.setVisible(false);
    this.aboutBtn.setVisible(false);
    this.scoreLabel.setText('Score:   0').setVisible(true);
    this.recordLabel.setText(`Record: ${this.bestScore}`);

    // Hide hardware cursor so hamster acts as cursor
    this.game.canvas.style.cursor = 'none';

    // Start Music
    let bgm = this.sound.get('bgm');
    if (!bgm) {
      bgm = this.sound.add('bgm', { loop: true, volume: 0.45 });
    }
    if (!bgm.isPlaying) {
      bgm.play({ loop: true, volume: 0.45 });
    }

    // Score Timer (every 1 second)
    this.scoreTimer = this.time.addEvent({
      delay: 1000,
      callback: () => this.incrementScore(),
      loop: true,
    });

    // Mob Spawner (every 500ms)
    this.mobSpawnTimer = this.time.addEvent({
      delay: GAME_CONFIG.MOB_SPAWN_INTERVAL_MS,
      callback: () => this.spawnDogMob(),
      loop: true,
    });
  }

  private incrementScore(): void {
    if (this.state !== 'PLAYING') return;
    this.score += 1;
    this.scoreLabel.setText(`Score: ${this.score.toString().padStart(3, ' ')}`);

    // Speed up spawner slightly as score goes up
    if (this.mobSpawnTimer && this.score % 10 === 0) {
      const newDelay = Math.max(300, GAME_CONFIG.MOB_SPAWN_INTERVAL_MS - this.score * 5);
      this.mobSpawnTimer.reset({
        delay: newDelay,
        callback: () => this.spawnDogMob(),
        loop: true,
      });
    }
  }

  // --- MOB SPAWNING ---
  private spawnDogMob(): void {
    if (this.state !== 'PLAYING') return;

    const { width, height } = this.scale;
    const perimeter = (width + height) * 2;
    const d = Phaser.Math.Between(0, perimeter);

    let spawnX = 0;
    let spawnY = 0;
    let baseAngle = 0;

    if (d < width) {
      // Top Edge
      spawnX = d;
      spawnY = -40;
      baseAngle = Math.PI / 2;
    } else if (d < width + height) {
      // Right Edge
      spawnX = width + 40;
      spawnY = d - width;
      baseAngle = Math.PI;
    } else if (d < width * 2 + height) {
      // Bottom Edge
      spawnX = width - (d - (width + height));
      spawnY = height + 40;
      baseAngle = -Math.PI / 2;
    } else {
      // Left Edge
      spawnX = -40;
      spawnY = height - (d - (width * 2 + height));
      baseAngle = 0;
    }

    // Add random angle deviation ±45 degrees (PI/4)
    const angle = baseAngle + Phaser.Math.FloatBetween(-Math.PI / 4, Math.PI / 4);

    // Increase max speed by 2 on each mob spawn (exact Godot behavior)
    this.newMobMaxSpeed += 2;
    const speed = Phaser.Math.Between(
      GAME_CONFIG.MOB_SPEED_MIN,
      this.newMobMaxSpeed
    );

    const dog = this.physics.add.sprite(spawnX, spawnY, 'dog-run-1') as DogMob;
    dog.setScale(GAME_CONFIG.MOB_SCALE).setDepth(15);
    dog.play('dog_run');
    dog.rotation = angle;
    dog.vx = Math.cos(angle) * speed;
    dog.vy = Math.sin(angle) * speed;
    (dog.body as Phaser.Physics.Arcade.Body).setVelocity(dog.vx, dog.vy);

    // Flip vertically if moving leftwards so the dog stays upright
    if (dog.vx < 0) {
      dog.setFlipY(true);
    }

    this.mobs.push(dog);
  }

  private updateMobs(_dt: number): void {
    const { width, height } = this.scale;
    const margin = 120;

    for (let i = this.mobs.length - 1; i >= 0; i--) {
      const mob = this.mobs[i];
      if (
        mob.x < -margin ||
        mob.x > width + margin ||
        mob.y < -margin ||
        mob.y > height + margin
      ) {
        mob.destroy();
        this.mobs.splice(i, 1);
      }
    }
  }

  private clearMobs(): void {
    for (const mob of this.mobs) {
      mob.destroy();
    }
    this.mobs = [];
  }

  // --- GAME OVER ---
  private handleGameOver(): void {
    if (this.state !== 'PLAYING') return;
    this.state = 'GAME_OVER';

    this.startBtn.setVisible(false);
    this.aboutBtn.setVisible(false);

    // Stop timers & music
    this.sound.stopByKey('bgm');
    this.sound.play('boom', { volume: 0.65 });
    if (this.scoreTimer) this.scoreTimer.destroy();
    if (this.mobSpawnTimer) this.mobSpawnTimer.destroy();

    // Flash & Shake
    this.cameras.main.flash(200, 255, 255, 255);
    this.cameras.main.shake(160, 0.008);

    // Stop player
    (this.player.body as Phaser.Physics.Arcade.Body).setVelocity(0, 0);
    this.player.setVisible(false);

    // Freeze mobs
    for (const mob of this.mobs) {
      (mob.body as Phaser.Physics.Arcade.Body).setVelocity(0, 0);
      mob.stop();
    }

    // Restore visible cursor on canvas
    this.game.canvas.style.cursor = '';
    this.input.setDefaultCursor('url(assets/images/cursor.png) 0 0, default');

    const isNewHigh = this.score > this.bestScore;
    if (isNewHigh) {
      this.bestScore = this.score;
      localStorage.setItem(GAME_CONFIG.STORAGE_KEY_HIGHSCORE, this.bestScore.toString());
      this.recordLabel.setText(`Record: ${this.bestScore}`);
    }

    // Immediately show "Pooffff" (matching Godot HUD.gd show_result)
    this.messageText.setText('Pooffff').setColor('#ef4444').setVisible(true);

    // After 1500ms, show "Nice Job" and restore Menu buttons
    this.time.delayedCall(1500, () => {
      if (this.state === 'GAME_OVER') {
        this.messageText.setText('Nice Job').setColor('#facc15').setVisible(true);
        this.startBtn.setVisible(true);
        this.aboutBtn.setVisible(true);
      }
    });
  }
}
