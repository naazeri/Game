import Phaser from 'phaser';
import { PADDLE_CONFIG, ARENA_BOUNDS, COLORS } from '../config.js';

export interface LaserBeam {
  x: number;
  y: number;
  vy: number;
  active: boolean;
}

export class Paddle {
  public scene: Phaser.Scene;
  public x: number;
  public y: number = PADDLE_CONFIG.y;
  public width: number = PADDLE_CONFIG.baseWidth;
  public height: number = PADDLE_CONFIG.height;

  // Active Buffs
  public isLaserActive: boolean = false;
  public laserTimer: number = 0;
  public laserCooldown: number = 0;

  public isExpandActive: boolean = false;
  public expandTimer: number = 0;

  public isSafetyFloorActive: boolean = false;
  public safetyFloorTimer: number = 0;

  // Lasers fired by paddle
  public lasers: LaserBeam[] = [];

  private graphics: Phaser.GameObjects.Graphics;
  private laserGfx: Phaser.GameObjects.Graphics;
  private floorGfx: Phaser.GameObjects.Graphics;
  private lastX: number = 0;
  public velocityX: number = 0;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.x = (ARENA_BOUNDS.left + ARENA_BOUNDS.right) / 2;
    this.lastX = this.x;

    this.graphics = scene.add.graphics().setDepth(15);
    this.laserGfx = scene.add.graphics().setDepth(14);
    this.floorGfx = scene.add.graphics().setDepth(12);

