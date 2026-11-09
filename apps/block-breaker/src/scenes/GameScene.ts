import Phaser from 'phaser';
import {
  GAME_WIDTH,
  GAME_HEIGHT,
  ARENA_BOUNDS,
  BLOCK_CONFIG,
  BlockType,
  PowerUpType,
  FONTS,
  COMBO_CONFIG,
} from '../config.js';
import { Paddle } from '../entities/Paddle.js';
import { Ball } from '../entities/Ball.js';
import { Block } from '../entities/Block.js';
import { PowerUp } from '../entities/PowerUp.js';
import { HUD } from '../ui/HUD.js';
import { PauseModal, StageClearModal, GameOverModal, VictoryModal } from '../ui/Modals.js';
import { AudioManager } from '../audio/AudioManager.js';
import { STAGES, StageInfo, parseBlockType } from '../stages/StageData.js';
import { createCrispText } from '../ui/TextHelper.js';

interface Shard {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: number;
  alpha: number;
  size: number;
}

export class GameScene extends Phaser.Scene {
  private audio!: AudioManager;
  private paddle!: Paddle;
  private balls: Ball[] = [];
  private blocks: Block[] = [];
  private powerUps: PowerUp[] = [];
  private shards: Shard[] = [];
  private shardGfx!: Phaser.GameObjects.Graphics;
  private arenaBorderGfx!: Phaser.GameObjects.Graphics;

  private hud!: HUD;
  private pauseModal!: PauseModal;
  private stageClearModal!: StageClearModal;
  private gameOverModal!: GameOverModal;
  private victoryModal!: VictoryModal;

  // Game Progression State
  private score: number = 0;
  private bestScore: number = 0;
  private lives: number = 3;
  private currentStageIndex: number = 0;
  private comboCount: number = 0;
  private comboMultiplier: number = 1;

  // Flow flags
  private isPaused: boolean = false;
  private isGameOver: boolean = false;
  private isStageTransitioning: boolean = false;

  // Active power-up timers on balls
  private fireballTimer: number = 0;
  private chronoTimer: number = 0;

  constructor() {
    super({ key: 'GameScene' });
  }

  public create(): void {
    this.cameras.main.fadeIn(350, 5, 7, 14);

    // Audio & Best score
    this.audio = AudioManager.getInstance(this);
    this.bestScore = parseInt(localStorage.getItem('blockbreaker_best_score') || '0', 10);

    // Arena boundary and backdrop graphics
    this.createArenaBackdrop();

    // Shard graphics
    this.shardGfx = this.add.graphics().setDepth(13);

    // Paddle
    this.paddle = new Paddle(this);

    // HUD
    this.hud = new HUD(this);
    this.hud.updateScore(this.score, this.bestScore);
    this.hud.updateLives(this.lives);

    // Modals
    this.pauseModal = new PauseModal(
      this,
      () => this.resumeGame(),
      () => this.retryCurrentStage(),
      () => this.quitToMenu()
    );

    this.stageClearModal = new StageClearModal(this, () => this.advanceToNextStage());

    this.gameOverModal = new GameOverModal(
      this,
      () => this.restartGame(),
      () => this.quitToMenu()
    );

    this.victoryModal = new VictoryModal(
      this,
      () => this.restartGame(),
      () => this.quitToMenu()
    );

    // Setup input handling
    this.setupInput();

    // Setup custom scene events
    this.setupEvents();

    // Load Stage 1
    this.currentStageIndex = 0;
    this.loadStage(this.currentStageIndex);
  }

