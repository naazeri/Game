import Phaser from 'phaser';
import { BALL_CONFIG } from '../config.js';

interface TrailParticle {
  x: number;
  y: number;
  alpha: number;
  size: number;
}

export class Ball {
  public scene: Phaser.Scene;
  public x: number;
  public y: number;
  public vx: number = 0;
  public vy: number = 0;
  public radius: number = BALL_CONFIG.radius;
  public currentSpeed: number = BALL_CONFIG.initialSpeed;
  public rallyCount: number = 0;
  public active: boolean = false;
  public lastHitter: 'left' | 'right' | null = null;

  public isHyper: boolean = false;
  public hyperTimer: number = 0;

  private graphics: Phaser.GameObjects.Graphics;
  private trail: TrailParticle[] = [];
  private trailTimer: number = 0;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.graphics = scene.add.graphics();
    this.graphics.setDepth(20);
    this.draw();
  }

  public activateHyper(durationSec: number = 4.5): void {
    this.isHyper = true;
    this.hyperTimer = durationSec;
    this.currentSpeed = Math.min(this.currentSpeed + 220, BALL_CONFIG.maxSpeed + 150);
    const currentMag = Math.hypot(this.vx, this.vy);
    if (currentMag > 0.001) {
      this.vx = (this.vx / currentMag) * this.currentSpeed;
      this.vy = (this.vy / currentMag) * this.currentSpeed;
    }
  }

  public serve(towardsLeft: boolean): void {
    this.active = true;
    this.currentSpeed = BALL_CONFIG.initialSpeed;
    this.rallyCount = 0;
    this.trail = [];
    this.lastHitter = null;
    this.isHyper = false;
    this.hyperTimer = 0;

    // Serve with a clean launch angle (around -30 to +30 degrees)
    const angleRad = Phaser.Math.DegToRad(Phaser.Math.Between(-30, 30));
    const dirX = towardsLeft ? -1 : 1;

    this.vx = dirX * this.currentSpeed * Math.cos(angleRad);
    this.vy = this.currentSpeed * Math.sin(angleRad);

    // Ensure minimum X speed
    if (Math.abs(this.vx) < BALL_CONFIG.minXSpeed) {
      this.vx = dirX * BALL_CONFIG.minXSpeed;
    }
  }

  public stop(): void {
    this.active = false;
    this.vx = 0;
    this.vy = 0;
    this.isHyper = false;
    this.hyperTimer = 0;
    this.trail = [];
    this.draw();
  }

  public update(dt: number): void {
    if (!this.active) {
      this.draw();
      return;
    }

    if (this.hyperTimer > 0) {
      this.hyperTimer -= dt;
      if (this.hyperTimer <= 0) {
        this.isHyper = false;
      }
    }

    // Spawn trail particles
    this.trailTimer += dt;
    const interval = this.isHyper ? 0.01 : 0.02;
    if (this.trailTimer >= interval) {
      this.trailTimer = 0;
      this.trail.push({
        x: this.x,
        y: this.y,
        alpha: this.isHyper ? 0.75 : 0.5,
        size: this.radius * (this.isHyper ? 1.0 : 0.85),
      });
      const maxTrail = this.isHyper ? 14 : 8;
      if (this.trail.length > maxTrail) {
        this.trail.shift();
      }
    }

    // Age trail particles
    for (const p of this.trail) {
      p.alpha -= dt * (this.isHyper ? 1.8 : 2.5);
      p.size -= dt * 3.5;
    }
    this.trail = this.trail.filter((p) => p.alpha > 0.05 && p.size > 1);

    // Update position
    this.x += this.vx * dt;
    this.y += this.vy * dt;

    this.draw();
  }

  public boostSpeed(): void {
    this.rallyCount++;
    this.currentSpeed = Math.min(
      this.currentSpeed + BALL_CONFIG.speedIncrement,
      this.isHyper ? BALL_CONFIG.maxSpeed + 150 : BALL_CONFIG.maxSpeed
    );

    // Normalize velocity vector and scale to new speed
    const currentMag = Math.hypot(this.vx, this.vy);
    if (currentMag > 0.001) {
      this.vx = (this.vx / currentMag) * this.currentSpeed;
      this.vy = (this.vy / currentMag) * this.currentSpeed;
    }

    // Guarantee minimum X speed
    if (Math.abs(this.vx) < BALL_CONFIG.minXSpeed) {
      const sign = Math.sign(this.vx) || 1;
      this.vx = sign * BALL_CONFIG.minXSpeed;
    }
  }

  public getHeatColor(): number {
    if (this.isHyper) return 0xfacc15; // Hyper Electric Yellow / Gold
    if (this.rallyCount >= 10) return 0xff0055; // Blazing neon red/magenta
    if (this.rallyCount >= 5) return 0xff8c00;  // Fiery amber
    return 0x00f0ff; // Neon cyan
  }

  public draw(): void {
    this.graphics.clear();

    const heatColor = this.getHeatColor();

    if (!this.active && this.trail.length === 0) {
      // Resting / serving pulse ball
      this.graphics.fillStyle(heatColor, 0.3);
      this.graphics.fillCircle(this.x, this.y, this.radius + 4);
      this.graphics.fillStyle(0xffffff, 1.0);
      this.graphics.fillCircle(this.x, this.y, this.radius);
      return;
    }

    // Draw trail
    for (const p of this.trail) {
      this.graphics.fillStyle(heatColor, p.alpha * 0.45);
      this.graphics.fillCircle(p.x, p.y, Math.max(1, p.size));
    }

    // Draw Outer Glow (larger glow when heating up)
    const glowRadius = this.rallyCount >= 10 ? this.radius + 8 : this.rallyCount >= 5 ? this.radius + 6 : this.radius + 4;
    this.graphics.fillStyle(heatColor, 0.4);
    this.graphics.fillCircle(this.x, this.y, glowRadius);

    // Draw Ball Body
    this.graphics.fillStyle(0xffffff, 1.0);
    this.graphics.fillCircle(this.x, this.y, this.radius);
  }

  public destroy(): void {
    this.graphics.destroy();
  }
}
