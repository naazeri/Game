import Phaser from 'phaser';
import { PADDLE_CONFIG } from '../config.js';

export class Paddle {
  public scene: Phaser.Scene;
  public x: number;
  public y: number;
  public vy: number = 0;
  public targetDir: number = 0; // -1: up, 0: neutral, 1: down
  public width: number = PADDLE_CONFIG.width;
  public height: number = PADDLE_CONFIG.height;
  public radius: number = PADDLE_CONFIG.radius;
  public color: number;
  public graphics: Phaser.GameObjects.Graphics;

  public isFrozen: boolean = false;
  private freezeTimer: number = 0;
  private extendTimer: number = 0;

  constructor(scene: Phaser.Scene, x: number, y: number, color: number) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.color = color;
    this.graphics = scene.add.graphics();
    this.graphics.setDepth(15);
    this.draw();
  }

  public setColor(newColor: number): void {
    this.color = newColor;
    this.draw();
  }

  public freeze(durationSec: number): void {
    this.isFrozen = true;
    this.freezeTimer = durationSec;
    this.vy = 0;
  }

  public extend(durationSec: number): void {
    this.extendTimer = durationSec;
    this.height = 126;
  }

  public setDirection(dir: number): void {
    this.targetDir = dir;
  }

  public update(dt: number, topLimit: number, bottomLimit: number): void {
    // Handle Freeze countdown
    if (this.freezeTimer > 0) {
      this.freezeTimer -= dt;
      if (this.freezeTimer <= 0) {
        this.isFrozen = false;
        this.freezeTimer = 0;
      }
    }

    // Handle Extend countdown
    if (this.extendTimer > 0) {
      this.extendTimer -= dt;
      if (this.extendTimer <= 0) {
        this.height = PADDLE_CONFIG.height;
        this.extendTimer = 0;
      }
    }

    if (this.isFrozen) {
      // Frozen completely: cannot move
      this.vy = 0;
    } else if (this.targetDir !== 0) {
      // Continuous acceleration on ice
      this.vy += this.targetDir * PADDLE_CONFIG.acceleration * dt;
      this.vy = Phaser.Math.Clamp(this.vy, -PADDLE_CONFIG.maxSpeed, PADDLE_CONFIG.maxSpeed);
    } else {
      // Viscous ice damping (exponential decay)
      this.vy *= Math.exp(-PADDLE_CONFIG.iceFriction * dt);
      if (Math.abs(this.vy) < 1.0) {
        this.vy = 0;
      }
    }

    this.y += this.vy * dt;

    // Boundary constraints with soft bounce restitution
    const minY = topLimit + this.height / 2;
    const maxY = bottomLimit - this.height / 2;

    if (this.y < minY) {
      this.y = minY;
      this.vy = -this.vy * PADDLE_CONFIG.wallRestitution;
    } else if (this.y > maxY) {
      this.y = maxY;
      this.vy = -this.vy * PADDLE_CONFIG.wallRestitution;
    }

    this.draw();
  }

  public draw(): void {
    this.graphics.clear();

    const left = this.x - this.width / 2;
    const top = this.y - this.height / 2;

    if (this.isFrozen) {
      // Frozen ice block styling
      this.graphics.fillStyle(0x38bdf8, 0.45);
      this.graphics.fillRoundedRect(left - 6, top - 6, this.width + 12, this.height + 12, this.radius + 6);

      this.graphics.fillStyle(0x93c5fd, 0.9);
      this.graphics.fillRoundedRect(left, top, this.width, this.height, this.radius);

      this.graphics.lineStyle(2, 0xffffff, 0.95);
      this.graphics.strokeRoundedRect(left - 2, top - 2, this.width + 4, this.height + 4, this.radius + 2);
      return;
    }

    // Normal or Extended styling
    const glowColor = this.extendTimer > 0 ? 0x22c55e : this.color;

    // 1. Soft Outer Neon Glow
    this.graphics.fillStyle(glowColor, this.extendTimer > 0 ? 0.35 : 0.15);
    this.graphics.fillRoundedRect(left - 5, top - 5, this.width + 10, this.height + 10, this.radius + 5);

    // 2. Solid Body (Capsule with rounded radius)
    this.graphics.fillStyle(this.color, 0.95);
    this.graphics.fillRoundedRect(left, top, this.width, this.height, this.radius);

    // 3. Inner White Core / Highlight
    this.graphics.fillStyle(0xffffff, 0.7);
    this.graphics.fillRoundedRect(left + 3, top + 5, this.width - 6, this.height - 10, this.radius - 2);

    // If extended, draw an extra top/bottom extension indicator
    if (this.extendTimer > 0) {
      this.graphics.lineStyle(2, 0x22c55e, 0.9);
      this.graphics.strokeRoundedRect(left - 2, top - 2, this.width + 4, this.height + 4, this.radius + 2);
    }
  }

  public reset(y: number): void {
    this.y = y;
    this.vy = 0;
    this.targetDir = 0;
    this.isFrozen = false;
    this.freezeTimer = 0;
    this.extendTimer = 0;
    this.height = PADDLE_CONFIG.height;
    this.draw();
  }

  public destroy(): void {
    this.graphics.destroy();
  }
}