  private createArenaBackdrop(): void {
    // Backdrop dark gradient
    const bg = this.add.rectangle(0, 0, GAME_WIDTH, GAME_HEIGHT, 0x05070e).setOrigin(0);
    bg.setDepth(0);

    // Grid lines within arena
    const grid = this.add.graphics().setDepth(1);
    grid.lineStyle(1, 0x1e293b, 0.25);
    for (let x = ARENA_BOUNDS.left; x <= ARENA_BOUNDS.right; x += 38) {
      grid.lineBetween(x, ARENA_BOUNDS.top, x, ARENA_BOUNDS.bottom);
    }
    for (let y = ARENA_BOUNDS.top; y <= ARENA_BOUNDS.bottom; y += 38) {
      grid.lineBetween(ARENA_BOUNDS.left, y, ARENA_BOUNDS.right, y);
    }

    // Glowing arena border
    this.arenaBorderGfx = this.add.graphics().setDepth(2);
    this.drawArenaBorders();
  }

  private drawArenaBorders(): void {
    this.arenaBorderGfx.clear();

    // Outer subtle glow
    this.arenaBorderGfx.lineStyle(4, 0x00f0ff, 0.15);
    this.arenaBorderGfx.strokeRect(
      ARENA_BOUNDS.left - 2,
      ARENA_BOUNDS.top - 2,
      ARENA_BOUNDS.width + 4,
      ARENA_BOUNDS.height + 4
    );

    // Crisp neon inner frame (Top, Left, Right)
    this.arenaBorderGfx.lineStyle(2, 0x00f0ff, 0.7);
    this.arenaBorderGfx.beginPath();
    this.arenaBorderGfx.moveTo(ARENA_BOUNDS.left, ARENA_BOUNDS.bottom);
    this.arenaBorderGfx.lineTo(ARENA_BOUNDS.left, ARENA_BOUNDS.top);
    this.arenaBorderGfx.lineTo(ARENA_BOUNDS.right, ARENA_BOUNDS.top);
    this.arenaBorderGfx.lineTo(ARENA_BOUNDS.right, ARENA_BOUNDS.bottom);
    this.arenaBorderGfx.strokePath();

    // Hazard danger zone markers at bottom drain
    this.arenaBorderGfx.lineStyle(2, 0xef4444, 0.35);
    this.arenaBorderGfx.lineBetween(ARENA_BOUNDS.left, ARENA_BOUNDS.bottom, ARENA_BOUNDS.right, ARENA_BOUNDS.bottom);
  }

