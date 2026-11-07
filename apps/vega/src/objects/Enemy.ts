import Phaser from 'phaser';
import { EnemyType, CENTER_X, CENTER_Y } from '../config.js';

export class Enemy {
  public scene: Phaser.Scene;
  public x: number;
  public y: number;
  public vx: number = 0;
  public vy: number = 0;
  public radius: number;
  public maxRadius: number;
  public type: EnemyType;
  public color: number;
  public colorHex: string;
  public hp: number;
  public maxHp: number;
  public speed: number;
  public active: boolean = true;
  public rotation: number = 0;
  public rotationSpeed: number;
  public isSplitFragment: boolean = false;

  public wave: number = 1;
  public shootTimer: number = 0;
  public onFireCounter?: (x: number, y: number, targetAngle: number) => void;

  private graphics: Phaser.GameObjects.Graphics;
  private vertices: Array<{ x: number; y: number }> = [];
  private weavePhase: number = 0;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    type: EnemyType = EnemyType.Asteroid,
    isFragment: boolean = false,
    wave: number = 1
  ) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.type = type;
    this.isSplitFragment = isFragment;
    this.wave = wave;
    this.rotationSpeed = Phaser.Math.FloatBetween(-1.5, 1.5);

    const speedScale = 1 + Math.min(0.45, (wave - 1) * 0.035);

    switch (type) {
      case EnemyType.Drone:
        this.radius = 14;
        this.maxHp = 1;
        this.speed = Phaser.Math.FloatBetween(120, 150) * speedScale;
        this.color = 0x38bdf8; // Electric Cyan
        this.colorHex = '#38bdf8';
        break;

      case EnemyType.Cruiser:
        this.radius = 28;
        this.maxHp = 4 + Math.min(3, Math.floor(wave / 4));
        this.speed = Phaser.Math.FloatBetween(45, 65) * speedScale;
        this.color = 0xa855f7; // Neon Purple
        this.colorHex = '#a855f7';
        break;

      case EnemyType.Splitter:
        this.radius = 20;
        this.maxHp = 2;
        this.speed = Phaser.Math.FloatBetween(70, 95) * speedScale;
        this.color = 0xf97316; // Radiant Orange
        this.colorHex = '#f97316';
        break;

      case EnemyType.Dreadnought:
        this.radius = 38;
        this.maxHp = 14 + Math.max(0, (Math.floor(wave / 5) - 1)) * 8;
        this.speed = 36 * Math.min(1.25, speedScale);
        this.color = 0xef4444; // Crimson Red
        this.colorHex = '#ef4444';
        break;

      case EnemyType.Asteroid:
      default:
        this.radius = isFragment ? 12 : Phaser.Math.FloatBetween(18, 26);
        this.maxHp = isFragment ? 1 : 2;
        this.speed = (isFragment ? Phaser.Math.FloatBetween(80, 110) : Phaser.Math.FloatBetween(55, 80)) * speedScale;
        this.color = isFragment ? 0xfacc15 : 0xeab308; // Magma Amber
        this.colorHex = '#facc15';
        break;
    }

    this.hp = this.maxHp;
    this.maxRadius = this.radius;
    this.generateShape();

    this.graphics = scene.add.graphics();
    this.graphics.setDepth(10);
    this.draw();
  }

  private generateShape(): void {
    this.vertices = [];
    const count = this.type === EnemyType.Cruiser ? 6 : this.type === EnemyType.Drone ? 3 : 8;

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      let r = this.radius;
      if (this.type === EnemyType.Asteroid) {
        r *= Phaser.Math.FloatBetween(0.8, 1.25);
      }
      this.vertices.push({
        x: Math.cos(angle) * r,
        y: Math.sin(angle) * r,
      });
    }
  }

  public update(dt: number, slowFactor: number = 1.0): void {
    if (!this.active) return;

    this.rotation += this.rotationSpeed * dt * slowFactor;

    // Direction vector towards player core at (CENTER_X, CENTER_Y)
    const angleToPlayer = Phaser.Math.Angle.Between(this.x, this.y, CENTER_X, CENTER_Y);

    if (this.type === EnemyType.Drone) {
      // Drones weave erratically
      this.weavePhase += dt * 4.0;
      const perpAngle = angleToPlayer + Math.PI / 2;
      const weaveOffset = Math.sin(this.weavePhase) * 60;
      this.vx = (Math.cos(angleToPlayer) * this.speed + Math.cos(perpAngle) * weaveOffset) * slowFactor;
      this.vy = (Math.sin(angleToPlayer) * this.speed + Math.sin(perpAngle) * weaveOffset) * slowFactor;
    } else {
      this.vx = Math.cos(angleToPlayer) * this.speed * slowFactor;
      this.vy = Math.sin(angleToPlayer) * this.speed * slowFactor;
    }

    this.x += this.vx * dt;
    this.y += this.vy * dt;

    if (this.type === EnemyType.Dreadnought && this.onFireCounter) {
      this.shootTimer += dt * slowFactor;
      if (this.shootTimer >= 3.2) {
        this.shootTimer = 0;
        this.onFireCounter(this.x, this.y, angleToPlayer);
      }
    }

    this.draw();
  }

  public takeDamage(amount: number): boolean {
    this.hp -= amount;

    // Shrink size on damage for visible feedback
    const hpRatio = Math.max(0.4, this.hp / this.maxHp);
    this.radius = this.maxRadius * hpRatio;

    if (this.hp <= 0) {
      this.destroy();
      return true; // destroyed
    }

    return false; // still alive
  }

  public draw(): void {
    this.graphics.clear();

    const cos = Math.cos(this.rotation);
    const sin = Math.sin(this.rotation);

    // 1. Soft Outer Glow
    this.graphics.fillStyle(this.color, 0.22);
    this.graphics.fillCircle(this.x, this.y, this.radius + 5);

    // 2. Polygonal Body
    this.graphics.fillStyle(this.color, 0.85);
    this.graphics.beginPath();

    for (let i = 0; i < this.vertices.length; i++) {
      const v = this.vertices[i];
      const rx = v.x * (this.radius / this.maxRadius);
      const ry = v.y * (this.radius / this.maxRadius);
      const px = this.x + (rx * cos - ry * sin);
      const py = this.y + (rx * sin + ry * cos);

      if (i === 0) {
        this.graphics.moveTo(px, py);
      } else {
        this.graphics.lineTo(px, py);
      }
    }

    this.graphics.closePath();
    this.graphics.fillPath();

    // 3. Neon Outline
    this.graphics.lineStyle(1.8, 0xffffff, 0.95);
    this.graphics.strokePath();

    // 4. Boss Health Bar (if Dreadnought)
    if (this.type === EnemyType.Dreadnought) {
      const barW = 54;
      const barH = 6;
      const barX = this.x - barW / 2;
      const barY = this.y - this.radius - 14;

      this.graphics.fillStyle(0x0e1422, 0.8);
      this.graphics.fillRect(barX - 1, barY - 1, barW + 2, barH + 2);

      const fillW = (this.hp / this.maxHp) * barW;
      this.graphics.fillStyle(0xef4444, 1);
      this.graphics.fillRect(barX, barY, fillW, barH);
    }
  }

  public destroy(): void {
    this.active = false;
    this.graphics.destroy();
  }
}
