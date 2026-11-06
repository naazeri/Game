import Phaser from 'phaser';
import { GAME_CONFIG } from '../config';

type GameState = 'READY' | 'PLAYING' | 'GAME_OVER';

interface PipePair {
  topPipe: Phaser.Physics.Arcade.Image;
  bottomPipe: Phaser.Physics.Arcade.Image;
  passed: boolean;
}

export class GameScene extends Phaser.Scene {
  private state: GameState = 'READY';
  private score = 0;
  private highScore = 0;

  // Background and World
  private bg!: Phaser.GameObjects.TileSprite;
  private ground!: Phaser.GameObjects.TileSprite;
  private groundBody!: Phaser.Physics.Arcade.Image;

  // Day / Night Cycle (0: Day, 1: Sunset, 2: Night)
  private currentCycle = 0;

  // High score celebration
  private hasCelebratedNewHigh = false;

  // Player Bird & Skins (0: Yellow, 1: Blue, 2: Red)
  private bird!: Phaser.Physics.Arcade.Sprite;
  private birdBobTween?: Phaser.Tweens.Tween;
  private currentSkinIndex = 0;
  private readonly SKINS = [
    { id: 'bird', name: 'Classic Bird', texture: 'bird', anim: 'bird_flap', sfx: 'wing' },
    { id: 'car', name: 'Cyber Car', texture: 'car', anim: 'car_fly', sfx: 'swoosh' },
    { id: 'ufo', name: 'Alien UFO', texture: 'ufo', anim: 'ufo_fly', sfx: 'ufo_beam' },
  ];
  private skinBadgeText?: Phaser.GameObjects.Text;

  // Pipes
  private pipePairs: PipePair[] = [];
  private pipeSpawnTimer?: Phaser.Time.TimerEvent;

  // UI - Ready State
  private readyMessage!: Phaser.GameObjects.Image;

  // UI - Playing State
  private scoreText!: Phaser.GameObjects.Text;

  // UI - Game Over State
  private gameOverContainer!: Phaser.GameObjects.Container;
  private gameOverBanner!: Phaser.GameObjects.Image;
  private playAgainBtn!: Phaser.GameObjects.Image;

  // Global UI
  private fullscreenBtn!: Phaser.GameObjects.Container;
  private muteBtn!: Phaser.GameObjects.Container;
  private exitBtn!: Phaser.GameObjects.Text;
  private versionText!: Phaser.GameObjects.Text;

  constructor() {
    super('GameScene');
  }

