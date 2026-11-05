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

  // Player Bird
  private bird!: Phaser.Physics.Arcade.Sprite;
  private birdBobTween?: Phaser.Tweens.Tween;

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

    // Load High Score
    const saved = localStorage.getItem(GAME_CONFIG.STORAGE_KEY_HIGHSCORE);
    this.highScore = saved ? parseInt(saved, 10) : 0;

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
    this.createReadyUI();
    this.createInGameHUD();
    this.createGameOverUI();
    this.createGlobalControls();

    // 7. Input Handlers
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      // Ignore if clicking UI buttons at bottom
      if (pointer.y > height - 70) return;
      this.handleAction();
    });

    this.input.keyboard?.on('keydown-SPACE', () => this.handleAction());
    this.input.keyboard?.on('keydown-UP', () => this.handleAction());
    this.input.keyboard?.on('keydown-ESC', () => {
      window.location.href = '../';
    });

    // Handle Resize
    this.scale.on('resize', this.handleResize, this);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
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

    // Hide Ready message
    this.tweens.add({
      targets: this.readyMessage,
      alpha: 0,
      scale: 0.9,
      duration: 220,
      onComplete: () => {
        this.readyMessage.setVisible(false);
      },
    });

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

    // Wing sound
    this.sound.play('wing', { volume: 0.65 });
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
      }

      // Cleanup off-screen pipes
      if (pair.topPipe.x < -100) {
        pair.topPipe.destroy();
        pair.bottomPipe.destroy();
        this.pipePairs.splice(i, 1);
      }
    }
  }

  private handleHit(isGround: boolean): void {
    if (this.state === 'GAME_OVER') return;
    this.state = 'GAME_OVER';

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
    this.readyMessage = this.add.image(width / 2, height * 0.44, 'message')
      .setDepth(50);
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
      newRecordBadge,
    ]);

    // Play Again Button (Classic PlayButton.png scaled)
    this.playAgainBtn = this.add.image(width / 2, height * 0.67, 'play_button')
      .setDisplaySize(140, 72)
      .setInteractive({ useHandCursor: true });

    this.playAgainBtn.on('pointerover', () => {
      this.playAgainBtn.setScale(3.1);
    });

    this.playAgainBtn.on('pointerout', () => {
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
    const newBadge = this.gameOverContainer.getByName('new_badge') as Phaser.GameObjects.Text;

    cardScore.setText(this.score.toString());
    cardBest.setText(this.highScore.toString());
    newBadge.setVisible(isNewHigh && this.score > 0);

    // Determine Medal
    if (this.score >= 40) {
      medalIcon.setTexture('medal_platinum').setVisible(true);
    } else if (this.score >= 30) {
      medalIcon.setTexture('medal_gold').setVisible(true);
    } else if (this.score >= 20) {
      medalIcon.setTexture('medal_silver').setVisible(true);
    } else if (this.score >= 10) {
      medalIcon.setTexture('medal_bronze').setVisible(true);
    } else {
      medalIcon.setVisible(false);
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
    this.scene.restart();
  }

  private createGlobalControls(): void {
    const { width, height } = this.scale;

    // 1. Fullscreen Toggle (bottom-left)
    this.fullscreenBtn = this.add.container(40, height - 36).setDepth(100);

    const fsBg = this.add.circle(0, 0, 22, 0x000000, 0.45)
      .setInteractive({ useHandCursor: true });

    const fsIcon = this.add.graphics();
    const drawFsIcon = (isFs: boolean): void => {
      fsIcon.clear();
      fsIcon.lineStyle(2, 0xffffff, 1);
      const s = 10;
      if (!isFs) {
        // Expand icon
        fsIcon.strokeRect(-s, -s, s * 2, s * 2);
      } else {
        // Contract icon
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

    fsBg.on('pointerover', () => fsBg.setFillStyle(0x000000, 0.7));
    fsBg.on('pointerout', () => fsBg.setFillStyle(0x000000, 0.45));

    this.fullscreenBtn.add([fsBg, fsIcon]);

    // 2. Exit / Portal button (bottom-center)
    this.exitBtn = this.add.text(width / 2, height - 36, '← Exit to Portal', {
      fontFamily: GAME_CONFIG.FONT_FAMILY,
      fontSize: '22px',
      color: '#ffffff',
      backgroundColor: '#00000066',
      padding: { x: 12, y: 6 },
    })
      .setOrigin(0.5)
      .setDepth(100)
      .setInteractive({ useHandCursor: true });

    this.exitBtn.on('pointerover', () => {
      this.exitBtn.setColor('#facc15');
    });

    this.exitBtn.on('pointerout', () => {
      this.exitBtn.setColor('#ffffff');
    });

    this.exitBtn.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      pointer.event.stopPropagation();
      this.sound.play('ui_click', { volume: 0.4 });
      window.location.href = '../';
    });

    // 3. Version tag (bottom-right)
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
    this.fullscreenBtn.setPosition(40, height - 36);
    this.exitBtn.setPosition(width / 2, height - 36);
    this.versionText.setPosition(width - 25, height - 36);
  }
}
