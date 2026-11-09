import Phaser from 'phaser';
import {
  BlockType,
  BLOCK_CONFIG,
  BLOCK_DEFS,
  BlockDef,
  PowerUpType,
} from '../config.js';

export interface ParticleShard {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: number;
  alpha: number;
  size: number;
}

export class Block {
  public scene: Phaser.Scene;
  public x: number;
  public y: number;
  public width: number = BLOCK_CONFIG.width;
  public height: number = BLOCK_CONFIG.height;
  public type: BlockType;
  public def: BlockDef;
  public hp: number;
  public maxHp: number;
  public active: boolean = true;

  private graphics: Phaser.GameObjects.Graphics;
  private crackGraphics: Phaser.GameObjects.Graphics;

  constructor(scene: Phaser.Scene, x: number, y: number, type: BlockType) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.type = type;
    this.def = BLOCK_DEFS[type];
    this.maxHp = this.def.maxHp;
    this.hp = this.maxHp;

    this.graphics = scene.add.graphics().setDepth(10);
    this.crackGraphics = scene.add.graphics().setDepth(11);

    this.draw();
  }

  public getBounds(): Phaser.Geom.Rectangle {
    return new Phaser.Geom.Rectangle(this.x, this.y, this.width, this.height);
  }

  public hit(damage: number = 1): { destroyed: boolean; droppedPowerUp?: PowerUpType } {
    if (this.type === BlockType.Titanium) {
      // Titanium is unbreakable under normal circumstances
      this.playHitShake();
      return { destroyed: false };
    }

    this.hp -= damage;
    this.playHitShake();

    if (this.hp <= 0) {
      this.active = false;
      const droppedPowerUp = this.rollPowerUpDrop();
      this.destroy();
      return { destroyed: true, droppedPowerUp };
    } else {
      this.draw();
      return { destroyed: false };
    }
  }

  public forceDestroy(): { droppedPowerUp?: PowerUpType } {
    this.active = false;
    const droppedPowerUp = this.rollPowerUpDrop();
    this.destroy();
    return { droppedPowerUp };
  }

  private rollPowerUpDrop(): PowerUpType | undefined {
    // 100% chance for Gold block
    if (this.type === BlockType.Gold) {
      const highTier = [
        PowerUpType.MultiBall,
        PowerUpType.Laser,
        PowerUpType.Fireball,
        PowerUpType.Expand,
      ];
      return highTier[Phaser.Math.Between(0, highTier.length - 1)];
    }

    // 25% chance for regular blocks
    if (Math.random() < 0.25) {
      const allTypes = [
        PowerUpType.MultiBall,
        PowerUpType.Laser,
        PowerUpType.SafetyFloor,
        PowerUpType.Expand,
        PowerUpType.Fireball,
        PowerUpType.ChronoSlow,
        PowerUpType.ExtraLife,
      ];
      return allTypes[Phaser.Math.Between(0, allTypes.length - 1)];
    }

    return undefined;
  }

  private playHitShake(): void {
    const origX = this.x;
    this.scene.tweens.add({
      targets: this,
      x: origX + (Math.random() > 0.5 ? 2.5 : -2.5),
      duration: 35,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        this.x = origX;
        this.draw();
      },
    });
  }

  public draw(): void {
    if (!this.active) return;
    this.graphics.clear();
    this.crackGraphics.clear();

    const radius = 4;
    const hpRatio = this.hp / this.maxHp;

    // 1. Soft glowing border
    this.graphics.fillStyle(this.def.glowColor, 0.18);
    this.graphics.fillRoundedRect(this.x - 2, this.y - 2, this.width + 4, this.height + 4, radius + 1);

    // 2. Block Core Body
    if (this.type === BlockType.Titanium) {
      // Metallic titanium look with hazard stripe accents
      this.graphics.fillStyle(0x334155, 0.95);
      this.graphics.fillRoundedRect(this.x, this.y, this.width, this.height, radius);

      this.graphics.lineStyle(1.5, 0x94a3b8, 0.9);
      this.graphics.strokeRoundedRect(this.x, this.y, this.width, this.height, radius);

      // Center hazard bolt rivets
      this.graphics.fillStyle(0xe2e8f0, 0.9);
      this.graphics.fillCircle(this.x + 8, this.y + 11, 2);
      this.graphics.fillCircle(this.x + this.width - 8, this.y + 11, 2);
      return;
    }

    if (this.type === BlockType.Bomb) {
      // Pulsing volatile bomb look
      this.graphics.fillStyle(0x7f1d1d, 0.95);
      this.graphics.fillRoundedRect(this.x, this.y, this.width, this.height, radius);

      this.graphics.lineStyle(1.8, 0xef4444, 1);
      this.graphics.strokeRoundedRect(this.x, this.y, this.width, this.height, radius);

      // Warning hazard icon in center
      this.graphics.fillStyle(0xfacc15, 0.95);
      this.graphics.fillRect(this.x + this.width / 2 - 2, this.y + 4, 4, 9);
      this.graphics.fillCircle(this.x + this.width / 2, this.y + 16, 2);
      return;
    }

    // Standard Colored Block (Emerald, Cyan, Magenta, Gold)
    const baseAlpha = 0.75 + hpRatio * 0.2;
    this.graphics.fillStyle(this.def.color, baseAlpha);
    this.graphics.fillRoundedRect(this.x, this.y, this.width, this.height, radius);

    // Bright top edge bevel highlight
    this.graphics.fillStyle(0xffffff, 0.4);
    this.graphics.fillRoundedRect(this.x + 2, this.y + 2, this.width - 4, 3, 1);

    // Glowing Neon Stroke
    this.graphics.lineStyle(1.5, this.def.color, 0.9);
    this.graphics.strokeRoundedRect(this.x, this.y, this.width, this.height, radius);

    // 3. Draw crack lines if damaged
    if (this.hp < this.maxHp) {
      const damageStage = this.maxHp - this.hp;
      this.crackGraphics.lineStyle(1.5, 0xffffff, 0.85);

      if (damageStage >= 1) {
        this.crackGraphics.beginPath();
        this.crackGraphics.moveTo(this.x + 12, this.y + 3);
        this.crackGraphics.lineTo(this.x + 28, this.y + 12);
        this.crackGraphics.lineTo(this.x + 44, this.y + 8);
        this.crackGraphics.strokePath();
      }

      if (damageStage >= 2) {
        this.crackGraphics.beginPath();
        this.crackGraphics.moveTo(this.x + 48, this.y + 4);
        this.crackGraphics.lineTo(this.x + 36, this.y + 14);
        this.crackGraphics.lineTo(this.x + 56, this.y + 18);
        this.crackGraphics.strokePath();
      }

      if (damageStage >= 3) {
        this.crackGraphics.beginPath();
        this.crackGraphics.moveTo(this.x + 8, this.y + 16);
        this.crackGraphics.lineTo(this.x + 24, this.y + 14);
        this.crackGraphics.lineTo(this.x + 32, this.y + 19);
        this.crackGraphics.strokePath();
      }
    }
  }

  public destroy(): void {
    this.active = false;
    this.graphics.destroy();
    this.crackGraphics.destroy();
  }
}