  create(): void {
    const { width, height } = this.scale;
    this.state = 'READY';
    this.score = 0;
    this.pipePairs = [];
    this.currentCycle = 0;
    this.hasCelebratedNewHigh = false;

    // Load High Score
    const saved = localStorage.getItem(GAME_CONFIG.STORAGE_KEY_HIGHSCORE);
    this.highScore = saved ? parseInt(saved, 10) : 0;

    // Load Skin preference
    const savedSkin = localStorage.getItem('flappy_bird_skin');
    this.currentSkinIndex = savedSkin ? parseInt(savedSkin, 10) % this.SKINS.length : 0;

    // 1. Background (tiling)
    this.bg = this.add.tileSprite(0, 0, width, height, 'background')
      .setOrigin(0, 0)
      .setDepth(0);

    // 2. Pipes Group
    this.physics.world.setBounds(0, -100, width, height + 200);

    // 3. Ground & Ground Collider
    this.ground = this.add.tileSprite(0, GAME_CONFIG.GROUND_Y, width, height - GAME_CONFIG.GROUND_Y, 'ground')
      .setOrigin(0, 0)
      .setDepth(20);

    // Invisible static body for ground collision
    this.groundBody = this.physics.add.image(width / 2, GAME_CONFIG.GROUND_Y + (height - GAME_CONFIG.GROUND_Y) / 2, 'ground')
      .setVisible(false);
    (this.groundBody.body as Phaser.Physics.Arcade.Body).setImmovable(true);
    (this.groundBody.body as Phaser.Physics.Arcade.Body).moves = false;
    (this.groundBody.body as Phaser.Physics.Arcade.Body).setSize(width, height - GAME_CONFIG.GROUND_Y);

    // 4. Player Bird
    this.bird = this.physics.add.sprite(GAME_CONFIG.PLAYER_START_X, GAME_CONFIG.PLAYER_START_Y, 'bird')
      .setDepth(30);
    this.bird.setCircle(14, 11, 4); // Forgiving circular hitbox
    (this.bird.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
    this.bird.play('bird_flap');
    this.applyBirdSkin();

    // Click bird on Ready screen to change skin
    this.bird.setInteractive({ useHandCursor: true });
    this.bird.on('pointerdown', (_pointer: unknown, _x: unknown, _y: unknown, event: Phaser.Types.Input.EventData) => {
      if (this.state !== 'READY') return;
      event.stopPropagation();
      this.cycleBirdSkin();
    });
    this.bird.on('pointerover', () => {
      if (this.state === 'READY') {
        this.input.setDefaultCursor('url(assets/images/cursor_pointer.png) 7 1, pointer');
      }
    });
    this.bird.on('pointerout', () => {
      this.input.setDefaultCursor('url(assets/images/cursor.png) 0 0, default');
    });

    // Bird gentle hovering in ready state
    this.birdBobTween = this.tweens.add({
      targets: this.bird,
      y: GAME_CONFIG.PLAYER_START_Y - 14,
      duration: 380,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    // 5. Collisions
    this.physics.add.overlap(this.bird, this.groundBody, () => {
      this.handleHit(true);
    });

    // 6. HUD / UI Elements
    this.input.setDefaultCursor('url(assets/images/cursor.png) 0 0, default');
    this.createReadyUI();
    this.createInGameHUD();
    this.createGameOverUI();
    this.createGlobalControls();

    // 7. Input Handlers
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer, currentlyOver: Phaser.GameObjects.GameObject[]) => {
      // Ignore if clicking UI buttons at bottom
      if (pointer.y > height - 70) return;

      // If in READY state and clicking bird or skin badge, do NOT start game!
      if (this.state === 'READY' && currentlyOver && currentlyOver.length > 0) {
        if (currentlyOver.includes(this.bird) || (this.skinBadgeText && currentlyOver.includes(this.skinBadgeText))) {
          return;
        }
      }

      this.handleAction();
    });

    this.input.keyboard?.on('keydown-SPACE', () => this.handleAction());
    this.input.keyboard?.on('keydown-UP', () => this.handleAction());
    this.input.keyboard?.on('keydown-ESC', () => {
      window.location.href = '../';
    });

    // Handle Resize & Shutdown
    this.scale.on('resize', this.handleResize, this);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.sound.stopByKey('bgm_play');
      this.input.setDefaultCursor('default');
      this.scale.off('resize', this.handleResize, this);
      if (this.pipeSpawnTimer) this.pipeSpawnTimer.destroy();
    });
  }

  update(_time: number, delta: number): void {
    const dt = delta / 1000;

    if (this.state === 'READY') {
      // Parallax scroll in ready state
      this.bg.tilePositionX += (GAME_CONFIG.SCROLL_SPEED_BG * dt);
      this.ground.tilePositionX += (GAME_CONFIG.SCROLL_SPEED_GROUND * dt);
    } else if (this.state === 'PLAYING') {
      // Parallax scroll during gameplay
      this.bg.tilePositionX += (GAME_CONFIG.SCROLL_SPEED_BG * dt);
      this.ground.tilePositionX += (GAME_CONFIG.SCROLL_SPEED_GROUND * dt);

      // Bird rotation physics
      const vy = (this.bird.body as Phaser.Physics.Arcade.Body).velocity.y;
      if (vy < 0) {
        // Flapping up -> tilt nose up
        this.bird.angle = Math.max(GAME_CONFIG.MAX_UP_ANGLE, this.bird.angle - 360 * dt);
      } else if (vy > 120) {
        // Falling down -> nose dives down towards 90 deg
        this.bird.angle = Math.min(GAME_CONFIG.MAX_DOWN_ANGLE, this.bird.angle + 280 * dt);
      }

      // Ceiling limit
      if (this.bird.y < 20) {
        this.bird.y = 20;
        (this.bird.body as Phaser.Physics.Arcade.Body).setVelocityY(0);
      }

      // Update Pipes & Check Passing
      this.updatePipes();
    } else if (this.state === 'GAME_OVER') {
      // Rotate bird facing directly down on fall
      if (this.bird.y < GAME_CONFIG.GROUND_Y - 18) {
        this.bird.angle = Math.min(90, this.bird.angle + 400 * dt);
      } else {
        (this.bird.body as Phaser.Physics.Arcade.Body).setVelocity(0, 0);
        (this.bird.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
        this.bird.y = GAME_CONFIG.GROUND_Y - 18;
      }
    }
  }

  private handleAction(): void {
    if (this.state === 'READY') {
      this.startGame();
    } else if (this.state === 'PLAYING') {
      this.flap();
    }
  }

  private startGame(): void {
    this.state = 'PLAYING';

    // Stop bobbing tween
    if (this.birdBobTween) {
      this.birdBobTween.stop();
    }

    // Hide Ready message & skin badge
    this.tweens.add({
      targets: [this.readyMessage, this.skinBadgeText],
      alpha: 0,
      scale: 0.9,
      duration: 220,
      onComplete: () => {
        this.readyMessage.setVisible(false);
        if (this.skinBadgeText) this.skinBadgeText.setVisible(false);
      },
    });

    // Start in-game music (silent in ready state)
    let bgm = this.sound.get('bgm_play');
    if (!bgm) {
      bgm = this.sound.add('bgm_play', { loop: true, volume: 0.35 });
    }
    if (!bgm.isPlaying) {
      bgm.play({ loop: true, volume: 0.35 });
    }

    // Show score HUD
    this.scoreText.setVisible(true);
    this.scoreText.setText('0');

    // Enable physics gravity
    const body = this.bird.body as Phaser.Physics.Arcade.Body;
    body.setAllowGravity(true);
    body.setGravityY(GAME_CONFIG.GRAVITY_Y);

    // Initial flap
    this.flap();

    // Start pipe spawner timer
    this.pipeSpawnTimer = this.time.addEvent({
      delay: GAME_CONFIG.PIPE_SPAWN_INTERVAL_MS,
      callback: () => this.spawnPipePair(),
      loop: true,
    });
  }

  private flap(): void {
    if (this.state !== 'PLAYING') return;

    const body = this.bird.body as Phaser.Physics.Arcade.Body;
    body.setVelocityY(GAME_CONFIG.FLAP_VELOCITY);

    // Snap angle slightly up for crisp feedback
    this.bird.angle = GAME_CONFIG.MAX_UP_ANGLE;

    // Character-specific jump sound
    const skin = this.SKINS[this.currentSkinIndex];
    this.sound.play(skin?.sfx || 'wing', { volume: 0.65 });
  }

  private spawnPipePair(): void {
    if (this.state !== 'PLAYING') return;

    const { width } = this.scale;
    const gap = GAME_CONFIG.PIPE_GAP;
    const pipeY = Phaser.Math.Between(GAME_CONFIG.PIPE_MIN_Y, GAME_CONFIG.PIPE_MAX_Y);

    // Top pipe (flipped vertically)
    const topPipe = this.physics.add.image(width + 60, pipeY - gap / 2, 'pipe')
      .setOrigin(0.5, 1)
      .setFlipY(true)
      .setDepth(10);
    (topPipe.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
    (topPipe.body as Phaser.Physics.Arcade.Body).setImmovable(true);
    (topPipe.body as Phaser.Physics.Arcade.Body).setVelocityX(-GAME_CONFIG.PIPE_SPEED);
    (topPipe.body as Phaser.Physics.Arcade.Body).setSize(70, 480);

    // Bottom pipe
    const bottomPipe = this.physics.add.image(width + 60, pipeY + gap / 2, 'pipe')
      .setOrigin(0.5, 0)
      .setDepth(10);
    (bottomPipe.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
    (bottomPipe.body as Phaser.Physics.Arcade.Body).setImmovable(true);
    (bottomPipe.body as Phaser.Physics.Arcade.Body).setVelocityX(-GAME_CONFIG.PIPE_SPEED);
    (bottomPipe.body as Phaser.Physics.Arcade.Body).setSize(70, 480);

    // Collisions
    this.physics.add.overlap(this.bird, topPipe, () => this.handleHit(false));
    this.physics.add.overlap(this.bird, bottomPipe, () => this.handleHit(false));

    this.pipePairs.push({ topPipe, bottomPipe, passed: false });
  }

  private updatePipes(): void {
    for (let i = this.pipePairs.length - 1; i >= 0; i--) {
      const pair = this.pipePairs[i];

      // Check if bird passed the pipe for score
      if (!pair.passed && pair.topPipe.x < this.bird.x) {
        pair.passed = true;
        this.score++;
        this.scoreText.setText(this.score.toString());
        this.sound.play('point', { volume: 0.7 });

        // Pulse score text
        this.tweens.add({
          targets: this.scoreText,
          scale: 1.25,
          duration: 90,
          yoyo: true,
        });

        // Day / Night cycle (transitions every 20 pipes)
        this.updateEnvironmentLighting();

        // Celebration on breaking the high score
        if (this.highScore > 0 && this.score > this.highScore && !this.hasCelebratedNewHigh) {
          this.hasCelebratedNewHigh = true;
          this.triggerNewRecordCelebration();
        }
      }

      // Cleanup off-screen pipes
      if (pair.topPipe.x < -100) {
        pair.topPipe.destroy();
        pair.bottomPipe.destroy();
        this.pipePairs.splice(i, 1);
      }
    }
  }

  private updateEnvironmentLighting(): void {
    const cycle = Math.floor(this.score / 20) % 3;
    if (cycle === this.currentCycle) return;
    this.currentCycle = cycle;

    // 0: Day (0xffffff), 1: Sunset (0xfb923c), 2: Night (0x334155)
    const targetBgTints = [0xffffff, 0xfb923c, 0x334155];
    const targetGroundTints = [0xffffff, 0xfde047, 0x64748b];
    const targetBg = targetBgTints[cycle];
    const targetGround = targetGroundTints[cycle];

    const startBg = this.bg.tintTopLeft;
    const startGround = this.ground.tintTopLeft;

    this.tweens.addCounter({
      from: 0,
      to: 100,
      duration: 1400,
      onUpdate: (tween: any) => {
        const val = Number(tween?.getValue() ?? 0) / 100;

        // Interpolate BG tint
        const bgR = Math.round(((startBg >> 16) & 0xff) + ((((targetBg >> 16) & 0xff) - ((startBg >> 16) & 0xff)) * val));
        const bgG = Math.round(((startBg >> 8) & 0xff) + ((((targetBg >> 8) & 0xff) - ((startBg >> 8) & 0xff)) * val));
        const bgB = Math.round((startBg & 0xff) + (((targetBg & 0xff) - (startBg & 0xff)) * val));
        this.bg.setTint((bgR << 16) | (bgG << 8) | bgB);

        // Interpolate Ground tint
        const grR = Math.round(((startGround >> 16) & 0xff) + ((((targetGround >> 16) & 0xff) - ((startGround >> 16) & 0xff)) * val));
        const grG = Math.round(((startGround >> 8) & 0xff) + ((((targetGround >> 8) & 0xff) - ((startGround >> 8) & 0xff)) * val));
        const grB = Math.round((startGround & 0xff) + (((targetGround & 0xff) - (startGround & 0xff)) * val));
        this.ground.setTint((grR << 16) | (grG << 8) | grB);
      },
    });
  }

  private triggerNewRecordCelebration(): void {
    const { width, height } = this.scale;
    const colors = [0xfacc15, 0xef4444, 0x3b82f6, 0x10b981, 0xec4899, 0xa855f7];

    // Burst confetti particles
    for (let i = 0; i < 35; i++) {
      const x = width / 2 + Phaser.Math.Between(-140, 140);
      const y = height * 0.28;
      const p = this.add.rectangle(x, y, 7, 7, Phaser.Utils.Array.GetRandom(colors))
        .setDepth(45);

      const vx = Phaser.Math.Between(-200, 200);
      const vy = Phaser.Math.Between(-280, -90);

      this.tweens.add({
        targets: p,
        x: x + vx * 0.7,
        y: y + vy * 0.3 + 320,
        angle: Phaser.Math.Between(180, 720),
        alpha: 0,
        scale: 0.4,
        duration: Phaser.Math.Between(850, 1400),
        ease: 'Cubic.easeOut',
        onComplete: () => p.destroy(),
      });
    }

    // Triumphant banner
    const banner = this.add.text(width / 2, height * 0.20, '★ NEW RECORD! ★', {
      fontFamily: GAME_CONFIG.FONT_FAMILY,
      fontSize: '32px',
      color: '#facc15',
      stroke: '#000000',
      strokeThickness: 5,
    }).setOrigin(0.5).setDepth(46);

    this.tweens.add({
      targets: banner,
      scale: 1.25,
      y: height * 0.18,
      duration: 300,
      yoyo: true,
      repeat: 2,
      onComplete: () => {
        this.tweens.add({
          targets: banner,
          alpha: 0,
          duration: 300,
          onComplete: () => banner.destroy(),
        });
      },
    });
  }

  private cycleBirdSkin(): void {
    this.currentSkinIndex = (this.currentSkinIndex + 1) % this.SKINS.length;
    localStorage.setItem('flappy_bird_skin', this.currentSkinIndex.toString());
    this.applyBirdSkin();
    const skin = this.SKINS[this.currentSkinIndex];
    this.sound.play(skin?.sfx || 'wing', { volume: 0.6 });

    // Little bounce animation
    this.tweens.add({
      targets: this.bird,
      scaleX: 1.25,
      scaleY: 1.25,
      duration: 100,
      yoyo: true,
    });
  }

  private applyBirdSkin(): void {
    if (!this.bird) return;
    const skin = this.SKINS[this.currentSkinIndex];
    if (!skin) return;
    this.bird.setTexture(skin.texture);
    this.bird.clearTint();
    this.bird.play(skin.anim);
    if (this.skinBadgeText) {
      this.skinBadgeText.setText(`Skin: ${skin.name} (Tap to change)`);
    }
  }

  private handleHit(isGround: boolean): void {
    if (this.state === 'GAME_OVER') return;
    this.state = 'GAME_OVER';

    // Stop gameplay music immediately on death
    this.sound.stopByKey('bgm_play');

    // White flash & camera shake
    this.cameras.main.flash(180, 255, 255, 255);
    this.cameras.main.shake(140, 0.007);

    // Stop animations & timer
    this.bird.stop();
    if (this.pipeSpawnTimer) {
      this.pipeSpawnTimer.destroy();
    }

    // Freeze all pipe velocities
    this.pipePairs.forEach((pair) => {
      (pair.topPipe.body as Phaser.Physics.Arcade.Body).setVelocityX(0);
      (pair.bottomPipe.body as Phaser.Physics.Arcade.Body).setVelocityX(0);
    });

    // Sound effects
    this.sound.play('hit', { volume: 0.8 });
    if (!isGround) {
      this.time.delayedCall(120, () => {
        this.sound.play('die', { volume: 0.8 });
      });
    }

    // Check high score
    const isNewHigh = this.score > this.highScore;
    if (isNewHigh) {
      this.highScore = this.score;
      localStorage.setItem(GAME_CONFIG.STORAGE_KEY_HIGHSCORE, this.highScore.toString());
    }

    // Show Game Over UI after a brief moment
    this.time.delayedCall(550, () => {
      this.showGameOverScreen(isNewHigh);
    });
  }

  private createReadyUI(): void {
    const { width, height } = this.scale;
    this.readyMessage = this.add.image(width / 2, height * 0.40, 'message')
      .setDepth(50);

    // Bird Skin Selector Badge under message, comfortably above the ground
    this.skinBadgeText = this.add.text(width / 2, height * 0.70, `Skin: ${this.SKINS[this.currentSkinIndex].name} (Tap to change)`, {
      fontFamily: GAME_CONFIG.FONT_FAMILY,
      fontSize: '20px',
      color: '#ffffff',
      backgroundColor: '#00000077',
      padding: { x: 14, y: 7 },
    })
      .setOrigin(0.5)
      .setDepth(50)
      .setInteractive({ useHandCursor: true });

    this.skinBadgeText.on('pointerdown', (_pointer: unknown, _x: unknown, _y: unknown, event: Phaser.Types.Input.EventData) => {
      if (this.state !== 'READY') return;
      event.stopPropagation();
      this.cycleBirdSkin();
    });

    this.skinBadgeText.on('pointerover', () => {
      this.input.setDefaultCursor('url(assets/images/cursor_pointer.png) 7 1, pointer');
      this.skinBadgeText?.setColor('#facc15');
    });

    this.skinBadgeText.on('pointerout', () => {
      this.input.setDefaultCursor('url(assets/images/cursor.png) 0 0, default');
      this.skinBadgeText?.setColor('#ffffff');
    });
  }

  private createInGameHUD(): void {
    const { width } = this.scale;
    this.scoreText = this.add.text(width / 2, 75, '0', {
      fontFamily: GAME_CONFIG.FONT_FAMILY,
      fontSize: '68px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 8,
    })
      .setOrigin(0.5, 0)
      .setDepth(40)
      .setVisible(false);
  }

  private createGameOverUI(): void {
    const { width, height } = this.scale;

    this.gameOverContainer = this.add.container(0, 0).setDepth(60).setVisible(false);

    // "Game Over" banner
    this.gameOverBanner = this.add.image(width / 2, height * 0.23, 'gameover')
      .setOrigin(0.5);
    this.gameOverContainer.add(this.gameOverBanner);

    // Score Board Card Box
    const cardW = 340;
    const cardH = 200;
    const cardX = width / 2;
    const cardY = height * 0.46;

    // Outer border & fill
    const cardBg = this.add.graphics();
    cardBg.fillStyle(0xded895, 1);
    cardBg.fillRoundedRect(cardX - cardW / 2, cardY - cardH / 2, cardW, cardH, 8);
    cardBg.lineStyle(4, 0x543847, 1);
    cardBg.strokeRoundedRect(cardX - cardW / 2, cardY - cardH / 2, cardW, cardH, 8);
    this.gameOverContainer.add(cardBg);

    // Labels & Score fields inside the card
    const medalLabel = this.add.text(cardX - 105, cardY - 72, 'MEDAL', {
      fontFamily: GAME_CONFIG.FONT_FAMILY,
      fontSize: '24px',
      color: '#e76a3c',
    }).setOrigin(0.5);

    const scoreTitle = this.add.text(cardX + 90, cardY - 72, 'SCORE', {
      fontFamily: GAME_CONFIG.FONT_FAMILY,
      fontSize: '22px',
      color: '#e76a3c',
    }).setOrigin(0.5);

    const scoreVal = this.add.text(cardX + 130, cardY - 34, '0', {
      fontFamily: GAME_CONFIG.FONT_FAMILY,
      fontSize: '44px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 6,
    }).setOrigin(1, 0.5).setName('card_score');

    const bestTitle = this.add.text(cardX + 90, cardY + 12, 'BEST', {
      fontFamily: GAME_CONFIG.FONT_FAMILY,
      fontSize: '22px',
      color: '#e76a3c',
    }).setOrigin(0.5);

    const bestVal = this.add.text(cardX + 130, cardY + 50, '0', {
      fontFamily: GAME_CONFIG.FONT_FAMILY,
      fontSize: '44px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 6,
    }).setOrigin(1, 0.5).setName('card_best');

    // Medal slot holder
    const medalSlot = this.add.graphics();
    medalSlot.fillStyle(0xbaae77, 0.8);
    medalSlot.fillCircle(cardX - 105, cardY, 26);
    medalSlot.lineStyle(2, 0x543847, 0.8);
    medalSlot.strokeCircle(cardX - 105, cardY, 26);

    // Medal Icon (placeholder)
    const medalIcon = this.add.image(cardX - 105, cardY, 'medal_bronze')
      .setName('medal_icon')
      .setVisible(false);

    // No medal indicator (when score < 10)
    const noMedalText = this.add.text(cardX - 105, cardY, 'X', {
      fontFamily: GAME_CONFIG.FONT_FAMILY,
      fontSize: '36px',
      color: '#b45309',
      stroke: '#543847',
      strokeThickness: 3,
    })
      .setOrigin(0.5)
      .setName('no_medal_text')
      .setVisible(false);

    // "NEW" Record Ribbon
    const newRecordBadge = this.add.text(cardX + 18, cardY + 32, 'NEW', {
      fontFamily: GAME_CONFIG.FONT_FAMILY,
      fontSize: '18px',
      color: '#ef4444',
      stroke: '#ffffff',
      strokeThickness: 2,
    }).setName('new_badge').setVisible(false);

    this.gameOverContainer.add([
      medalLabel,
      scoreTitle,
      scoreVal,
      bestTitle,
      bestVal,
      medalSlot,
      medalIcon,
      noMedalText,
      newRecordBadge,
    ]);

    // Play Again Button (Classic PlayButton.png scaled)
    this.playAgainBtn = this.add.image(width / 2, height * 0.67, 'play_button')
      .setDisplaySize(140, 72)
      .setInteractive({ useHandCursor: true });

    this.playAgainBtn.on('pointerover', () => {
      this.input.setDefaultCursor('url(assets/images/cursor_pointer.png) 7 1, pointer');
      this.playAgainBtn.setScale(3.1);
    });

    this.playAgainBtn.on('pointerout', () => {
      this.input.setDefaultCursor('url(assets/images/cursor.png) 0 0, default');
      this.playAgainBtn.setScale(2.91);
    });

    this.playAgainBtn.on('pointerdown', () => {
      this.sound.play('ui_click', { volume: 0.5 });
      this.restartGame();
    });

    this.gameOverContainer.add(this.playAgainBtn);
  }

  private showGameOverScreen(isNewHigh: boolean): void {
    this.sound.play('swoosh', { volume: 0.5 });
    this.scoreText.setVisible(false);

    const cardScore = this.gameOverContainer.getByName('card_score') as Phaser.GameObjects.Text;
    const cardBest = this.gameOverContainer.getByName('card_best') as Phaser.GameObjects.Text;
    const medalIcon = this.gameOverContainer.getByName('medal_icon') as Phaser.GameObjects.Image;
    const noMedalText = this.gameOverContainer.getByName('no_medal_text') as Phaser.GameObjects.Text;
    const newBadge = this.gameOverContainer.getByName('new_badge') as Phaser.GameObjects.Text;

    cardScore.setText(this.score.toString());
    cardBest.setText(this.highScore.toString());
    newBadge.setVisible(isNewHigh && this.score > 0);

    // Determine Medal
    if (this.score >= 40) {
      medalIcon.setTexture('medal_platinum').setVisible(true);
      noMedalText.setVisible(false);
    } else if (this.score >= 30) {
      medalIcon.setTexture('medal_gold').setVisible(true);
      noMedalText.setVisible(false);
    } else if (this.score >= 20) {
      medalIcon.setTexture('medal_silver').setVisible(true);
      noMedalText.setVisible(false);
    } else if (this.score >= 10) {
      medalIcon.setTexture('medal_bronze').setVisible(true);
      noMedalText.setVisible(false);
    } else {
      medalIcon.setVisible(false);
      noMedalText.setVisible(true);
    }

    // Pop-in animation
    this.gameOverContainer.setAlpha(0);
    this.gameOverContainer.setVisible(true);

    this.tweens.add({
      targets: this.gameOverContainer,
      alpha: 1,
      duration: 250,
      ease: 'Power2',
    });

    this.gameOverBanner.setScale(0.5);
    this.tweens.add({
      targets: this.gameOverBanner,
      scale: 1,
      duration: 350,
      ease: 'Back.easeOut',
    });
  }

  private restartGame(): void {
    this.sound.stopByKey('bgm_play');
    this.scene.restart();
  }

  private createGlobalControls(): void {
    const { width, height } = this.scale;

    // 1. Fullscreen Toggle (bottom-left, x: 38)
    this.fullscreenBtn = this.add.container(38, height - 36).setDepth(100);

    const fsBg = this.add.circle(0, 0, 20, 0x000000, 0.45)
      .setInteractive({ useHandCursor: true });

    const fsIcon = this.add.graphics();
    const drawFsIcon = (isFs: boolean): void => {
      fsIcon.clear();
      fsIcon.lineStyle(2, 0xffffff, 1);
      const s = 9;
      if (!isFs) {
        fsIcon.strokeRect(-s, -s, s * 2, s * 2);
      } else {
        fsIcon.strokeRect(-s / 2, -s / 2, s, s);
      }
    };
    drawFsIcon(this.scale.isFullscreen);

    fsBg.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      pointer.event.stopPropagation();
      this.sound.play('ui_click', { volume: 0.4 });
      if (this.scale.isFullscreen) {
        this.scale.stopFullscreen();
        drawFsIcon(false);
      } else {
        this.scale.startFullscreen();
        drawFsIcon(true);
      }
    });

    fsBg.on('pointerover', () => {
      this.input.setDefaultCursor('url(assets/images/cursor_pointer.png) 7 1, pointer');
      fsBg.setFillStyle(0x000000, 0.7);
    });
    fsBg.on('pointerout', () => {
      this.input.setDefaultCursor('url(assets/images/cursor.png) 0 0, default');
      fsBg.setFillStyle(0x000000, 0.45);
    });

    this.fullscreenBtn.add([fsBg, fsIcon]);

    // 2. Mute Toggle (bottom-left, x: 86)
    this.muteBtn = this.add.container(86, height - 36).setDepth(100);

    const muteBg = this.add.circle(0, 0, 20, 0x000000, 0.45)
      .setInteractive({ useHandCursor: true });

    const isMuted = localStorage.getItem('flappy_bird_muted') === 'true';
    this.sound.mute = isMuted;

    const muteIcon = this.add.graphics();
    const drawMuteIcon = (muted: boolean): void => {
      muteIcon.clear();
      muteIcon.lineStyle(2, 0xffffff, 1);
      muteIcon.fillStyle(0xffffff, 1);

      // Speaker body
      muteIcon.fillRect(-8, -4, 4, 8);
      muteIcon.beginPath();
      muteIcon.moveTo(-4, -4);
      muteIcon.lineTo(1, -9);
      muteIcon.lineTo(1, 9);
      muteIcon.lineTo(-4, 4);
      muteIcon.closePath();
      muteIcon.fillPath();

      if (!muted) {
        // Soundwaves
        muteIcon.beginPath();
        muteIcon.arc(1, 0, 5, -Math.PI / 4, Math.PI / 4, false);
        muteIcon.strokePath();
        muteIcon.beginPath();
        muteIcon.arc(1, 0, 9, -Math.PI / 4, Math.PI / 4, false);
        muteIcon.strokePath();
      } else {
        // Diagonal slash
        muteIcon.lineStyle(2, 0xef4444, 1);
        muteIcon.lineBetween(-7, -7, 7, 7);
      }
    };
    drawMuteIcon(this.sound.mute);

    muteBg.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      pointer.event.stopPropagation();
      this.sound.mute = !this.sound.mute;
      localStorage.setItem('flappy_bird_muted', this.sound.mute ? 'true' : 'false');
      drawMuteIcon(this.sound.mute);
      if (!this.sound.mute) {
        this.sound.play('ui_click', { volume: 0.4 });
      }
    });

    muteBg.on('pointerover', () => {
      this.input.setDefaultCursor('url(assets/images/cursor_pointer.png) 7 1, pointer');
      muteBg.setFillStyle(0x000000, 0.7);
    });
    muteBg.on('pointerout', () => {
      this.input.setDefaultCursor('url(assets/images/cursor.png) 0 0, default');
      muteBg.setFillStyle(0x000000, 0.45);
    });

    this.muteBtn.add([muteBg, muteIcon]);

    // 3. Exit button (bottom-center)
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

    this.exitBtn.on('pointerover', () => {
      this.input.setDefaultCursor('url(assets/images/cursor_pointer.png) 7 1, pointer');
      this.exitBtn.setColor('#facc15');
    });

    this.exitBtn.on('pointerout', () => {
      this.input.setDefaultCursor('url(assets/images/cursor.png) 0 0, default');
      this.exitBtn.setColor('#ffffff');
    });

    this.exitBtn.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      pointer.event.stopPropagation();
      this.sound.play('ui_click', { volume: 0.4 });
      window.location.href = '../';
    });

    // 4. Version tag (bottom-right)
    this.versionText = this.add.text(width - 25, height - 36, GAME_CONFIG.VERSION, {
      fontFamily: GAME_CONFIG.FONT_FAMILY,
      fontSize: '20px',
      color: '#ffffffaa',
    })
      .setOrigin(1, 0.5)
      .setDepth(100);
  }

  private handleResize(gameSize: Phaser.Structs.Size): void {
    const { width, height } = gameSize;
    this.bg.setSize(width, height);
    this.ground.setPosition(0, GAME_CONFIG.GROUND_Y);
    this.ground.setSize(width, height - GAME_CONFIG.GROUND_Y);
    this.fullscreenBtn.setPosition(38, height - 36);
    this.muteBtn.setPosition(86, height - 36);
    this.exitBtn.setPosition(width / 2, height - 36);
    this.versionText.setPosition(width - 25, height - 36);
  }
}