  private setupInput(): void {
    // Mouse / Touch tracking for paddle
    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      if (this.isPaused || this.isGameOver || this.isStageTransitioning) return;
      this.paddle.setPositionX(pointer.x);
    });

    // Click / Tap to launch ball or fire lasers
    this.input.on('pointerdown', () => {
      if (this.isPaused || this.isGameOver || this.isStageTransitioning) return;
      this.handleActionTrigger();
    });

    // Spacebar to launch / fire
    this.input.keyboard?.on('keydown-SPACE', () => {
      if (this.isPaused || this.isGameOver || this.isStageTransitioning) return;
      this.handleActionTrigger();
    });

    // Pause keys (P or ESC)
    this.input.keyboard?.on('keydown-P', () => {
      if (!this.isGameOver && !this.isStageTransitioning) {
        if (this.isPaused) this.resumeGame();
        else this.pauseGame();
      }
    });
    this.input.keyboard?.on('keydown-ESC', () => {
      if (!this.isGameOver && !this.isStageTransitioning) {
        if (this.isPaused) this.resumeGame();
        else this.pauseGame();
      }
    });
  }

  private setupEvents(): void {
    // HUD pause request
    this.events.on('request-pause', () => {
      if (!this.isPaused && !this.isGameOver && !this.isStageTransitioning) {
        this.pauseGame();
      }
    });

    // Wall bounce sound
    this.events.on('wall-bounce', () => {
      this.audio.playWallBounce();
    });

    // Energy Safety Floor bounce
    this.events.on('floor-bounce', () => {
      this.audio.playPaddleHit(0);
      this.showToast(GAME_WIDTH / 2, ARENA_BOUNDS.bottom - 24, 'BARRIER DEFLECT!', '#10b981');
    });

    // PowerUp collected
    this.events.on('powerup-collected', (p: PowerUp) => {
      this.applyPowerUp(p.type);
    });
  }

  private handleActionTrigger(): void {
    // 1. Launch any balls locked to paddle
    let launchedAny = false;
    for (const ball of this.balls) {
      if (ball.isLockedToPaddle) {
        ball.launch();
        launchedAny = true;
      }
    }

    if (launchedAny) {
      this.audio.playPaddleHit(0);
      return;
    }

    // 2. Fire twin lasers if laser buff active
    if (this.paddle.isLaserActive) {
      const fired = this.paddle.tryFireLaser();
      if (fired) {
        this.audio.playLaserShot();
      }
    }
  }

  // ==========================================
  // STAGE LOADING & GENERATION
  // ==========================================
  private loadStage(stageIndex: number): void {
    this.isStageTransitioning = false;
    const stage = STAGES[stageIndex];
    this.hud.updateStage(stage.id, STAGES.length);

    // Clear existing blocks and power-ups
    this.clearArenaEntities();

    // Reset ball timers
    this.fireballTimer = 0;
    this.chronoTimer = 0;

    // Spawn Blocks from grid
    const startX = BLOCK_CONFIG.gridStartX;
    const startY = BLOCK_CONFIG.gridStartY;
    const colStep = BLOCK_CONFIG.width + BLOCK_CONFIG.paddingX;
    const rowStep = BLOCK_CONFIG.height + BLOCK_CONFIG.paddingY;

    stage.grid.forEach((rowStr, rowIdx) => {
      const chars = rowStr.trim().split(/\s+/);
      chars.forEach((char, colIdx) => {
        const type = parseBlockType(char);
        if (type !== null) {
          const bx = startX + colIdx * colStep;
          const by = startY + rowIdx * rowStep;
          const block = new Block(this, bx, by, type);
          this.blocks.push(block);
        }
      });
    });

    // Reset paddle and spawn primary ball locked to paddle
    this.paddle.setPositionX((ARENA_BOUNDS.left + ARENA_BOUNDS.right) / 2);
    this.spawnInitialBall();

    // Intro toast
    this.showToast(GAME_WIDTH / 2, 280, `${stage.name}: ${stage.subtitle}`, stage.accentColor, 20);
  }

  private spawnInitialBall(): void {
    // Clear old balls
    this.balls.forEach((b) => b.destroy());
    this.balls = [];

    const ball = new Ball(this, this.paddle.x, this.paddle.y - 16, true);
    ball.lockToPaddle(this.paddle, 0);
    this.balls.push(ball);
  }

  private clearArenaEntities(): void {
    this.blocks.forEach((b) => b.destroy());
    this.blocks = [];

    this.powerUps.forEach((p) => p.destroy());
    this.powerUps = [];

    this.paddle.lasers = [];
  }

  // ==========================================
  // MAIN UPDATE LOOP
  // ==========================================
  public override update(_time: number, delta: number): void {
    if (this.isPaused || this.isGameOver || this.isStageTransitioning) return;

    const dt = delta / 1000;

    // 1. Update Paddle
    this.paddle.update(dt);

    // 2. Update Ball Timers
    this.updateBuffTimers(dt);

    // 3. Update Balls & Collisions
    this.updateBalls(dt);

    // 4. Update Laser Cannons & Block Collisions
    this.updateLasers();

    // 5. Update Falling Power-Ups
    this.updatePowerUps(dt);

    // 6. Update Shard Particles
    this.updateShards(dt);

    // 7. Update HUD Buffs
    this.updateHUDActiveBuffs();
  }

  private updateBuffTimers(dt: number): void {
    if (this.fireballTimer > 0) {
      this.fireballTimer -= dt;
      if (this.fireballTimer <= 0) {
        this.fireballTimer = 0;
        this.balls.forEach((b) => b.setFireball(false));
      }
    }

    if (this.chronoTimer > 0) {
      this.chronoTimer -= dt;
      if (this.chronoTimer <= 0) {
        this.chronoTimer = 0;
        this.balls.forEach((b) => b.setSlowed(false));
      }
    }
  }

  private updateHUDActiveBuffs(): void {
    const buffs: Array<{ type: PowerUpType; timeLeft: number }> = [];

    if (this.paddle.isLaserActive) {
      buffs.push({ type: PowerUpType.Laser, timeLeft: this.paddle.laserTimer });
    }
    if (this.paddle.isSafetyFloorActive) {
      buffs.push({ type: PowerUpType.SafetyFloor, timeLeft: this.paddle.safetyFloorTimer });
    }
    if (this.paddle.isExpandActive) {
      buffs.push({ type: PowerUpType.Expand, timeLeft: this.paddle.expandTimer });
    }
    if (this.fireballTimer > 0) {
      buffs.push({ type: PowerUpType.Fireball, timeLeft: this.fireballTimer });
    }
    if (this.chronoTimer > 0) {
      buffs.push({ type: PowerUpType.ChronoSlow, timeLeft: this.chronoTimer });
    }

    this.hud.updateActiveBuffs(buffs);
  }

  private updateBalls(dt: number): void {
    for (let i = this.balls.length - 1; i >= 0; i--) {
      const ball = this.balls[i];
      if (!ball.active) continue;

      ball.update(dt, this.paddle);

      if (ball.isLockedToPaddle) continue;

      // A. Paddle Collision Check
      if (ball.vy > 0) {
        const paddleBounds = this.paddle.getBounds();
        if (
          ball.y + ball.radius >= paddleBounds.top &&
          ball.y - ball.radius <= paddleBounds.bottom &&
          ball.x + ball.radius >= paddleBounds.left &&
          ball.x - ball.radius <= paddleBounds.right
        ) {
          // Deflect from paddle
          ball.bounceFromPaddle(this.paddle);

          // Reset combo on paddle touch
          this.comboCount = 0;
          this.comboMultiplier = 1;
          this.hud.updateCombo(0, 1);

          // Audio
          const offsetFactor = (ball.x - this.paddle.x) / (this.paddle.width / 2);
          this.audio.playPaddleHit(offsetFactor);
          continue;
        }
      }

      // B. Block Collision Check
      this.checkBallBlockCollisions(ball);

      // C. Bottom Drain Check (Ball Lost)
      if (ball.y - ball.radius > ARENA_BOUNDS.bottom) {
        ball.destroy();
        this.balls.splice(i, 1);

        if (this.balls.length === 0) {
          this.handleAllBallsLost();
          break;
        }
      }
    }
  }

  private checkBallBlockCollisions(ball: Ball): void {
    for (let i = this.blocks.length - 1; i >= 0; i--) {
      const block = this.blocks[i];
      if (!block.active) continue;

      // Circle to AABB intersection check
      const bLeft = block.x;
      const bRight = block.x + block.width;
      const bTop = block.y;
      const bBottom = block.y + block.height;

      const closestX = Phaser.Math.Clamp(ball.x, bLeft, bRight);
      const closestY = Phaser.Math.Clamp(ball.y, bTop, bBottom);

      const distX = ball.x - closestX;
      const distY = ball.y - closestY;
      const distSq = distX * distX + distY * distY;

      if (distSq <= ball.radius * ball.radius) {
        // HIT DETECTED!
        if (ball.isFireball) {
          // Fireball pierces through without bouncing!
          this.damageBlock(block, 2, true);
          this.spawnFireSparks(closestX, closestY);
        } else {
          // Standard bounce physics: determine collision normal
          const overlapL = Math.abs(ball.x - bLeft);
          const overlapR = Math.abs(ball.x - bRight);
          const overlapT = Math.abs(ball.y - bTop);
          const overlapB = Math.abs(ball.y - bBottom);

          const minOverlap = Math.min(overlapL, overlapR, overlapT, overlapB);

          if (minOverlap === overlapL || minOverlap === overlapR) {
            ball.vx = -ball.vx;
            ball.x += ball.vx > 0 ? 2 : -2;
          } else {
            ball.vy = -ball.vy;
            ball.y += ball.vy > 0 ? 2 : -2;
          }

          ball.increaseSpeed();
          this.damageBlock(block, 1, false);
        }

        break; // Process one block collision per frame per ball
      }
    }
  }

  private damageBlock(block: Block, damage: number, fromFireball: boolean = false): void {
    const res = block.hit(damage);

    // Audio hit note (harmonic combo chime)
    this.comboCount++;
    this.comboMultiplier = Math.min(COMBO_CONFIG.maxMultiplier, 1 + Math.floor(this.comboCount / 2));
    this.audio.playBlockHit(this.comboCount);

    this.hud.updateCombo(this.comboCount, this.comboMultiplier);

    if (res.destroyed) {
      // Points
      const basePoints = block.def.points;
      const earned = basePoints * this.comboMultiplier;
      this.addScore(earned);

      // Sound & Shards
      this.audio.playBlockShatter();
      this.spawnShards(block.x + block.width / 2, block.y + block.height / 2, block.def.color, 12);

      // Popup text
      this.showScorePopup(block.x + block.width / 2, block.y, `+${earned}`, this.comboMultiplier >= 3);

      // Bomb AoE Explosion
      if (block.type === BlockType.Bomb) {
        this.triggerBombExplosion(block.x + block.width / 2, block.y + block.height / 2);
      }

      // Dropped PowerUp
      if (res.droppedPowerUp) {
        const p = new PowerUp(this, block.x + block.width / 2, block.y + block.height / 2, res.droppedPowerUp);
        this.powerUps.push(p);
      }

      // Stage completion check
      this.checkStageClear();
    } else {
      // Titanium or multi-hit block shake
      this.spawnShards(block.x + block.width / 2, block.y + block.height / 2, block.def.color, 4);
    }
  }

  private triggerBombExplosion(centerX: number, centerY: number): void {
    this.audio.playBombExplosion();
    this.cameras.main.shake(160, 0.012);

    // Shockwave graphical ring
    const ring = this.add.graphics().setDepth(22);
    ring.lineStyle(3, 0xef4444, 0.9);
    ring.strokeCircle(centerX, centerY, 15);

    this.tweens.add({
      targets: ring,
      scale: { from: 1, to: 4.5 },
      alpha: { from: 0.9, to: 0 },
      duration: 320,
      ease: 'Sine.easeOut',
      onComplete: () => ring.destroy(),
    });

    // AoE damage to neighboring blocks
    const radius = 95;
    for (const b of this.blocks) {
      if (!b.active) continue;
      const bx = b.x + b.width / 2;
      const by = b.y + b.height / 2;
      const dist = Phaser.Math.Distance.Between(centerX, centerY, bx, by);

      if (dist <= radius) {
        // Bomb blasts deal 2 damage to neighbors
        this.damageBlock(b, 2, false);
      }
    }
  }

  private updateLasers(): void {
    for (const laser of this.paddle.lasers) {
      if (!laser.active) continue;

      for (const block of this.blocks) {
        if (!block.active) continue;

        if (
          laser.x >= block.x &&
          laser.x <= block.x + block.width &&
          laser.y >= block.y &&
          laser.y <= block.y + block.height
        ) {
          laser.active = false;
          this.damageBlock(block, 1, false);
          this.spawnFireSparks(laser.x, laser.y);
          break;
        }
      }
    }
  }

  private updatePowerUps(dt: number): void {
    for (let i = this.powerUps.length - 1; i >= 0; i--) {
      const p = this.powerUps[i];
      if (!p.active) {
        this.powerUps.splice(i, 1);
        continue;
      }
      p.update(dt, this.paddle);
    }
  }

  private applyPowerUp(type: PowerUpType): void {
    this.audio.playPowerUpCollect();

    switch (type) {
      case PowerUpType.MultiBall: {
        // Clone existing balls or spawn 2 extra balls
        const refBall = this.balls.find((b) => !b.isLockedToPaddle) || this.balls[0];
        const originX = refBall ? refBall.x : this.paddle.x;
        const originY = refBall ? refBall.y : this.paddle.y - 18;

        const ballA = new Ball(this, originX, originY, false);
        ballA.launch(Phaser.Math.DegToRad(-60));
        if (this.fireballTimer > 0) ballA.setFireball(true);
        if (this.chronoTimer > 0) ballA.setSlowed(true);

        const ballB = new Ball(this, originX, originY, false);
        ballB.launch(Phaser.Math.DegToRad(-120));
        if (this.fireballTimer > 0) ballB.setFireball(true);
        if (this.chronoTimer > 0) ballB.setSlowed(true);

        this.balls.push(ballA, ballB);
        this.showToast(this.paddle.x, this.paddle.y - 45, 'TRI-BALL SPLIT!', '#38bdf8');
        break;
      }

      case PowerUpType.Laser: {
        this.paddle.activateLaser();
        this.showToast(this.paddle.x, this.paddle.y - 45, 'TWIN LASERS ONLINE!', '#f43f5e');
        break;
      }

      case PowerUpType.SafetyFloor: {
        this.paddle.activateSafetyFloor();
        this.showToast(this.paddle.x, this.paddle.y - 45, 'ENERGY BARRIER UP!', '#10b981');
        break;
      }

      case PowerUpType.Expand: {
        this.paddle.activateExpand();
        this.showToast(this.paddle.x, this.paddle.y - 45, 'PADDLE EXPANDED!', '#06b6d4');
        break;
      }

      case PowerUpType.Fireball: {
        this.fireballTimer = 8.5;
        this.balls.forEach((b) => b.setFireball(true));
        this.showToast(this.paddle.x, this.paddle.y - 45, 'PLASMA FIREBALL!', '#f97316');
        break;
      }

      case PowerUpType.ChronoSlow: {
        this.chronoTimer = 10.0;
        this.balls.forEach((b) => b.setSlowed(true));
        this.showToast(this.paddle.x, this.paddle.y - 45, 'CHRONO SLOWDOWN!', '#a855f7');
        break;
      }

      case PowerUpType.ExtraLife: {
        this.lives = Math.min(5, this.lives + 1);
        this.hud.updateLives(this.lives);
        this.showToast(this.paddle.x, this.paddle.y - 45, '+1 REPAIR CELL!', '#ec4899');
        break;
      }
    }
  }

  // ==========================================
  // LIFE LOSS & GAME OVER
  // ==========================================
  private handleAllBallsLost(): void {
    this.audio.playBallLost();
    this.cameras.main.shake(220, 0.015);

    this.lives--;
    this.hud.updateLives(this.lives);

    // Reset combos & active temporary buffs
    this.comboCount = 0;
    this.comboMultiplier = 1;
    this.hud.updateCombo(0, 1);
    this.fireballTimer = 0;
    this.chronoTimer = 0;

    if (this.lives > 0) {
      this.showToast(GAME_WIDTH / 2, 380, 'CORE COMPROMISED - BALL LOST', '#ef4444');
      this.spawnInitialBall();
    } else {
      this.isGameOver = true;
      this.audio.playGameOver();
      this.gameOverModal.show(this.score, this.bestScore, this.currentStageIndex);
    }
  }

  // ==========================================
  // STAGE CLEAR & ADVANCE
  // ==========================================
  private checkStageClear(): void {
    // Breakable blocks remaining?
    const breakables = this.blocks.filter((b) => b.active && b.type !== BlockType.Titanium);

    if (breakables.length === 0 && !this.isStageTransitioning) {
      this.isStageTransitioning = true;

      // Stage clear bonus
      const bonus = (this.currentStageIndex + 1) * 1000 + this.lives * 250;
      this.addScore(bonus);

      const stage = STAGES[this.currentStageIndex];

      if (this.currentStageIndex < STAGES.length - 1) {
        // Sector clear modal
        this.audio.playStageClear();
        this.stageClearModal.show(stage.id, stage.subtitle, bonus);
      } else {
        // Entire campaign cleared!
        this.audio.playVictory();
        this.victoryModal.show(this.score, this.bestScore);
      }
    }
  }

  private advanceToNextStage(): void {
    this.stageClearModal.hide();
    this.currentStageIndex++;
    this.loadStage(this.currentStageIndex);
  }

  // ==========================================
  // PAUSE & MODAL ACTIONS
  // ==========================================
  public pauseGame(): void {
    if (this.isPaused || this.isGameOver || this.isStageTransitioning) return;
    this.isPaused = true;
    this.pauseModal.show();
  }

  public resumeGame(): void {
    this.pauseModal.hide();
    this.isPaused = false;
  }

  public retryCurrentStage(): void {
    this.pauseModal.hide();
    this.isPaused = false;
    this.loadStage(this.currentStageIndex);
  }

  public restartGame(): void {
    this.gameOverModal.hide();
    this.victoryModal.hide();
    this.isGameOver = false;
    this.isPaused = false;

    this.score = 0;
    this.lives = 3;
    this.currentStageIndex = 0;
    this.hud.updateScore(this.score, this.bestScore);
    this.hud.updateLives(this.lives);

    this.loadStage(0);
  }

  public quitToMenu(): void {
    this.cameras.main.fadeOut(300, 5, 7, 14);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start('MenuScene');
    });
  }

  // ==========================================
  // SCORE & HIGH SCORE
  // ==========================================
  private addScore(pts: number): void {
    this.score += pts;
    if (this.score > this.bestScore) {
      this.bestScore = this.score;
      localStorage.setItem('blockbreaker_best_score', this.bestScore.toString());
    }
    this.hud.updateScore(this.score, this.bestScore);
  }

  // ==========================================
  // PARTICLES & POPUPS
  // ==========================================
  private spawnShards(x: number, y: number, color: number, count: number): void {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 70 + Math.random() * 220;
      this.shards.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color,
        alpha: 1.0,
        size: 3 + Math.random() * 3,
      });
    }
  }

  private spawnFireSparks(x: number, y: number): void {
    this.spawnShards(x, y, 0xf97316, 6);
  }

  private updateShards(dt: number): void {
    this.shardGfx.clear();

    for (let i = this.shards.length - 1; i >= 0; i--) {
      const s = this.shards[i];
      s.x += s.vx * dt;
      s.y += s.vy * dt;
      s.alpha -= dt * 2.8;

      if (s.alpha <= 0) {
        this.shards.splice(i, 1);
        continue;
      }

      this.shardGfx.fillStyle(s.color, s.alpha);
      this.shardGfx.fillRect(s.x - s.size / 2, s.y - s.size / 2, s.size, s.size);
    }
  }

  private showScorePopup(x: number, y: number, text: string, isCombo: boolean): void {
    const popup = createCrispText(this, x, y, text, {
      fontFamily: FONTS.RETRO,
      fontSize: isCombo ? '16px' : '12px',
      color: isCombo ? '#facc15' : '#ffffff',
      stroke: '#000000',
      strokeThickness: 2,
    })
      .setOrigin(0.5)
      .setDepth(25);

    this.tweens.add({
      targets: popup,
      y: y - 28,
      alpha: 0,
      duration: 650,
      ease: 'Sine.easeOut',
      onComplete: () => popup.destroy(),
    });
  }

  private showToast(x: number, y: number, msg: string, color: string = '#00f0ff', fontSize: number = 14): void {
    const toast = createCrispText(this, x, y, msg, {
      fontFamily: FONTS.RETRO,
      fontSize: `${fontSize}px`,
      color,
      stroke: '#000000',
      strokeThickness: 3,
    })
      .setOrigin(0.5)
      .setDepth(35)
      .setAlpha(0);

    this.tweens.add({
      targets: toast,
      alpha: 1,
      y: y - 10,
      duration: 200,
      yoyo: true,
      hold: 800,
      ease: 'Sine.easeInOut',
      onComplete: () => toast.destroy(),
    });
  }
}
