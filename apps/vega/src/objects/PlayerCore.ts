import Phaser from 'phaser';
import {
  CENTER_X,
  CENTER_Y,
  PLAYER_CONFIG,
  WeaponType,
  WEAPON_INFOS,
  WeaponInfo,
} from '../config.js';

export class PlayerCore {
  public scene: Phaser.Scene;
  public x: number = CENTER_X;
  public y: number = CENTER_Y;
  public angleRad: number = 0;
  public radius: number = PLAYER_CONFIG.coreRadius;
  public shields: number = PLAYER_CONFIG.startingShields;
  public empBombs: number = PLAYER_CONFIG.startingEmpBombs;
  public currentWeapon: WeaponType = WeaponType.Standard;
  public weaponTimer: number = 0;
  public invulnerableTimer: number = 0;

  private graphics: Phaser.GameObjects.Graphics;
  private laserSightGraphics: Phaser.GameObjects.Graphics;
  private recoilOffset: number = 0;
  private shieldRotation: number = 0;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.graphics = scene.add.graphics();
    this.graphics.setDepth(20);

    this.laserSightGraphics = scene.add.graphics();
    this.laserSightGraphics.setDepth(5);

    this.draw();
  }

  public setAim(targetX: number, targetY: number): void {
    this.angleRad = Phaser.Math.Angle.Between(this.x, this.y, targetX, targetY);
  }

  public update(dt: number, showLaser: boolean = true): void {
    // Weapon timer countdown
    if (this.currentWeapon !== WeaponType.Standard) {
      this.weaponTimer -= dt;
      if (this.weaponTimer <= 0) {
        this.currentWeapon = WeaponType.Standard;
        this.weaponTimer = 0;
      }
    }

    // Invulnerability timer countdown
    if (this.invulnerableTimer > 0) {
      this.invulnerableTimer -= dt;
    }

    // Shield rotation
    this.shieldRotation += dt * 1.8;

    // Recoil recovery
    if (this.recoilOffset > 0) {
      this.recoilOffset = Math.max(0, this.recoilOffset - dt * 45);
    }

    this.drawLaserSight(showLaser);
    this.draw();
  }

  public triggerRecoil(): void {
    this.recoilOffset = 5.5;
  }

  public setWeapon(weapon: WeaponType): void {
    this.currentWeapon = weapon;
    const info: WeaponInfo = WEAPON_INFOS[weapon];
    this.weaponTimer = info.duration;
  }

  public addShield(): boolean {
    if (this.shields < PLAYER_CONFIG.maxShields) {
      this.shields++;
      return true;
    }
    return false;
  }

  public addEmpBomb(): boolean {
    if (this.empBombs < PLAYER_CONFIG.maxEmpBombs) {
      this.empBombs++;
      return true;
    }
    return false;
  }

  public takeHit(): boolean {
    if (this.invulnerableTimer > 0) return false;

    if (this.shields > 0) {
      this.shields--;
      this.invulnerableTimer = PLAYER_CONFIG.invulnerabilityDuration;
      return true; // shield absorbed the blow
    }

    // Shield already 0: lethal hit
    return false;
  }

  public isInvulnerable(): boolean {
    return this.invulnerableTimer > 0;
  }

  private drawLaserSight(visible: boolean): void {
    this.laserSightGraphics.clear();
    if (!visible) return;

    const reach = 600;
    const targetX = this.x + Math.cos(this.angleRad) * reach;
    const targetY = this.y + Math.sin(this.angleRad) * reach;

    // Soft dashed targeting beam
    this.laserSightGraphics.lineStyle(1.2, 0x00f0ff, 0.25);
    this.laserSightGraphics.lineBetween(this.x, this.y, targetX, targetY);

    // Crosshair target reticle dot at end
    const aimDotDist = 120;
    const dotX = this.x + Math.cos(this.angleRad) * aimDotDist;
    const dotY = this.y + Math.sin(this.angleRad) * aimDotDist;
    this.laserSightGraphics.lineStyle(1.5, 0x00f0ff, 0.6);
    this.laserSightGraphics.strokeCircle(dotX, dotY, 6);
  }

  public draw(): void {
    this.graphics.clear();

    const cos = Math.cos(this.angleRad);
    const sin = Math.sin(this.angleRad);
    const weaponInfo = WEAPON_INFOS[this.currentWeapon];

    // Blinking effect when invulnerable
    if (this.invulnerableTimer > 0 && Math.floor(this.invulnerableTimer * 12) % 2 === 0) {
      return;
    }

    // 1. Orbital Shield Arcs (if shields > 0)
    if (this.shields > 0) {
      const shieldR = PLAYER_CONFIG.shieldRadius;
      const arcCount = this.shields;
      const arcSpan = (Math.PI * 2) / arcCount;

      for (let i = 0; i < arcCount; i++) {
        const startAng = this.shieldRotation + i * arcSpan;
        const endAng = startAng + arcSpan * 0.65;
        this.graphics.lineStyle(3, 0x00f0ff, 0.85);
        this.graphics.beginPath();
        this.graphics.arc(this.x, this.y, shieldR, startAng, endAng, false);
        this.graphics.strokePath();

        // Soft outer shield glow
        this.graphics.lineStyle(6, 0x00f0ff, 0.2);
        this.graphics.beginPath();
        this.graphics.arc(this.x, this.y, shieldR, startAng, endAng, false);
        this.graphics.strokePath();
      }
    }

    // 2. Dual Cannon Barrels
    const barrelLength = PLAYER_CONFIG.cannonLength - this.recoilOffset;
    const barrelWidth = PLAYER_CONFIG.cannonWidth;
    const perpCos = -sin;
    const perpSin = cos;
    const spacing = 5;

    // Left and Right barrels
    [-spacing, spacing].forEach((offset) => {
      const bx = this.x + perpCos * offset;
      const by = this.y + perpSin * offset;
      const endX = bx + cos * barrelLength;
      const endY = by + sin * barrelLength;

      this.graphics.lineStyle(barrelWidth, 0x1e293b, 1.0);
      this.graphics.lineBetween(bx, by, endX, endY);

      this.graphics.lineStyle(barrelWidth - 2, weaponInfo.color, 0.95);
      this.graphics.lineBetween(bx, by, endX, endY);
    });

    // 3. Central Reactor Ring / Outer Chassis
    this.graphics.fillStyle(0x0f172a, 1.0);
    this.graphics.fillCircle(this.x, this.y, this.radius);

    this.graphics.lineStyle(2, weaponInfo.color, 0.9);
    this.graphics.strokeCircle(this.x, this.y, this.radius);

    // 4. Fusion Core Orb
    this.graphics.fillStyle(weaponInfo.color, 0.4);
    this.graphics.fillCircle(this.x, this.y, this.radius - 4);

    this.graphics.fillStyle(0xffffff, 1.0);
    this.graphics.fillCircle(this.x, this.y, this.radius - 8);
  }

  public reset(): void {
    this.shields = PLAYER_CONFIG.startingShields;
    this.empBombs = PLAYER_CONFIG.startingEmpBombs;
    this.currentWeapon = WeaponType.Standard;
    this.weaponTimer = 0;
    this.invulnerableTimer = 0;
    this.recoilOffset = 0;
    this.draw();
  }

  public destroy(): void {
    this.graphics.destroy();
    this.laserSightGraphics.destroy();
  }
}