    this.draw();
  }

  public setPositionX(targetX: number): void {
    const halfW = this.width / 2;
    const clampedX = Phaser.Math.Clamp(
      targetX,
      ARENA_BOUNDS.left + halfW,
      ARENA_BOUNDS.right - halfW
    );
    this.x = clampedX;
  }

  public activateLaser(): void {
    this.isLaserActive = true;
    this.laserTimer = PADDLE_CONFIG.laserDuration;
    this.laserCooldown = 0.1;
  }

  public activateExpand(): void {
    this.isExpandActive = true;
    this.expandTimer = PADDLE_CONFIG.expandDuration;
    this.scene.tweens.add({
      targets: this,
      width: PADDLE_CONFIG.expandedWidth,
      duration: 250,
      ease: 'Back.easeOut',
    });
  }

  public activateSafetyFloor(): void {
    this.isSafetyFloorActive = true;
    this.safetyFloorTimer = PADDLE_CONFIG.shieldDuration;
  }

  public update(dt: number): void {
    // Velocity tracking
    this.velocityX = (this.x - this.lastX) / Math.max(0.001, dt);
    this.lastX = this.x;

    // Laser timer countdown
    if (this.isLaserActive) {
      this.laserTimer -= dt;
      this.laserCooldown -= dt;
      if (this.laserTimer <= 0) {
        this.isLaserActive = false;
        this.laserTimer = 0;
      }
    }

    // Expand timer countdown
    if (this.isExpandActive) {
      this.expandTimer -= dt;
      if (this.expandTimer <= 0) {
        this.isExpandActive = false;
        this.expandTimer = 0;
        this.scene.tweens.add({
          targets: this,
          width: PADDLE_CONFIG.baseWidth,
          duration: 250,
          ease: 'Sine.easeInOut',
        });
      }
    }

    // Safety Floor timer countdown
    if (this.isSafetyFloorActive) {
      this.safetyFloorTimer -= dt;
      if (this.safetyFloorTimer <= 0) {
        this.isSafetyFloorActive = false;
        this.safetyFloorTimer = 0;
      }
    }

    // Update active lasers
    for (let i = this.lasers.length - 1; i >= 0; i--) {
      const laser = this.lasers[i];
      laser.y += laser.vy * dt;
      if (laser.y < ARENA_BOUNDS.top) {
        laser.active = false;
        this.lasers.splice(i, 1);
      }
    }

    this.draw();
  }

  public tryFireLaser(): boolean {
    if (!this.isLaserActive || this.laserCooldown > 0) return false;

    this.laserCooldown = PADDLE_CONFIG.laserFireRate;
    const cannonOffset = this.width / 2 - 8;
    const speed = -820;

    // Left cannon
    this.lasers.push({
      x: this.x - cannonOffset,
      y: this.y - 12,
      vy: speed,
      active: true,
    });

    // Right cannon
    this.lasers.push({
      x: this.x + cannonOffset,
      y: this.y - 12,
      vy: speed,
      active: true,
    });

    return true;
  }

  /**
   * Calculates deliberate deflection angle for the ball based on paddle hit offset.
   * Returns angle in radians (pointing upward).
   */
  public getDeflectionAngle(ballX: number): number {
    const halfW = this.width / 2;
    const rawOffset = (ballX - this.x) / halfW;
    const offset = Phaser.Math.Clamp(rawOffset, -0.96, 0.96);

    // Center zone: near vertical reflection (around -90 degrees)
    // Edge zones: angles up to -35 degrees (right) or -145 degrees (left)
    const baseAngleDeg = -90 + offset * 58;

    // Add spin from paddle motion
    const spinFactor = Phaser.Math.Clamp(this.velocityX * 0.015, -10, 10);
    const finalAngleDeg = Phaser.Math.Clamp(baseAngleDeg + spinFactor, -155, -25);

    return Phaser.Math.DegToRad(finalAngleDeg);
  }

  public getBounds(): Phaser.Geom.Rectangle {
    return new Phaser.Geom.Rectangle(
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height
    );
  }

  public draw(): void {
    this.graphics.clear();
    const halfW = this.width / 2;
    const halfH = this.height / 2;
    const px = this.x - halfW;
    const py = this.y - halfH;

    // Outer glow
    this.graphics.fillStyle(this.isLaserActive ? 0xf43f5e : 0x00f0ff, 0.22);
    this.graphics.fillRoundedRect(px - 3, py - 3, this.width + 6, this.height + 6, 8);

    // Paddle body
    this.graphics.fillStyle(0x0e172a, 0.95);
    this.graphics.fillRoundedRect(px, py, this.width, this.height, 6);

    // Top neon edge highlight
    this.graphics.lineStyle(2, this.isLaserActive ? 0xf43f5e : 0x00f0ff, 1);
    this.graphics.strokeRoundedRect(px, py, this.width, this.height, 6);

    // Center precision indicator
    this.graphics.fillStyle(0xffffff, 0.85);
    this.graphics.fillRect(this.x - 6, py + 2, 12, 3);

    // Laser cannons on sides if active
    if (this.isLaserActive) {
      const cannonL = px + 6;
      const cannonR = px + this.width - 6;

      this.graphics.fillStyle(0xf43f5e, 1);
      this.graphics.fillRect(cannonL - 3, py - 7, 6, 7);
      this.graphics.fillRect(cannonR - 3, py - 7, 6, 7);
    }

    // Draw active lasers
    this.laserGfx.clear();
    if (this.lasers.length > 0) {
      for (const laser of this.lasers) {
        if (!laser.active) continue;
        // Glow
        this.laserGfx.fillStyle(0xf43f5e, 0.35);
        this.laserGfx.fillRoundedRect(laser.x - 3, laser.y - 12, 6, 16, 2);
        // Core
        this.laserGfx.fillStyle(0xffffff, 1);
        this.laserGfx.fillRoundedRect(laser.x - 1.5, laser.y - 10, 3, 14, 1);
      }
    }

    // Safety Energy Floor at bottom if active
    this.floorGfx.clear();
    if (this.isSafetyFloorActive) {
      const floorY = ARENA_BOUNDS.bottom - 2;
      const t = Date.now() / 150;
      const alpha = 0.65 + Math.sin(t) * 0.25;

      // Glow beam
      this.floorGfx.lineStyle(4, 0x10b981, alpha);
      this.floorGfx.lineBetween(ARENA_BOUNDS.left, floorY, ARENA_BOUNDS.right, floorY);

      // Core white laser line
      this.floorGfx.lineStyle(1.5, 0xffffff, 0.9);
      this.floorGfx.lineBetween(ARENA_BOUNDS.left, floorY, ARENA_BOUNDS.right, floorY);
    }
  }

  public destroy(): void {
    this.graphics.destroy();
    this.laserGfx.destroy();
    this.floorGfx.destroy();
  }
}
