import Phaser from 'phaser';
import { WeaponType, WEAPON_INFOS, GAME_WIDTH, GAME_HEIGHT } from '../config.js';
import { Enemy } from './Enemy.js';

export class Projectile {
  public scene: Phaser.Scene;
  public x: number;
  public y: number;
  public vx: number;
  public vy: number;
  public type: WeaponType;
  public radius: number;
  public damage: number = 1;
  public penetrationsLeft: number = 1;
  public active: boolean = true;
  public color: number;

  private graphics: Phaser.GameObjects.Graphics;
  private trail: Array<{ x: number; y: number; alpha: number }> = [];
  private targetEnemy?: Enemy;
  private homingTurnRate: number = 5.5; // radians per second
  private speed: number;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    angleRad: number,
    type: WeaponType = WeaponType.Standard,
    target?: Enemy
  ) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.type = type;
    this.targetEnemy = target;

    const info = WEAPON_INFOS[type];
    this.color = info.color;

    switch (type) {
      case WeaponType.Railgun:
        this.speed = 880;
        this.radius = 5;
        this.damage = 2;
        this.penetrationsLeft = 4;
        break;
      case WeaponType.Homing:
        this.speed = 460;
        this.radius = 4;
        this.damage = 1.5;
        this.penetrationsLeft = 1;
        break;
      case WeaponType.Triple:
        this.speed = 580;
        this.radius = 4;
        this.damage = 1;
        this.penetrationsLeft = 1;
        break;
      case WeaponType.Standard:
      default:
        this.speed = 520;
        this.radius = 4;
        this.damage = 1;
        this.penetrationsLeft = 1;
        break;
    }

    this.vx = Math.cos(angleRad) * this.speed;
    this.vy = Math.sin(angleRad) * this.speed;

    this.graphics = scene.add.graphics();
    this.graphics.setDepth(15);
    this.draw();
  }

  public update(dt: number, activeEnemies: Enemy[] = []): void {
    if (!this.active) return;

    // Homing Steering Logic
    if (this.type === WeaponType.Homing) {
      if (!this.targetEnemy || !this.targetEnemy.active) {
        // Find nearest active enemy
        let nearestDist = Infinity;
        let chosen: Enemy | undefined;
        for (const e of activeEnemies) {
          if (!e.active) continue;
          const dist = Phaser.Math.Distance.Between(this.x, this.y, e.x, e.y);
          if (dist < nearestDist) {
            nearestDist = dist;
            chosen = e;
          }
        }
        this.targetEnemy = chosen;
      }

      if (this.targetEnemy && this.targetEnemy.active) {
        const targetAngle = Phaser.Math.Angle.Between(this.x, this.y, this.targetEnemy.x, this.targetEnemy.y);
        const currentAngle = Math.atan2(this.vy, this.vx);
        const newAngle = Phaser.Math.Angle.RotateTo(currentAngle, targetAngle, this.homingTurnRate * dt);
        this.vx = Math.cos(newAngle) * this.speed;
        this.vy = Math.sin(newAngle) * this.speed;
      }
    }

    // Trail
    this.trail.push({ x: this.x, y: this.y, alpha: 0.6 });
    if (this.trail.length > 5) {
      this.trail.shift();
    }
    for (const t of this.trail) {
      t.alpha -= dt * 3.5;
    }

    this.x += this.vx * dt;
    this.y += this.vy * dt;

    // Bounds check
    const margin = 30;
    if (
      this.x < -margin ||
      this.x > GAME_WIDTH + margin ||
      this.y < -margin ||
      this.y > GAME_HEIGHT + margin
    ) {
      this.destroy();
      return;
    }

    this.draw();
  }

  private draw(): void {
    this.graphics.clear();

    // 1. Trail
    for (const t of this.trail) {
      if (t.alpha > 0.05) {
        this.graphics.fillStyle(this.color, t.alpha * 0.4);
        this.graphics.fillCircle(t.x, t.y, this.radius * 0.7);
      }
    }

    // 2. Glow
    this.graphics.fillStyle(this.color, 0.4);
    this.graphics.fillCircle(this.x, this.y, this.radius + 3);

    // 3. Core
    this.graphics.fillStyle(0xffffff, 0.95);
    this.graphics.fillCircle(this.x, this.y, this.radius);

    if (this.type === WeaponType.Railgun) {
      // Extended beam line
      const backX = this.x - (this.vx / this.speed) * 16;
      const backY = this.y - (this.vy / this.speed) * 16;
      this.graphics.lineStyle(3, this.color, 0.85);
      this.graphics.lineBetween(this.x, this.y, backX, backY);
    }
  }

  public onHit(): boolean {
    this.penetrationsLeft--;
    if (this.penetrationsLeft <= 0) {
      this.destroy();
      return true; // spent
    }
    return false; // keeps piercing
  }

  public destroy(): void {
    this.active = false;
    this.graphics.destroy();
  }
}
