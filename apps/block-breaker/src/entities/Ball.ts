import Phaser from 'phaser';
import { BALL_CONFIG, ARENA_BOUNDS } from '../config.js';
import { Paddle } from './Paddle.js';

interface TrailPoint {
  x: number;
  y: number;
  alpha: number;
}

export class Ball {
  public scene: Phaser.Scene;
  public x: number = 0;
  public y: number = 0;
  public vx: number = 0;
  public vy: number = 0;
  public radius: number = BALL_CONFIG.radius;
  public speed: number = BALL_CONFIG.baseSpeed;

  public isLockedToPaddle: boolean = true;
  public paddleOffsetX: number = 0;
  public isFireball: boolean = false;
  public isSlowed: boolean = false;
  public active: boolean = true;

  private graphics: Phaser.GameObjects.Graphics;
  private trajectoryGraphics: Phaser.GameObjects.Graphics;
  private trail: TrailPoint[] = [];
  private horizontalStuckTimer: number = 0;

  constructor(scene: Phaser.Scene, initialX: number, initialY: number, isLocked: boolean = true) {
    this.scene = scene;
    this.x = initialX;
    this.y = initialY;
    this.isLockedToPaddle = isLocked;

    this.graphics = scene.add.graphics().setDepth(20);
    this.trajectoryGraphics = scene.add.graphics().setDepth(18);

    this.draw();
  }

  public lockToPaddle(paddle: Paddle, offsetX: number = 0): void {
    this.isLockedToPaddle = true;
    this.paddleOffsetX = offsetX;
    this.x = paddle.x + this.paddleOffsetX;
    this.y = paddle.y + BALL_CONFIG.launchYOffset;
    this.vx = 0;
    this.vy = 0;
  }

  public launch(angleRad?: number): void {
    if (!this.isLockedToPaddle) return;

    this.isLockedToPaddle = false;
    const launchAngle = angleRad !== undefined ? angleRad : Phaser.Math.DegToRad(-90 + (Math.random() - 0.5) * 30);
    this.vx = Math.cos(launchAngle) * this.speed;
    this.vy = Math.sin(launchAngle) * this.speed;
    this.trajectoryGraphics.clear();
  }

  public setFireball(active: boolean): void {
    this.isFireball = active;
  }

  public setSlowed(active: boolean): void {
    this.isSlowed = active;
  }

  public update(dt: number, paddle: Paddle): void {
    if (!this.active) return;

    if (this.isLockedToPaddle) {
      this.x = paddle.x + this.paddleOffsetX;
      this.y = paddle.y + BALL_CONFIG.launchYOffset;
      this.drawTrajectory();
      this.draw();
      return;
    }

    // Effective speed with chrono slow
    const speedMultiplier = this.isSlowed ? BALL_CONFIG.slowdownFactor : 1.0;

    // Move ball
    this.x += this.vx * dt * speedMultiplier;
    this.y += this.vy * dt * speedMultiplier;

    // Trail recording
    this.trail.unshift({ x: this.x, y: this.y, alpha: 0.75 });
    if (this.trail.length > 7) {
      this.trail.pop();
    }
    for (const pt of this.trail) {
      pt.alpha -= dt * 3.5;
    }

    // Arena Wall Collisions (Left, Right, Top)
    if (this.x - this.radius <= ARENA_BOUNDS.left) {
      this.x = ARENA_BOUNDS.left + this.radius;
      this.vx = Math.abs(this.vx);
      this.triggerWallImpact();
    } else if (this.x + this.radius >= ARENA_BOUNDS.right) {
      this.x = ARENA_BOUNDS.right - this.radius;
      this.vx = -Math.abs(this.vx);
      this.triggerWallImpact();
    }

    if (this.y - this.radius <= ARENA_BOUNDS.top) {
      this.y = ARENA_BOUNDS.top + this.radius;
      this.vy = Math.abs(this.vy);
      this.triggerWallImpact();
    }

    // Safety Energy Barrier collision if active
    if (paddle.isSafetyFloorActive) {
      const floorY = ARENA_BOUNDS.bottom - 4;
      if (this.y + this.radius >= floorY && this.vy > 0) {
        this.y = floorY - this.radius;
        this.vy = -Math.abs(this.vy);
        this.scene.events.emit('floor-bounce', this);
      }
    }

    // Anti-horizontal stuck check
    if (Math.abs(this.vy) < 55) {
      this.horizontalStuckTimer += dt;
      if (this.horizontalStuckTimer > 0.75) {
        this.horizontalStuckTimer = 0;
        this.vy = (this.vy >= 0 ? 1 : -1) * 110;
        this.normalizeSpeed();
      }
    } else {
      this.horizontalStuckTimer = 0;
    }

    this.draw();
  }

  public bounceFromPaddle(paddle: Paddle): void {
    // Increase speed slightly per paddle hit
    this.speed = Math.min(BALL_CONFIG.maxSpeed, this.speed + BALL_CONFIG.speedStep);

    // Calculate angle from paddle contact
    const angleRad = paddle.getDeflectionAngle(this.x);
    this.vx = Math.cos(angleRad) * this.speed;
    this.vy = Math.sin(angleRad) * this.speed;

    // Lift ball above paddle
    this.y = paddle.y - paddle.height / 2 - this.radius - 1;
  }

  public normalizeSpeed(): void {
    const curSpeed = Math.hypot(this.vx, this.vy);
    if (curSpeed > 0) {
      this.vx = (this.vx / curSpeed) * this.speed;
      this.vy = (this.vy / curSpeed) * this.speed;
    }
  }

  public increaseSpeed(step: number = BALL_CONFIG.speedStep): void {
    this.speed = Math.min(BALL_CONFIG.maxSpeed, this.speed + step);
    this.normalizeSpeed();
  }

  private triggerWallImpact(): void {
    this.scene.events.emit('wall-bounce', this);
  }

  private drawTrajectory(): void {
    this.trajectoryGraphics.clear();
    const dotsCount = 5;
    const dotSpacing = 16;
    const t = Date.now() / 200;

    for (let i = 1; i <= dotsCount; i++) {
      const dy = -i * dotSpacing;
      const alpha = 0.8 - (i / dotsCount) * 0.5 + Math.sin(t + i) * 0.15;
      this.trajectoryGraphics.fillStyle(0x00f0ff, Phaser.Math.Clamp(alpha, 0.2, 0.9));
      this.trajectoryGraphics.fillCircle(this.x, this.y + dy, 2.5);
    }
  }

  public draw(): void {
    this.graphics.clear();

    const color = this.isFireball ? 0xf97316 : 0xffffff;
    const glowColor = this.isFireball ? 0xfbbf24 : 0x00f0ff;

    // Motion Trail
    for (const pt of this.trail) {
      if (pt.alpha <= 0.05) continue;
      this.graphics.fillStyle(glowColor, pt.alpha * 0.35);
      this.graphics.fillCircle(pt.x, pt.y, this.radius * 0.85);
    }

    // Outer Glow
    this.graphics.fillStyle(glowColor, this.isFireball ? 0.45 : 0.3);
    this.graphics.fillCircle(this.x, this.y, this.radius + 4);

    // Ball Core
    this.graphics.fillStyle(color, 1);
    this.graphics.fillCircle(this.x, this.y, this.radius);

    // Inner bright center
    this.graphics.fillStyle(0xffffff, 0.9);
    this.graphics.fillCircle(this.x - 1.5, this.y - 1.5, this.radius * 0.4);
  }

  public destroy(): void {
    this.active = false;
    this.graphics.destroy();
    this.trajectoryGraphics.destroy();
  }
}
